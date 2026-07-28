"use client";

import React from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppContext";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  const { language } = useAppState();

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh] gap-6">
      
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 animate-bounce">
        <FileQuestion className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold text-foreground tracking-tight">404</h1>
      
      <h2 className="text-lg font-heading font-bold text-foreground -mt-2">
        {language === "vi" ? "Không tìm thấy trang yêu cầu" : "Page not found"}
      </h2>
      
      <p className="text-xs text-foreground-secondary leading-relaxed max-w-sm">
        {language === "vi"
          ? "Đường dẫn bạn truy cập có thể đã thay đổi hoặc không tồn tại. Đừng lo lắng, hãy quay về trang chủ để bắt đầu lại."
          : "The URL you entered might have changed or been removed. Let's direct you safely home."}
      </p>

      <div className="flex gap-3 mt-4">
        <Link
          href="/"
          className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-premium transition-all flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>{language === "vi" ? "Về Trang chủ" : "Back Home"}</span>
        </Link>
      </div>

    </div>
  );
}
