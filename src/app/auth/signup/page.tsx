"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { UserPlus, Mail, Lock, User, Heart } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { language, setRole, addToast } = useAppState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "parent">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    addToast(
      language === "vi" ? "Đăng ký tài khoản thành công!" : "Registered successfully!",
      "success"
    );
    router.push(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-20">
      
      <div className="bg-card border border-border p-6 md:p-8 rounded-[2.5rem] shadow-premium text-center">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">MindCare</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2">
          {language === "vi" ? "Tạo tài khoản mới" : "Create your account"}
        </h1>
        <p className="text-xs text-foreground-secondary mb-8">
          {language === "vi" ? "Đồng hành và theo dõi sức khỏe tâm lý dễ dàng." : "Take charge of your mental wellness journey today."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Role selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Đăng ký làm:" : "Register as:"}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => setSelectedRole("student")}
                className={`py-2 px-1 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                  selectedRole === "student" 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-border text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                <span>{language === "vi" ? "Học sinh / Sinh viên" : "Student"}</span>
              </div>
              <div
                onClick={() => setSelectedRole("parent")}
                className={`py-2 px-1 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                  selectedRole === "parent" 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-border text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                <span>{language === "vi" ? "Phụ huynh học sinh" : "Parent"}</span>
              </div>
            </div>
          </div>

          {/* Fullname */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Họ và tên:" : "Full Name:"}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === "vi" ? "Nhập họ và tên..." : "Your name..."}
                className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Địa chỉ Email học đường:" : "School Email Address:"}
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
            <label className="text-xs font-bold text-foreground">
              {language === "vi" ? "Mật khẩu bảo mật:" : "Secure Password:"}
            </label>
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
            <UserPlus className="w-4 h-4" />
            <span>{language === "vi" ? "Đăng ký tài khoản" : "Register Now"}</span>
          </button>

        </form>

        <div className="border-t border-divider pt-6 mt-8 text-center text-xs text-foreground-secondary">
          <span>{language === "vi" ? "Đã có tài khoản?" : "Already have an account?"} </span>
          <Link href="/auth/login" className="text-primary font-bold hover:underline">
            {language === "vi" ? "Đăng nhập" : "Sign In"}
          </Link>
        </div>

      </div>

    </div>
  );
}
