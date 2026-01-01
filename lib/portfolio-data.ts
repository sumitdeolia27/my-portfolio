// This file contains all the portfolio data that can be easily updated
export const portfolioData = {
  personal: {
    name: "SUMIT DEOLIA",
    title: "Software Engineer | AI & Web Systems Builder | Android Developer",
    description:
      "Passionate software developer specializing in full-stack web development and mobile app development. I love turning ideas into reality through clean, efficient code and innovative solutions.",
  },

  about: {
    description:
      "Software Engineer and Android Developer pursuing B.Tech in Computer Science, with a strong passion for building efficient, scalable, and user-focused applications. Skilled in Kotlin, Java, Python, Node.js, and modern web technologies, with a solid understanding of software design principles and clean architecture. Driven by curiosity and continuous learning, I enjoy solving real-world problems through code and improving application performance, reliability, and user experience.",
    highlights: [
      "Problem Solving & DSA",
      "Clean Code & Architecture",
      "Full-Stack Fundamentals",
      "Debugging & Optimization",
      "Continuous Learning Mindset",
      "Android & Software Development",
    ],
  },

  education: {
    degree: "B.Tech in Computer Science",
    institution: "Graphic Era Hill University",
    percentage: "71%",
    duration: "2023 - 2027",
    secondary: {
      institution: "Inspiration Senior Secondary School",
      percentage: "70%",
      duration: "2022 - 2023",
    },
  },

  skills: {
    technical: ["HTML", "CSS", "JavaScript", "React.js", "Kotlin", "C", "C++", "Java"],
    soft: ["Creativity", "Communication", "Teamwork", "Meeting deadlines", "Critical thinking", "Resilience"],
    languages: ["English", "Hindi"],
    certifications: ["The Complete Android 14 & Kotlin Development Masterclass", "Machine Learning with Python", "5-Day AI Agents Intensive Course with Google"],
  },

  experience: {
    internships: [
      {
        title: "Software Development Intern",
        company: "Unified Mentor",
        duration: "3 months",
        certificateUrl: "https://drive.google.com/file/d/1qWdcNFhlcHfVh4ysfj1UpqcmAQqaHvmb/view?usp=sharing",
      },
    ],
    hackathons: [
      {
        name: "AI AND ML (2025)",
        url: "https://www.linkedin.com/posts/sumit-deolia-2547a2347_ai-machinelearning-competitionexperience-activity-7325571414084784129-E0ay?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFbKvOABli7IQNZQ25F0-GctOcQnvgpdmew",
      },
      {
        name: "Manthan National Level Hackathon (2025)",
        url: "https://www.linkedin.com/posts/sumit-deolia-2547a2347_hackathon-teamwork-innovation-activity-7381431798486020096-bfoI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFbKvOABli7IQNZQ25F0-GctOcQnvgpdmew",
      },
    ],
    certificates: [
      {
        title: "Internship Completion Certificate",
        issuer: "Unified Mentor",
        url: "https://drive.google.com/file/d/1qWdcNFhlcHfVh4ysfj1UpqcmAQqaHvmb/view?usp=sharing",
      },
      {
        title: "5-Day AI Agents Intensive Course with Google",
        issuer: "Google",
        url: "https://drive.google.com/file/d/1NWLymzrXdFGI46vCID7pG3PDu84ZLCv3/view?usp=sharing",
      },
      {
        title: "Machine Learning with Python",
        issuer: "IBM",
        url: "https://drive.google.com/file/d/1NMBYRL0A2CN9KyaGw3Ajoid8pi9sYPez/view?usp=sharing",
      },
      {
        title: "The Complete Android 14 & Kotlin Development Masterclass",
        issuer: "Udemy",
        url: "https://drive.google.com/file/d/1vXR9mgzBRm09sd1wZmgRYW8MVj8VwWVS/view?usp=sharing",
      },
    ],
  },

  projects: [
    {
      name: "My-portfolio",
      description:
        "A personal developer portfolio website that showcases your skills, projects, experience, contact details, and online presence in a professional and visually appealing way. It's designed to present who you are as a developer and highlight your work for recruiters, collaborators, or anyone visiting your GitHub.",
      technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      features: ["Professional Design", "Project Showcase", "Skills & Experience", "Contact Details"],
      image: "/images/projects/portfolio.png",
      gradient: "from-pink-500 to-rose-500",
      demoUrl: "https://my-portfolio-nloo-git-main-sumits-projects-01e27ee1.vercel.app?_vercel_share=FtjsMZxgu86oFq6V7Nf3iXc8dVVUiglo",
      githubUrl: "https://github.com/sumitdeolia27/my-portfolio",
    },
    {
      name: "ORION OS Navigator",
      description:
        "ORION OS Navigator is an AI-powered desktop command center that provides real-time system monitoring, smart command execution, and AI assistance through a modern interface. It helps users efficiently manage tasks, files, and system operations, acting as a cross-platform control hub rather than a traditional operating system.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Python", "AI Integration", "Node.js"],
      features: ["AI-Powered Commands", "Real-time System Metrics", "Modern UI with Radix UI", "Cross-platform Support"],
      image: "/images/projects/ORION-OS.png",
      gradient: "from-blue-500 to-cyan-500",
      demoUrl: "https://orion-os-8jqr-kky9wgn5o-sumits-projects-01e27ee1.vercel.app/",
      githubUrl: "https://github.com/sumitdeolia27/ORION-OS",
    },
    {
      name: "DonateTheBlood",
      description:
        "DonateTheBlood is a full-stack web application designed to manage blood donation efficiently. Users can register as donors or recipients, search for blood donors, submit donation offers, and request blood. Admins can manage users and track donation data, making it a practical platform for blood donation management.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
      features: ["User registration and authentication","Search for blood donors by blood group and location","Submit blood donation offers","Request blood from available donors","Admin panel to manage users and donations","Responsive and user-friendly interface","Track blood donation history",],
      image: "/images/projects/blood-donation.png",
      gradient: "from-red-500 to-pink-500",
      githubUrl: "https://github.com/sumitdeolia27/donatetheblood",
    },
    {
      name: "Code-Assistant Web Browser Extension",
      description:
        "Code-Assistant Web Browser is a Chrome extension that provides AI-powered code analysis, debugging, and optimization directly in the browser. It helps users understand, improve, and fix code on platforms like LeetCode, GitHub, and more, offering multiple analysis modes with a clean, intuitive interface.",
      technologies: ["JavaScript", "HTML", "CSS", "Gemini AI", "Chrome Extension Manifest v3"],
      features: ["AI Code Analysis", "Debugging Support", "Code Optimization", "Chrome Storage API"],
      image: "/images/projects/web-browser.png",
      gradient: "from-green-500 to-teal-500",
      demoUrl: "https://chromewebstore.google.com/detail/algospark-ai-code-helper/nfifhhjfpkpmhpcfgdcckkcdanfbeaah",
      githubUrl: "https://github.com/sumitdeolia27/Code-Assistant-web-browser",
    },
    {
      name: "Code-Assistant VS Code Extension",
      description:
        "Code-Assistant VS Code is an AI-powered extension that provides smart code suggestions, explanations, and debugging help directly inside Visual Studio Code. It helps developers understand code faster, optimize it, and improve productivity, offering context-aware assistance and beginner-friendly guidance.",
      technologies: ["JavaScript", "TypeScript", "HTML", "CSS", "VS Code Extension API"],
      features: ["AI Code Analysis", "Error Detection", "Optimization Suggestions", "Context Menu Integration"],
      image: "/images/projects/vscode-extension.png",
      gradient: "from-indigo-500 to-purple-500",
      demoUrl: "https://marketplace.visualstudio.com/items?itemName=klka.code-assistantt",
      githubUrl: "https://github.com/sumitdeolia27/Code-assistantt---vscode",
    },
    
    {
      name: "File Compression Tool",
      description:
        "File Compression is a web-based application that allows users to compress and decompress files efficiently. It supports multiple file types, including images, PDFs, and text files, providing a simple and intuitive interface to reduce file sizes without losing quality.",
      technologies: ["JavaScript", "HTML", "CSS", "Huffman Coding Algorithm"],
      features: ["Compress Files", "Decompress Files", "Multiple File Types", "Browser-based"],
      image: "/images/projects/file-compression.png",
      gradient: "from-yellow-500 to-orange-500",
      demoUrl: "https://sumitdeolia27.github.io/file-compression/",
      githubUrl: "https://github.com/sumitdeolia27/file-compression",
    },
    {
      
      name: "PhotoManagerApp",
      description:
        "PhotoManagerApp is an Android application that allows users to browse, organize, and view photos on their device. It provides an album view, supports zoom and drag functionality, and efficiently loads images using the Picasso library, offering a smooth and intuitive gallery experience.",
      technologies: ["Kotlin", "XML", "Picasso Library", "Android Studio"],
      features: ["Simple photo gallery browser on Android",
"Displays image folders from device storage","Album view to show photos inside selected folder","Image view with zoom and drag","Efficient image loading using Picasso","Smooth and responsive user interface","Built entirely with Kotlin and XML"],
      image: "/images/projects/PhotoManagerApp.png",
      gradient: "from-purple-500 to-pink-500",
      githubUrl: "https://github.com/sumitdeolia27/PhotoManagerApp-main",
    },
    
  ],

  contact: {
    email: "sumitdeoila@gmail.com",
    phone: "+91 8394855509",
    location: "Nainital, Uttarakhand, India",
    social: {
      linkedin: "https://www.linkedin.com/in/sumit-deolia-2547a2347/",
      github: "https://github.com/sumitdeolia27",
    },
  },
}
