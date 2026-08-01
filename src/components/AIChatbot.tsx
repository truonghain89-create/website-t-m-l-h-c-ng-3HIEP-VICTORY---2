"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppState } from "@/context/AppContext";
import { 
  MessageCircle, X, Send, Sparkles, RotateCcw, 
  HelpCircle, Frown, Smile, Heart, Shield, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const { language } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: language === "vi" 
            ? "Xin chào! Tôi là **MindBot** - trợ lý hỗ trợ sức khỏe tinh thần của bạn. 🌸\n\nTôi có thể giúp bạn giải đáp các vấn đề về căng thẳng học tập, lo âu thi cử, hướng dẫn thực hành chánh niệm hoặc kết nối chuyên gia. Bạn đang cảm thấy thế nào hôm nay?"
            : "Hello! I am **MindBot** - your mental wellness assistant. 🌸\n\nI can help you navigate academic stress, exam anxiety, mindfulness practices, or book a specialist. How are you feeling today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [language, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickReplies = language === "vi" 
    ? [
        { label: "Tôi bị áp lực thi cử 📚", text: "Tôi bị áp lực thi cử và điểm số" },
        { label: "Làm sao giảm lo âu? 🌿", text: "Làm sao để giải tỏa căng thẳng và lo âu nhanh?" },
        { label: "Cách tập thiền chánh niệm? 🧘", text: "Hướng dẫn tôi thực hành chánh niệm" },
        { label: "Đặt lịch với Chuyên gia 🗓️", text: "Tôi muốn đặt lịch tư vấn với chuyên gia tâm lý" }
      ]
    : [
        { label: "Academic stress 📚", text: "I am feeling stressed about exams and grades" },
        { label: "How to reduce anxiety? 🌿", text: "How to quickly relieve stress and anxiety?" },
        { label: "Mindfulness practice 🧘", text: "Guide me on how to practice mindfulness" },
        { label: "Book a Counselor 🗓️", text: "I want to book a session with a psychologist" }
      ];

  const getAIResponse = (input: string): string => {
    const cleanInput = input.toLowerCase().trim();

    if (language === "vi") {
      if (cleanInput.includes("stress") || cleanInput.includes("áp lực") || cleanInput.includes("thi cử") || cleanInput.includes("học tập") || cleanInput.includes("điểm số")) {
        return "Tôi rất thấu hiểu cảm giác căng thẳng và áp lực thi cử bạn đang trải qua. Hãy áp dụng 3 bước nhỏ sau để giải tỏa stress học tập:\n\n1. 🌬️ **Phương pháp thở 4-7-8**: Hít vào bằng mũi trong 4 giây, giữ hơi 7 giây và thở ra chậm qua miệng trong 8 giây. Tập trung vào hơi thở trong 5 phút.\n2. ⏱️ **Kỹ thuật Pomodoro**: Chia nhỏ thời gian học thành các chu kỳ 25 phút tập trung, sau đó nghỉ ngơi hoàn toàn 5 phút để tái tạo năng lượng.\n3. 💧 **Nuôi dưỡng cơ thể**: Uống đủ nước, ngủ đủ giấc (7-8 tiếng) giúp cân bằng nồng độ cortisol (hormone căng thẳng) trong cơ thể.\n\n👉 Bạn có thể tự đánh giá mức độ căng thẳng của mình qua bài **[Khảo sát tâm lý học đường](/assessment)** miễn phí của chúng tôi.";
      }
      if (cleanInput.includes("lo âu") || cleanInput.includes("hoảng sợ") || cleanInput.includes("lo sợ") || cleanInput.includes("căng thẳng") || cleanInput.includes("sợ")) {
        return "Khi cảm xúc lo âu hoặc bất an ập đến, bạn hãy thử bài tập **5-4-3-2-1** để giúp tâm trí quay về trạng thái cân bằng trong hiện tại:\n\n* 👀 **5 vật**: Tìm và gọi tên 5 đồ vật xung quanh bạn.\n* 🤚 **4 cảm giác**: Cảm nhận 4 bề mặt tiếp xúc (mặt bàn, sợi vải quần áo, sàn nhà nâng đỡ chân).\n* 👂 **3 âm thanh**: Lắng nghe và nhận diện 3 tiếng động nhỏ (tiếng gió, tiếng xe, tiếng quạt).\n* 👃 **2 mùi**: Tập trung nhận biết 2 mùi hương bạn ngửi thấy.\n* 👅 **1 vị**: Cảm nhận 1 hương vị trong khoang miệng của bạn.\n\nBài tập này giúp kích hoạt hệ thần kinh phó giao cảm, giảm nhịp tim và mang lại sự bình tĩnh nhanh chóng.";
      }
      if (cleanInput.includes("đặt lịch") || cleanInput.includes("tư vấn") || cleanInput.includes("chuyên gia") || cleanInput.includes("lịch hẹn") || cleanInput.includes("trò chuyện") || cleanInput.includes("chữa lành") || cleanInput.includes("gặp")) {
        return "Để giải quyết sâu sắc hơn các khúc mắc tâm lý, bạn có thể nhận sự trợ giúp trực tiếp 1-1 từ các chuyên gia tâm lý học đường. Quy trình đặt lịch rất đơn giản:\n\n1. Truy cập mục **[Đặt lịch tư vấn](/booking)**.\n2. Lựa chọn một **[Chuyên viên phù hợp](/specialists)** dựa trên chuyên môn và đánh giá.\n3. Chọn ngày, giờ và phương thức trò chuyện thuận tiện nhất cho bạn (Online qua video hoặc Offline tại phòng tâm lý trường).\n\n🔒 *Lưu ý: Mọi thông tin trò chuyện của bạn và chuyên gia đều được bảo mật tuyệt đối.*";
      }
      if (cleanInput.includes("thiền") || cleanInput.includes("chánh niệm") || cleanInput.includes("mindful") || cleanInput.includes("thư giãn") || cleanInput.includes("hơi thở")) {
        return "Tuyệt vời! Chánh niệm là một phương pháp tuyệt vời để neo giữ tâm trí ở hiện tại. Bạn có thể bắt đầu với 3 cách thực hành đơn giản hàng ngày:\n\n1. 🧘 **Thiền thở ngắn**: Nhắm mắt, hướng sự chú ý hoàn toàn vào luồng không khí đi vào và đi ra qua hai cánh mũi. Khi tâm trí đi lan man, hãy nhẹ nhàng kéo nó quay lại với hơi thở.\n2. 🚶 **Đi bộ chánh niệm**: Cảm nhận trọn vẹn lực nâng đỡ của mặt đất tiếp xúc với lòng bàn chân theo từng bước đi chậm rãi.\n3. 🍎 **Ăn trong chánh niệm**: Ăn một miếng táo hoặc một hạt khô chậm rãi, cảm nhận độ giòn, vị ngọt, hương thơm của đồ ăn mà không dùng điện thoại.\n\nBạn có thể tải về các bộ cẩm nang hướng dẫn đầy đủ hơn trong **[Thư viện cẩm nang tự chăm sóc](/resources)**.";
      }
      if (cleanInput.includes("buồn") || cleanInput.includes("khóc") || cleanInput.includes("cô đơn") || cleanInput.includes("mệt mỏi") || cleanInput.includes("chán")) {
        return "Cảm giác buồn bã, cô đơn hay mệt mỏi là những phản ứng tự nhiên của tâm hồn trước những biến cố cuộc sống. Bạn không cần phải cố tỏ ra mạnh mẽ và bạn không cô độc:\n\n* ✏️ **Viết ra cảm xúc**: Hãy viết tự do mọi suy nghĩ ra giấy để giải phóng gánh nặng trong lòng.\n* 🌳 **Tiếp xúc với thiên nhiên**: Dành 10 phút đi bộ dưới tán cây xanh giúp tăng nồng độ serotonin (hormone hạnh phúc).\n* 👥 **Kết nối sẻ chia**: Hãy chia sẻ cùng một người bạn tin cậy, giáo viên cố vấn hoặc liên hệ đặt lịch tư vấn cùng chuyên gia MindCare để được nâng đỡ kịp thời.\n\nTôi luôn ở đây để lắng nghe bất cứ lúc nào bạn cần giải tỏa.";
      }
      return "Cảm ơn bạn đã chia sẻ. Để đồng hành cùng bạn tốt nhất, tôi đề xuất bạn nên làm thử bài **[Đánh giá tâm lý học đường](/assessment)** tự động để nhận diện rõ hơn cảm xúc của mình, hoặc **[Đặt lịch hẹn trò chuyện](/booking)** với đội ngũ chuyên gia của chúng tôi.\n\nBạn có muốn hỏi thêm tôi về các chủ đề căng thẳng thi cử, lo âu, chánh niệm hay quy trình tư vấn không?";
    } else {
      // English responses
      if (cleanInput.includes("stress") || cleanInput.includes("academic") || cleanInput.includes("exam") || cleanInput.includes("study") || cleanInput.includes("grade")) {
        return "I completely understand the stress and academic pressure you are facing. Try these 3 steps to relieve exam anxiety:\n\n1. 🌬️ **4-7-8 Breathing Technique**: Inhale through your nose for 4s, hold for 7s, and exhale slowly through your mouth for 8s. Practice for 5 minutes.\n2. ⏱️ **Pomodoro Method**: Break study sessions into 25-minute periods of absolute focus, followed by a 5-minute offline break to recharge.\n3. 💧 **Hydration & Rest**: Drink water and aim for 7-8 hours of sleep to normalize cortisol (stress hormone) levels.\n\n👉 You can evaluate your stress levels using our free **[Wellness Assessment](/assessment)**.";
      }
      if (cleanInput.includes("anxiety") || cleanInput.includes("panic") || cleanInput.includes("afraid") || cleanInput.includes("anxious") || cleanInput.includes("nervous")) {
        return "When anxiety hits, use the **5-4-3-2-1 Grounding Method** to quickly calm your nervous system:\n\n* 👀 **5 Things**: Look around and name 5 visual objects in your room.\n* 🤚 **4 Sensations**: Feel 4 textures (the desk surface, your clothes, the floor support).\n* 👂 **3 Sounds**: Listen and identify 3 distinct sounds nearby.\n* 👃 **2 Smells**: Focus and identify 2 scents you can smell.\n* 👅 **1 Taste**: Focus on 1 taste currently in your mouth.\n\nThis exercise brings your brain back to the present moment and reduces panic symptoms.";
      }
      if (cleanInput.includes("book") || cleanInput.includes("consult") || cleanInput.includes("counselor") || cleanInput.includes("appointment") || cleanInput.includes("specialist") || cleanInput.includes("session")) {
        return "To resolve deeper personal blocks, you can engage in private 1-1 therapy sessions with our licensed school psychologists. Booking takes only a minute:\n\n1. Head to the **[Booking Page](/booking)**.\n2. Choose a **[Specialist](/specialists)** based on their clinical background.\n3. Pick your preferred date, time, and session format (Online via private video or In-person at the campus wellness room).\n\n🔒 *Note: All sessions are fully confidential and bound by strict ethical privacy codes.*";
      }
      if (cleanInput.includes("meditat") || cleanInput.includes("mindful") || cleanInput.includes("breath") || cleanInput.includes("relax")) {
        return "Mindfulness is a great practice to anchor yourself in the present. Try these 3 simple daily exercises:\n\n1. 🧘 **Focused Breathing**: Sit comfortably, close your eyes, and follow the air entering and leaving your nostrils. Gently guide your mind back whenever it wanders.\n2. 🚶 **Mindful Walking**: Pay attention to the physical sensation of your feet lifting, moving, and connecting with the ground.\n3. 🍎 **Mindful Eating**: Eat a small piece of fruit slowly, fully experiencing its texture, aroma, crunch, and taste.\n\nFind complete step-by-step manuals in our **[Self-Care Library](/resources)**.";
      }
      if (cleanInput.includes("sad") || cleanInput.includes("lonely") || cleanInput.includes("depressed") || cleanInput.includes("tired") || cleanInput.includes("cry")) {
        return "Feeling sad, lonely, or exhausted is a valid and natural human experience. You do not have to walk through this alone:\n\n* ✏️ **Journaling**: Write down your thoughts freely without filtering or judgment.\n* 🌳 **Connect with Nature**: A 10-minute walk under trees increases serotonin (happiness hormone).\n* 👥 **Talk it out**: Reach out to a trusted friend, a school teacher, or book a session with a MindCare psychologist.\n\nI am always here to listen whenever you need a safe space.";
      }
      return "Thank you for sharing. To support you best, I suggest taking a short **[Wellness Assessment](/assessment)** to identify your feelings, or **[Book a Session](/booking)** to talk to a clinical counselor.\n\nWould you like to ask me about academic pressure, calming exercises, mindfulness, or our consultation process?";
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = getAIResponse(text);
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: language === "vi" 
          ? "Tôi đã dọn sạch cuộc hội thoại. Hãy chia sẻ với tôi bất cứ điều gì bạn đang bận tâm nhé!"
          : "Chat history cleared. Feel free to share whatever is on your mind!",
        timestamp: new Date()
      }
    ]);
  };

  // Convert markdown links [text](/path) and bold texts **text** into JSX/HTML safely
  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let formattedLine = line;
      
      // Bold format **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(formattedLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(formattedLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-foreground dark:text-white">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < formattedLine.length) {
        parts.push(formattedLine.substring(lastIndex));
      }
      
      // If there was bold formatting, join elements, else use line
      let content: React.ReactNode = parts.length > 0 ? parts : formattedLine;

      // Handle Markdown Links [text](/path) inside the line (simplified replacement)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      if (typeof formattedLine === "string" && formattedLine.match(linkRegex)) {
        const linkParts: React.ReactNode[] = [];
        let linkLastIdx = 0;
        let linkMatch;
        const lineStr = formattedLine;
        
        while ((linkMatch = linkRegex.exec(lineStr)) !== null) {
          if (linkMatch.index > linkLastIdx) {
            linkParts.push(lineStr.substring(linkLastIdx, linkMatch.index));
          }
          linkParts.push(
            <Link 
              key={linkMatch.index} 
              href={linkMatch[2]}
              onClick={() => setIsOpen(false)} // Close bot window when navigating
              className="text-primary font-bold underline hover:text-primary/80 transition-colors"
            >
              {linkMatch[1]}
            </Link>
          );
          linkLastIdx = linkRegex.lastIndex;
        }
        if (linkLastIdx < lineStr.length) {
          linkParts.push(lineStr.substring(linkLastIdx));
        }
        content = linkParts;
      }

      return (
        <p key={idx} className={line.startsWith("* ") || line.startsWith("- ") ? "pl-4 list-item list-disc ml-2 mt-1" : "mt-1.5"}>
          {content}
        </p>
      );
    });
  };

  return (
    <>
      {/* ═══ FLOATING ACTION BUTTON (FAB) ═══ */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          whileHover={{ scale: 1.08 }}
          whileActive={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg border border-white/20 focus:outline-none"
          aria-label="Open AI Assistant"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                {/* Notification Badge Pulsing */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full border-2 border-white dark:border-black animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-highlight rounded-full border-2 border-white dark:border-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ═══ CHAT PANEL ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[550px] rounded-3xl glass border border-border shadow-xl z-[9999] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border bg-background-secondary/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-foreground leading-tight">MindBot</h3>
                  <span className="text-[10px] text-foreground-secondary font-medium flex items-center gap-1">
                    {language === "vi" ? "Trợ lý tinh thần trực tuyến" : "AI Wellness Assistant"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearChat}
                  title={language === "vi" ? "Dọn sạch hội thoại" : "Clear Chat"}
                  className="p-2 rounded-xl text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-background/20 scrollbar">
              {messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-none"
                      : "bg-card border border-border text-foreground-secondary rounded-bl-none"
                  }`}>
                    {msg.sender === "bot" ? (
                      <div className="space-y-1">
                        {formatMessageText(msg.text)}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className={`block text-[9px] mt-1.5 opacity-60 text-right ${
                      msg.sender === "user" ? "text-white/80" : "text-foreground-secondary"
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border text-foreground-secondary rounded-2xl rounded-bl-none px-4 py-3 shadow-xs">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies suggestion bar */}
            {messages.length === 1 && !isTyping && (
              <div className="px-5 py-2 overflow-x-auto flex gap-2 border-t border-border bg-background-secondary/20 no-scrollbar">
                {quickReplies.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qr.text)}
                    className="flex-shrink-0 px-3.5 py-1.5 rounded-full border border-border/80 bg-card text-[10px] font-semibold text-foreground-secondary hover:text-primary hover:border-primary/40 transition-all shadow-xs"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-4 border-t border-border bg-background-secondary/40 flex gap-2.5 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={language === "vi" ? "Hãy trò chuyện cùng MindBot..." : "Chat with MindBot..."}
                className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-foreground-secondary/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all shadow-xs"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm hover:bg-primary/95 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shrink-0"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
