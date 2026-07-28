"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { Bell, Heart, BookOpen, Calendar, Mail, Check, Trash } from "lucide-react";

export default function NotificationsPage() {
  const { language } = useAppState();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "calendar",
      titleVi: "Lịch hẹn tham vấn đã xác nhận",
      titleEn: "Counseling appointment confirmed",
      textVi: "Lịch hẹn tư vấn 1-1 trực tuyến cùng TS. Nguyễn Thị Mai vào lúc 09:00 ngày 05/08 đã được hệ thống phê duyệt.",
      textEn: "Your online session with Dr. Nguyen Thi Mai on Aug 5th at 09:00 has been confirmed.",
      date: "2 giờ trước",
      read: false
    },
    {
      id: 2,
      type: "course",
      titleVi: "Chứng nhận khóa học sẵn sàng",
      titleEn: "Course certificate unlocked",
      textVi: "Chúc mừng em đã vượt qua bài kiểm tra cuối khóa học 'Chế ngự căng thẳng thi cử'. Hãy tải chứng nhận trong tài khoản.",
      textEn: "Congratulations on passing the 'Overcoming Exam Stress' quiz. You can download the PDF certificate.",
      date: "1 ngày trước",
      read: true
    },
    {
      id: 3,
      type: "article",
      titleVi: "Bài viết mới từ Chuyên gia",
      titleEn: "New blog post published",
      textVi: "ThS. Phạm Minh Anh vừa đăng bài viết mới: 'Vượt qua hội chứng kiệt sức học đường (Academic Burnout)'. Xem ngay!",
      textEn: "Therapist Pham Minh Anh just posted: 'Overcoming Academic Burnout'. Click to read.",
      date: "3 ngày trước",
      read: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkSingleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "calendar": return <Calendar className="w-5 h-5 text-primary" />;
      case "course": return <BookOpen className="w-5 h-5 text-secondary" />;
      default: return <Mail className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Title Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-divider pb-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
            {language === "vi" ? "THÔNG BÁO HỘP THƯ" : "NOTIFICATIONS"}
          </span>
          <h1 className="text-3xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Hộp thư thông báo của bạn" : "Your notifications box"}
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleMarkAllRead}
            disabled={notifications.length === 0 || notifications.every(n => n.read)}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-background-secondary text-xs font-bold text-foreground-secondary hover:text-foreground hover:bg-border/30 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>{language === "vi" ? "Đã đọc tất cả" : "Mark all read"}</span>
          </button>
          <button
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-background-secondary text-xs font-bold text-foreground-secondary hover:text-highlight hover:bg-highlight/10 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5"
          >
            <Trash className="w-4 h-4" />
            <span>{language === "vi" ? "Xóa hết" : "Clear all"}</span>
          </button>
        </div>
      </section>

      {/* Notifications listing */}
      <section className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id}
              onClick={() => handleMarkSingleRead(n.id)}
              className={`p-5 rounded-2xl border transition-all flex gap-4 items-start cursor-pointer ${
                n.read 
                  ? "bg-card border-border shadow-sm opacity-75" 
                  : "bg-primary/5 border-primary/30 shadow-premium"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-background-secondary border border-border flex items-center justify-center shrink-0">
                {getIcon(n.type)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-xs font-extrabold text-foreground leading-snug ${!n.read ? "text-primary" : ""}`}>
                    {language === "vi" ? n.titleVi : n.titleEn}
                  </h3>
                  <span className="text-[10px] text-foreground-secondary whitespace-nowrap ml-2">{n.date}</span>
                </div>

                <p className="text-xs text-foreground-secondary leading-relaxed font-semibold mt-1.5">
                  {language === "vi" ? n.textVi : n.textEn}
                </p>
              </div>
            </div>
          ))
        ) : (
          /* Empty inbox state */
          <div className="text-center py-16 bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl block mb-4">🔔</span>
            <h3 className="font-heading font-bold text-base text-foreground">
              {language === "vi" ? "Hộp thư thông báo trống" : "Notification inbox is empty"}
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              Bạn chưa nhận được cảnh báo mới nào từ MindCare.
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
