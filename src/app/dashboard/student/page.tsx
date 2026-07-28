"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  User, Calendar, BookOpen, ClipboardCheck, Video, MapPin, ChevronRight, Play, Star 
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const { role, language, userProfile, appointments, courses, assessmentResult } = useAppState();

  // Route protection
  useEffect(() => {
    if (role !== "student" && role !== "guest") {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  const upcomingApts = appointments.filter(apt => apt.status === "upcoming");
  const enrolledCourses = courses.filter(c => c.enrolled);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 rounded-3xl text-white shadow-premium">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1 subheading">
              {language === "vi" ? "BẢNG ĐIỀU KHIỂN HỌC SINH" : "STUDENT PANEL"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{language === "vi" ? `Chào Khoa, ngày mới an lành!` : `Hello Khoa, wish you a calm day!`}</h1>
            <p className="text-xs text-white/80 mt-1 max-w-lg">
              {language === "vi"
                ? "Dành ra 5 phút mỗi ngày thực hành chánh niệm để duy trì sự cân bằng học tập và cảm xúc nhé."
                : "Spend 5 minutes on mindfulness practice to retain your emotional and study balance."}
            </p>
          </div>
          
          <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur text-xs">
            <span className="block font-bold text-white">{userProfile.name}</span>
            <span className="block text-white/70 mt-0.5">{userProfile.school} ({userProfile.grade})</span>
          </div>
        </div>
      </section>

      {/* Dashboard split panels layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Schedules, Courses */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Upcoming Consultations */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <div className="flex justify-between items-center pb-4 border-b border-divider mb-4">
              <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-primary" />
                <span>{language === "vi" ? "Lịch tư vấn sắp tới" : "Upcoming Sessions"}</span>
              </h3>
              
              <Link href="/appointments" className="text-xs text-primary font-bold hover:underline">
                {language === "vi" ? "Xem tất cả" : "View All"}
              </Link>
            </div>

            {upcomingApts.length > 0 ? (
              <div className="space-y-4">
                {upcomingApts.map((apt) => (
                  <div key={apt.id} className="p-4 bg-background-secondary border border-border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex gap-3 items-center">
                      <span className="text-2xl">{apt.specialistAvatar}</span>
                      <div>
                        <span className="block text-xs font-bold text-foreground">{apt.specialistName}</span>
                        <span className="block text-[10px] text-foreground-secondary">{apt.specialistRole}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-foreground-secondary">
                      <span>{apt.date}</span>
                      <span>{apt.timeSlot}</span>
                    </div>

                    <div className="w-full sm:w-auto">
                      {apt.format === "online" ? (
                        <Link
                          href="/appointments"
                          className="w-full text-center bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm block transition-all"
                        >
                          {language === "vi" ? "Vào tham vấn video" : "Join Call"}
                        </Link>
                      ) : (
                        <span className="block text-center text-xs text-secondary font-bold bg-secondary/15 px-3 py-1.5 rounded-xl border border-secondary/20">
                          {language === "vi" ? "Gặp tại phòng trường" : "Office"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-foreground-secondary italic mb-4">{language === "vi" ? "Bạn chưa có lịch hẹn tư vấn nào sắp diễn ra." : "No upcoming sessions."}</p>
                <Link
                  href="/booking"
                  className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1"
                >
                  <span>{language === "vi" ? "Đặt lịch trò chuyện ngay" : "Book session"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Active Courses */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <div className="flex justify-between items-center pb-4 border-b border-divider mb-4">
              <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-secondary" />
                <span>{language === "vi" ? "Khóa học của em" : "Enrolled Courses"}</span>
              </h3>
              <Link href="/courses" className="text-xs text-primary font-bold hover:underline">
                {language === "vi" ? "Đăng ký thêm" : "Browse More"}
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses.map((c) => (
                  <div key={c.id} className="p-4 border border-border bg-background-secondary rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-2xl mb-2 block">{c.image}</span>
                      <h4 className="font-heading font-bold text-sm text-foreground mb-1 line-clamp-1">{c.title}</h4>
                      <span className="text-[10px] text-foreground-secondary block mb-4">{c.duration}</span>
                    </div>

                    <div className="border-t border-divider pt-3 mt-4">
                      <div className="flex justify-between text-[10px] font-semibold text-foreground-secondary mb-1">
                        <span>{language === "vi" ? "Hoàn thành" : "Progress"}</span>
                        <span>{c.progress}%</span>
                      </div>
                      <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-secondary" style={{ width: `${c.progress}%` }} />
                      </div>
                      <Link
                        href={`/courses/${c.id}`}
                        className="bg-primary hover:bg-primary/95 text-white text-center py-2 rounded-xl text-xs font-bold shadow-sm block transition-all"
                      >
                        {language === "vi" ? "Học tiếp" : "Continue"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-foreground-secondary italic text-center py-6">{language === "vi" ? "Bạn chưa đăng ký khóa học kỹ năng nào." : "No enrolled courses."}</p>
            )}
          </div>

        </div>

        {/* Right Column: Assessment logs, Profile summaries */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Mental Health Assessment Status */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-4.5 h-4.5 text-primary" />
              <span>{language === "vi" ? "Khảo sát tâm lý" : "Assessment Status"}</span>
            </h3>

            {assessmentResult ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-background-secondary border border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {assessmentResult.score}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-foreground capitalize">
                      {language === "vi" ? "Độ stress:" : "Stress Level:"} {assessmentResult.riskLevel}
                    </span>
                    <span className="block text-[9px] text-foreground-secondary">
                      {language === "vi" ? "Đã kiểm tra ngày:" : "Checked date:"} {assessmentResult.date}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/assessment/results"
                    className="flex-1 bg-primary text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-primary/95 transition-all"
                  >
                    {language === "vi" ? "Chi tiết phân tích" : "View Details"}
                  </Link>
                  <Link
                    href="/assessment"
                    className="bg-background-secondary border border-border hover:bg-border text-foreground px-4 py-2.5 rounded-xl text-xs font-bold text-center transition-all"
                  >
                    {language === "vi" ? "Làm lại" : "Retake"}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-foreground-secondary mb-4">
                  {language === "vi" ? "Bạn chưa thực hiện bài kiểm tra tự sàng lọc tâm lý." : "You have not completed wellness screening."}
                </p>
                <Link
                  href="/assessment"
                  className="w-full bg-primary hover:bg-primary/95 text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm block transition-all"
                >
                  {language === "vi" ? "Làm đánh giá ngay" : "Take Screening"}
                </Link>
              </div>
            )}
          </div>

          {/* Quick Helpline */}
          <div className="bg-highlight/5 border border-highlight/10 p-6 rounded-3xl shadow-sm text-center">
            <span className="text-xs font-bold text-highlight uppercase tracking-wider block mb-2 subheading">
              {language === "vi" ? "ĐƯỜNG DÂY NÓNG KHẨN CẤP" : "EMERGENCY HOTLINE"}
            </span>
            <span className="text-lg font-extrabold text-foreground block mb-2">1900 599 930</span>
            <p className="text-[10px] text-foreground-secondary leading-relaxed mb-4">
              Nếu gặp cảm xúc quá tải nghiêm trọng, hãy gọi ngay để được hỗ trợ từ cán bộ trực ban y tế khẩn cấp.
            </p>
            <a
              href="tel:1900599930"
              className="bg-highlight hover:bg-highlight/95 text-white text-center py-2.5 rounded-xl text-xs font-bold block transition-all shadow-sm"
            >
              {language === "vi" ? "Gọi ứng cứu khẩn cấp" : "Call Emergency"}
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
