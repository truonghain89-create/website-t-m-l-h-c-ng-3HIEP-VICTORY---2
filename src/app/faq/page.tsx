"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppContext";
import { ChevronRight, Search, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { language } = useAppState();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      qVi: "Làm thế nào để đặt lịch hẹn tham vấn trực tuyến?",
      qEn: "How do I book an online counseling session?",
      aVi: "Em chuyển sang mục 'Đặt lịch tư vấn' trên thanh Menu, chọn chuyên gia mong muốn, chọn ngày hẹn, khung giờ và xác nhận hình thức tham vấn Online. Hệ thống sẽ ngay lập tức xếp lịch và tạo phòng họp trực tuyến Google Meet trong lịch hẹn.",
      aEn: "Go to 'Book Session' from the navbar, select a therapist, pick a date and slot, and select 'Online'. System instantly confirms your Google Meet link.",
      category: "Đặt lịch"
    },
    {
      qVi: "Bảo mật thông tin tham vấn được thực hiện như thế nào?",
      qEn: "How is my counseling data protected?",
      aVi: "MindCare cam kết bảo mật 100% nội dung tham vấn. Cán bộ tư vấn tuân thủ quy tắc ứng xử bảo mật của Hiệp hội tâm lý. Thông tin chỉ được tiết lộ trong trường hợp có nguy hại rõ ràng đe dọa đến an toàn tính mạng của học sinh.",
      aEn: "MindCare enforces absolute data privacy guidelines. All logs are encrypted and confidential.",
      category: "Bảo mật"
    },
    {
      qVi: "Phụ huynh có được phép xem kết quả khảo sát tâm lý của học sinh?",
      qEn: "Can parents view their children's assessment scores?",
      aVi: "Kết quả tự đánh giá sàng lọc sơ bộ của học sinh được lưu riêng tư trong tài khoản học sinh. Phụ huynh chỉ có thể đồng kiểm tra nếu có sự đồng thuận và chia sẻ chủ động của con, hoặc trong các buổi tham vấn gia đình chung.",
      aEn: "Assessment data is private. Parents can only view if the student explicitly consents or during combined sessions.",
      category: "Bảo mật"
    },
    {
      qVi: "Tư vấn Offline tại trường diễn ra ở đâu?",
      qEn: "Where does offline counseling take place?",
      aVi: "Văn phòng tâm lý học đường MindCare nằm ở Lầu 2, Nhà B (Phòng tham vấn tâm học đường). Không gian phòng được thiết kế ấm cúng, riêng tư, cách biệt tiếng ồn tạo cảm giác thư giãn nhất.",
      aEn: "Our campus clinic is on Floor 2, Building B. It is designed to be quiet, welcoming, and relaxed.",
      category: "Địa điểm"
    },
    {
      qVi: "Tôi có cần trả bất kỳ khoản phí nào khi tham gia khóa học không?",
      qEn: "Are the courses free?",
      aVi: "Hoàn toàn miễn phí. Tất cả khóa học kỹ năng cảm xúc, trí tuệ EQ, quản lý stress học đường trên thư viện MindCare đều do trường tài trợ 100% nhằm phục vụ và đồng hành cùng học sinh.",
      aEn: "Yes, all modules are fully covered by partner school sponsorships. Zero costs for students.",
      category: "Khóa học"
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    return f.qVi.toLowerCase().includes(search.toLowerCase()) ||
           f.qEn.toLowerCase().includes(search.toLowerCase()) ||
           f.aVi.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "CÂU HỎI THƯỜNG GẶP" : "FAQ DIRECTORY"}
        </span>
        <h1 className="text-3xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Giải đáp các thắc mắc phổ biến" : "Find answer to your questions"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Tìm câu trả lời nhanh về cơ chế bảo mật, đặt lịch hẹn trực tuyến, và tham khảo cách thức tham gia các lớp học kỹ năng."
            : "Quickly lookup privacy protocols, scheduling rules, or how to claim wellness course certifications."}
        </p>
      </section>

      {/* Search Filter */}
      <section className="relative w-full max-w-md mx-auto">
        <Search className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === "vi" ? "Tìm kiếm câu hỏi..." : "Search questions..."}
          className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
        />
      </section>

      {/* Accordions */}
      <section className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-card border border-border rounded-2xl overflow-hidden transition-all shadow-premium"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-heading font-bold text-sm text-foreground hover:bg-background-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span>{language === "vi" ? faq.qVi : faq.qEn}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-foreground-secondary shrink-0 transition-transform ${
                    isOpen ? "rotate-90 text-primary" : ""
                  }`} />
                </button>
                
                <div className={`transition-all duration-300 ${
                  isOpen ? "max-h-[200px] border-t border-divider opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <p className="px-6 py-5 text-xs text-foreground-secondary leading-relaxed font-semibold">
                    {language === "vi" ? faq.aVi : faq.aEn}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-foreground-secondary italic text-center py-6">Không tìm thấy câu hỏi phù hợp.</p>
        )}
      </section>

    </div>
  );
}
