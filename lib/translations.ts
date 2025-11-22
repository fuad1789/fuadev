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
      subtitle: "Real istifadə olunmuş və istifadə olunmuş əsas işlərim.",
      items: [
        {
          name: "Payla.az",
          label: "Marketplace · Kirayə geyim",
          description:
            "Payla.az kirayə geyim üçün hazırlanmış marketplace platformasıdır. İstifadəçilər geyimlərini əlavə edib kirayəyə verə, digərləri isə uyğun geyimləri tapa bilirdi.",
          status: "Status: Platforma hazırda aktivdir, amma istifadə olunmur.",
          highlight:
            "Bu ideyaya görə SUPVC tərəfindən 2000 AZN məbləğində mükafat qazanmışıq və inkubasiya proqramında iştirak etmişəm.",
          linkLabel: "Sayta keçid",
          linkUrl: "https://payla.az",
          image: "/paylaaz.png",
        },
        {
          name: "Unim.az",
          label: "Tələbələr üçün platforma",
          description:
            "Unim.az tələbələr üçün yaradılmış platformadır. Universitet mühiti üçün uyğunlaşdırılmış, tələbələrin gündəlik ehtiyaclarını nəzərə alan bir web layihədir.",
          status: "Status: Layihə hazırda aktivdir və istifadə olunur.",
          highlight:
            "Tələbələr üçün praktiki və real istifadə olunan bir platforma kimi qurulub.",
          linkLabel: "Sayta keçid",
          linkUrl: "https://unim.az",
          image: "/unimaz.png",
        },
        {
          name: "karyera.sdu.edu.az",
          label: "Karyera səhifəsi · SDU",
          description:
            "Sumqayıt Dövlət Universitetinin rəsmi karyera səhifəsini hazırlamışam. Bu səhifə universitetin tələbələri üçün karyera ilə bağlı məlumatları, fürsətləri və elanları toplamaq üçün nəzərdə tutulub.",
          status: "Status: Aktiv istifadə olunan rəsmi karyera səhifəsidir.",
          highlight:
            "Universitetin rəsmi strukturu üçün hazırlanmış, sadə və aydın karyera səhifəsi.",
          linkLabel: "Sayta keçid",
          linkUrl: "https://karyera.sdu.edu.az",
          image: "/sdukaryera.png",
        },
        {
          name: "Loyaltybar",
          label: "Bərbərxana İdarəetmə Sistemi",
          description:
            "Bərbərxanaların idarə edilməsi üçün kompleks həll: Admin panel, Biznes paneli, Mobil tətbiq və Server. QR kod skaneri, növbə idarəetməsi və statistika kimi funksiyaları əhatə edir.",
          status: "Status: Açıq mənbəli layihə.",
          highlight: "4 fərqli komponentdən ibarət geniş miqyaslı ekosistem.",
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
      subtitle: "My main products, real and used",
      items: [
        {
          name: "Payla.az",
          label: "Marketplace · Rental clothing",
          description:
            "Payla.az is a marketplace platform for renting clothing. Users could list their clothes for rent and others could discover and book them.",
          status:
            "Status: The platform is live but not actively used at the moment.",
          highlight:
            "The idea received a 2000 AZN award from SUPVC, and I participated in an incubation program with this project.",
          linkLabel: "Visit website",
          linkUrl: "https://payla.az",
          image: "/paylaaz.png",
        },
        {
          name: "Unim.az",
          label: "Platform for students",
          description:
            "Unim.az is a platform built for students, tailored to the university environment and the needs of students in their daily academic life.",
          status: "Status: The project is live and in use.",
          highlight:
            "Designed as a practical, real-world platform for students.",
          linkLabel: "Visit website",
          linkUrl: "https://unim.az",
          image: "/unimaz.png",
        },
        {
          name: "karyera.sdu.edu.az",
          label: "Career page · SDU",
          description:
            "I built the official career page for Sumgayit State University. It is meant to gather career information, opportunities and announcements for students.",
          status: "Status: Actively used as an official career page.",
          highlight:
            "A clean and clear career page created for an official university structure.",
          linkLabel: "Visit website",
          linkUrl: "https://karyera.sdu.edu.az",
          image: "/sdukaryera.png",
        },
        {
          name: "Loyaltybar",
          label: "Barbershop Management System",
          description:
            "A comprehensive solution for barbershop management: Admin panel, Business panel, Mobile app, and Server. Includes features like QR code scanner, queue management, and statistics.",
          status: "Status: Open source project.",
          highlight:
            "A large-scale ecosystem consisting of 4 different components.",
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
