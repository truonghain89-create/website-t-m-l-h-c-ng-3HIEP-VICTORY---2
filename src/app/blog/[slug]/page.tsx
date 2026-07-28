"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAppState, Blog } from "@/context/AppContext";
import { ArrowLeft, Clock, Heart, Share2 } from "lucide-react";

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = useParams();
  const { language, blogs, addToast } = useAppState();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [likesCount, setLikesCount] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      const found = blogs.find(b => b.slug === slug);
      if (found) {
        setBlog(found);
      } else {
        router.push("/blog");
      }
    }
  }, [slug, blogs, router]);

  if (!blog) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-foreground-secondary">Đang tải nội dung bài viết...</p>
      </div>
    );
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
      addToast(
        language === "vi" ? "Cảm ơn bạn đã yêu thích bài viết này!" : "Thank you for liking this article!",
        "success"
      );
    }
  };

  const handleShare = () => {
    addToast(
      language === "vi" ? "Đã sao chép đường dẫn bài viết!" : "Copied article link to clipboard!",
      "success"
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-foreground-secondary hover:text-foreground font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "vi" ? "Quay lại danh mục Blog" : "Back to Blog"}</span>
        </Link>
      </div>

      {/* Article Header block */}
      <section className="text-left border-b border-divider pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="text-[10px] text-foreground-secondary flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
          {blog.title}
        </h1>

        <p className="text-sm text-foreground-secondary leading-relaxed font-semibold italic mb-6">
          {blog.summary}
        </p>

        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 font-bold text-sm text-primary flex items-center justify-center">
              ✍️
            </div>
            <div>
              <span className="block text-xs font-bold text-foreground">{blog.author}</span>
              <span className="block text-[9px] text-foreground-secondary">{blog.date}</span>
            </div>
          </div>

          {/* Social shares */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hasLiked 
                  ? "bg-highlight/15 border-highlight/40 text-highlight" 
                  : "bg-background-secondary border-border text-foreground-secondary hover:text-foreground"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-border bg-background-secondary text-foreground-secondary hover:text-foreground transition-all"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Reading Content Layout */}
      <article className="prose prose-sm max-w-none text-foreground leading-relaxed space-y-6">
        
        {/* Render paragraphs correctly */}
        {blog.content.split("\n\n").map((para, index) => {
          // Render headers if starts with ###
          if (para.startsWith("###")) {
            return (
              <h3 key={index} className="font-heading font-bold text-lg text-foreground pt-4 mb-2">
                {para.replace("###", "").trim()}
              </h3>
            );
          }
          // Render lists if bullet points
          if (para.startsWith("-") || para.includes("\n-")) {
            return (
              <ul key={index} className="list-disc pl-5 space-y-2 text-xs text-foreground-secondary">
                {para.split("\n").map((li, lIdx) => (
                  <li key={lIdx} className="leading-relaxed">
                    {li.replace("-", "").trim()}
                  </li>
                ))}
              </ul>
            );
          }
          // Default paragraph
          return (
            <p key={index} className="text-xs text-foreground-secondary leading-relaxed font-semibold">
              {para}
            </p>
          );
        })}

      </article>

      {/* Related Banner / Call to Action */}
      <section className="bg-background-section p-6 rounded-3xl border border-border shadow-sm mt-12 text-center">
        <h4 className="font-heading font-bold text-sm text-foreground mb-2">
          {language === "vi" ? "Bạn cần hỗ trợ từ chuyên gia tâm lý học đường?" : "Do you need counseling support?"}
        </h4>
        <p className="text-xs text-foreground-secondary max-w-lg mx-auto mb-4 leading-relaxed">
          {language === "vi"
            ? "Mọi căng thẳng của bạn đều có thể được xoa dịu. Hãy liên hệ đặt lịch tư vấn trực tuyến hoặc làm khảo sát sức khỏe tinh thần."
            : "Your stress can be managed. Schedule an anonymous session with a therapist."}
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/booking"
            className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            {language === "vi" ? "Đặt lịch tư vấn" : "Book session"}
          </Link>
          <Link
            href="/assessment"
            className="bg-background-secondary border border-border hover:bg-border text-foreground px-5 py-2 rounded-xl text-xs font-bold transition-all"
          >
            {language === "vi" ? "Làm đánh giá" : "Screening check"}
          </Link>
        </div>
      </section>

    </div>
  );
}
