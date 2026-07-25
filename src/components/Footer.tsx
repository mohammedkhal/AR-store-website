import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-sky-600" />
              <div>
                <span className="font-serif text-lg font-bold text-slate-900 tracking-tight block">DimensionX</span>
                <span className="text-xs text-slate-500">Spatial commerce for modern interiors</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 text-sm font-semibold mb-3">Procurement</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/accounts" className="hover:text-sky-600 transition">Corporate Accounts</Link></li>
              <li><Link to="/solutions" className="hover:text-sky-600 transition">Commercial Solutions</Link></li>
              <li><a href="#quote" className="hover:text-sky-600 transition">B2B Quote Request</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#legal" className="hover:text-sky-600 transition">Legal Disclaimer</a></li>
              <li><a href="#terms" className="hover:text-sky-600 transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 text-sm font-semibold mb-3">Corporate</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#about" className="hover:text-sky-600 transition">About</a></li>
              <li><a href="#contact" className="hover:text-sky-600 transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-sm flex flex-col sm:flex-row justify-between gap-3 text-slate-600">
          <p>© {new Date().getFullYear()} Executive Office Supply Co. All rights reserved.</p>
          <p>ANSI/BIFMA · GREENGUARD · FSC-Certified</p>
        </div>
      </div>
    </footer>
  );
}
