"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { Search, BookOpen, Star, Award, Check } from "lucide-react";

export default function CoursesPage() {
  const { language, courses, enrollInCourse } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Áp lực học tập", "Quản lý cảm xúc", "Dành cho Phụ huynh"];

  const filteredCourses = courses.filter((course) => {
    return selectedCategory === "All" || course.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "KHÓA HỌC KỸ NĂNG SỐNG" : "WELLNESS COURSES"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Rèn luyện sức khỏe tinh thần chủ động" : "Proactive Mental Skills & EQ Training"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Tuyển tập các bài học ngắn chất lượng cao từ chuyên gia giúp bạn trang bị các kỹ thuật ứng phó stress, giao tiếp cảm xúc và kết nối yêu thương."
            : "Bite-sized high-quality modules crafted by certified psychologists helping you build stress coping and EQ skills."}
        </p>
      </section>

      {/* Categories filter */}
      <section className="flex flex-wrap gap-2 justify-center items-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              selectedCategory === cat
                ? "bg-primary border-primary text-white shadow-sm"
                : "bg-background-secondary border-border text-foreground-secondary hover:text-foreground hover:bg-border/30"
            }`}
          >
            {cat === "All" ? (language === "vi" ? "Tất cả chủ đề" : "All subjects") : cat}
          </button>
        ))}
      </section>

      {/* Courses List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((c) => (
          <div 
            key={c.id}
            className="bg-card border border-border rounded-3xl p-6 shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover Mock */}
              <div className="w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-tr from-primary/10 to-secondary/15 flex items-center justify-center mb-5 border border-border/40">
                {c.image.startsWith("/") ? (
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{c.image}</span>
                )}
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
                  {c.category}
                </span>
                <span className="text-[10px] text-foreground-secondary font-semibold">{c.duration}</span>
              </div>

              <h3 className="font-heading font-bold text-base text-foreground leading-snug mb-3">
                {c.title}
              </h3>

              <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                {c.description}
              </p>
            </div>

            <div className="border-t border-divider pt-4 mt-auto">
              
              {/* Enrollment / Progress Actions */}
              {c.enrolled ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-semibold text-foreground-secondary">
                    <span>{language === "vi" ? "Tiến độ học tập" : "Learning Progress"}</span>
                    <span>{c.progress}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-background-secondary h-2 rounded-full overflow-hidden border border-border mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>

                  <Link
                    href={`/courses/${c.id}`}
                    className="w-full bg-primary text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm block hover:bg-primary/95 transition-colors"
                  >
                    {language === "vi" ? "Học tiếp bài học" : "Continue Learning"}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => enrollInCourse(c.id)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    {language === "vi" ? "Đăng ký học" : "Enroll Now"}
                  </button>
                  
                  <Link
                    href={`/courses/${c.id}`}
                    className="bg-background-secondary border border-border hover:bg-border text-foreground px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    {language === "vi" ? "Chi tiết" : "Details"}
                  </Link>
                </div>
              )}

            </div>
          </div>
        ))}
      </section>

      {/* Certification details */}
      <section className="bg-background-alt p-8 rounded-3xl border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-foreground">
              {language === "vi" ? "Nhận Chứng Nhận Sức Khỏe Tinh Thần" : "Earn Mental Wellness Certifications"}
            </h4>
            <p className="text-xs text-foreground-secondary mt-0.5 leading-relaxed">
              {language === "vi"
                ? "Hoàn thành 100% bài học và vượt qua bài trắc nghiệm cuối khóa học để nhận chứng nhận kỹ năng cảm xúc số hóa từ ban cố vấn chuyên môn."
                : "Complete all video modules and pass the course-end check-ups to earn digital wellness certificates."}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
