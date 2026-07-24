import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  ChevronRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Download,
  Box,
  Image as ImageIcon,
  Smartphone,
} from 'lucide-react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        'auto-rotate'?: boolean;
      }, HTMLElement>;
    }
  }
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'photos' | 'spatial'>('photos');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="mt-2 text-slate-600">The requested specification page could not be located.</p>
        <Link to="/" className="mt-4 inline-block text-amber-700 hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  function handleAdd() {
    if (!product) return;
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center flex-wrap gap-1">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/" className="hover:text-amber-700">Catalog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-amber-700">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-medium">SKU: {product.sku}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Media hub */}
          <div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab('photos')}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-sm border transition-colors ${
                  tab === 'photos'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Technical Specification Drawings / Photos
              </button>
              <button
                onClick={() => setTab('spatial')}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-sm border transition-colors ${
                  tab === 'spatial'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                <Box className="w-4 h-4" /> Interactive Spatial View
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
              {tab === 'photos' ? (
                <div>
                  <img src={product.thumbnail} alt={product.name} className="w-full h-[420px] object-cover" />
                  <p className="px-4 py-3 text-xs text-slate-500 border-t border-slate-100">
                    Reference photography — production units may vary by finish and lot.
                  </p>
                </div>
              ) : (
                <div>
                 <model-viewer
                    src={product.glbModel}
                    ios-src={product.usdzModel}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="fixed"
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity="1"
                    auto-rotate
                    className="w-full h-[420px] bg-slate-100"
                    style={{ width: '100%', height: '420px' }}
                  >
  <div slot="poster" className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
    Loading spatial model…
  </div>
</model-viewer>
                  <p className="px-4 py-3 text-xs text-slate-500 border-t border-slate-100">
                    Interactive 3D spatial view. Drag to rotate; pinch to zoom. On supported mobile devices, tap below to launch AR.
                  </p>
                </div>
              )}
            </div>

            {tab === 'spatial' && (
              <button
                onClick={() => {
                  const mv = document.querySelector('model-viewer');
                  if (mv && typeof (mv as any).activateAR === 'function') {
                    (mv as any).activateAR();
                  }
                }}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-6 py-3 rounded-sm transition-colors"
              >
                <Smartphone className="w-4 h-4" /> Launch AR Spatial Inspection
              </button>
            )}
          </div>

          {/* Right: Product details */}
          <div>
            <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-sm">{product.category}</span>
            <h1 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{product.name}</h1>
            <p className="mt-1 font-mono text-sm text-slate-500">SKU: {product.sku}</p>

            <div className="mt-5 flex items-baseline gap-4">
              <span className="text-3xl font-bold text-slate-900">{product.price}</span>
              <span className="text-sm text-slate-500">Unit Price (USD)</span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
              <CheckCircle2 className="w-4 h-4" /> In Stock — Ready to Ship
            </div>

            <p className="mt-5 text-slate-700 leading-relaxed">{product.description}</p>

            {/* Specs */}
            <div className="mt-6">
              <h2 className="font-serif text-lg font-bold text-slate-900 mb-3">Technical Specifications</h2>
              <dl className="border border-slate-200 rounded-sm divide-y divide-slate-200 bg-white">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 px-4 py-3 text-sm">
                    <dt className="text-slate-500 col-span-1">{s.label}</dt>
                    <dd className="text-slate-900 font-medium col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-sm bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold text-slate-900 w-12 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-sm transition-colors"
              >
                {added ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {added ? 'Added to Purchase Order' : 'Add to Purchase Order / Cart'}
              </button>
            </div>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-4 inline-flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800 hover:underline"
            >
              <Download className="w-4 h-4" /> Download Technical Spec Sheet (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
