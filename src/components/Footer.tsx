import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-7 h-7 text-amber-500" />
              <span className="font-serif text-lg font-bold text-slate-200 tracking-tight">
                EXECUTIVE OFFICE SUPPLY CO.
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Commercial-grade office furnishings and architectural accessories for enterprise, institutional, and government procurement.
            </p>
          </div>

          <div>
            <h3 className="text-slate-200 text-sm font-semibold uppercase tracking-wider mb-4">Procurement</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/accounts" className="hover:text-amber-400 transition-colors">Corporate Accounts</Link></li>
              <li><Link to="/solutions" className="hover:text-amber-400 transition-colors">Commercial Solutions</Link></li>
              <li><a href="#quote" className="hover:text-amber-400 transition-colors">B2B Quote Request</a></li>
              <li><a href="#net-terms" className="hover:text-amber-400 transition-colors">Net-30 / Net-60 Terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-200 text-sm font-semibold uppercase tracking-wider mb-4">Legal & Compliance</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#legal" className="hover:text-amber-400 transition-colors">Legal Disclaimer</a></li>
              <li><a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><a href="#compliance" className="hover:text-amber-400 transition-colors">Compliance & Certifications</a></li>
              <li><a href="#accessibility" className="hover:text-amber-400 transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-200 text-sm font-semibold uppercase tracking-wider mb-4">Corporate</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About the Company</a></li>
              <li><a href="#careers" className="hover:text-amber-400 transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Procurement</a></li>
              <li><a href="tel:8005550199" className="hover:text-amber-400 transition-colors">(800) 555-0199</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-xs flex flex-col sm:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} Executive Office Supply Co. All rights reserved. Established 1998.</p>
          <p className="text-slate-500">ANSI/BIFMA · GREENGUARD · FSC-Certified · GSA Schedule Eligible</p>
        </div>
      </div>
    </footer>
  );
}
