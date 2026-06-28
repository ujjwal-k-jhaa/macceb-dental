import React, { useState, useEffect } from "react";
import { Phone, Calendar, ArrowRight, Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Header({ onOpenBooking, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Treatments", href: "#treatments", id: "treatments" },
    { label: "Our Tech", href: "#tech", id: "tech" },
    { label: "Estimate", href: "#estimate", id: "estimate" },
    { label: "Specialists", href: "#specialists", id: "specialists" },
    { label: "Concierge", href: "#concierge", id: "concierge" },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-brand-primary/5 py-3 md:py-4 shadow-sm"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl accent-gradient flex items-center justify-center shadow-md shadow-brand-accent/20 transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-brand-primary leading-none uppercase">
                macceb
              </span>
              <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.25em] text-brand-accent uppercase font-medium">
                dental clinic
              </span>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/40 p-1.5 rounded-full border border-brand-primary/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-5 py-2 text-xs font-medium tracking-wide rounded-full transition-colors ${
                    isActive ? "text-white" : "text-brand-primary/70 hover:text-brand-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-brand-primary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Button & Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <a
              href="tel:+12026884000"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-brand-primary/80 hover:text-brand-accent transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brand-primary/10 flex items-center justify-center bg-white/20">
                <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>
              <span className="font-mono tracking-tight text-[11px] sm:text-xs">+1 (202) 688-4000</span>
            </a>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brand-primary text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-lg shadow-brand-primary/15 hover:bg-brand-primary/90 hover:shadow-brand-accent/20 transition-all cursor-pointer border border-brand-accent/10 shrink-0"
            >
              <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-accent" />
              <span>
                <span className="hidden xs:inline">Book </span>
                <span className="hidden sm:inline">Appointment</span>
                <span className="inline xs:hidden">Book</span>
              </span>
              <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white/50" />
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full border border-brand-primary/10 flex items-center justify-center bg-white/40 text-brand-primary hover:bg-white transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[57px] sm:top-[65px] bg-[#FAF9F6]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-6">
              <span className="text-[10px] font-mono tracking-[0.25em] text-brand-accent uppercase font-bold block">
                Menu Navigation
              </span>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-brand-primary text-white"
                          : "text-brand-primary/80 hover:bg-brand-primary/5 hover:text-brand-primary"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? "text-brand-accent" : "opacity-30 group-hover:translate-x-0.5"}`} />
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="p-6 border-t border-brand-primary/5 bg-white/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-primary/10 flex items-center justify-center bg-white">
                  <Phone className="w-4 h-4 text-brand-accent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-primary/45 block">
                    Contact Hotline
                  </span>
                  <a href="tel:+12026884000" className="font-mono text-xs font-bold text-brand-primary hover:text-brand-accent">
                    +1 (202) 688-4000
                  </a>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center py-3 rounded-xl bg-brand-primary text-white font-bold text-xs tracking-wider uppercase cursor-pointer border border-brand-accent/20"
              >
                Book Instant Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
