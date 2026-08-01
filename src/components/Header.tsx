"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  Sun, Moon, Globe, Menu, X, Bell, ChevronDown, LogIn, LayoutDashboard, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const { 
    role, setRole, darkMode, toggleDarkMode, language, setLanguage, userProfile 
  } = useAppState();
  
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", labelVi: "Trang chủ", labelEn: "Home" },
    { href: "/about", labelVi: "Giới thiệu", labelEn: "About" },
    { href: "/services", labelVi: "Dịch vụ", labelEn: "Services" },
    { href: "/assessment", labelVi: "Đánh giá", labelEn: "Assessment" },
    { href: "/courses", labelVi: "Khóa học", labelEn: "Courses" },
    { href: "/resources", labelVi: "Tài nguyên", labelEn: "Resources" },
    { href: "/blog", labelVi: "Blog", labelEn: "Blog" },
    { href: "/faq", labelVi: "FAQ", labelEn: "FAQ" },
    { href: "/contact", labelVi: "Liên hệ", labelEn: "Contact" },
  ];

  const getRoleLabel = (r: typeof role) => {
    switch (r) {
      case "student": return language === "vi" ? "Học sinh" : "Student";
      case "parent": return language === "vi" ? "Phụ huynh" : "Parent";
      case "specialist": return language === "vi" ? "Chuyên gia" : "Specialist";
      default: return language === "vi" ? "Khách" : "Guest";
    }
  };

  const getDashboardLink = (r: typeof role) => {
    if (r === "guest") return "/auth/login";
    return `/dashboard/${r}`;
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full flex justify-center px-4 pt-3 pointer-events-none">
        <div className={`w-full max-w-6xl flex items-center justify-between transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? "glass-strong shadow-md py-2 px-5 rounded-2xl" 
            : "bg-transparent py-3 px-2"
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/thpt-tam-hiep-logo.png" 
                alt="Trường THPT Tam Hiệp" 
                className="w-9 h-9 object-contain rounded-xl bg-white p-0.5 shadow-sm border border-border/30 group-hover:shadow-md transition-all duration-300"
              />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="gradient-text">Mind</span>
              <span className="text-foreground">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 group/link ${
                    isActive 
                      ? "text-primary" 
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  {language === "vi" ? link.labelVi : link.labelEn}
                  {/* Underline indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                    isActive ? "w-4" : "w-0 group-hover/link:w-4"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-1.5">
            
            {/* Role Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-foreground-secondary hover:text-foreground hover:bg-background-secondary/60 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>{getRoleLabel(role)}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              
              <AnimatePresence>
                {roleDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setRoleDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-card border border-border/60 rounded-xl shadow-lg z-20 overflow-hidden p-1"
                    >
                      {(["guest", "student", "parent", "specialist"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setRole(r);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                            role === r ? "text-primary bg-primary/5" : "text-foreground-secondary hover:bg-background-secondary/60 hover:text-foreground"
                          }`}
                        >
                          {getRoleLabel(r)}
                          {role === r && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-border/60 mx-1" />

            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="p-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/60 transition-all"
                aria-label="Language options"
              >
                <Globe className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 bg-card border border-border/60 rounded-xl shadow-lg z-20 overflow-hidden p-1"
                    >
                      <button
                        onClick={() => { setLanguage("vi"); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          language === "vi" ? "text-primary bg-primary/5" : "text-foreground-secondary hover:bg-background-secondary/60"
                        }`}
                      >
                        🇻🇳 Tiếng Việt
                      </button>
                      <button
                        onClick={() => { setLanguage("en"); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          language === "en" ? "text-primary bg-primary/5" : "text-foreground-secondary hover:bg-background-secondary/60"
                        }`}
                      >
                        🇺🇸 English
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/60 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            {role !== "guest" && (
              <Link
                href="/notifications"
                className="p-1.5 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-background-secondary/60 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-highlight" />
              </Link>
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-border/60 mx-1" />

            {/* Auth / Dashboard CTA */}
            {role === "guest" ? (
              <Link
                href="/auth/login"
                className="flex items-center gap-1.5 bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
              </Link>
            ) : (
              <Link
                href={getDashboardLink(role)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded-xl text-xs font-semibold hover:shadow-glow-sm transition-all shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Profile Avatar */}
            {role !== "guest" && (
              <Link
                href="/profile"
                className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs hover:bg-primary/20 transition-all border border-primary/20"
                title={userProfile.name}
              >
                {userProfile.name.charAt(0)}
              </Link>
            )}

          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-foreground-secondary hover:bg-background-secondary/60 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-background-secondary/60 transition-all"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex flex-col lg:hidden"
          >
            {/* Close bar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4">
              <span className="font-heading font-bold text-lg">
                <span className="gradient-text">Mind</span>
                <span className="text-foreground">Care</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-background-secondary/50 text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all ${
                          isActive 
                            ? "text-primary bg-primary/5" 
                            : "text-foreground hover:bg-background-secondary/50"
                        }`}
                      >
                        <span>{language === "vi" ? link.labelVi : link.labelEn}</span>
                        <ArrowRight className={`w-4 h-4 opacity-30 ${isActive ? "opacity-60 text-primary" : ""}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Divider */}
              <div className="my-5 h-px bg-border/40" />

              {/* Role switcher */}
              <div className="px-4">
                <span className="text-[11px] font-semibold text-foreground-secondary uppercase tracking-wider">
                  {language === "vi" ? "Vai trò" : "Role"}
                </span>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {(["guest", "student", "parent", "specialist"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setMobileMenuOpen(false);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                        role === r 
                          ? "border-primary text-primary bg-primary/5" 
                          : "border-border/60 text-foreground-secondary hover:bg-background-secondary/50"
                      }`}
                    >
                      {getRoleLabel(r)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom actions */}
              <div className="flex items-center gap-3 mt-6 px-4">
                <button
                  onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border/60 text-xs font-bold text-foreground-secondary hover:bg-background-secondary/50 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "vi" ? "English" : "Tiếng Việt"}</span>
                </button>

                {role === "guest" ? (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl text-xs font-bold shadow-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
                  </Link>
                ) : (
                  <Link
                    href={getDashboardLink(role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl text-xs font-bold shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
