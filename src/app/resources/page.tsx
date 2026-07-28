"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { Search, Download, Play, BookOpen, FileText, CheckSquare, MessageCircle, AlertCircle } from "lucide-react";

export default function ResourcesPage() {
  const { language, addToast } = useAppState();
  const [activeTab, setActiveTab] = useState<"all" | "ebook" | "podcast" | "checklist" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      titleVi: "Cẩm nang giảm áp lực thi cử 101",
      titleEn: "Exam Stress Survival Manual 101",
      type: "ebook",
      descVi: "Tài liệu hướng dẫn cách phân bổ thời gian ôn thi, nhận diện suy nghĩ tiêu cực và chuẩn bị tâm lý tự tin nhất.",
      descEn: "PDF guidelines teaching time allocation, coping thoughts, and test day relaxation.",
      size: "2.4 MB (PDF)",
      icon: "📘"
    },
    {
      titleVi: "Podcast: Hơi thở Chánh niệm giảm stress nhanh",
      titleEn: "Podcast: 5-minute Box Breathing Guide",
      type: "podcast",
      descVi: "Hướng dẫn thực hành thở hộp để làm chậm nhịp tim, xoa dịu lo lắng và căng thẳng thần kinh lập tức.",
      descEn: "15-minute guided audio tutorial calming heartbeat and panic attacks.",
      size: "12.8 MB (MP3)",
      icon: "🎧"
    },
    {
      titleVi: "Bảng theo dõi cảm xúc & giấc ngủ hàng ngày",
      titleEn: "Daily Mood & Sleep Tracker Log",
      type: "checklist",
      descVi: "Checklist in ấn giúp học sinh theo dõi diễn biến tâm trạng, giờ ngủ và thói quen thể thao trong tuần.",
      descEn: "Printable PDF worksheet logging emotions, bedtime hours, and workouts.",
      size: "1.1 MB (PDF)",
      icon: "📋"
    },
    {
      titleVi: "Video: Các bài tập yoga giãn cơ tại bàn học",
      titleEn: "Video: Desk Yoga & Stretches for Students",
      type: "video",
      descVi: "Video hướng dẫn các động tác vận động nhẹ giúp giảm mỏi cổ, vai gáy sau hàng giờ ôn tập.",
      descEn: "10-minute visual guide releasing neck, shoulder, and back tension.",
      size: "8 phút xem",
      icon: "🎬"
    },
    {
      titleVi: "Ebook: Làm bạn cùng con thế hệ Gen Z",
      titleEn: "Ebook: Parenting Teenagers in Digital Age",
      type: "ebook",
      descVi: "Sách tham khảo dành cho phụ huynh nhằm thấu hiểu ngôn ngữ, ranh giới thiết bị số và tháo gỡ xung đột với con.",
      descEn: "Comprehensive handbook helping parents set device limits and communicate.",
      size: "3.8 MB (PDF)",
      icon: "📖"
    },
    {
      titleVi: "Podcast: Vượt qua áp lực đồng trang lứa",
      titleEn: "Podcast: Coping with Peer Pressure",
      type: "podcast",
      descVi: "Cuộc trò chuyện của chuyên gia giúp học sinh nhận diện và vượt qua các so sánh xã hội từ bạn bè xung quanh.",
      descEn: "20-minute discussion teaching students to build self-respect and boundaries.",
      size: "18.2 MB (MP3)",
      icon: "🎙️"
    }
  ];

  const handleDownload = (title: string) => {
    addToast(
      language === "vi" 
        ? `Bắt đầu tải xuống tài nguyên: ${title}` 
        : `Downloading resource: ${title}`,
      "success"
    );
  };

  const filteredResources = resources.filter(res => {
    const matchesTab = activeTab === "all" || res.type === activeTab;
    const matchesSearch = res.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "THƯ VIỆN TÀI NGUYÊN" : "WELLNESS ASSETS"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Tài liệu & Cẩm nang tự chữa lành" : "Empathetic Library of Resources"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Tải về miễn phí cẩm nang hướng dẫn ứng phó Stress, cẩm nang chánh niệm và các biểu mẫu giúp bạn duy trì trạng thái tinh thần tốt nhất."
            : "Free access to print sheets, guides, and ebooks prepared by our school psychologists."}
        </p>
      </section>

      {/* Search and Filters Bar */}
      <section className="bg-card border border-border p-6 rounded-3xl shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === "vi" ? "Tìm kiếm tài liệu..." : "Search resources..."}
            className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {[
            { value: "all", labelVi: "Tất cả tài liệu", labelEn: "All assets" },
            { value: "ebook", labelVi: "Ebooks / Sách", labelEn: "Ebooks" },
            { value: "podcast", labelVi: "Podcasts / Audio", labelEn: "Podcasts" },
            { value: "checklist", labelVi: "Checklists / Form", labelEn: "Checklists" },
            { value: "video", labelVi: "Videos giảng dạy", labelEn: "Videos" }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeTab === tab.value
                  ? "bg-primary border-primary text-white"
                  : "bg-background-secondary border-border text-foreground-secondary hover:text-foreground hover:bg-border/30"
              }`}
            >
              {language === "vi" ? tab.labelVi : tab.labelEn}
            </button>
          ))}
        </div>

      </section>

      {/* Resources grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((res, idx) => (
            <div 
              key={idx}
              className="bg-card border border-border p-6 rounded-3xl shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-2xl mb-4 shrink-0">
                  {res.icon}
                </div>

                <div className="flex justify-between items-center mb-3 text-[10px] text-foreground-secondary font-bold uppercase tracking-wider subheading">
                  <span className="text-secondary">{res.type}</span>
                  <span>{res.size}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-foreground leading-snug mb-2">
                  {language === "vi" ? res.titleVi : res.titleEn}
                </h3>

                <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                  {language === "vi" ? res.descVi : res.descEn}
                </p>
              </div>

              <div className="border-t border-divider pt-4 mt-auto">
                <button
                  onClick={() => handleDownload(language === "vi" ? res.titleVi : res.titleEn)}
                  className="w-full bg-primary/5 hover:bg-primary/10 text-primary text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === "vi" ? "Tải xuống tài nguyên" : "Download File"}</span>
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl block mb-4">📂</span>
            <h3 className="font-heading font-bold text-base text-foreground">
              {language === "vi" ? "Không tìm thấy tài liệu phù hợp" : "No matching resources found"}
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              {language === "vi" ? "Vui lòng đổi từ khóa hoặc chủ đề tìm kiếm." : "Try changing search terms or filters."}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
