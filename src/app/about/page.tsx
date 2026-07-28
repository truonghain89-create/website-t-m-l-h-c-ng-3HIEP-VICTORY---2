"use client";

import React from "react";
import { useAppState } from "@/context/AppContext";
import { Heart, Shield, Award, Users, Compass, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { language } = useAppState();

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      titleVi: "Yêu thương & Thấu cảm",
      titleEn: "Love & Empathy",
      descVi: "Chúng tôi đặt mình vào góc nhìn của người học và gia đình để cảm nhận khó khăn và chia sẻ chân thành nhất.",
      descEn: "We place ourselves in the student's shoes to truly feel and guide them."
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary" />,
      titleVi: "Bảo mật & Tôn trọng",
      titleEn: "Safety & Privacy",
      descVi: "Mọi cuộc nói chuyện được bảo vệ nghiêm ngặt. Sự an tâm của người dùng là nền tảng hoạt động của chúng tôi.",
      descEn: "Every consultation is strictly confidential. Safety is our bedrock."
    },
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      titleVi: "Khoa học & Chuyên nghiệp",
      titleEn: "Clinical Standards",
      descVi: "Đội ngũ chuyên gia đều có chứng chỉ hành nghề, bằng cấp học thuật chuẩn quốc tế và liên tục cập nhật chuyên môn.",
      descEn: "Certified professionals with internationally recognized credentials."
    }
  ];

  return (
    <div className="py-12 md:py-20 flex flex-col gap-20">
      
      {/* Vision Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "VỀ CHÚNG TÔI" : "ABOUT MINDCARE"}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-4 mb-6 leading-tight">
          {language === "vi" ? "Sứ mệnh nâng đỡ tâm hồn trẻ thơ học đường" : "Nurturing Young Minds In Education"}
        </h1>
        <p className="text-base text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Được thành lập bởi đội ngũ Chuyên gia Tâm lý Lâm sàng và các Nhà quản lý Giáo dục đầy tâm huyết, MindCare là giải pháp số hóa tiên phong hỗ trợ sức khỏe tinh thần trực tuyến kết hợp trực tiếp dành riêng cho hệ thống trường học tại Việt Nam."
            : "Founded by Clinical Psychologists and Educational Leaders, MindCare is a pioneering hybrid digital platform supporting school mental health throughout Vietnam."}
        </p>
      </section>

      {/* Philosophy and Core Values */}
      <section className="bg-background-secondary py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-foreground">
              {language === "vi" ? "Giá trị cốt lõi của chúng tôi" : "Our Core Values"}
            </h2>
            <p className="text-sm text-foreground-secondary mt-3">
              {language === "vi" ? "Định hướng cho từng hành động chăm sóc tinh thần." : "Guiding principles for every support step."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-card border border-border shadow-premium hover:border-primary/40 transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-background-secondary flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {language === "vi" ? v.titleVi : v.titleEn}
                </h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {language === "vi" ? v.descVi : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History and Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">{language === "vi" ? "CÂU CHUYỆN SÁNG LẬP" : "OUR ORIGIN STORY"}</span>
          <h2 className="text-3xl font-extrabold text-foreground mt-3 mb-6">
            {language === "vi" ? "Hành trình khởi nguồn từ lớp học" : "It started in the classroom"}
          </h2>
          <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
            {language === "vi"
              ? "Chúng tôi nhận thấy học sinh ngày nay đối mặt với quá nhiều áp lực: thi cử, kỳ vọng gia đình, bạo lực mạng và sự cô độc. Tuy nhiên, các phòng tâm lý học đường truyền thống thường quá tải hoặc chưa tạo được sự an tâm tối đa để các con cởi mở chia sẻ."
              : "We realized students face immense stress: high expectations, cyberbullying, and loneliness. Traditional rooms are underfunded or lack privacy. We wanted a digital bridge to make support accessible."}
          </p>
          <p className="text-sm text-foreground-secondary leading-relaxed">
            {language === "vi"
              ? "Từ đó, MindCare ra đời với sự kết hợp giữa giải pháp sàng lọc trắc nghiệm trực tuyến bảo mật và mạng lưới đặt lịch tư vấn linh hoạt. Các con được lắng nghe, phụ huynh được thấu hiểu, và nhà trường có giải pháp quản trị khoa học."
              : "MindCare was born, combining secure screening tests, automated matching, and flexible appointment channels."}
          </p>
        </div>

        <div className="lg:col-span-6 bg-background-section border border-border p-8 rounded-3xl grid grid-cols-2 gap-8 shadow-sm">
          <div>
            <span className="block font-heading font-extrabold text-4xl text-primary">2023</span>
            <span className="block text-xs text-foreground font-bold mt-1">{language === "vi" ? "Năm thành lập dự án" : "Project Founded"}</span>
            <span className="block text-[11px] text-foreground-secondary mt-1">Khởi nguồn từ cuộc thi Đổi mới Giáo dục quốc gia.</span>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-4xl text-secondary">30+</span>
            <span className="block text-xs text-foreground font-bold mt-1">{language === "vi" ? "Trường học tin dùng" : "School Partners"}</span>
            <span className="block text-[11px] text-foreground-secondary mt-1">Được tích hợp vào chương trình tham vấn chính thức.</span>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-4xl text-primary">120+</span>
            <span className="block text-xs text-foreground font-bold mt-1">{language === "vi" ? "Chuyên đề Workshop" : "Workshops Held"}</span>
            <span className="block text-[11px] text-foreground-secondary mt-1">Phổ biến kỹ năng cảm xúc và chánh niệm.</span>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-4xl text-accent">98%</span>
            <span className="block text-xs text-foreground font-bold mt-1">{language === "vi" ? "Phản hồi tích cực" : "Satisfaction Rate"}</span>
            <span className="block text-[11px] text-foreground-secondary mt-1">Giúp kết nối khoảng cách cha mẹ và con cái.</span>
          </div>
        </div>
      </section>

      {/* Certification Trust */}
      <section className="bg-background-alt py-16 border-y border-border transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">{language === "vi" ? "TIÊU CHUẨN CHUYÊN MÔN" : "CERTIFICATION & STANDARDS"}</span>
          <h3 className="font-heading font-bold text-xl text-foreground mt-3 mb-4">
            {language === "vi" ? "Cố vấn chuyên môn bởi Hội đồng Tâm lý học Giáo dục Việt Nam" : "Advised by the National Educational Psychology Board"}
          </h3>
          <p className="text-xs text-foreground-secondary leading-relaxed max-w-2xl mx-auto">
            {language === "vi"
              ? "Tất cả các bài kiểm tra, cẩm nang tài liệu và phương pháp tham vấn trên MindCare đều trải qua hội đồng bình duyệt và phê duyệt chuyên môn chặt chẽ bởi PGS.TS. Nguyễn Văn Hùng và Hội đồng nghiên cứu Khoa học Hành vi vị thành niên."
              : "All screening tools, manuals, and support processes on MindCare are vetted and approved by leading Clinical Psychology Professors and behavioral research units."}
          </p>
        </div>
      </section>

    </div>
  );
}
