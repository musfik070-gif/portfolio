/* ==========================================================================
   YOUR CONTENT LIVES HERE.
   This is the only file you need to edit for day-to-day updates.

   - Add a skill:        add "React" to an "items" list under Skills.
   - Add a certificate:  copy the example under "certificates" and fill it in.
   - Add a project:      copy a block under "projects" and fill it in.

   Rules for editing:
   - Keep the commas between items and the quotes around text.
   - A section with no entries is hidden automatically (also from the menu).
   - Leave a field as "" (empty) to hide that part of an entry.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- About you ---------- */
  profile: {
    name: "Md. Musfiqur Rahman",
    role: "Junior Full-Stack Developer",
    location: "Rajshahi, Bangladesh",
    // Each string below becomes one paragraph in the intro.
    summary: [
      "I'm a Computer Science and Engineering graduate (CGPA 3.86/4.00) who builds full-stack web apps with React, Next.js, Node.js and MongoDB. My projects include role-based dashboards, Stripe payments and authentication flows.",
      "For my BSc thesis I worked with a team of three on a machine learning pipeline in Python, with feature selection and cross-validation set up to avoid data leakage."
    ],
    photo: "assets/musfiqur.jpg",   // e.g. "assets/me.jpg" (square image works best). "" = no photo.
    facts: [
      { label: "Based in", value: "Rajshahi, Bangladesh" },
      { label: "Education", value: "B.Sc. in CSE, Varendra University, 2026" },
      { label: "Stack", value: "React, Next.js, Node.js, Express, MongoDB" },
      { label: "Looking for", value: "Junior Full-Stack or Frontend Developer roles" }
    ], // Optional details shown in the hero's At a glance card.
    resume: "assets/Musfiqur_Rahman_Resume.pdf"   // e.g. "assets/Musfiqur_Rahman_Resume.pdf". "" = hides the button.
  },

  about: {
    paragraphs: [
      "I studied Computer Science and Engineering at Varendra University, Rajshahi, and graduated in 2026 with a CGPA of 3.86 out of 4.00. I started building real web projects with plain HTML, CSS and JavaScript, and my first public project was Hisabghor in 2025.",
      "After that I moved to the MERN stack and Next.js and built IdeaVault and MediCare Connect in 2026. These projects include JWT authentication, Google OAuth, role-based dashboards and Stripe payments.",
      "For my BSc thesis I worked with a team of three on a Python machine learning pipeline for early detection of gestational diabetes, and I am the second author of a paper accepted at UCICS 2026.",
      "My background is in Computer Science and Engineering, and I have always enjoyed building new things. Programming gave me a way to turn an idea into something real that people can actually use."
    ],
    interests: [
      "Travelling & exploring",
      "Football",
      "Movies"
    ]
  },

  /* ---------- Links shown under your name ---------- */
  links: [
    { label: "GitHub",   url: "https://github.com/musfik070-gif" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/md-musfiqur-rahman7/" }
  ],

  /* ---------- Contact section ---------- */
  contact: {
    email: "musfik070@gmail.com",
    phone: "+8801303078896",
    whatsapp: "",
    note: "I'm actively looking for a Junior Full-Stack or Frontend Developer role. Email is the quickest way to reach me."
  },

  /* ---------- Skills ----------
     To add a skill, write its name as a string in the right "items" list.
     To add a new group, copy one { category, items } block. */
  skills: [
    { category: "Frontend",
      items: [
        "React", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "DaisyUI", "Framer Motion", "React Router", "HTML5", "CSS3"
      ] },
    { category: "Backend",
      items: [
        "Node.js", "Express", "REST APIs", "JWT", "Better Auth", "Google OAuth", "Stripe"
      ] },
    { category: "Database", items: ["MongoDB", "MongoDB Atlas"] },
    { category: "Machine learning",
      items: [
        "Python", "scikit-learn", "pandas", "NumPy", "imbalanced-learn", "Matplotlib"
      ] },
    { category: "Tools",
      items: [
        "Git", "GitHub", "Vite", "Vercel", "LaTeX"
      ] }
  ],

  /* ---------- Projects ----------
     Newest first is a good habit. "live" and "source" are links; "" hides them. */
  projects: [
    {
      title: "MediCare Connect",
      description: "A telehealth platform that connects patients with verified doctors. Patients book and pay for appointments online, and doctors and admins each get a protected dashboard.",
      tech: ["Next.js", "React", "Express", "MongoDB", "Stripe"],
      live: "https://medicare-client-gamma.vercel.app",
      source: "https://github.com/musfik070-gif/medicare-client",
      year: "2026",
      image: "assets/medicare.png",
      slug: "medicare-connect",
      category: "web", // Optional category for future project organization.
      status: "",
      challenges: [
        "Protecting three separate dashboards (patient, doctor, admin) with protected routes that check both the JWT token and the user role.",
        "Integrating Stripe Checkout into the appointment booking flow."
      ],
      improvements: [
        "Send email notifications and reminders for booked appointments.",
        "Let patients reschedule or cancel appointments, including refund handling through Stripe.",
        "Add automated tests for the role-based route protection and the payment flow."
      ]
    },
    {
      title: "IdeaVault",
      description: "A MERN platform for sharing startup ideas. Signed-in users can post, edit and delete ideas, comment on others, and search, filter and sort the idea board.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      live: "https://ideavault-client-one.vercel.app",
      source: "https://github.com/musfik070-gif/ideavault-client",
      year: "2026",
      image: "assets/IdeaVault-all.png",
      slug: "ideavault",
      category: "web", // Optional category for future project organization.
      status: "",
      challenges: [
        "Securing private routes (idea details, my ideas, comments) with JWT and Bcrypt password hashing.",
        "Building search, category filter and sorting by date and budget together in one idea board."
      ],
      improvements: [
        "Add pagination or infinite scroll for the idea board as the number of ideas grows.",
        "Add upvotes and bookmarks for ideas.",
        "Add email verification and password reset."
      ]
    },
    {
      title: "Hisabghor (হিসাবঘর)",
      description: "A free Bengali toolkit for everyday calculations: a Bangla date converter, a land measurement converter and an SSC/HSC GPA calculator. No sign-up needed.",
      tech: ["HTML", "CSS", "JavaScript", "SEO"],
      live: "https://hisabghor.me",
      source: "https://github.com/musfik070-gif/Hisabghor",
      year: "2025",
      image: "assets/Hisabghor.png",
      slug: "hisabghor",
      category: "web", // Optional category for future project organization.
      status: "",
      challenges: [
        "Getting the site discovered by search engines (sitemap.xml, robots.txt, Google Analytics) and connecting the custom domain hisabghor.me.",
        "Keeping three tools simple enough to use with no sign-up or installation."
      ],
      improvements: [
        "Add more everyday Bengali tools, such as other common unit converters.",
        "Add stronger validation and edge-case handling to the existing calculators.",
        "Add offline support (PWA) and per-tool SEO content."
      ]
    }
  ],

  /* ---------- Certificates ----------
     Empty for now, so the section stays hidden. When you earn one, put a block
     like the one below between the [ ] brackets (one block per certificate):

       { title: "Certificate name", issuer: "Who issued it", date: "2026", link: "https://credential-link" },

     "link" can be "" if there is no public link. */
  certificates: [],

  /* ---------- Publications ---------- */
  publications: [
    {
      title: "Early Detection and Prediction of Gestational Diabetes Mellitus Using Machine Learning",
      venue: "BSc thesis, Varendra University",
      year: "2026",
      note: "Team of three. We compared five classifiers on two datasets with stratified 5-fold cross-validation, after removing 29 leakage-prone or unusable columns. I built the Python pipeline and ran the feature-selection and cross-validation experiments.",
      link: ""
    },
    {
      title: "Analysis of Lung Cancer Risk Associated with Long-Term Smoking Using Machine Learning Approaches",
      venue: "UCICS 2026, Varendra University",
      year: "2026",
      note: "Accepted. Second author.",
      link: ""
    }
  ],

  /* ---------- Education ----------
     Newest first. Add "school" for HSC and SSC if you want to show them. */
  education: [
    {
      degree: "B.Sc. in Computer Science and Engineering",
      school: "Varendra University, Rajshahi",
      period: "2026",
      detail: "CGPA 3.86 out of 4.00"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      school: "New Govt. Degree College, Rajshahi",
      period: "2020",
      detail: "GPA 5.00"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      school: "Govt. Laboratory High School, Rajshahi",
      period: "2018",
      detail: "GPA 5.00"
    }
  ],

  experience: []
};
