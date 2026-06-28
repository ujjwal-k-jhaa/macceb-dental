import React, { useState, useMemo } from "react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Check, ArrowRight, ShieldCheck, DollarSign, Calendar, Sparkles } from "lucide-react";

interface PriceEstimatorProps {
  onBookWithBundle: (serviceIds: string[]) => void;
}

interface SelectedServicesState {
  [serviceId: string]: boolean;
}

export default function PriceEstimator({ onBookWithBundle }: PriceEstimatorProps) {
  // Select Digital Smile Design by default
  const [selectedServices, setSelectedServices] = useState<SelectedServicesState>({
    cosmetic: true,
  });
  
  const [materialGrade, setMaterialGrade] = useState<"standard" | "premium" | "master">("premium");
  const [includeDiagnostics, setIncludeDiagnostics] = useState<boolean>(true);
  const [financingMonths, setFinancingMonths] = useState<12 | 24 | 36>(24);

  // Toggle selected service
  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const updated = { ...prev, [serviceId]: !prev[serviceId] };
      // Ensure at least one service is selected
      const selectedCount = Object.values(updated).filter(Boolean).length;
      if (selectedCount === 0) return prev;
      return updated;
    });
  };

  // Materials config
  const materials = [
    { id: "standard", name: "Composite Resin", multiplier: 0.85, tag: "Standard High Quality" },
    { id: "premium", name: "Feldspathic Ceramic", multiplier: 1.0, tag: "Swiss Crystalline" },
    { id: "master", name: "Monolithic Zirconia", multiplier: 1.25, tag: "Max Biocompatibility" },
  ];

  // Calculate totals
  const estimates = useMemo(() => {
    let minTotal = 0;
    let maxTotal = 0;
    let totalDurationDays = 0;
    let maxRecoveryTime = "Immediate";

    // Sum selected services
    SERVICES.forEach((service) => {
      if (selectedServices[service.id]) {
        minTotal += service.costRange.min;
        maxTotal += service.costRange.max;
        
        // Accumulate approximate timeline metrics
        if (service.id === "cosmetic" || service.id === "veneers") totalDurationDays += 7;
        if (service.id === "aligners") totalDurationDays += 180;
        if (service.id === "implants") totalDurationDays += 90;
        
        if (service.recoveryTime !== "Immediate") {
          maxRecoveryTime = service.recoveryTime; // Priority recovery indicator
        }
      }
    });

    // Apply material multiplier (mainly affects cosmetic/restorative work)
    const materialObj = materials.find((m) => m.id === materialGrade);
    const multiplier = materialObj ? materialObj.multiplier : 1.0;
    
    minTotal = Math.round(minTotal * multiplier);
    maxTotal = Math.round(maxTotal * multiplier);

    // Diagnostics additive
    if (includeDiagnostics) {
      minTotal += 250;
      maxTotal += 350;
    }

    // Apply 5% bundling discount if multiple treatments are selected
    const selectedCount = Object.values(selectedServices).filter(Boolean).length;
    const isBundled = selectedCount >= 2;
    if (isBundled) {
      minTotal = Math.round(minTotal * 0.92); // 8% bundling discount
      maxTotal = Math.round(maxTotal * 0.92);
    }

    const avgTotal = Math.round((minTotal + maxTotal) / 2);
    const monthlyFinance = Math.round(avgTotal / financingMonths);

    return {
      minTotal,
      maxTotal,
      avgTotal,
      monthlyFinance,
      totalDurationDays,
      maxRecoveryTime,
      isBundled,
      selectedCount,
    };
  }, [selectedServices, materialGrade, includeDiagnostics, financingMonths]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Configuration Panel (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Headline */}
          <div>
            <h4 className="text-sm font-bold font-mono tracking-wider text-brand-accent uppercase flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-brand-accent" />
              Bespoke Estimate Calculator
            </h4>
            <p className="text-xs text-brand-primary/60">
              Select multiple procedures to create a comprehensive custom dental plan. Our dynamic matrix factors in biocompatible material grades, standard diagnostic scans, and volume bundling adjustments.
            </p>
          </div>

          {/* Service Grid Selectors */}
          <div>
            <span className="text-[11px] font-bold font-mono tracking-wider text-brand-primary uppercase mb-3 block">
              1. Choose Treatments
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((service) => {
                const isSelected = !!selectedServices[service.id];
                return (
                  <button
                    key={service.id}
                    onClick={() => handleToggleService(service.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl text-left border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white border-brand-accent shadow-md shadow-brand-accent/5"
                        : "bg-white/40 border-brand-primary/5 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "bg-brand-accent border-brand-accent text-white" : "border-brand-primary/20 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="font-serif italic font-semibold text-sm text-brand-primary block leading-snug">
                        {service.title}
                      </span>
                      <span className="font-mono text-[10px] text-brand-primary/50 mt-1 block">
                        Est. ${service.costRange.min} - ${service.costRange.max}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material Grade Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-bold font-mono tracking-wider text-brand-primary uppercase">
                2. Select Biocompatible Material Grade
              </span>
              <span className="text-[10px] font-mono text-brand-accent font-semibold bg-brand-accent/10 px-2 py-0.5 rounded">
                Cosmetic Factor
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {materials.map((m) => {
                const isSelected = materialGrade === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMaterialGrade(m.id as any)}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      isSelected
                        ? "bg-brand-primary border-brand-primary text-white"
                        : "bg-white/40 border-brand-primary/5 hover:bg-white text-brand-primary"
                    }`}
                  >
                    <span className="font-serif italic font-semibold text-xs block">{m.name}</span>
                    <span
                      className={`font-mono text-[9px] mt-1.5 px-1.5 py-0.5 rounded uppercase font-medium tracking-wide ${
                        isSelected ? "bg-white/20 text-brand-accent" : "bg-brand-primary/5 text-brand-primary/60"
                      }`}
                    >
                      {m.tag}
                    </span>
                    <span className="font-mono text-[10px] mt-2 block font-semibold opacity-80">
                      x{m.multiplier} Cost
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostics and Scans Toggle */}
          <div className="bg-[#FAF9F6] p-4 rounded-xl border border-brand-primary/5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <input
                id="diagnostics-toggle"
                type="checkbox"
                checked={includeDiagnostics}
                onChange={(e) => setIncludeDiagnostics(e.target.checked)}
                className="w-4 h-4 rounded border-brand-primary/20 accent-brand-accent text-white mt-1 cursor-pointer"
              />
              <div>
                <label htmlFor="diagnostics-toggle" className="font-display font-bold text-xs text-brand-primary cursor-pointer">
                  Include 3D CT Diagnostic Scan & Virtual Consultation
                </label>
                <p className="text-[10px] text-brand-primary/50 mt-0.5">
                  Millimeter-level bone and tissue structure diagnostics ($350 value).
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-semibold text-brand-primary shrink-0 ml-4">$250</span>
          </div>

          {/* Financing Plan Selection */}
          <div>
            <span className="text-[11px] font-bold font-mono tracking-wider text-brand-primary uppercase mb-3 block">
              3. Finance Interest-Free Period (0% APR)
            </span>
            <div className="grid grid-cols-3 gap-3">
              {([12, 24, 36] as const).map((m) => {
                const isSelected = financingMonths === m;
                return (
                  <button
                    key={m}
                    onClick={() => setFinancingMonths(m)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-brand-primary border-brand-primary text-white"
                        : "bg-white/40 border-brand-primary/5 hover:bg-white text-brand-primary"
                    }`}
                  >
                    {m} Months
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Warning Indicator */}
        <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl border border-yellow-500/10 bg-yellow-500/5 text-brand-primary/80">
          <span className="text-sm shrink-0">ℹ️</span>
          <p className="text-[11px] leading-relaxed">
            Estimates represent standard clinical thresholds. Actual micro-surgical complexities or custom veneer counts will be determined during physical consults with digital scanning.
          </p>
        </div>
      </div>

      {/* Dynamic Calculations View Panel (5 cols) */}
      <div className="lg:col-span-5 flex">
        <div className="glass-panel-dark rounded-3xl p-6 md:p-8 border border-white/10 text-white flex flex-col justify-between w-full shadow-2xl relative overflow-hidden">
          {/* Subtle gradient light background */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-brand-accent/10 rounded-full blur-2xl -z-10" />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-serif italic font-semibold text-sm tracking-wider text-brand-accent uppercase">
                Estimate Summary
              </span>
              {estimates.isBundled && (
                <span className="font-mono text-[9px] font-bold bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full uppercase tracking-wider">
                  8% Bundle Saved
                </span>
              )}
            </div>

            {/* Total Estimate Gauge */}
            <div className="py-2">
              <span className="text-[10px] font-mono text-white/50 uppercase block">
                Projected Out-of-Pocket Cost
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl md:text-4xl font-mono font-bold text-brand-accent tracking-tight">
                  ${estimates.minTotal.toLocaleString()}
                </span>
                <span className="text-lg text-white/40 font-mono">-</span>
                <span className="text-2xl md:text-3xl font-mono font-bold text-white/80">
                  ${estimates.maxTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Sub details */}
            <div className="space-y-3.5 border-t border-white/10 pt-5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 font-sans">Procedures Selected</span>
                <span className="font-mono font-semibold text-white/90">
                  {estimates.selectedCount} line item{estimates.selectedCount > 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 font-sans">Material Grade</span>
                <span className="font-mono font-semibold text-brand-accent uppercase text-[10px]">
                  {materials.find((m) => m.id === materialGrade)?.name}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 font-sans">Diagnostics Scan</span>
                <span className="font-mono font-semibold text-white/90">
                  {includeDiagnostics ? "Included" : "Excluded"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 font-sans">Approx. Clinical Time</span>
                <span className="font-mono font-semibold text-white/95">
                  {estimates.totalDurationDays > 0
                    ? estimates.totalDurationDays >= 30
                      ? `~ ${Math.ceil(estimates.totalDurationDays / 30)} Months`
                      : `~ ${estimates.totalDurationDays} Days`
                    : "Immediate"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-white/50 font-sans">Peak Recovery Time</span>
                <span className="font-mono font-semibold text-white/95">
                  {estimates.maxRecoveryTime}
                </span>
              </div>
            </div>

            {/* Financing Option Widget */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] font-mono text-brand-accent uppercase font-bold block mb-1">
                Zero-Interest Subscription Option
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-white">${estimates.monthlyFinance}</span>
                <span className="text-xs text-white/50">/ month</span>
              </div>
              <p className="text-[9px] text-white/40 mt-1.5 leading-relaxed">
                Choose the 0% APR installment program during checkout. Split into {financingMonths} fixed monthly payments. Over 84% of clients qualify.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                const serviceIds = Object.keys(selectedServices).filter((k) => selectedServices[k]);
                onBookWithBundle(serviceIds);
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-accent text-brand-primary text-xs font-bold tracking-wide hover:bg-brand-accent/90 transition-colors duration-300 cursor-pointer shadow-lg shadow-brand-accent/10"
            >
              <span>Schedule Custom Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[9px] text-white/30 text-center block mt-3 leading-snug">
              Secure reservation with flexible scheduling adjustments later.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
