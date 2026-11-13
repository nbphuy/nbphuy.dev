export interface SocialLink {
  name: string;
  url: string;
  alt: string;
  icon: "instagram" | "linkedin" | "behance" | "github";
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  period?: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  thumbnailType: "gradient-1" | "gradient-2" | "logo" | "accent";
  thumbnailImage?: string;
  thumbnailAlt?: string;
  accentGradient?: string;
  links: {
    label: string;
    url: string;
    type: "code" | "demo" | "design";
  }[];
  isOriginal: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SoftwareTool {
  name: string;
  category: string;
  logo: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  badgeText?: string;
  category: "Language" | "AI & Data" | "Programming & Agile" | "Productivity & Soft Skills";
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  points: {
    heading: string;
    detail: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  logo: string;
  courses: string[];
}

export interface HobbyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  iconName: "camera" | "palette" | "code" | "book";
}

export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: "Portrait" | "Campus & Life" | "Street & Travel" | "Creative";
  date?: string;
  location?: string;
  aspect?: "square" | "portrait" | "landscape";
}

export const PROFILE_DATA = {
  greeting: "Hi, I am",
  fullName: "Nguyen Binh Phuong Huy",
  headline: "Computer Science Student",
  email: "nguyenbinhphuonghuy.work@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  avatar: "/img/NguyenBinhPhuongHuy_Avatar.jpg",
  avatarAlt: "Avatar of Nguyen Binh Phuong Huy",
  aboutImage: "/img/NguyenBinhPhuongHuy_pic2.jpg",
  aboutImageAlt: "Image of Nguyen Binh Phuong Huy",
  aboutSubheading: "Computer Science Student at International University, VNUHCM",
  aboutParagraph:
    "I'm a Computer Science student at International University, Vietnam National University Ho Chi Minh City (IU-VNUHCM). Alongside my technical background, I'm passionate about photography and have basic 2D design skills using Adobe Photoshop. I'm currently looking for a full-stack Intern opportunity in Ho Chi Minh City, where I can contribute, learn fast, and grow through real-world projects.",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/iam.henryyyyy/",
    alt: "Link to Instagram profile",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nbphuy/",
    alt: "Link to Linkedin Profile",
    icon: "linkedin",
  },
  {
    name: "Behance",
    url: "https://www.behance.net/nbphuy",
    alt: "Link to Behance Profile",
    icon: "behance",
  },
  {
    name: "GitHub",
    url: "https://github.com/nbphuy",
    alt: "Link to GitHub Profile",
    icon: "github",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  // Original 3 Projects from nbphuy.github.io/projects.html (preserved 100%)
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce web application with user authentication, product management, and a payment gateway integration.",
    tags: ["Full-Stack", "Authentication", "Payment Gateway", "Web Application"],
    thumbnailType: "gradient-1",
    links: [
      { label: "Code", url: "https://github.com/nbphuy", type: "code" },
      { label: "Live Demo", url: "#", type: "demo" },
    ],
    isOriginal: true,
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A fully responsive personal portfolio showcasing projects and blogs with elegant dark-mode aesthetics.",
    tags: ["HTML5", "CSS3", "Vanilla JS", "Next.js", "Tailwind CSS"],
    thumbnailType: "gradient-2",
    links: [
      {
        label: "Source code",
        url: "https://github.com/nbphuy/nbphuy.github.io",
        type: "code",
      },
      {
        label: "Live Demo",
        url: "https://nbphuy.github.io/",
        type: "demo",
      },
    ],
    isOriginal: true,
  },
  {
    id: "meditatee-thesis",
    title: "Meditatee - Thesis Project",
    role: "Undergraduate Thesis",
    period: "Jan 2026 – July 2026",
    description:
      "A full-stack web application designed for real-time EEG tracking to calculate Meditation Quality Index via WebSockets.",
    highlights: [
      "Engineered a processing backend in Python and FastAPI to ingest EMOTIV BCI streams via WebSocket; formulated the Meditation Quality Index (MQI) using Welch's method for Power Spectral Density, cross-band ratios for Alpha, Beta, and Theta waves, and exponential moving average smoothing.",
      "Developed a telemetry dashboard with native JavaScript and ECharts for live neurofeedback; evaluated the algorithm against the OpenNeuro DS001787 dataset and achieved an average execution latency of 12 milliseconds.",
    ],
    tags: ["Python", "FastAPI", "WebSocket", "EEG / BCI", "JavaScript", "ECharts"],
    thumbnailType: "logo",
    thumbnailImage: "/img/projects/hcmiu/HCMIU_logo_vector.png",
    thumbnailAlt: "HCMIU Logo",
    links: [
      {
        label: "Source code",
        url: "https://github.com/nbphuy/meditee",
        type: "code",
      },
    ],
    isOriginal: true,
  },
  // Additional Projects from CV
  {
    id: "studentfood-platform",
    title: "StudentFood – Campus Food Ordering Platform",
    role: "Mobile Frontend Developer",
    period: "Oct 2026 – Current",
    description:
      "A responsive student-facing campus food ordering platform featuring Home, Explore, Order Management, and dynamic Food/Drink Customization workflows.",
    highlights: [
      "Developed and debugged responsive student-facing interfaces using Next.js, React, TypeScript, and CSS Modules, including interactive search filters, dynamic product options, and mobile navigation.",
      "Refactored application-wide typography and responsive styling across desktop and mobile devices, and implemented automated regression tests for key student workflows.",
    ],
    tags: ["Next.js", "React.js", "TypeScript", "CSS Modules", "Responsive UI"],
    thumbnailType: "accent",
    accentGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    links: [
      {
        label: "Source code",
        url: "https://github.com/MrT2003/student-food-mvp/",
        type: "code",
      },
    ],
    isOriginal: false,
  },
  {
    id: "mangahub-platform",
    title: "MangaHub - Manga Reading & Management Platform",
    role: "Collaborate Developer",
    period: "Nov 2025 – Dec 2025",
    description:
      "A comprehensive multi-protocol manga reading and library management platform supporting both CLI and Web interfaces with real-time reading progress sync.",
    highlights: [
      "Developed using Go and SQLite with real-time reading progress synchronization across devices via a TCP Sync Server and a UDP server for instant chapter notifications.",
      "Architected a multi-protocol backend featuring RESTful APIs (Gin framework), high-performance gRPC endpoints, WebSocket real-time chat, and secure bcrypt user authentication.",
    ],
    tags: ["Go", "Gin", "gRPC", "WebSocket", "TCP/UDP", "SQLite"],
    thumbnailType: "accent",
    accentGradient: "linear-gradient(135deg, #1a1c2e, #2a2438, #1f2937)",
    links: [
      {
        label: "Source code",
        url: "https://github.com/nbphuy/manga_hub_project",
        type: "code",
      },
    ],
    isOriginal: false,
  },
  {
    id: "coinbase-ui-design",
    title: "Coinbase – Mobile App UI Design Project",
    role: "UI Designer",
    period: "Dec 2023 – Jan 2024",
    description:
      "A modern mobile-first fintech identity verification flow and scalable design system inspired by Coinbase, built with interactive high-fidelity prototypes in Figma.",
    highlights: [
      "Designed an intuitive mobile identity verification flow prioritizing accessible component systems, custom keyboards, and form usability.",
      "Created interactive prototypes in Figma and established a scalable design system with consistent typography, spacing, and semantic color tokens.",
    ],
    tags: ["Figma", "UI/UX Design", "Design System", "Prototyping", "Mobile-First"],
    thumbnailType: "accent",
    accentGradient: "linear-gradient(135deg, #0a192f, #112240, #1d3557)",
    links: [
      {
        label: "Behance / Design",
        url: "https://www.behance.net/nbphuy",
        type: "design",
      },
    ],
    isOriginal: false,
  },
];

// Strictly categorized list of skills without any percentage or rating bars
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    description: "Core languages used for full-stack, backend systems, and data processing.",
    skills: ["Python", "Go", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    id: "frameworks-libraries",
    title: "Frameworks & Libraries",
    description: "Modern web frameworks and UI libraries for building scalable applications.",
    skills: ["React.js", "Next.js", "FastAPI", "Gin (Go)", "Tailwind CSS", "ECharts"],
  },
  {
    id: "databases-backend",
    title: "Databases & Backend Architecture",
    description: "Data storage, real-time communication, and multi-protocol API design.",
    skills: [
      "PostgreSQL",
      "SQLite",
      "NoSQL",
      "Supabase",
      "RESTful APIs",
      "WebSocket",
      "gRPC",
      "TCP / UDP Sockets",
    ],
  },
  {
    id: "tools-technologies",
    title: "Tools & Technologies",
    description: "Development workflow, DevOps, version control, and UI engineering.",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Docker",
      "Figma",
      "CSS Modules",
      "Responsive Web Design",
    ],
  },
  {
    id: "ai-prompt-engineering",
    title: "AI Tools & Prompt Engineering",
    description: "AI-assisted engineering, local LLM workflows, and research synthesis.",
    skills: ["ChatGPT", "Gemini", "Gemini Notebook", "Ollama"],
  },
  {
    id: "spoken-languages",
    title: "Languages",
    description: "Communication in academic, technical, and cross-functional environments.",
    skills: ["Vietnamese (Native)", "English (Fluent — IELTS 6.5)"],
  },
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    name: "Figma",
    category: "UI/UX & Prototyping",
    logo: "/img/software_logo/figma.png",
  },
  {
    name: "Adobe Photoshop",
    category: "2D Design & Retouching",
    logo: "/img/software_logo/adobe_photoshop.png",
  },
  {
    name: "Adobe Lightroom",
    category: "Color Grading & Photography",
    logo: "/img/software_logo/adobe_lightroom.png",
  },
  {
    name: "Adobe Illustrator",
    category: "Vector Graphics",
    logo: "/img/software_logo/adobe_illustrator.png",
  },
  {
    name: "Canva",
    category: "Visual Communication",
    logo: "/img/software_logo/canva.png",
  },
  {
    name: "Microsoft Word",
    category: "MOS 2019 Certified",
    logo: "/img/software_logo/word.png",
  },
  {
    name: "Microsoft Excel",
    category: "MOS 2016 & 2019 Certified",
    logo: "/img/software_logo/excel.png",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "ielts",
    title: "International English Language Testing System (IELTS)",
    issuer: "IELTS Official",
    badgeText: "Overall Band Score: 6.5",
    category: "Language",
  },
  {
    id: "crash-course-python",
    title: "Crash Course on Python",
    issuer: "Google",
    platform: "Coursera",
    category: "Programming & Agile",
  },
  {
    id: "agile-project-management",
    title: "Foundations of Agile Project Management",
    issuer: "Google",
    platform: "Coursera",
    category: "Programming & Agile",
  },
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
  },
  {
    id: "ai-fundamentals-google",
    title: "AI Fundamentals",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
  },
  {
    id: "genai-for-educators",
    title: "Generative AI for Educators with Gemini Certificate",
    issuer: "Google",
    category: "AI & Data",
  },
  {
    id: "gemini-certified-educator",
    title: "Gemini Certified Educator",
    issuer: "Google",
    category: "AI & Data",
  },
  {
    id: "intro-modern-ai-cisco",
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    category: "AI & Data",
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking: Healing the 7 Cognitive Biases",
    issuer: "Thinking School",
    category: "Productivity & Soft Skills",
  },
  {
    id: "mos-2019",
    title: "Microsoft Office Specialist 2019 (Word & Excel)",
    issuer: "Microsoft",
    category: "Productivity & Soft Skills",
  },
  {
    id: "mos-2016",
    title: "Microsoft Office Specialist 2016 (Excel)",
    issuer: "Microsoft",
    category: "Productivity & Soft Skills",
  },
];

export const EDUCATION_DATA: EducationItem = {
  institution: "International University, Vietnam National University HCMC",
  degree: "B.Sc. in Computer Science",
  period: "Oct 2021 – Nov 2026",
  logo: "/img/software_logo/logo vector IU.png",
  courses: [
    "Artificial Intelligence",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Object-Oriented Analysis and Design",
    "Principles of Database Management",
    "Web Application Development",
    "Software Engineering",
    "Discrete Math",
    "Probability & Statistics",
    "Operating Systems",
    "UI Design and Evaluation",
    "Computer Network",
    "Net-centric Programming",
    "Mobile Application Development",
  ],
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "mindx",
    company: "MindX Technology School",
    role: "K-12 Coding Teacher",
    type: "Part-time",
    period: "Oct 2025 – Current",
    points: [
      {
        heading: "Project-Based Instructions",
        detail:
          "Guided students in building coding projects and designed project-based learning activities that improved engagement and reinforced algorithmic thinking.",
      },
      {
        heading: "Evaluation & Feedback",
        detail:
          "Evaluated project outcomes and provided actionable feedback, building strong analytical and communication skills.",
      },
      {
        heading: "Technical Debugging",
        detail:
          "Debugged students' source code in daily assignments and final projects to resolve technical issues and ensure project success.",
      },
    ],
  },
  {
    id: "brain-life",
    company: "Brain-Life, Inc.",
    role: "Independent Researcher & Experimental Collaborator",
    type: "Summer Internship",
    period: "May 2025 – Sep 2025",
    points: [
      {
        heading: "Systematic Literature Review",
        detail:
          "Conducted comprehensive research on the impact of meditation on EEG oscillations using the PRISMA 2020 framework, synthesizing findings from databases such as PubMed and IEEE Xplore to establish neurophysiological markers for cognitive states.",
      },
      {
        heading: "EEG Data Acquisition & BCI Research",
        detail:
          "Facilitated experimental EEG data collection for Brain-Computer Interface (BCI) development, executing multi-state paradigms (Relaxation, Focus, Engagement, Flow) with student volunteers to ensure great data reliability.",
      },
      {
        heading: "Signal Processing & Validation",
        detail:
          "Preprocessed raw EEG signals by converting CSV outputs into EDF files, and validated signal quality through EDF Browser to maintain strict experimental accuracy.",
      },
    ],
  },
];

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: "photography",
    title: "Photography & Color Grading",
    subtitle: "Capturing everyday moments, portraits & street perspectives",
    description:
      "Passionate about visual storytelling through photography. I enjoy shooting portraits, campus events, and urban street scenes, then refining mood and color palettes in Adobe Lightroom and Photoshop.",
    tags: ["Portrait Photography", "Street & Urban", "Adobe Lightroom", "Visual Storytelling"],
    iconName: "camera",
  },
  {
    id: "ui-2d-design",
    title: "2D Graphic & UI/UX Design",
    subtitle: "Crafting clean interfaces & visual compositions",
    description:
      "Exploring the intersection of aesthetics and usability—from designing scalable mobile UI systems in Figma to creating 2D visual assets and typography layouts in Adobe Photoshop & Illustrator.",
    tags: ["Figma", "Adobe Photoshop", "Design Systems", "Typography"],
    iconName: "palette",
  },
  {
    id: "coding-neurotech",
    title: "Full-Stack Engineering & BCI Tech",
    subtitle: "Building web systems & experimenting with real-time signals",
    description:
      "Beyond coursework, I love tinkering with modern web stacks (Next.js, Go, FastAPI), real-time WebSocket architectures, and Brain-Computer Interface (EEG) signal processing.",
    tags: ["Full-Stack Web", "Real-Time Systems", "EEG / Neurotech", "Open Source"],
    iconName: "code",
  },
  {
    id: "reading-manga",
    title: "Reading, Manga & Cognitive Science",
    subtitle: "Exploring stories, psychology & technical blogs",
    description:
      "Avid reader of manga (which inspired building the MangaHub platform!), technical engineering blogs, and books on critical thinking, cognitive biases, and mindfulness.",
    tags: ["Manga", "Cognitive Science", "Tech Blogs", "Mindfulness"],
    iconName: "book",
  },
];

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: "portrait-about",
    src: "/img/NguyenBinhPhuongHuy_pic2.jpg",
    title: "Portrait — Nguyen Binh Phuong Huy",
    caption:
      "Featured profile portrait from nbphuy.github.io. Captured with natural lighting and warm color grading.",
    category: "Portrait",
    location: "Ho Chi Minh City, Vietnam",
    aspect: "portrait",
  },
  {
    id: "portrait-avatar",
    src: "/img/NguyenBinhPhuongHuy_Avatar.jpg",
    title: "Studio & Profile Avatar",
    caption:
      "Primary avatar portrait featured on the homepage hero section of nbphuy.github.io.",
    category: "Portrait",
    location: "Ho Chi Minh City, Vietnam",
    aspect: "square",
  },
  {
    id: "hcmiu-campus",
    src: "/img/projects/hcmiu/HCMIU_logo_vector.png",
    title: "International University — VNUHCM Emblem",
    caption:
      "Academic home where I pursued my B.Sc. in Computer Science and defended my Undergraduate Thesis on Real-time EEG Meditation Monitoring.",
    category: "Campus & Life",
    location: "IU - VNUHCM",
    aspect: "square",
  },
];
