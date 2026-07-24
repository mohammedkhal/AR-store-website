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
          <p className="text-amber-400 text-xs sm:text-sm font-sans uppercase tracking-[0.2em] mb-4">
            Enterprise Procurement · Established 1998
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            Commercial-Grade Office Furnishings &amp; Architectural Accessories
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl leading-relaxed">
            Outfitting executive suites, boardrooms, and modern workspaces since 1998.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#catalog" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-6 py-3 rounded-sm transition-colors">
              Browse Product Catalog <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#quote" className="inline-flex items-center gap-2 border border-slate-500 hover:border-amber-400 hover:text-amber-400 text-slate-100 font-semibold text-sm px-6 py-3 rounded-sm transition-colors">
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
            <Link to="/" className="mt-3 inline-block text-amber-600 hover:underline">Clear search</Link>
          </div>
        ) : (
          <>
            {/* Table view (md+) */}
            <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-sm">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Item</th>
                    <th className="text-left px-6 py-4 font-semibold">SKU</th>
                    <th className="text-left px-6 py-4 font-semibold">Category</th>
                    <th className="text-left px-6 py-4 font-semibold">Unit Price</th>
                    <th className="text-right px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={p.thumbnail} alt={p.name} className="w-16 h-16 object-cover rounded-sm border border-slate-200" />
                          <div>
                            <p className="font-semibold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-600">{p.sku}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-sm">{p.category}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{p.price}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/product/${p.id}`} className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-semibold text-sm">
                          View Specification Page <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card grid (mobile) */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                  <img src={p.thumbnail} alt={p.name} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-sm mb-3">{p.category}</span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">{p.name}</h3>
                    <p className="font-mono text-xs text-slate-500 mt-1">SKU: {p.sku}</p>
                    <p className="text-sm text-slate-600 mt-2">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">{p.price}</span>
                      <Link to={`/product/${p.id}`} className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-sm transition-colors">
                        View Spec <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
