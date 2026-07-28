"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  User, Calendar, ClipboardCheck, Video, MapPin, Star, ChevronRight, CheckCircle2 
} from "lucide-react";

export default function SpecialistDashboard() {
  const router = useRouter();
  const { role, language, userProfile, appointments } = useAppState();

  // Route protection
  useEffect(() => {
    if (role !== "specialist" && role !== "guest") {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  const upcomingApts = appointments.filter(apt => apt.status === "upcoming");

  // Mock student screening reports queue
  const screeningReports = [
    {
      studentName: "Nguyễn Minh Khoa",
      class: "Lớp 11 Toán 1",
      score: 32,
      riskLevel: "high",
      date: "28/07/2026",
      status: "Lịch tư vấn đã đặt"
    },
    {
      studentName: "Lê Minh Tuấn",
      class: "Lớp 12 Anh 2",
      score: 24,
      riskLevel: "medium",
      date: "25/07/2026",
      status: "Chưa tham vấn"
    },
    {
      studentName: "Trần Anh Thư",
      class: "Lớp 10 Hóa 1",
      score: 14,
      riskLevel: "low",
      date: "24/07/2026",
      status: "Tự rèn luyện"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 rounded-3xl text-white shadow-premium">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1 subheading">
              {language === "vi" ? "BẢNG ĐIỀU KHIỂN CHUYÊN GIA" : "THERAPIST BOARD"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{language === "vi" ? `Chào bác sĩ Mai, ngày làm việc năng lượng!` : `Welcome Dr. Mai, wish you a productive day!`}</h1>
            <p className="text-xs text-white/80 mt-1 max-w-lg">
              {language === "vi"
                ? "Theo dõi lịch hẹn tham vấn trực tuyến và kiểm tra các kết quả sàng lọc sức khỏe tâm lý của học sinh."
                : "Monitor online counseling schedules and audit psychological self-screening logs of students."}
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
        
        {/* Left Column: Consultations, Screening Reports */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Upcoming Consultations */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4 flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-primary" />
              <span>{language === "vi" ? "Danh sách lịch tham vấn cần thực hiện" : "Consultation Patient Queue"}</span>
            </h3>

            {upcomingApts.length > 0 ? (
              <div className="space-y-4">
                {upcomingApts.map((apt) => (
                  <div key={apt.id} className="p-4 bg-background-secondary border border-border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-lg flex items-center justify-center font-bold text-primary">
                        👤
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-foreground">Học sinh ẩn danh (Giám hộ liên kết)</span>
                        <span className="block text-[10px] text-foreground-secondary">{apt.timeSlot} | {apt.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-foreground-secondary">
                      <span className="uppercase">{apt.format}</span>
                    </div>

                    <div>
                      {apt.format === "online" ? (
                        <Link
                          href="/appointments"
                          className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm block transition-all text-center"
                        >
                          {language === "vi" ? "Vào phòng tư vấn video" : "Join video call"}
                        </Link>
                      ) : (
                        <span className="block text-xs text-secondary font-bold bg-secondary/15 px-3 py-1.5 rounded-xl border border-secondary/20 text-center">
                          {language === "vi" ? "Tại Văn phòng tâm lý trường" : "Office"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-foreground-secondary italic text-center py-6">{language === "vi" ? "Không có lịch hẹn tham vấn nào sắp diễn ra." : "No upcoming sessions."}</p>
            )}
          </div>

          {/* Student screening reports queue */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-4.5 h-4.5 text-secondary" />
              <span>{language === "vi" ? "Kết quả đánh giá tâm lý học sinh gần đây" : "Student Screening Registry Queue"}</span>
            </h3>

            <div className="space-y-4">
              {screeningReports.map((rep, idx) => (
                <div key={idx} className="p-4 bg-background-secondary border border-border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/20 transition-all">
                  <div>
                    <h4 className="font-heading font-bold text-xs text-foreground">{rep.studentName}</h4>
                    <span className="block text-[10px] text-foreground-secondary mt-0.5">{rep.class} | Ngày: {rep.date}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-foreground-secondary">Điểm:</span>
                      <span className="font-bold text-foreground">{rep.score}/40</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      rep.riskLevel === "high" ? "bg-highlight/15 text-highlight" :
                      rep.riskLevel === "medium" ? "bg-accent/15 text-amber-700 dark:text-amber-300" :
                      "bg-secondary/15 text-secondary"
                    }`}>
                      {rep.riskLevel}
                    </span>
                  </div>

                  <span className="text-xs text-foreground-secondary font-semibold italic text-right">
                    {rep.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: statistics, clinic resources */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Clinic Stats */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4">
              {language === "vi" ? "Báo cáo công tác tuần" : "Clinic Weekly Metrics"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background-secondary border border-border rounded-xl">
                <span className="block text-lg font-extrabold text-primary">12</span>
                <span className="block text-[9px] text-foreground-secondary font-bold uppercase tracking-wider mt-1">Buổi tư vấn xong</span>
              </div>
              <div className="p-3 bg-background-secondary border border-border rounded-xl">
                <span className="block text-lg font-extrabold text-secondary">3</span>
                <span className="block text-[9px] text-foreground-secondary font-bold uppercase tracking-wider mt-1">Lịch chờ duyệt</span>
              </div>
            </div>
          </div>

          {/* Guidelines and templates for therapists */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4">
              {language === "vi" ? "Tài liệu & Cẩm nang nghiệp vụ" : "Clinical Practice Manuals"}
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-border bg-background-secondary flex gap-2.5 items-center">
                <span className="text-lg">📘</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground leading-snug">Quy chuẩn can thiệp CBT học đường</h4>
                  <span className="block text-[9px] text-foreground-secondary mt-0.5">Tiêu chuẩn chẩn đoán lo âu thi cử.</span>
                </div>
              </div>
              
              <div className="p-3 rounded-xl border border-border bg-background-secondary flex gap-2.5 items-center">
                <span className="text-lg">📋</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground leading-snug">Mẫu biên bản tham vấn ẩn danh</h4>
                  <span className="block text-[9px] text-foreground-secondary mt-0.5">Báo cáo đánh giá tiến độ học sinh.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
