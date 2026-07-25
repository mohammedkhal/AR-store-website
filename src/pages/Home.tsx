import { Link, useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ArrowRight, FileText, ShieldCheck, Truck, Building2 } from 'lucide-react';

export default function Home() {
  const [params] = useSearchParams();
  const q = params.get('q')?.toLowerCase().trim();
  const filtered = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : products;

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-sky-400 text-xs sm:text-sm font-sans uppercase tracking-[0.2em] mb-4">
            Enterprise Procurement · Established 1998
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            Commercial-Grade Office Furnishings &amp; Architectural Accessories
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl leading-relaxed">
            Outfitting executive suites, boardrooms, and modern workspaces since 1998.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#catalog" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3 rounded-sm transition-colors">
              Browse Product Catalog <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 border border-slate-500 hover:border-sky-400 hover:text-sky-400 text-slate-100 font-semibold text-sm px-6 py-3 rounded-sm transition-colors">
              Request B2B Quote
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: 'BIFMA Compliant', sub: 'ANSI/BIFMA certified' },
            { icon: Truck, title: 'Volume Shipping', sub: 'Fleet & freight logistics' },
            { icon: FileText, title: 'Net-30 Terms', sub: 'For approved accounts' },
            { icon: Building2, title: 'GSA Eligible', sub: 'Government schedule' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon className="w-8 h-8 text-slate-700 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{f.title}</p>
                <p className="text-xs text-slate-500">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Product Catalog</h2>
          <p className="mt-2 text-slate-600 text-sm">
            {q ? `Showing results for "${q}"` : 'A selection of commercial-grade furnishings and architectural accessories.'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
              <p className="text-lg">No products matched your search.</p>
              <Link to="/" className="mt-3 inline-block text-sky-600 hover:underline">Clear search</Link>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group rounded-[1.5rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <div className="relative overflow-hidden rounded-t-[1.5rem]">
                  <img src={p.thumbnail} alt={p.name} className="w-full h-64 object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold uppercase tracking-[0.32em] px-3 py-2 mb-4">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-slate-950 mb-3">{p.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">SKU: {p.sku}</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-4">{p.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <div>
                      <p className="text-2xl font-bold text-slate-950">{p.price}</p>
                      <p className="text-sm text-slate-500">Per unit</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-800">
                      View Spec <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
