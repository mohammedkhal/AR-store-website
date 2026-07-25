import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const { items, updateQty, remove, count } = useCart();
  const subtotal = items.reduce((sum, i) => sum + i.product.priceValue * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Purchase Order is Empty</h1>
        <p className="mt-2 text-slate-600">No items have been added to your current purchase order.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sky-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Purchase Order Summary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Item</th>
                  <th className="text-left px-4 py-3 font-semibold">Unit Price</th>
                  <th className="text-left px-4 py-3 font-semibold">Qty</th>
                  <th className="text-right px-4 py-3 font-semibold">Line Total</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((i) => (
                  <tr key={i.product.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={i.product.thumbnail} alt={i.product.name} className="w-12 h-12 object-cover rounded-sm border border-slate-200" />
                        <div>
                          <Link to={`/product/${i.product.id}`} className="font-semibold text-slate-900 hover:text-sky-700">{i.product.name}</Link>
                          <p className="font-mono text-xs text-slate-500">{i.product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{i.product.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center border border-slate-300 rounded-sm">
                        <button onClick={() => updateQty(i.product.id, i.quantity - 1)} className="px-2 py-1 text-slate-600 hover:text-slate-900"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="px-3 py-1 w-10 text-center">{i.quantity}</span>
                        <button onClick={() => updateQty(i.product.id, i.quantity + 1)} className="px-2 py-1 text-slate-600 hover:text-slate-900"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">${(i.product.priceValue * i.quantity).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => remove(i.product.id)} className="text-slate-400 hover:text-red-600" aria-label="Remove item"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm text-sky-700 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Continue Browsing Catalog
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="border border-slate-200 rounded-sm bg-white p-6">
            <h2 className="font-serif text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Items</span><span className="text-slate-900">{count}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="text-slate-900 font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="text-slate-900">Calculated at quote</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
              <span className="font-bold text-slate-900">Estimated Total</span>
              <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>
            <button className="mt-5 w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-6 py-3 rounded-sm transition-colors">
              Request Purchase Order Quote
            </button>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5" /> Net-30 terms available for approved corporate accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
