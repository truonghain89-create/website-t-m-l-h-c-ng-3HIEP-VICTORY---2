"use client";

import React from "react";
import { useAppState } from "@/context/AppContext";
import { Heart, Shield, Award, Users, Compass, BookOpen, AlertCircle, Frown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function AboutPage() {
  const { language } = useAppState();
  const [activeTab, setActiveTab] = React.useState<"vn" | "intl">("vn");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-xl border border-border shadow-md text-xs">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-primary font-bold mt-1">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

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

      {/* Mental Health Statistics Dashboard */}
      <section className="bg-background py-16 transition-colors border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
              {language === "vi" ? "THỰC TRẠNG & THỐNG KÊ" : "REALITY & STATISTICS"}
            </span>
            <h2 className="text-3xl font-extrabold text-foreground mt-3">
              {language === "vi" ? "Bức tranh toàn cảnh về Sức khỏe Tâm thần Học đường" : "The Big Picture of School Mental Health"}
            </h2>
            <p className="text-sm text-foreground-secondary mt-3 max-w-2xl mx-auto">
              {language === "vi" 
                ? "Những con số biết nói từ UNICEF và WHO cho thấy tầm quan trọng của việc nâng cao nhận thức và hỗ trợ sức khỏe tinh thần kịp thời cho thanh thiếu niên."
                : "Real figures from UNICEF and WHO reveal the urgent need for mental health awareness and early intervention in adolescents."}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="relative flex p-1 bg-background-secondary border border-border rounded-full shadow-sm max-w-md w-full">
              <button
                onClick={() => setActiveTab("vn")}
                className={`relative flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${
                  activeTab === "vn" ? "text-primary-foreground" : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {activeTab === "vn" && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {language === "vi" ? "Thực trạng tại Việt Nam" : "Situation in Vietnam"}
              </button>
              <button
                onClick={() => setActiveTab("intl")}
                className={`relative flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${
                  activeTab === "intl" ? "text-primary-foreground" : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {activeTab === "intl" && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {language === "vi" ? "Thống kê quốc tế" : "International Statistics"}
              </button>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="relative min-h-[500px]">
            {mounted ? (
              <AnimatePresence mode="wait">
                {activeTab === "vn" ? (
                  <motion.div
                    key="vn-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {/* Left Column: Visual Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Donut Chart: 1 in 5 (20%) */}
                      <div className="card-premium p-6 flex flex-col justify-between items-center text-center">
                        <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">
                          Vấn đề Sức khỏe Tâm thần
                        </h4>
                        <div className="w-full h-40 relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Gặp vấn đề", value: 20 },
                                  { name: "Khác", value: 80 }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                <Cell fill="#8B5CF6" />
                                <Cell fill="var(--border)" />
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="font-heading font-extrabold text-2xl text-primary">20%</span>
                            <span className="text-[10px] text-foreground-secondary uppercase font-semibold">1 trong 5</span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-secondary mt-4">
                          Gần 20% thanh thiếu niên Việt Nam gặp vấn đề về tâm lý, chủ yếu là lo âu và trầm cảm (UNICEF).
                        </p>
                      </div>

                      {/* Bar Chart: Gap in Parent's Recognition (20% vs 5%) */}
                      <div className="card-premium p-6 flex flex-col justify-between items-center text-center">
                        <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">
                          Khoảng cách Nhận thức
                        </h4>
                        <div className="w-full h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "Trẻ cần hỗ trợ", value: 20, fill: "#8B5CF6" },
                                { name: "PH nhận ra", value: 5, fill: "#F43F5E" }
                              ]}
                              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                              <XAxis dataKey="name" stroke="var(--foreground-secondary)" fontSize={10} tickLine={false} />
                              <YAxis domain={[0, 30]} stroke="var(--foreground-secondary)" fontSize={10} tickLine={false} />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                <Cell fill="#8B5CF6" />
                                <Cell fill="#F43F5E" />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-foreground-secondary mt-4">
                          Chỉ 5% phụ huynh nhận biết con mình cần hỗ trợ tâm lý, cho thấy nhận thức xã hội còn thấp.
                        </p>
                      </div>

                      {/* Bullying & Help-seeking Gap */}
                      <div className="card-premium p-6 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col gap-3">
                          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                            Bạo lực & Tìm kiếm Sự trợ giúp
                          </h4>
                          <p className="text-xs text-foreground-secondary leading-relaxed">
                            Bạo lực học đường và bắt nạt trên mạng vẫn diễn ra phổ biến. Khoảng <strong>1/5</strong> trẻ từng là nạn nhân, trong đó phần lớn không biết tìm hỗ trợ từ đâu.
                          </p>
                        </div>
                        <div className="flex gap-4 items-center justify-around">
                          {/* 20% Bullied */}
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 relative flex items-center justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Bị bắt nạt", value: 20 },
                                      { name: "Khác", value: 80 }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={28}
                                    outerRadius={38}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                  >
                                    <Cell fill="#F59E0B" />
                                    <Cell fill="var(--border)" />
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              <span className="absolute font-heading font-bold text-sm text-accent">20%</span>
                            </div>
                            <span className="text-[10px] font-semibold text-foreground mt-2 text-center">Bị bắt nạt</span>
                          </div>

                          {/* 75% Don't know where to help */}
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 relative flex items-center justify-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: "Không biết nơi giúp", value: 75 },
                                      { name: "Khác", value: 25 }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={28}
                                    outerRadius={38}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                  >
                                    <Cell fill="#F43F5E" />
                                    <Cell fill="var(--border)" />
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              <span className="absolute font-heading font-bold text-sm text-highlight">75%</span>
                            </div>
                            <span className="text-[10px] font-semibold text-foreground mt-2 text-center">Mơ hồ nguồn lực</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Detailed Context and Cards */}
                    <div className="flex flex-col justify-between gap-6">
                      <div className="bg-background-section border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary tracking-wider uppercase mb-3 block">Bối cảnh Việt Nam</span>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                          Nguy cơ lớn từ áp lực học tập
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                          Nghiên cứu của UNICEF và Bộ Giáo dục & Đào tạo chỉ ra môi trường học tập ảnh hưởng trực tiếp tới sức khỏe tâm thần của học sinh.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Áp lực thi cử & thành tích</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Sự kỳ vọng thái quá về học lực tạo căng thẳng liên tục, kích hoạt các biểu hiện lo âu.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                              <Users className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Mối quan hệ học đường</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Xung đột bạn bè, khoảng cách với giáo viên là những tác nhân làm tăng nguy cơ cô độc.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-accent/10 text-accent">
                              <Compass className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Thiếu sự thấu hiểu từ phụ huynh</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Sự thiếu cởi mở trong gia đình khiến học sinh âm thầm chịu đựng mà không chia sẻ.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="intl-tab"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    {/* Left Column: Visual Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Donut Chart: 14% (1 in 7) */}
                      <div className="card-premium p-6 flex flex-col justify-between items-center text-center">
                        <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">
                          Rối loạn Tâm thần Toàn cầu
                        </h4>
                        <div className="w-full h-40 relative flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Có rối loạn", value: 14 },
                                  { name: "Khác", value: 86 }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={60}
                                startAngle={90}
                                endAngle={-270}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                <Cell fill="#8B5CF6" />
                                <Cell fill="var(--border)" />
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="font-heading font-extrabold text-2xl text-primary">14%</span>
                            <span className="text-[10px] text-foreground-secondary uppercase font-semibold">1 trong 7</span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-secondary mt-4">
                          Theo WHO, khoảng 14% trẻ từ 10–19 tuổi trên toàn cầu đang sống chung với một rối loạn tâm thần.
                        </p>
                      </div>

                      {/* Rank Bar Chart: Suicide ranking */}
                      <div className="card-premium p-6 flex flex-col justify-between items-center text-center">
                        <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-wider">
                          Mối đe dọa hàng đầu
                        </h4>
                        <div className="w-full h-40 flex flex-col justify-center items-center gap-4">
                          <div className="w-full px-2">
                            <div className="flex justify-between text-[11px] mb-1 font-semibold text-foreground">
                              <span>Nguyên nhân tử vong #1 và #2</span>
                              <span>#1-2</span>
                            </div>
                            <div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
                              <div className="bg-foreground-secondary h-full rounded-full" style={{ width: "90%" }}></div>
                            </div>
                          </div>

                          <div className="w-full px-2">
                            <div className="flex justify-between text-[11px] mb-1 font-semibold text-highlight">
                              <span>Tự tử (Nhóm tuổi 15–29)</span>
                              <span>#3</span>
                            </div>
                            <div className="w-full bg-border h-2.5 rounded-full overflow-hidden">
                              <div className="bg-highlight h-full rounded-full animate-pulse" style={{ width: "70%" }}></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-foreground-secondary mt-4">
                          Tự tử là nguyên nhân tử vong đứng thứ ba ở nhóm tuổi 15–29 trên toàn cầu theo báo cáo của WHO.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Detailed Context and Cards */}
                    <div className="flex flex-col justify-between gap-6">
                      <div className="bg-background-section border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center">
                        <span className="text-xs font-bold text-secondary tracking-wider uppercase mb-3 block">Thống kê Thế giới</span>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                          Gánh nặng lớn ở thanh thiếu niên
                        </h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                          Rối loạn lo âu và trầm cảm là gánh nặng hàng đầu, ảnh hưởng trực tiếp tới kết quả học tập và cuộc sống lâu dài của thế hệ trẻ.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-highlight/10 text-highlight">
                              <Frown className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Lo âu & trầm cảm phổ biến nhất</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Là hai dạng rối loạn phổ biến nhất, cản trở việc học và làm tăng nguy cơ mất kết nối xã hội.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Suy giảm chất lượng cuộc sống</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Sức khỏe tinh thần suy giảm làm cản trở sự phát triển lành mạnh và tương lai bền vững.</p>
                            </div>
                          </div>

                          <div className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border">
                            <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                              <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground">Can thiệp & phát hiện muộn</h4>
                              <p className="text-xs text-foreground-secondary mt-1">Phần lớn các trường hợp tự tử hoặc tự hại xuất phát từ việc không được điều trị tâm lý kịp thời.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
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
