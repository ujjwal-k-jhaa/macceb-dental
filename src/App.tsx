import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TreatmentExplorer from "./components/TreatmentExplorer";
import PriceEstimator from "./components/PriceEstimator";
import TechShowcase from "./components/TechShowcase";
import AppointmentScheduler from "./components/AppointmentScheduler";
import { DOCTORS, REVIEWS, FAQS, IMAGES } from "./data";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Sparkles, ArrowRight, ShieldCheck, Star, Clock, MapPin, 
  ChevronDown, Plane, Shield, CreditCard, MessageSquare, Plus, Minus
} from "lucide-react";
import ScrollReveal from "./components/ScrollReveal";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Appointment Scheduler modal states
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [schedulerInitialServiceId, setSchedulerInitialServiceId] = useState("");
  const [schedulerInitialDoctorId, setSchedulerInitialDoctorId] = useState("");
  const [schedulerInitialBundleServiceIds, setSchedulerInitialBundleServiceIds] = useState<string[]>([]);

  // FAQ open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "treatments", "tech", "estimate", "specialists", "concierge"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Triggers scheduler with preset service
  const handleSelectServiceForBooking = (serviceId: string) => {
    setSchedulerInitialServiceId(serviceId);
    setSchedulerInitialDoctorId("");
    setSchedulerInitialBundleServiceIds([]);
    setIsSchedulerOpen(true);
  };

  // Triggers scheduler with preset bundles
  const handleSelectBundleForBooking = (serviceIds: string[]) => {
    if (serviceIds.length > 0) {
      setSchedulerInitialServiceId(serviceIds[0]);
    }
    setSchedulerInitialDoctorId("");
    setSchedulerInitialBundleServiceIds(serviceIds);
    setIsSchedulerOpen(true);
  };

  // Triggers scheduler with preset doctor
  const handleSelectDoctorForBooking = (doctorId: string) => {
    setSchedulerInitialServiceId("");
    setSchedulerInitialDoctorId(doctorId);
    setSchedulerInitialBundleServiceIds([]);
    setIsSchedulerOpen(true);
  };

  // Open default scheduler
  const handleOpenGeneralBooking = () => {
    setSchedulerInitialServiceId("");
    setSchedulerInitialDoctorId("");
    setSchedulerInitialBundleServiceIds([]);
    setIsSchedulerOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FAF9F6] text-brand-primary min-h-screen relative font-sans overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Premium Header */}
      <Header onOpenBooking={handleOpenGeneralBooking} activeSection={activeSection} />

      {/* SECTION 1: HERO (HOME) */}
      <section
        id="home"
        className="min-h-screen relative flex items-center justify-center pt-24 px-6 md:px-12 pb-16 overflow-hidden"
      >
        {/* Background image of clinic lobby with custom gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroLobby}
            alt="macceb Dental Luxury Lobby"
            className="w-full h-full object-cover select-none brightness-[0.93]"
            referrerPolicy="no-referrer"
          />
          {/* Custom vignette gradient and radial overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/85 to-[#FAF9F6]/10 lg:from-[#FAF9F6] lg:via-[#FAF9F6]/90 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]/30" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Hero text frame (7 cols) */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 text-left space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-primary/5 px-3 py-1.5 rounded-full border border-brand-primary/10">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-brand-primary/70">
                Pioneering Swiss Restoration Science
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-brand-primary">
              Scientific precision. <br />
              <span className="text-gradient">Sculpted aesthetics.</span>
            </h1>

            <p className="text-sm md:text-base text-brand-primary/75 leading-relaxed font-sans font-normal max-w-lg">
              Welcome to macceb Dental, a boutique clinical sanctuary designed for discerning clients. By merging computed 3D micro-guided surgeries with custom organic Swiss porcelain restorations, we deliver painless tooth alignments with peerless accuracy.
            </p>

            {/* Quick action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenGeneralBooking}
                className="px-7 py-3.5 rounded-full bg-brand-primary text-white text-xs font-bold tracking-wide hover:bg-brand-primary/95 transition-all shadow-xl shadow-brand-primary/10 flex items-center gap-2.5 cursor-pointer border border-brand-accent/20"
              >
                <span>Reserve Consultation</span>
                <ArrowRight className="w-4 h-4 text-brand-accent" />
              </button>

              <a
                href="#treatments"
                className="px-6 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-brand-primary/5 text-brand-primary text-xs font-bold hover:bg-white hover:shadow-sm transition-all flex items-center gap-2"
              >
                <span>Explore Treatments</span>
              </a>
            </div>

            {/* Micro accreditation metrics */}
            <div className="pt-8 border-t border-brand-primary/5 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <span className="font-mono font-bold text-lg md:text-xl text-brand-accent block leading-none">
                  99.8%
                </span>
                <span className="text-[10px] text-brand-primary/50 uppercase tracking-wide mt-1 block">
                  Surgical Success
                </span>
              </div>
              <div>
                <span className="font-mono font-bold text-lg md:text-xl text-brand-accent block leading-none">
                  0%
                </span>
                <span className="text-[10px] text-brand-primary/50 uppercase tracking-wide mt-1 block">
                  Pressure Pain
                </span>
              </div>
              <div>
                <span className="font-mono font-bold text-lg md:text-xl text-brand-accent block leading-none">
                  25Yr
                </span>
                <span className="text-[10px] text-brand-primary/50 uppercase tracking-wide mt-1 block">
                  Veneer Luster
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Floating Card (5 cols) - Glassmorphic Hero highlight */}
          <div className="lg:col-span-5 hidden lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glass-panel-light p-6 rounded-3xl border border-brand-primary/10 w-full shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl" />

              <span className="text-[10px] font-mono text-brand-accent font-bold uppercase tracking-widest block mb-4">
                Clinical Highlight
              </span>

              <h4 className="font-serif italic font-semibold text-base text-brand-primary mb-2.5">
                Painless Computerized Local Anesthesia
              </h4>
              
              <p className="text-[11px] text-brand-primary/70 leading-relaxed mb-4">
                No standard pinches, zero localized trauma, and absolutely no lingering cheek paralysis. Our signature Wand™ technology delivers precise target molecule distribution tracked by computerized tissue density.
              </p>

              <div className="bg-[#FAF9F6]/80 p-3.5 rounded-xl border border-brand-primary/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="font-display font-bold text-xs text-brand-primary block">
                    Zero-Pressure Protocol
                  </span>
                  <p className="text-[9px] text-brand-primary/40">
                    Calculated molecule flow below physical nerve thresholds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO ACCREDITATIONS (STATIC TRUST BANNER) */}
      <section className="bg-white py-12 border-y border-brand-primary/5 relative z-10">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-accent uppercase block">
                World-Class Standards
              </span>
              <h3 className="font-serif italic font-semibold text-xl md:text-2xl text-brand-primary tracking-tight">
                Clinical Affiliations & Accreditations
              </h3>
            </div>
            <p className="text-xs text-brand-primary/50 max-w-sm leading-relaxed font-sans">
              Authorized by Swiss and European regulatory boards, ensuring microscopic surgical precision and certified cosmetic dentistry standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FAF9F6]/50 border border-brand-primary/5 hover:border-brand-accent/30 p-4.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px] group">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                <span className="text-lg">🇨🇭</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-accent block font-bold">
                  Zurich Speciation
                </span>
                <span className="font-display font-bold text-xs text-brand-primary group-hover:text-brand-accent transition-colors">
                  Swiss Aesthetic Association
                </span>
              </div>
            </div>

            <div className="bg-[#FAF9F6]/50 border border-brand-primary/5 hover:border-brand-accent/30 p-4.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px] group">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                <span className="text-lg">🇪🇺</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-accent block font-bold">
                  Surgical Board
                </span>
                <span className="font-display font-bold text-xs text-brand-primary group-hover:text-brand-accent transition-colors">
                  European Implant Council
                </span>
              </div>
            </div>

            <div className="bg-[#FAF9F6]/50 border border-brand-primary/5 hover:border-brand-accent/30 p-4.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px] group">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                <span className="text-lg">🇺🇸</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-accent block font-bold">
                  Osseous Research
                </span>
                <span className="font-display font-bold text-xs text-brand-primary group-hover:text-brand-accent transition-colors">
                  Academy of Osseointegration
                </span>
              </div>
            </div>

            <div className="bg-[#FAF9F6]/50 border border-brand-primary/5 hover:border-brand-accent/30 p-4.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 hover:shadow-sm hover:translate-y-[-2px] group">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                <span className="text-lg">🎓</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-brand-accent block font-bold">
                  Cosmetic Design
                </span>
                <span className="font-display font-bold text-xs text-brand-primary group-hover:text-brand-accent transition-colors">
                  Digital Smile Design Certified
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 3: TREATMENT LINES (TREATMENTS) */}
      <section id="treatments" className="py-24 px-6 md:px-12 relative">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Specialized Treatment Lines
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
              A bespoke array of cosmetic and micro-surgical practices.
            </h2>
            <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed">
              Every procedure line at macceb is custom synthesized for individual facial geometry. We avoid standard formulas, prioritizing structural health and the crystalline optical properties of real teeth.
            </p>
          </div>

          {/* Interactive treatments tab system */}
          <TreatmentExplorer onSelectService={handleSelectServiceForBooking} />
        </ScrollReveal>
      </section>

      {/* SECTION 4: CLINICAL TECHNOLOGY (TECH) */}
      <section id="tech" className="py-24 px-6 md:px-12 bg-white relative">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Advanced Clinical Technology
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
              Millimeter accuracy meets computerized safety.
            </h2>
            <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed">
              Modern dentistry in 2026 relies on biometric data. By capturing microscopic digital topologies, we eliminate traditional putty molds and manual errors, ensuring flawless seating and bite balance.
            </p>
          </div>

          {/* Interactive Technology console */}
          <TechShowcase />
        </ScrollReveal>
      </section>

      {/* SECTION 5: COST ESTIMATOR (ESTIMATE) */}
      <section id="estimate" className="py-24 px-6 md:px-12 relative">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Investment Transparency
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
              Calculate your bespoke clinical program.
            </h2>
            <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed">
              We advocate for transparent clinical investment tracking. Use the configurator below to map out multi-treatment programs, material grades, and zero-interest financing plans instantly.
            </p>
          </div>

          {/* Price Estimator Widget */}
          <PriceEstimator onBookWithBundle={handleSelectBundleForBooking} />
        </ScrollReveal>
      </section>

      {/* SECTION 6: THE CLINICAL SPECIALISTS (SPECIALISTS) */}
      <section id="specialists" className="py-24 px-6 md:px-12 bg-white relative">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Expert Clinical Specialists
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
              An alliance of surgical mastery and aesthetic artistry.
            </h2>
            <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed">
              Our specialists hold distinguished board certificates across Switzerland, Germany, and the United States, operating as faculty speakers and clinical researchers globally.
            </p>
          </div>

          {/* Doctor profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DOCTORS.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#FAF9F6] border border-brand-primary/5 rounded-3xl overflow-hidden shadow-sm flex flex-col group"
              >
                {/* Doctor Portrait with gentle zoom */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-brand-primary/5 flex items-center gap-1 shadow-sm">
                    <span className="text-brand-accent font-bold text-xs font-mono">★</span>
                    <span className="text-xs font-mono font-bold text-brand-primary">
                      {doc.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Doctor details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-wider block">
                      {doc.role}
                    </span>
                    <h3 className="font-serif italic font-semibold text-xl text-brand-primary">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-brand-primary/70 leading-relaxed font-normal">
                      {doc.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-primary/5 space-y-3">
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-[9px] font-mono font-semibold bg-white border border-brand-primary/5 text-brand-primary/70 px-2 py-0.5 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectDoctorForBooking(doc.id)}
                      className="w-full text-center py-2.5 rounded-xl border border-brand-primary/10 hover:border-brand-primary hover:bg-brand-primary hover:text-white transition-all text-xs font-bold cursor-pointer"
                    >
                      View Availability & Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 7: INTERACTIVE VERIFIED TESTIMONIALS */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative backdrop blobs */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal direction="up" className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-2xl mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Patient Testimonials
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-primary tracking-tight">
              Verified outcomes from our clinical community.
            </h2>
            <p className="text-xs md:text-sm text-brand-primary/60 leading-relaxed">
              We treat public figures, executives, and families seeking precise standards. Read about their customized patient journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel-light rounded-3xl p-6 md:p-8 border border-brand-primary/5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-4">
                  {/* Rating star matrix */}
                  <div className="flex items-center gap-1 text-brand-accent">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-brand-primary/80 leading-relaxed italic font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-primary/5 mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-primary/5 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-serif font-bold text-sm text-brand-primary block">
                        {rev.name}
                      </span>
                      <span className="text-[9px] font-mono text-brand-accent uppercase tracking-wider block">
                        {rev.treatment}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-brand-primary/45 block">
                      {rev.date}
                    </span>
                    <span className="text-[8px] font-mono text-green-600 font-bold tracking-wider uppercase bg-green-500/10 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 8: SWISS CONCIERGE MEDICAL SERVICES (CONCIERGE) */}
      <section id="concierge" className="py-24 px-6 md:px-12 bg-brand-primary text-white relative overflow-hidden">
        {/* Glow backdrop design */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal direction="up" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Text block (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              International & Executive Concierge
            </span>
            
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-snug">
              A comprehensive clinical travel framework.
            </h2>

            <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-xl">
              We accommodate multiple international clients traveling from Europe, Asia, and Latin America. Our dedicated administrative embassy streamlines travel coordination, hotel accommodation, and fast-track procedure scheduling to minimize your transit time.
            </p>

            {/* Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                <Plane className="w-5 h-5 text-brand-accent mb-2.5" />
                <span className="font-display font-bold text-xs text-white block">
                  Embassy Logistics
                </span>
                <p className="text-[10px] text-white/55 mt-1 leading-relaxed">
                  Full airport pickup and VIP ground transfers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                <Shield className="w-5 h-5 text-brand-accent mb-2.5" />
                <span className="font-display font-bold text-xs text-white block">
                  Five-Star Lodging
                </span>
                <p className="text-[10px] text-white/55 mt-1 leading-relaxed">
                  Arrangements at premium partnering hotels.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                <CreditCard className="w-5 h-5 text-brand-accent mb-2.5" />
                <span className="font-display font-bold text-xs text-white block">
                  Express Fast-Track
                </span>
                <p className="text-[10px] text-white/55 mt-1 leading-relaxed">
                  Consolidated multi-step treatments in 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Graphical CTA Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl relative">
              <span className="text-[9px] font-mono text-brand-accent font-bold uppercase tracking-wider block mb-2">
                Fast-Track Consultation
              </span>
              <h3 className="font-serif italic font-semibold text-lg text-white mb-3">
                Coordinate with a Concierge Planner
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Receive personalized scheduling estimates, travel accommodation guides, and medical board profiles before your departure.
              </p>

              <button
                onClick={handleOpenGeneralBooking}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-accent text-brand-primary text-xs font-bold hover:bg-brand-accent/90 transition-colors cursor-pointer"
              >
                <span>Initiate Travel Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 9: ACCORDION FAQ */}
      <section className="py-24 px-6 md:px-12 relative bg-white">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
            <span className="text-xs font-bold font-mono tracking-[0.2em] text-brand-accent uppercase block">
              Frequently Asked Queries
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-primary tracking-tight">
              Answering your clinical & administrative inquiries.
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-brand-primary/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left p-6 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif font-semibold text-sm md:text-base text-brand-primary leading-tight pr-4">
                      {faq.q}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full bg-white border border-brand-primary/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-brand-primary text-white" : "text-brand-primary/60"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-brand-primary/70 leading-relaxed border-t border-brand-primary/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* OMNIPRESENT FLOATING QUICK ACTION BAR (SCROLLING CTA) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGeneralBooking}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-brand-primary text-white text-xs font-bold tracking-wide shadow-2xl hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 cursor-pointer border border-brand-accent/20"
        >
          <Clock className="w-4 h-4 text-brand-accent" />
          <span>Quick Reserve</span>
        </motion.button>
      </div>

      {/* COMPREHENSIVE SCHEDULER OVERLAY MODAL */}
      <AnimatePresence>
        {isSchedulerOpen && (
          <AppointmentScheduler
            isOpen={isSchedulerOpen}
            onClose={() => setIsSchedulerOpen(false)}
            initialServiceId={schedulerInitialServiceId}
            initialDoctorId={schedulerInitialDoctorId}
            initialBundleServiceIds={schedulerInitialBundleServiceIds}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
