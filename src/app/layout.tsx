import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const headingFont = Space_Grotesk({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindCare School - Nền tảng chăm sóc sức khỏe tinh thần học đường",
  description: "MindCare là người bạn đồng hành của học sinh, sinh viên, phụ huynh và giáo viên, cung cấp dịch vụ đánh giá tâm lý học đường, tư vấn trị liệu chuyên nghiệp và các khóa học kỹ năng sống hiệu quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <AppContextProvider>
          {/* Animated Background Mesh */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] opacity-30 dark:opacity-15">
            <div className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full bg-primary/20 blur-[120px] animate-blob-1" />
            <div className="absolute bottom-[25%] right-[12%] w-96 h-96 rounded-full bg-secondary/15 blur-[140px] animate-blob-2" />
            <div className="absolute top-[55%] left-[55%] w-72 h-72 rounded-full bg-accent/15 blur-[120px] animate-blob-3" />
            <div className="absolute top-[10%] right-[30%] w-64 h-64 rounded-full bg-highlight/10 blur-[100px] animate-blob-4" />
          </div>
          <Header />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </AppContextProvider>
      </body>
    </html>
  );
}
