"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppState, Specialist } from "@/context/AppContext";
import { Calendar as CalendarIcon, Clock, Video, Home, ChevronRight, UserCheck } from "lucide-react";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, specialists, bookAppointment, role, addToast } = useAppState();

  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [format, setFormat] = useState<"online" | "offline">("online");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    "08:30 - 09:30",
    "10:00 - 11:00",
    "14:00 - 15:00",
    "15:30 - 16:30",
  ];

  // Pick today's date and next 5 days for easy selection
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // format YYYY-MM-DD
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      
      const label = date.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "numeric"
      });
      
      dates.push({ value: `${yyyy}-${mm}-${dd}`, label });
    }
    return dates;
  };

  const datesList = getDates();

  // Handle pre-filled specialist from searchParams
  useEffect(() => {
    const spId = searchParams.get("specialistId");
    if (spId) {
      const found = specialists.find(sp => sp.id === Number(spId));
      if (found) {
        setSelectedSpecialist(found);
      }
    } else if (specialists.length > 0) {
      // Default to first specialist
      setSelectedSpecialist(specialists[0]);
    }
  }, [searchParams, specialists]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpecialist || !selectedDate || !selectedSlot) {
      addToast(
        language === "vi" ? "Vui lòng điền đầy đủ thông tin ngày và giờ hẹn." : "Please fill in date and time slot.",
        "error"
      );
      return;
    }

    bookAppointment({
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      specialistAvatar: selectedSpecialist.avatar,
      specialistRole: selectedSpecialist.role,
      date: selectedDate,
      timeSlot: selectedSlot,
      format,
      notes,
    });

    // If role is guest, redirect to /appointments or /dashboard/student anyway for demo
    if (role === "guest") {
      router.push("/appointments");
    } else {
      router.push(`/dashboard/${role}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "ĐẶT LỊCH TRỰC TUYẾN" : "BOOK A SESSION"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Đồng hành tâm lý học đường cùng chuyên gia" : "Schedule a private consultation"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Chọn chuyên gia phù hợp, thời gian rảnh rỗi và đặt lịch hẹn tư vấn chỉ trong 3 bước đơn giản."
            : "Select a therapist, pick a date on their calendar, and secure your consultation session."}
        </p>
      </section>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Select details */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-card border border-border p-6 md:p-8 rounded-[2rem] shadow-premium">
          
          {/* Step 1: Specialist Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground block">
              {language === "vi" ? "1. Chọn Chuyên gia tham vấn:" : "1. Select Consultant:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialists.map((sp) => {
                const isSelected = selectedSpecialist?.id === sp.id;
                return (
                  <div
                    key={sp.id}
                    onClick={() => setSelectedSpecialist(sp)}
                    className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary shadow-sm" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-border shrink-0 bg-background-secondary shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={sp.avatar} 
                        alt={sp.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-foreground text-xs leading-snug">{sp.name}</span>
                      <span className="block text-[10px] text-foreground-secondary leading-tight mt-0.5">{sp.experience}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground block flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <span>{language === "vi" ? "2. Chọn Ngày hẹn:" : "2. Select Date:"}</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {datesList.map((dt) => {
                const isSelected = selectedDate === dt.value;
                return (
                  <div
                    key={dt.value}
                    onClick={() => {
                      setSelectedDate(dt.value);
                      setSelectedSlot(""); // Reset slot when date changes
                    }}
                    className={`py-3 px-2 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <span className="text-[11px] font-bold block leading-snug">{dt.label.split(" ")[0]}</span>
                    <span className="text-xs font-extrabold block mt-0.5 leading-none">{dt.label.split(" ")[1]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Time Slot Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground block flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{language === "vi" ? "3. Chọn Giờ hẹn:" : "3. Select Time Slot:"}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <div
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <span>{slot}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Consultation Format */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground block">
              {language === "vi" ? "4. Hình thức tham vấn:" : "4. Consulting Format:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setFormat("online")}
                className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                  format === "online" 
                    ? "border-primary bg-primary/5 text-primary shadow-sm" 
                    : "border-border text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                <Video className="w-5 h-5 text-primary" />
                <div>
                  <span className="block font-bold text-foreground text-xs leading-snug">Online (Video Call)</span>
                  <span className="block text-[10px] text-foreground-secondary leading-tight mt-0.5">Tiện lợi, an toàn, hỗ trợ Google Meet</span>
                </div>
              </div>

              <div
                onClick={() => setFormat("offline")}
                className={`p-4 rounded-2xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                  format === "offline" 
                    ? "border-primary bg-primary/5 text-primary shadow-sm" 
                    : "border-border text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                <Home className="w-5 h-5 text-secondary" />
                <div>
                  <span className="block font-bold text-foreground text-xs leading-snug">Offline (Trực tiếp)</span>
                  <span className="block text-[10px] text-foreground-secondary leading-tight mt-0.5">Tại phòng tham vấn ấm cúng của trường</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Description Notes */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground block">
              {language === "vi" ? "5. Mô tả ngắn các khó khăn/lo lắng của bạn (Ẩn danh):" : "5. Short description of concerns (Confidential):"}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === "vi" ? "VD: Em cảm thấy kiệt sức ôn thi, mất tập trung..." : "e.g., I feel exhausted preparing for exams..."}
              className="w-full bg-background-secondary border border-border p-4 text-xs rounded-2xl focus:outline-none focus:border-primary text-foreground"
            />
          </div>

        </div>

        {/* Right Confirmation Box */}
        <div className="lg:col-span-4 bg-card border border-border p-6 rounded-[2rem] shadow-premium sticky top-[90px] flex flex-col gap-6">
          
          <h3 className="font-heading font-bold text-base text-foreground pb-4 border-b border-divider">
            {language === "vi" ? "Tóm tắt lịch hẹn" : "Appointment Summary"}
          </h3>

          {/* Selected Specialist details */}
          {selectedSpecialist ? (
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/15 shrink-0 bg-background-secondary shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedSpecialist.avatar} 
                  alt={selectedSpecialist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block text-xs font-bold text-foreground">{selectedSpecialist.name}</span>
                <span className="block text-[10px] text-foreground-secondary">{selectedSpecialist.role}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-foreground-secondary italic">{language === "vi" ? "Chưa chọn chuyên gia" : "No specialist selected"}</p>
          )}

          {/* Selected schedule */}
          <div className="space-y-3 py-4 border-y border-divider">
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground-secondary font-medium">{language === "vi" ? "Ngày hẹn:" : "Date:"}</span>
              <span className="text-foreground font-bold">{selectedDate || (language === "vi" ? "Chưa chọn" : "Not selected")}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground-secondary font-medium">{language === "vi" ? "Khung giờ:" : "Time:"}</span>
              <span className="text-foreground font-bold">{selectedSlot || (language === "vi" ? "Chưa chọn" : "Not selected")}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-foreground-secondary font-medium">{language === "vi" ? "Hình thức:" : "Format:"}</span>
              <span className="text-foreground font-bold uppercase">{format}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground-secondary font-medium">{language === "vi" ? "Phí tham vấn đóng góp:" : "Contribution Fee:"}</span>
            <span className="text-sm font-extrabold text-foreground">{selectedSpecialist?.price || "0đ"}</span>
          </div>

          <button
            type="submit"
            disabled={!selectedSpecialist || !selectedDate || !selectedSlot}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-3.5 rounded-xl text-xs font-bold shadow-premium transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <UserCheck className="w-4 h-4" />
            <span>{language === "vi" ? "Xác nhận & Đăng ký" : "Confirm Booking"}</span>
          </button>

          <p className="text-[10px] text-foreground-secondary text-center leading-relaxed">
            {language === "vi"
              ? "Bằng cách xác nhận, bạn đồng ý với chính sách bảo mật tham vấn học đường của MindCare."
              : "By confirming, you agree to MindCare's student consultation privacy policies."}
          </p>

        </div>

      </form>

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-foreground-secondary">Đang tải...</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
