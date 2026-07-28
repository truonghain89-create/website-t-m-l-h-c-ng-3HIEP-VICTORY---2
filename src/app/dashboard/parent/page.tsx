"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  User, Calendar, BookOpen, ShieldAlert, Heart, ChevronRight, PhoneCall, FileText 
} from "lucide-react";

export default function ParentDashboard() {
  const router = useRouter();
  const { role, language, userProfile, appointments } = useAppState();

  // Route protection
  useEffect(() => {
    if (role !== "parent" && role !== "guest") {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  const studentApts = appointments.filter(apt => apt.status === "upcoming");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary p-6 md:p-8 rounded-3xl text-white shadow-premium">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1 subheading">
              {language === "vi" ? "BẢNG ĐIỀU KHIỂN PHỤ HUYNH" : "PARENT DASHBOARD"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{language === "vi" ? `Chào anh Hùng, ngày mới tốt lành!` : `Hello Mr. Hung, have a great day!`}</h1>
            <p className="text-xs text-white/80 mt-1 max-w-lg">
              {language === "vi"
                ? "Duy trì sự đồng hành ấm áp và tôn trọng không gian riêng tư là chìa khóa thấu cảm cùng thanh thiếu niên."
                : "Warm companion and respecting privacy is the ultimate key to connect with adolescents."}
            </p>
          </div>
          
          <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur text-xs">
            <span className="block font-bold text-white">{userProfile.name}</span>
            <span className="block text-white/70 mt-0.5">{userProfile.school}</span>
          </div>
        </div>
      </section>

      {/* Dashboard split panels layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Linked student, schedules */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Linked student account info */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-6 flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>{language === "vi" ? "Tài khoản học sinh liên kết" : "Linked Student Account"}</span>
            </h3>

            <div className="p-6 rounded-2xl bg-background-secondary border border-border flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-3xl flex items-center justify-center font-bold text-primary shrink-0 border border-primary/20">
                  👦
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-foreground">Nguyễn Minh Khoa</h4>
                  <span className="block text-xs text-foreground-secondary mt-0.5">Lớp 11 Toán 1 - Trường THPT Chuyên Lê Hồng Phong</span>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    {language === "vi" ? "Đang kết nối giám hộ" : "Active Supervision"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Link
                  href="/booking"
                  className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm text-center transition-all"
                >
                  {language === "vi" ? "Đặt lịch gia đình" : "Family Booking"}
                </Link>
              </div>
            </div>
          </div>

          {/* Student consultation schedules */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4 flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-secondary" />
              <span>{language === "vi" ? "Lịch hẹn tham vấn gia đình/con" : "Family Counseling Schedule"}</span>
            </h3>

            {studentApts.length > 0 ? (
              <div className="space-y-4">
                {studentApts.map((apt) => (
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

                    <div>
                      {apt.format === "online" ? (
                        <Link
                          href="/appointments"
                          className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm block transition-all"
                        >
                          {language === "vi" ? "Vào phòng tư vấn" : "Join Call"}
                        </Link>
                      ) : (
                        <span className="block text-xs text-secondary font-bold bg-secondary/15 px-3 py-1.5 rounded-xl border border-secondary/20 text-center">
                          {language === "vi" ? "Gặp tại phòng trường" : "Office"}
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

        </div>

        {/* Right Column: Recommendations for parents, helpline */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Parent Guides */}
          <div className="bg-card border border-border p-6 rounded-3xl shadow-premium">
            <h3 className="font-heading font-bold text-sm text-foreground pb-4 border-b border-divider mb-4 flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5 text-primary" />
              <span>{language === "vi" ? "Cẩm nang dành riêng cho cha mẹ" : "Parenting Guidelines"}</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background-secondary border border-border hover:border-primary/20 transition-all flex gap-3">
                <span className="text-2xl mt-1 shrink-0">📖</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">Ebook: Làm bạn cùng con Gen Z</h4>
                  <p className="text-[10px] text-foreground-secondary mt-0.5 leading-relaxed">Cẩm nang kéo gần khoảng cách thế hệ và quản lý thiết bị số.</p>
                  <Link href="/resources" className="text-[10px] text-primary font-bold block mt-2 hover:underline">Tải về (PDF)</Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background-secondary border border-border hover:border-primary/20 transition-all flex gap-3">
                <span className="text-2xl mt-1 shrink-0">🎧</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-foreground">Podcast: Tránh lỗi giao tiếp gây đóng băng đối thoại</h4>
                  <p className="text-[10px] text-foreground-secondary mt-0.5 leading-relaxed">Podcast dài 20 phút chia sẻ cách phản hồi tích cực từ cô Mai.</p>
                  <Link href="/resources" className="text-[10px] text-primary font-bold block mt-2 hover:underline">Nghe Podcast</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Consultation Request */}
          <div className="bg-gradient-to-tr from-primary/10 to-secondary/10 p-6 rounded-3xl border border-primary/20 text-center">
            <h4 className="font-heading font-bold text-sm text-foreground mb-2">
              {language === "vi" ? "Gặp gỡ chuyên gia gia đình" : "Family Therapist Meeting"}
            </h4>
            <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
              Gặp gỡ chuyên gia lâm sàng gia đình để thảo luận riêng tư các lo lắng về hành vi hoặc cảm xúc của con.
            </p>
            <Link
              href="/booking"
              className="bg-primary hover:bg-primary/95 text-white text-center py-2.5 rounded-xl text-xs font-bold block transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === "vi" ? "Yêu cầu tư vấn" : "Request Support"}</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
