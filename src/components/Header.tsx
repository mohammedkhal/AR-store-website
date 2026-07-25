import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Grid } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { count } = useCart();

  return (
    <header className="bg-zinc-50 text-slate-950 border-b border-zinc-200 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-sm uppercase tracking-[0.4em] text-slate-500">DimensionX</span>
            <span className="block font-serif text-lg font-semibold tracking-tight">Spatial Commerce</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700 font-medium">
          <Link to="/" className="hover:text-slate-950 transition">Portfolio</Link>
          <Link to="/solutions" className="hover:text-slate-950 transition">Solutions</Link>
          <Link to="/accounts" className="hover:text-slate-950 transition">Resources</Link>
          <Link to="/#contact" className="hover:text-slate-950 transition">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-slate-700 shadow-sm hover:shadow-md transition">
            <Search className="w-4 h-4" />
          </button>
          <Link to="/cart" className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-slate-700 shadow-sm hover:shadow-md transition">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-semibold shadow-sm">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
