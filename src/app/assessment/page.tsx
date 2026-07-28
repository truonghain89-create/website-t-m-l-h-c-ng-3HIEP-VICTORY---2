"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/AppContext";
import { ClipboardCheck, ArrowLeft, ArrowRight, Brain, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    id: 1,
    textVi: "Bạn có cảm thấy bồn chồn, lo lắng hoặc căng thẳng vì áp lực bài vở gần đây không?",
    textEn: "Have you felt nervous, anxious, or stressed due to recent academic workload?"
  },
  {
    id: 2,
    textVi: "Bạn có gặp khó khăn trong việc kiểm soát hoặc ngừng lo lắng về các kỳ thi sắp tới?",
    textEn: "Have you had trouble controlling or stopping worry about upcoming exams?"
  },
  {
    id: 3,
    textVi: "Bạn có thường xuyên cảm thấy mệt mỏi, kiệt sức học đường hoặc thiếu năng lượng học tập?",
    textEn: "Have you frequently felt fatigued, academically burnt out, or lacking energy?"
  },
  {
    id: 4,
    textVi: "Bạn có gặp khó khăn trong việc đi vào giấc ngủ, ngủ không ngon hoặc ngủ quá nhiều vì lo âu?",
    textEn: "Have you had trouble falling asleep, staying asleep, or sleeping too much due to worry?"
  },
  {
    id: 5,
    textVi: "Bạn có thấy mình dễ nổi nóng, cáu gắt hoặc thiếu kiên nhẫn với bạn bè và người thân?",
    textEn: "Have you felt easily annoyed, irritable, or impatient with peers and family?"
  },
  {
    id: 6,
    textVi: "Bạn có cảm giác sợ hãi hoặc bất an như thể có điều gì tồi tệ sắp xảy ra với kết quả học tập?",
    textEn: "Have you felt afraid or insecure as if something bad was going to happen to your grades?"
  },
  {
    id: 7,
    textVi: "Bạn có cảm thấy khó tập trung ôn tập khi nghe giảng trên lớp hoặc khi tự học ở nhà?",
    textEn: "Have you found it hard to concentrate during lectures or while studying at home?"
  },
  {
    id: 8,
    textVi: "Bạn có cảm thấy chán nản, mất động lực và không còn hứng thú với các hoạt động yêu thích thường ngày?",
    textEn: "Have you felt down, demotivated, and lost interest in hobbies you usually enjoy?"
  },
  {
    id: 9,
    textVi: "Bạn có suy nghĩ tự trách móc bản thân, cảm thấy mình thất bại hoặc là gánh nặng cho gia đình?",
    textEn: "Have you had self-critical thoughts, felt like a failure, or felt like a burden to your family?"
  },
  {
    id: 10,
    textVi: "Bạn có cảm thấy lo sợ về định hướng tương lai và cảm thấy thiếu niềm tin/hy vọng?",
    textEn: "Have you felt anxious about your future direction and lacked hope or faith?"
  }
];

const OPTIONS = [
  { value: 1, labelVi: "Hoàn toàn không", labelEn: "Not at all" },
  { value: 2, labelVi: "Thỉnh thoảng (Vài ngày)", labelEn: "Several days" },
  { value: 3, labelVi: "Thường xuyên (Hơn nửa số ngày)", labelEn: "More than half the days" },
  { value: 4, labelVi: "Hầu như mỗi ngày", labelEn: "Nearly every day" }
];

export default function AssessmentPage() {
  const router = useRouter();
  const { language, assessmentAnswers, setAssessmentAnswers, calculateAssessmentResult, resetAssessment } = useAppState();
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeQuestion = QUESTIONS[currentIdx];
  const progressPercent = started ? Math.round(((currentIdx) / QUESTIONS.length) * 100) : 0;

  const handleSelectOption = (val: number) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: val
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Last question completed, process and redirect
      calculateAssessmentResult();
      router.push("/assessment/results");
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleStart = () => {
    resetAssessment();
    setStarted(true);
    setCurrentIdx(0);
  };

  const currentSelection = assessmentAnswers[activeQuestion?.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      
      <AnimatePresence mode="wait">
        {!started ? (
          /* Welcome Assessment Screen */
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-premium text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <Brain className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
              {language === "vi" ? "SÀNG LỌC TÂM LÝ SƠ BỘ" : "MENTAL WELLNESS CHECK"}
            </span>
            
            <h1 className="text-3xl font-extrabold text-foreground mt-4 mb-6 leading-tight">
              {language === "vi" ? "Đánh giá sức khỏe tinh thần học đường" : "School Mental Health Screening Test"}
            </h1>
            
            <p className="text-sm text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-8">
              {language === "vi"
                ? "Khảo sát này bao gồm 10 câu hỏi ngắn dựa trên thang đo khoa học lo âu học đường chuẩn. Hãy chọn đáp án mô tả đúng nhất trạng thái của bạn trong vòng 2 tuần gần nhất. Thông tin trả lời của bạn hoàn toàn bảo mật."
                : "This screening contains 10 short questions based on standard educational stress scales. Select the options representing your state over the last 2 weeks. All responses are private."}
            </p>

            {/* Disclaimer details */}
            <div className="p-4 rounded-xl bg-highlight/5 border border-highlight/10 flex items-start gap-3 max-w-xl mx-auto text-left mb-8">
              <AlertCircle className="w-4.5 h-4.5 text-highlight shrink-0 mt-0.5" />
              <p className="text-[11px] text-foreground-secondary leading-relaxed">
                {language === "vi"
                  ? "Lưu ý: Kết quả trắc nghiệm mang tính chất sàng lọc sơ bộ nhằm hỗ trợ định hướng tự rèn luyện và không thay thế cho chẩn đoán y khoa chuyên sâu từ bác sĩ chuyên khoa thần kinh hoặc nhà trị liệu lâm sàng."
                  : "Important: This screening provides preliminary indicators and wellness guidelines, not a replacement for clinical psychiatric or neurological diagnosis."}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-premium transition-all"
            >
              <ClipboardCheck className="w-5 h-5" />
              <span>{language === "vi" ? "Bắt đầu làm trắc nghiệm" : "Begin Screening Test"}</span>
            </button>
          </motion.div>
        ) : (
          /* Active Question Wizard Screen */
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-premium"
          >
            
            {/* Header info */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setStarted(false)}
                className="text-xs text-foreground-secondary hover:text-foreground flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === "vi" ? "Thoát khảo sát" : "Quit"}</span>
              </button>
              
              <span className="text-xs text-primary font-bold">
                {language === "vi" ? "Câu hỏi" : "Question"} {currentIdx + 1} / {QUESTIONS.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-background-secondary h-2.5 rounded-full overflow-hidden border border-border mb-8">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="my-8">
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-foreground leading-snug">
                {language === "vi" ? activeQuestion.textVi : activeQuestion.textEn}
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-4 my-8">
              {OPTIONS.map((opt) => {
                const isSelected = currentSelection === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-semibold transition-all flex items-center gap-4 ${
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary shadow-sm" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-primary" : "border-border"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span>{language === "vi" ? opt.labelVi : opt.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Stepper Actions footer */}
            <div className="flex justify-between items-center border-t border-divider pt-6 mt-8">
              <button
                onClick={handleBack}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-border text-foreground-secondary hover:bg-background-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === "vi" ? "Quay lại" : "Back"}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!currentSelection}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary/95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                <span>
                  {currentIdx === QUESTIONS.length - 1 
                    ? (language === "vi" ? "Hoàn thành & Xem kết quả" : "Submit & See Results")
                    : (language === "vi" ? "Tiếp theo" : "Next")}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
