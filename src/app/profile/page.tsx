"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { User, Mail, School, Phone, ShieldCheck, Save } from "lucide-react";

export default function ProfilePage() {
  const { language, userProfile, updateUserProfile } = useAppState();

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    school: userProfile.school,
    grade: userProfile.grade,
    phone: userProfile.phone,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Title Header */}
      <section className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "HỒ SƠ CÁ NHÂN" : "USER PROFILE"}
        </span>
        <h1 className="text-3xl font-extrabold text-foreground mt-4 mb-2">
          {language === "vi" ? "Thông tin cá nhân của bạn" : "Manage your personal account"}
        </h1>
        <p className="text-xs text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Cập nhật thông tin tài khoản học sinh, sinh viên, phụ huynh hoặc chuyên gia liên kết."
            : "Update your profile records, school enrollment details, and phone contacts."}
        </p>
      </section>

      {/* Profile Form */}
      <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-premium">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                {language === "vi" ? "Họ và tên:" : "Full Name:"}
              </label>
              <div className="relative">
                <User className="w-4.5 h-4.5 text-foreground-secondary absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                {language === "vi" ? "Địa chỉ Email:" : "Email Address:"}
              </label>
              <div className="relative">
                <Mail className="w-4.5 h-4.5 text-foreground-secondary absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* School / Affiliation */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                {language === "vi" ? "Trường học / Đơn vị công tác:" : "School / Institution:"}
              </label>
              <div className="relative">
                <School className="w-4.5 h-4.5 text-foreground-secondary absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="school"
                  required
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Grade / Class / Role Code */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                {language === "vi" ? "Lớp học / Mã số định danh:" : "Class / Identification Code:"}
              </label>
              <div className="relative">
                <ShieldCheck className="w-4.5 h-4.5 text-foreground-secondary absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Phone contact */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-foreground block">
                {language === "vi" ? "Số điện thoại:" : "Phone Contact:"}
              </label>
              <div className="relative">
                <Phone className="w-4.5 h-4.5 text-foreground-secondary absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

          </div>

          <div className="border-t border-divider pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-premium transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{language === "vi" ? "Lưu thay đổi" : "Save Changes"}</span>
            </button>
          </div>

        </form>

      </section>

    </div>
  );
}
