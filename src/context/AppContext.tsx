"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export type UserRole = "guest" | "student" | "parent" | "specialist";

export interface Specialist {
  id: number;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  price: string;
  bio: string;
  education: string;
  avatar: string;
  specialties: string[];
  availability: string[];
}

export interface Appointment {
  id: string;
  specialistId: number;
  specialistName: string;
  specialistAvatar: string;
  specialistRole: string;
  date: string;
  timeSlot: string;
  format: "online" | "offline";
  notes?: string;
  status: "upcoming" | "completed" | "cancelled";
  meetingLink?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  lessonsCount: number;
  enrolled: boolean;
  progress: number; // 0 to 100
  image: string;
  lessons: { id: number; title: string; duration: string; completed: boolean }[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

export interface Blog {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string;
}

export interface AssessmentResult {
  riskLevel: "low" | "medium" | "high";
  score: number;
  date: string;
  categoryScores: {
    anxiety: number;
    depression: number;
    stress: number;
  };
  recommendations: string[];
}

interface AppContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: "vi" | "en";
  setLanguage: (lang: "vi" | "en") => void;
  specialists: Specialist[];
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, "id" | "status" | "meetingLink">) => void;
  cancelAppointment: (id: string) => void;
  courses: Course[];
  enrollInCourse: (courseId: number) => void;
  completeLesson: (courseId: number, lessonId: number) => void;
  submitCourseQuiz: (courseId: number, score: number) => void;
  blogs: Blog[];
  assessmentAnswers: Record<number, number>;
  setAssessmentAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  assessmentResult: AssessmentResult | null;
  calculateAssessmentResult: () => void;
  resetAssessment: () => void;
  userProfile: {
    name: string;
    email: string;
    school: string;
    grade: string;
    phone: string;
  };
  updateUserProfile: (profile: Partial<AppContextProps["userProfile"]>) => void;
  toasts: { id: string; message: string; type: "success" | "error" | "info" }[];
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Initial Mock Databases
const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: 1,
    name: "TS. Nguyễn Thị Mai",
    role: "Chuyên gia Tâm lý Học đường & Hướng nghiệp",
    experience: "15 năm kinh nghiệm",
    rating: 4.9,
    reviewsCount: 124,
    price: "400.000đ",
    bio: "TS. Nguyễn Thị Mai có nhiều năm nghiên cứu hành vi tâm lý lứa tuổi học sinh, sinh viên tại các trường Đại học Sư phạm hàng đầu. Cô là diễn giả quen thuộc tại các buổi workshop cộng đồng.",
    education: "Tiến sĩ Tâm lý học Lâm sàng Trẻ em & Vị thành niên - ĐH Quốc gia Hà Nội",
    avatar: "👩‍⚕️",
    specialties: ["Áp lực thi cử", "Khủng hoảng tuổi dậy thì", "Định hướng tương lai", "Giao tiếp cha mẹ - con cái"],
    availability: ["Thứ 2 (08:00 - 11:30)", "Thứ 4 (14:00 - 17:30)", "Thứ 7 (09:00 - 16:00)"],
  },
  {
    id: 2,
    name: "ThS. Lê Văn Hải",
    role: "Chuyên gia Tham vấn Tâm lý & Can thiệp Khủng hoảng",
    experience: "8 năm kinh nghiệm",
    rating: 4.8,
    reviewsCount: 89,
    price: "350.000đ",
    bio: "Thầy Lê Văn Hải là một trong những chuyên gia trẻ đầy nhiệt huyết, nổi bật với phong cách tham vấn cởi mở, gần gũi và ứng dụng liệu pháp Nhận thức Hành vi (CBT) để giúp học sinh tháo gỡ lo âu.",
    education: "Thạc sĩ Tâm lý học Lâm sàng - Đại học Toulouse Jean Jaurès (Pháp)",
    avatar: "👨‍⚕️",
    specialties: ["Lo âu học đường", "Trầm cảm nhẹ", "Bạo lực học đường", "Hành vi tự hại"],
    availability: ["Thứ 3 (13:30 - 17:00)", "Thứ 5 (08:30 - 12:00)", "Chủ Nhật (09:00 - 12:00)"],
  },
  {
    id: 3,
    name: "ThS. Phạm Minh Anh",
    role: "Chuyên gia Trị liệu Cảm xúc & Kỹ năng Sống",
    experience: "10 năm kinh nghiệm",
    rating: 4.9,
    reviewsCount: 106,
    price: "380.000đ",
    bio: "Cô Minh Anh tin rằng mỗi đứa trẻ đều có khả năng tự phục hồi mạnh mẽ nếu được lắng nghe chân thành. Cô chuyên sâu về các phương pháp chánh niệm và điều hòa cảm xúc cho học đường.",
    education: "Thạc sĩ Tham vấn học đường - Đại học Melbourne (Úc)",
    avatar: "👩‍⚕️",
    specialties: ["Kiểm soát tức giận", "Bất hòa bạn bè", "Mất động lực học tập", "Chánh niệm (Mindfulness)"],
    availability: ["Thứ 4 (09:00 - 11:30)", "Thứ 6 (14:00 - 19:00)", "Thứ 7 (13:30 - 17:30)"],
  },
  {
    id: 4,
    name: "TS. Trần Thu Trang",
    role: "Chuyên gia Tâm lý Gia đình & Can thiệp Giáo dục",
    experience: "12 năm kinh nghiệm",
    rating: 4.7,
    reviewsCount: 75,
    price: "420.000đ",
    bio: "TS. Trần Thu Trang chuyên làm việc song song với phụ huynh và giáo viên để tạo dựng hệ sinh thái hỗ trợ học sinh một cách đồng bộ, giúp tháo gỡ xung đột khoảng cách thế hệ.",
    education: "Tiến sĩ Giáo dục học & Tâm lý Gia đình - ĐH Birmingham (Anh)",
    avatar: "👩‍⚕️",
    specialties: ["Xung đột gia đình", "Học sinh đặc biệt (ADHD/Autism)", "Kỹ năng làm cha mẹ", "Căng thẳng giáo viên"],
    availability: ["Thứ 2 (14:00 - 17:00)", "Thứ 5 (09:00 - 11:30)", "Thứ 6 (08:30 - 12:00)"],
  },
];

const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: "Chế Ngự Căng Thẳng & Lo Âu Thi Cử",
    description: "Khóa học thực chiến giúp bạn giải mã áp lực, quản lý thời gian ôn thi hiệu quả và đạt trạng thái tâm lý vững vàng nhất khi bước vào phòng thi.",
    category: "Áp lực học tập",
    duration: "4 tuần (8 bài học)",
    lessonsCount: 8,
    enrolled: true,
    progress: 35,
    image: "/course1.png",
    lessons: [
      { id: 101, title: "Bài 1: Hiểu về cơ chế căng thẳng và lo âu", duration: "15 phút", completed: true },
      { id: 102, title: "Bài 2: Nhận diện 'Tiếng nói chỉ trích bản thân'", duration: "20 phút", completed: true },
      { id: 103, title: "Bài 3: Kỹ thuật thở hộp & Chánh niệm giảm stress nhanh", duration: "18 phút", completed: true },
      { id: 104, title: "Bài 4: Sắp xếp thời gian học tập khoa học (Pomodoro)", duration: "22 phút", completed: false },
      { id: 105, title: "Bài 5: Dinh dưỡng và giấc ngủ trước ngày thi lớn", duration: "15 phút", completed: false },
      { id: 106, title: "Bài 6: Xử lý tình trạng 'Đông cứng não' trong phòng thi", duration: "25 phút", completed: false },
      { id: 107, title: "Bài 7: Giải tỏa kỳ vọng từ phía gia đình và xã hội", duration: "20 phút", completed: false },
      { id: 108, title: "Bài 8: Xây dựng tư duy phát triển sau thi cử", duration: "15 phút", completed: false },
    ],
    quiz: [
      {
        question: "Đâu là biểu hiện phổ biến nhất của lo âu học đường?",
        options: [
          "Tim đập nhanh, khó ngủ, mất tập trung",
          "Thèm ăn đồ ngọt liên tục",
          "Muốn đi mua sắm nhiều hơn",
          "Nói nhiều và cười to không rõ nguyên do",
        ],
        correct: 0,
      },
      {
        question: "Phương pháp thở hộp (Box Breathing) có nhịp đếm chuẩn như thế nào?",
        options: [
          "Hít vào 4 giây - Thở ra 4 giây",
          "Hít vào 4s - Giữ hơi 4s - Thở ra 4s - Giữ trống 4s",
          "Hít thật sâu và thở ra thật mạnh",
          "Không có quy luật thời gian",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Trí Tuệ Cảm Xúc (EQ) & Kỹ Năng Kết Nối Bạn Bè",
    description: "Nhận biết, thấu hiểu cảm xúc của bản thân và người khác. Rèn luyện nghệ thuật giao tiếp, giải quyết bất đồng và xây dựng tình bạn lành mạnh.",
    category: "Quản lý cảm xúc",
    duration: "5 tuần (10 bài học)",
    lessonsCount: 10,
    enrolled: false,
    progress: 0,
    image: "/course2.png",
    lessons: [
      { id: 201, title: "Bài 1: Khám phá bản đồ cảm xúc cá nhân", duration: "15 phút", completed: false },
      { id: 202, title: "Bài 2: Tại sao chúng ta lại nổi giận?", duration: "20 phút", completed: false },
      { id: 203, title: "Bài 3: Lắng nghe thấu cảm (Empathic Listening)", duration: "20 phút", completed: false },
      { id: 204, title: "Bài 4: Bày tỏ nhu cầu bằng ngôn ngữ không bạo lực", duration: "22 phút", completed: false },
      { id: 205, title: "Bài 5: Đặt ranh giới cá nhân lành mạnh", duration: "18 phút", completed: false },
      { id: 206, title: "Bài 6: Xử lý bắt nạt học đường bằng sự tự tin", duration: "25 phút", completed: false },
      { id: 207, title: "Bài 7: Giải quyết bất đồng ý kiến nhóm", duration: "20 phút", completed: false },
      { id: 208, title: "Bài 8: Nghệ thuật xin lỗi và tha thứ", duration: "15 phút", completed: false },
      { id: 209, title: "Bài 9: Xây dựng vòng tròn bạn bè tích cực", duration: "18 phút", completed: false },
      { id: 210, title: "Bài 10: Trở thành đại sứ sức khỏe tinh thần", duration: "20 phút", completed: false },
    ],
    quiz: [
      {
        question: "Cốt lõi của lắng nghe thấu cảm là gì?",
        options: [
          "Chuẩn bị sẵn lời khuyên để giải quyết vấn đề",
          "Lắng nghe để hiểu cảm xúc và nhu cầu của đối phương mà không phán xét",
          "Ngắt lời để chỉnh sửa những suy nghĩ sai lệch",
          "Luôn luôn đồng ý với mọi điều đối phương nói",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Làm Bạn Cùng Con Trong Kỷ Nguyên Số",
    description: "Khóa học dành riêng cho phụ huynh để thấu hiểu thế giới nội tâm của thanh thiếu niên Gen Z, kéo gần khoảng cách thế hệ và thảo luận an toàn về mạng xã hội.",
    category: "Dành cho Phụ huynh",
    duration: "3 tuần (6 bài học)",
    lessonsCount: 6,
    enrolled: false,
    progress: 0,
    image: "/course3.png",
    lessons: [
      { id: 301, title: "Bài 1: Sự thay đổi não bộ ở tuổi dậy thì", duration: "20 phút", completed: false },
      { id: 302, title: "Bài 2: Giải mã ngôn ngữ và hành vi của Gen Z", duration: "25 phút", completed: false },
      { id: 303, title: "Bài 3: Tránh các lỗi giao tiếp gây đóng băng đối thoại", duration: "22 phút", completed: false },
      { id: 304, title: "Bài 4: Cùng con thảo luận quy ước thiết bị số", duration: "20 phút", completed: false },
      { id: 305, title: "Bài 5: Nhận diện sớm dấu hiệu trầm cảm & lo âu ở con", duration: "30 phút", completed: false },
      { id: 306, title: "Bài 6: Xây dựng gia đình là bến đỗ an toàn", duration: "18 phút", completed: false },
    ],
    quiz: [
      {
        question: "Hành động nào của cha mẹ hỗ trợ con tốt nhất khi con gặp thất bại học đường?",
        options: [
          "So sánh con với bạn học giỏi hơn để tạo động lực",
          "Trách mắng con lười biếng học tập",
          "Lắng nghe cảm xúc thất vọng của con, đồng cảm và cùng thảo luận giải pháp",
          "Bỏ qua sự việc coi như không có chuyện gì",
        ],
        correct: 2,
      },
    ],
  },
];

const INITIAL_BLOGS: Blog[] = [
  {
    slug: "hieu-va-vuot-qua-hoi-chung-burnout",
    title: "Hiểu và vượt qua hội chứng kiệt sức học đường (Academic Burnout)",
    summary: "Nếu bạn liên tục cảm thấy kiệt sức, mất động lực và điểm số giảm sút, rất có thể bạn đang trải qua Burnout học đường. Cùng chuyên gia nhận diện và tháo gỡ.",
    category: "Stress",
    date: "15 Tháng 7, 2026",
    readTime: "6 phút đọc",
    author: "ThS. Phạm Minh Anh",
    image: "/blog1.png",
    content: "Kiệt sức học đường (Academic Burnout) không chỉ đơn thuần là mệt mỏi sau một kỳ thi căng thẳng. Đó là một trạng thái kiệt quệ kéo dài cả về tinh thần, cảm xúc lẫn thể chất xuất phát từ áp lực học tập quá tải hoặc kỳ vọng quá lớn từ gia đình và bản thân.\n\n### Nhận diện các dấu hiệu Burnout:\n1. **Kiệt quệ thể chất**: Thường xuyên đau đầu, đau vai gáy, mất ngủ mặc dù cơ thể vô cùng mệt mỏi.\n2. **Xa lánh công việc**: Cảm thấy học tập là một gánh nặng cực hình, chán ghét sách vở và các hoạt động câu lạc bộ.\n3. **Giảm hiệu suất học tập**: Khó tập trung, suy giảm trí nhớ, kết quả thi cử đi xuống rõ rệt.\n\n### Làm sao để vượt qua?\n- **Thiết lập ranh giới**: Hãy dũng cảm từ chối các nhiệm vụ không thiết yếu. Sức khỏe tinh thần của bạn là ưu tiên số một.\n- **Thay đổi nhịp sinh hoạt**: Đảm bảo ngủ đủ 7-8 tiếng mỗi ngày. Giấc ngủ chính là lúc bộ não tự chữa lành.\n- **Tìm kiếm sự đồng cảm**: Đừng ngần ngại trò chuyện với một người bạn thân thiết, cha mẹ hoặc liên hệ với phòng tâm lý học đường.",
  },
  {
    slug: "ky-nang-dong-hanh-cung-con-ap-luc",
    title: "Kỹ năng đồng hành cùng con vượt qua áp lực thi cử dành cho cha mẹ",
    summary: "Kỳ thi tốt nghiệp và đại học đang cận kề, sự đồng hành tâm lý của cha mẹ chính là liều thuốc an thần quý giá nhất giúp các con bình tĩnh tự tin.",
    category: "Gia đình",
    date: "12 Tháng 7, 2026",
    readTime: "8 phút đọc",
    author: "TS. Nguyễn Thị Mai",
    image: "/blog2.png",
    content: "Mỗi khi mùa thi đến, áp lực không chỉ đè nặng lên vai học sinh mà còn bao trùm cả không khí gia đình. Tuy nhiên, nhiều bậc phụ huynh vô tình chuyển áp lực lo lắng của chính mình sang con trẻ bằng những lời cằn nhằn hay sự kỳ vọng ngột ngạt.\n\n### Cha mẹ nên làm gì?\n- **Thay đổi cách nói chuyện**: Thay vì hỏi 'Hôm nay con làm được bao nhiêu bài?', hãy hỏi 'Con học có mệt không? Mẹ nấu món con thích nhé!'.\n- **Tạo không gian yên tĩnh**: Giảm thiểu cãi vã, tiếng ồn lớn trong nhà để con tập trung ôn tập tốt hơn.\n- **Không so sánh**: Mỗi đứa trẻ là độc bản, việc so sánh con với 'con nhà người ta' chỉ đẩy con vào bức tường cô độc và tự ti.",
  },
  {
    slug: "chieu-khoa-kiem-soat-con-gian-hoc-duong",
    title: "Chìa khóa kiểm soát cơn giận và xung đột bạn bè chốn học đường",
    summary: "Xung đột bạn bè là điều khó tránh khỏi. Học cách kiểm soát cơn giận giúp bạn bảo vệ các mối quan hệ tốt đẹp và giữ bình yên cho tâm trí.",
    category: "Quản lý cảm xúc",
    date: "10 Tháng 7, 2026",
    readTime: "5 phút đọc",
    author: "ThS. Lê Văn Hải",
    image: "/blog3.png",
    content: "Cơn tức giận là cảm xúc hoàn toàn tự nhiên của con người. Tuy nhiên, hành động dưới tác động của cơn tức giận bộc phát có thể gây ra những tổn thương không đáng có cho các mối quan hệ.\n\n### Nguyên tắc 5 giây làm nguội cơn giận:\n1. **Nhận diện cảm xúc**: Khi thấy lồng ngực thắt lại, giọng nói to hơn, hãy tự nhủ: 'Mình đang giận'.\n2. **Tạm dừng**: Không nói, không nhắn tin trong vòng 5 giây tiếp theo.\n3. **Hít thở sâu**: Thực hiện 3 hơi thở bụng sâu để đưa oxy lên não, giảm nhịp tim.\n4. **Rời đi nếu cần**: Xin phép bạn rời khỏi cuộc tranh luận và quay lại khi cả hai đã bình tĩnh.",
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    specialistId: 1,
    specialistName: "TS. Nguyễn Thị Mai",
    specialistAvatar: "👩‍⚕️",
    specialistRole: "Chuyên gia Tâm lý Học đường & Hướng nghiệp",
    date: "2026-08-05",
    timeSlot: "09:00 - 10:00",
    format: "online",
    notes: "Em gặp áp lực lớn trước kỳ thi thử sắp tới và khó ngủ về đêm.",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
];

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>("guest");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [userProfile, setUserProfile] = useState({
    name: "Nguyễn Minh Khoa",
    email: "minhkhoa.student@school.edu.vn",
    school: "THPT Chuyên Lê Hồng Phong",
    grade: "Lớp 11 Toán 1",
    phone: "0912 345 678",
  });
  const [toasts, setToasts] = useState<AppContextProps["toasts"]>([]);

  // Toast System
  const addToast = (message: string, type: "success" | "error" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Dark Mode side effects
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Dynamic user profiles depending on role selection
    if (newRole === "student") {
      setUserProfile({
        name: "Nguyễn Minh Khoa",
        email: "minhkhoa.student@school.edu.vn",
        school: "THPT Chuyên Lê Hồng Phong",
        grade: "Lớp 11 Toán 1",
        phone: "0912 345 678",
      });
    } else if (newRole === "parent") {
      setUserProfile({
        name: "Nguyễn Văn Hùng",
        email: "vanhung.parent@gmail.com",
        school: "Phụ huynh học sinh Nguyễn Minh Khoa",
        grade: "Gói tư vấn Gia đình",
        phone: "0987 654 321",
      });
    } else if (newRole === "specialist") {
      setUserProfile({
        name: "TS. Nguyễn Thị Mai",
        email: "mai.nguyen@mindcareschool.vn",
        school: "Khoa Tham vấn Học đường",
        grade: "Mã chuyên gia: MC-091",
        phone: "0909 999 888",
      });
    }
    addToast(
      language === "vi"
        ? `Đã chuyển đổi sang vai trò: ${newRole.toUpperCase()}`
        : `Switched perspective to: ${newRole.toUpperCase()}`,
      "info"
    );
  };

  // Book Appointment
  const bookAppointment = (newApt: Omit<Appointment, "id" | "status" | "meetingLink">) => {
    const id = "apt-" + Math.random().toString(36).substring(2, 9);
    const meetingLink = newApt.format === "online" ? "https://meet.google.com/xyz-qprs-tuv" : undefined;
    const appointment: Appointment = {
      ...newApt,
      id,
      status: "upcoming",
      meetingLink,
    };
    setAppointments((prev) => [appointment, ...prev]);
    addToast(
      language === "vi"
        ? "Đặt lịch tư vấn thành công! Vui lòng kiểm tra lịch hẹn."
        : "Appointment booked successfully! Please check your schedule.",
      "success"
    );
  };

  // Cancel Appointment
  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" as const } : apt))
    );
    addToast(
      language === "vi" ? "Đã hủy lịch hẹn tư vấn." : "Appointment has been cancelled.",
      "info"
    );
  };

  // Enroll in Course
  const enrollInCourse = (courseId: number) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, enrolled: true, progress: 0 } : course))
    );
    addToast(
      language === "vi" ? "Đăng ký khóa học thành công!" : "Successfully enrolled in course!",
      "success"
    );
  };

  // Complete Course Lesson
  const completeLesson = (courseId: number, lessonId: number) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        const updatedLessons = course.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = Math.round((completedCount / course.lessons.length) * 100);
        return {
          ...course,
          lessons: updatedLessons,
          progress,
        };
      })
    );
    addToast(
      language === "vi" ? "Đã hoàn thành bài học!" : "Lesson completed!",
      "success"
    );
  };

  // Submit Quiz Score
  const submitCourseQuiz = (courseId: number, score: number) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? { ...course, progress: 100 } : course))
    );
    addToast(
      language === "vi"
        ? `Đã hoàn thành bài kiểm tra! Điểm số của bạn: ${score}/100`
        : `Quiz submitted successfully! Your score: ${score}/100`,
      "success"
    );
  };

  // Mental Health Assessment Processing
  const calculateAssessmentResult = () => {
    const totalQuestions = 10;
    let score = 0;
    // Calculate total score based on selected values (1-4)
    Object.values(assessmentAnswers).forEach((val) => {
      score += val;
    });

    // Score ranges: Max score is 40 (10 questions * 4).
    // Min score is 10 (10 questions * 1).
    // Low risk: 10 - 20
    // Medium risk: 21 - 30
    // High risk: 31 - 40
    let riskLevel: "low" | "medium" | "high" = "low";
    let recommendations: string[] = [];

    if (score <= 20) {
      riskLevel = "low";
      recommendations = [
        "Tiếp tục duy trì thói quen ngủ đủ giấc và thể thao lành mạnh.",
        "Đọc thêm sách và tài nguyên chánh niệm trên thư viện.",
        "Tham gia các hoạt động tập thể ngoài trời hoặc câu lạc bộ sống vui khỏe.",
      ];
    } else if (score <= 30) {
      riskLevel = "medium";
      recommendations = [
        "Bạn đang gặp một vài lo lắng vừa phải. Nên cân nhắc tham gia khóa học 'Chế ngự căng thẳng'.",
        "Thực hành bài tập thở cơ hoành 10 phút trước khi ngủ để thư giãn cơ bắp.",
        "Nói chuyện nhiều hơn với gia đình hoặc giáo viên chủ nhiệm về các khó khăn hiện tại.",
      ];
    } else {
      riskLevel = "high";
      recommendations = [
        "Mức độ căng thẳng/lo âu của bạn đang ở mức cao. Khuyên bạn nên đặt lịch hẹn trò chuyện 1-1 cùng chuyên gia tâm lý học đường.",
        "Hạn chế sử dụng thiết bị công nghệ trước khi ngủ và liên hệ với hotline can thiệp khủng hoảng nếu có cảm xúc quá tải đột ngột.",
        "Phòng tâm lý luôn mở cửa sẵn sàng đón bạn bất cứ lúc nào.",
      ];
    }

    const result: AssessmentResult = {
      riskLevel,
      score,
      date: new Date().toLocaleDateString("vi-VN"),
      categoryScores: {
        anxiety: Math.min(10, Math.round(score * 0.35)),
        depression: Math.min(10, Math.round(score * 0.3)),
        stress: Math.min(10, Math.round(score * 0.35)),
      },
      recommendations,
    };

    setAssessmentResult(result);
    addToast(
      language === "vi" ? "Đã hoàn thành đánh giá sức khỏe tinh thần!" : "Assessment completed!",
      "success"
    );
  };

  const resetAssessment = () => {
    setAssessmentAnswers({});
    setAssessmentResult(null);
  };

  const updateUserProfile = (newProfile: Partial<AppContextProps["userProfile"]>) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
    addToast(
      language === "vi" ? "Đã cập nhật thông tin cá nhân." : "Profile updated successfully.",
      "success"
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        darkMode,
        toggleDarkMode,
        language,
        setLanguage,
        specialists: INITIAL_SPECIALISTS,
        appointments,
        bookAppointment,
        cancelAppointment,
        courses,
        enrollInCourse,
        completeLesson,
        submitCourseQuiz,
        blogs: INITIAL_BLOGS,
        assessmentAnswers,
        setAssessmentAnswers,
        assessmentResult,
        calculateAssessmentResult,
        resetAssessment,
        userProfile,
        updateUserProfile,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppContextProvider");
  }
  return context;
};
