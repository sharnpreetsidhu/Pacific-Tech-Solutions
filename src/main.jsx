import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useForm, ValidationError } from '@formspree/react';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  Code2,
  Globe2,
  Layers3,
  Menu,
  MousePointerClick,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import './style.css';

const services = [
  {
    icon: <Bot />,
    title: 'AI Integration',
    short: 'Smart tools that answer, qualify, quote, and organize leads automatically.',
    text: 'AI quote tools, chat assistants, lead filters, and simple automations built around how your business actually works.',
    back: ['AI assistants', 'Quote workflows', 'Lead filtering', 'Owner approval'],
  },
  {
    icon: <Globe2 />,
    title: 'Website Development',
    short: 'Premium business websites that look trustworthy on every screen size.',
    text: 'High-converting websites for trades, real estate, local services, clinics, consultants, and growing brands.',
    back: ['Landing pages', 'Service pages', 'Mobile-first sections', 'Contact forms'],
  },
  {
    icon: <Code2 />,
    title: 'Custom Software',
    short: 'Dashboards, portals, booking systems, and admin panels built from scratch.',
    text: 'Custom web apps that turn messy operations into clean systems your team can actually use.',
    back: ['Dashboards', 'Client portals', 'Admin panels', 'Booking tools'],
  },
  {
    icon: <Zap />,
    title: 'Automation Systems',
    short: 'Connect your forms, emails, sheets, calendars, and notifications together.',
    text: 'Automations that reduce repeat work and keep leads moving without the owner chasing everything manually.',
    back: ['Email flows', 'CRM routing', 'Sheet syncing', 'Team alerts'],
  },
];

const projects = [
  'AI quote generators',
  'Booking systems',
  'Smart intake forms',
  'Business dashboards',
  'Premium websites',
  'Lead follow-up flows',
  'Admin panels',
  'Client portals',
  'CRM automations',
  'AI chat assistants',
];

const processSteps = [
  ['01', 'Map', 'We turn your business problem into a clear system plan, pages, forms, workflows, and automations.'],
  ['02', 'Design', 'We create a premium interface that feels clean, modern, trustworthy, and easy to use on mobile.'],
  ['03', 'Build', 'We code the website, backend, forms, AI flow, dashboards, or automations your business needs.'],
  ['04', 'Launch', 'We deploy, test, optimize, and make sure the experience feels smooth on phones, tablets, and desktop.'],
];

const industries = [
  'Trades & contractors',
  'Real estate professionals',
  'Clinics & wellness businesses',
  'Restaurants & food services',
  'Consultants & local service brands',
  'Growing teams with messy workflows',
];

const packages = [
  {
    title: 'Website Systems',
    text: 'A premium online presence built to make your business look established, trustworthy, and easy to contact.',
    features: ['Mobile-first design', 'Lead capture forms', 'Service sections', 'Launch-ready setup'],
  },
  {
    title: 'AI Business Tools',
    text: 'Smart tools that help answer questions, collect project details, organize leads, and speed up quoting.',
    features: ['AI assistants', 'Quote flows', 'Customer intake', 'Auto responses'],
  },
  {
    title: 'Custom Software',
    text: 'Internal systems built around how your business actually works instead of forcing you into generic software.',
    features: ['Dashboards', 'Admin portals', 'Booking systems', 'Custom web apps'],
  },
  {
    title: 'Automation Setup',
    text: 'Connect your website, inbox, forms, spreadsheets, calendar, and alerts so the business runs smoother.',
    features: ['Lead routing', 'Email workflows', 'Sheet syncing', 'Team notifications'],
  },
];

const faqs = [
  {
    question: 'How long does a website take?',
    answer: 'A clean business website can usually be built within a few business days once the content, logo, and direction are ready. More advanced systems depend on the features needed.',
  },
  {
    question: 'Can you build AI tools for my business?',
    answer: 'Yes. Pacific Tech Solutions can build AI quote tools, customer intake systems, internal assistants, lead workflows, and automation systems around your business process.',
  },
  {
    question: 'Do I need to know exactly what I want?',
    answer: 'No. You can explain your business and what feels slow, messy, or outdated. Then we can map the best website, software, AI tool, or automation system.',
  },
  {
    question: 'Can you update an existing website?',
    answer: 'Yes. Existing websites can be redesigned, improved for mobile, connected to better forms, upgraded with new sections, or expanded with automation and AI features.',
  },
];

function Reveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${isVisible ? 'show' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <WelcomeScreen />}

      <main className={`site-shell ${loading ? 'site-hidden' : 'site-ready'}`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero />
        <LogoStrip />
        <Services />
        <ImpactBand />
        <WhoWeHelp />
        <Packages />
        <FeaturedSystem />
        <Process />
        <Proof />
        <FAQ />
        <CTA />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}

function WelcomeScreen() {
  return (
    <section className="welcome-screen">
      <div className="welcome-grid"></div>
      <div className="welcome-orb orb-one"></div>
      <div className="welcome-orb orb-two"></div>

      <div className="welcome-card">
        <img src="/PTS.png" alt="Pacific Tech Solutions logo" className="welcome-logo" />
        <p className="eyebrow">Pacific Tech Solutions</p>
        <h1>Building smarter business systems.</h1>
        <p className="welcome-copy">Websites • AI tools • Software • Automation</p>
        <div className="loading-bar"><span></span></div>
        <p className="loading-text">Loading premium experience...</p>
      </div>
    </section>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="navbar">
      <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
        <img src="/PTS.png" alt="Pacific Tech Solutions logo" />
        <span>Pacific Tech Solutions</span>
      </a>

      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#industries" onClick={() => setMenuOpen(false)}>Who We Help</a>
        <a href="#packages" onClick={() => setMenuOpen(false)}>Solutions</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>

      <a className="nav-cta" href="#contact">Start a Project</a>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg"></div>

      <div className="hero-content reveal-up">
        <div className="pill">
          <Sparkles size={16} /> AI • Websites • Software • Automation
        </div>

        <h1>
          Websites, AI tools, and software built to help businesses grow
        </h1>

        <p>
          Pacific Tech Solutions builds premium websites, AI integrations, booking systems, quote tools, dashboards, and custom software for small to medium businesses ready to level up.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn primary">Build My System <ArrowRight size={18} /></a>
          <a href="#services" className="btn secondary">See What We Build</a>
        </div>

        <div className="hero-stats">
          <div><strong>AI</strong><span>Powered Business tools</span></div>
          <div><strong>24/7</strong><span>Digital presence</span></div>
          <div><strong>100%</strong><span>Custom-built approach</span></div>
        </div>
      </div>

      <div className="hero-visual reveal-up delay-one">
        <div className="orbital-stage" aria-hidden="true">
          <div className="orbit-ring ring-one"></div>
          <div className="orbit-ring ring-two"></div>
          <div className="floating-cube cube-one"><Bot size={28} /></div>
          <div className="floating-cube cube-two"><Code2 size={28} /></div>
          <div className="floating-cube cube-three"><Zap size={28} /></div>
        </div>

        <div className="glass-panel dashboard-card">
          <div className="panel-top"><span></span><span></span><span></span></div>

          <div className="system-status">
            <div>
              <p>Live Business System</p>
              <h3>AI Quote & Lead Engine</h3>
            </div>
            <span className="status-dot">Online</span>
          </div>

          <div className="metric-grid">
            <div><p>New Leads</p><strong>Auto</strong></div>
            <div><p>Manual Work</p><strong>-62%</strong></div>
            <div><p>Response Time</p><strong>Instant</strong></div>
            <div><p>Requests</p><strong>Sorted</strong></div>
          </div>

          <div className="ai-flow">
            <div><MousePointerClick /> Website Form</div>
            <span></span>
            <div><BrainCircuit /> AI Assistant</div>
            <span></span>
            <div><ShieldCheck /> Owner Approval</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const strip = [...projects, ...projects];
  return (
    <section className="logo-strip" aria-label="What Pacific Tech Solutions builds">
      <div className="marquee-track">
        {strip.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">What we build</p>
          <h2>Everything a modern business needs to operate online and look premium.</h2>
        </div>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 110}>
            <FlipCard item={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') setFlipped(!flipped);
      }}
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">
          <div className="service-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.short}</p>
          <span className="tap-hint">Tap to flip</span>
        </div>

        <div className="flip-face flip-back">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <div className="mini-list">
            {item.back.map((feature) => <span key={feature}><Check size={15} /> {feature}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function ImpactBand() {
  return (
    <Reveal>
      <section className="impact-band">
        <div className="impact-copy">
          <p className="eyebrow">Mobile-first experience</p>
          <h2>Professional websites and business systems that make your company look credible, modern, and ready for bigger clients.</h2>
        </div>
        <div className="phone-stack" aria-hidden="true">
          <div className="phone-card phone-main">
            <div className="phone-notch"></div>
            <div className="phone-screen-line wide"></div>
            <div className="phone-screen-line"></div>
            <div className="phone-mini-grid"><span></span><span></span><span></span><span></span></div>
            <div className="phone-cta"></div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function FeaturedSystem() {
  return (
    <Reveal>
      <section className="featured" id="systems">
        <div className="featured-copy">
          <p className="eyebrow">Built for real businesses</p>
          <h2>Not just a website. A full digital machine.</h2>
          <p>
            Most small businesses lose time answering the same questions, chasing leads, sending manual quotes,
            and managing messy spreadsheets. We build systems that handle the boring work and make the business feel premium from the first click.
          </p>

          <div className="project-list">
            {projects.map((project) => <span key={project}>{project}</span>)}
          </div>
        </div>

        <div className="stack-card">
          <div className="stack-item"><Layers3 /> Website frontend</div>
          <div className="stack-item"><Bot /> AI workflow</div>
          <div className="stack-item"><Code2 /> Smart data capture</div>
          <div className="stack-item"><Zap /> Automated follow-up</div>
        </div>
      </section>
    </Reveal>
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>A clean build process from idea to live system.</h2>
        </div>
      </Reveal>

      <div className="process-grid">
        {processSteps.map(([num, title, text], index) => (
          <Reveal key={num} delay={index * 110}>
            <article className="process-card">
              <strong>{num}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <Reveal>
      <section className="proof">
        <div>
          <p className="eyebrow">Built to impress fast</p>
          <h2>Designed for businesses that need trust, speed, and a sharper online presence.</h2>
          <p>The goal is simple: make your business easier to find, easier to trust, easier to book, and easier to run.</p>
        </div>

        <div className="proof-card">
          <p>Business Impact</p>
          <h3>Professional systems that make your business feel bigger.</h3>
          <div className="proof-pills">
            <span><Zap size={15} /> Faster response</span>
            <span><Globe2 size={15} /> Better mobile</span>
            <span><ArrowRight size={15} /> Premium launch</span>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function CTA() {
  const [state, handleSubmit] = useForm('mnjkldgl');

  return (
    <Reveal>
      <section className="cta" id="contact">
        <div>
          <p className="eyebrow">Ready to build?</p>
          <h2>Tell us what you want built.</h2>
          <p>Send the details and we’ll help map the best website, AI tool, software, or automation system for your business.</p>

          <div className="contact-details">
            <p><strong>Email:</strong> <a href="mailto:pacifictechsolutions7@gmail.com">pacifictechsolutions7@gmail.com</a></p>
            <p><strong>Serving:</strong> Businesses across Canada</p>
          </div>
        </div>

        {state.succeeded ? (
          <div className="success-card">
            <h3>Request sent.</h3>
            <p>Thanks for reaching out. Pacific Tech Solutions will get back to you soon.</p>
            <a className="btn secondary" href="#top">Back to top</a>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your name" required />
            <ValidationError className="form-error" prefix="Name" field="name" errors={state.errors} />

            <input name="email" type="email" placeholder="Email address" required />
            <ValidationError className="form-error" prefix="Email" field="email" errors={state.errors} />

            <input name="phone" type="text" placeholder="Phone number optional" />
            <input name="business" type="text" placeholder="Business name" />

            <select name="service" defaultValue="" required>
              <option value="" disabled>What do you need?</option>
              <option>Website development</option>
              <option>AI integration</option>
              <option>Custom software</option>
              <option>Business automation</option>
              <option>Quote system</option>
              <option>Booking system</option>
              <option>Dashboard or admin panel</option>
              <option>Not sure yet</option>
            </select>
            <ValidationError className="form-error" prefix="Service" field="service" errors={state.errors} />

            <select name="budget" defaultValue="">
              <option value="" disabled>Estimated budget</option>
              <option>Under $500</option>
              <option>$500 - $1,000</option>
              <option>$1,000 - $2,500</option>
              <option>$2,500 - $5,000</option>
              <option>$5,000+</option>
              <option>Not sure yet</option>
            </select>

            <select name="timeline" defaultValue="">
              <option value="" disabled>Timeline</option>
              <option>ASAP</option>
              <option>1-2 weeks</option>
              <option>2-4 weeks</option>
              <option>1-2 months</option>
              <option>Just exploring</option>
            </select>

            <textarea name="message" placeholder="Tell us about the project, business, and what you want the system to do..." required></textarea>
            <ValidationError className="form-error" prefix="Message" field="message" errors={state.errors} />

            <input type="hidden" name="_subject" value="New quote request from Pacific Tech Solutions website" />

            <button className="btn primary" type="submit" disabled={state.submitting}>
              {state.submitting ? 'Sending...' : 'Request Quote'}
              {!state.submitting && <ArrowRight size={18} />}
            </button>
          </form>
        )}
      </section>
    </Reveal>
  );
}

function WhoWeHelp() {
  return (
    <section className="section who-section" id="industries">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Who we help</p>
          <h2>Built for local businesses that need better systems.</h2>
        </div>
      </Reveal>

      <div className="industry-grid">
        {industries.map((industry, index) => (
          <Reveal key={industry} delay={index * 85}>
            <div className="industry-card"><ShieldCheck /><span>{industry}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="section packages-section" id="packages">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">Solutions</p>
          <h2>Packages built around what your business actually needs.</h2>
        </div>
      </Reveal>

      <div className="packages-grid">
        {packages.map((item, index) => (
          <Reveal key={item.title} delay={index * 110}>
            <article className="package-card">
              <div className="package-orb"><Layers3 size={21} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <div className="package-features">
                {item.features.map((feature) => <span key={feature}><Sparkles size={15} />{feature}</span>)}
              </div>

              <a href="#contact" className="package-link">Request Quote <ArrowRight size={16} /></a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Common questions before starting a project.</h2>
        </div>
      </Reveal>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <Reveal key={item.question} delay={index * 85}>
            <details className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MobileStickyCTA() {
  return <a href="#contact" className="mobile-sticky-cta"><PhoneCall size={16} /> Request Quote</a>;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-brand">
          <img src="/PTS.png" alt="Pacific Tech Solutions logo" />
          <span>Pacific Tech Solutions</span>
        </div>
        <p>AI Integration • Website Development • Custom Software • Automation</p>
      </div>

      <div className="footer-right">
        <a href="mailto:pacifictechsolutions7@gmail.com">pacifictechsolutions7@gmail.com</a>
        <span>Serving businesses across Canada</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);