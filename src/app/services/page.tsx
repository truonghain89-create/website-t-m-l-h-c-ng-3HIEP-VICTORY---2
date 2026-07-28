"use client";

import React from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { 
  User, Users, Heart, School, ShieldAlert, Sparkles, PhoneCall, Calendar
} from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { language } = useAppState();

  const services = [
    {
      icon: <User className="w-8 h-8 text-primary" />,
      titleVi: "Tư vấn Cá nhân 1-1",
      titleEn: "Individual 1-1 Counseling",
      audienceVi: "Học sinh, sinh viên gặp áp lực",
      audienceEn: "Students facing academic pressures",
      descVi: "Buổi gặp mặt riêng tư 1-1 cùng chuyên gia tâm lý học đường tại văn phòng tham vấn ấm cúng hoặc gọi video bảo mật. Tháo gỡ các lo âu thi cử, stress học tập, định hướng học tập và giải tỏa bế tắc cảm xúc.",
      descEn: "Private 1-1 clinical sessions with school psychologists resolving exam stress, lack of motivation, and emotional blocks.",
      formatVi: "Online (Video Call) hoặc Offline (Phòng tâm lý trường)",
      formatEn: "Online Video call or Offline Counseling Room",
      durationVi: "50 - 60 phút / buổi",
      durationEn: "50 - 60 mins per session"
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      titleVi: "Tham vấn Phụ huynh",
      titleEn: "Parent Consultation",
      audienceVi: "Cha mẹ muốn đồng hành cùng con",
      audienceEn: "Parents wanting to understand kids",
      descVi: "Buổi chia sẻ chuyên sâu giúp phụ huynh học cách làm bạn cùng con tuổi dậy thì, thấu hiểu Gen Z, thiết lập ranh giới thiết bị số lành mạnh và kéo gần khoảng cách đối thoại giữa các thế hệ.",
      descEn: "Sessions helping parents unlock conversation gaps, understand adolescent brain changes, and set digital rules.",
      formatVi: "Online hoặc Offline",
      formatEn: "Online or Offline",
      durationVi: "60 - 90 phút / buổi",
      durationEn: "60 - 90 mins per session"
    },
    {
      icon: <School className="w-8 h-8 text-accent" />,
      titleVi: "Tham vấn Giáo viên & Ban giám hiệu",
      titleEn: "Educator Support & Training",
      audienceVi: "Giáo viên chủ nhiệm, giám thị, quản lý",
      audienceEn: "School teachers and administrators",
      descVi: "Tham vấn hỗ trợ giáo viên giải tỏa stress công việc, phòng tránh kiệt sức nghề nghiệp (burnout). Đồng thời đào tạo kỹ năng nhận diện sớm học sinh có rủi ro tâm lý và cách phản ứng sơ cứu tâm lý ban đầu.",
      descEn: "Support managing work burnout and training to spot high-risk students and run basic emotional first aid.",
      formatVi: "Offline (Đào tạo tại trường hoặc văn phòng MindCare)",
      formatEn: "Offline on-campus or at MindCare offices",
      durationVi: "Theo chuyên đề hoặc định kỳ",
      durationEn: "Per workshop modules or periodically"
    },
    {
      icon: <Heart className="w-8 h-8 text-indigo-500" />,
      titleVi: "Tham vấn nhóm & Vòng tròn chia sẻ",
      titleEn: "Group Circles & peer support",
      audienceVi: "Nhóm học sinh gặp áp lực chung",
      audienceEn: "Peer groups with shared anxiety",
      descVi: "Xây dựng các câu lạc bộ vòng tròn thấu cảm, thảo luận có định hướng của chuyên gia về các chủ đề chung: cô đơn học đường, áp lực đồng trang lứa (peer pressure), hay định hình hình ảnh cơ thể (body image).",
      descEn: "Therapist-guided empathetic dialogue circles resolving peer pressure, loneliness, and body image issues.",
      formatVi: "Offline tại không gian sinh hoạt trường",
      formatEn: "Offline school activity spaces",
      durationVi: "90 phút / buổi",
      durationEn: "90 mins per session"
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-highlight" />,
      titleVi: "Can thiệp khủng hoảng khẩn cấp",
      titleEn: "Crisis Emergency Response",
      audienceVi: "Học sinh gặp chấn thương tâm lý, có ý định tự hại",
      audienceEn: "Students facing trauma or self-harm risks",
      descVi: "Quy trình phản ứng nhanh hỗ trợ ứng cứu tâm lý khẩn cấp cho các trường hợp học sinh bị bạo lực học đường, xâm hại, mất mát người thân đột ngột hoặc có biểu hiện tự hủy hoại bản thân nghiêm trọng.",
      descEn: "Rapid mental first-aid responding to school bullying, sudden loss of family, or self-harm thoughts.",
      formatVi: "Hotline khẩn cấp & Can thiệp trực tiếp tại trường",
      formatEn: "Emergency hotline and immediate on-campus crisis visit",
      durationVi: "Hỗ trợ 24/7 tức thì",
      durationEn: "Immediate support 24/7"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      titleVi: "Workshop & Chuyên đề Trường học",
      titleEn: "Educational Workshops & camps",
      audienceVi: "Toàn bộ học sinh và giáo viên nhà trường",
      audienceEn: "Entire campus student body & staff",
      descVi: "Tổ chức các buổi sinh hoạt ngoại khóa chuyên đề: Kỹ năng quản lý cảm xúc, Chánh niệm trong thi cử, Giao tiếp không bạo lực, Vẽ tranh trị liệu cảm xúc kết hợp xây dựng văn hóa trường học thân thiện.",
      descEn: "On-campus workshops presenting emotional regulation, mindfulness, non-violent communication, or art therapy.",
      formatVi: "Offline (Hội trường trường học)",
      formatEn: "Offline (School assembly hall)",
      durationVi: "120 phút / buổi",
      durationEn: "120 mins per session"
    }
  ];

  return (
    <div className="py-12 md:py-20 flex flex-col gap-24">
      
      {/* Services Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "DỊCH VỤ CỦA CHÚNG TÔI" : "SERVICES PORTFOLIO"}
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-4 mb-6 leading-tight">
          {language === "vi" ? "Các giải pháp đồng hành sức khỏe tinh thần" : "Mental Wellness Solutions for Everyone"}
        </h1>
        <p className="text-base text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "MindCare cung cấp hệ sinh thái dịch vụ đa dạng, được xây dựng bài bản trên nền tảng khoa học tâm lý giáo dục hiện đại. Chúng tôi tin tưởng vào sức mạnh của việc can thiệp sớm và đồng hành chân thành."
            : "MindCare delivers a comprehensive suite of services built on modern educational psychology. We champion early detection, proactive mindfulness, and compassionate guidance."}
        </p>
      </section>

      {/* Services Grid Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((s, idx) => (
            <div 
              key={idx}
              className="bg-card border border-border p-8 rounded-[2rem] shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-background-secondary border border-border flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-tight">
                      {language === "vi" ? s.titleVi : s.titleEn}
                    </h3>
                    <span className="block text-xs text-secondary font-bold mt-1 uppercase tracking-wider subheading">
                      {language === "vi" ? s.audienceVi : s.audienceEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                  {language === "vi" ? s.descVi : s.descEn}
                </p>

                <div className="space-y-2 border-t border-divider pt-4 mb-8">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-secondary font-medium">{language === "vi" ? "Hình thức:" : "Format:"}</span>
                    <span className="text-foreground font-semibold text-right">{language === "vi" ? s.formatVi : s.formatEn}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground-secondary font-medium">{language === "vi" ? "Thời lượng:" : "Duration:"}</span>
                    <span className="text-foreground font-semibold">{language === "vi" ? s.durationVi : s.durationEn}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/booking"
                  className="flex-1 text-center bg-primary hover:bg-primary/95 text-white py-3 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === "vi" ? "Đặt lịch ngay" : "Book Now"}</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 text-center bg-background-secondary border border-border hover:bg-border text-foreground py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-secondary" />
                  <span>{language === "vi" ? "Yêu cầu tư vấn" : "Inquire"}</span>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-background-section py-20 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">
            {language === "vi" ? "CAM KẾT CỦA PHÒNG TÂM LÝ" : "OUR PRACTICE PRINCIPLES"}
          </span>
          <h2 className="text-3xl font-extrabold text-foreground mt-3 mb-8">
            {language === "vi" ? "Hành trì đạo đức nghề nghiệp nghiêm ngặt" : "Strict Ethical Standards of Practice"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h4 className="font-heading font-bold text-sm text-foreground mb-2">1. Riêng tư tuyệt đối</h4>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Tất cả nội dung câu chuyện của bạn được giữ kín và chỉ trao đổi giữa bạn và nhà chuyên môn tham vấn.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h4 className="font-heading font-bold text-sm text-foreground mb-2">2. Không phán xét</h4>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Chuyên gia tôn trọng sự đa dạng về góc nhìn cá nhân, xu hướng giới tính, tôn giáo và hoàn cảnh xã hội.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h4 className="font-heading font-bold text-sm text-foreground mb-2">3. Đặt sự an toàn lên đầu</h4>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Chúng tôi chủ động hành động phối hợp khi phát hiện hành vi tự hại hoặc bạo lực ảnh hưởng tới học sinh.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
