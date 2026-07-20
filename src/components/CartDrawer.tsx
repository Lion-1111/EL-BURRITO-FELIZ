import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../data';

export default function CartDrawer() {
  const { items, isOpen, closeCart, addItem, decreaseItem, removeItem, totalPrice, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const buildWhatsAppMessage = () => {
    let msg = 'Hola El Patrón, quiero hacer este pedido:\n\n';
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} x${item.quantity} — $${item.price * item.quantity}\n`;
    });
    msg += `\nTotal: $${totalPrice}`;
    return msg;
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink-900/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-ink-800 shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-wood-400/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-ember-400" />
            <h2 className="font-display text-lg font-semibold text-cream-50">Tu carrito</h2>
          </div>
          <button onClick={closeCart} className="text-cream-200/40 hover:text-cream-50" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-4 h-12 w-12 text-wood-400/30" />
              <p className="text-sm text-cream-200/50">Tu carrito está vacío</p>
              <p className="mt-1 text-xs text-cream-200/40">Agrega burritos, tortas o tacos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-xl border border-wood-400/10 bg-ink-700/50 p-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-cream-50">{item.name}</h3>
                    <p className="text-xs text-cream-200/50">${item.price} c/u</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => decreaseItem(item.id)} className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-600 text-cream-200 hover:bg-ink-700" aria-label="Quitar uno">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium text-cream-50">{item.quantity}</span>
                        <button onClick={() => addItem(item)} className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-600 text-cream-200 hover:bg-ink-700" aria-label="Agregar uno">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-cream-200/30 hover:text-chili-400" aria-label="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="heading-accent text-base text-ember-400">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-xs text-cream-200/40 hover:text-chili-400">Vaciar carrito</button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-wood-400/10 px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-cream-200/60">Total</span>
              <span className="heading-accent text-2xl text-ember-400">${totalPrice}</span>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Pedir por WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-cream-200/40">Se abre WhatsApp con tu pedido listo</p>
          </div>
        )}
      </div>
    </>
  );
}
