import React, { useState } from "react";
import { TECHNOLOGIES } from "../data";
import { Technology } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, ShieldCheck, HeartPulse, Zap, CheckCircle, Info } from "lucide-react";

export default function TechShowcase() {
  const [selectedTech, setSelectedTech] = useState<Technology>(TECHNOLOGIES[0]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Nodes for the active blueprint visualizer based on tech selection
  const blueprints: Record<string, { label: string; x: string; y: string; detail: string }[]> = {
    scanner: [
      { label: "12kHz Laser Emitting Lens", x: "25%", y: "30%", detail: "Projects 12,000 light segments per second for real-time mesh modeling." },
      { label: "Anti-fog Sapphire Window", x: "70%", y: "45%", detail: "Maintains absolute clarity in warm moisture conditions with custom temp-coils." },
      { label: "Spatial Gyroscope Feed", x: "40%", y: "75%", detail: "Transmits sub-millimeter rotation coordinates to our local render engine." },
    ],
    anesthesia: [
      { label: "Real-time Tissue density sensor", x: "30%", y: "25%", detail: "Samples tissue feedback to deliver molecules below critical tension limits." },
      { label: "Piezoresistive Fluid Engine", x: "75%", y: "50%", detail: "Governs precise volumetric flow in increments of 0.01mL/sec." },
      { label: "Aura LED Status Ring", x: "50%", y: "80%", detail: "Indicates exact sensory blockage levels with high-contrast color shifts." },
    ],
    laser: [
      { label: "CO2 Crystalline Focus Tip", x: "20%", y: "40%", detail: "Bridges the 10.6 micron thermal laser light with pinpoint target accuracy." },
      { label: "Micro-Coaxial Helium Jet", x: "65%", y: "35%", detail: "Soothes the surgical field with immediate temperature-controlled chilling." },
      { label: "Dual wavelength pilot beam", x: "45%", y: "70%", detail: "Casts a secondary safe pilot glow for ultra-precise tissue tracing." },
    ],
  };

  const currentNodes = blueprints[selectedTech.id] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Interactive Blueprint Console (5 cols) */}
      <div className="lg:col-span-5 flex">
        <div className="glass-panel-dark rounded-3xl p-6 border border-white/10 text-white flex flex-col justify-between w-full shadow-2xl relative overflow-hidden bg-[#121c1a] min-h-[360px]">
          {/* Diagnostic Screen grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Panel stats */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
                Diagnostic Console v2.6
              </span>
            </div>
            <span className="font-mono text-[9px] text-brand-accent font-semibold px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
              ACTIVE MATRIX
            </span>
          </div>

          {/* Graphical Core */}
          <div className="relative flex-1 my-6 flex items-center justify-center min-h-[220px]">
            {/* Hologram Circle */}
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "25s" }} />
            <div className="absolute w-32 h-32 rounded-full border border-brand-accent/20 animate-pulse" />

            {/* Core Tech Visual */}
            <div className="absolute flex flex-col items-center">
              <Cpu className="w-12 h-12 text-brand-accent mb-2 stroke-[1.25]" />
              <span className="font-serif italic font-semibold text-sm tracking-wider text-white/90">
                {selectedTech.title}
              </span>
              <span className="font-mono text-[9px] text-white/40 uppercase mt-0.5">
                {selectedTech.tag}
              </span>
            </div>

            {/* Floating Blueprint Nodes */}
            {currentNodes.map((node, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{ top: node.y, left: node.x }}
              >
                <button
                  onMouseEnter={() => setActiveNode(idx)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => setActiveNode(activeNode === idx ? null : idx)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                    activeNode === idx
                      ? "bg-brand-accent text-brand-primary scale-110 shadow-lg shadow-brand-accent/30"
                      : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                  
                  {/* Subtle radiating pulse effect */}
                  {activeNode !== idx && (
                    <span className="absolute inset-0 rounded-full bg-white/5 animate-ping" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Node explanation tray */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl z-10 min-h-[85px] transition-all duration-300">
            <AnimatePresence mode="wait">
              {activeNode !== null ? (
                <motion.div
                  key={activeNode}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-brand-accent font-bold font-mono">
                    <Info className="w-3.5 h-3.5" />
                    <span>0{activeNode + 1} - {currentNodes[activeNode].label}</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed mt-1">
                    {currentNodes[activeNode].detail}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center h-full pt-1.5"
                >
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    Hover or tap nodes 1-3 to inspect micro-components
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Structured Copy & Details (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div className="space-y-6">
          <span className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-brand-accent">
            Advanced Clinical Framework
          </span>

          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-brand-primary leading-tight tracking-tight">
            Innovations dictating precision, comfort, and immediate results.
          </h3>

          {/* Interactive tabs */}
          <div className="flex flex-wrap gap-2.5 pb-2">
            {TECHNOLOGIES.map((tech) => {
              const isSelected = selectedTech.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                    isSelected
                      ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/10"
                      : "bg-white/55 border-brand-primary/5 hover:bg-white text-brand-primary"
                  }`}
                >
                  {tech.title}
                </button>
              );
            })}
          </div>

          {/* Active tech detailed description */}
          <div className="glass-panel-light p-6 rounded-2xl border border-brand-primary/5 relative">
            <span className="text-[9px] font-bold font-mono tracking-wider text-brand-accent uppercase bg-brand-accent/10 px-2.5 py-0.5 rounded">
              {selectedTech.tag}
            </span>
            <h4 className="font-serif italic font-semibold text-lg text-brand-primary mt-3.5 mb-2.5">
              How it works at macceb
            </h4>
            <p className="text-xs md:text-sm text-brand-primary/70 leading-relaxed mb-5">
              {selectedTech.description}
            </p>

            <div className="border-t border-brand-primary/5 pt-4 flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-brand-primary tracking-wide">
                  Key Advantage:
                </span>
                <p className="text-xs text-brand-primary/80 mt-0.5 leading-normal">
                  {selectedTech.advantage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Assurance Banner */}
        <div className="mt-6 flex items-center gap-4 bg-white/50 p-4 rounded-2xl border border-brand-primary/5">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 border border-brand-accent/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-xs text-brand-primary">
              Standardized Hospital-Grade Sterilization
            </span>
            <p className="text-[10px] text-brand-primary/50 mt-0.5">
              Class-B autoclave technology with dynamic vacuum sensors ensures 100% molecular sterilization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
