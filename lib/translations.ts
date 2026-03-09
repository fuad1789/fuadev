export type Language = "az" | "en";

export interface Translations {
  hero: {
    name: string;
    subtitle: string;
    intro: string;
    primaryButton: string;
    secondaryButton: string;
  };
  about: {
    title: string;
    body: string;
    extraLine: string;
  };
  projects: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      label: string;
      description: string;
      status: string;
      highlight: string;
      linkLabel: string;
      linkUrl: string;
      image?: string;
    }>;
  };
  skills: {
    title: string;
    services: string[];
    technologies: Array<{ name: string; icon: string }>;
  };
  experimental: {
    title: string;
    body: string;
  };
  contact: {
    title: string;
    text: string;
    emailLabel: string;
    email: string;
    githubLabel: string;
    githubUrl: string;
    whatsappLabel: string;
    whatsappNumber: string;
    linkedinLabel: string;
    linkedinUrl: string;
  };
  footer: {
    text: string;
  };
}

export const translations: Record<Language, Translations> = {
  az: {
    hero: {
      name: "Fuad Bağıyev",
      subtitle: "Full-stack developer · AI əsaslı məhsul qurucusu",
      intro:
        "4 ildən çoxdur web və mobil layihələr qururam. Payla.az və Unim.az kimi məhsulların müəllifiyəm. Hazırda AI dəstəyi ilə fərqli, real istifadə olunan layihələr hazırlayıram.",
      primaryButton: "Layihələrə bax",
      secondaryButton: "Mən kiməm?",
    },
    about: {
      title: "Mən kiməm?",
      body: 'Sumqayıt Dövlət Universitetinin tələbəsiyəm və 4+ illik təcrübə ilə web və mobil layihələr hazırlayıram. Daha çox real problem həll edən, minimal dizaynlı və AI ilə gücləndirilmiş məhsullar üzərində işləyirəm. "Vibe coding" yanaşması ilə, klassik şablonlardan uzaq, öz üslubumu qurmağa çalışıram.',
      extraLine:
        "Gündəlik JavaScript, React / Next.js, Node.js, Tailwind CSS, MongoDB və müasir məhsul alətləri ilə işləyirəm.",
    },
   projects: {
  title: "Layihələr",
  subtitle: "Real biznes mühitində və rəsmi qurumlarda istifadə olunan əsas işlərim.",
  items: [
    {
      name: "Azeri Edu",
      label: "Tədris İdarəetmə Sistemi (LMS) · High-Load",
      description: "Kurs mərkəzləri üçün sıfırdan dizayn edilmiş və inkişaf etdirilmiş irimiqyaslı tədris platforması. Sistemə Google OAuth ilə təhlükəsiz giriş, müasir admin paneli və real vaxtlı ziyarətçi analitikası inteqrasiya edilib.",
      status: "Status: Tam aktivdir və canlı (production) mühitdə istifadə olunur.",
      highlight: "20.000+ anlıq istifadəçi sorğusuna tab gətirən gücləndirilmiş server arxitekturası (Next.js, MongoDB, Nginx, PM2 Cluster).",
      linkLabel: "Sayta keçid",
      linkUrl: "https://azeri.edu.az", // Linki dəqiq domeninlə əvəz edərsən
      image: "/azeri-edu.png", // Şəklin adını özünə uyğun yazarsan
    },
    {
      name: "Payla.az",
      label: "C2C Marketplace · Startup",
      description: "İstifadəçilərin geyimlərini kirayəyə verə və ya uyğun geyim tapa biləcəyi Peer-to-Peer (C2C) e-ticarət platforması. Prosesləri avtomatlaşdıran tam funksional marketplace arxitekturası üzərində qurulub.",
      status: "Status: Platforma texniki olaraq aktivdir.",
      highlight: "Bu innovativ ideyaya görə SUPVC tərəfindən 2000 AZN mükafat qazanaraq rəsmi inkubasiya proqramına qəbul edilmişəm.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://payla.az",
      image: "/paylaaz.png",
    },
    {
      name: "karyera.sdu.edu.az",
      label: "Rəsmi Karyera Portalı · SDU",
      description: "Sumqayıt Dövlət Universitetinin rəsmi karyera mərkəzi üçün xüsusi olaraq hazırlanmış veb-platforma. Tələbə və məzunları iş imkanları, təqaüdlər və elanlarla təmin edən mərkəzləşdirilmiş sistemdir.",
      status: "Status: Universitet tərəfindən rəsmi olaraq istifadə olunur.",
      highlight: "Dövlət universitetinin standartlarına və strukturuna cavab verən tam optimal və təhlükəsiz veb həll.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://karyera.sdu.edu.az",
      image: "/sdukaryera.png",
    },
    {
      name: "Unim.az",
      label: "Tələbə Ekosistemi · SaaS",
      description: "Tələbələrin gündəlik akademik və sosial ehtiyaclarını rəqəmsallaşdırmaq üçün hazırlanmış kompleks platforma. Universitet mühitinə tam uyğunlaşdırılmış interfeys və istifadəçi təcrübəsi təqdim edir.",
      status: "Status: Layihə aktivdir və real istifadəçiləri var.",
      highlight: "Tələbə həyatını asanlaşdırmaq üçün praktiki funksionallıqlarla təchiz edilmiş mərkəzi portal.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://unim.az",
      image: "/unimaz.png",
    },
    {
      name: "Loyaltybar",
      label: "Bərbərxana İdarəetmə Sistemi (SaaS)",
      description: "Bərbərxana və salon bizneslərinin tam avtomatlaşdırılması üçün yaradılmış ekosistem. Sistem QR kod skaneri, rəqəmsal növbə idarəetməsi və detallı maliyyə/müştəri statistikası funksiyalarını əhatə edir.",
      status: "Status: Açıq mənbəli (Open-source) layihə.",
      highlight: "Admin panel, Biznes paneli, Mobil tətbiq və Server daxil olmaqla 4 fərqli texnoloji komponentdən ibarət kompleks arxitektura.",
      linkLabel: "GitHub-a keçid",
      linkUrl: "https://github.com/fuad1789/Loyaltybar",
      image: "/loyaltybar.png",
    },
  ],
},
    skills: {
      title: "Bacarıqlar və Texnologiyalar",
      services: [
        "Full-stack web development",
        "Mobil tətbiq inkişafı",
        "AI dəstəyi ilə məhsul dizaynı",
      ],
      technologies: [
        { name: "JavaScript", icon: "SiJavascript" },
        { name: "TypeScript", icon: "SiTypescript" },
        { name: "React", icon: "SiReact" },
        { name: "Next.js", icon: "SiNextdotjs" },
        { name: "Node.js", icon: "SiNodedotjs" },
        { name: "Tailwind CSS", icon: "SiTailwindcss" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "Git", icon: "SiGit" },
        { name: "Figma", icon: "SiFigma" },
      ],
    },
    experimental: {
      title: "Eksperimental işlər",
      body: "Vibe coding ilə etdiyim eksperimental dizayn və UI işlərini daha sonra bu portfoliyoya əlavə edəcəyəm.",
    },
    contact: {
      title: "Əlaqə",
      text: "Mənimlə əməkdaşlıq, layihə və ya sadəcə fikir bölüşmək üçün aşağıdakı kanallardan istifadə edə bilərsiniz.",
      emailLabel: "Email",
      email: "fuadbagiyev@gmail.com",
      githubLabel: "GitHub",
      githubUrl: "https://github.com/fuad1789",
      whatsappLabel: "WhatsApp",
      whatsappNumber: "+994559986410",
      linkedinLabel: "LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/fuad-bağıyev-b70069238/",
    },
    footer: {
      text: `© ${new Date().getFullYear()} Fuad Bağıyev · fuadev.com`,
    },
  },
  en: {
    hero: {
      name: "Fuad Bagiyev",
      subtitle: "Full-stack developer · AI-powered product builder”",
      intro:
        "I've been building web and mobile products for 4+ years. I'm the creator of projects like Payla.az and Unim.az. Right now I focus on minimal, real-world products powered by AI.",
      primaryButton: "View projects",
      secondaryButton: "About me",
    },
    about: {
      title: "About me",
      body: 'I\'m a student at Sumgayit State University and a developer with 4+ years of experience building web and mobile projects. I care about solving real problems with minimal, well-designed products, often supported by AI. With a "vibe coding" mindset, I avoid generic templates and try to build in my own style.',
      extraLine:
        "Day to day, I work with JavaScript, React / Next.js, Node.js, Tailwind CSS, MongoDB and modern product tools.",
    },
   projects: {
  title: "Projects",
  subtitle: "High-impact products developed for real business and official environments.",
  items: [
    {
      name: "Azeri Edu",
      label: "Learning Management System (LMS) · High-Load",
      description: "A large-scale educational platform engineered from scratch for educational centers. Features secure Google OAuth integration, a modern administrative dashboard, and real-time user analytics.",
      status: "Status: Fully active and running in a live production environment.",
      highlight: "Robust server architecture utilizing Next.js, MongoDB, Nginx, and PM2 Cluster, proven to handle 20,000+ concurrent requests (Load Tested).",
      linkLabel: "Visit website",
      linkUrl: "https://azeri.edu.az", // Adjust the link
      image: "/azeri-edu.png", // Adjust the image name
    },
    {
      name: "Payla.az",
      label: "C2C Marketplace · Startup",
      description: "A Peer-to-Peer (C2C) e-commerce platform designed for clothing rentals. Engineered with a fully functional marketplace architecture to automate listings, discovery, and booking processes.",
      status: "Status: The platform is technically live.",
      highlight: "Awarded a 2000 AZN grant from SUPVC and successfully selected for an official startup incubation program.",
      linkLabel: "Visit website",
      linkUrl: "https://payla.az",
      image: "/paylaaz.png",
    },
    {
      name: "karyera.sdu.edu.az",
      label: "Official Career Portal · SDU",
      description: "The official career web platform developed specifically for Sumgayit State University. Serves as a centralized hub connecting students and alumni with job opportunities, internships, and university announcements.",
      status: "Status: Actively used in production by the university.",
      highlight: "A highly optimized and secure web solution meeting the strict standards of a state university structure.",
      linkLabel: "Visit website",
      linkUrl: "https://karyera.sdu.edu.az",
      image: "/sdukaryera.png",
    },
    {
      name: "Unim.az",
      label: "Student Ecosystem · SaaS",
      description: "A comprehensive digital ecosystem built to address the daily academic and social needs of university students. Features a highly tailored, user-centric interface designed specifically for the campus environment.",
      status: "Status: Live project with active users.",
      highlight: "A practical, real-world central portal equipped with tools to streamline student life.",
      linkLabel: "Visit website",
      linkUrl: "https://unim.az",
      image: "/unimaz.png",
    },
    {
      name: "Loyaltybar",
      label: "Barbershop Management System (SaaS)",
      description: "A complete automation ecosystem for barbershops and salons. The platform features an integrated QR code scanner, digital queue management, and comprehensive financial/customer statistics.",
      status: "Status: Open-source project.",
      highlight: "A large-scale, 4-tier architecture comprising an Admin panel, Business dashboard, Mobile application, and robust Backend server.",
      linkLabel: "View on GitHub",
      linkUrl: "https://github.com/fuad1789/Loyaltybar",
      image: "/loyaltybar.png",
    },
  ],
},
    skills: {
      title: "Skills & Technologies",
      services: [
        "Full-stack web development",
        "Mobile app development",
        "AI-supported product design",
      ],
      technologies: [
        { name: "JavaScript", icon: "SiJavascript" },
        { name: "TypeScript", icon: "SiTypescript" },
        { name: "React", icon: "SiReact" },
        { name: "Next.js", icon: "SiNextdotjs" },
        { name: "Node.js", icon: "SiNodedotjs" },
        { name: "Tailwind CSS", icon: "SiTailwindcss" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "Git", icon: "SiGit" },
        { name: "Figma", icon: "SiFigma" },
      ],
    },
    experimental: {
      title: "Experimental work",
      body: "I also build experimental UI and design projects in a vibe-coding style, which I'll add to this portfolio later.",
    },
    contact: {
      title: "Contact",
      text: "For collaboration, projects or just to share an idea, feel free to reach out.",
      emailLabel: "Email",
      email: "fuadbagiyev@gmail.com",
      githubLabel: "GitHub",
      githubUrl: "https://github.com/fuad1789",
      whatsappLabel: "WhatsApp",
      whatsappNumber: "+994559986410",
      linkedinLabel: "LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/fuad-bağıyev-b70069238/",
    },
    footer: {
      text: `© ${new Date().getFullYear()} Fuad Bagiyev · fuadev.com`,
    },
  },
};
