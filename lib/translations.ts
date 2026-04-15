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
      description: "Kurs mərkəzi üçün hazırlanmış tədris platforması. İmtahan cavablarının avtomatik yoxlanması, kurs yerləşdirmə, imtahan qeydiyyatı, Google OAuth ilə giriş və admin paneli üzərindən real vaxtlı analitika daxildir.",
      status: "Hal-hazırda aktiv istifadədədir.",
      highlight: "Next.js, MongoDB, Nginx və PM2 Cluster üzərində qurulmuş tam server arxitekturası ilə stabil production mühiti.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://azeri.edu.az", // Linki dəqiq domeninlə əvəz edərsən
      image: "/azeri-edu.png", // Şəklin adını özünə uyğun yazarsan
    },
    {
      name: "Payla.az",
      label: "B2C / C2C Marketplace · Startup",
      description: "Geyim kirayəsi və satışı üçün B2C/C2C marketplace. Həm biznes, həm də fərdi istifadəçilər elan yerləşdirir, filtr və axtarış ilə uyğun geyim tapır, rezervasiya edir. Ödəniş axını, istifadəçi reytinqi və avtomatik bildirişlər daxildir.",
      status: "Platforma aktivdir, inkişaf davam edir.",
      highlight: "Bu innovativ ideyaya görə SUPVC tərəfindən 2000 AZN mükafat qazanaraq rəsmi inkubasiya proqramına qəbul edilmişəm.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://payla.az",
      image: "/paylaaz.png",
    },
    {
      name: "karyera.sdu.edu.az",
      label: "Rəsmi Karyera Portalı · SDU",
      description: "SDU-nun rəsmi karyera portalı. Vakansiya, təcrübə proqramı və təqaüd elanlarını tələbə və məzunlara çatdırır. Universitetin kadr şöbəsi tərəfindən birbaşa idarə olunur.",
      status: "Universitet tərəfindən rəsmi istifadədədir.",
      highlight: "Dövlət qurumu standartlarına uyğun, SEO optimallaşdırılmış və tam responsiv veb həll.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://karyera.sdu.edu.az",
      image: "/sdukaryera.png",
    },
    {
      name: "Unim.az",
      label: "Tələbə Ekosistemi · SaaS",
      description: "Tələbələr üçün akademik resurslar, kampus xəbərləri və sosial funksiyaları bir arada təqdim edən portal. Dərs cədvəli, elanlar və tələbələrarası ünsiyyət kimi gündəlik ehtiyacları əhatə edir.",
      status: "Aktivdir, real istifadəçiləri var.",
      highlight: "Tələbənin gündəlik kampus həyatını tək platformada sadələşdirən mərkəzi portal.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://unim.az",
      image: "/unimaz.png",
    },
    {
      name: "Loyaltybar",
      label: "Bərbərxana İdarəetmə Sistemi (SaaS)",
      description: "Bərbərxana və salonlar üçün idarəetmə sistemi. QR ilə müştəri tanıma, rəqəmsal növbə, loyallıq proqramı və gəlir/müştəri statistikası funksiyalarını təqdim edir.",
      status: "Açıq mənbəli layihə.",
      highlight: "Admin panel, Biznes paneli, Mobil tətbiq və Server daxil olmaqla 4 fərqli texnoloji komponentdən ibarət kompleks arxitektura.",
      linkLabel: "GitHub-a keçid",
      linkUrl: "https://github.com/fuad1789/Loyaltybar",
      image: "/loyaltybar.png",
    },
    {
      name: "SDU Dayanıqlı İnkişaf",
      label: "Dayanıqlı İnkişaf Portalı · SDU",
      description: "SDU-nun BMT-nin 17 Dayanıqlı İnkişaf Məqsədinə (SDG) töhfələrini əks etdirən interaktiv portal. Karbon kalkulyatoru, enerji və su istifadəsi üzrə təsir dashboard-u, tədbirlər təqvimi və SDG tədqiqat hesabatları daxildir.",
      status: "Universitetin rəsmi dayanıqlılıq platforması olaraq fəaliyyətdədir.",
      highlight: "Recharts ilə real vaxtlı data vizualizasiyası, interaktiv karbon ayaq izi kalkulyatoru və 17 SDG məqsədinin ətraflı təqdimatı ilə tam iki dilli (AZ/EN) portal.",
      linkLabel: "Sayta keçid",
      linkUrl: "https://sustainability.sdu.edu.az",
      image: "/dayaniqli-inkisaf.png",
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
      description: "An educational platform built for a course center. Features automated exam grading, course publishing, exam registration, Google OAuth authentication, and a real-time analytics dashboard.",
      status: "Currently in active use.",
      highlight: "Stable production environment built on Next.js, MongoDB, Nginx, and PM2 Cluster.",
      linkLabel: "Visit website",
      linkUrl: "https://azeri.edu.az", // Adjust the link
      image: "/azeri-edu.png", // Adjust the image name
    },
    {
      name: "Payla.az",
      label: "B2C / C2C Marketplace · Startup",
      description: "A B2C/C2C marketplace for clothing rentals and sales. Both businesses and individual users list items, discover matches through filters and search, and book directly. Includes payment flow, user ratings, and automated notifications.",
      status: "Live, actively under development.",
      highlight: "Awarded a 2000 AZN grant from SUPVC and successfully selected for an official startup incubation program.",
      linkLabel: "Visit website",
      linkUrl: "https://payla.az",
      image: "/paylaaz.png",
    },
    {
      name: "karyera.sdu.edu.az",
      label: "Official Career Portal · SDU",
      description: "The official career portal for SDU. Aggregates job postings, internship programs, and scholarship announcements for students and alumni. Managed directly by the university's career services department.",
      status: "In active use by the university.",
      highlight: "An SEO-optimized, fully responsive solution built to meet state institution standards.",
      linkLabel: "Visit website",
      linkUrl: "https://karyera.sdu.edu.az",
      image: "/sdukaryera.png",
    },
    {
      name: "Unim.az",
      label: "Student Ecosystem · SaaS",
      description: "A student portal combining academic resources, campus news, and social features. Covers daily needs like class schedules, announcements, and peer-to-peer communication.",
      status: "Live with real users.",
      highlight: "A single platform that simplifies daily campus life for students.",
      linkLabel: "Visit website",
      linkUrl: "https://unim.az",
      image: "/unimaz.png",
    },
    {
      name: "Loyaltybar",
      label: "Barbershop Management System (SaaS)",
      description: "A management system for barbershops and salons. Features QR-based customer identification, digital queue management, a loyalty program, and revenue/customer analytics.",
      status: "Open-source project.",
      highlight: "A large-scale, 4-tier architecture comprising an Admin panel, Business dashboard, Mobile application, and robust Backend server.",
      linkLabel: "View on GitHub",
      linkUrl: "https://github.com/fuad1789/Loyaltybar",
      image: "/loyaltybar.png",
    },
    {
      name: "SDU Sustainable Development",
      label: "Sustainability Portal · SDU",
      description: "An interactive portal showcasing SDU's contributions to the UN's 17 Sustainable Development Goals. Features a carbon footprint calculator, energy and water impact dashboard, events calendar, and SDG research reports.",
      status: "Live as the university's official sustainability platform.",
      highlight: "A fully bilingual (AZ/EN) portal with real-time data visualization via Recharts, an interactive carbon calculator, and detailed coverage of all 17 SDG goals.",
      linkLabel: "Visit website",
      linkUrl: "https://sustainability.sdu.edu.az",
      image: "/dayaniqli-inkisaf.png",
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
