import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Command,
  Cpu,
  ExternalLink,
  Facebook,
  Github,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

const portrait = '/assets/images/IMG_0546_%281%29.JPG';

type IconType = typeof Code2;
type ProjectAction = 'view' | 'demo' | 'source';
type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  accent: 'blue' | 'purple' | 'cyan';
  visual: 'business' | 'commerce' | 'creative';
  icon: IconType;
};

const navItems = ['Home', 'About', 'Skills', 'Services', 'Work', 'Journey', 'Contact'];

const skills = [
  { name: 'HTML / CSS', level: '90%', note: 'Structure & styling', color: 'blue' },
  { name: 'JavaScript', level: '82%', note: 'Interactive experiences', color: 'purple' },
  { name: 'WordPress', level: '88%', note: 'Flexible platforms', color: 'cyan' },
  { name: 'Elementor', level: '86%', note: 'Visual composition', color: 'blue' },
  { name: 'AI Development', level: '84%', note: 'Smarter workflows', color: 'purple' },
  { name: 'UI / UX Design', level: '78%', note: 'Human-centered thinking', color: 'cyan' },
];

const projects: Project[] = [
  {
    number: '01',
    category: 'Demo project / 01',
    title: 'Modern Business Website',
    description: 'A polished business concept built around confident messaging, clear navigation, and a strong first impression.',
    tags: ['Business', 'Responsive', 'Demo'],
    accent: 'blue',
    visual: 'business',
    icon: Globe2,
  },
  {
    number: '02',
    category: 'Demo project / 02',
    title: 'E-commerce Website',
    description: 'A product discovery concept that pairs a calm shopping flow with expressive visuals and focused conversion moments.',
    tags: ['Commerce', 'Product UI', 'Demo'],
    accent: 'purple',
    visual: 'commerce',
    icon: Command,
  },
  {
    number: '03',
    category: 'Demo project / 03',
    title: 'Creative Landing Page',
    description: 'An editorial landing page concept made to give a bold idea room to breathe, move, and be remembered.',
    tags: ['Creative', 'Editorial', 'Demo'],
    accent: 'cyan',
    visual: 'creative',
    icon: Layers3,
  },
];

const journey = [
  { year: '01', title: 'Curiosity', text: 'Started by asking how technology can make the everyday feel more useful and more beautiful.' },
  { year: '02', title: 'Craft', text: 'Learning to shape ideas into responsive interfaces with detail, rhythm, and intention.' },
  { year: '03', title: 'AI-powered', text: 'Exploring new tools and prompt thinking to build faster without losing the human touch.' },
];

function ProjectPreview({ project }: { project: Project }) {
  const ProjectIcon = project.icon;

  return (
    <div className={`project-preview ${project.visual}`} aria-hidden="true">
      <div className="preview-chrome"><span className="preview-dots"><i /><i /><i /></span><span>{project.category}</span><span className="preview-chrome-icon"><ProjectIcon size={13} /></span></div>
      {project.visual === 'business' && <div className="preview-business"><span className="preview-kicker">North / Studio</span><h4>Make your<br /><em>next move.</em></h4><span className="preview-cta">DISCOVER <ArrowUpRight size={12} /></span><div className="business-orbit" /><div className="business-panel"><span>strategy</span><strong>02</strong></div></div>}
      {project.visual === 'commerce' && <div className="preview-commerce"><div className="commerce-heading"><span>new arrivals</span><strong>Objects<br /><em>with purpose.</em></strong></div><div className="commerce-products"><div className="product-card product-one"><span /><b>01</b></div><div className="product-card product-two"><span /><b>02</b></div><div className="product-card product-three"><span /><b>03</b></div></div></div>}
      {project.visual === 'creative' && <div className="preview-creative"><div className="creative-copy"><span>Volume / 01</span><strong>MAKE<span>.</span></strong><i>ideas in motion</i></div><div className="creative-art"><span className="art-ring" /><span className="art-block" /><span className="art-line" /></div><span className="creative-sticker">NEW<br />FORM</span></div>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState('');
  const [activeProject, setActiveProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectAction, setProjectAction] = useState<ProjectAction>('view');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY });
    
    const handleScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    const reveals = document.querySelectorAll('.reveal');
    const handleRevealScroll = () => {
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    const combinedScroll = () => {
      handleScrollProgress();
      handleRevealScroll();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', combinedScroll);
    handleRevealScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', combinedScroll);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const openProject = (project: Project, action: ProjectAction) => {
    setSelectedProject(project);
    setProjectAction(action);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="site-shell">
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
          zIndex: 9999,
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
        }} 
      />

      <div className="cursor-orb" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      
      <header className="site-header">
        {/* লোগো সেকশন যেখানে Cpu আইকনের পরে MS. রাখা হয়েছে */}
        <a className="brand" href="#home" aria-label="Muhammad Siyam home">
          <span className="brand-mark"><Cpu size={17} strokeWidth={2.2} /></span>
          <span>MS<span className="brand-dot">.</span></span>
        </a>
        
        <nav className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a key={item} className={index === 0 ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
              <span className="nav-index">0{index + 1}</span>{item}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-copy reveal reveal-left">
            <div className="availability"><span className="pulse-dot" /> Available for a new digital chapter</div>
            <p className="eyebrow"><span>01</span> / Creative developer</p>
            <h1>Muhammad<br /><span>Siyam<span className="heading-mark">↗</span></span></h1>
            <div className="hero-intro">
              <span className="intro-line" />
              <p>I build thoughtful digital experiences where bold ideas meet clean code, curious technology, and a little bit of magic.</p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={18} /></a>
              <a className="button button-quiet" href="#contact">Contact me <span className="button-arrow">↗</span></a>
            </div>
            <div className="hero-meta"><span><MapPin size={15} /> Mymensingh, Bangladesh</span><span className="meta-divider" /><span>Scroll to explore <ArrowDown size={14} /></span></div>
          </div>

          <div className="hero-visual reveal reveal-right">
            <div className="portrait-stage">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <div className="portrait-image-wrap"><img src={portrait} alt="Muhammad Siyam outdoors" loading="eager" decoding="async" /></div>
                <div className="portrait-scan" />
                <div className="portrait-corner corner-tl" /><div className="portrait-corner corner-br" />
              </div>
              <div className="float-chip chip-top"><Sparkles size={14} /><span>creative<br /><b>energy</b></span></div>
              <div className="float-chip chip-bottom"><span className="chip-code">&lt;/&gt;</span><span>building<br /><b>the future</b></span></div>
              <div className="visual-caption"><span>Portrait / 2025</span><span>01—07</span></div>
            </div>
            <div className="hero-side-note"><span className="vertical-line" /><span>Design<br />with<br /><i>intent.</i></span></div>
          </div>
        </section>

        <section className="signal-strip" aria-label="What I do">
          <div className="marquee-track"><span>WEB DESIGN</span><i>✦</i><span>FRONTEND DEVELOPMENT</span><i>✦</i><span>AI EXPLORATION</span><i>✦</i><span>WEB DESIGN</span><i>✦</i><span>FRONTEND DEVELOPMENT</span></div>
        </section>

        <section id="about" className="about section-pad section-dark">
          <div className="section-heading reveal"><p className="eyebrow"><span>02</span> / A little about me</p><h2>Curious by nature.<br /><em>Intentional</em> by design.</h2></div>
          <div className="about-grid">
            <div className="about-statement reveal reveal-left"><span className="quote-mark">“</span><p>I&apos;m Muhammad — an aspiring AI-powered web developer with a soft spot for beautiful interfaces, emerging technology, and ideas that make people stop scrolling.</p><div className="signature">muhammad siyam <span>✦</span></div></div>
            <div className="about-details reveal reveal-right"><p className="body-lead">My approach is simple: stay curious, sweat the details, and make every interaction feel considered.</p><p>I&apos;m currently growing my craft across design, development, and AI. I love taking a blank canvas and turning it into a digital place that feels clear, expressive, and distinctly human.</p><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="about-stats reveal"><div><strong>∞</strong><span>Ideas to explore</span></div><div><strong>24/7</strong><span>Always learning</span></div><div><strong>01</strong><span>Human perspective</span></div></div>
        </section>

        <section id="skills" className="skills section-pad">
          <div className="section-heading split-heading reveal"><div><p className="eyebrow"><span>03</span> / The toolkit</p><h2>Skills that turn<br /><em>thoughts</em> into things.</h2></div><p className="heading-aside">A growing toolkit for shaping ideas into experiences that look good, feel natural, and work beautifully.</p></div>
          <div className="skills-grid reveal">
            {skills.map((skill, index) => <div className="skill-row" key={skill.name}><span className="skill-number">0{index + 1}</span><div className="skill-name"><strong>{skill.name}</strong><span>{skill.note}</span></div><div className={`skill-bar ${skill.color}`}><span style={{ width: skill.level }} /></div><span className="skill-level">{skill.level}</span></div>)}
          </div>
        </section>

        <section id="services" className="services section-pad section-dark">
          <div className="section-heading reveal"><p className="eyebrow"><span>04</span> / What I can do</p><h2>From first spark<br />to <em>final polish.</em></h2></div>
          <div className="service-grid">
            <article className="service-card reveal"><div className="service-icon"><Code2 size={22} /></div><span className="card-number">01</span><h3>Web experiences</h3><p>Responsive, expressive websites that give your idea a place to shine and your audience a reason to stay.</p><a href="#contact" aria-label="Discuss web experiences"><ArrowUpRight size={18} /></a></article>
            <article className="service-card reveal" style={{ transitionDelay: '80ms' }}><div className="service-icon purple-icon"><Zap size={22} /></div><span className="card-number">02</span><h3>AI exploration</h3><p>Thoughtful experiments with AI, automation, and prompt engineering to find smarter ways forward.</p><a href="#contact" aria-label="Discuss AI exploration"><ArrowUpRight size={18} /></a></article>
            <article className="service-card reveal" style={{ transitionDelay: '160ms' }}><div className="service-icon cyan-icon"><MousePointer2 size={22} /></div><span className="card-number">03</span><h3>UI / UX direction</h3><p>Clear visual systems and intuitive journeys that make complex products feel simple and considered.</p><a href="#contact" aria-label="Discuss UI UX direction"><ArrowUpRight size={18} /></a></article>
          </div>
        </section>

        <section id="work" className="work section-pad">
          <div className="section-heading split-heading reveal"><div><p className="eyebrow"><span>05</span> / Selected experiments</p><h2>A few things I&apos;ve<br /><em>imagined.</em></h2></div><p className="heading-aside">A collection of sample directions and concept work. The next one could be yours.</p></div>
          <div className="project-list reveal">
            {projects.map((project, index) => { const ProjectIcon = project.icon; return <article className={`project-card ${project.accent} ${activeProject === index ? 'is-active' : ''}`} key={project.title} onMouseEnter={() => setActiveProject(index)}>
              <div className="project-card-header"><div className="project-top"><span>{project.category}</span><span>{project.number} / 03</span></div><span className="demo-badge"><Sparkles size={12} /> Demo only</span></div>
              <ProjectPreview project={project} />
              <div className="project-card-content"><div className="project-card-title-row"><div><div className="project-icon"><ProjectIcon size={25} strokeWidth={1.3} /></div><h3>{project.title}</h3><p>{project.description}</p></div><button className="project-view-button" type="button" onClick={() => openProject(project, 'view')}>View project <ArrowUpRight size={16} /></button></div><div className="project-footer"><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button type="button" onClick={() => openProject(project, 'demo')}>Live demo <ExternalLink size={13} /></button><button type="button" onClick={() => openProject(project, 'source')}>Source code <Github size={13} /></button></div></div></div>
            </article>; })}
          </div>
          <div className="work-note reveal"><span className="note-line" /> Demo concepts — replace with your real work <span className="note-line" /></div>
        </section>

        <section id="journey" className="journey section-pad section-dark">
          <div className="section-heading reveal"><p className="eyebrow"><span>06</span> / The journey so far</p><h2>Still becoming.<br /><em>Always building.</em></h2></div>
          <div className="journey-layout reveal"><div className="journey-line" /><div className="journey-list">{journey.map((item, index) => <div className="journey-item" key={item.year} style={{ transitionDelay: `${index * 90}ms` }}><span className="journey-year">{item.year}</span><div className="journey-marker"><span /></div><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div><div className="journey-aside"><span>Next stop</span><strong>Somewhere<br /><em>remarkable.</em></strong><ArrowDown size={20} /></div></div>
        </section>

        <section id="contact" className="contact section-pad">
          <div className="contact-heading reveal">
            <p className="eyebrow"><span>07</span> / Say hello</p>
            <h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2>
            <p>Whether you&apos;re building something new or simply want to talk about the web, I&apos;d love to hear from you.</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-details reveal reveal-left">
              <a href="mailto:siamj206@gmail.com" className="contact-email">
                <Mail size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 
                siamj206@gmail.com <ArrowUpRight size={18} />
              </a>

              <div className="contact-info" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Mymensingh, Bangladesh</span>
                
                <a href="tel:+8801303960080" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                  <Phone size={16} /> 01303960080
                </a>
                
                <a href="https://wa.me/8801303960080" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  WhatsApp Me
                </a>

                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Usually replies within 24 hours</span>
              </div>

              <div className="social-links" style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <a
                  href="https://www.facebook.com/p/Muhammad-Siyam-61577063732834/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>

                <a href="mailto:siamj206@gmail.com" aria-label="Email" title="Gmail">
                  <Mail size={20} />
                </a>

                <a href="https://wa.me/8801303960080" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </a>
              </div>
            </div>

            <div className="contact-form-wrap reveal reveal-right">
              {submitted ? (
                <div className="form-success">
                  <h3>Message sent successfully!</h3>
                  <p>Thanks for reaching out, {formName || 'there'}. I will get back to you soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows={4} placeholder="Tell me about your project..." required></textarea>
                  </div>
                  <button type="submit" className="button button-primary">
                    Send Message <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Muhammad Siyam. All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}><X size={20} /></button>
            <div className="modal-header">
              <span className="modal-tag">{selectedProject.category}</span>
              <h2>{selectedProject.title}</h2>
            </div>
            <p>{selectedProject.description}</p>
            <div className="modal-action-box">
              {projectAction === 'source' ? (
                <p>This is a concept project. Source code repository preview coming soon!</p>
              ) : (
                <p>You are viewing the interactive modal preview for <strong>{selectedProject.title}</strong>.</p>
              )}
            </div>
            <button className="button button-primary" onClick={() => setSelectedProject(null)}>Close Preview</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;