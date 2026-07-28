"use client";

import React from "react";
import { useAppState } from "@/context/AppContext";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppState();

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            className={`p-4 rounded-xl shadow-premium border flex items-start gap-3 glass ${
              toast.type === "success"
                ? "border-secondary/40 text-emerald-800 dark:text-emerald-300"
                : toast.type === "error"
                ? "border-highlight/40 text-rose-800 dark:text-rose-300"
                : "border-primary/40 text-primary dark:text-blue-300"
            }`}
          >
            <div className="mt-0.5">
              {toast.type === "success" && <CheckCircle className="w-5 h-5 text-secondary" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-highlight" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-primary" />}
            </div>
            
            <div className="flex-1 text-sm font-medium">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-foreground-secondary hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
