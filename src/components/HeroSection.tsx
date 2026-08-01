"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import {
  Heart,
  ArrowRight,
  ClipboardCheck,
  PhoneCall,
  ChevronDown,
  Sparkles,
  Shield,
  Users,
} from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────── Floating Particle Component ─────────────── */
const FloatingParticle = ({
  delay,
  duration,
  size,
  left,
  top,
  color,
}: {
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
  color: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: color,
        filter: `blur(${size > 8 ? 1 : 0}px)`,
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 5, 0],
              opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/* ─────────────── Floating Badge Component ─────────────── */
const FloatingBadge = ({
  icon,
  label,
  position,
  delay,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  position: string;
  delay: number;
  color: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`absolute ${position} z-20 hidden lg:flex`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + 0.8, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass shadow-md"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -8, 0] }
        }
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
          style={{ background: color }}
        >
          {icon}
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-foreground whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────── Stats Counter with Animation ─────────────── */
const AnimatedStat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 + delay * 0.15 }}
    className="text-center group"
  >
    <motion.span
      className="block font-heading font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {value}
    </motion.span>
    <span className="block text-[11px] sm:text-xs text-foreground-secondary font-medium mt-1.5 leading-tight">
      {label}
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — DYNAMIC SPLIT LAYOUT
   ═══════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const { language } = useAppState();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((clientX - centerX) / 45);
      mouseY.set((clientY - centerY) / 45);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, mouseX, mouseY]);

  /* Stats data */
  const stats = [
    { value: "12,000+", labelVi: "Học sinh được nâng đỡ", labelEn: "Young Minds Guided" },
    { value: "20+", labelVi: "Chuyên viên tâm lý", labelEn: "Licensed Counselors" },
    { value: "97%", labelVi: "Gia đình an tâm", labelEn: "Happy Families" },
    { value: "35+", labelVi: "Đối tác giáo dục", labelEn: "Associated Schools" },
  ];

  /* Stagger animation variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  /* Particles configuration */
  const particles = [
    { delay: 0, duration: 8, size: 6, left: "10%", top: "20%", color: "rgba(139,92,246,0.4)" },
    { delay: 1.5, duration: 10, size: 4, left: "85%", top: "15%", color: "rgba(16,185,129,0.5)" },
    { delay: 0.8, duration: 9, size: 8, left: "70%", top: "70%", color: "rgba(245,158,11,0.4)" },
    { delay: 2, duration: 7, size: 5, left: "25%", top: "75%", color: "rgba(139,92,246,0.3)" },
    { delay: 1.2, duration: 11, size: 10, left: "50%", top: "10%", color: "rgba(16,185,129,0.3)" },
  ];

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center overflow-hidden bg-background-secondary/30 dark:bg-background-secondary/10"
      id="hero"
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: shouldReduceMotion ? 0 : bgParallaxY }}>
        {/* Richer Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background" />

        {/* Glow orbs */}
        <motion.div
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-40 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)",
            x: shouldReduceMotion ? 0 : springX,
            y: shouldReduceMotion ? 0 : springY,
          }}
          animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-35 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : { scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Floating particles */}
        {!shouldReduceMotion &&
          particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
      </motion.div>

      {/* ═══ CONTENT LAYER — SPLIT LAYOUT ═══ */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 py-24 md:py-16"
        style={{ y: shouldReduceMotion ? 0 : parallaxY, opacity: shouldReduceMotion ? 1 : parallaxOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ─── LEFT: Content (7 cols on large desktop) ─── */}
          <motion.div
            className="lg:col-span-7 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Top badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold mb-6 subheading hero-badge-glow">
                <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>
                  {language === "vi"
                    ? "Nuôi dưỡng sức mạnh nội tâm thế hệ mới"
                    : "Next-Gen Mental Resilience"}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight text-foreground leading-[1.08] mb-6"
            >
              {language === "vi" ? (
                <>
                  Chắp cánh
                  <br />
                  <span className="hero-text-gradient">năng lượng tích cực</span>
                  <br />
                  học đường
                </>
              ) : (
                <>
                  Nurturing
                  <br />
                  <span className="hero-text-gradient">Mental Strength</span> in
                  <br />
                  Classrooms
                </>
              )}
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-body-lg text-foreground-secondary leading-relaxed mb-8 max-w-[50ch]"
            >
              {language === "vi"
                ? "Điểm tựa an toàn để sẻ chia, tháo gỡ áp lực và đồng hành cùng thế hệ trẻ trên con đường tìm lại sự an yên trong tâm hồn."
                : "A safe haven of empathy, dialogue, and support to guide students toward mental clarity and balance."}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-12">
              {/* Primary CTA */}
              <Link href="/assessment" className="group relative">
                <motion.div
                  className="relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary/90 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md overflow-hidden"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="absolute inset-0 hero-btn-shimmer" />
                  <ClipboardCheck className="w-[18px] h-[18px] relative z-10" />
                  <span className="relative z-10">
                    {language === "vi" ? "Làm đánh giá" : "Screen Wellness"}
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
                </motion.div>
              </Link>

              {/* Secondary CTA */}
              <Link href="/booking">
                <motion.div
                  className="inline-flex items-center justify-center gap-2.5 bg-card border border-border/80 text-foreground px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xs backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <PhoneCall className="w-[18px] h-[18px] text-secondary" />
                  <span>{language === "vi" ? "Trò chuyện ngay" : "Start Consultation"}</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-divider/80 pt-8"
            >
              {stats.map((s, idx) => (
                <AnimatedStat
                  key={idx}
                  value={s.value}
                  label={language === "vi" ? s.labelVi : s.labelEn}
                  delay={idx}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Large Visual Image (5 cols on large desktop) ─── */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center w-full"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 hero-image-glow" />

            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[1/1]">
              {/* Main image container with border and thick premium shadow */}
              <motion.div
                className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white dark:border-white/10"
                style={{ x: shouldReduceMotion ? 0 : springX, y: shouldReduceMotion ? 0 : springY }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero_main.png"
                  alt={language === "vi" ? "Học sinh trong môi trường học đường tích cực" : "Students in a positive school environment"}
                  className="w-full h-full object-cover"
                  loading="eager"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

                {/* Bottom glass info overlay */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl glass shadow-md flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-white text-xs shrink-0">
                    💚
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[11px] text-foreground dark:text-white leading-none">
                      {language === "vi" ? "Đồng hành cảm xúc" : "Empathy in Action"}
                    </h4>
                    <p className="text-[9px] text-foreground-secondary dark:text-gray-300 mt-1 leading-none">
                      {language === "vi"
                        ? "Hơn 12,000 học sinh được lắng nghe và trợ giúp."
                        : "Over 12,000 students guided."}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Badges around Image */}
              <FloatingBadge
                icon={<Sparkles className="w-3.5 h-3.5" />}
                label={language === "vi" ? "Trắc nghiệm" : "Assessed"}
                position="top-[-4%] left-[-4%]"
                delay={0}
                color="linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))"
              />
              <FloatingBadge
                icon={<Shield className="w-3.5 h-3.5" />}
                label={language === "vi" ? "Bảo mật 100%" : "100% Private"}
                position="top-[22%] right-[-6%]"
                delay={0.3}
                color="linear-gradient(135deg, rgb(var(--secondary)), #34d399)"
              />
              <FloatingBadge
                icon={<Users className="w-3.5 h-3.5" />}
                label={language === "vi" ? "20+ Chuyên gia" : "20+ Experts"}
                position="bottom-[8%] right-[-4%]"
                delay={0.6}
                color="linear-gradient(135deg, rgb(var(--accent)), #fb923c)"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ SCROLL INDICATOR ═══ */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 mx-auto w-max z-20 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        onClick={() => {
          const next = heroRef.current?.nextElementSibling;
          next?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[8px] font-semibold text-foreground-secondary/40 uppercase tracking-[0.25em]">
          {language === "vi" ? "Khám phá" : "Explore"}
        </span>
        <motion.div
          className="w-4 h-7 rounded-full border-[1.5px] border-foreground-secondary/20 flex items-start justify-center pt-1"
        >
          <motion.div
            className="w-0.9 h-0.9 rounded-full bg-primary"
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

    </section>
  );
}
