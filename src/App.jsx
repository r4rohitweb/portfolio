import React, { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";

const images = {
  avatar: new URL("../avatar.png", import.meta.url).href,
  avatarNew: new URL("../avatar-new.png", import.meta.url).href,
  trvHome: new URL("../trv-home.jpg", import.meta.url).href,
  watsooHome: new URL("../watsoo-home.jpg", import.meta.url).href,
  jindalHome: new URL("../jindal-home.jpg", import.meta.url).href,
  panbrand: new URL("../panbrand.jpg", import.meta.url).href,
  vacation: new URL("../vacation.jpg", import.meta.url).href,
  katsFootwear: new URL("../kats-footwear.jpg", import.meta.url).href,
};

const navItems = ["home", "projects", "websites", "about", "experience", "skills"];

const websites = [
  {
    title: "TRV Sports",
    label: "Website 01",
    image: images.trvHome,
    role: "Frontend Development",
    stack: "HTML, CSS, JavaScript, Responsive Design",
    details: "A modern sports-focused website developed with a responsive layout, engaging visual sections, intuitive navigation, and clean frontend code to deliver a smooth browsing experience across desktop, tablet, and mobile devices.",
    alt: "TRV Sports website homepage screenshot",
    text: "A dynamic sports website featuring modern design, engaging visuals, and a fully responsive user interface.",
    tags: ["PHP", "CSS", "JavaScript", "Dynamic"],
    featured: true,
  },
  {
    title: "Watsoo",
    label: "Website 02",
    image: images.watsooHome,
    role: "Corporate Website Development",
    stack: "HTML, CSS, JavaScript, Bootstrap",
    details: "A professional corporate technology website built with structured content sections, modern UI components, responsive layouts, and intuitive navigation to showcase business solutions and services effectively.",
    alt: "Watsoo corporate technology website screenshot",
    text: "A professional technology website with structured layouts, modern UI components, and responsive design.",
    tags: ["PHP", "Bootstrap", "Responsive", "Dynamic"],
  },
  {
    title: "Jindal Footwear",
    label: "Website 03",
    image: images.jindalHome,
    role: "Business Website Development",
    stack: "HTML, CSS, JavaScript, Responsive Design",
    details: "A modern footwear brand website designed to highlight product collections, brand identity, and business offerings through attractive visuals, organized content sections, responsive layouts, and user-friendly navigation.",
    alt: "Jindal Footwear website homepage screenshot",
    text: "A modern footwear brand website showcasing product collections, attractive visuals, and responsive layouts.",
    tags: ["PHP", "CSS", "Responsive", "Dynamic"],
  },
  {
    title: "Pan Brand",
    label: "Website 03",
    image: images.panbrand,
    role: "Dynamic Website Development",
    stack: "PHP, HTML, CSS, JavaScript, Responsive Design",
    details: "A professional and dynamic business website developed for Pan Brand, featuring modern UI design, well-structured content sections, PHP-based functionality, responsive layouts, and seamless navigation to deliver an engaging user experience across all devices.",
    alt: "Pan Brand official website homepage screenshot",
    text: "A dynamic business website featuring modern UI, PHP-based functionality, responsive layouts, and a seamless browsing experience.",
    tags: ["PHP", "CSS", "Responsive", "Dynamic"],
  },
  {
    title: "The Vacation Finder",
    label: "Website 05",
    image: images.vacation,
    role: "Travel Website Development",
    stack: "PHP, HTML, CSS, JavaScript, Responsive Design",
    details: "A modern travel and tourism website developed for The Vacation Finder, featuring attractive destination showcases, organized travel package sections, intuitive navigation, dynamic functionality, and responsive layouts to provide a seamless browsing experience across desktop, tablet, and mobile devices.",
    alt: "The Vacation Finder travel website homepage screenshot",
    text: "A modern travel and tourism website showcasing destinations, holiday packages, and responsive layouts for a smooth user experience.",
    tags: ["PHP", "CSS", "Responsive", "Dynamic"],
  },
  {
    title: "Kats Footwear",
    label: "Website 06",
    image: images.katsFootwear,
    role: "Footwear Website Development",
    stack: "PHP, HTML, CSS, JavaScript, Responsive Design",
    details: "A modern and responsive footwear brand website developed for Kats Footwear, featuring attractive product showcases, organized footwear collections, professional brand presentation, dynamic functionality, and user-friendly navigation to deliver a seamless browsing experience across desktop, tablet, and mobile devices.",
    alt: "Kats Footwear website homepage screenshot",
    text: "A modern footwear brand website showcasing stylish footwear collections, attractive product visuals, and responsive layouts for a smooth browsing experience.",
    tags: ["PHP", "CSS", "Responsive", "Dynamic"],
  },
];

const timeline = [
  ["2025", "Now streaming", "Frontend Developer", "Big Data Technology Limited (BDTL), Gurugram", "Design and develop responsive, user-centric websites aligned with business and project requirements. Build HTML5, CSS3, Bootstrap, and React.js interfaces, collaborate with teams, debug issues, and optimize for performance and accessibility.", true],
  ["2024", "Season highlight", "Frontend Developer", "Rapidsoft Technology, Gurugram", "Designed responsive websites, developed interactive UI components, worked with clients on requirements and feedback, and optimized websites for better performance and user experience."],
  ["2023", "Behind the build", "Frontend Developer", "Webmart India, Netaji Subhash Place, Delhi", "Converted PSD/Figma designs into pixel-perfect HTML and Bootstrap layouts, created demo pages for client review, customized websites, and tested responsiveness across browsers."],
  ["2018", "Origin story", "Web Designer / Frontend Designer", "GTM Infotech, Shakti Nagar, Delhi", "Started as a web designer, converting PSD designs into responsive HTML/CSS websites, building Bootstrap layouts, maintaining client websites, and assisting with testing before deployment."],
];

function App() {
  const [phase, setPhase] = useState("intro");
  const [introClasses, setIntroClasses] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  const bodyClass = useMemo(() => {
    const modal = selectedProject ? " modal-open" : "";
    if (phase === "intro") return `intro-active${modal}`;
    if (phase === "gate") return `gate-active${modal}`;
    return `portfolio-active${modal}`;
  }, [phase, selectedProject]);

  useEffect(() => {
    document.body.className = bodyClass;
    return () => {
      document.body.className = "";
    };
  }, [bodyClass]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIntroClasses("is-name-visible"));
    const imageTimer = window.setTimeout(() => setIntroClasses("is-name-visible is-image-visible"), 900);
    const settleTimer = window.setTimeout(() => setIntroClasses("is-name-visible is-image-visible is-settled"), 1850);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(imageTimer);
      clearTimeout(settleTimer);
    };
  }, []);

  useEffect(() => {
    const setCurrentSection = () => {
      const current = [...document.querySelectorAll("section[id]")]
        .filter((section) => section.getBoundingClientRect().top < 180)
        .pop();
      if (current) setActiveSection(current.id);
    };
    setCurrentSection();
    window.addEventListener("scroll", setCurrentSection, { passive: true });
    return () => window.removeEventListener("scroll", setCurrentSection);
  }, []);

  useEffect(() => {
    const skillStage = document.querySelector("[data-skill-stage]");
    const skillCards = document.querySelectorAll(".skills-grid article");
    if (!skillStage) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(skillStage, { opacity: 0, y: 54, scale: 0.96, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" });
        gsap.fromTo(".ashen-copy > *", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.82, stagger: 0.1, delay: 0.18, ease: "power3.out" });
        gsap.fromTo(skillCards, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.055, delay: 0.28, ease: "power3.out" });
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(skillStage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const openGate = () => {
    setPhase("gate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enterPortfolio = () => {
    setPhase("portfolio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="name-intro" data-name-intro aria-label="Opening title animation">
        <div className={`name-intro__stage ${introClasses}`.trim()}>
          <h1>Rohit Kumar</h1>
          <p>Frontend Developer</p>
          <img className="name-intro__portrait" src={images.avatar} alt="Rohit Kumar avatar" />
          <button className="intro-scroll-button" type="button" onClick={openGate}>
            Scroll down to view full portfolio
          </button>
        </div>
      </section>

      <section className={`profile-gate ${phase === "portfolio" ? "is-hidden" : ""}`} data-profile-gate aria-label="Choose portfolio perspective">
        <a className="gate-brand" href="#home" aria-label="Rohit Kumar portfolio">
          <span>ROHIT KUMAR</span>
          <small>FRONTEND DEVELOPER</small>
        </a>

        <div className="gate-content">
          <p className="gate-kicker">One story. Three perspectives.</p>
          <h1>Who's watching?</h1>
          <div className="viewer-grid">
            {[
              ["recruiter", "R", "Recruiter", "The experience. The skills. The story."],
              ["developer", "</>", "Developer", "The builds. The stack. The details."],
              ["designer", "*", "Designer", "The interfaces. The ideas. The craft."],
            ].map(([type, icon, title, text]) => (
              <button className={`viewer-card ${type}`} type="button" onClick={enterPortfolio} key={type}>
                <span className="viewer-icon">{icon}</span>
                <strong>{title}</strong>
                <small>{text}</small>
              </button>
            ))}
          </div>
          <button className="explore-button" type="button" onClick={enterPortfolio}>Just exploring</button>
          <p className="gate-note">Choose your perspective. Explore the full story.</p>
        </div>
        <p className="gate-footer">Designed in Delhi - Built for the web</p>
      </section>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Rohit Kumar portfolio home">
          <span>ROHIT KUMAR</span>
          <small>Frontend Developer</small>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={`#${item}`} className={activeSection === item ? "active" : ""} key={item}>
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
        <button className="role-switch" type="button"><span>*</span>Frontend<b>v</b></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="original"><span>R</span> Portfolio Original</p>
            <p className="overline">Frontend Developer | UI Developer | Web Designer</p>
            <h1>ROHIT<br />KUMAR<span>.</span></h1>
            <div className="meta-row">
              <strong>5+ years experience</strong>
              <span>Delhi, India</span>
              <em>HTML - CSS - JS - React</em>
              <span>Responsive websites. Clean UI. Real projects.</span>
            </div>
            <p className="summary">Frontend developer with experience designing and developing responsive, user-friendly websites using HTML5, CSS3, Bootstrap, JavaScript, React, and modern UI practices.</p>
            <div className="actions">
              <a className="button play" href="#projects"> Explore my work</a>
              <a className="button info" href="#about"> More about me</a>
            </div>
            <p className="tags">PSD/Figma to HTML&nbsp;&nbsp;-&nbsp;&nbsp;Frontend Development&nbsp;&nbsp;-&nbsp;&nbsp;Responsive UI</p>
            <p className="collab">Performance focused. Pixel precise. Client ready.</p>
          </div>

          <div className="hero-mark" aria-hidden="true">
            <span className="episode">RK / 001</span>
            <div className="letter-r">R</div>
            <img className="hero-avatar" src={images.avatar} alt="" />
            <div className="hero-chip chip-one"><small>2025 - Present</small><span>BDTL, Gurugram</span></div>
            <div className="hero-chip chip-two"><small>5+ Years</small><span>Frontend + UI</span></div>
            <div className="mark-caption"><strong>Frontend.</strong><strong>UI Developer.</strong><strong>Web Designer.</strong></div>
            <span className="scroll-cue">Scroll to explore v</span>
          </div>
        </section>

        <section className="chapter-section" id="projects">
          <div className="section-head">
            <div><h2>Continue exploring</h2><p>Every great story has a few chapters.</p></div>
            <div className="arrows" aria-hidden="true"><span>&lt;</span><span>&gt;</span></div>
          </div>
          <div className="chapter-grid">
            {[
              ["blue", "Documentary", "The Full Story", "5+ years in frontend", "Play about chapter"],
              ["purple", "Behind the scenes", "My Skill Universe", "HTML, CSS, JS, React", "Play skills chapter"],
              ["red", "The originals", "Client Websites", "PSD/Figma to responsive UI", "Play project chapter"],
              ["gold", "Coming next", "Performance Ready", "Debug, test, optimize", "Play future chapter"],
            ].map(([color, label, title, text, aria]) => (
              <article className={`chapter ${color}`} key={title}>
                <div className="chapter-top"><b>R</b><span>{label}</span></div>
                <p>The collection</p>
                <h3>{title}</h3>
                <small>{text}</small>
                <button aria-label={aria} type="button">&gt;</button>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <h2>Featured originals</h2>
          <div className="feature-grid">
            {[
              ["01", "Responsive Website Builds", "Modern websites built with HTML5, CSS3, Bootstrap, JavaScript, and React.js."],
              ["02", "PSD/Figma Conversion", "Pixel-perfect frontend pages converted from design mockups into responsive layouts."],
              ["03", "Testing & Optimization", "Cross-browser fixes, responsive testing, debugging, and performance improvements."],
            ].map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="portfolio-showcase" id="websites">
          <div className="showcase-head">
            <div><p className="episode-label">Selected Websites</p><h2>My Website Showcase</h2></div>
            <p>Explore a selection of websites I've developed for sports, technology, and footwear brands, focusing on responsive layouts, modern UI design, and seamless user experiences.</p>
          </div>
          <div className="website-grid">
            {websites.map((project) => (
              <article className={`website-card ${project.featured ? "featured" : ""}`} key={project.title}>
                <div
                  className="website-card__body"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${project.title} project details`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    setSelectedProject(project);
                  }}
                >
                  <figure className="website-preview"><img src={project.image} alt={project.alt} /></figure>
                  <div className="website-info">
                    <span>{project.label}</span>
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                    <div className="website-tags">{project.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                    <span className="website-detail-button">View details</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section" id="about">
          <div className="about-poster">
            <img src={images.avatarNew} alt="Rohit Kumar avatar" />
            <div className="poster-name"><span>Portfolio</span><strong>Rohit Kumar</strong></div>
            <small>RK - 001</small>
          </div>
          <article className="about-copy">
            <p className="episode-label">Episode 01 - The person behind the pixels</p>
            <h2>Frontend developer building responsive, polished web interfaces with 5+ years of real project experience.</h2>
            <p>I create clean, user-friendly websites using HTML5, CSS3, Bootstrap, JavaScript, React.js, and modern UI practices. My work focuses on pixel-perfect design conversion, responsive layouts, cross-browser testing, debugging, and performance-minded frontend delivery.</p>
            <div className="about-stats">
              {[["Role", "Frontend Developer"], ["Location", "Delhi, India"], ["Focus", "HTML, CSS, JS, React"], ["Experience", "5+ Years"]].map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            <div className="about-tags"><span>Responsive Design</span><span>PSD/Figma to HTML</span><span>UI Development</span></div>
            <a href="mailto:r4rohitweb@gmail.com">Contact: r4rohitweb@gmail.com</a>
          </article>
        </section>

        <section className="resume-section" id="experience">
          <div className="skills-title">
            <div><p className="episode-label">Career timeline</p><h2>Work experience</h2></div>
            <span>Frontend - UI - Web Design</span>
          </div>
          <div className="timeline">
            {timeline.map(([year, tag, title, company, text, current]) => (
              <article className={`timeline-card ${current ? "is-current" : ""}`} key={`${year}-${company}`}>
                <div className="timeline-year">{year}</div>
                <div className="timeline-content">
                  <p className="timeline-tag">{tag}</p>
                  <h3>{title}</h3>
                  <strong>{company}</strong>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="ashen-skill-stage" data-skill-stage>
            <div className="ashen-copy">
              <p className="episode-label">Interactive shelf</p>
              <h3>Rohit Kumar skills library</h3>
              <p>Hover, select, flip, and drag through a tactile 3D art-book shelf. Each volume represents a skill chapter behind the portfolio.</p>
            </div>
            <iframe className="ashen-frame" title="Rohit Kumar interactive skills shelf" src="/ashen-press.html" loading="lazy" />
          </div>
        </section>

        <section className="ending" id="contact">
          <p>Phone: +91 9718416956 - Email: r4rohitweb@gmail.com - Burari, Delhi</p>
        </section>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className={`project-modal ${project ? "is-open" : ""}`} aria-hidden={project ? "false" : "true"}>
      <div className="project-modal__overlay" onClick={onClose}></div>
      <article className="project-modal__panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button className="project-modal__close" type="button" aria-label="Close project details" onClick={onClose}>x</button>
        <div className="project-modal__preview">
          <img src={project?.image || images.trvHome} alt={project ? `${project.title} full page preview` : ""} />
        </div>
        <div className="project-modal__content">
          <p className="episode-label">{project?.label || "Website 01"}</p>
          <h2 id="project-modal-title">{project?.title || "Corporate Landing Page"}</h2>
          <p>{project?.details}</p>
          <div className="project-modal__facts">
            <div><span>Role</span><strong>{project?.role}</strong></div>
            <div><span>Stack</span><strong>{project?.stack}</strong></div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default App;
