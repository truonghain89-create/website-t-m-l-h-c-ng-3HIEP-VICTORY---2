"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { 
  ShieldAlert, Sparkles, PhoneCall, Calendar, RefreshCw, Heart, FileText, CheckCircle2 
} from "lucide-react";

export default function AssessmentResultsPage() {
  const router = useRouter();
  const { language, assessmentResult, resetAssessment } = useAppState();

  // If no result is present (e.g. direct url navigation), redirect back to assessment page
  useEffect(() => {
    if (!assessmentResult) {
      router.push("/assessment");
    }
  }, [assessmentResult, router]);

  if (!assessmentResult) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-foreground-secondary">Đang tải kết quả...</p>
      </div>
    );
  }

  const { score, riskLevel, recommendations, categoryScores } = assessmentResult;

  const getRiskLabel = (level: typeof riskLevel) => {
    switch (level) {
      case "high":
        return language === "vi" ? "Mức độ Căng thẳng Cao" : "High Stress Level";
      case "medium":
        return language === "vi" ? "Mức độ Căng thẳng Trung bình" : "Moderate Stress Level";
      default:
        return language === "vi" ? "Mức độ Cân bằng Tốt (Nhẹ)" : "Low / Healthy Level";
    }
  };

  const getRiskColor = (level: typeof riskLevel) => {
    switch (level) {
      case "high": return "bg-highlight/15 text-highlight border-highlight/30";
      case "medium": return "bg-accent/15 text-amber-700 dark:text-amber-300 border-accent/30";
      default: return "bg-secondary/15 text-secondary border-secondary/30";
    }
  };

  const getRiskDesc = (level: typeof riskLevel) => {
    switch (level) {
      case "high":
        return language === "vi"
          ? "Bạn đang trải qua những căng thẳng hoặc lo lắng ở mức độ cao. Cảm xúc này có thể đang ảnh hưởng tới kết quả học tập và cuộc sống hàng ngày. Việc liên hệ tham vấn cùng thầy cô hoặc chuyên gia tâm lý học đường là quyết định rất hữu ích lúc này."
          : "You are experiencing higher stress levels which may interfere with study performance or daily activities. Connecting with a campus therapist is highly recommended.";
      case "medium":
        return language === "vi"
          ? "Trạng thái tâm lý của bạn có một vài áp lực lo lắng ở mức trung bình. Đây là trạng thái tự nhiên trong kỳ thi cử. Bạn có thể cải thiện bằng việc tự rèn luyện chánh niệm và cân bằng giờ học tập - nghỉ ngơi."
          : "Your results indicate moderate tension. This is common during busy academic terms. Implementing self-care checks and mindfulness techniques will help you regain balance.";
      default:
        return language === "vi"
          ? "Chúc mừng! Mức độ căng thẳng của bạn đang ở mức lành mạnh, kiểm soát tốt. Hãy tiếp tục duy trì lối sống điều độ, thể dục thể thao và thói quen ngủ tốt."
          : "Your stress indicator is within a healthy, manageable range. Keep practicing good sleep schedules and regular physical activities.";
    }
  };

  const handleRetake = () => {
    resetAssessment();
    router.push("/assessment");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-10">
      
      {/* Result Introduction Card */}
      <section className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-premium flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Left Side: Score display gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-36 h-36 rounded-full border-8 border-background-secondary flex flex-col items-center justify-center bg-card shadow-sm">
            <span className="text-4xl font-extrabold text-primary font-heading">{score}</span>
            <span className="text-[10px] text-foreground-secondary font-bold uppercase tracking-widest mt-1">/ 40 {language === "vi" ? "điểm" : "score"}</span>
            
            {/* Soft inner color indicator ring based on risk level */}
            <div className={`absolute inset-[-4px] rounded-full border-4 border-transparent ${
              riskLevel === "high" ? "border-t-highlight border-r-highlight" :
              riskLevel === "medium" ? "border-t-accent border-r-accent" :
              "border-t-secondary border-r-secondary"
            } transform rotate-45`} />
          </div>
          <span className="text-xs text-foreground-secondary font-medium mt-3">{language === "vi" ? "Tổng điểm sàng lọc" : "Total Screening Score"}</span>
        </div>

        {/* Right Side: Risk text details */}
        <div className="flex-1 text-center md:text-left">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold mb-4 subheading ${getRiskColor(riskLevel)}`}>
            <ShieldAlert className="w-4 h-4" />
            <span>{getRiskLabel(riskLevel)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-snug mb-4">
            {language === "vi" ? "Phân tích kết quả của bạn" : "Wellness Analysis Summary"}
          </h1>

          <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
            {getRiskDesc(riskLevel)}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              href="/booking"
              className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === "vi" ? "Đặt lịch tư vấn chuyên gia" : "Book Counseling"}</span>
            </Link>
            <button
              onClick={handleRetake}
              className="bg-background-secondary border border-border hover:bg-border text-foreground px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === "vi" ? "Làm lại trắc nghiệm" : "Retake Test"}</span>
            </button>
          </div>
        </div>

      </section>

      {/* Category Breakdown (Custom HTML bar chart) */}
      <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-premium">
        <h3 className="font-heading font-bold text-base text-foreground mb-6">
          {language === "vi" ? "Chi tiết mức độ rủi ro theo khía cạnh" : "Risk Breakdown by Dimension"}
        </h3>
        
        <div className="space-y-6">
          {[
            { 
              nameVi: "Lo âu học tập", 
              nameEn: "Academic Anxiety", 
              score: categoryScores.anxiety, 
              descVi: "Phản ánh lo lắng về bài kiểm tra, điểm số và kỳ vọng.",
              descEn: "Reflects worry about scores, tests, and future."
            },
            { 
              nameVi: "Căng thẳng (Stress)", 
              nameEn: "Perceived Stress", 
              score: categoryScores.stress, 
              descVi: "Mức độ quá tải công việc, khó ngủ và bồn chồn cơ thể.",
              descEn: "Work overload, physical tension, and sleep blocks."
            },
            { 
              nameVi: "Suy nhược tinh thần", 
              nameEn: "Emotional Burnout", 
              score: categoryScores.depression, 
              descVi: "Cảm giác mệt mỏi kéo dài, mất động lực và tự trách bản thân.",
              descEn: "Prolonged fatigue, lack of study motivation."
            }
          ].map((cat, idx) => {
            // Percent calculated based on score out of 10
            const percentage = cat.score * 10;
            const barColor = riskLevel === "high" ? "bg-highlight" : riskLevel === "medium" ? "bg-accent" : "bg-secondary";
            
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-heading font-bold text-sm text-foreground">
                      {language === "vi" ? cat.nameVi : cat.nameEn}
                    </span>
                    <span className="block text-[11px] text-foreground-secondary mt-0.5">
                      {language === "vi" ? cat.descVi : cat.descEn}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{cat.score} / 10</span>
                </div>

                {/* Animated bar progress */}
                <div className="w-full bg-background-secondary h-3 rounded-full overflow-hidden border border-border">
                  <div 
                    className={`h-full ${barColor} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Actionable Recommendations */}
      <section className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-premium">
        <h3 className="font-heading font-bold text-base text-foreground mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <span>{language === "vi" ? "Gợi ý tự rèn luyện khuyến nghị cho bạn" : "Your Wellness Guidelines"}</span>
        </h3>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background-secondary border border-border">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-xs text-foreground-secondary leading-relaxed font-semibold">
                {rec}
              </p>
            </div>
          ))}
        </div>

        {/* Suggest Courses if stress is not low */}
        {riskLevel !== "low" && (
          <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-bold text-sm text-foreground">
                {language === "vi" ? "Khuyên dùng: Khóa học 'Chế ngự Căng thẳng'" : "Recommended: 'Overcoming Stress' Course"}
              </h4>
              <p className="text-xs text-foreground-secondary mt-1">
                Tìm hiểu thêm các kỹ thuật thở hộp, sắp xếp Pomodoro học tập để giảm lo âu.
              </p>
            </div>
            <Link
              href="/courses/1"
              className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm"
            >
              {language === "vi" ? "Học thử miễn phí" : "Join Free Course"}
            </Link>
          </div>
        )}
      </section>

    </div>
  );
}
