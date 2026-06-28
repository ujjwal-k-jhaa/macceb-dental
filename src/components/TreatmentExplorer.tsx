import React, { useState } from "react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, Layers, Compass, Sun, Activity, Check, Clock, ShieldAlert, ArrowRight } from "lucide-react";

interface TreatmentExplorerProps {
  onSelectService: (serviceId: string) => void;
}

// Map strings to Lucide components dynamically
const IconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  ShieldCheck,
  Layers,
  Compass,
  Sun,
  Activity,
};

export default function TreatmentExplorer({ onSelectService }: TreatmentExplorerProps) {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);

  const CurrentIcon = IconMap[selectedService.iconName] || Sparkles;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Selector (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <span className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-brand-accent mb-1 block">
          Select treatment line
        </span>
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-3 lg:pb-0 scrollbar-none snap-x">
          {SERVICES.map((service) => {
            const Icon = IconMap[service.iconName] || Sparkles;
            const isSelected = selectedService.id === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all cursor-pointer snap-start shrink-0 lg:shrink ${
                  isSelected
                    ? "text-white"
                    : "bg-white/50 hover:bg-white border border-brand-primary/5 text-brand-primary"
                }`}
                style={{ minWidth: "220px" }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTreatmentBg"
                    className="absolute inset-0 bg-brand-primary rounded-2xl -z-10 shadow-lg shadow-brand-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-white/20 text-brand-accent" : "bg-brand-accent/10 text-brand-primary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-serif italic font-semibold text-sm tracking-wide leading-tight">
                    {service.title}
                  </span>
                  <span
                    className={`text-[10px] font-mono tracking-wider mt-0.5 ${
                      isSelected ? "text-brand-accent/80" : "text-brand-primary/50"
                    }`}
                  >
                    Est. {service.duration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Panel (8 cols) */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="glass-panel-light rounded-3xl p-6 md:p-10 border border-brand-primary/5 shadow-xl relative overflow-hidden"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-primary/5">
              <div>
                <span className="text-[11px] font-bold font-mono tracking-[0.15em] text-brand-accent uppercase bg-brand-accent/10 px-3 py-1 rounded-full">
                  {selectedService.tagline}
                </span>
                <h3 className="font-serif italic font-semibold text-2xl md:text-3xl text-brand-primary mt-3 tracking-tight">
                  {selectedService.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-accent border border-brand-accent/10">
                  <CurrentIcon className="w-6 h-6" />
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base text-brand-primary/75 leading-relaxed mb-8">
              {selectedService.description}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#FAF9F6]/80 p-4 rounded-xl border border-brand-primary/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary/50 block">
                  Duration
                </span>
                <span className="font-display font-bold text-sm text-brand-primary flex items-center gap-1.5 mt-1">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  {selectedService.duration}
                </span>
              </div>

              <div className="bg-[#FAF9F6]/80 p-4 rounded-xl border border-brand-primary/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary/50 block">
                  Recovery Time
                </span>
                <span className="font-display font-bold text-sm text-brand-primary flex items-center gap-1.5 mt-1">
                  <Activity className="w-3.5 h-3.5 text-brand-accent" />
                  {selectedService.recoveryTime}
                </span>
              </div>

              <div className="col-span-2 md:col-span-1 bg-[#FAF9F6]/80 p-4 rounded-xl border border-brand-primary/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary/50 block">
                  Estimated Investment
                </span>
                <span className="font-mono font-bold text-sm text-brand-primary mt-1 block">
                  ${selectedService.costRange.min.toLocaleString()} - ${selectedService.costRange.max.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-8">
              <h4 className="text-xs font-bold font-mono tracking-wider text-brand-primary uppercase mb-4">
                Clinical & Aesthetic Benefits
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {selectedService.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-brand-primary/80">
                    <div className="w-5 h-5 rounded-full bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-accent" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Estimate Projection Bar */}
            <div className="bg-brand-primary/5 p-5 rounded-2xl border border-brand-primary/5 mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-brand-primary/60 mb-2">
                <span>Conservative Range</span>
                <span>Complex Alignment</span>
              </div>
              <div className="h-2 w-full bg-brand-primary/10 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-[25%] right-[20%] h-full bg-brand-accent rounded-full" />
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] font-mono text-brand-primary/40">
                  Exact quotation requires clinical diagnostics
                </span>
                <span className="text-xs font-semibold text-brand-primary flex items-center gap-1">
                  Average: <span className="font-mono text-brand-accent">${((selectedService.costRange.min + selectedService.costRange.max) / 2).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Direct Booking Trigger */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-xs text-brand-primary/60">
                Interested in this custom procedure? Lock in a design consultation slot.
              </div>
              <button
                onClick={() => onSelectService(selectedService.id)}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-brand-accent transition-colors duration-300 cursor-pointer shadow-md"
              >
                <span>Select for Booking</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
