// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to personalize your portfolio.
// Every section on the site pulls its content from here.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Biswajit Sahoo",
  role: "Full-Stack Developer",
  tagline:"From ideas to deployment - building digital experiences that make an impact.",
  location: "Odisha, India",
  email: "theconqueror198@gmail.com",
  github: "https://github.com/biswajitsahoo897",
  linkedin: "https://www.linkedin.com/in/biswajit-sahoo-b378242b1/",
  twitter: "https://x.com/Biswajit5574160",
  resumeUrl: "./Biswajit_resume.pdf",
  siteUrl: "https://yourdomain.com", // update after you get a domain / vercel URL
  description:
    "Portfolio Biswajit sahoo, a full-stack developer working across React, Next.js, Node.js and relational and document databases, currently studying distributed system design.",
};

export const about = {
  paragraphs: [
    "I'm a Full-Stack Developer passionate about building scalable, maintainable, and user-centric applications. I enjoy working on both the frontend and backend, focusing on clean architecture, efficient APIs, and database design that remains easy to maintain as projects grow.",

    "My primary tech stack includes React, Next.js, TypeScript, Node.js, Express.js, Prisma, MongoDB, MySQL, and PostgreSQL. I also use Docker and Git to ensure consistent development workflows and smooth deployment across different environments.",

    "Alongside web development, I have a strong interest in Artificial Intelligence and Machine Learning. I've worked on projects involving machine learning algorithms, data analysis, and predictive models using Python and libraries such as Scikit-learn, while continuously expanding my knowledge of deep learning and AI-driven applications.",

    "Currently, I'm exploring system design, cloud technologies, and distributed systems to better understand how modern applications scale. I enjoy learning new technologies, solving challenging problems, and building software that combines performance, reliability, and a great user experience.",
  ],
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS","Three.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "Infra & Tools",
    items: ["Docker", "Git", "Github"],
  },
];

export type Project = {
  title: string;
  period: string;
  description: string;
  stack: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "User Behavior Analysis using Machine Learning",
    period: "Aug 2025",
    description:
      "Developed a machine learning classification system to analyze and predict online user behavior from social media data. Applied data preprocessing, feature engineering, feature scaling, and model optimization to improve prediction accuracy.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    href: "#",
    repo: "https://github.com/Biswajitsahoo897/DataMining-DataWarehousing-Lab/tree/4495cc096ccd0231b302042600c496641f88998e/social-media-dataset-online-user-behaviour-graphical",
    featured: true,
  },
  {
    title: "Anomaly Detection in Network Traffic",
    period: "Oct 2025",
    description:
      "Built anomaly detection models using SVM, Random Forest, and Isolation Forest to identify malicious network traffic. Performed feature engineering, hyperparameter tuning, and visualized model performance using evaluation metrics.",
    stack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
    href: "#",
    repo: "https://github.com/Biswajitsahoo897/Artificial-Intelligence-Machine-Learning-Lab.git",
    featured: true,
  },
  {
    title: "Student Management System",
    period: "Dec 2024",
    description:
      "Developed a console-based Student Management System using Java, JDBC, and MySQL. Implemented complete CRUD operations with object-oriented design principles, exception handling, and efficient database connectivity.",
    stack: ["Java", "JDBC", "MySQL", "OOP"],
    href: "#",
    repo: "https://github.com/Biswajitsahoo897/projects/tree/e4718dfc20038172c0a5b72ba3c722f211c3d46d/Student_Management_System",
    featured: true,
  },
];

export type JourneyStep = {
  year: string;
  title: string;
  detail: string;
};

export const journey: JourneyStep[] = [
  {
    year: "01",
    title: "Foundations",
    detail: "HTML, CSS, JavaScript, and the habit of building things to understand them.",
  },
  {
    year: "02",
    title: "Full-stack",
    detail: "React, Next.js, Node.js and Express, paired with MongoDB, MySQL and PostgreSQL.",
  },
  {
    year: "03",
    title: "Infrastructure",
    detail: "Docker for reproducible environments, Git for everything else.",
  },
  {
    year: "04",
    title: "System design",
    detail: "Currently studying — scalability, caching, queues, and how real systems fail gracefully.",
  },
];
