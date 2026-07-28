"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const { language, blogs } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Stress", "Gia đình", "Quản lý cảm xúc"];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                          b.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-primary tracking-wider uppercase subheading">
          {language === "vi" ? "GÓC CHIA SẺ CẢM XÚC" : "MINDFUL BLOG"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">
          {language === "vi" ? "Bài viết chia sẻ tâm lý học đường" : "Nurture your mind with knowledge"}
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {language === "vi"
            ? "Tuyển tập bài viết hữu ích về cách ứng phó áp lực thi cử, chánh niệm học đường và cẩm nang đồng hành sức khỏe tinh thần từ chuyên gia."
            : "Expertly curated columns, guidance manuals, and mental health checklists written by our therapists."}
        </p>
      </section>

      {/* Search and Filters */}
      <section className="bg-card border border-border p-6 rounded-3xl shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-foreground-secondary absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === "vi" ? "Tìm bài viết..." : "Search articles..."}
            className="w-full bg-background-secondary border border-border pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none focus:border-primary text-foreground"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "bg-background-secondary border-border text-foreground-secondary hover:text-foreground hover:bg-border/30"
              }`}
            >
              {cat === "All" ? (language === "vi" ? "Tất cả chủ đề" : "All fields") : cat}
            </button>
          ))}
        </div>

      </section>

      {/* Editorial Posts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((b) => (
            <div 
              key={b.slug}
              className="bg-card border border-border rounded-[2rem] p-6 shadow-premium hover:border-primary/45 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover Placeholder */}
                <div className="w-full h-40 rounded-2xl bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/5 flex items-center justify-center text-4xl mb-5 border border-border/40">
                  {b.image}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider">
                    {b.category}
                  </span>
                  <span className="text-[10px] text-foreground-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{b.readTime}</span>
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-foreground leading-snug mb-3 line-clamp-2">
                  {b.title}
                </h3>

                <p className="text-xs text-foreground-secondary leading-relaxed mb-6 line-clamp-3">
                  {b.summary}
                </p>
              </div>

              <div className="border-t border-divider pt-4 flex items-center justify-between mt-auto">
                <div>
                  <span className="block text-[10px] text-foreground font-bold uppercase tracking-wider">
                    {b.author}
                  </span>
                  <span className="block text-[9px] text-foreground-secondary mt-0.5">{b.date}</span>
                </div>
                
                <Link
                  href={`/blog/${b.slug}`}
                  className="inline-flex items-center gap-1 bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  <span>{language === "vi" ? "Đọc tiếp" : "Read More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl block mb-4">📝</span>
            <h3 className="font-heading font-bold text-base text-foreground">
              {language === "vi" ? "Không có bài viết phù hợp" : "No articles found"}
            </h3>
            <p className="text-xs text-foreground-secondary mt-1">
              {language === "vi" ? "Vui lòng đổi từ khóa hoặc chủ đề tìm kiếm." : "Try changing search terms or filters."}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
