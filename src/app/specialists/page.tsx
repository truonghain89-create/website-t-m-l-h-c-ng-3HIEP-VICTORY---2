"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { Star, Search, Filter, ShieldCheck, Check } from "lucide-react";

export default function SpecialistsPage() {
  const { language, specialists } = useAppState();
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  const specialtiesList = [
    "All",
    "Áp lực thi cử",
    "Lo âu học đường",
    "Khủng hoảng tuổi dậy thì",
    "Kiểm soát tức giận",
    "Xung đột gia đình",
  ];

  const filteredSpecialists = specialists.filter((sp) => {
    const matchesSearch = sp.name.toLowerCase().includes(search.toLowerCase()) || 
                          sp.role.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || sp.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "DANH SÁCH CHUYÊN GIA" : "COUNSELING DIRECTORY"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Gặp gỡ đội ngũ chuyên gia tâm lý học đường" : "Consult our certified specialists"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Tất cả chuyên gia tại MindCare đều sở hữu trình độ Thạc sĩ, Tiến sĩ chuyên ngành và có nhiều năm kinh nghiệm đồng hành hỗ trợ tâm lý lứa tuổi học sinh."
            : "All consultants hold Master or PhD degrees with years of dedicated on-campus clinical experience."}
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-card border border-border rounded-3xl p-6 shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === "vi" ? "Tìm kiếm chuyên gia..." : "Search consultants..."}
            className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
          />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-start md:justify-end">
          <Filter className="w-4 h-4 text-foreground-secondary mr-1 shrink-0" />
          {specialtiesList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedSpecialty(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedSpecialty === tag
                  ? "bg-primary border-primary text-white"
                  : "bg-background-secondary border-border text-foreground-secondary hover:text-foreground hover:bg-border/30"
              }`}
            >
              {tag === "All" ? (language === "vi" ? "Tất cả lĩnh vực" : "All fields") : tag}
            </button>
          ))}
        </div>

      </section>

      {/* Specialists List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpecialists.length > 0 ? (
          filteredSpecialists.map((sp) => (
            <div 
              key={sp.id}
              className="group bg-card border border-border p-6 rounded-[2rem] shadow-premium hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 hover:shadow-glow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header Profile */}
                <div className="flex gap-4 items-start mb-4">
                  {/* Portrait Avatar Container with micro-animation */}
                  <div className="w-16 h-16 rounded-full border-2 border-primary/15 overflow-hidden shrink-0 bg-background-secondary shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={sp.avatar} 
                      alt={sp.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                      {sp.name}
                    </h3>
                    <span className="block text-[11px] text-foreground-secondary leading-normal mt-1">
                      {sp.role}
                    </span>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {sp.specialties.map((spec) => (
                    <span 
                      key={spec}
                      className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Short Bio */}
                <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-3 mb-6">
                  {sp.bio}
                </p>

                {/* Availability Preview */}
                <div className="border-t border-divider pt-4 mb-6">
                  <span className="block text-[10px] text-foreground-secondary font-bold uppercase tracking-wider mb-2">
                    {language === "vi" ? "Lịch nhận tham vấn:" : "Availability Preview:"}
                  </span>
                  <div className="space-y-1 text-xs font-semibold text-foreground">
                    {sp.availability.slice(0, 2).map((av, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>{av}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 border-t border-divider pt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-xs font-bold text-foreground">{sp.rating}</span>
                </div>
                
                <Link
                  href={`/specialists/${sp.id}`}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-secondary text-white text-center py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all duration-300 hover:shadow-glow-sm active:scale-95"
                >
                  {language === "vi" ? "Đăng ký tham vấn" : "Book session"}
                </Link>
              </div>

            </div>
          ))
        ) : (
          /* Empty State for Specialists */
          <div className="col-span-full py-16 text-center bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="font-heading font-bold text-base text-foreground">
              {language === "vi" ? "Không tìm thấy chuyên gia phù hợp" : "No matching specialists found"}
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              {language === "vi" ? "Vui lòng đổi từ khóa tìm kiếm hoặc lọc chuyên môn khác." : "Try changing search terms or filters."}
            </p>
          </div>
        )}
      </section>

      {/* Safety and Credentials trust seal */}
      <section className="bg-background-section p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-4 border border-border shadow-sm">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm text-foreground">
            {language === "vi" ? "100% Chuyên gia đã qua xác thực" : "100% Verified Credentials"}
          </h4>
          <p className="text-xs text-foreground-secondary mt-0.5 leading-relaxed">
            {language === "vi"
              ? "Tất cả hồ sơ bằng cấp, chứng chỉ lâm sàng và kinh nghiệm tham vấn của chuyên gia đều được bộ phận Nhân sự của MindCare xác thực nghiêm ngặt trước khi tham gia hỗ trợ tâm lý học đường."
              : "All degrees, clinical credentials, and licensing details are strictly verified by our clinical compliance officers."}
          </p>
        </div>
      </section>

    </div>
  );
}
