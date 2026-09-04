import { useEffect, useRef, useState } from "react";
import {
  Mail, MessageSquare, Phone, CheckCircle, Calendar,
  BarChart2, Zap, Users, TrendingUp, Bot, Target,
  ArrowRight, Star, Clock, DollarSign, Percent,
  Activity, Database, FileText, Sparkles
} from "lucide-react";

const MOTION = {
  fast: "var(--l7-motion-fast)",
  base: "var(--l7-motion-base)",
  slow: "var(--l7-motion-slow)",
  ease: "var(--l7-motion-ease)",
  soft: "var(--l7-motion-soft)",
} as const;

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(end: number, duration = 2000, trigger = true, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, trigger, delay]);
  return count;
}

function AnimSection({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-[#0a0f1e] to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-neon-cyan uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            {label}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   1. CUSTOMER ACQUISITION — Animated Funnel
───────────────────────────────────────────────────────── */
export function CustomerAcquisitionAnimation() {
  const { ref, inView } = useInView();

  const stages = [
    { label: "Monthly Visitors", value: 10000, pct: 100, color: "from-electric-blue to-neon-cyan", w: "100%" },
    { label: "Leads Captured", value: 1247, pct: 12.5, color: "from-neon-cyan to-electric-blue", w: "72%" },
    { label: "Qualified Prospects", value: 412, pct: 33.0, color: "from-electric-blue to-accent-purple", w: "48%" },
    { label: "New Customers", value: 89, pct: 21.6, color: "from-accent-purple to-neon-cyan", w: "28%" },
  ];

  const v0 = useCountUp(10000, 2200, inView, 200);
  const v1 = useCountUp(1247,  2000, inView, 500);
  const v2 = useCountUp(412,   1800, inView, 800);
  const v3 = useCountUp(89,    1600, inView, 1100);
  const counts = [v0, v1, v2, v3];

  const metrics = [
    { label: "Cost Per Lead", value: "$12", sub: "avg across channels" },
    { label: "Lead-to-Close", value: "18%", sub: "conversion rate" },
    { label: "Pipeline Value", value: "$340K", sub: "monthly projection" },
  ];

  return (
    <AnimSection label="System Visualizer">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Watch Your Funnel <span className="gradient-text">Fill With Leads</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          A properly built acquisition system turns anonymous traffic into predictable, qualified pipeline — automatically.
        </p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Funnel */}
          <div className="lg:col-span-3 space-y-3">
            {stages.map((stage, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stage.label}</span>
                  <div className="flex items-center gap-3">
                    {i > 0 && (
                      <span
                        className="text-xs text-neon-cyan font-mono"
                        style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.base} ${MOTION.ease} ${0.4 + i * 0.3}s` }}
                      >
                        {stage.pct}% convert
                      </span>
                    )}
                    <span className="text-white font-black text-lg tabular-nums">
                      {counts[i].toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-11 bg-white/5 rounded-xl overflow-hidden border border-white/5 relative">
                  <div
                    className={`h-full bg-gradient-to-r ${stage.color} rounded-xl relative`}
                    style={{
                      width: inView ? stage.w : "0%",
                      transition: `width ${MOTION.slow} ${MOTION.soft} ${0.15 + i * 0.3}s`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-xl" />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold text-xs"
                      style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.fast} ${MOTION.ease} ${0.6 + i * 0.3}s` }}
                    >
                      {stage.w}
                    </div>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div className="flex justify-center mt-1">
                    <div
                      className="w-0.5 bg-gradient-to-b from-electric-blue/40 to-transparent"
                      style={{ height: inView ? "12px" : "0px", transition: `height ${MOTION.fast} ${MOTION.ease} ${0.5 + i * 0.3}s` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Metrics panel */}
          <div className="lg:col-span-2 space-y-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 border border-white/10"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all ${MOTION.slow} ${MOTION.ease} ${0.8 + i * 0.2}s`,
                }}
              >
                <div className="text-3xl font-black gradient-text mb-1">{m.value}</div>
                <div className="text-white font-semibold text-sm">{m.label}</div>
                <div className="text-gray-500 text-xs mt-0.5">{m.sub}</div>
              </div>
            ))}
            <div
              className="glass-card rounded-2xl p-5 border border-success-green/20 bg-success-green/5"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all ${MOTION.slow} ${MOTION.ease} 1.4s`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-success-green" />
                <span className="text-success-green font-bold text-sm">System Active</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Running 24/7 — capturing leads even while you sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

/* ─────────────────────────────────────────────────────────
   2. CRM AUTOMATION — Animated Follow-Up Pipeline
───────────────────────────────────────────────────────── */
export function CRMAutomationAnimation() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const steps = [0, 1, 2, 3, 4];
    const timers = steps.map((s) => setTimeout(() => setActiveStep(s), 400 + s * 700));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const touchpoints = [
    { icon: Mail,         day: "Day 1",  label: "Welcome Email",   tag: "Opened 78%",  color: "from-accent-purple to-electric-blue" },
    { icon: MessageSquare,day: "Day 3",  label: "SMS Check-In",    tag: "Replied 42%", color: "from-electric-blue to-neon-cyan" },
    { icon: Phone,        day: "Day 7",  label: "Call Reminder",   tag: "Answered 61%",color: "from-neon-cyan to-success-green" },
    { icon: Star,         day: "Day 10", label: "Value Follow-Up", tag: "Clicked 55%", color: "from-success-green to-electric-blue" },
    { icon: CheckCircle,  day: "Day 14", label: "Deal Closed",     tag: "Won 22%",     color: "from-electric-blue to-accent-purple" },
  ];

  const contactsHandled = useCountUp(2847, 2500, inView, 400);

  return (
    <AnimSection label="Automation Flow">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Every Lead <span className="gradient-text">Followed Up Automatically</span>
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
          The moment someone enters your pipeline, a precision sequence fires — emails, SMS, tasks, and reminders, all without lifting a finger.
        </p>

        {/* Contact enters */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="glass-card rounded-2xl px-6 py-4 border border-accent-purple/30 flex items-center gap-4 mb-4"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.9)", transition: `all ${MOTION.base} ${MOTION.ease} 0.2s` }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-electric-blue flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">New Lead Enters CRM</div>
              <div className="text-gray-400 text-xs">Sequence triggered instantly</div>
            </div>
            <div
              className="ml-2 px-3 py-1 rounded-full bg-success-green/20 border border-success-green/30 text-success-green text-xs font-bold"
              style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.fast} ${MOTION.ease} 0.6s` }}
            >
              LIVE
            </div>
          </div>
          <div
            className="w-0.5 h-6 bg-gradient-to-b from-accent-purple/60 to-transparent"
            style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.fast} ${MOTION.ease} 0.7s` }}
          />
        </div>

        {/* Timeline nodes */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-white/5 hidden lg:block" />
          <div
            className="absolute top-8 left-8 h-0.5 bg-gradient-to-r from-accent-purple via-electric-blue to-neon-cyan hidden lg:block"
            style={{
                right: "8px",
              width: activeStep >= 0 ? `${Math.min(activeStep / 4, 1) * 100}%` : "0%",
              transition: `width ${MOTION.slow} ${MOTION.soft} 0.5s`,
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {touchpoints.map((tp, i) => {
              const active = activeStep >= i;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center"
                  style={{
                    opacity: active ? 1 : 0.25,
                    transform: active ? "translateY(0)" : "translateY(8px)",
                    transition: `all ${MOTION.base} ${MOTION.ease} ${0.3 + i * 0.7}s`,
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tp.color} flex items-center justify-center mb-3 shadow-lg relative`}
                    style={{ boxShadow: active ? "0 0 20px color-mix(in srgb, var(--l7-mint) 32%, transparent)" : "none", transition: `box-shadow ${MOTION.fast} ${MOTION.ease}` }}
                  >
                    <tp.icon className="w-7 h-7 text-white" />
                    {active && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success-green border-2 border-slate-950 flex items-center justify-center">
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-neon-cyan text-xs font-mono mb-1">{tp.day}</div>
                  <div className="text-white font-bold text-xs mb-1">{tp.label}</div>
                  <div
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs"
                    style={{ opacity: active ? 1 : 0, transition: `opacity ${MOTION.fast} ${MOTION.ease} ${0.6 + i * 0.7}s` }}
                  >
                    {tp.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom stat */}
        <div
          className="mt-10 flex items-center justify-center gap-3 glass-card rounded-2xl px-8 py-5 border border-electric-blue/20 max-w-sm mx-auto"
          style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 3.8s` }}
        >
          <div className="text-3xl font-black gradient-text tabular-nums">{contactsHandled.toLocaleString()}</div>
          <div className="text-left">
            <div className="text-white font-bold text-sm">Contacts Handled</div>
            <div className="text-gray-500 text-xs">This month, zero manual effort</div>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

/* ─────────────────────────────────────────────────────────
   3. CONVERSION WEBSITES — Before / After
───────────────────────────────────────────────────────── */
export function ConversionWebsitesAnimation() {
  const { ref, inView } = useInView();

  const before = [
    { label: "Conversion Rate", before: 1.2, after: 9.1, unit: "%", delta: "+650%" },
    { label: "Page Speed Score", before: 54, after: 98, unit: "", delta: "+44pts" },
    { label: "Mobile Score", before: 61, after: 99, unit: "", delta: "+38pts" },
    { label: "Monthly Revenue", before: 4200, after: 32800, unit: "$", delta: "+7.8×" },
  ];

  const convBefore = useCountUp(12, 1400, inView, 400);
  const convAfter = useCountUp(91, 1800, inView, 600);
  const revBefore = useCountUp(4200, 1600, inView, 400);
  const revAfter = useCountUp(32800, 2200, inView, 600);

  return (
    <AnimSection label="Before vs After">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Built to <span className="gradient-text">Convert</span>, Not Just Look Good
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          A conversion website system isn't just design — it's architecture. Every element is engineered to turn visitors into customers.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Before card */}
          <div
            className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6 relative overflow-hidden"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-30px)", transition: `all ${MOTION.slow} ${MOTION.ease} 0.2s` }}
          >
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
              BEFORE
            </div>
            <div className="space-y-4 mt-4">
              {[
                { label: "Conversion Rate", val: `${(convBefore / 10).toFixed(1)}%`, bar: convBefore / 100, color: "bg-red-500/60" },
                { label: "Page Speed", val: `54`, bar: 0.54, color: "bg-red-500/60" },
                { label: "Monthly Revenue", val: `$${revBefore.toLocaleString()}`, bar: revBefore / 40000, color: "bg-red-500/60" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-bold tabular-nums">{item.val}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: inView ? `${item.bar * 100}%` : "0%", transition: `width ${MOTION.slow} ${MOTION.soft} ${0.5 + i * 0.2}s` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="text-red-400 text-xs font-semibold">Generic template. No strategy. Leaking revenue.</div>
            </div>
          </div>

          {/* After card */}
          <div
            className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/5 p-6 relative overflow-hidden"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(30px)", transition: `all ${MOTION.slow} ${MOTION.ease} 0.4s` }}
          >
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-success-green/20 border border-success-green/30 text-success-green text-xs font-bold">
              AFTER
            </div>
            <div className="space-y-4 mt-4">
              {[
                { label: "Conversion Rate", val: `${(convAfter / 10).toFixed(1)}%`, bar: convAfter / 100, color: "bg-gradient-to-r from-neon-cyan to-electric-blue" },
                { label: "Page Speed", val: `98`, bar: 0.98, color: "bg-gradient-to-r from-electric-blue to-neon-cyan" },
                { label: "Monthly Revenue", val: `$${revAfter.toLocaleString()}`, bar: revAfter / 40000, color: "bg-gradient-to-r from-success-green to-neon-cyan" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-bold tabular-nums">{item.val}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: inView ? `${item.bar * 100}%` : "0%", transition: `width ${MOTION.slow} ${MOTION.soft} ${0.7 + i * 0.2}s` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-neon-cyan/10">
              <div className="text-neon-cyan text-xs font-semibold">Strategy-first. Conversion-optimized. Revenue machine.</div>
            </div>
          </div>
        </div>

        {/* Delta badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {before.map((item, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 border border-white/10 text-center"
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition: `all ${MOTION.base} ${MOTION.ease} ${1.0 + i * 0.15}s` }}
            >
              <div className="text-xl font-black text-success-green mb-1">{item.delta}</div>
              <div className="text-gray-400 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </AnimSection>
  );
}

/* ─────────────────────────────────────────────────────────
   4. BOOKING & TRANSACTIONS — Calendar + Revenue
───────────────────────────────────────────────────────── */
export function BookingTransactionsAnimation() {
  const { ref, inView } = useInView();
  const [filledCells, setFilledCells] = useState(0);
  const [notifications, setNotifications] = useState<number[]>([]);

  const totalCells = 25;
  const revenue = useCountUp(28400, 3000, inView, 800);
  const bookings = useCountUp(47, 2500, inView, 400);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < totalCells; i++) {
      timers.push(setTimeout(() => setFilledCells(i + 1), 200 + i * 120));
    }
    [0, 1, 2].forEach((n) => {
      timers.push(setTimeout(() => setNotifications((prev) => [...prev, n]), 1500 + n * 1200));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const notifData = [
    { name: "Sarah M.", service: "Strategy Call", amount: "$450" },
    { name: "James T.", service: "Growth Package", amount: "$2,400" },
    { name: "Priya K.", service: "System Setup", amount: "$1,800" },
  ];

  const days = ["M", "T", "W", "T", "F"];

  return (
    <AnimSection label="Booking Visualizer">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Your Calendar <span className="gradient-text">Fills Itself</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          Automated booking, instant payment collection, and confirmation sequences — running while you focus on the work.
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div className="text-white font-bold">April 2025</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-tech-orange to-accent-purple" />
                  <span className="text-gray-400 text-xs">Booked</span>
                  <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/10 ml-2" />
                  <span className="text-gray-400 text-xs">Open</span>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                {days.map((d) => (
                  <div key={d} className="text-center text-gray-500 text-xs font-semibold py-1">{d}</div>
                ))}
              </div>

              {/* Calendar cells */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalCells }).map((_, i) => {
                  const booked = i < filledCells;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        booked
                          ? "bg-gradient-to-br from-tech-orange to-accent-purple text-white shadow-lg"
                          : "bg-white/5 border border-white/5 text-gray-600"
                      }`}
                      style={{ transform: booked ? "scale(1.05)" : "scale(1)" }}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black gradient-text tabular-nums">{bookings}</div>
                  <div className="text-gray-400 text-xs">Bookings This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-success-green tabular-nums">${revenue.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs">Revenue Collected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-2 space-y-3 flex flex-col justify-center">
            <div className="text-gray-400 text-sm font-semibold mb-2">New Booking Notifications</div>
            {notifData.map((n, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-4 border border-white/10 flex items-center gap-3"
                style={{
                  opacity: notifications.includes(i) ? 1 : 0,
                  transform: notifications.includes(i) ? "translateX(0)" : "translateX(20px)",
                  transition: `all ${MOTION.base} ${MOTION.ease}`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tech-orange to-accent-purple flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-sm">{n.name}</div>
                  <div className="text-gray-400 text-xs truncate">{n.service}</div>
                </div>
                <div className="text-success-green font-black text-sm">{n.amount}</div>
              </div>
            ))}
            <div
              className="glass-card rounded-xl p-4 border border-tech-orange/20 bg-tech-orange/5 mt-2"
              style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 4.5s` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-tech-orange" />
                <span className="text-tech-orange font-bold text-xs">Auto-Confirmation Sent</span>
              </div>
              <p className="text-gray-400 text-xs">Receipt, reminder, and prep email delivered instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

/* ─────────────────────────────────────────────────────────
   5. DATA INTELLIGENCE — Live Dashboard
───────────────────────────────────────────────────────── */
export function DataIntelligenceAnimation() {
  const { ref, inView } = useInView();

  const kpis = [
    { icon: DollarSign, label: "Monthly Revenue",   end: 142800, prefix: "$", color: "from-success-green to-neon-cyan",    border: "border-success-green/20" },
    { icon: Users,      label: "Active Leads",      end: 847,    prefix: "",  color: "from-electric-blue to-neon-cyan",    border: "border-electric-blue/20" },
    { icon: Percent,    label: "Conversion Rate",   end: 84,     prefix: "",  suffix: "%", color: "from-neon-cyan to-accent-purple", border: "border-neon-cyan/20" },
    { icon: TrendingUp, label: "Customer LTV",      end: 4200,   prefix: "$", color: "from-accent-purple to-electric-blue",border: "border-accent-purple/20" },
  ];

  const c0 = useCountUp(142800, 2500, inView, 300);
  const c1 = useCountUp(847,    2000, inView, 500);
  const c2 = useCountUp(84,     1800, inView, 700);
  const c3 = useCountUp(4200,   2200, inView, 900);
  const kpiCounts = [c0, c1, c2, c3];

  const barHeights = [42, 58, 51, 75, 68, 93];
  const barLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  const sources = [
    { label: "Google Ads", pct: 38 },
    { label: "Organic SEO", pct: 29 },
    { label: "Referrals", pct: 21 },
    { label: "Email", pct: 12 },
  ];

  return (
    <AnimSection label="Dashboard Preview">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Every Number, <span className="gradient-text">In One Place</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          Stop guessing. We build you a live intelligence dashboard so you always know what's working, what's not, and where to focus.
        </p>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-5 border ${kpi.border}`}
              style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `all ${MOTION.base} ${MOTION.ease} ${0.2 + i * 0.15}s` }}
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
                <kpi.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-black text-white tabular-nums">
                {kpi.prefix}{kpiCounts[i].toLocaleString()}{kpi.suffix || ""}
              </div>
              <div className="text-gray-500 text-xs mt-0.5">{kpi.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Bar chart */}
          <div
            className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10"
            style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 0.8s` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-white font-bold text-sm">Revenue Trend</div>
              <div className="text-success-green text-xs font-semibold">+38% YoY</div>
            </div>
            <div className="flex items-end justify-between gap-3 h-28">
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-success-green to-neon-cyan relative overflow-hidden"
                      style={{ height: inView ? `${h}%` : "0%", transition: `height ${MOTION.slow} ${MOTION.soft} ${1.0 + i * 0.1}s` }}>
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  <span className="text-gray-500 text-xs">{barLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div
            className="glass-card rounded-2xl p-6 border border-white/10"
            style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 1.0s` }}
          >
            <div className="text-white font-bold text-sm mb-5">Lead Sources</div>
            <div className="space-y-4">
              {sources.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{s.label}</span>
                    <span className="text-white font-bold">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-success-green to-neon-cyan"
                      style={{ width: inView ? `${s.pct}%` : "0%", transition: `width ${MOTION.slow} ${MOTION.soft} ${1.2 + i * 0.2}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-success-green animate-pulse" />
                <span className="text-gray-400 text-xs">Live data, updated hourly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}

/* ─────────────────────────────────────────────────────────
   6. AI BUSINESS TOOLS — AI Processing Pipeline
───────────────────────────────────────────────────────── */
export function AIBusinessToolsAnimation() {
  const { ref, inView } = useInView();
  const [stage, setStage] = useState(0);
  const [outputs, setOutputs] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3200);
    const t4 = setTimeout(() => setOutputs([0]), 3400);
    const t5 = setTimeout(() => setOutputs([0, 1]), 4000);
    const t6 = setTimeout(() => setOutputs([0, 1, 2]), 4600);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [inView]);

  const timeSaved = useCountUp(140, 2000, inView, 5000);

  const inputTasks = [
    { icon: Mail,      text: "Draft a follow-up to Sarah about proposal" },
    { icon: Target,    text: "Score all new leads from last 48 hours" },
    { icon: FileText,  text: "Generate monthly performance report" },
  ];

  const outputResults = [
    { icon: Mail,      label: "Email Drafted",     sub: "Personalized + sent",    color: "from-accent-purple to-electric-blue" },
    { icon: Star,      label: "87 Leads Scored",   sub: "Top 12 flagged urgent",  color: "from-electric-blue to-neon-cyan" },
    { icon: BarChart2, label: "Report Generated",  sub: "PDF ready in 4 seconds", color: "from-neon-cyan to-success-green" },
  ];

  return (
    <AnimSection label="AI Engine">
      <div ref={ref} className="max-w-5xl mx-auto">
        <h2 className="text-center font-poppins font-black text-3xl lg:text-4xl text-white mb-3">
          Your AI Engine, <span className="gradient-text">Running in the Background</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          We deploy custom AI tools that handle repetitive tasks, score leads, draft content, and surface insights — while you focus on decisions that actually need you.
        </p>

        <div className="grid lg:grid-cols-3 gap-4 items-start">

          {/* Input column */}
          <div
            className="glass-card rounded-2xl p-5 border border-white/10"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transition: `all ${MOTION.slow} ${MOTION.ease} 0.2s` }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <Database className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Incoming Tasks</span>
            </div>
            <div className="space-y-3">
              {inputTasks.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  style={{ opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "translateX(0)" : "translateX(-10px)", transition: `all ${MOTION.fast} ${MOTION.ease} ${0.3 + i * 0.2}s` }}
                >
                  <t.icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-xs leading-relaxed">{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Processing column */}
          <div
            className="glass-card rounded-2xl p-5 border border-accent-purple/30 bg-accent-purple/5 flex flex-col items-center text-center"
            style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 0.5s` }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5 w-full justify-center">
              <Bot className="w-4 h-4 text-accent-purple" />
              <span className="text-accent-purple text-xs font-semibold uppercase tracking-wider">AI Processing</span>
            </div>

            <div className="relative my-4">
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-electric-blue flex items-center justify-center shadow-2xl"
                style={{ boxShadow: stage >= 2 ? "0 0 32px color-mix(in srgb, var(--l7-coral) 34%, transparent), 0 0 64px color-mix(in srgb, var(--l7-mint) 16%, transparent)" : "none", transition: `box-shadow ${MOTION.slow} ${MOTION.ease}` }}
              >
                <Sparkles className={`w-9 h-9 text-white ${stage >= 1 && stage < 3 ? "animate-spin" : ""}`} style={{ animationDuration: "2s" }} />
              </div>
              {stage >= 1 && stage < 3 && (
                <>
                  <div className="absolute -inset-3 rounded-full border-2 border-accent-purple/30 animate-ping" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute -inset-6 rounded-full border border-accent-purple/10 animate-ping" style={{ animationDuration: "2s" }} />
                </>
              )}
              {stage >= 3 && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success-green border-2 border-slate-950 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="mt-2 space-y-2 w-full">
              {[
                { label: "Analyzing context...",   active: stage === 1 },
                { label: "Generating output...",   active: stage === 2 },
                { label: "Tasks complete ✓",       active: stage >= 3 },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    s.active ? "bg-accent-purple/20 border border-accent-purple/40 text-accent-purple" :
                    stage > i + 1 ? "text-gray-500 line-through" : "text-gray-600"
                  }`}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Output column */}
          <div
            className="glass-card rounded-2xl p-5 border border-white/10"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(20px)", transition: `all ${MOTION.slow} ${MOTION.ease} 0.8s` }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
              <CheckCircle className="w-4 h-4 text-success-green" />
              <span className="text-success-green text-xs font-semibold uppercase tracking-wider">Results</span>
            </div>
            <div className="space-y-3">
              {outputResults.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  style={{ opacity: outputs.includes(i) ? 1 : 0, transform: outputs.includes(i) ? "translateX(0)" : "translateX(10px)", transition: `all ${MOTION.base} ${MOTION.ease}` }}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${o.color} flex items-center justify-center flex-shrink-0`}>
                    <o.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">{o.label}</div>
                    <div className="text-gray-500 text-xs">{o.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time saved counter */}
        <div
          className="mt-8 flex items-center justify-center gap-4 glass-card rounded-2xl px-8 py-5 border border-accent-purple/20 max-w-md mx-auto"
          style={{ opacity: inView ? 1 : 0, transition: `opacity ${MOTION.slow} ${MOTION.ease} 5.5s` }}
        >
          <Clock className="w-8 h-8 text-accent-purple flex-shrink-0" />
          <div>
            <div className="text-3xl font-black gradient-text tabular-nums">{timeSaved}+ hrs</div>
            <div className="text-gray-400 text-sm">saved per month by clients on average</div>
          </div>
        </div>
      </div>
    </AnimSection>
  );
}
