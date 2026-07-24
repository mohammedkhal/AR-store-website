import { Link } from 'react-router-dom';
import { Building2, Briefcase, Landmark } from 'lucide-react';

export default function Solutions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Commercial Solutions</h1>
      <p className="mt-2 text-slate-600 max-w-2xl">
        End-to-end furnishing programs for offices, institutions, and large-scale facilities. Our procurement specialists manage specification, logistics, and installation.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Building2, title: 'Workspace Fit-Out', body: 'Complete office furnishing from floor plan to installation, managed by a dedicated project coordinator.' },
          { icon: Briefcase, title: 'Bulk Procurement', body: 'Volume ordering with tiered enterprise pricing, freight coordination, and consolidated invoicing.' },
          { icon: Landmark, title: 'Institutional & GSA', body: 'GSA-schedule eligible supply for government and institutional buyers with full compliance documentation.' },
        ].map((c) => (
          <div key={c.title} className="border border-slate-200 rounded-sm bg-white p-6">
            <c.icon className="w-8 h-8 text-amber-600 mb-4" />
            <h2 className="font-serif text-lg font-bold text-slate-900">{c.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="mt-8 inline-block text-amber-700 hover:underline">← Back to Catalog</Link>
    </div>
  );
}
