import { useState, useEffect, useRef } from 'react';
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
        position?: string;
        scale?: string;
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
  const [mainImage, setMainImage] = useState<string>('');
  const [showArGuide, setShowArGuide] = useState(false);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="mt-2 text-slate-600">The requested specification page could not be located.</p>
          <Link to="/" className="mt-4 inline-block text-sky-700 hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  useEffect(() => {
    if (product) {
      const imgs = product.images && product.images.length ? product.images : [product.thumbnail];
      setMainImage(imgs[0]);
    }
  }, [product]);

  // Ensure the page starts at the top when opening a product detail
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [id]);

  function handleAdd() {
    if (!product) return;
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const modelPosition = product.modelPosition ?? '0 0 0';
  const modelScale = product.modelScale ?? '1 1 1';

  function handleLaunchAR() {
    if (!product) return;

    setTab('spatial');
    setShowArGuide(true);

    const mv = modelViewerRef.current as HTMLElement & {
      activateAR?: () => void;
    } | null;

    if (mv && typeof mv.activateAR === 'function') {
      mv.activateAR();
    }

    window.setTimeout(() => setShowArGuide(false), 4000);
  }

  return (
    <div className="bg-zinc-50 min-h-screen relative pb-32">
      <div className="bg-white border-b border-zinc-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center flex-wrap gap-2">
          <Link to="/" className="hover:text-sky-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/" className="hover:text-sky-700">Catalog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-sky-700">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-medium">SKU: {product.sku}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex rounded-full bg-white/90 p-1 shadow-sm border border-zinc-200">
              <button
                onClick={() => setTab('photos')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === 'photos'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Studio Photography
              </button>
              <button
                onClick={() => setTab('spatial')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === 'spatial'
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                Interactive 3D / AR View
              </button>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-zinc-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)]">
              <div className="relative bg-zinc-950">
                {showArGuide && (
                  <div className="absolute inset-0 z-10 flex items-start justify-center pt-4 pointer-events-none">
                    <div className="mx-4 max-w-sm rounded-2xl border border-white/20 bg-slate-950/85 px-4 py-3 text-white shadow-xl backdrop-blur">
                      <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', direction: 'rtl', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700 }}>استخدم الكاميرا لعرض المنتج بالواقع المعزز</div>
                        <div style={{ marginTop: '4px', fontSize: '12px', lineHeight: 1.5 }}>
                          افتح مساحة خالية، ثم حرّك الهاتف ببطء حتى يظهر المنتج أمامك
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <img
                  src={mainImage || product.thumbnail}
                  alt={product.name}
                  className={`w-full h-[520px] object-cover ${tab !== 'photos' ? 'hidden' : ''}`}
                />

                <model-viewer
                  ref={(element) => { modelViewerRef.current = element; }}
                  src={product.glbModel}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  ar-scale="auto"
                  ar-placement={product.placement}
                  position={modelPosition}
                  scale={modelScale}
                  camera-controls
                  touch-action="pan-y"
                  shadow-intensity="1"
                  auto-rotate
                  className={`w-full h-[520px] bg-zinc-100 ${tab !== 'spatial' ? 'hidden' : ''}`}
                  style={{ width: '100%', height: '520px', backgroundColor: '#f8fafc' }}
                >
                  <div slot="poster" className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                    Loading spatial model…
                  </div>
                </model-viewer>
              </div>

              <div className="p-6 space-y-4">
                <button
                  onClick={handleLaunchAR}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm px-6 py-4 transition-shadow shadow-sm"
                >
                  <Smartphone className="w-5 h-5" /> Launch Augmented Reality Inspection
                </button>

                <div className="grid grid-cols-3 gap-3">
                  {(product.images && product.images.length ? product.images : [product.thumbnail]).slice(0, 3).map((img) => (
                    <button
                      key={img}
                      onClick={() => {
                        setTab('photos');
                        setMainImage(img);
                      }}
                      className={`overflow-hidden rounded-3xl border transition ${mainImage === img ? 'border-sky-500 ring-2 ring-sky-200' : 'border-zinc-200 hover:border-slate-400'}`}
                    >
                      <img src={img} alt={product.name} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-slate-600">
                  <span className="text-slate-500">Want the full technical asset?</span>
                  <a href="#" className="font-semibold text-sky-700 hover:text-sky-900">Download Technical Spec Sheet (PDF)</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-[0.25em] px-3 py-2">
                {product.category}
              </span>

              <h1 className="mt-6 font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-slate-950 leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">SKU: {product.sku}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                <div>
                  <p className="text-slate-900 text-4xl font-bold tracking-tight">{product.price}</p>
                  <p className="text-sm text-slate-500 mt-1">$1,850.00 / UNIT</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-semibold tracking-tight">
                  Ready to Ship
                </span>
              </div>

              <p className="mt-8 text-slate-600 leading-relaxed text-sm sm:text-base">
                {product.description} Crafted for acoustically mindful interiors, this architectural panel blends sculptural form with performance-grade sound attenuation.
              </p>

              <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                <h2 className="font-serif text-xl font-semibold text-slate-950">Technical Specifications</h2>
                <dl className="mt-5 grid gap-4 text-sm text-slate-700">
                  {product.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[120px_1fr] gap-4">
                      <dt className="text-slate-500">{s.label}</dt>
                      <dd className="font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center rounded-3xl border border-zinc-200 bg-white px-4 py-3 gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-slate-600 hover:text-slate-950"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="min-w-[2rem] text-center font-semibold text-slate-900">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="text-slate-600 hover:text-slate-950"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm px-8 py-4 transition-shadow shadow-sm"
                >
                  {added ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  Add to Purchase Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
