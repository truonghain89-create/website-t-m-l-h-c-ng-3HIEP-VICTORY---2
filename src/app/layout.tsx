import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ui/ToastContainer";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
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
          {/* Animated Background Blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] opacity-45 dark:opacity-20">
            <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/20 blur-[100px] animate-blob-1" />
            <div className="absolute bottom-[30%] right-[15%] w-96 h-96 rounded-full bg-secondary/20 blur-[120px] animate-blob-2" />
            <div className="absolute top-[50%] left-[60%] w-80 h-80 rounded-full bg-accent/20 blur-[110px] animate-blob-3" />
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
