"use client";

import React, { useEffect, useRef, useState } from "react";
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
      className={`absolute ${position} z-20 hidden xl:flex`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + 1, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass shadow-md"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -6, 0] }
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
        <span className="text-[11px] font-semibold text-foreground whitespace-nowrap">{label}</span>
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
    transition={{ duration: 0.5, delay: 1.4 + delay * 0.12 }}
    className="text-center"
  >
    <span className="block font-heading font-bold text-xl sm:text-2xl gradient-text">
      {value}
    </span>
    <span className="block text-[10px] sm:text-[11px] text-foreground-secondary font-medium mt-1 leading-tight">
      {label}
    </span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — CENTERED CINEMATIC LAYOUT
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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);

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
      mouseX.set((clientX - centerX) / 50);
      mouseY.set((clientY - centerY) / 50);
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
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  /* Particles configuration - reduced to 5 for performance */
  const particles = [
    { delay: 0, duration: 8, size: 5, left: "12%", top: "20%", color: "rgba(139,92,246,0.35)" },
    { delay: 1.5, duration: 10, size: 4, left: "85%", top: "18%", color: "rgba(16,185,129,0.4)" },
    { delay: 0.8, duration: 9, size: 6, left: "72%", top: "72%", color: "rgba(245,158,11,0.3)" },
    { delay: 2, duration: 7, size: 4, left: "22%", top: "78%", color: "rgba(139,92,246,0.25)" },
    { delay: 1.2, duration: 11, size: 3, left: "50%", top: "12%", color: "rgba(16,185,129,0.3)" },
  ];

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: shouldReduceMotion ? 0 : bgParallaxY }}>
        <div className="absolute inset-0 hero-aurora" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-12"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
            x: shouldReduceMotion ? 0 : springX,
            y: shouldReduceMotion ? 0 : springY,
          }}
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)",
          }}
          animate={shouldReduceMotion ? {} : { scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative ring */}
        <svg
          className="absolute top-[8%] right-[6%] w-28 h-28 opacity-[0.04] dark:opacity-[0.02]"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgb(var(--primary))" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgb(var(--secondary))" strokeWidth="1" />
        </svg>

        {/* Floating particles */}
        {!shouldReduceMotion &&
          particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
      </motion.div>

      {/* ═══ CONTENT LAYER — CENTERED ═══ */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-16 md:pt-32 md:pb-20"
        style={{ y: shouldReduceMotion ? 0 : parallaxY, opacity: shouldReduceMotion ? 1 : parallaxOpacity }}
      >
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-semibold tracking-wide hero-badge-glow">
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
            className="font-heading font-extrabold tracking-tight text-foreground leading-[1.05] mb-6"
            style={{ fontSize: "var(--text-display)" }}
          >
            {language === "vi" ? (
              <>
                Chắp cánh{" "}
                <span className="hero-text-gradient">năng lượng tích cực</span>
                <br />
                học đường
              </>
            ) : (
              <>
                Nurturing{" "}
                <span className="hero-text-gradient">Mental Strength</span>
                <br />
                in Classrooms
              </>
            )}
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-body-lg text-foreground-secondary leading-relaxed mb-10 max-w-[56ch] mx-auto"
          >
            {language === "vi"
              ? "Điểm tựa an toàn để sẻ chia, tháo gỡ áp lực và đồng hành cùng thế hệ trẻ trên con đường tìm lại sự an yên trong tâm hồn."
              : "A safe haven of empathy, dialogue, and support to guide students toward mental clarity and balance."}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            {/* Primary CTA */}
            <Link href="/assessment" className="group relative">
              <motion.div
                className="relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary/90 text-white px-7 py-3.5 rounded-2xl font-semibold text-[15px] shadow-md overflow-hidden"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="absolute inset-0 hero-btn-shimmer" />
                <ClipboardCheck className="w-[18px] h-[18px] relative z-10" />
                <span className="relative z-10">
                  {language === "vi" ? "Làm đánh giá" : "Screen Wellness"}
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>

            {/* Secondary CTA */}
            <Link href="/booking">
              <motion.div
                className="inline-flex items-center justify-center gap-2.5 bg-card/80 hover:bg-card border border-border/60 text-foreground px-7 py-3.5 rounded-2xl font-semibold text-[15px] shadow-xs backdrop-blur-sm"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <PhoneCall className="w-[18px] h-[18px] text-secondary" />
                <span>{language === "vi" ? "Trò chuyện ngay" : "Start Consultation"}</span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── Hero Image — below headline ─── */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 hero-image-glow" />

          <div className="relative w-full max-w-4xl mx-auto">
            {/* Main image container */}
            <motion.div
              className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-white/15 dark:border-white/5"
              style={{ x: shouldReduceMotion ? 0 : springX, y: shouldReduceMotion ? 0 : springY }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero_main.png"
                alt={language === "vi" ? "Học sinh trong môi trường học đường tích cực" : "Students in a positive school environment"}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

              {/* Bottom glass info card */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto sm:max-w-xs p-3.5 rounded-2xl glass shadow-md flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white text-sm shrink-0">
                  💚
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground dark:text-white leading-none">
                    {language === "vi" ? "Đồng hành cảm xúc" : "Empathy in Action"}
                  </h4>
                  <p className="text-[10px] text-foreground-secondary dark:text-gray-300 mt-1 leading-snug">
                    {language === "vi"
                      ? "Hơn 12,000 học sinh được lắng nghe và trợ giúp."
                      : "Over 12,000 students guided with professional care."}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Badges around Image */}
            <FloatingBadge
              icon={<Sparkles className="w-3.5 h-3.5" />}
              label={language === "vi" ? "Trắc nghiệm" : "Assessed"}
              position="top-[-4%] left-[-3%]"
              delay={0}
              color="linear-gradient(135deg, rgb(var(--primary)), rgb(var(--secondary)))"
            />
            <FloatingBadge
              icon={<Shield className="w-3.5 h-3.5" />}
              label={language === "vi" ? "Riêng tư 100%" : "100% Private"}
              position="top-[12%] right-[-3%]"
              delay={0.3}
              color="linear-gradient(135deg, rgb(var(--secondary)), #34d399)"
            />
            <FloatingBadge
              icon={<Users className="w-3.5 h-3.5" />}
              label={language === "vi" ? "20+ Chuyên gia" : "20+ Experts"}
              position="bottom-[8%] right-[-2%]"
              delay={0.6}
              color="linear-gradient(135deg, rgb(var(--accent)), #fb923c)"
            />
          </div>
        </motion.div>

        {/* Stats row — below hero image */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12 pt-8 border-t border-divider/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
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

      {/* ═══ SCROLL INDICATOR ═══ */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 mx-auto w-max z-20 flex flex-col items-center gap-1.5 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        onClick={() => {
          const next = heroRef.current?.nextElementSibling;
          next?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] font-semibold text-foreground-secondary/50 uppercase tracking-[0.2em]">
          {language === "vi" ? "Khám phá" : "Explore"}
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border-[1.5px] border-foreground-secondary/25 flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-primary"
            animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-foreground-secondary/30" />
        </motion.div>
      </motion.div>

    </section>
  );
}
