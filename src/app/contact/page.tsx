"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const { language, addToast } = useAppState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      language === "vi" 
        ? "Yêu cầu của bạn đã được gửi tới Ban cố vấn tâm lý học đường! Chúng tôi sẽ phản hồi sớm." 
        : "Your inquiry has been submitted! Our counseling office will get back to you shortly.",
      "success"
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "LIÊN HỆ PHÒNG TÂM LÝ" : "CONTACT OFFICE"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Chúng tôi luôn sẵn sàng lắng nghe" : "Reach out to our campus office"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Mọi phản hồi, yêu cầu hỗ trợ hoặc đăng ký tham vấn đặc biệt từ phụ huynh và học sinh đều được tiếp nhận bảo mật."
            : "Any questions, suggestions, or parenting requests are strictly confidential."}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form and details */}
        <div className="lg:col-span-8 bg-card border border-border p-6 md:p-8 rounded-[2rem] shadow-premium">
          <h3 className="font-heading font-bold text-base text-foreground mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>{language === "vi" ? "Gửi thư điện tử ẩn danh/yêu cầu" : "Send Anonymous Inquiries"}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">
                  {language === "vi" ? "Họ và tên (Để trống nếu muốn ẩn danh):" : "Your Name (Optional):"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === "vi" ? "Nhập tên..." : "Enter name..."}
                  className="w-full bg-background-secondary border border-border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">
                  {language === "vi" ? "Địa chỉ Email để nhận phản hồi:" : "Your Email:"}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@school.edu.vn"
                  className="w-full bg-background-secondary border border-border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">
                {language === "vi" ? "Chủ đề cần tư vấn:" : "Subject Topic:"}
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={language === "vi" ? "VD: Căng thẳng thi cử, xung đột gia đình..." : "e.g., Exam anxiety, family clash..."}
                className="w-full bg-background-secondary border border-border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">
                {language === "vi" ? "Nội dung chi tiết câu chuyện:" : "Message Description:"}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={language === "vi" ? "Mô tả câu chuyện của bạn..." : "Describe your story..."}
                className="w-full bg-background-secondary border border-border p-4 text-xs rounded-2xl focus:outline-none focus:border-primary text-foreground"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-premium transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === "vi" ? "Gửi đi bảo mật" : "Submit Safely"}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Google Maps Mock & Contacts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Contact Details box */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground mb-4">
              {language === "vi" ? "Văn phòng hỗ trợ" : "Campus Office"}
            </h3>
            
            <div className="space-y-4 text-xs text-foreground-secondary font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">280 An Dương Vương, Phường 4, Quận 5, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>support.mindcare@school.edu.vn</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(028) 3835 2020 (Giờ hành chính)</span>
              </div>
            </div>
          </div>

          {/* Interactive Mock Map box */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-premium aspect-square flex flex-col justify-between p-6">
            <h4 className="font-heading font-bold text-xs text-foreground mb-2">
              {language === "vi" ? "Bản đồ vị trí trường học" : "Campus map location"}
            </h4>
            
            {/* Map visual shapes */}
            <div className="flex-1 bg-background-secondary rounded-2xl border border-border/60 relative overflow-hidden flex items-center justify-center">
              
              {/* Fake streets grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-border/40 transform -translate-y-1/2 rotate-12" />
              <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-border/40 transform -translate-x-1/2 -rotate-12" />
              
              {/* Location marker pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center animate-bounce">
                  <MapPin className="w-4.5 h-4.5 text-primary" />
                </div>
                <span className="bg-card text-[9px] font-bold text-foreground border border-border px-2 py-0.5 rounded shadow-sm mt-1.5 whitespace-nowrap">
                  MindCare School Room
                </span>
              </div>

            </div>

            <p className="text-[10px] text-foreground-secondary mt-3 leading-relaxed text-center">
              Lầu 2, Nhà B (Phòng tham vấn tâm học đường).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
