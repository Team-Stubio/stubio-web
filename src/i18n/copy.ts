import type { Locale } from "@/i18n/locales";

export type SiteCopy = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    howWeWork: string;
    design: string;
    code: string;
    projects: string;
    faq: string;
    login: string;
    book: string;
    language: string;
    theme: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    roleDesigner: string;
    roleDeveloper: string;
  };
  socialProof: {
    title: string;
    logos: string[];
  };
  services: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      points: string[];
    }[];
  };
  comparison: {
    title: string;
    description: string;
    bad: {
      title: string;
      points: string[];
    };
    good: {
      title: string;
      points: string[];
    };
  };
  process: {
    title: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  design: {
    title: string;
    description: string;
    beforeLabel: string;
    afterLabel: string;
  };
  code: {
    title: string;
    description: string;
    snippetLabel: string;
  };
  stack: {
    title: string;
    description: string;
    tools: string[];
  };
  projects: {
    title: string;
    description: string;
    items: {
      title: string;
      outcome: string;
      tag: string;
      imageAlt: string;
      image: string;
    }[];
  };
  booking: {
    title: string;
    description: string;
    cta: string;
    note: string;
    embedTitle: string;
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  footer: {
    city: string;
    about: string;
    explore: string;
    contact: string;
    howWeWork: string;
    projects: string;
    faq: string;
    login: string;
    privacy: string;
    terms: string;
    linkedin: string;
    calendly: string;
    rights: string;
  };
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    submit: string;
    demoHint: string;
    back: string;
  };
  privacy: {
    title: string;
    updated: string;
    content: string;
  };
};

export const copyByLocale: Record<Locale, SiteCopy> = {
  en: {
    metadata: {
      title: "Digital Product Studio in Copenhagen",
      description:
        "Designer + developer duo delivering high-converting websites, apps, and full-stack platforms from Copenhagen.",
    },
    nav: {
      howWeWork: "Our process",
      design: "Design",
      code: "Code",
      projects: "Projects",
      faq: "FAQ",
      login: "Login",
      book: "Book a call",
      language: "Language",
      theme: "Theme",
    },
    hero: {
      badge: "Copenhagen product studio",
      title: "From idea to shipped product, fast and documented.",
      description:
        "We are a designer + developer duo building modern web and app experiences grounded in real user behavior and robust code.",
      primaryCta: "Book a meeting",
      secondaryCta: "See how we work",
      trustLine: "Based in Copenhagen, Denmark",
      roleDesigner: "Designer",
      roleDeveloper: "Developer",
    },
    socialProof: {
      title: "Teams we have collaborated with",
      logos: [
        "Northlane",
        "FjordPay",
        "Atlas Health",
        "Cove Capital",
        "Mosaic Learning",
        "Arbor Labs",
      ],
    },
    services: {
      title: "What we build",
      description:
        "End-to-end product delivery with design precision and production-grade engineering.",
      items: [
        {
          title: "Web Experiences",
          description:
            "Marketing sites and product platforms that load fast and convert.",
          points: ["Next.js", "SEO-first", "Conversion-focused"],
        },
        {
          title: "Mobile Apps",
          description:
            "Native-feeling mobile products designed around real user flows.",
          points: ["iOS + Android", "Smooth UX", "Analytics-ready"],
        },
        {
          title: "Product Design",
          description:
            "From rough concept to testable prototype and polished interface.",
          points: ["UX research", "Design systems", "Rapid iteration"],
        },
        {
          title: "Full-stack Systems",
          description:
            "Backends, dashboards, payments, communities, and data models.",
          points: ["APIs", "Automations", "Secure architecture"],
        },
      ],
    },
    comparison: {
      title: "Bad vs good delivery",
      description:
        "The difference between expensive rework and confident release days.",
      bad: {
        title: "Your average project",
        points: [
          "Design and code drift apart",
          "Hardcoded hacks block future features",
          "No documentation for decisions",
          "Slow pages and fragile integrations",
        ],
      },
      good: {
        title: "Stubio approach",
        points: [
          "Design and engineering move as one team",
          "Clean architecture that scales with the roadmap",
          "Transparent documentation and weekly checkpoints",
          "Fast, observable, maintainable releases",
        ],
      },
    },
    process: {
      title: "How we work",
      description:
        "A transparent process where you see progress every week and always know what is next.",
      steps: [
        {
          title: "01 Discover",
          description:
            "Align goals, user context, technical constraints, and success metrics in one focused kickoff.",
        },
        {
          title: "02 Design + Scope",
          description:
            "Turn strategy into clear user flows, interface direction, and a realistic delivery scope.",
        },
        {
          title: "03 Build with visibility",
          description:
            "Ship in weekly iterations with demos, changelogs, and documentation your team can follow.",
        },
        {
          title: "04 Launch + Iterate",
          description:
            "Launch confidently with QA and analytics, then improve based on real user behavior.",
        },
      ],
    },
    design: {
      title: "Design quality you can feel",
      description:
        "Slide to compare a cluttered interface with a cleaner product experience focused on clarity and conversion.",
      beforeLabel: "Before: noisy and unclear",
      afterLabel: "After: focused and usable",
    },
    code: {
      title: "Code that stays clean",
      description:
        "Readable, typed, and documented where it matters so your team can move faster after launch.",
      snippetLabel: "Sample from a delivery-ready feature module",
    },
    stack: {
      title: "Tech stack",
      description:
        "We pick tools for speed, reliability, and long-term maintainability.",
      tools: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
        "shadcn/ui",
        "Framer Motion",
        "Vercel",
        "Stripe",
        "Supabase",
      ],
    },
    projects: {
      title: "Recent project examples",
      description:
        "A few outcomes from product and platform work across industries.",
      items: [
        {
          title: "B2B SaaS onboarding",
          outcome: "+39% activation in 8 weeks",
          tag: "Web app",
          imageAlt: "Dashboard onboarding flow preview",
          image: "/placeholders/project-1.svg",
        },
        {
          title: "Marketplace mobile relaunch",
          outcome: "2.1x weekly retention uplift",
          tag: "Mobile",
          imageAlt: "Mobile marketplace card layout",
          image: "/placeholders/project-2.svg",
        },
        {
          title: "Payment + subscription backend",
          outcome: "Checkout time reduced by 46%",
          tag: "Backend",
          imageAlt: "Payment dashboard and API status",
          image: "/placeholders/project-3.svg",
        },
        {
          title: "Community platform rebuild",
          outcome: "From 4 to 1 operational systems",
          tag: "Full-stack",
          imageAlt: "Community platform interface",
          image: "/placeholders/project-4.svg",
        },
        {
          title: "E-commerce performance sprint",
          outcome: "Core Web Vitals in green on mobile",
          tag: "Optimization",
          imageAlt: "Performance monitoring graph",
          image: "/placeholders/project-5.svg",
        },
        {
          title: "Investor reporting workspace",
          outcome: "Reporting cycle cut from 5 days to 1 day",
          tag: "Data",
          imageAlt: "Analytics workspace screens",
          image: "/placeholders/project-6.svg",
        },
      ],
    },
    booking: {
      title: "Book a focused product session today",
      description:
        "Tell us where you are now, what you need to ship, and we will map the fastest path forward.",
      cta: "Secure your time slot",
      note: "Let's discuss your next project.",
      embedTitle: "Calendly booking widget",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How quickly can we start?",
          answer:
            "Most projects start within 1 to 2 weeks after the discovery call and scope alignment.",
        },
        {
          question: "Can you take over existing codebases?",
          answer:
            "Yes. We often enter existing platforms, stabilize quality, and continue product delivery.",
        },
        {
          question: "Do you only design or only develop?",
          answer:
            "We deliver both. Product design and engineering stay tightly connected through the full process.",
        },
        {
          question: "How do you keep clients in the loop?",
          answer:
            "Weekly demos, written updates, and clear documentation so decisions are always transparent.",
        },
      ],
    },
    footer: {
      city: "Copenhagen, Denmark",
      about:
        "Stubio is a designer + developer duo building modern digital products with fast delivery, clean code, and transparent weekly documentation.",
      explore: "Explore",
      contact: "Contact",
      howWeWork: "Our process",
      projects: "Projects",
      faq: "FAQ",
      login: "Login",
      privacy: "Privacy",
      terms: "Terms",
      linkedin: "LinkedIn",
      calendly: "Book on Calendly",
      rights: "All rights reserved.",
    },
    login: {
      title: "Client login",
      subtitle: "Sign in to access your private client workspace.",
      email: "Email",
      password: "Password",
      submit: "Sign in",
      demoHint: "Use the credentials provided for your company workspace.",
      back: "Back to site",
    },
    privacy: {
      title: "Privacy policy",
      updated: "Updated: February 10, 2026",
      content:
        "This is a placeholder privacy policy. Replace this content with your legal text before going live.",
    },
  },
  da: {
    metadata: {
      title: "Digitalt produktstudie i København",
      description:
        "Designer + udvikler duo, der bygger konverterende websites, apps og full-stack platforme fra København.",
    },
    nav: {
      howWeWork: "Vores proces",
      design: "Design",
      code: "Kode",
      projects: "Cases",
      faq: "FAQ",
      login: "Login",
      book: "Book et møde",
      language: "Sprog",
      theme: "Tema",
    },
    hero: {
      badge: "Produktstudie fra København",
      title: "Fra idé til lanceret produkt hurtigt og dokumenteret.",
      description:
        "Vi er en designer + udvikler duo, der bygger moderne web- og app-løsninger baseret på reel brugeradfærd og robust kode.",
      primaryCta: "Book et møde",
      secondaryCta: "Se vores proces",
      trustLine: "Baseret i København, Danmark",
      roleDesigner: "Designer",
      roleDeveloper: "Udvikler",
    },
    socialProof: {
      title: "Teams vi har arbejdet med",
      logos: [
        "Northlane",
        "FjordPay",
        "Atlas Health",
        "Cove Capital",
        "Mosaic Learning",
        "Arbor Labs",
      ],
    },
    services: {
      title: "Det bygger vi",
      description:
        "End-to-end produktleverancer med skarp designretning og driftssikker engineering.",
      items: [
        {
          title: "Weboplevelser",
          description:
            "Marketing sites og produktplatforme der loader hurtigt og konverterer.",
          points: ["Next.js", "SEO-fokus", "Konverteringsfokus"],
        },
        {
          title: "Mobilapps",
          description:
            "Mobilprodukter med native følelse, bygget ud fra reelle brugerflows.",
          points: ["iOS + Android", "Flydende UX", "Klar til analytics"],
        },
        {
          title: "Produktdesign",
          description: "Fra rå idé til testbar prototype og skarp brugerflade.",
          points: ["UX research", "Design systems", "Hurtig iteration"],
        },
        {
          title: "Full-stack systemer",
          description:
            "Backends, dashboards, betalinger, communities og databaser.",
          points: ["API'er", "Automatisering", "Sikker arkitektur"],
        },
      ],
    },
    comparison: {
      title: "Dårlig vs god levering",
      description:
        "Forskellen mellem dyrt efterarbejde og trygge release-dage.",
      bad: {
        title: "Jeres gennemsnitlige projekt",
        points: [
          "Design og kode udvikler sig hver for sig",
          "Hardcoded hacks blokerer nye features",
          "Ingen dokumentation bag beslutninger",
          "Langsomme sider og skrøbelige integrationer",
        ],
      },
      good: {
        title: "Stubio-tilgangen",
        points: [
          "Design og udvikling arbejder som ét team",
          "Ren arkitektur der kan skalere med roadmap",
          "Transparent dokumentation og ugentlige checkpoints",
          "Hurtige, målbare og stabile releases",
        ],
      },
    },
    process: {
      title: "Sådan arbejder vi",
      description:
        "En hurtig og transparent proces, hvor I ser fremdrift hver uge og altid ved, hvad næste skridt er.",
      steps: [
        {
          title: "01 Afklaring",
          description:
            "Vi samler mål, brugerindsigter, tekniske rammer og succeskriterier i en fokuseret opstart.",
        },
        {
          title: "02 Design + Scope",
          description:
            "Vi omsætter strategien til tydelige brugerflows, designretning og en realistisk leveranceplan.",
        },
        {
          title: "03 Byg med transparens",
          description:
            "Vi leverer i ugentlige iterationer med demoer, changelogs og dokumentation I kan følge med i.",
        },
        {
          title: "04 Launch + Iteration",
          description:
            "Vi lancerer sikkert med QA og analytics og forbedrer løbende ud fra reel brugeradfærd.",
        },
      ],
    },
    design: {
      title: "Designkvalitet man kan mærke",
      description:
        "Træk slideren og se forskellen mellem et rodet interface og en skarpere oplevelse med fokus på klarhed og konvertering.",
      beforeLabel: "Før: støj og uklarhed",
      afterLabel: "Efter: fokus og brugbarhed",
    },
    code: {
      title: "Kode der forbliver ren",
      description:
        "Læsbar, typed og dokumenteret kode dér, hvor det skaber fart for teamet efter launch.",
      snippetLabel: "Eksempel fra et feature-modul klar til produktion",
    },
    stack: {
      title: "Tech stack",
      description:
        "Vi vælger værktøjer for hastighed, stabilitet og langsigtet vedligehold.",
      tools: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
        "shadcn/ui",
        "Framer Motion",
        "Vercel",
        "Stripe",
        "Supabase",
      ],
    },
    projects: {
      title: "Eksempler på projekter",
      description:
        "Udvalgte resultater fra produkt- og platformarbejde på tværs af brancher.",
      items: [
        {
          title: "B2B SaaS onboarding",
          outcome: "+39% aktivering på 8 uger",
          tag: "Web app",
          imageAlt: "Preview af onboarding-flow i dashboard",
          image: "/placeholders/project-1.svg",
        },
        {
          title: "Relaunch af marketplace app",
          outcome: "2,1x højere ugentlig retention",
          tag: "Mobil",
          imageAlt: "Mobil layout til marketplace",
          image: "/placeholders/project-2.svg",
        },
        {
          title: "Betaling + abonnementsbackend",
          outcome: "Checkout-tid reduceret med 46%",
          tag: "Backend",
          imageAlt: "Dashboard for betalinger og API-status",
          image: "/placeholders/project-3.svg",
        },
        {
          title: "Rebuild af community platform",
          outcome: "Fra 4 til 1 driftsplatform",
          tag: "Full-stack",
          imageAlt: "Interface til community platform",
          image: "/placeholders/project-4.svg",
        },
        {
          title: "Performance sprint til e-commerce",
          outcome: "Core Web Vitals i grønt på mobil",
          tag: "Optimering",
          imageAlt: "Graf for performance monitoring",
          image: "/placeholders/project-5.svg",
        },
        {
          title: "Workspace til investorrelation",
          outcome: "Rapportering reduceret fra 5 dage til 1 dag",
          tag: "Data",
          imageAlt: "Skærme fra analytics workspace",
          image: "/placeholders/project-6.svg",
        },
      ],
    },
    booking: {
      title: "Book en fokuseret produktsession",
      description:
        "Fortæl hvor I står nu, hvad I skal have lanceret, og vi skitserer den hurtigste vej frem.",
      cta: "Book en tid",
      note: "Calendly-URL kan ændres i src/lib/site-config.ts.",
      embedTitle: "Calendly bookingswidget",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Hvor hurtigt kan vi starte?",
          answer:
            "De fleste projekter starter inden for 1-2 uger efter discovery call og scope-afklaring.",
        },
        {
          question: "Kan I overtage en eksisterende kodebase?",
          answer:
            "Ja. Vi går ofte ind i eksisterende platforme, stabiliserer kvaliteten og fortsætter leverancen.",
        },
        {
          question: "Leverer I kun design eller kun udvikling?",
          answer:
            "Vi leverer begge dele. Design og engineering hænger tæt sammen gennem hele forløbet.",
        },
        {
          question: "Hvordan holder I os opdateret?",
          answer:
            "Ugentlige demoer, skriftlige statusopdateringer og tydelig dokumentation hele vejen.",
        },
      ],
    },
    footer: {
      city: "København, Danmark",
      about:
        "Stubio er en designer + udvikler duo, der bygger moderne digitale produkter med hurtig levering, ren kode og transparent ugentlig dokumentation.",
      explore: "Udforsk",
      contact: "Kontakt",
      howWeWork: "Sådan arbejder vi",
      projects: "Projekter",
      faq: "FAQ",
      login: "Login",
      privacy: "Privatliv",
      terms: "Vilkår",
      linkedin: "LinkedIn",
      calendly: "Book på Calendly",
      rights: "Alle rettigheder forbeholdes.",
    },
    login: {
      title: "Kundelogin",
      subtitle: "Log ind for at få adgang til dit private kundeområde.",
      email: "Email",
      password: "Adgangskode",
      submit: "Log ind",
      demoHint: "Brug de loginoplysninger du har modtaget til jeres workspace.",
      back: "Tilbage til siden",
    },
    privacy: {
      title: "Privatlivspolitik",
      updated: "Opdateret: 10. februar 2026",
      content:
        "Dette er en placeholder for privatlivstekst. Erstat indholdet med jeres juridiske tekst før lancering.",
    },
  },
};
