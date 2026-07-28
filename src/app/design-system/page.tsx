"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { 
  Heart, Sparkles, PhoneCall, Calendar, Play, CheckCircle2, Star, 
  HelpCircle, ChevronRight, Download, Send, Globe, Bell
} from "lucide-react";

export default function DesignSystemPage() {
  const { language, addToast } = useAppState();
  const [inputText, setInputText] = useState("");
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [radioVal, setRadioVal] = useState("option1");
  const [modalOpen, setModalOpen] = useState(false);

  const colors = [
    { name: "Primary Calm Blue", hex: "#4A90E2", rgb: "rgb(var(--primary))", bgClass: "bg-primary text-white" },
    { name: "Secondary Mint Green", hex: "#59C9A5", rgb: "rgb(var(--secondary))", bgClass: "bg-secondary text-white" },
    { name: "Accent Warm Yellow", hex: "#FFD166", rgb: "rgb(var(--accent))", bgClass: "bg-accent text-slate-900" },
    { name: "Highlight Soft Coral", hex: "#FF8A80", rgb: "rgb(var(--highlight))", bgClass: "bg-highlight text-white" },
    { name: "Text Base", hex: "#1F2937", rgb: "rgb(var(--foreground))", bgClass: "bg-foreground text-background" },
    { name: "Secondary Text", hex: "#6B7280", rgb: "rgb(var(--foreground-secondary))", bgClass: "bg-foreground-secondary text-background" },
    { name: "Border color", hex: "#E5EDF3", rgb: "rgb(var(--border))", bgClass: "bg-border text-foreground" },
    { name: "Divider color", hex: "#EEF3F6", rgb: "rgb(var(--divider))", bgClass: "bg-divider text-foreground" }
  ];

  const triggerMockToast = () => {
    addToast(
      language === "vi" ? "Thông báo hệ thống thành công!" : "System toast notification triggered!",
      "success"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-16">
      
      {/* Page Header */}
      <section className="border-b border-divider pb-6">
        <span className="text-xs font-bold text-primary tracking-wider uppercase block mb-1 subheading">
          {language === "vi" ? "THƯ VIỆN THÀNH PHẦN" : "DESIGN SYSTEM LIBRARY"}
        </span>
        <h1 className="text-3xl font-extrabold text-foreground">
          MindCare UI Component System
        </h1>
        <p className="text-xs text-foreground-secondary mt-1 max-w-xl">
          Hệ thống Design System tinh gọn được thiết kế theo tỷ lệ 40% Healthcare UI, 25% Minimalism, 15% Scandinavian, 10% Glassmorphism, 10% Educational Platform.
        </p>
      </section>

      {/* 1. COLOR SWATCHES */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          1. Color Palette Swatches
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colors.map((c, idx) => (
            <div key={idx} className="border border-border rounded-2xl overflow-hidden shadow-sm bg-card">
              <div className={`h-24 ${c.bgClass} flex items-center justify-center font-bold text-sm`}>
                {c.hex}
              </div>
              <div className="p-4 text-xs font-semibold">
                <span className="block text-foreground">{c.name}</span>
                <span className="block text-foreground-secondary text-[10px] mt-1">{c.rgb}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TYPOGRAPHY */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          2. Typography Hierarchy
        </h3>
        <div className="space-y-6 bg-card border border-border p-6 rounded-3xl shadow-sm">
          <div>
            <span className="text-[10px] text-foreground-secondary font-bold block mb-1">Display H1 (Poppins)</span>
            <span className="text-3xl sm:text-5xl font-extrabold text-foreground">Sức khỏe Tinh thần Học đường</span>
          </div>
          <div>
            <span className="text-[10px] text-foreground-secondary font-bold block mb-1">Subheading H3 (Manrope)</span>
            <span className="text-lg font-bold text-primary subheading">Lắng nghe – Thấu hiểu – Đồng hành cùng học sinh</span>
          </div>
          <div>
            <span className="text-[10px] text-foreground-secondary font-bold block mb-1">Body Text (Inter)</span>
            <p className="text-xs text-foreground-secondary leading-relaxed max-w-[65ch]">
              Dành ra 3 phút thực hiện bài tự đánh giá sàng lọc tâm lý dựa trên thang đo chuẩn mực (PSS & GAD-7) của Hiệp hội Tâm lý học. Kết quả phân tích sẽ đi kèm với các bài tập chánh niệm tự rèn luyện và gợi ý hỗ trợ từ chuyên gia.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUTTON VARIATIONS */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          3. Button Variants
        </h3>
        <div className="flex flex-wrap gap-4 bg-card border border-border p-6 rounded-3xl shadow-sm">
          <button className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors">
            Primary Button
          </button>
          
          <button className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-premium transition-all hover:shadow-lg">
            Gradient Action
          </button>

          <button className="bg-secondary hover:bg-secondary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors">
            Secondary Mint
          </button>

          <button className="bg-background-secondary border border-border hover:bg-border text-foreground px-5 py-2.5 rounded-xl text-xs font-bold transition-colors">
            Secondary Outline
          </button>

          <button className="bg-highlight hover:bg-highlight/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors">
            Highlight Red
          </button>

          <button disabled className="bg-border text-foreground-secondary/40 px-5 py-2.5 rounded-xl text-xs font-bold cursor-not-allowed">
            Disabled State
          </button>
        </div>
      </section>

      {/* 4. FORM CONTROLLERS */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          4. Form Inputs & Selects
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-border p-6 rounded-3xl shadow-sm">
          
          {/* TextInput */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Standard Text Input</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tên trường học..."
              className="w-full bg-background-secondary border border-border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
            />
          </div>

          {/* Selection Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground">Selection Dropdown</label>
            <select className="w-full bg-background-secondary border border-border px-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground">
              <option>Lựa chọn 1: Học sinh</option>
              <option>Lựa chọn 2: Phụ huynh</option>
              <option>Lựa chọn 3: Giáo viên</option>
            </select>
          </div>

          {/* Checkboxes and Radios */}
          <div className="flex gap-8 items-center pt-4">
            
            {/* Checkbox */}
            <div 
              onClick={() => setCheckboxVal(!checkboxVal)}
              className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-foreground-secondary select-none"
            >
              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                checkboxVal ? "border-primary bg-primary/10 text-primary" : "border-border"
              }`}>
                {checkboxVal && <CheckCircle2 className="w-4 h-4 fill-primary text-white" />}
              </div>
              <span>Checkbox Control</span>
            </div>

            {/* Radios */}
            <div className="flex items-center gap-4 text-xs font-semibold text-foreground-secondary select-none">
              <div 
                onClick={() => setRadioVal("option1")}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  radioVal === "option1" ? "border-primary" : "border-border"
                }`}>
                  {radioVal === "option1" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span>Radio A</span>
              </div>

              <div 
                onClick={() => setRadioVal("option2")}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  radioVal === "option2" ? "border-primary" : "border-border"
                }`}>
                  {radioVal === "option2" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <span>Radio B</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DYNAMIC INTERACTIVE MODULES */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-divider">
          5. Toast & Modal Overlays Simulation
        </h3>
        
        <div className="flex gap-4 bg-card border border-border p-6 rounded-3xl shadow-sm">
          <button
            onClick={triggerMockToast}
            className="bg-secondary hover:bg-secondary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Bell className="w-4 h-4" />
            <span>Simulate Success Toast Alert</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Simulate Empathetic Modal Overlay</span>
          </button>
        </div>

        {/* Modal Overlay */}
        {modalOpen && (
          <div className="fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-premium relative animate-fade-up">
              <span className="text-3xl block mb-4">🏆</span>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">Đăng ký tham vấn thành công!</h3>
              <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                Hệ thống đã ghi nhận lịch hẹn tư vấn học đường của bạn. Cán bộ tham vấn phòng tâm lý sẽ duyệt và gửi email phản hồi liên kết trong vòng 2 tiếng.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm"
                >
                  Xác nhận & Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
