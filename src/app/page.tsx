"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { 
  Heart, ArrowRight, ClipboardCheck, Sparkles, Shield, UserCheck, Star, 
  BookOpen, Video, HelpCircle, PhoneCall, ChevronRight, MessageCircle, FileText, Check
} from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  const { language, specialists, courses, blogs } = useAppState();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      titleVi: "Thấu cảm sâu sắc",
      titleEn: "Empathetic Guidance",
      descVi: "Kiến tạo một điểm tựa tinh thần cởi mở, nơi mọi xúc cảm và tiếng lòng của học sinh đều được đón nhận và trân trọng.",
      descEn: "We foster an open space of trust, ensuring that every student's emotions and voice are embraced and valued."
    },
    {
      icon: <Shield className="w-5 h-5 text-secondary" />,
      titleVi: "An toàn & Riêng tư",
      titleEn: "Guaranteed Privacy",
      descVi: "Quyền riêng tư của bạn là ưu tiên hàng đầu, cam kết bảo mật thông tin tuyệt đối theo các tiêu chuẩn đạo đức nghề nghiệp.",
      descEn: "Your privacy is our utmost priority, with a commitment to strict confidentiality aligned with ethical codes."
    },
    {
      icon: <UserCheck className="w-5 h-5 text-accent" />,
      titleVi: "Nâng đỡ trọn vẹn",
      titleEn: "Full-Circle Care",
      descVi: "Xây dựng sợi dây liên kết bền chặt giữa nhà trường, gia đình và học sinh để cùng tạo nên một môi trường phát triển lành mạnh.",
      descEn: "Bridging the gap between schools, families, and students to collectively foster a healthy growing environment."
    }
  ];

  const processSteps = [
    {
      step: "01",
      titleVi: "Khảo sát trắc ẩn",
      titleEn: "Inner Assessment",
      descVi: "Thực hiện bảng khảo sát ngắn gọn để giúp bạn nhận diện chính xác trạng thái tâm lý và mức độ lo âu hiện tại.",
      descEn: "Complete a brief check-in to accurately recognize your current mental state and stress levels."
    },
    {
      step: "02",
      titleVi: "Xem phân tích cá nhân",
      titleEn: "Personalized Insights",
      descVi: "Nhận kết quả sàng lọc kèm theo các chỉ dẫn khoa học và các bài thực hành chánh niệm tại nhà.",
      descEn: "Get screening results paired with scientific guidance and tailored self-care mindfulness practices."
    },
    {
      step: "03",
      titleVi: "Kết nối chuyên gia",
      titleEn: "Counselor Match",
      descVi: "Lựa chọn người đồng hành phù hợp từ đội ngũ chuyên gia và đặt lịch hẹn tư vấn thuận tiện chỉ trong tích tắc.",
      descEn: "Choose a suitable counselor from our professional list and book a slot in a matter of seconds."
    },
    {
      step: "04",
      titleVi: "Trị liệu chữa lành",
      titleEn: "Mindful Recovery",
      descVi: "Tham gia các buổi trò chuyện chuyên sâu để gỡ bỏ vướng mắc cảm xúc và xây dựng lối sống cân bằng.",
      descEn: "Engage in dedicated therapy sessions to untangle emotional blocks and restore balance."
    }
  ];

  const testimonials = [
    {
      quoteVi: "Nhờ có MindCare, mình đã tìm thấy điểm tựa tinh thần để bước qua áp lực của kỳ thi tốt nghiệp. Những bài tập điều hòa nhịp thở thực sự đã giúp mình lấy lại sự bình tĩnh.",
      quoteEn: "Thanks to MindCare, I found the mental support to navigate the pressure of final exams. The breathing techniques really helped me regain calm.",
      author: "Lê Minh H. (Học sinh lớp 12)",
      relation: "Student"
    },
    {
      quoteVi: "Tôi từng cảm thấy bất lực khi tìm cách chia sẻ cùng con. Khóa học dành cho cha mẹ của nền tảng đã giúp tôi thấu hiểu con mình và thu hẹp khoảng cách thế hệ.",
      quoteEn: "I felt lost trying to connect with my child. The parent program on this platform guided me to listen and close the generational gap.",
      author: "Nguyễn Kim L. (Phụ huynh học sinh)",
      relation: "Parent"
    }
  ];

  const faqs = [
    {
      qVi: "Nội dung các cuộc trò chuyện tư vấn có được giữ kín hoàn toàn không?",
      qEn: "Are counseling discussions kept strictly confidential?",
      aVi: "Tất nhiên rồi. Nguyên tắc bảo mật là cam kết cao nhất của chúng tôi. Mọi thông tin chỉ được chia sẻ trong trường hợp đặc biệt khi có nguy cơ ảnh hưởng trực tiếp đến an toàn tính mạng của học sinh.",
      aEn: "Absolutely. Confidentiality is our absolute vow. Information is never disclosed unless there is an imminent threat to the student's safety."
    },
    {
      qVi: "Tôi có cần trả phí khi tham gia làm bài khảo sát sàng lọc không?",
      qEn: "Is there any cost associated with taking the screening test?",
      aVi: "Bài trắc nghiệm sàng lọc sức khỏe tinh thần được cung cấp hoàn toàn miễn phí nhằm hỗ trợ cộng đồng học sinh, phụ huynh dễ dàng tự nhận diện cảm xúc.",
      aEn: "No, the mental health check-up is completely free to ensure easy accessibility for students, teachers, and parents."
    },
    {
      qVi: "Nên chọn tham vấn trực tuyến (Online) hay gặp mặt trực tiếp (Offline)?",
      qEn: "Should I select online or in-person consultation?",
      aVi: "Cả hai hình thức đều mang lại hiệu quả cao. Gặp trực tiếp giúp tăng kết nối tự nhiên tại phòng tâm lý, còn tư vấn trực tuyến mang lại sự riêng tư, linh hoạt và thuận tiện tối đa.",
      aEn: "Both methods yield great outcomes. In-person creates closer connection, while online counseling offers supreme flexibility, privacy, and ease."
    }
  ];

  return (
    <div className="flex flex-col gap-28 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. PLATFORM INTRODUCTION - Staggered Asymmetrical Layout */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="section-label text-primary">
              {language === "vi" ? "GIỚI THIỆU NỀN TẢNG" : "WHO WE ARE"}
            </span>
            <h2 className="text-h2 font-bold tracking-tight text-foreground mt-4 leading-[1.15]">
              {language === "vi" ? (
                <>Đồng hành hướng tới học đường <span className="gradient-text">an vui, vững tâm</span></>
              ) : (
                <>Guiding the Next Generation Toward <span className="gradient-text">Peace & Resilience</span></>
              )}
            </h2>
            <p className="text-body text-foreground-secondary mt-5 leading-relaxed max-w-[45ch]">
              {language === "vi"
                ? "Chúng tôi kiến tạo giải pháp hỗ trợ tâm lý số hóa tối ưu, giúp học sinh, phụ huynh và giáo viên chủ động chăm sóc tinh thần hàng ngày."
                : "Our platform offers digital-first psychological tools, helping students, educators, and parents navigate life's challenges with proactive care."}
            </p>
            <div className="mt-8">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 group"
              >
                <span>{language === "vi" ? "Tìm hiểu thêm về sứ mệnh" : "Learn more about our mission"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Staggered Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-4">
            {features.map((f, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              
              const cardBg = "bg-card border border-border/80 dark:border-white/5 shadow-sm";
              const hoverGlow = isFirst 
                ? "hover:border-primary/50 hover:shadow-glow-sm" 
                : isSecond 
                ? "hover:border-secondary/50 hover:shadow-glow-sm" 
                : "hover:border-accent/50 hover:shadow-glow-sm";

              const badgeText = language === "vi" 
                ? (isFirst ? "LẮNG NGHE" : isSecond ? "BẢO MẬT" : "ĐỒNG HÀNH")
                : (isFirst ? "LISTEN" : isSecond ? "SECURE" : "HOLISTIC");

              const badgeColor = isFirst 
                ? "bg-primary/10 text-primary border-primary/20" 
                : isSecond 
                ? "bg-secondary/10 text-secondary border-secondary/20" 
                : "bg-accent/10 text-accent border-accent/20";
              
              const imagePath = isFirst 
                ? "/feature_listening_new.png" 
                : isSecond 
                ? "/feature_confidentiality_new.png" 
                : "/feature_holistic_new.png";

              // Staggered offsets for cards
              const staggerClass = idx === 0 
                ? "sm:mt-0" 
                : idx === 1 
                ? "sm:mt-8" 
                : "sm:mt-16";

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group ${cardBg} ${hoverGlow} ${staggerClass}`}
                >
                  <div>
                    {/* Image Area */}
                    <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 dark:border-white/5 flex items-center justify-center mb-5 relative bg-background-secondary/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePath}
                        alt={language === "vi" ? f.titleVi : f.titleEn}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 px-2 py-0.5 text-[8px] font-bold tracking-wider rounded-md border backdrop-blur-md z-10 ${badgeColor}`}>
                        {badgeText}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg border border-border/50 bg-background flex items-center justify-center shrink-0">
                        {f.icon}
                      </div>
                      <h3 className="font-heading font-bold text-sm text-foreground">
                        {language === "vi" ? f.titleVi : f.titleEn}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-foreground-secondary leading-relaxed">
                      {language === "vi" ? f.descVi : f.descEn}
                    </p>
                  </div>

                  {/* Counter */}
                  <div className="mt-6 pt-3 border-t border-divider flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-foreground-secondary/30">
                      MINDCARE
                    </span>
                    <span className="font-heading font-black text-xs text-foreground-secondary/20 group-hover:text-primary/30 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 3. MENTAL HEALTH ASSESSMENT - Alternating Layout (Image Left, Content Right) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="bg-background-section py-20 transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Mock Question Preview Box (Left Side) */}
            <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm lg:order-1 order-2">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-wider">{language === "vi" ? "Câu hỏi mẫu" : "Question Preview"}</span>
                <span className="text-xs text-primary font-bold">Q 04/10</span>
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-foreground leading-snug mb-5">
                {language === "vi" 
                  ? "Trong suốt nửa tháng qua, bạn có hay trằn trọc khó ngủ hoặc cảm thấy rệu rã, kiệt sức vì những lo toan bài vở?"
                  : "During the past two weeks, have you frequently struggled with restful sleep or felt physically exhausted from study anxiety?"}
              </h3>
              <div className="space-y-2.5">
                {[
                  { value: 1, labelVi: "Hoàn toàn không", labelEn: "Not at all" },
                  { value: 2, labelVi: "Thỉnh thoảng vài ngày", labelEn: "Several days" },
                  { value: 3, labelVi: "Hơn một nửa số ngày", labelEn: "More than half the days" },
                  { value: 4, labelVi: "Hầu như mỗi ngày", labelEn: "Nearly every day" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                      option.value === 2 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      option.value === 2 ? "border-primary" : "border-border"
                    }`}>
                      {option.value === 2 && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </div>
                    <span>{language === "vi" ? option.labelVi : option.labelEn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Column (Right Side) */}
            <div className="lg:col-span-7 lg:order-2 order-1">
              <span className="section-label text-secondary">
                {language === "vi" ? "KHẢO SÁT TÂM LÝ" : "WELLNESS SCREENING"}
              </span>
              <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
                {language === "vi" ? (
                  <>Giải mã mức độ <span className="gradient-text">áp lực học tập và thi cử</span></>
                ) : (
                  <>Is <span className="gradient-text">Academic Stress</span> Holding You Back?</>
                )}
              </h2>
              <p className="text-body text-foreground-secondary mt-5 leading-relaxed">
                {language === "vi"
                  ? "Chỉ với 3 phút nhanh chóng để nhận diện cảm xúc. Bản đánh giá trực quan dựa trên các thang đo chuẩn quốc tế giúp bạn gỡ bỏ khúc mắc tinh thần."
                  : "Discover your current mental wellness status using globally recognized psychological scales. Receive an instant analysis paired with daily emotional coping mechanisms."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-2.5 text-xs text-foreground font-semibold">
                  <div className="w-4 h-4 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === "vi" ? "10 câu hỏi trắc nghiệm nhanh" : "10 quick multiple choice questions"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground font-semibold">
                  <div className="w-4 h-4 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === "vi" ? "Khuyến nghị cá nhân hóa" : "Personalized guidelines"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground font-semibold">
                  <div className="w-4 h-4 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === "vi" ? "Hoàn toàn bảo mật" : "100% Secure & Confidential"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground font-semibold">
                  <div className="w-4 h-4 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{language === "vi" ? "Miễn phí 100%" : "Free to take"}</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-7 py-3 rounded-2xl font-bold text-xs shadow-sm hover:translate-y-[-1px] transition-all"
                >
                  <ClipboardCheck className="w-4.5 h-4.5" />
                  <span>{language === "vi" ? "Bắt đầu đánh giá ngay" : "Start Screening Now"}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. SERVICES SECTION - Bento Grid 2x3 */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label text-primary justify-center">
            {language === "vi" ? "DỊCH VỤ HỖ TRỢ" : "OUR SERVICES"}
          </span>
          <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
            {language === "vi" ? (
              <>Các giải pháp <span className="gradient-text">hỗ trợ tâm lý chuyên nghiệp</span></>
            ) : (
              <>Professional <span className="gradient-text">Psychological Support</span></>
            )}
          </h2>
          <p className="text-body text-foreground-secondary mt-4">
            {language === "vi"
              ? "Tham vấn, trị liệu phù hợp cho từng cá nhân và các đối tượng trong vòng tròn giáo dục."
              : "We provide diverse tailored therapy models serving individuals, families, and partner educators."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              titleVi: "Tham vấn Cá nhân 1-1",
              titleEn: "One-on-One Support",
              descVi: "Không gian gặp gỡ bảo mật cùng chuyên viên để tháo gỡ khó khăn về lo âu thi cử, xung đột mối quan hệ và định hướng học tập.",
              descEn: "Safe, confidential sessions with professionals to navigate academic stress, study blocks, and personal hurdles.",
              icon: "👤",
              color: "bg-blue-500/10 text-blue-500",
              className: "md:col-span-2" // Bento Feature Card
            },
            {
              titleVi: "Đồng hành cùng Phụ huynh",
              titleEn: "Family & Parent Advisory",
              descVi: "Trợ giúp cha mẹ thấu hiểu tâm sinh lý tuổi teen, hóa giải những bất đồng quan điểm.",
              descEn: "Advisory to support parents in understanding adolescent growth and resolving conflicts.",
              icon: "👨‍👩‍👧‍👦",
              color: "bg-emerald-500/10 text-emerald-500",
              className: "md:col-span-1"
            },
            {
              titleVi: "Hỗ trợ Đội ngũ Giáo viên",
              titleEn: "Teacher Wellness & Support",
              descVi: "Đồng hành giải tỏa áp lực giảng dạy, chia sẻ kỹ năng nhận diện sớm học sinh.",
              descEn: "Addressing educator burnout while equipping teachers with skills to support students.",
              icon: "🏫",
              color: "bg-amber-500/10 text-amber-500",
              className: "md:col-span-1"
            },
            {
              titleVi: "Sinh hoạt Nhóm & Trị liệu",
              titleEn: "Group Circles & peer support",
              descVi: "Tạo dựng vòng tròn kết nối thân thiện dưới sự dẫn dắt của chuyên gia để chia sẻ các mối lo chung và rèn luyện kỹ năng sống.",
              descEn: "Moderated group meetups for sharing common obstacles, building empathy, and sharpening communication skills.",
              icon: "👥",
              color: "bg-indigo-500/10 text-indigo-500",
              className: "md:col-span-2" // Bento Feature Card
            },
            {
              titleVi: "Trợ giúp Khủng hoảng Kịp thời",
              titleEn: "Urgent Crisis Guidance",
              descVi: "Quy trình ứng cứu khẩn cấp và bảo vệ an toàn cho học sinh trước chấn thương tâm lý.",
              descEn: "Immediate response protocols to secure safety for students experiencing extreme trauma.",
              icon: "🚨",
              color: "bg-rose-500/10 text-rose-500",
              className: "md:col-span-1"
            },
            {
              titleVi: "Workshop Kỹ năng & Chánh niệm",
              titleEn: "Mindful Campus Workshops",
              descVi: "Thiết kế các buổi thực hành kỹ năng mềm, viết nhật ký chánh niệm và liệu pháp nghệ thuật.",
              descEn: "Interactive on-campus camps focused on emotional coping and interactive healing arts.",
              icon: "🎨",
              color: "bg-purple-500/10 text-purple-500",
              className: "md:col-span-2" // Bento Feature Card
            }
          ].map((s, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl bg-card border border-border/80 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-md flex flex-col justify-between ${s.className || ""}`}
            >
              <div>
                <div className={`w-10 h-10 rounded-2xl ${s.color} flex items-center justify-center text-lg mb-5`}>
                  {s.icon}
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground mb-2 leading-snug">
                  {language === "vi" ? s.titleVi : s.titleEn}
                </h3>
                <p className="text-[11px] text-foreground-secondary leading-relaxed mb-5">
                  {language === "vi" ? s.descVi : s.descEn}
                </p>
              </div>
              <Link 
                href="/services" 
                className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/80 group"
              >
                <span>{language === "vi" ? "Tìm hiểu thêm" : "Learn More"}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. SPECIALISTS SECTION - Mobile Horizontal Scroll / Desktop 4-Column Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="bg-background-secondary py-20 transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-lg">
              <span className="section-label text-primary">
                {language === "vi" ? "ĐỘI NGŨ CHUYÊN GIA" : "OUR PSYCHOLOGISTS"}
              </span>
              <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
                {language === "vi" ? (
                  <>Lắng nghe từ những <span className="gradient-text">chuyên gia thấu cảm</span></>
                ) : (
                  <>Nurtured by <span className="gradient-text">Qualified Specialists</span></>
                )}
              </h2>
            </div>
            <Link
              href="/specialists"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>{language === "vi" ? "Xem toàn bộ chuyên gia" : "View All Experts"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal scroll container on mobile, grid on desktop */}
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-none md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0">
            {specialists.map((sp) => (
              <div 
                key={sp.id}
                className="min-w-[260px] md:min-w-0 bg-card border border-border/80 rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-md"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-2xl flex items-center justify-center mx-auto mb-3.5 border border-primary/15">
                    {sp.avatar}
                  </div>
                  
                  <h3 className="font-heading font-bold text-sm text-foreground mb-0.5">
                    {sp.name}
                  </h3>
                  
                  <span className="block text-[9px] text-primary font-bold uppercase tracking-wider mb-2.5">
                    {sp.experience}
                  </span>

                  <p className="text-[10px] text-foreground-secondary leading-relaxed line-clamp-3 mb-4">
                    {sp.bio}
                  </p>

                  <div className="flex items-center justify-center gap-1 mb-5 bg-background-secondary py-1 px-2.5 rounded-full w-fit mx-auto border border-border/60">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-[10px] font-bold text-foreground">{sp.rating}</span>
                    <span className="text-[9px] text-foreground-secondary">({sp.reviewsCount})</span>
                  </div>
                </div>

                <Link
                  href={`/specialists/${sp.id}`}
                  className="w-full bg-primary hover:bg-primary/95 text-white text-center py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  {language === "vi" ? "Xem hồ sơ & Đặt lịch" : "Profile & Booking"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. CONSULTATION PROCESS - Vertical Timeline */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label text-primary justify-center">
            {language === "vi" ? "QUY TRÌNH TƯ VẤN" : "CONSULTING WORKFLOW"}
          </span>
          <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
            {language === "vi" ? (
              <>Hành trình trợ giúp <span className="gradient-text">tinh thần tinh gọn</span></>
            ) : (
              <>Your Path to <span className="gradient-text">Emotional Clarity</span></>
            )}
          </h2>
          <p className="text-body text-foreground-secondary mt-4">
            {language === "vi"
              ? "Chỉ với một vài thao tác, bạn đã có thể tiếp cận dịch vụ tham vấn chuyên nghiệp."
              : "Access counseling support safely in 4 straightforward digital steps."}
          </p>
        </div>

        {/* Vertical Timeline Layout */}
        <div className="relative max-w-3xl mx-auto pl-8 sm:pl-12 border-l border-divider/80 space-y-12">
          {processSteps.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Step indicator dot */}
              <div className="absolute top-1 -left-[45px] sm:-left-[61px] w-8 h-8 rounded-xl bg-card border-2 border-primary/55 flex items-center justify-center font-heading font-black text-xs text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                {p.step}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-card border border-border/80 p-5 sm:p-6 rounded-3xl shadow-sm hover:border-primary/30 transition-all">
                <div className="md:col-span-8">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-foreground mb-2">
                    {language === "vi" ? p.titleVi : p.titleEn}
                  </h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {language === "vi" ? p.descVi : p.descEn}
                  </p>
                </div>

                {/* Micro Widgets */}
                <div className="md:col-span-4 flex items-center">
                  {idx === 0 && (
                    <div className="w-full bg-background-secondary/60 border border-border/60 rounded-xl p-2.5 text-left space-y-1 shadow-inner">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-foreground">
                        <div className="w-3 h-3 rounded bg-primary/20 text-primary flex items-center justify-center text-[7px]">✓</div>
                        <span>{language === "vi" ? "Khảo sát lo âu thi cử" : "Exam Anxiety Scale"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-foreground">
                        <div className="w-3 h-3 rounded bg-primary/20 text-primary flex items-center justify-center text-[7px]">✓</div>
                        <span>{language === "vi" ? "Đo áp lực học tập (PSS)" : "Academic Stress (PSS)"}</span>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="w-full bg-background-secondary/60 border border-border/60 rounded-xl p-2.5 text-left shadow-inner flex flex-col items-center">
                      <div className="text-[9px] font-bold text-foreground mb-1">{language === "vi" ? "Stress: Trung bình" : "Stress: Moderate"}</div>
                      <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-secondary to-accent h-full w-[65%]" />
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="w-full bg-background-secondary/60 border border-border/60 rounded-xl p-2 text-left shadow-inner">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="py-0.5 px-1 bg-border text-[8px] text-center text-foreground-secondary/40 rounded font-bold">09:00</div>
                        <div className="py-0.5 px-1 bg-primary/15 border border-primary/20 text-[8px] text-center text-primary rounded font-bold animate-pulse">14:30</div>
                      </div>
                    </div>
                  )}

                  {idx === 3 && (
                    <div className="w-full bg-background-secondary/60 border border-border/60 rounded-xl p-2 text-left shadow-inner flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-[9px]">👩‍⚕️</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[8px] font-bold text-foreground truncate">{language === "vi" ? "TS. Nguyễn Thị Mai" : "Dr. Nguyen Mai"}</div>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[7px] text-foreground-secondary leading-none">{language === "vi" ? "Đang kết nối..." : "Connecting..."}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 7. SKILLS COURSES - Staggered Height Cards */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="bg-background-secondary py-20 transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-lg">
              <span className="section-label text-secondary">
                {language === "vi" ? "KHÓA HỌC KỸ NĂNG" : "LIFE SKILL COURSES"}
              </span>
              <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
                {language === "vi" ? (
                  <>Rèn luyện và nâng cao <span className="gradient-text">trí tuệ cảm xúc</span></>
                ) : (
                  <>Grow Your <span className="gradient-text">Emotional Intelligence</span></>
                )}
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>{language === "vi" ? "Xem tất cả khóa học" : "Explore All Courses"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Staggered Height cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              // Create staggered heights on desktop
              const heightClass = index === 0 
                ? "md:pb-12" 
                : index === 1 
                ? "md:pb-6" 
                : "md:pb-16";
                
              return (
                <div 
                  key={course.id}
                  className={`bg-card border border-border/80 rounded-3xl p-5 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-md flex flex-col justify-between ${heightClass}`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-background-secondary border border-border flex items-center justify-center mb-4">
                      {course.image.startsWith("/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{course.image}</span>
                      )}
                    </div>
                    
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-wider mb-2.5">
                      {course.category}
                    </span>

                    <h3 className="font-heading font-bold text-sm sm:text-base text-foreground mb-2 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-foreground-secondary leading-relaxed mb-5">
                      {course.description}
                    </p>
                  </div>

                  <div className="border-t border-divider pt-3.5 flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-foreground-secondary font-medium">
                      {course.duration}
                    </span>
                    
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-1 bg-primary/5 hover:bg-primary/10 text-primary px-3.5 py-1.5 rounded-xl text-[10px] font-bold transition-all"
                    >
                      <span>{course.enrolled ? (language === "vi" ? "Học tiếp" : "Continue") : (language === "vi" ? "Xem chi tiết" : "Details")}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 8. RESOURCES SECTION - Left Sticky Title, Right Bento grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sticky Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <span className="section-label text-primary">
              {language === "vi" ? "TÀI NGUYÊN TÂM LÝ" : "WELLNESS LIBRARY"}
            </span>
            <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
              {language === "vi" ? (
                <>Góc tài nguyên <span className="gradient-text">nâng niu tâm trí</span></>
              ) : (
                <>Curated <span className="gradient-text">Self-Care Library</span></>
              )}
            </h2>
            <p className="text-body text-foreground-secondary mt-4 leading-relaxed">
              {language === "vi"
                ? "Thư viện lưu trữ các bộ cẩm nang điện tử hướng dẫn giải tỏa stress, các số podcast trị liệu chánh niệm."
                : "Access handpicked coping toolkits, soothing clinical podcasts, and customizable worksheets to support your emotional health."}
            </p>
            <div className="mt-8">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-secondary text-white px-7 py-3 rounded-2xl font-bold text-xs shadow-sm hover:translate-y-[-1px] transition-all"
              >
                <span>{language === "vi" ? "Khám phá thư viện" : "Browse Library"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Bento grid layout */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-background-section border border-border/80 flex gap-3 hover:border-primary/30 transition-all duration-300 shadow-xs cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-base shrink-0">🎧</div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">Podcast &quot;Học cách thở ôm&quot;</h4>
                <p className="text-[10px] text-foreground-secondary mt-1 leading-relaxed">Podcast hướng dẫn thiền định và xoa dịu lo âu kỳ thi dài 15 phút.</p>
                <span className="text-[9px] text-primary font-bold uppercase tracking-wider block mt-2.5">Nghe Podcast</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-background-alt border border-border/80 flex gap-3 hover:border-primary/30 transition-all duration-300 shadow-xs cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-base shrink-0">📖</div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">Ebook &quot;Giải mã Gen Z&quot;</h4>
                <p className="text-[10px] text-foreground-secondary mt-1 leading-relaxed">Tài liệu giúp phụ huynh thấu hiểu thế giới của con trong kỷ nguyên số.</p>
                <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block mt-2.5">Tải Ebook (PDF)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-background-alt border border-border/80 flex gap-3 hover:border-primary/30 transition-all duration-300 shadow-xs cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-base shrink-0">📋</div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">Checklist &quot;Cắt giảm lo âu&quot;</h4>
                <p className="text-[10px] text-foreground-secondary mt-1 leading-relaxed">Bảng theo dõi cảm xúc hàng ngày giúp bạn duy trì cân bằng cuộc sống.</p>
                <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block mt-2.5">Tải Checklist</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-background-section border border-border/80 flex gap-3 hover:border-primary/30 transition-all duration-300 shadow-xs cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-base shrink-0">🎬</div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">Video thiền chánh niệm học đường</h4>
                <p className="text-[10px] text-foreground-secondary mt-1 leading-relaxed">Loạt video hướng dẫn các động tác kéo giãn cơ thể giảm căng thẳng.</p>
                <span className="text-[9px] text-primary font-bold uppercase tracking-wider block mt-2.5">Xem Video</span>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* 9. BLOG SECTION - Featured 1 Big + 2 Small Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="bg-background-secondary py-20 transition-colors"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-lg">
              <span className="section-label text-primary">
                {language === "vi" ? "GÓC SẺ CHIA" : "WELLNESS INSIGHTS"}
              </span>
              <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
                {language === "vi" ? (
                  <>Góc nhìn chuyên sâu và <span className="gradient-text">kiến thức bổ ích</span></>
                ) : (
                  <>Expert Articles on <span className="gradient-text">Well-being</span></>
                )}
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>{language === "vi" ? "Xem tất cả bài viết" : "Read All Blogs"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured + Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: 1 Featured Big Blog */}
            {blogs.slice(0, 1).map((b) => (
              <div 
                key={b.slug}
                className="lg:col-span-6 bg-card border border-border/80 rounded-3xl p-6 shadow-sm hover:border-primary/45 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-background-secondary border border-border/60 mb-5">
                    {b.image.startsWith("/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl flex items-center justify-center h-full">{b.image}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[8px] font-bold uppercase tracking-wider">
                      {b.category}
                    </span>
                    <span className="text-[9px] text-foreground-secondary font-medium">{b.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mb-3 leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-3 mb-6">
                    {b.summary}
                  </p>
                </div>

                <div className="border-t border-divider pt-4 flex items-center justify-between mt-auto">
                  <span className="text-[9px] text-foreground-secondary font-bold uppercase tracking-wider">
                    {b.author}
                  </span>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                  >
                    <span>{language === "vi" ? "Đọc tiếp" : "Read Article"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Right Column: 2 Small Blogs stacked */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {blogs.slice(1, 3).map((b) => (
                <div 
                  key={b.slug}
                  className="bg-card border border-border/80 rounded-3xl p-5 shadow-sm hover:border-primary/45 transition-all duration-300 hover:shadow-md flex flex-col justify-between flex-1"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-[8px] font-bold uppercase tracking-wider">
                        {b.category}
                      </span>
                      <span className="text-[9px] text-foreground-secondary font-medium">{b.date}</span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-foreground mb-2 leading-snug line-clamp-2">
                      {b.title}
                    </h3>

                    <p className="text-[11px] text-foreground-secondary leading-relaxed line-clamp-2 mb-4">
                      {b.summary}
                    </p>
                  </div>

                  <div className="border-t border-divider pt-3 flex items-center justify-between mt-auto">
                    <span className="text-[9px] text-foreground-secondary font-bold uppercase tracking-wider">
                      {b.author}
                    </span>
                    <Link
                      href={`/blog/${b.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
                    >
                      <span>{language === "vi" ? "Đọc tiếp" : "Read Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 10. INSPIRING STORIES (TESTIMONIALS) - Alternating Large Quotes */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label text-secondary justify-center">
            {language === "vi" ? "KÝ ỨC CHỮA LÀNH" : "TESTIMONIALS OF HOPE"}
          </span>
          <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
            {language === "vi" ? (
              <>Những trải nghiệm <span className="gradient-text">thay đổi cuộc sống</span></>
            ) : (
              <>Echoes of <span className="gradient-text">Growth & Healing</span></>
            )}
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {testimonials.map((t, idx) => {
            const isAlt = idx % 2 === 1;
            return (
              <div 
                key={idx} 
                className={`p-6 sm:p-8 rounded-[2rem] border border-border/80 shadow-xs relative flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto ${
                  isAlt ? "bg-background-section/60" : "bg-card"
                }`}
              >
                {/* Author Avatar Left */}
                <div className="w-14 h-14 rounded-full overflow-hidden border border-border shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.relation === "Student" ? "/hero.png" : "/parent.png"}
                    alt={t.author}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <span className="absolute top-4 right-6 text-5xl text-primary/10 font-serif leading-none select-none">&quot;</span>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed italic mb-4">
                    &ldquo;{language === "vi" ? t.quoteVi : t.quoteEn}&rdquo;
                  </p>
                  <div>
                    <span className="block text-xs text-foreground font-bold">{t.author}</span>
                    <span className="block text-[9px] text-foreground-secondary uppercase tracking-wider mt-0.5">{t.relation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 11. FAQ ACCORDION - 2-Column Responsive Layout */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="text-center mb-12">
          <span className="section-label text-primary justify-center">
            {language === "vi" ? "GIẢI ĐÁP THẮC MẮC" : "FAQ"}
          </span>
          <h2 className="text-h2 font-bold text-foreground mt-4 leading-[1.15]">
            {language === "vi" ? (
              <>Những <span className="gradient-text">băn khoăn thường gặp</span></>
            ) : (
              <>Common <span className="gradient-text">Clarifications</span></>
            )}
          </h2>
        </div>

        {/* 2-column FAQ layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-card border border-border/80 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 font-heading font-bold text-xs sm:text-sm text-foreground hover:bg-background-secondary transition-colors"
                >
                  <span>{language === "vi" ? faq.qVi : faq.qEn}</span>
                  <ChevronRight className={`w-4 h-4 text-foreground-secondary shrink-0 transition-transform ${
                    isOpen ? "rotate-90 text-primary" : ""
                  }`} />
                </button>
                
                <div className={`transition-all duration-300 ${
                  isOpen ? "max-h-[220px] border-t border-divider opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <p className="px-5 py-4 text-xs text-foreground-secondary leading-relaxed bg-background-section/40">
                    {language === "vi" ? faq.aVi : faq.aEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 12. FINAL APPOINTMENT CTA - Enhanced Banner */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-8 w-full"
      >
        <div className="p-8 md:p-14 rounded-[2rem] bg-gradient-to-tr from-primary via-primary/95 to-secondary text-white text-center shadow-md relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute top-0 left-0 w-52 h-52 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-accent tracking-wider uppercase block mb-3">
              {language === "vi" ? "MINDCARE LUÔN LẮNG NGHE BẠN" : "WE ARE HERE TO ACCCOMPANY YOU"}
            </span>
            <h2 className="text-h1 font-bold tracking-tight mb-5 leading-[1.1]">
              {language === "vi" ? "Mở cánh cửa bình yên cho tâm hồn của bạn" : "Unlock a Peaceful Mind Today"}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-8 max-w-[50ch] mx-auto">
              {language === "vi"
                ? "Lắng nghe bản thân và dành thời gian nuôi dưỡng tâm trí chính là chiếc chìa khóa mở ra tương lai rạng rỡ."
                : "Tuning in to your emotional needs and investing in self-care paves the way for a brighter academic future."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/booking"
                className="bg-white text-primary hover:bg-white/95 px-7 py-3 rounded-xl font-bold text-xs shadow-md transition-all"
              >
                {language === "vi" ? "Đặt lịch trò chuyện 1-1" : "Book a 1-1 Chat"}
              </Link>
              <Link
                href="/assessment"
                className="bg-transparent border border-white/20 hover:border-white text-white px-7 py-3 rounded-xl font-bold text-xs transition-all"
              >
                {language === "vi" ? "Làm đánh giá tâm lý" : "Start Wellness Screening"}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
