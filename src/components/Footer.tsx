import React from "react";
import { Sparkles, MapPin, Mail, Phone, Shield, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#121C1A] text-white pt-16 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting inside dark theme footer */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5 relative z-10">
        {/* Brand Information (4 cols) */}
        <div className="md:col-span-4 space-y-5">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white leading-none uppercase">
                macceb
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-brand-accent uppercase font-medium">
                dental clinic
              </span>
            </div>
          </a>
          <p className="text-xs text-white/60 leading-relaxed max-w-sm">
            macceb Dental is an ultra-premium boutique dental care practice. We merge the technical standards of Swiss aesthetic restorative science with 3D diagnostic technology for pain-free clinical perfection.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-[9px] font-mono tracking-wider border border-white/5">
              <Shield className="w-3 h-3 text-brand-accent" />
              <span>HIPAA SECURE</span>
            </div>
            <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded text-[9px] font-mono tracking-wider border border-white/5">
              <span>0% APR FINANCING</span>
            </div>
          </div>
        </div>

        {/* Operational Hours (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display font-semibold text-xs text-brand-accent uppercase tracking-wider">
            Clinical Hours
          </h4>
          <ul className="space-y-2.5 text-xs text-white/70">
            <li className="flex justify-between items-center pb-1.5 border-b border-white/5">
              <span>Monday – Thursday</span>
              <span className="font-mono text-white/95">08:00 AM – 06:00 PM</span>
            </li>
            <li className="flex justify-between items-center pb-1.5 border-b border-white/5">
              <span>Friday</span>
              <span className="font-mono text-white/95">08:00 AM – 04:00 PM</span>
            </li>
            <li className="flex justify-between items-center pb-1.5 border-b border-white/5">
              <span>Saturday</span>
              <span className="font-mono text-brand-accent font-medium">By Emergency Request</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Sunday</span>
              <span className="text-white/40">Clinical Recess</span>
            </li>
          </ul>
        </div>

        {/* Contact & Location (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display font-semibold text-xs text-brand-accent uppercase tracking-wider">
            Clinical Embassy
          </h4>
          <ul className="space-y-3.5 text-xs text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>
                1420 Embassy Circle NW, <br />
                Suite 400, Washington, DC 20036
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="font-mono">+1 (202) 688-4000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="font-mono">concierge@maccebdental.com</span>
            </li>
          </ul>
        </div>

        {/* Legal links (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-display font-semibold text-xs text-brand-accent uppercase tracking-wider">
            Governance
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60">
            <li><a href="#home" className="hover:text-brand-accent transition-colors">Clinical Ethics</a></li>
            <li><a href="#home" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#home" className="hover:text-brand-accent transition-colors">HIPAA Standards</a></li>
            <li><a href="#home" className="hover:text-brand-accent transition-colors">Swiss Affiliations</a></li>
            <li><a href="#home" className="hover:text-brand-accent transition-colors">Support Registry</a></li>
          </ul>
        </div>
      </div>

      {/* Copy footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-white/40 relative z-10">
        <div className="space-y-1.5 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} macceb Dental Clinic. All Rights Reserved. National Board Registered practice.
          </p>
          <p className="text-[10px] text-white/30 max-w-2xl leading-relaxed">
            <strong>Portfolio Disclaimer:</strong> This website is an interactive high-fidelity concept built entirely for professional engineering and design portfolio purposes. It does not represent a real active dental clinic. All doctor profiles, treatments, prices, and booking capabilities are simulated for demonstration.
          </p>
        </div>
        <span className="flex items-center gap-1.5 shrink-0">
          <Clock className="w-3 h-3 text-brand-accent" />
          <span>Real-time portfolio server reporting in 2026.</span>
        </span>
      </div>
    </footer>
  );
}
