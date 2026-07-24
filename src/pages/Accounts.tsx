import { Link } from 'react-router-dom';
import { FileText, CreditCard, Users } from 'lucide-react';

export default function Accounts() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold text-slate-900">Corporate Accounts</h1>
      <p className="mt-2 text-slate-600 max-w-2xl">
        Open a corporate account to access Net-30 terms, dedicated account management, custom catalogs, and consolidated billing.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: CreditCard, title: 'Net-30 / Net-60 Terms', body: 'Apply for trade credit with flexible payment terms for qualifying organizations.' },
          { icon: Users, title: 'Dedicated Account Manager', body: 'A named procurement specialist handles your orders, returns, and reordering.' },
          { icon: FileText, title: 'Custom Catalogs', body: 'Pre-approved product lists and SKU restrictions tailored to your organization.' },
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
