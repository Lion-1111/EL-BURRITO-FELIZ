import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Layer {
  src: string;
  startProgress: number;
  endProgress: number;
}

interface Props {
  layers: Layer[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  triggerRef: React.RefObject<HTMLDivElement>;
  parallax?: number[];
}

export default function useScrollCanvasLayers({ layers, canvasRef, triggerRef, parallax }: Props) {
  const images = useRef<HTMLImageElement[]>([]);
  const rafId = useRef(0);
  const scrollProgress = useRef(0);
  const smoothProgress = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !triggerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const imgEls: HTMLImageElement[] = [];
    let loadedCount = 0;
    layers.forEach((layer, i) => {
      const img = new Image();
      img.src = layer.src;
      imgEls[i] = img;
      img.onload = () => { loadedCount++; if (loadedCount === layers.length) { resize(); } };
    });
    images.current = imgEls;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const st = ScrollTrigger.create({
      trigger: triggerRef.current, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });

    const render = () => {
      smoothProgress.current += (scrollProgress.current - smoothProgress.current) * 0.08;
      const p = smoothProgress.current;
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      ctx.clearRect(0, 0, cw, ch);
      layers.forEach((layer, i) => {
        const img = imgEls[i];
        if (!img || !img.complete || img.naturalWidth === 0) return;
        let opacity = 0;
        if (p >= layer.endProgress) opacity = 1;
        else if (p >= layer.startProgress) {
          const t = (p - layer.startProgress) / (layer.endProgress - layer.startProgress);
          opacity = t * t * (3 - 2 * t);
        }
        if (opacity <= 0.001) return;
        let offsetY = 0;
        if (parallax && parallax[i]) offsetY = parallax[i] * (1 - p);
        ctx.globalAlpha = opacity;
        drawCover(ctx, canvas, img, offsetY);
      });
      ctx.globalAlpha = 1;
      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    return () => { cancelAnimationFrame(rafId.current); window.removeEventListener('resize', resize); st.kill(); };
  }, []);
}

function drawCover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement, offsetY: number) {
  const cw = canvas.clientWidth, ch = canvas.clientHeight;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale, sh = ih * scale;
  ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2 + offsetY, sw, sh);
}
