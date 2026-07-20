import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  images: string[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  triggerRef: React.RefObject<HTMLDivElement>;
  /**
   * Scroll progress (0–1) within the trigger element maps to the image sequence.
   * start: scroll progress at which the sequence begins (default 0)
   * end: scroll progress at which the sequence ends (default 1)
   */
  start?: number;
  end?: number;
  /** Optional smoothing — 0 means no smoothing, higher = more lag */
  smooth?: number;
}

/**
 * Loads a sequence of images and renders them onto a canvas, frame-by-frame,
 * synced to scroll position via GSAP ScrollTrigger. This achieves a "video-like"
 * effect without using actual video files — much lighter and more fluid.
 */
export default function useScrollCanvas({
  images,
  canvasRef,
  triggerRef,
  start = 0,
  end = 1,
  smooth = 0.1,
}: Props) {
  const loadedImages = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);
  const rafId = useRef<number>(0);
  const progress = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !triggerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // --- Preload all images ---
    const imgElements: HTMLImageElement[] = [];
    let loadedCount = 0;

    const drawInitial = () => {
      if (imgElements[0] && imgElements[0].complete) {
        drawFrame(ctx, canvas, imgElements[0]);
      }
    };

    images.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      imgElements[i] = img;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) drawInitial();
      };
    });

    loadedImages.current = imgElements;

    // --- Resize handler ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(ctx, canvas, imgElements[Math.round(currentFrame.current)] || imgElements[0]);
    };
    resize();
    window.addEventListener('resize', resize);

    // --- ScrollTrigger ---
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progress.current = self.progress;
        const p = gsap.utils.clamp(start, end, self.progress);
        targetFrame.current = p * (images.length - 1);
      },
    });

    // --- Animation loop with smoothing ---
    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * smooth;
      const frameIndex = Math.round(currentFrame.current);
      const clamped = Math.max(0, Math.min(images.length - 1, frameIndex));
      const img = imgElements[clamped];
      if (img && img.complete && img.naturalWidth > 0) {
        drawFrame(ctx, canvas, img);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return { progress };
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  // Cover fit
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}
