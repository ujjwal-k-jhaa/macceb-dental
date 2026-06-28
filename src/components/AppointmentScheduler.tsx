import React, { useState, useMemo } from "react";
import { SERVICES, DOCTORS } from "../data";
import { Doctor, Service, BookingDetails } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Calendar, Clock, User, CheckCircle, Mail, PhoneCall, 
  ChevronRight, ArrowRight, ShieldCheck, FileText, Sparkles, AlertCircle 
} from "lucide-react";

interface AppointmentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialBundleServiceIds?: string[];
  initialDoctorId?: string;
}

export default function AppointmentScheduler({ 
  isOpen, 
  onClose, 
  initialServiceId = "", 
  initialBundleServiceIds = [],
  initialDoctorId = ""
}: AppointmentSchedulerProps) {
  
  // Step manager: 'select' -> 'details' -> 'success'
  const [step, setStep] = useState<"select" | "details" | "success">("select");

  // Selection states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (initialBundleServiceIds.length > 0 ? initialBundleServiceIds[0] : SERVICES[0].id)
  );
  
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId || DOCTORS[0].id);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Contact States
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formError, setFormError] = useState("");

  // Generation of next 14 business days dynamically starting from current day (June 26, 2026)
  const availableDates = useMemo(() => {
    const dates = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let currentDate = new Date(2026, 5, 26); // Starting June 26, 2026
    let count = 0;
    
    while (count < 12) {
      const dayOfWeek = weekdays[currentDate.getDay()];
      // Skip Sundays
      if (dayOfWeek !== "Sun") {
        dates.push({
          dayOfWeek,
          dayNum: currentDate.getDate(),
          monthName: months[currentDate.getMonth()],
          fullString: `${dayOfWeek}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, 2026`,
          shortDay: dayOfWeek,
        });
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }, []);

  const selectedService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  const selectedDoctor = useMemo(() => {
    return DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];
  }, [selectedDoctorId]);

  const activeDate = availableDates[selectedDateIndex];

  // Check if doctor works on the selected day
  const isDoctorAvailableOnDay = useMemo(() => {
    return selectedDoctor.availableDays.includes(activeDate.shortDay);
  }, [selectedDoctor, activeDate]);

  // Adjust time slots dynamically
  const timeSlots = useMemo(() => {
    if (!isDoctorAvailableOnDay) return [];
    return selectedDoctor.availableSlots;
  }, [selectedDoctor, isDoctorAvailableOnDay]);

  // Auto-set first slot if doctor is available
  React.useEffect(() => {
    if (timeSlots.length > 0) {
      setSelectedTime(timeSlots[0]);
    } else {
      setSelectedTime("");
    }
  }, [timeSlots, selectedDateIndex, selectedDoctorId]);

  // Validation before details step
  const handleProceedToDetails = () => {
    if (!selectedTime) {
      setFormError("Please choose an available appointment date and time slot.");
      return;
    }
    setFormError("");
    setStep("details");
  };

  // Submit appointment
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setFormError("Please fill out your name, email, and phone number.");
      return;
    }
    if (!agreedToTerms) {
      setFormError("Please consent to the privacy guidelines and medical authorization.");
      return;
    }
    setFormError("");
    setStep("success");
  };

  // Unique reservation code generator
  const reservationToken = useMemo(() => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `M-2026-${rand}`;
  }, [step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Dark backdrop blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#121C1A]/70 backdrop-blur-md"
      />

      {/* Main modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-5xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl relative border border-brand-primary/10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[90vh] z-10"
      >
        {/* Left column - Live Summary Ticket (Hidden on Success step for unified receipt) */}
        {step !== "success" && (
          <div className="hidden md:flex w-[320px] bg-brand-primary p-6 md:p-8 text-white flex-col justify-between border-r border-white/5 shrink-0 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/15 rounded-full blur-2xl" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-1.5 text-brand-accent">
                <Sparkles className="w-4 h-4" />
                <span className="font-serif italic font-semibold text-sm uppercase tracking-widest">
                  macceb Ticket
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                  Selected Treatment
                </span>
                <span className="font-serif italic font-semibold text-base text-white mt-1 block">
                  {selectedService.title}
                </span>
                <span className="text-[10px] font-mono text-brand-accent block mt-1">
                  Est. {selectedService.duration}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                  Specialist
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-8 h-8 rounded-full object-cover border border-brand-accent/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-serif italic font-semibold text-sm text-white block">
                      {selectedDoctor.name}
                    </span>
                    <span className="text-[9px] font-sans text-brand-accent uppercase tracking-wider font-semibold">
                      {selectedDoctor.role.split("&")[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                    Reservation Date
                  </span>
                  <span className="font-sans text-xs font-semibold text-white mt-1 block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                    {activeDate.fullString}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                    Reserved Time
                  </span>
                  <span className="font-mono text-xs font-semibold text-brand-accent mt-1 block flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedTime || "Not Selected"}
                  </span>
                </div>
              </div>

              {step === "details" && (
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                    Patient Profile
                  </span>
                  {clientName && (
                    <span className="text-xs font-medium text-white/90 truncate block">
                      👤 {clientName}
                    </span>
                  )}
                  {clientPhone && (
                    <span className="text-xs font-mono text-white/70 block">
                      📞 {clientPhone}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Micro details assurance */}
            <div className="mt-8 border-t border-white/10 pt-4 text-[10px] text-white/40 leading-snug">
              🔒 256-bit HIPAA compliant security. All data is encrypted and reserved exclusively for clinical mapping.
            </div>
          </div>
        )}

        {/* Right column - Dynamic interactive core */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto max-h-[92vh] md:max-h-none">
          {/* Header */}
          <div className="px-4 sm:px-6 md:px-8 py-4 md:py-5 border-b border-brand-primary/5 flex items-center justify-between sticky top-0 bg-[#FAF9F6]/95 backdrop-blur z-20">
            <div>
              <h3 className="font-serif italic font-semibold text-xl text-brand-primary tracking-tight">
                {step === "select" && "Schedule Consultation"}
                {step === "details" && "Contact Information"}
                {step === "success" && "Appointment Confirmed"}
              </h3>
              <p className="text-[11px] text-brand-primary/50">
                {step === "select" && "Select your clinician, calendar day, and preferred slot."}
                {step === "details" && "Ensure your records match precisely for coordination."}
                {step === "success" && "Your medical queue token has been registered successfully."}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-brand-primary/5 hover:bg-brand-primary/10 flex items-center justify-center text-brand-primary/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content body */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: SELECTOR GRIDS */}
              {step === "select" && (
                <motion.div
                  key="select-step"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* Service selector */}
                  <div>
                    <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-brand-primary mb-2.5 block">
                      1. Select Treatment Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`px-3 py-2.5 rounded-xl text-left border text-xs cursor-pointer transition-all ${
                            selectedServiceId === s.id
                              ? "bg-brand-primary border-brand-primary text-white font-medium"
                              : "bg-white border-brand-primary/5 hover:bg-brand-primary/5 text-brand-primary"
                          }`}
                        >
                          <span className="block truncate">{s.title}</span>
                          <span className="font-mono text-[9px] mt-0.5 block opacity-60">
                            ${s.costRange.min} - ${s.costRange.max}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Doctor selector */}
                  <div>
                    <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-brand-primary mb-2.5 block">
                      2. Choose Specialist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {DOCTORS.map((doc) => {
                        const isSelected = selectedDoctorId === doc.id;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDoctorId(doc.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all ${
                              isSelected
                                ? "bg-white border-brand-accent shadow-md"
                                : "bg-white/40 border-brand-primary/5 hover:bg-white"
                            }`}
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-brand-primary/10"
                              referrerPolicy="no-referrer"
                            />
                            <div className="truncate">
                              <span className="font-serif italic font-semibold text-sm text-brand-primary block truncate">
                                {doc.name}
                              </span>
                              <span className="text-[9px] font-mono text-brand-primary/50 block truncate">
                                {doc.role.split(" & ")[0]}
                              </span>
                              <span className="text-[10px] text-brand-accent font-bold font-mono">
                                ★ {doc.rating.toFixed(1)}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rolling calendar grid */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-brand-primary">
                        3. Choose Date
                      </label>
                      <span className="text-[9px] font-mono text-brand-primary/40 uppercase">
                        Exclude Sunday
                      </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableDates.map((date, idx) => {
                        const isSelected = selectedDateIndex === idx;
                        const worksThatDay = selectedDoctor.availableDays.includes(date.shortDay);
                        return (
                          <button
                            key={idx}
                            disabled={!worksThatDay}
                            onClick={() => setSelectedDateIndex(idx)}
                            className={`flex flex-col items-center p-2 rounded-xl text-center border cursor-pointer transition-all ${
                              !worksThatDay
                                ? "opacity-25 bg-brand-primary/5 border-transparent cursor-not-allowed"
                                : isSelected
                                ? "bg-brand-primary border-brand-primary text-white shadow-md"
                                : "bg-white border-brand-primary/5 hover:bg-white"
                            }`}
                          >
                            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
                              {date.dayOfWeek}
                            </span>
                            <span className="font-display font-extrabold text-sm my-0.5">
                              {date.dayNum}
                            </span>
                            <span className="font-mono text-[8px] uppercase">
                              {date.monthName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeslot matrix */}
                  <div>
                    <label className="text-[11px] font-bold font-mono uppercase tracking-wider text-brand-primary mb-2.5 block">
                      4. Select Available Time Slot
                    </label>
                    {isDoctorAvailableOnDay ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 rounded-xl font-mono text-xs font-bold border cursor-pointer transition-all text-center ${
                                isSelected
                                  ? "bg-brand-accent border-brand-accent text-brand-primary shadow-md"
                                  : "bg-white border-brand-primary/5 hover:bg-brand-primary/5 text-brand-primary/80"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-600">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-xs">
                          {selectedDoctor.name} is not on clinical duty on {activeDate.dayOfWeek}s. Please pick another date.
                        </span>
                      </div>
                    )}
                  </div>

                  {formError && (
                    <div className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      ⚠️ {formError}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: PATIENT CONTACT DATA */}
              {step === "details" && (
                <motion.form
                  key="details-step"
                  onSubmit={handleSubmitBooking}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  {/* Mobile Compact Ticket Summary */}
                  <div className="block md:hidden bg-brand-primary p-4 rounded-2xl text-white mb-4 relative overflow-hidden border border-brand-accent/10">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-brand-accent block font-bold">Selected Booking Summary</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="text-xs font-semibold font-serif italic text-white">{selectedService.title}</span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-xs text-white/90">{selectedDoctor.name}</span>
                      <span className="text-white/40 text-xs">•</span>
                      <span className="text-[10px] font-mono text-brand-accent">{activeDate.fullString} @ {selectedTime}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold font-mono uppercase tracking-wider text-brand-primary block mb-1.5">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/30" />
                        <input
                          type="text"
                          required
                          placeholder="Elizabeth Bennett"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-white border border-brand-primary/10 rounded-xl py-3 pl-10 pr-4 text-xs text-brand-primary focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold font-mono uppercase tracking-wider text-brand-primary block mb-1.5">
                        Secure Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/30" />
                        <input
                          type="email"
                          required
                          placeholder="elizabeth@domain.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full bg-white border border-brand-primary/10 rounded-xl py-3 pl-10 pr-4 text-xs text-brand-primary focus:outline-none focus:border-brand-accent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold font-mono uppercase tracking-wider text-brand-primary block mb-1.5">
                      Contact Mobile Phone *
                    </label>
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/30" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (202) 555-0143"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-white border border-brand-primary/10 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-brand-primary focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold font-mono uppercase tracking-wider text-brand-primary block mb-1.5">
                      Clinical Notes or Symptoms (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-4.5 w-4 h-4 text-brand-primary/30" />
                      <textarea
                        rows={3}
                        placeholder="Please elaborate on orthodontic history, specific tooth sensitivity, veneers questions, etc..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="w-full bg-white border border-brand-primary/10 rounded-xl py-3 pl-10 pr-4 text-xs text-brand-primary focus:outline-none focus:border-brand-accent resize-none"
                      />
                    </div>
                  </div>

                  {/* Terms check */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-brand-primary/20 accent-brand-accent text-white mt-0.5 cursor-pointer"
                      />
                      <span className="text-[10px] text-brand-primary/60 leading-normal">
                        I hereby authorize macceb Dental to schedule this appointment, transmit clinical records via secure medical endpoints, and verify standard patient records in accordance with standard medical privacy directives.
                      </span>
                    </label>
                  </div>

                  {formError && (
                    <div className="text-xs font-mono text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                      ⚠️ {formError}
                    </div>
                  )}
                </motion.form>
              )}

              {/* STEP 3: SUCCESS BILLING TICKET */}
              {step === "success" && (
                <motion.div
                  key="success-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  {/* Glowing medical confirmation circle */}
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600 mb-5 relative">
                    <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                    <span className="absolute inset-0 rounded-full bg-green-500/5 animate-ping" />
                  </div>

                  <h4 className="font-serif italic font-semibold text-2xl text-brand-primary tracking-tight">
                    Reservation Secured
                  </h4>
                  <p className="text-xs text-brand-primary/60 mt-1 max-w-sm">
                    Your appointment slot with {selectedDoctor.name} has been locked. A digital token confirmation has been dispatched to your records.
                  </p>

                  {/* Luxury Ticket Frame */}
                  <div className="w-full max-w-sm bg-white border border-brand-primary/10 rounded-2xl p-5 mt-6 relative shadow-md">
                    {/* Visual ticket notch cuts on the side */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-[#FAF9F6] border-r border-brand-primary/10" />
                    <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-[#FAF9F6] border-l border-brand-primary/10" />

                    <div className="flex justify-between items-center pb-3 border-b border-dashed border-brand-primary/10">
                      <div className="text-left">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-brand-primary/40 block">
                          Reservation ID
                        </span>
                        <span className="font-mono text-xs font-bold text-brand-accent tracking-wide">
                          {reservationToken}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-brand-primary/40 block">
                          Category
                        </span>
                        <span className="font-serif italic font-semibold text-sm text-brand-primary">
                          {selectedService.title}
                        </span>
                      </div>
                    </div>

                    <div className="py-4 space-y-3.5 text-left text-xs">
                      <div className="flex justify-between">
                        <span className="text-brand-primary/45">Patient</span>
                        <span className="font-bold text-brand-primary">{clientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-primary/45">Specialist</span>
                        <span className="font-bold text-brand-primary">{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-primary/45">Date</span>
                        <span className="font-bold text-brand-primary">{activeDate.fullString}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-primary/45">Reporting Time</span>
                        <span className="font-mono font-bold text-brand-accent">{selectedTime}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-primary/5 flex items-center gap-2 bg-[#FAF9F6]/50 p-2.5 rounded-xl border border-dashed text-[10px] text-brand-primary/60 text-left">
                      <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                      <span>Diagnostics scan prepared. No pre-surgical eating restrictions apply.</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-brand-primary/40 mt-5 leading-normal max-w-xs">
                    Need revisions? Use the link in your secure email check-in, or dial concierge coordinators at +1 (202) 688-4000.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 md:px-8 py-5 border-t border-brand-primary/5 flex items-center justify-between bg-white/40 z-10 sticky bottom-0 backdrop-blur">
            {step === "select" && (
              <>
                <div className="hidden sm:block">
                  <span className="text-[9px] font-mono uppercase text-brand-primary/40">
                    Step 1 of 2
                  </span>
                  <p className="text-xs font-semibold text-brand-primary">
                    Specialist Consultation
                  </p>
                </div>
                <button
                  onClick={handleProceedToDetails}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-colors ml-auto cursor-pointer"
                >
                  <span>Patient Profile Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === "details" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="text-xs font-semibold text-brand-primary/60 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  Back to schedule
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-colors cursor-pointer"
                >
                  <span>Submit Secure Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === "success" && (
              <button
                onClick={onClose}
                className="w-full text-center py-3 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-colors cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
