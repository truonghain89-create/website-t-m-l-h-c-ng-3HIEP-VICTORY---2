"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState, Appointment } from "@/context/AppContext";
import { Calendar, Clock, Video, User, ChevronRight, XCircle, ArrowLeft, Heart, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentsPage() {
  const { language, appointments, cancelAppointment } = useAppState();
  const [activeCallApt, setActiveCallApt] = useState<Appointment | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  // Group appointments
  const upcoming = appointments.filter(apt => apt.status === "upcoming");
  const completed = appointments.filter(apt => apt.status === "completed" || apt.status === "cancelled");

  const handleJoinCall = (apt: Appointment) => {
    setActiveCallApt(apt);
  };

  const handleEndCall = () => {
    setActiveCallApt(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      <AnimatePresence>
        {activeCallApt ? (
          /* Active Online Call Mock Simulator */
          <motion.div
            key="call"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[999] bg-slate-950 text-white flex flex-col justify-between p-6"
          >
            {/* Call Header */}
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-white flex items-center justify-center text-xl font-bold">
                  {activeCallApt.specialistAvatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{activeCallApt.specialistName}</h3>
                  <span className="text-[10px] text-white/60 block mt-0.5">{language === "vi" ? "Đang kết nối tham vấn bảo mật" : "Secure counseling session"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400">REC ON</span>
              </div>
            </div>

            {/* Video Streams Mock Layout */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center justify-center">
              
              {/* Specialist stream */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
                <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-lg text-xs font-semibold">
                  {activeCallApt.specialistName}
                </div>
                <div className="text-center space-y-3">
                  <span className="text-7xl block animate-bounce">👩‍⚕️</span>
                  <span className="text-xs text-white/50 block font-medium">Chuyên gia đang lắng nghe bạn...</span>
                </div>
              </div>

              {/* Student/User stream */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
                <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-lg text-xs font-semibold">
                  Bạn (Học sinh)
                </div>
                {videoOff ? (
                  <div className="text-center space-y-2">
                    <VideoOff className="w-10 h-10 text-white/30 mx-auto" />
                    <span className="text-xs text-white/40 block">Camera đã tắt</span>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <span className="text-7xl block">👦</span>
                    <span className="text-xs text-white/50 block font-medium">Đang phát camera của bạn</span>
                  </div>
                )}
              </div>

            </div>

            {/* Call Controls footer */}
            <div className="flex justify-center items-center gap-4 bg-white/5 p-4 rounded-3xl max-w-md mx-auto w-full backdrop-blur">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-4 rounded-full transition-colors ${
                  micMuted ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOff(!videoOff)}
                className={`p-4 rounded-full transition-colors ${
                  videoOff ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                aria-label={videoOff ? "Turn on camera" : "Turn off camera"}
              >
                {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="p-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors"
                aria-label="End call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Scheduler Panel */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "LỊCH HẸN TƯ VẤN" : "SCHEDULE TRACKING"}
        </span>
        <h1 className="text-3xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Quản lý lịch hẹn tham vấn của bạn" : "Manage your counseling sessions"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Theo dõi các cuộc hẹn sắp diễn ra, nhận liên kết phòng họp trực tuyến và kiểm tra lịch sử tư vấn của bạn."
            : "Monitor active appointments, retrieve video meet links, or consult your session logs."}
        </p>
      </section>

      {/* Upcoming Sessions */}
      <section className="space-y-4">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          {language === "vi" ? "Lịch hẹn sắp tới" : "Upcoming Sessions"}
        </h3>
        
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((apt) => (
              <div 
                key={apt.id}
                className="bg-card border border-border p-6 rounded-3xl shadow-premium flex flex-col justify-between hover:border-primary/30 transition-colors"
              >
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-2xl flex items-center justify-center">
                      {apt.specialistAvatar}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-foreground">{apt.specialistName}</span>
                      <span className="block text-[10px] text-foreground-secondary">{apt.specialistRole}</span>
                    </div>
                  </div>

                  <div className="space-y-2 py-4 border-t border-divider text-xs">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{language === "vi" ? "Ngày:" : "Date:"} {apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{language === "vi" ? "Khung giờ:" : "Time:"} {apt.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Video className="w-4 h-4 text-secondary" />
                      <span className="capitalize">{language === "vi" ? "Hình thức:" : "Format:"} {apt.format}</span>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="p-3 bg-background-secondary border border-border rounded-xl mb-6">
                      <p className="text-[11px] text-foreground-secondary leading-relaxed italic">
                        &quot;{apt.notes}&quot;
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 border-t border-divider pt-4 mt-auto">
                  {apt.format === "online" ? (
                    <button
                      onClick={() => handleJoinCall(apt)}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      {language === "vi" ? "Vào phòng trực tuyến" : "Join Online Room"}
                    </button>
                  ) : (
                    <div className="flex-1 bg-secondary/10 text-secondary text-center py-2 rounded-xl text-xs font-bold">
                      {language === "vi" ? "Gặp tại phòng tâm lý" : "Meet in office"}
                    </div>
                  )}

                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="p-2 text-foreground-secondary hover:text-highlight hover:bg-highlight/10 rounded-xl transition-colors"
                    title={language === "vi" ? "Hủy lịch hẹn" : "Cancel Appointment"}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl block mb-4">📅</span>
            <h4 className="font-heading font-bold text-sm text-foreground">
              {language === "vi" ? "Bạn không có lịch hẹn nào sắp tới" : "No upcoming appointments"}
            </h4>
            <p className="text-xs text-foreground-secondary mt-1 mb-4">
              {language === "vi" ? "Hãy tạo kết nối cùng chuyên gia tâm lý học đường." : "Find a suitable counselor and schedule a time."}
            </p>
            <Link
              href="/booking"
              className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1.5"
            >
              <span>{language === "vi" ? "Đăng ký tư vấn ngay" : "Book Consultant"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Completed & Cancelled History */}
      <section className="space-y-4">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          {language === "vi" ? "Lịch sử tham vấn" : "Consultation History"}
        </h3>
        
        {completed.length > 0 ? (
          <div className="space-y-3">
            {completed.map((apt) => (
              <div 
                key={apt.id}
                className="bg-card border border-border p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex gap-3 items-center">
                  <span className="text-2xl">{apt.specialistAvatar}</span>
                  <div>
                    <span className="block text-xs font-bold text-foreground">{apt.specialistName}</span>
                    <span className="block text-[10px] text-foreground-secondary">{apt.specialistRole}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-medium text-foreground-secondary">
                  <span>{apt.date}</span>
                  <span>{apt.timeSlot}</span>
                  <span className="uppercase">{apt.format}</span>
                </div>

                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    apt.status === "completed" ? "bg-secondary/15 text-secondary" : "bg-highlight/15 text-highlight"
                  }`}>
                    {apt.status === "completed" ? (language === "vi" ? "Đã hoàn thành" : "Completed") : (language === "vi" ? "Đã hủy" : "Cancelled")}
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-foreground-secondary italic text-center py-6">{language === "vi" ? "Chưa ghi nhận lịch sử tham vấn cũ." : "No historical appointments found."}</p>
        )}
      </section>

    </div>
  );
}
