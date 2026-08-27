export type Language = "az" | "en";

/** Drives the status chip styling — set in data, never inferred from prose. */
export type StatusTone = "live" | "official" | "oss" | "dev";

export interface ProjectItem {
  name: string;
  /** Primary classification, e.g. "Marketplace". Rendered as the card eyebrow. */
  kind: string;
  /** Secondary qualifier, e.g. "High-Load". Optional. */
  tag?: string;
  description: string;
  /** The single most persuasive sentence. Rendered as a marked note. */
  highlight: string;
  status: string;
  statusTone: StatusTone;
  /** Only set where the stack is actually known. Omitted otherwise. */
  stack?: string;
  linkUrl: string;
  image: string;
  award?: {
    label: string;
    value: string;
    note: string;
  };
}

export interface DemoItem {
  name: string;
  kind: string;
  description: string;
  stack: string;
  linkUrl: string;
  image: string;
}

export interface Translations {
  nav: {
    work: string;
    demos: string;
    skills: string;
    contact: string;
    skip: string;
  };
  /** Opening section — introduction and background in one block. */
  intro: {
    name: string;
    role: string;
    /** The large opening line — says what he does, not who he is. */
    statement: string;
    lede: string;
    body: string;
    primaryButton: string;
    secondaryButton: string;
    availability: string;
    stats: Array<{ value: string; label: string }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    seeAll: string;
    specs: {
      kind: string;
      status: string;
      stack: string;
    };
    items: ProjectItem[];
  };
  demos: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: DemoItem[];
  };
  skills: {
    eyebrow: string;
    title: string;
    servicesTitle: string;
    technologiesTitle: string;
    services: string[];
    technologies: Array<{ name: string; icon: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    emailLabel: string;
    email: string;
    githubLabel: string;
    githubHandle: string;
    githubUrl: string;
    whatsappLabel: string;
    whatsappNumber: string;
    linkedinLabel: string;
    linkedinHandle: string;
    linkedinUrl: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
    builtWith: string;
  };
}

export const translations: Record<Language, Translations> = {
  az: {
    nav: {
      work: "İşlər",
      demos: "Konseptlər",
      skills: "Bacarıqlar",
      contact: "Əlaqə",
      skip: "Məzmuna keç",
    },
    intro: {
      name: "Fuad Bağıyev",
      role: "Full-stack developer",
      statement: "Real istifadəçisi olan məhsullar qururam.",
      lede: "Kurs mərkəzləri üçün high-load LMS, geyim marketplace-i və universitetin rəsmi portalları — 4 ildən çoxdur production mühitində.",
      body: "Sumqayıt Dövlət Universitetinin tələbəsiyəm. Şablonla deyil, problemlə başlayıram — minimal dizaynlı, AI ilə gücləndirilmiş və real istifadəçisi olan məhsullar qurmağa çalışıram.",
      primaryButton: "İşlərə bax",
      secondaryButton: "Əlaqə saxla",
      availability: "Yeni layihələrə açığam",
      stats: [
        { value: "4+", label: "İl təcrübə" },
        { value: "8", label: "Production layihə" },
        { value: "2", label: "Rəsmi dövlət portalı" },
        { value: "5.000 ₼", label: "Qazanılan qrant" },
      ],
    },
    projects: {
      eyebrow: "Seçilmiş işlər",
      title: "Layihələr",
      subtitle:
        "Real biznes mühitində və rəsmi qurumlarda istifadə olunan əsas işlərim.",
      seeAll: "GitHub",
      specs: {
        kind: "Növ",
        status: "Status",
        stack: "Stack",
      },
      items: [
        {
          name: "Azeri Edu",
          kind: "Tədris İdarəetmə Sistemi",
          tag: "High-Load",
          description:
            "Kurs mərkəzi üçün hazırlanmış tədris platforması. İmtahan cavablarının avtomatik yoxlanması, kurs yerləşdirmə, imtahan qeydiyyatı, Google OAuth ilə giriş və admin paneli üzərindən real vaxtlı analitika daxildir.",
          highlight:
            "Next.js, MongoDB, Nginx və PM2 Cluster üzərində qurulmuş tam server arxitekturası ilə stabil production mühiti.",
          status: "Aktiv",
          statusTone: "live",
          stack: "Next.js · MongoDB · Nginx · PM2",
          linkUrl: "https://azeri.edu.az",
          image: "/azeri-edu.png",
        },
        {
          name: "Payla.az",
          kind: "B2C / C2C Marketplace",
          tag: "Startup",
          description:
            "Geyim kirayəsi və satışı üçün B2C/C2C marketplace. Həm biznes, həm də fərdi istifadəçilər elan yerləşdirir, filtr və axtarış ilə uyğun geyim tapır, rezervasiya edir. Ödəniş axını, istifadəçi reytinqi və avtomatik bildirişlər daxildir.",
          highlight:
            "Bu innovativ ideyaya görə SUPVC tərəfindən 2000 AZN mükafat qazanaraq rəsmi inkubasiya proqramına qəbul edilmişəm.",
          status: "İnkişafda",
          statusTone: "dev",
          linkUrl: "https://payla.az",
          image: "/paylaaz.png",
          award: {
            label: "SUPVC Venture Grant",
            value: "2.000 ₼",
            note: "İnkubasiya · 2024",
          },
        },
        {
          name: "karyera.sdu.edu.az",
          kind: "Rəsmi Karyera Portalı",
          tag: "SDU",
          description:
            "SDU-nun rəsmi karyera portalı. Vakansiya, təcrübə proqramı və təqaüd elanlarını tələbə və məzunlara çatdırır. Universitetin kadr şöbəsi tərəfindən birbaşa idarə olunur.",
          highlight:
            "Dövlət qurumu standartlarına uyğun, SEO optimallaşdırılmış və tam responsiv veb həll.",
          status: "Rəsmi",
          statusTone: "official",
          linkUrl: "https://karyera.sdu.edu.az",
          image: "/sdukaryera.png",
        },
        {
          name: "SDU Dayanıqlı İnkişaf",
          kind: "Dayanıqlı İnkişaf Portalı",
          tag: "SDU",
          description:
            "SDU-nun BMT-nin 17 Dayanıqlı İnkişaf Məqsədinə (SDG) töhfələrini əks etdirən interaktiv portal. Karbon kalkulyatoru, enerji və su istifadəsi üzrə təsir dashboard-u, tədbirlər təqvimi və SDG tədqiqat hesabatları daxildir.",
          highlight:
            "Recharts ilə real vaxtlı data vizualizasiyası, interaktiv karbon ayaq izi kalkulyatoru və 17 SDG məqsədinin ətraflı təqdimatı ilə tam iki dilli (AZ/EN) portal.",
          status: "Rəsmi",
          statusTone: "official",
          stack: "Next.js · Recharts · i18n",
          linkUrl: "https://sustainability.sdu.edu.az",
          image: "/dayaniqli-inkisaf.png",
        },
        {
          name: "Unim.az",
          kind: "Tələbə Ekosistemi",
          tag: "SaaS",
          description:
            "Tələbələr üçün akademik resurslar, kampus xəbərləri və sosial funksiyaları bir arada təqdim edən portal. Dərs cədvəli, elanlar və tələbələrarası ünsiyyət kimi gündəlik ehtiyacları əhatə edir.",
          highlight:
            "Tələbənin gündəlik kampus həyatını tək platformada sadələşdirən mərkəzi portal.",
          status: "Aktiv",
          statusTone: "live",
          linkUrl: "https://unim.az",
          image: "/unimaz.png",
        },
        {
          name: "Loyaltybar",
          kind: "Bərbərxana İdarəetmə Sistemi",
          tag: "SaaS",
          description:
            "Bərbərxana və salonlar üçün idarəetmə sistemi. QR ilə müştəri tanıma, rəqəmsal növbə, loyallıq proqramı və gəlir/müştəri statistikası funksiyalarını təqdim edir.",
          highlight:
            "Admin panel, Biznes paneli, Mobil tətbiq və Server daxil olmaqla 4 fərqli texnoloji komponentdən ibarət kompleks arxitektura.",
          status: "Açıq mənbə",
          statusTone: "oss",
          linkUrl: "https://github.com/fuad1789/Loyaltybar",
          image: "/loyaltybar.png",
        },
        {
          name: "Aspendos Academy",
          kind: "Beynəlxalq Tibbi Akademiya",
          tag: "Healthcare",
          description:
            "Həkim və tibb tələbələri üçün beynəlxalq tibbi staj, observership və klinik fellowship proqramlarını təqdim edən akademiya saytı. Türkiyənin akkreditasiyalı xəstəxanalarında fərdi akademik müşayiət, proqram axtarışı, müraciət axını və komanda bölmələri daxildir.",
          highlight:
            "20+ ölkədən 180+ həkimə xidmət edən, çoxdilli akademik fellowship platforması — qeydiyyat və müraciət axını ilə tam funksional.",
          status: "Aktiv",
          statusTone: "live",
          linkUrl: "https://www.aspendosacademy.az/",
          image: "/aspendos.png",
        },
        {
          name: "Idea İnşaat",
          kind: "Korporativ Sayt",
          tag: "Construction",
          description:
            "Tikinti və inşaat şirkəti üçün korporativ veb sayt. Layihələr kataloqu, xidmətlər, şirkət haqqında və əlaqə bölmələri ilə professional rəqəmsal təqdimat, motion və scroll-əsaslı keçidlərlə zəngin bir istifadəçi təcrübəsi.",
          highlight:
            "Tam responsiv, performans və SEO üçün optimallaşdırılmış, animation-driven istifadəçi axını.",
          status: "Aktiv",
          statusTone: "live",
          linkUrl: "https://www.ideainshaat.az/az",
          image: "/ideainshaat.png",
        },
      ],
    },
    demos: {
      eyebrow: "Konsept işlər",
      title: "Konseptlər",
      subtitle:
        "Müştəri brifi olmadan, öz təşəbbüsümlə qurduğum konsept saytlar — dizayn və texnologiya təcrübələri.",
      items: [
        {
          name: "Oksigen Klinik",
          kind: "Healthcare",
          description:
            "Klinik xəstəxana üçün konsept sayt. Onlayn randevu, bölmələr, həkim profilləri və üçdilli interfeys (AZ / RU / EN).",
          stack: "Next.js · i18n routing · Tailwind CSS",
          linkUrl: "https://oksigen-seven.vercel.app/",
          image: "/oksigen.png",
        },
        {
          name: "Megadent",
          kind: "Healthcare",
          description:
            "Estetik stomatoloji klinika üçün lüks səhifə dizaynı. Xidmətlər, həkim təqdimatı, filiallar və WhatsApp inteqrasiyası.",
          stack: "Next.js · Tailwind CSS · Dark & Gold UI",
          linkUrl: "https://megadent.vercel.app/",
          image: "/megadent.png",
        },
        {
          name: "Nabran Əmlak",
          kind: "Real Estate",
          description:
            "Kirayə villalar, satılıq torpaq sahələri və tikinti xidmətlərini bir ünvanda toplayan əmlak platforması konsepti.",
          stack: "Next.js · Tailwind CSS · Search & Booking UX",
          linkUrl: "https://nabran-emlak.vercel.app/",
          image: "/nabran.png",
        },
        {
          name: "Villa Baku",
          kind: "Construction",
          description:
            "Təmir və interyer dizaynı studiyası üçün konsept landing page. Açar təhvil layihələr və iş portfolyosu.",
          stack: "Next.js · Tailwind CSS · Editorial UI",
          linkUrl: "https://villabaku-az.vercel.app/",
          image: "/villabaku.png",
        },
        {
          name: "Boomberry",
          kind: "E-commerce",
          description:
            "Premium şokolad brendi üçün konsept e-commerce. Məhsul filtri, səbət və ödəniş axını daxildir.",
          stack: "Next.js · Tailwind CSS · E-commerce UX",
          linkUrl: "https://boomberry-az.vercel.app/",
          image: "/boomberry.png",
        },
        {
          name: "BFC Academy",
          kind: "Education",
          description:
            "Dil və hazırlıq mərkəzi üçün konsept platforma. Kurs axtarışı, müəllim profilləri və sınaq dərsi qeydiyyatı.",
          stack: "Next.js · Tailwind CSS · Course Catalog UX",
          linkUrl: "https://bfc-kurslari.vercel.app/",
          image: "/bfc.png",
        },
        {
          name: "Zaman Kursları",
          kind: "Education",
          description:
            "Tədris mərkəzi üçün konsept landing page. Proqramlar, sınaq dərsi qeydiyyatı və WhatsApp inteqrasiyası.",
          stack: "Next.js · Tailwind CSS · Lead Capture UX",
          linkUrl: "https://zaman-kurslari.vercel.app/",
          image: "/zaman.png",
        },
        {
          name: "Qafqaz Hazırlıq",
          kind: "Education",
          description:
            "Abituriyent hazırlıq kursları üçün konsept landing page. Kurs siyahısı, qəbul nəticələri və qeydiyyat axını.",
          stack: "Next.js · Tailwind CSS · Conversion UX",
          linkUrl: "https://qafqaz-tedris-merkezi.vercel.app/",
          image: "/qafqaz.png",
        },
        {
          name: "Oxu Tədris Mərkəzi",
          kind: "Education",
          description:
            "1–9 cu siniflər üçün tədris mərkəzi konsepti. Fənn hazırlığı kataloqu və validəyn hesabatı funksiyaları.",
          stack: "Next.js · Tailwind CSS · Parent-Facing UX",
          linkUrl: "https://oxutedris-az.vercel.app/",
          image: "/oxutedris.png",
        },
      ],
    },
    skills: {
      eyebrow: "Bacarıqlar",
      title: "Nə ilə işləyirəm",
      servicesTitle: "Xidmətlər",
      technologiesTitle: "Texnologiyalar",
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
    contact: {
      eyebrow: "Əlaqə",
      title: "Layihəniz var?",
      text: "Əməkdaşlıq, layihə və ya sadəcə fikir bölüşmək üçün yazın — adətən bir gün ərzində cavab verirəm.",
      emailLabel: "Email",
      email: "fuadbagiyev@gmail.com",
      githubLabel: "GitHub",
      githubHandle: "@fuad1789",
      githubUrl: "https://github.com/fuad1789",
      whatsappLabel: "WhatsApp",
      whatsappNumber: "+994 55 998 64 10",
      linkedinLabel: "LinkedIn",
      linkedinHandle: "Fuad Bağıyev",
      linkedinUrl: "https://www.linkedin.com/in/fuad-bağıyev-b70069238/",
    },
    footer: {
      tagline: "Full-stack developer · Sumqayıt, Azərbaycan",
      backToTop: "Yuxarı",
      builtWith: "Next.js ilə qurulub",
    },
  },

  en: {
    nav: {
      work: "Work",
      demos: "Concepts",
      skills: "Skills",
      contact: "Contact",
      skip: "Skip to content",
    },
    intro: {
      name: "Fuad Bagiyev",
      role: "Full-stack developer",
      statement: "I build products that real people use.",
      lede: "A high-load LMS for course centers, a clothing marketplace and official university portals — in production for 4+ years.",
      body: "I'm a student at Sumgayit State University. I start with the problem rather than a template — minimal, AI-supported products that end up with real users.",
      primaryButton: "View work",
      secondaryButton: "Get in touch",
      availability: "Available for new projects",
      stats: [
        { value: "4+", label: "Years experience" },
        { value: "8", label: "Production projects" },
        { value: "2", label: "Official state portals" },
        { value: "5.000 ₼", label: "Grants won" },
      ],
    },
    projects: {
      eyebrow: "Selected work",
      title: "Projects",
      subtitle:
        "High-impact products developed for real business and official environments.",
      seeAll: "GitHub",
      specs: {
        kind: "Kind",
        status: "Status",
        stack: "Stack",
      },
      items: [
        {
          name: "Azeri Edu",
          kind: "Learning Management System",
          tag: "High-Load",
          description:
            "An educational platform built for a course center. Features automated exam grading, course publishing, exam registration, Google OAuth authentication, and a real-time analytics dashboard.",
          highlight:
            "Stable production environment built on Next.js, MongoDB, Nginx, and PM2 Cluster.",
          status: "Live",
          statusTone: "live",
          stack: "Next.js · MongoDB · Nginx · PM2",
          linkUrl: "https://azeri.edu.az",
          image: "/azeri-edu.png",
        },
        {
          name: "Payla.az",
          kind: "B2C / C2C Marketplace",
          tag: "Startup",
          description:
            "A B2C/C2C marketplace for clothing rentals and sales. Both businesses and individual users list items, discover matches through filters and search, and book directly. Includes payment flow, user ratings, and automated notifications.",
          highlight:
            "Awarded a 2000 AZN grant from SUPVC and selected for an official startup incubation program.",
          status: "In development",
          statusTone: "dev",
          linkUrl: "https://payla.az",
          image: "/paylaaz.png",
          award: {
            label: "SUPVC Venture Grant",
            value: "2.000 ₼",
            note: "Incubated · 2024",
          },
        },
        {
          name: "karyera.sdu.edu.az",
          kind: "Official Career Portal",
          tag: "SDU",
          description:
            "The official career portal for SDU. Aggregates job postings, internship programs, and scholarship announcements for students and alumni. Managed directly by the university's career services department.",
          highlight:
            "An SEO-optimized, fully responsive solution built to meet state institution standards.",
          status: "Official",
          statusTone: "official",
          linkUrl: "https://karyera.sdu.edu.az",
          image: "/sdukaryera.png",
        },
        {
          name: "SDU Sustainable Development",
          kind: "Sustainability Portal",
          tag: "SDU",
          description:
            "An interactive portal showcasing SDU's contributions to the UN's 17 Sustainable Development Goals. Features a carbon footprint calculator, energy and water impact dashboard, events calendar, and SDG research reports.",
          highlight:
            "A fully bilingual (AZ/EN) portal with real-time data visualization via Recharts, an interactive carbon calculator, and detailed coverage of all 17 SDG goals.",
          status: "Official",
          statusTone: "official",
          stack: "Next.js · Recharts · i18n",
          linkUrl: "https://sustainability.sdu.edu.az",
          image: "/dayaniqli-inkisaf.png",
        },
        {
          name: "Unim.az",
          kind: "Student Ecosystem",
          tag: "SaaS",
          description:
            "A student portal combining academic resources, campus news, and social features. Covers daily needs like class schedules, announcements, and peer-to-peer communication.",
          highlight:
            "A single platform that simplifies daily campus life for students.",
          status: "Live",
          statusTone: "live",
          linkUrl: "https://unim.az",
          image: "/unimaz.png",
        },
        {
          name: "Loyaltybar",
          kind: "Barbershop Management System",
          tag: "SaaS",
          description:
            "A management system for barbershops and salons. Features QR-based customer identification, digital queue management, a loyalty program, and revenue/customer analytics.",
          highlight:
            "A 4-tier architecture comprising an Admin panel, Business dashboard, Mobile application, and backend server.",
          status: "Open source",
          statusTone: "oss",
          linkUrl: "https://github.com/fuad1789/Loyaltybar",
          image: "/loyaltybar.png",
        },
        {
          name: "Aspendos Academy",
          kind: "International Medical Academy",
          tag: "Healthcare",
          description:
            "Academy website offering international medical observership, clinical fellowship and training programs for doctors and medical students. Features personalized academic mentorship in accredited Turkish hospitals, program search, application flow and team profiles.",
          highlight:
            "A multilingual academic fellowship platform serving 180+ doctors from 20+ countries, with a full registration and application flow.",
          status: "Live",
          statusTone: "live",
          linkUrl: "https://www.aspendosacademy.az/",
          image: "/aspendos.png",
        },
        {
          name: "Idea İnşaat",
          kind: "Corporate Website",
          tag: "Construction",
          description:
            "Corporate website for a construction and development company. Includes a project catalog, services overview, about and contact sections, with motion- and scroll-driven transitions for a rich user experience.",
          highlight:
            "Fully responsive, performance- and SEO-optimized, with an animation-driven user flow.",
          status: "Live",
          statusTone: "live",
          linkUrl: "https://www.ideainshaat.az/az",
          image: "/ideainshaat.png",
        },
      ],
    },
    demos: {
      eyebrow: "Concept work",
      title: "Concepts",
      subtitle:
        "Self-initiated concept sites built without a client brief — design and technology experiments.",
      items: [
        {
          name: "Oksigen Clinic",
          kind: "Healthcare",
          description:
            "A concept site for a clinic hospital. Online booking, departments, doctor profiles and a trilingual interface (AZ / RU / EN).",
          stack: "Next.js · i18n routing · Tailwind CSS",
          linkUrl: "https://oksigen-seven.vercel.app/",
          image: "/oksigen.png",
        },
        {
          name: "Megadent",
          kind: "Healthcare",
          description:
            "A luxury landing page for an aesthetic dental clinic. Services, doctor profile, branches and WhatsApp integration.",
          stack: "Next.js · Tailwind CSS · Dark & Gold UI",
          linkUrl: "https://megadent.vercel.app/",
          image: "/megadent.png",
        },
        {
          name: "Nabran Real Estate",
          kind: "Real Estate",
          description:
            "A concept property platform bringing villa rentals, land for sale and construction services together in one place.",
          stack: "Next.js · Tailwind CSS · Search & Booking UX",
          linkUrl: "https://nabran-emlak.vercel.app/",
          image: "/nabran.png",
        },
        {
          name: "Villa Baku",
          kind: "Construction",
          description:
            "A concept landing page for a renovation and interior design studio. Turnkey projects and work portfolio.",
          stack: "Next.js · Tailwind CSS · Editorial UI",
          linkUrl: "https://villabaku-az.vercel.app/",
          image: "/villabaku.png",
        },
        {
          name: "Boomberry",
          kind: "E-commerce",
          description:
            "A concept e-commerce platform for a premium chocolate brand. Product filters, cart and checkout flow.",
          stack: "Next.js · Tailwind CSS · E-commerce UX",
          linkUrl: "https://boomberry-az.vercel.app/",
          image: "/boomberry.png",
        },
        {
          name: "BFC Academy",
          kind: "Education",
          description:
            "A concept platform for a language and prep center. Course search, instructor profiles and trial lesson sign-up.",
          stack: "Next.js · Tailwind CSS · Course Catalog UX",
          linkUrl: "https://bfc-kurslari.vercel.app/",
          image: "/bfc.png",
        },
        {
          name: "Zaman Courses",
          kind: "Education",
          description:
            "A concept landing page for a tutoring center. Programs, trial lesson sign-up and WhatsApp integration.",
          stack: "Next.js · Tailwind CSS · Lead Capture UX",
          linkUrl: "https://zaman-kurslari.vercel.app/",
          image: "/zaman.png",
        },
        {
          name: "Qafqaz Prep",
          kind: "Education",
          description:
            "A concept landing page for university entrance prep courses. Course list, admission stats and sign-up flow.",
          stack: "Next.js · Tailwind CSS · Conversion UX",
          linkUrl: "https://qafqaz-tedris-merkezi.vercel.app/",
          image: "/qafqaz.png",
        },
        {
          name: "Oxu Education Center",
          kind: "Education",
          description:
            "A concept site for a tutoring center serving grades 1–9. Subject course catalogue and monthly parent reports.",
          stack: "Next.js · Tailwind CSS · Parent-Facing UX",
          linkUrl: "https://oxutedris-az.vercel.app/",
          image: "/oxutedris.png",
        },
      ],
    },
    skills: {
      eyebrow: "Capabilities",
      title: "What I work with",
      servicesTitle: "Services",
      technologiesTitle: "Technologies",
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
    contact: {
      eyebrow: "Contact",
      title: "Got a project?",
      text: "For collaboration, projects or just to share an idea — I usually reply within a day.",
      emailLabel: "Email",
      email: "fuadbagiyev@gmail.com",
      githubLabel: "GitHub",
      githubHandle: "@fuad1789",
      githubUrl: "https://github.com/fuad1789",
      whatsappLabel: "WhatsApp",
      whatsappNumber: "+994 55 998 64 10",
      linkedinLabel: "LinkedIn",
      linkedinHandle: "Fuad Bagiyev",
      linkedinUrl: "https://www.linkedin.com/in/fuad-bağıyev-b70069238/",
    },
    footer: {
      tagline: "Full-stack developer · Sumgayit, Azerbaijan",
      backToTop: "Top",
      builtWith: "Built with Next.js",
    },
  },
};
