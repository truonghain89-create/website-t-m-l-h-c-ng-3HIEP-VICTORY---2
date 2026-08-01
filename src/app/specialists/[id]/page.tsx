"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAppState, Specialist } from "@/context/AppContext";
import { Star, ArrowLeft, Calendar, ShieldCheck, Mail, BookOpen, Quote } from "lucide-react";

export default function SpecialistProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  const { language, specialists } = useAppState();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    if (id) {
      const found = specialists.find(sp => sp.id === Number(id));
      if (found) {
        setSpecialist(found);
      } else {
        router.push("/specialists");
      }
    }
  }, [id, specialists, router]);

  if (!specialist) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-foreground-secondary">Đang tải hồ sơ chuyên gia...</p>
      </div>
    );
  }

  const reviews = [
    {
      author: "Học sinh ẩn danh (Lớp 11)",
      textVi: "Cô Mai lắng nghe rất tận tình, không hề phán xét em. Bài tập thở cô hướng dẫn giúp em giảm được chứng hồi hộp mỗi khi làm bài thi.",
      textEn: "Ms. Mai was extremely patient and non-judgmental. The breathing exercises helped cure my exam anxiety.",
      rating: 5,
      date: "20 Tháng 7, 2026"
    },
    {
      author: "Phụ huynh học sinh Trần Anh T.",
      textVi: "Gia đình tôi đã giải tỏa được xung đột với cháu sau 2 buổi trò chuyện cùng chuyên gia. Rất cảm ơn cô Mai.",
      textEn: "Our family resolved deep communication blocks with our child. Huge thanks to Ms. Mai.",
      rating: 5,
      date: "14 Tháng 7, 2026"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Back to list trigger */}
      <div>
        <Link
          href="/specialists"
          className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-foreground font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "vi" ? "Quay lại danh sách chuyên gia" : "Back to Directory"}</span>
        </Link>
      </div>

      {/* Profile Header Summary */}
      <section className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium flex flex-col md:flex-row gap-8 items-start">
        
        {/* Avatar block */}
        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/20 shrink-0 mx-auto md:mx-0 bg-background-secondary shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={specialist.avatar} 
            alt={specialist.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bio Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            {specialist.name}
          </h1>
          <p className="text-xs text-primary font-bold uppercase tracking-wider subheading mb-4">
            {specialist.role}
          </p>

          <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
            {specialist.bio}
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-xs font-bold text-foreground">{specialist.rating}</span>
              <span className="text-[10px] text-foreground-secondary">({specialist.reviewsCount} {language === "vi" ? "đánh giá" : "reviews"})</span>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-divider hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs text-foreground-secondary font-medium">
              <ShieldCheck className="w-4.5 h-4.5 text-secondary" />
              <span>{specialist.experience}</span>
            </div>
          </div>
        </div>

        {/* Quick CTA panel */}
        <div className="w-full md:w-64 bg-background-secondary border border-border rounded-2xl p-5 shrink-0 flex flex-col gap-4 shadow-sm text-center md:text-left">
          <div>
            <span className="block text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">
              {language === "vi" ? "Phí tham vấn đóng góp:" : "Contribution Fee:"}
            </span>
            <span className="text-lg font-extrabold text-foreground mt-1 block">
              {specialist.price} <span className="text-xs font-normal text-foreground-secondary">/ {language === "vi" ? "giờ" : "hr"}</span>
            </span>
          </div>

          <Link
            href={`/booking?specialistId=${specialist.id}`}
            className="w-full bg-primary hover:bg-primary/95 text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4.5 h-4.5" />
            <span>{language === "vi" ? "Đặt lịch trò chuyện" : "Book Session"}</span>
          </Link>
        </div>

      </section>

      {/* Detailed Columns vision split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Academic details, Methods */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Education Details */}
          <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-base text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>{language === "vi" ? "Trình độ học vấn & Bằng cấp" : "Academic Credentials"}</span>
            </h3>
            <p className="text-xs text-foreground-secondary leading-relaxed font-semibold">
              {specialist.education}
            </p>
          </div>

          {/* Specialties detail list */}
          <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-base text-foreground mb-4">
              {language === "vi" ? "Lĩnh vực tham vấn chuyên sâu" : "Areas of Expertise"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialist.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-3.5 py-1.5 rounded-xl border border-border bg-background-secondary text-xs text-foreground font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews list */}
          <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium flex flex-col gap-6">
            <h3 className="font-heading font-bold text-base text-foreground">
              {language === "vi" ? "Phản hồi từ học sinh và gia đình" : "Client Feedbacks & Reviews"}
            </h3>
            
            <div className="space-y-6 divider-y divide-divider">
              {reviews.map((rev, idx) => (
                <div key={idx} className="flex gap-4 items-start pt-6 first:pt-0 border-t border-divider first:border-t-0">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 text-sm flex items-center justify-center font-bold text-secondary shrink-0">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-foreground font-bold">{rev.author}</span>
                      <span className="text-[10px] text-foreground-secondary">{rev.date}</span>
                    </div>
                    
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-xs text-foreground-secondary leading-relaxed italic">
                      &ldquo;{language === "vi" ? rev.textVi : rev.textEn}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Availability Schedule */}
        <div className="lg:col-span-4 bg-card border border-border p-6 rounded-3xl shadow-premium">
          <h3 className="font-heading font-bold text-base text-foreground mb-4">
            {language === "vi" ? "Lịch nhận tham vấn hàng tuần" : "Weekly Schedule"}
          </h3>
          <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
            {language === "vi"
              ? "Vui lòng tham khảo các khung giờ nhận hẹn bên dưới của chuyên gia trước khi chuyển sang bước đặt lịch."
              : "Refer to the active slots below when preparing to register your appointment calendar."}
          </p>

          <div className="space-y-3">
            {specialist.availability.map((av, index) => (
              <div 
                key={index} 
                className="p-3 rounded-xl border border-border bg-background-secondary text-xs font-semibold text-foreground flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>{av}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-divider pt-6">
            <Link
              href={`/booking?specialistId=${specialist.id}`}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-3 rounded-xl text-xs font-bold shadow-premium block transition-all"
            >
              {language === "vi" ? "Chọn giờ & Đặt lịch" : "Select Time & Book"}
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
