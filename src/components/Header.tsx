import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Building2, Phone, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) navigate('/?q=' + encodeURIComponent(query.trim()));
  }

  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-700">
      {/* Utility bar */}
      <div className="bg-slate-950 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <span className="tracking-wide uppercase">Enterprise Inquiries</span>
          <div className="flex items-center gap-x-6 gap-y-1 flex-wrap">
            <a href="tel:8005550199" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> Call (962) 791450338
            </a>
            <a href="#quote" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FileText className="w-3.5 h-3.5" /> Request B2B Quote
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between gap-x-8 gap-y-4 flex-wrap">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Building2 className="w-8 h-8 text-amber-500" />
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight">
              Tamimi OFFICE SUPPLY CO.
            </span>
          </Link>

          <form onSubmit={onSearch} className="flex-1 max-w-md min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search catalog by SKU or keyword…"
                className="w-full bg-slate-800 border border-slate-600 rounded-sm pl-3 pr-10 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
              <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <Link to="/cart" className="relative flex items-center gap-2 text-sm hover:text-amber-400 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-5 border-t border-slate-700 pt-3">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-sans uppercase tracking-wider">
            <li><Link to="/" className="hover:text-amber-400 transition-colors">Product Catalog</Link></li>
            <li><Link to="/solutions" className="hover:text-amber-400 transition-colors">Commercial Solutions</Link></li>
            <li><Link to="/accounts" className="hover:text-amber-400 transition-colors">Corporate Accounts</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
