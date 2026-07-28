"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { Mail, Key, ArrowLeft, Heart } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { language, addToast } = useAppState();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      language === "vi" 
        ? "Đã gửi liên kết đặt lại mật khẩu tới Email của bạn!" 
        : "Reset password link has been sent to your email!",
      "success"
    );
    router.push("/auth/login");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-24">
      
      <div className="bg-card border border-border p-6 md:p-8 rounded-[2.5rem] shadow-premium text-center">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">MindCare</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2">
          {language === "vi" ? "Khôi phục mật khẩu" : "Reset Password"}
        </h1>
        <p className="text-xs text-foreground-secondary mb-8">
          {language === "vi" ? "Nhập email đã đăng ký để nhận mã khôi phục." : "Enter your email address to receive password reset links."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Địa chỉ Email đăng ký:" : "Registered Email:"}
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-3 rounded-xl text-xs font-bold shadow-premium mt-6 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <Key className="w-4 h-4" />
            <span>{language === "vi" ? "Gửi mã khôi phục" : "Send reset link"}</span>
          </button>

        </form>

        <div className="border-t border-divider pt-6 mt-8 text-center text-xs">
          <Link href="/auth/login" className="text-foreground-secondary hover:text-foreground font-bold inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "vi" ? "Quay lại Đăng nhập" : "Back to login"}</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
