"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState, UserRole } from "@/context/AppContext";
import { LogIn, Mail, Lock, Heart } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { language, setRole, addToast } = useAppState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login validation
    setRole(selectedRole);
    addToast(
      language === "vi" ? "Đăng nhập thành công!" : "Login successful!",
      "success"
    );
    router.push(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-24">
      
      <div className="bg-card border border-border p-6 md:p-8 rounded-[2.5rem] shadow-premium text-center">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">MindCare</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2">
          {language === "vi" ? "Đăng nhập tài khoản" : "Welcome back to MindCare"}
        </h1>
        <p className="text-xs text-foreground-secondary mb-8">
          {language === "vi" ? "Chọn đúng vai trò trải nghiệm hệ thống." : "Select your role to access dashboard."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Role selector inside login form */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Chọn vai trò đăng nhập:" : "Login Role:"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "student", labelVi: "Học sinh", labelEn: "Student" },
                { value: "parent", labelVi: "Phụ huynh", labelEn: "Parent" },
                { value: "specialist", labelVi: "Chuyên gia", labelEn: "Expert" }
              ].map((r) => (
                <div
                  key={r.value}
                  onClick={() => setSelectedRole(r.value as any)}
                  className={`py-2 px-1 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                    selectedRole === r.value 
                      ? "border-primary bg-primary/5 text-primary" 
                      : "border-border text-foreground-secondary hover:bg-background-secondary"
                  }`}
                >
                  <span>{language === "vi" ? r.labelVi : r.labelEn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Địa chỉ Email:" : "Email Address:"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu.vn"
                className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-foreground">
                {language === "vi" ? "Mật khẩu:" : "Password:"}
              </label>
              <Link href="/auth/forgot-password" className="text-[10px] text-primary font-bold hover:underline">
                {language === "vi" ? "Quên mật khẩu?" : "Forgot password?"}
              </Link>
            </div>
            
            <div className="relative">
              <Lock className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-3 rounded-xl text-xs font-bold shadow-premium mt-6 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <LogIn className="w-4 h-4" />
            <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
          </button>

        </form>

        <div className="border-t border-divider pt-6 mt-8 text-center text-xs text-foreground-secondary">
          <span>{language === "vi" ? "Chưa có tài khoản?" : "Don't have an account?"} </span>
          <Link href="/auth/signup" className="text-primary font-bold hover:underline">
            {language === "vi" ? "Đăng ký ngay" : "Sign Up"}
          </Link>
        </div>

      </div>

    </div>
  );
}
