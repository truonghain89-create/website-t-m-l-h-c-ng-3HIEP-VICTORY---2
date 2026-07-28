"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAppState, Course } from "@/context/AppContext";
import { ArrowLeft, Play, CheckCircle2, Award, ClipboardCheck, Video, HelpCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { language, courses, enrollInCourse, completeLesson, submitCourseQuiz } = useAppState();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"lessons" | "quiz">("lessons");
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (id) {
      const found = courses.find(c => c.id === Number(id));
      if (found) {
        setCourse(found);
      } else {
        router.push("/courses");
      }
    }
  }, [id, courses, router]);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-foreground-secondary">Đang tải chi tiết khóa học...</p>
      </div>
    );
  }

  const handleLessonSelect = (idx: number) => {
    setActiveLessonIdx(idx);
    setActiveTab("lessons");
  };

  const handleMarkComplete = (lessonId: number) => {
    completeLesson(course.id, lessonId);
  };

  const handleQuizAnswer = (qIdx: number, val: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    course.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / course.quiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    submitCourseQuiz(course.id, score);
  };

  const activeLesson = course.lessons[activeLessonIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8">
      
      {/* Header breadcrumb */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-foreground font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "vi" ? "Quay lại danh mục khóa học" : "Back to Courses"}</span>
        </Link>
      </div>

      {/* Course general title */}
      <section>
        <span className="text-xs font-bold text-primary uppercase tracking-wider block subheading">{course.category}</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">{course.title}</h1>
      </section>

      {/* Not Enrolled Gate */}
      {!course.enrolled ? (
        <section className="bg-card border border-border p-8 rounded-[2rem] shadow-premium text-center max-w-xl mx-auto my-8">
          <span className="text-5xl block mb-4">🔓</span>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">
            {language === "vi" ? "Khóa học chưa được kích hoạt" : "Course is locked"}
          </h2>
          <p className="text-xs text-foreground-secondary leading-relaxed mb-6">
            Đăng ký tham gia khóa học hoàn toàn miễn phí để bắt đầu xem các video bài giảng và thực hiện các thử thách kỹ năng cảm xúc học đường.
          </p>
          <button
            onClick={() => enrollInCourse(course.id)}
            className="bg-primary hover:bg-primary/95 text-white px-8 py-3 rounded-xl text-xs font-bold shadow-premium transition-all"
          >
            {language === "vi" ? "Đăng ký học ngay (Miễn phí)" : "Enroll Free Now"}
          </button>
        </section>
      ) : (
        /* Enrolled Learning layout split */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: player, details, quiz tabs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Learning tabs */}
            <div className="flex gap-2 border-b border-divider pb-2">
              <button
                onClick={() => setActiveTab("lessons")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "lessons" 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                {language === "vi" ? "Nội dung bài học" : "Video Lecture"}
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "quiz" 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-foreground-secondary hover:bg-background-secondary"
                }`}
              >
                {language === "vi" ? "Bài trắc nghiệm cuối khóa" : "Final Course Quiz"}
              </button>
            </div>

            {/* TAB CONTENT: VIDEO & DISCUSSIONS */}
            <AnimatePresence mode="wait">
              {activeTab === "lessons" ? (
                <motion.div
                  key="lessons-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  {/* Video Mock Container */}
                  <div className="relative w-full aspect-video rounded-3xl bg-slate-950 border border-border shadow-premium overflow-hidden flex flex-col justify-between p-6">
                    {/* Top bar info overlay */}
                    <div className="z-10 bg-black/60 px-4 py-2 rounded-xl text-[11px] font-bold text-white max-w-fit flex items-center gap-1.5 backdrop-blur-sm">
                      <Video className="w-3.5 h-3.5 text-secondary" />
                      <span>{activeLesson?.title}</span>
                    </div>

                    {/* Middle play trigger overlay */}
                    <div className="flex justify-center items-center">
                      <button 
                        onClick={() => handleMarkComplete(activeLesson.id)}
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur transition-all border border-white/20 shadow-md group"
                        title="Play video"
                      >
                        <Play className="w-6 h-6 fill-current group-hover:scale-105 transition-transform" />
                      </button>
                    </div>

                    {/* Bottom progress bar overlay */}
                    <div className="flex justify-between items-center z-10 text-[10px] text-white/80 bg-black/50 p-2 rounded-xl backdrop-blur-sm">
                      <span>{activeLesson?.duration}</span>
                      <button 
                        onClick={() => handleMarkComplete(activeLesson.id)}
                        className="text-secondary font-bold hover:underline"
                      >
                        {activeLesson?.completed ? (language === "vi" ? "✓ Đã hoàn thành" : "Completed") : (language === "vi" ? "Đánh dấu hoàn thành" : "Mark Complete")}
                      </button>
                    </div>

                    {/* Decorative backdrop shapes */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Lesson detail descriptions */}
                  <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium">
                    <h3 className="font-heading font-bold text-base text-foreground mb-3">
                      {activeLesson?.title}
                    </h3>
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      Trong bài học này, bạn sẽ làm quen với các khái niệm căn bản và các bài tập rèn luyện chánh niệm học tập. Hãy dành 15 phút yên tĩnh, tập trung lắng nghe và chuẩn bị một cuốn sổ ghi chép cảm xúc nhé.
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* TAB CONTENT: FINAL QUIZ */
                <motion.div
                  key="quiz-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-premium"
                >
                  {quizSubmitted ? (
                    /* Quiz Results Card */
                    <div className="text-center py-6">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center mx-auto mb-6">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                        {language === "vi" ? "Chúc mừng bạn đã hoàn thành!" : "Congratulations on finishing!"}
                      </h3>
                      <p className="text-xs text-foreground-secondary leading-relaxed max-w-md mx-auto mb-6">
                        {language === "vi" 
                          ? `Bạn đã hoàn thành xuất sắc bài kiểm tra cuối khóa học với điểm số: ${quizScore}/100. Chứng nhận số hóa của bạn đã sẵn sàng.`
                          : `You completed the check-up quiz successfully with score: ${quizScore}/100. Your certificate is unlocked.`}
                      </p>
                      
                      <div className="inline-flex items-center gap-1.5 bg-secondary/15 text-secondary px-4 py-2 rounded-xl text-xs font-bold mb-8">
                        <Award className="w-4 h-4" />
                        <span>{language === "vi" ? "Kỹ năng kiểm soát cảm xúc học đường" : "Certified in Stress Coping"}</span>
                      </div>

                      <div>
                        <button
                          onClick={() => setQuizSubmitted(false)}
                          className="bg-background-secondary border border-border hover:bg-border text-foreground px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                        >
                          {language === "vi" ? "Làm lại bài kiểm tra" : "Retake Quiz"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Active Quiz Form questions */
                    <form onSubmit={handleQuizSubmit} className="space-y-8">
                      <div className="flex gap-2 items-center text-xs text-foreground-secondary font-bold uppercase tracking-wider mb-2">
                        <ClipboardCheck className="w-4 h-4 text-primary" />
                        <span>{language === "vi" ? "Hoàn thành các thử thách lý thuyết bên dưới" : "Verify your knowledge"}</span>
                      </div>

                      {course.quiz.map((q, qIdx) => (
                        <div key={qIdx} className="space-y-3">
                          <h4 className="font-heading font-bold text-sm text-foreground">
                            {qIdx + 1}. {q.question}
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = quizAnswers[qIdx] === oIdx;
                              return (
                                <div
                                  key={oIdx}
                                  onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-3 ${
                                    isSelected 
                                      ? "border-primary bg-primary/5 text-primary" 
                                      : "border-border text-foreground-secondary hover:bg-background-secondary"
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? "border-primary" : "border-border"
                                  }`}>
                                    {isSelected && <div className="w-2 h-2 bg-primary rounded-full" />}
                                  </div>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      <div className="border-t border-divider pt-6 mt-8 flex justify-end">
                        <button
                          type="submit"
                          disabled={Object.keys(quizAnswers).length < course.quiz.length}
                          className="bg-primary hover:bg-primary/95 disabled:opacity-40 disabled:pointer-events-none text-white px-8 py-3 rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          {language === "vi" ? "Gửi bài & Nhận chứng nhận" : "Submit Quiz & Get Certified"}
                        </button>
                      </div>

                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right panel: Course playlist outline */}
          <div className="lg:col-span-4 bg-card border border-border p-6 rounded-3xl shadow-premium">
            <div className="flex justify-between items-center pb-4 border-b border-divider mb-4">
              <h3 className="font-heading font-bold text-sm text-foreground">
                {language === "vi" ? "Danh sách bài học" : "Course Playlist"}
              </h3>
              <span className="text-[10px] text-foreground-secondary font-bold">
                {course.lessons.filter(l => l.completed).length} / {course.lessons.length} {language === "vi" ? "đã xong" : "done"}
              </span>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, idx) => {
                const isActive = idx === activeLessonIdx;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonSelect(idx)}
                    className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-start gap-3 ${
                      isActive 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border text-foreground-secondary hover:bg-background-secondary"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-secondary" />
                      ) : (
                        <Play className={`w-4 h-4 ${isActive ? "text-primary" : "text-foreground-secondary"}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <span className={`block leading-snug ${isActive ? "font-bold text-foreground" : ""}`}>
                        {lesson.title}
                      </span>
                      <span className="block text-[10px] text-foreground-secondary mt-1">{lesson.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-divider">
              <div className="flex justify-between text-xs font-bold text-foreground-secondary mb-2">
                <span>{language === "vi" ? "Hoàn thành khóa học" : "Course Completion"}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-background-secondary h-2.5 rounded-full overflow-hidden border border-border">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
