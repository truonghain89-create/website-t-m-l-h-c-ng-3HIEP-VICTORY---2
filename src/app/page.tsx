"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { 
  Heart, ArrowRight, ClipboardCheck, Sparkles, Shield, UserCheck, Star, 
  BookOpen, Video, HelpCircle, PhoneCall, ChevronRight, MessageCircle, FileText, Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { language, specialists, courses, blogs } = useAppState();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { value: "10,000+", labelVi: "Học sinh được hỗ trợ", labelEn: "Students Supported" },
    { value: "15+", labelVi: "Chuyên gia tâm lý đầu ngành", labelEn: "Psychologists & Experts" },
    { value: "98%", labelVi: "Tỷ lệ phụ huynh hài lòng", labelEn: "Parents Satisfaction" },
    { value: "30+", labelVi: "Trường học đối tác liên kết", labelEn: "Partner Schools" },
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      titleVi: "Lắng nghe chân thành",
      titleEn: "Empathetic Listening",
      descVi: "Phòng tâm lý là không gian an toàn tuyệt đối, nơi mọi tiếng lòng của học sinh đều được trân trọng và lắng nghe.",
      descEn: "Our counseling room is a completely safe space, where every student's voice is respected and heard."
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary" />,
      titleVi: "Bảo mật tuyệt đối",
      titleEn: "Absolute Confidentiality",
      descVi: "Mọi thông tin tham vấn cá nhân được mã hóa và bảo mật nghiêm ngặt theo tiêu chuẩn đạo đức nghề nghiệp quốc tế.",
      descEn: "All personal consultation data is strictly encrypted and protected under international ethical codes."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-accent" />,
      titleVi: "Đồng hành toàn diện",
      titleEn: "Holistic Accompanying",
      descVi: "Kết nối mật thiết giữa học sinh, gia đình và nhà trường nhằm xây dựng một bệ đỡ sức khỏe tinh thần vững chắc.",
      descEn: "Close collaboration between students, families, and schools to build a solid mental health support system."
    }
  ];

  const processSteps = [
    {
      step: "01",
      titleVi: "Làm đánh giá tâm lý",
      titleEn: "Self-Assessment",
      descVi: "Thực hiện bài khảo sát 10 câu hỏi để nhận diện mức độ lo âu, stress học tập.",
      descEn: "Take a 10-question check-up to assess anxiety and stress levels."
    },
    {
      step: "02",
      titleVi: "Nhận kết quả & Khuyên nghị",
      titleEn: "Get Recommendation",
      descVi: "Xem phân tích mức độ rủi ro và các giải pháp chánh niệm tự rèn luyện phù hợp.",
      descEn: "Review risk analysis and tailored mindfulness self-care guidelines."
    },
    {
      step: "03",
      titleVi: "Đặt lịch hẹn chuyên gia",
      titleEn: "Book a Session",
      descVi: "Chọn lịch rảnh của chuyên gia ưa thích và đặt lịch tư vấn Online/Offline chỉ trong 2 phút.",
      descEn: "Select a slot on your favorite therapist's calendar and book in under 2 minutes."
    },
    {
      step: "04",
      titleVi: "Đồng hành trị liệu",
      titleEn: "Continuous Therapy",
      descVi: "Tham gia buổi gặp gỡ thấu cảm để tháo gỡ áp lực và theo dõi tiến trình hồi phục.",
      descEn: "Join the empathetic session to dissolve blockages and track mental recovery."
    }
  ];

  const testimonials = [
    {
      quoteVi: "Nhờ có MindCare, em vượt qua được khủng hoảng ôn thi THPT quốc gia. Bài tập thở hộp và sự lắng nghe của cô Mai đã cứu rỗi tâm trí em lúc mệt mỏi nhất.",
      quoteEn: "Thanks to MindCare, I survived the stress of national college entry exams. Box breathing and Ms. Mai's guidance saved my sanity.",
      author: "Lê Minh H. (Học sinh lớp 12)",
      relation: "Student"
    },
    {
      quoteVi: "Tôi từng bất lực trong việc trò chuyện cùng con trai tuổi dậy thì. Khóa học phụ huynh của MindCare đã mở khóa nút thắt giao tiếp giữa hai cha con.",
      quoteEn: "I was once helpless when talking to my teenage son. MindCare's parent program unlocked the communication gap between us.",
      author: "Nguyễn Kim L. (Phụ huynh học sinh)",
      relation: "Parent"
    }
  ];

  const faqs = [
    {
      qVi: "Dịch vụ tư vấn học đường của MindCare có bảo mật không?",
      qEn: "Is MindCare's school counseling service confidential?",
      aVi: "Có, bảo mật thông tin là điều khoản tiên quyết của chúng tôi. Danh tính và nội dung buổi trò chuyện chỉ được chia sẻ trong trường hợp có nguy hiểm khẩn cấp đe dọa trực tiếp đến tính mạng của học sinh.",
      aEn: "Yes, confidentiality is our core protocol. Client details and dialogue are kept strictly secure, only shared in critical situations involving self-harm risk or life threat."
    },
    {
      qVi: "Tôi có mất phí khi làm bài đánh giá sức khỏe tinh thần không?",
      qEn: "Do I have to pay to take the mental health assessment?",
      aVi: "Hoàn toàn miễn phí. Bài đánh giá được thiết kế nhằm mục đích sàng lọc sơ bộ cho cộng đồng học sinh, sinh viên và phụ huynh dễ dàng tiếp cận.",
      aEn: "No, it is 105% free. The assessment tool is crafted for initial screening and accessibility for the student, parent, and teacher community."
    },
    {
      qVi: "Tư vấn Online hay Offline có hiệu quả tốt hơn?",
      qEn: "Is Online or Offline counseling more effective?",
      aVi: "Cả hai hình thức đều có hiệu quả tham vấn cao. Tư vấn Offline giúp tăng tương tác trực quan tại phòng tâm lý ấm cúng, trong khi tư vấn Online mang lại sự tiện lợi, an toàn và riêng tư tối đa tại nhà.",
      aEn: "Both formats offer high clinical effectiveness. Offline allows warm, face-to-face interaction, while Online offers flexibility, privacy, and safety from your own room."
    }
  ];

  return (
    <div className="flex flex-col gap-24 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-background-secondary via-background-secondary to-background pt-16 pb-20 md:py-32">
        {/* Soft background glow circles */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 subheading">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{language === "vi" ? "Chăm sóc sức khỏe tinh thần thế hệ mới" : "Next-gen Mental Health Support"}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
                {language === "vi" ? "Đồng hành cùng sức khỏe tinh thần học đường" : "Empowering Minds in Every Classroom"}
              </h1>
              
              <p className="text-lg text-foreground-secondary leading-relaxed mb-8 max-w-[55ch]">
                {language === "vi" 
                  ? "Lắng nghe – Thấu hiểu – Đồng hành cùng học sinh, sinh viên và gia đình trên hành trình phát triển sức khỏe tinh thần tích cực."
                  : "Listening – Understanding – Accompanying students and families on the path to positive psychological well-being."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-premium hover:translate-y-[-2px] transition-all"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>{language === "vi" ? "Đánh giá ngay" : "Take Assessment"}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-card hover:bg-background-secondary border border-border text-foreground px-8 py-4 rounded-2xl font-bold text-base shadow-sm hover:translate-y-[-2px] transition-all"
                >
                  <PhoneCall className="w-5 h-5 text-secondary" />
                  <span>{language === "vi" ? "Đặt lịch tư vấn" : "Book Consultant"}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-divider mt-12 pt-8">
                {stats.map((s, idx) => (
                  <div key={idx}>
                    <span className="block font-heading font-extrabold text-2xl text-primary">{s.value}</span>
                    <span className="block text-xs text-foreground-secondary font-medium mt-1 leading-tight">
                      {language === "vi" ? s.labelVi : s.labelEn}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Hero Right Asset */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center w-full max-w-lg aspect-[4/3] sm:aspect-square"
            >
              {/* Actual Image Container with realistic visual focus */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-premium border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero.png"
                  alt="Student meditating in school library"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 animate-float-image"
                />
                
                {/* Dark/Light overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glassmorphic Feedback Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass shadow-premium text-left flex items-start gap-3 backdrop-blur-md">
                  <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm shrink-0 border border-secondary/20">
                    💚
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-foreground dark:text-white leading-none">
                      {language === "vi" ? "Đồng hành tâm lý học đường" : "Active Campus Therapy"}
                    </h4>
                    <p className="text-[10px] text-foreground-secondary dark:text-gray-300 mt-1 leading-snug">
                      {language === "vi"
                        ? "Hơn 10.000 học sinh, sinh viên được lắng nghe và hỗ trợ định hướng cảm xúc tích cực."
                        : "Over 10,000 students supported with personalized coping blueprints."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">{language === "vi" ? "GIỚI THIỆU NỀN TẢNG" : "WHO WE ARE"}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Vì một thế hệ học đường hạnh phúc và vững vàng" : "For a Happy & Resilient Student Generation"}
          </h2>
          <p className="text-base text-foreground-secondary mt-4 leading-relaxed">
            {language === "vi"
              ? "MindCare được xây dựng với mục tiêu mang lại giải pháp chăm sóc sức khỏe tinh thần học đường số hóa toàn diện, an toàn, hiện đại và chuẩn mực khoa học."
              : "MindCare delivers comprehensive, digitally powered school mental health solutions built on scientific standards and strict privacy."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-card border border-border shadow-premium hover:border-primary/40 hover:-translate-y-1 transition-all group"
            >
              {/* Replacing simple icon with small realistic visual photo thumbnail */}
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-border flex items-center justify-center mb-6 group-hover:border-primary/40 transition-all relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={idx === 0 ? "/hero.png" : idx === 1 ? "/office.png" : "/parent.png"}
                  alt={language === "vi" ? f.titleVi : f.titleEn}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                {language === "vi" ? f.titleVi : f.titleEn}
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                {language === "vi" ? f.descVi : f.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MENTAL HEALTH ASSESSMENT CALLOUT */}
      <section className="bg-background-section py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Callout Left */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">
                {language === "vi" ? "ĐÁNH GIÁ SỨC KHỎE TINH THẦN" : "MENTAL CHECK-UP"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 leading-tight">
                {language === "vi" ? "Bạn có đang quá tải hay lo âu thi cử?" : "Are you overloaded with exams or stress?"}
              </h2>
              <p className="text-base text-foreground-secondary mt-4 leading-relaxed">
                {language === "vi"
                  ? "Dành ra 3 phút thực hiện bài tự đánh giá sàng lọc tâm lý dựa trên thang đo chuẩn mực (PSS & GAD-7) của Hiệp hội Tâm lý học. Kết quả phân tích sẽ đi kèm với các bài tập chánh niệm tự rèn luyện và gợi ý hỗ trợ từ chuyên gia."
                  : "Spend 3 minutes on our self-screening test based on standard psychological scales (PSS & GAD-7). Receive personalized wellness guidelines and matching consultant suggestions."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{language === "vi" ? "10 câu hỏi trắc nghiệm nhanh" : "10 quick multiple choice questions"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{language === "vi" ? "Khuyến nghị cá nhân hóa" : "Personalized guidelines"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{language === "vi" ? "Hoàn toàn bảo mật" : "100% Secure & Confidential"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground font-semibold">
                  <div className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{language === "vi" ? "Miễn phí 100%" : "Free to take"}</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-8 py-3.5 rounded-2xl font-bold text-base shadow-premium hover:translate-y-[-2px] transition-all"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>{language === "vi" ? "Bắt đầu đánh giá ngay" : "Start Screening Now"}</span>
                </Link>
              </div>
            </div>

            {/* Callout Right (Mock Question Preview Box) */}
            <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-8 shadow-premium">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-foreground-secondary font-bold uppercase tracking-wider">{language === "vi" ? "Câu hỏi mẫu" : "Question Preview"}</span>
                <span className="text-xs text-primary font-bold">Q 04/10</span>
              </div>
              <h3 className="font-heading font-bold text-base text-foreground leading-snug mb-5">
                {language === "vi" 
                  ? "Trong vòng 2 tuần qua, bạn có thường xuyên gặp khó khăn trong việc ngủ ngon giấc hoặc ngủ quá nhiều vì lo lắng không?"
                  : "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?"}
              </h3>
              <div className="space-y-3">
                {[
                  { value: 1, labelVi: "Hoàn toàn không", labelEn: "Not at all" },
                  { value: 2, labelVi: "Thỉnh thoảng vài ngày", labelEn: "Several days" },
                  { value: 3, labelVi: "Hơn một nửa số ngày", labelEn: "More than half the days" },
                  { value: 4, labelVi: "Hầu như mỗi ngày", labelEn: "Nearly every day" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                      option.value === 2 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      option.value === 2 ? "border-primary" : "border-border"
                    }`}>
                      {option.value === 2 && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span>{language === "vi" ? option.labelVi : option.labelEn}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">{language === "vi" ? "DỊCH VỤ HỖ TRỢ" : "OUR SERVICES"}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Các giải pháp hỗ trợ tâm lý chuyên nghiệp" : "Professional Psychological Counseling Services"}
          </h2>
          <p className="text-base text-foreground-secondary mt-4 leading-relaxed">
            {language === "vi"
              ? "Chúng tôi cung cấp đa dạng hình thức tham vấn, trị liệu phù hợp cho từng cá nhân và các đối tượng liên đới trong vòng tròn giáo dục."
              : "We provide diverse tailored therapy models serving individuals, families, and partner educators."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              titleVi: "Tư vấn cá nhân (Học sinh/Sinh viên)",
              titleEn: "Individual Student Counseling",
              descVi: "Gặp gỡ riêng tư 1-1 cùng chuyên gia tâm lý học đường. Tham vấn các vấn đề về áp lực thi cử, định hướng nghề nghiệp, lo âu học tập.",
              descEn: "Private 1-1 therapy sessions resolving exam stress, anxiety, family problems, or lack of study motivation.",
              icon: "👤",
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              titleVi: "Tư vấn phụ huynh",
              titleEn: "Parent Consultation",
              descVi: "Tham vấn giúp cha mẹ thấu hiểu tâm lý tuổi dậy thì của con, làm bạn cùng con và giải quyết xung đột khoảng cách thế hệ trong gia đình.",
              descEn: "Consultations helping parents bridge communication gaps, decode Gen Z, and resolve family generation conflicts.",
              icon: "👨‍👩‍👧‍👦",
              color: "bg-emerald-500/10 text-emerald-500"
            },
            {
              titleVi: "Tham vấn giáo viên",
              titleEn: "Educator Support & Training",
              descVi: "Giải tỏa căng thẳng nghề nghiệp cho thầy cô, đồng thời hướng dẫn phương pháp phát hiện sớm và can thiệp tâm lý học sinh ban đầu.",
              descEn: "Therapy dealing with professional burnout and training teachers on basic student mental health screening.",
              icon: "🏫",
              color: "bg-amber-500/10 text-amber-500"
            },
            {
              titleVi: "Tham vấn nhóm & Câu lạc bộ",
              titleEn: "Group Therapy & Clubs",
              descVi: "Tổ chức các nhóm trò chuyện có sự định hướng của chuyên gia nhằm kết nối, chia sẻ các lo lắng chung và rèn luyện kỹ năng xã hội.",
              descEn: "Therapist-led circles sharing shared concerns, connecting student peers, and enhancing social communication skills.",
              icon: "👥",
              color: "bg-indigo-500/10 text-indigo-500"
            },
            {
              titleVi: "Can thiệp khủng hoảng khẩn cấp",
              titleEn: "Crisis Intervention",
              descVi: "Hỗ trợ ứng cứu khẩn cấp cho các trường hợp học sinh gặp chấn thương tâm lý nặng, bạo lực học đường, có suy nghĩ tự hại.",
              descEn: "Immediate emergency intervention for students facing severe psychological trauma, school bullying, or self-harm thoughts.",
              icon: "🚨",
              color: "bg-rose-500/10 text-rose-500"
            },
            {
              titleVi: "Tổ chức Workshop & Trải nghiệm",
              titleEn: "Workshops & Self-care Camps",
              descVi: "Tổ chức các buổi chuyên đề kỹ năng mềm, chánh niệm học đường, vẽ tranh trị liệu cho các cơ sở giáo dục liên kết.",
              descEn: "On-campus workshops delivering soft skills, mindfulness, or art therapy to partner educational institutions.",
              icon: "🎨",
              color: "bg-purple-500/10 text-purple-500"
            }
          ].map((s, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-card border border-border shadow-premium hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-6">{s.icon}</span>
                <h3 className="font-heading font-bold text-base text-foreground mb-3 leading-snug">
                  {language === "vi" ? s.titleVi : s.titleEn}
                </h3>
                <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                  {language === "vi" ? s.descVi : s.descEn}
                </p>
              </div>
              <Link 
                href="/services" 
                className="inline-flex items-center text-xs font-bold text-primary hover:text-primary/85 group"
              >
                <span>{language === "vi" ? "Tìm hiểu thêm" : "Learn More"}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SPECIALISTS SECTION */}
      <section className="bg-background-secondary py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
                {language === "vi" ? "ĐỘI NGŨ CHUYÊN GIA" : "OUR PSYCHOLOGISTS"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
                {language === "vi" ? "Gặp gỡ những chuyên gia tận tâm" : "Accompained by certified specialists"}
              </h2>
            </div>
            <Link
              href="/specialists"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>{language === "vi" ? "Xem toàn bộ chuyên gia" : "View All Experts"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((sp) => (
              <div 
                key={sp.id}
                className="bg-card border border-border rounded-3xl p-6 shadow-premium flex flex-col justify-between hover:border-primary/45 transition-all"
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 text-3xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    {sp.avatar}
                  </div>
                  
                  <h3 className="font-heading font-bold text-base text-foreground mb-1">
                    {sp.name}
                  </h3>
                  
                  <span className="block text-[11px] text-primary font-bold uppercase tracking-wider subheading mb-3">
                    {sp.experience}
                  </span>

                  <p className="text-[11px] text-foreground-secondary leading-relaxed line-clamp-3 mb-4">
                    {sp.bio}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 mb-6 bg-background-secondary py-1.5 px-3 rounded-full w-fit mx-auto border border-border">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-xs font-bold text-foreground">{sp.rating}</span>
                    <span className="text-[10px] text-foreground-secondary">({sp.reviewsCount} {language === "vi" ? "đánh giá" : "reviews"})</span>
                  </div>
                </div>

                <Link
                  href={`/specialists/${sp.id}`}
                  className="w-full bg-primary hover:bg-primary/95 text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {language === "vi" ? "Xem hồ sơ & Đặt lịch" : "Profile & Booking"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">{language === "vi" ? "QUY TRÌNH TƯ VẤN" : "CONSULTING WORKFLOW"}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Các bước hỗ trợ đơn giản và khoa học" : "Simple, Guided & Stress-Free Process"}
          </h2>
          <p className="text-base text-foreground-secondary mt-4 leading-relaxed">
            {language === "vi"
              ? "Chỉ với một vài thao tác, bạn đã có thể bắt đầu tiếp cận được với dịch vụ hỗ trợ tinh thần chuyên nghiệp."
              : "Access counseling support safely in 4 straightforward digital steps."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-card border border-border p-6 rounded-[2rem] shadow-premium hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between items-start text-left relative overflow-hidden group hover:translate-y-[-4px]"
            >
              {/* Step indicator badge */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-xl bg-background-secondary border border-border flex items-center justify-center font-heading font-black text-xs text-primary group-hover:bg-primary group-hover:text-white transition-all">
                {p.step}
              </div>

              <div className="w-full">
                {/* Title */}
                <h3 className="font-heading font-bold text-base text-foreground mb-2 mt-4 pr-10">
                  {language === "vi" ? p.titleVi : p.titleEn}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-foreground-secondary leading-relaxed mb-4">
                  {language === "vi" ? p.descVi : p.descEn}
                </p>
              </div>

              {/* Realistic Detail Mock Widgets */}
              <div className="w-full mt-2">
                {/* Step 1: Self-Assessment Widget */}
                {idx === 0 && (
                  <div className="w-full bg-background-secondary border border-border rounded-xl p-3 text-left space-y-1.5 shadow-inner">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-foreground">
                      <div className="w-3.5 h-3.5 rounded bg-primary/20 text-primary flex items-center justify-center text-[8px]">✓</div>
                      <span>{language === "vi" ? "Khảo sát lo âu thi cử" : "Exam Anxiety Scale"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-foreground">
                      <div className="w-3.5 h-3.5 rounded bg-primary/20 text-primary flex items-center justify-center text-[8px]">✓</div>
                      <span>{language === "vi" ? "Đo áp lực học tập (PSS)" : "Academic Stress (PSS)"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-foreground-secondary">
                      <div className="w-3.5 h-3.5 rounded border border-border flex items-center justify-center text-[8px]" />
                      <span>{language === "vi" ? "Nhận diện cảm xúc" : "Emotion Recognition"}</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Results Widget */}
                {idx === 1 && (
                  <div className="w-full bg-background-secondary border border-border rounded-xl p-3 text-left shadow-inner flex flex-col items-center">
                    <div className="text-[10px] font-bold text-foreground mb-1.5">{language === "vi" ? "Mức độ stress: Trung bình" : "Stress Level: Moderate"}</div>
                    <div className="w-full bg-border h-2 rounded-full overflow-hidden mb-1.5">
                      <div className="bg-gradient-to-r from-secondary to-accent h-full w-[65%]" />
                    </div>
                    <div className="text-[9px] text-foreground-secondary font-semibold">{language === "vi" ? "Khuyên dùng: Luyện thở hộp" : "Recommended: Box Breathing"}</div>
                  </div>
                )}

                {/* Step 3: Booking Scheduler Widget */}
                {idx === 2 && (
                  <div className="w-full bg-background-secondary border border-border rounded-xl p-3 text-left shadow-inner">
                    <div className="text-[9px] text-foreground-secondary font-bold mb-1.5">{language === "vi" ? "Khung giờ rảnh chuyên gia" : "Available Therapist Slots"}</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="py-1 px-1.5 bg-border text-[9px] text-center text-foreground-secondary/40 rounded font-bold cursor-not-allowed">09:00</div>
                      <div className="py-1 px-1.5 bg-primary/15 border border-primary/25 text-[9px] text-center text-primary rounded font-bold animate-pulse">14:30</div>
                    </div>
                  </div>
                )}

                {/* Step 4: Connecting Room Widget */}
                {idx === 3 && (
                  <div className="w-full bg-background-secondary border border-border rounded-xl p-3 text-left shadow-inner flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-[10px]">👩‍⚕️</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-bold text-foreground truncate">{language === "vi" ? "TS. Nguyễn Thị Mai" : "Dr. Nguyen Mai"}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[8px] text-foreground-secondary leading-none">{language === "vi" ? "Đang kết nối..." : "Connecting..."}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 7. SKILLS COURSES */}
      <section className="bg-background-secondary py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">
                {language === "vi" ? "KHÓA HỌC KỸ NĂNG" : "LIFE SKILL COURSES"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
                {language === "vi" ? "Chủ động rèn luyện trí tuệ cảm xúc" : "Nurture Emotional Intelligence"}
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>{language === "vi" ? "Xem tất cả khóa học" : "Explore All Courses"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-card border border-border rounded-3xl p-6 shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-2xl mb-4">
                    {course.image}
                  </div>
                  
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider mb-3">
                    {course.category}
                  </span>

                  <h3 className="font-heading font-bold text-base text-foreground mb-3 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="border-t border-divider pt-4 flex items-center justify-between mt-auto">
                  <span className="text-xs text-foreground-secondary font-medium">
                    {course.duration}
                  </span>
                  
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <span>{course.enrolled ? (language === "vi" ? "Học tiếp" : "Continue") : (language === "vi" ? "Xem chi tiết" : "Details")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Resources Left */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
              {language === "vi" ? "TÀI NGUYÊN TÂM LÝ" : "MENTAL WELLNESS LIBRARY"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
              {language === "vi" ? "Thư viện tài liệu hỗ trợ miễn phí" : "Free Self-Care Wellness Assets"}
            </h2>
            <p className="text-base text-foreground-secondary mt-4 leading-relaxed">
              {language === "vi"
                ? "Tải về các tệp cẩm nang Ebook hướng dẫn ứng phó Stress, lắng nghe Podcast chữa lành từ chuyên gia, và tham khảo các cẩm nang chỉ dẫn tự xoa dịu cảm xúc hữu ích."
                : "Download ebook survival manuals dealing with stress, listen to guided meditation podcasts, and print checklist guides to ease emotional spikes."}
            </p>
            <div className="mt-8">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 rounded-2xl font-bold text-base shadow-premium hover:translate-y-[-2px] transition-all"
              >
                <span>{language === "vi" ? "Khám phá thư viện" : "Browse Library"}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

          {/* Resources Right (Interactive Bento Assets grid mockup) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-background-section border border-border flex gap-4 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">🎧</div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">Podcast &quot;Học cách thở ôm&quot;</h4>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">Podcast hướng dẫn thiền định và xoa dịu lo âu kỳ thi dài 15 phút.</p>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-3">Nghe Podcast</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background-alt border border-border flex gap-4 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">📖</div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">Ebook &quot;Giải mã Gen Z&quot;</h4>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">Tài liệu giúp phụ huynh thấu hiểu thế giới của con trong kỷ nguyên số.</p>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mt-3">Tải Ebook (PDF)</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background-alt border border-border flex gap-4 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">📋</div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">Checklist &quot;Cắt giảm lo âu&quot;</h4>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">Bảng theo dõi cảm xúc hàng ngày giúp bạn duy trì cân bằng cuộc sống.</p>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mt-3">Tải Checklist</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-background-section border border-border flex gap-4 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">🎬</div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">Video thiền chánh niệm học đường</h4>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">Loạt video hướng dẫn các động tác kéo giãn cơ thể giảm căng thẳng.</p>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-3">Xem Video</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. BLOG SECTION */}
      <section className="bg-background-secondary py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
                {language === "vi" ? "GÓC CHIA SẺ CẢM XÚC" : "LATEST ARTICLES"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
                {language === "vi" ? "Bài viết nổi bật từ chuyên gia" : "Expert articles & wellness blogs"}
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span>{language === "vi" ? "Xem tất cả bài viết" : "Read All Blogs"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <div 
                key={b.slug}
                className="bg-card border border-border rounded-3xl p-6 shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-2xl mb-4">
                    {b.image}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
                      {b.category}
                    </span>
                    <span className="text-[10px] text-foreground-secondary">{b.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-foreground mb-3 leading-snug line-clamp-2">
                    {b.title}
                  </h3>

                  <p className="text-xs text-foreground-secondary leading-relaxed line-clamp-3 mb-6">
                    {b.summary}
                  </p>
                </div>

                <div className="border-t border-divider pt-4 flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-foreground-secondary font-semibold uppercase tracking-wider">
                    {b.author}
                  </span>
                  
                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
                  >
                    <span>{language === "vi" ? "Đọc tiếp" : "Read Article"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INSPIRING STORIES (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-secondary tracking-wider uppercase subheading">
            {language === "vi" ? "CÂU CHUYỆN TRUYỀN CẢM HỨNG" : "STUDENT SUCCESS STORIES"}
          </span>
          <h2 className="text-3xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Những bước chuyển mình ấm áp" : "Warm words of healing and trust"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-background-section border border-border shadow-premium relative">
              <span className="absolute top-6 right-8 text-6xl text-primary/10 font-serif leading-none select-none">&quot;</span>
              <p className="text-sm text-foreground leading-relaxed italic relative z-10 mb-6">
                &ldquo;{language === "vi" ? t.quoteVi : t.quoteEn}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* Replacing simple emoji avatars with actual rounded visual photo elements */}
                <div className="w-9 h-9 rounded-full overflow-hidden border border-border shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.relation === "Student" ? "/hero.png" : "/parent.png"}
                    alt={t.author}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="block text-xs text-foreground font-bold">{t.author}</span>
                  <span className="block text-[10px] text-foreground-secondary uppercase tracking-wider">{t.relation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">{language === "vi" ? "CÂU HỎI THƯỜNG GẶP" : "FAQ"}</span>
          <h2 className="text-3xl font-extrabold text-foreground mt-3">
            {language === "vi" ? "Giải đáp thắc mắc của bạn" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
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
                  <span>{language === "vi" ? faq.qVi : faq.qEn}</span>
                  <ChevronRight className={`w-5 h-5 text-foreground-secondary shrink-0 transition-transform ${
                    isOpen ? "rotate-90 text-primary" : ""
                  }`} />
                </button>
                
                <div className={`transition-all duration-300 ${
                  isOpen ? "max-h-[200px] border-t border-divider opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}>
                  <p className="px-6 py-5 text-xs text-foreground-secondary leading-relaxed">
                    {language === "vi" ? faq.aVi : faq.aEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FINAL APPOINTMENT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-tr from-primary via-primary/95 to-secondary text-white text-center shadow-premium relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-accent tracking-wider uppercase subheading block mb-4">
              {language === "vi" ? "CHÚNG TÔI LUÔN Ở ĐÂY ĐỂ ĐỒNG HÀNH CÙNG BẠN" : "WE ARE ALWAYS HERE FOR YOU"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              {language === "vi" ? "Bắt đầu hành trình cân bằng tinh thần ngay hôm nay" : "Take the first step towards a peaceful mind"}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-8 max-w-[55ch] mx-auto">
              {language === "vi"
                ? "Dành thời gian chăm sóc tâm trí là khoản đầu tư tốt nhất cho tương lai học tập và cuộc sống của bạn."
                : "Caring for your mind is the best investment you can make for your future studies and health."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/booking"
                className="bg-white text-primary hover:bg-white/95 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all"
              >
                {language === "vi" ? "Đặt lịch trò chuyện 1-1" : "Book a 1-1 Chat"}
              </Link>
              <Link
                href="/assessment"
                className="bg-transparent border border-white/30 hover:border-white text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
              >
                {language === "vi" ? "Làm đánh giá tâm lý" : "Start Wellness Screening"}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
