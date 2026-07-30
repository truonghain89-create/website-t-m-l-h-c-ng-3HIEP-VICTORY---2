"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  Heart, Sun, Moon, Globe, Menu, X, User, Bell, ChevronDown, LogIn, LayoutDashboard
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

  // Monitor scroll for header background blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${
      isScrolled ? "glass shadow-premium py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/thpt-tam-hiep-logo.png" 
            alt="Trường THPT Tam Hiệp" 
            className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-premium border border-border/40 shrink-0 group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              MindCare
            </span>
            <span className="block text-[10px] text-secondary font-bold tracking-wider uppercase -mt-1 subheading">
              School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "text-primary bg-primary/5 dark:bg-primary/10" 
                    : "text-foreground-secondary hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {language === "vi" ? link.labelVi : link.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Active Role Selector (Perspective Switcher) */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold shadow-sm hover:border-primary/50 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{language === "vi" ? "Góc nhìn:" : "Role:"} {getRoleLabel(role)}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            
            <AnimatePresence>
              {roleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setRoleDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-premium z-20 overflow-hidden"
                  >
                    {(["guest", "student", "parent", "specialist"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-background-secondary flex items-center justify-between ${
                          role === r ? "text-primary font-bold bg-primary/5" : "text-foreground-secondary"
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

          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary hover:text-foreground transition-colors"
              aria-label="Language options"
            >
              <Globe className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-xl shadow-premium z-20 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setLanguage("vi");
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold ${
                        language === "vi" ? "text-primary bg-primary/5" : "text-foreground-secondary hover:bg-background-secondary"
                      }`}
                    >
                      Tiếng Việt (VI)
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold ${
                        language === "en" ? "text-primary bg-primary/5" : "text-foreground-secondary hover:bg-background-secondary"
                      }`}
                    >
                      English (EN)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary hover:text-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Indicator if logged in */}
          {role !== "guest" && (
            <Link
              href="/notifications"
              className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary hover:text-foreground transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-highlight" />
            </Link>
          )}

          {/* Auth Button or Dashboard Button */}
          {role === "guest" ? (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/95 transition-all shadow-premium"
            >
              <LogIn className="w-4 h-4" />
              <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
            </Link>
          ) : (
            <Link
              href={getDashboardLink(role)}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all shadow-premium"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{language === "vi" ? "Dashboard" : "Panel"}</span>
            </Link>
          )}

          {/* Profile Avatars if not guest */}
          {role !== "guest" && (
            <Link
              href="/profile"
              className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm hover:bg-primary/20 transition-all border border-primary/20"
              title={userProfile.name}
            >
              {userProfile.name.charAt(0)}
            </Link>
          )}

        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick toggle Dark mode on mobile */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-background-secondary text-foreground-secondary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-background-secondary text-foreground"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden px-4 py-5"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? "text-primary bg-primary/5 dark:bg-primary/10" 
                        : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
                    }`}
                  >
                    {language === "vi" ? link.labelVi : link.labelEn}
                  </Link>
                );
              })}
              
              <hr className="my-2 border-border" />

              {/* Perspective Role switcher mobile */}
              <div className="px-4 py-2">
                <span className="text-xs text-foreground-secondary block mb-1">
                  {language === "vi" ? "Chọn vai trò trải nghiệm:" : "Select perspective role:"}
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {(["guest", "student", "parent", "specialist"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setMobileMenuOpen(false);
                      }}
                      className={`py-1.5 px-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                        role === r 
                          ? "border-primary text-primary bg-primary/5" 
                          : "border-border text-foreground-secondary hover:bg-background-secondary"
                      }`}
                    >
                      {getRoleLabel(r)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons mobile */}
              <div className="flex items-center gap-3 mt-4 px-4">
                <button
                  onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border text-xs font-bold text-foreground-secondary hover:bg-background-secondary"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "vi" ? "English" : "Tiếng Việt"}</span>
                </button>

                {role === "guest" ? (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center shadow-premium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
                  </Link>
                ) : (
                  <Link
                    href={getDashboardLink(role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center shadow-premium"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
