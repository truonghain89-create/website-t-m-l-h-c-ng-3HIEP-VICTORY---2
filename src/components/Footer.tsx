"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { 
  Heart, Send, Phone, Mail, MapPin, AlertTriangle
} from "lucide-react";

export const Footer: React.FC = () => {
  const { language, addToast } = useAppState();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast(
      language === "vi"
        ? "Đăng ký nhận bản tin thành công! Cảm ơn bạn."
        : "Successfully subscribed to our newsletter! Thank you.",
      "success"
    );
    setEmail("");
  };

  return (
    <footer className="bg-background-secondary border-t border-border pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Emergency Warning Bar */}
        <div className="mb-12 p-4 rounded-2xl bg-highlight/10 border border-highlight/20 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-highlight/20 flex items-center justify-center text-highlight shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h4 className="font-heading font-bold text-sm text-foreground">
              {language === "vi" ? "HỖ TRỢ KHẨN CẤP 24/7" : "24/7 EMERGENCY CRISIS SUPPORT"}
            </h4>
            <p className="text-xs text-foreground-secondary mt-1">
              {language === "vi" 
                ? "Nếu bạn hoặc ai đó bạn biết đang trải qua khủng hoảng tâm lý nghiêm trọng hoặc có ý định tự hại, hãy liên hệ ngay với đường dây nóng của trường hoặc Hotline Quốc gia 1900 599 930."
                : "If you or someone you know is experiencing a psychological crisis or has thoughts of self-harm, please contact our school hotline or call the National Hotline 1900 599 930 immediately."}
            </p>
          </div>
          <a
            href="tel:1900599930"
            className="flex items-center gap-2 bg-highlight hover:bg-highlight/95 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>1900 599 930</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/thpt-tam-hiep-logo.png" 
                alt="Trường THPT Tam Hiệp" 
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-sm shrink-0"
              />
              <div className="h-6 w-px bg-border/80" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shrink-0">
                  <Heart className="w-4.5 h-4.5 fill-current" />
                </div>
                <span className="font-heading font-bold text-lg tracking-tight text-foreground">
                  MindCare School
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary leading-relaxed max-w-sm mb-6">
              {language === "vi"
                ? "Lắng nghe – Thấu hiểu – Đồng hành cùng học sinh, sinh viên và gia đình trên hành trình chăm sóc sức khỏe tinh thần và phát triển bản thân tích cực."
                : "Listen – Understand – Accompany students, pupils, and families on the journey of mental health care and positive self-development."}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground-secondary hover:text-primary hover:border-primary transition-all" aria-label="Facebook">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-2.4 0-4 1.2-4 3.8V8z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground-secondary hover:text-primary hover:border-primary transition-all" aria-label="YouTube">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.2-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 2 2.2 2.2 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.2 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground-secondary hover:text-primary hover:border-primary transition-all" aria-label="LinkedIn">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div>
            <h5 className="font-heading font-bold text-xs tracking-wider uppercase text-foreground mb-4 subheading">
              {language === "vi" ? "Dịch vụ hỗ trợ" : "Services"}
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Tư vấn cá nhân" : "Individual Counseling"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Tư vấn gia đình" : "Family Support"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Tham vấn nhóm" : "Group Sessions"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Can thiệp học đường" : "Crisis Intervention"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-xs tracking-wider uppercase text-foreground mb-4 subheading">
              {language === "vi" ? "Học tập & Tài nguyên" : "Learning"}
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Khóa học kỹ năng" : "Skill Courses"}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Bài kiểm tra tâm lý" : "Assessment Tools"}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Thư viện Ebook" : "Ebooks & Podcasts"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground-secondary hover:text-primary transition-colors">
                  {language === "vi" ? "Góc chia sẻ cảm xúc" : "Mental Health Blog"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h5 className="font-heading font-bold text-xs tracking-wider uppercase text-foreground mb-4 subheading">
              {language === "vi" ? "Bản tin MindCare" : "Newsletter"}
            </h5>
            <p className="text-xs text-foreground-secondary mb-4 leading-relaxed">
              {language === "vi"
                ? "Đăng ký nhận bài viết hữu ích về chăm sóc sức khỏe tinh thần tuổi học đường từ các chuyên gia."
                : "Subscribe to receive valuable school mental health articles from leading specialists."}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "vi" ? "Email của bạn..." : "Your email..."}
                className="flex-1 bg-card border border-border px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white p-2 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Separator line */}
        <hr className="my-10 border-divider" />

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-foreground-secondary mb-10">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span>280 An Dương Vương, Phường 4, Quận 5, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-secondary shrink-0" />
            <span>support.mindcare@school.edu.vn</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <span>(028) 3835 2020 (Phòng Tham vấn học đường)</span>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground-secondary border-t border-divider pt-6">
          <span>
            &copy; {new Date().getFullYear()} MindCare School Platform. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">{language === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}</a>
            <a href="#" className="hover:underline">{language === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
