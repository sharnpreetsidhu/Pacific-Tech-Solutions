import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useForm, ValidationError } from '@formspree/react';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Globe2,
  Layers3,
  Menu,
  MousePointerClick,
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
    text: 'AI quote systems, chat assistants, lead qualification, internal tools, and automations built around your business workflow.',
  },
  {
    icon: <Globe2 />,
    title: 'Website Development',
    text: 'High-converting websites for trades, real estate, local services, clinics, consultants, and growing brands.',
  },
  {
    icon: <Code2 />,
    title: 'Custom Software',
    text: 'Dashboards, portals, booking systems, quote calculators, CRM tools, and admin panels designed from scratch.',
  },
  {
    icon: <Zap />,
    title: 'Automation Systems',
    text: 'Connect forms, emails, spreadsheets, CRMs, calendars, and notifications so teams stop wasting time on repeat work.',
  },
];

const projects = [
  'AI Quote Generator for service businesses',
  'Booking and inquiry systems',
  'Smart customer intake forms',
  'Business dashboards and admin panels',
  'Portfolio websites that look premium',
  'Automated lead follow-up flows',
];

const processSteps = [
  ['01', 'Discover', 'We map the business problem, customer journey, and the exact workflow that needs to improve.'],
  ['02', 'Build', 'We design, code, automate, and connect the tools into one clean system.'],
  ['03', 'Launch', 'We deploy the product, test everything, and make sure it works on desktop and mobile.'],
  ['04', 'Scale', 'We improve the system with analytics, AI, automations, and new features as the business grows.'],
];

const industries = [
  'Trades & contractors',
  'Real estate professionals',
  'Clinics & wellness businesses',
  'Restaurants & food services',
  'Consultants & local service brands',
];

const packages = [
  {
    title: 'Website Development',
    text: 'From clean basic websites to premium business websites with advanced sections, animations, booking forms, and lead capture.',
    features: [
      'Basic business websites',
      'Premium landing pages',
      'Mobile-friendly design',
      'Contact and quote forms',
    ],
  },
  {
    title: 'AI-Integrated Websites',
    text: 'Websites upgraded with AI chatbots, smart quote flows, customer intake tools, and automated support features.',
    features: [
      'AI chatbots',
      'Smart quote systems',
      'Customer intake flows',
      'Automated responses',
    ],
  },
  {
    title: 'Custom Software',
    text: 'Custom tools built around how your business actually works, including dashboards, portals, booking systems, and internal admin panels.',
    features: [
      'Business dashboards',
      'Admin panels',
      'Booking systems',
      'Custom web apps',
    ],
  },
  {
    title: 'Automation Package',
    text: 'Automations that connect your forms, emails, spreadsheets, calendars, CRMs, and notifications so your business runs smoother.',
    features: [
      'Lead routing',
      'Follow-up flows',
      'Email notifications',
      'Workflow automation',
    ],
  },
];

const faqs = [
  {
    question: 'How long does a website take?',
    answer:
      'A basic business website can usually be built within 2-3 business days once the content, logo, and direction are ready. More advanced systems depend on the features needed.',
  },
  {
    question: 'Can you build AI tools for my business?',
    answer:
      'Yes. Pacific Tech Solutions can build AI quote tools, customer intake systems, internal assistants, lead workflows, and automation systems around your business process.',
  },
  {
    question: 'Do I need to know exactly what I want?',
    answer:
      'No. You can explain your business and what problems you want solved, then we can help map out the best website, software, AI tool, or automation system.',
  },
  {
    question: 'Can you update an existing website?',
    answer:
      'Yes. Existing websites can be redesigned, improved for mobile, connected to forms, upgraded with better sections, or expanded with automation and AI features.',
  },
  {
    question: 'Do you offer maintenance?',
    answer:
      'Yes. Maintenance can include small updates, improvements, new pages, bug fixes, form changes, and future feature upgrades.',
  },
];

function Reveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

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
    const timer = setTimeout(() => setLoading(false), 5000);
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

        <p className="eyebrow">Welcome to</p>
        <h1>Pacific Tech Solutions</h1>

        <p className="welcome-copy">
          Building websites, AI systems, automation tools, and custom software that help small
          and medium businesses move like enterprise companies.
        </p>

        <div className="loading-bar">
          <span></span>
        </div>

        <p className="loading-text">Initializing digital growth system...</p>
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
          <Sparkles size={16} />
          AI • Websites • Software • Automation
        </div>

        <h1>Websites, AI tools, and software built to help businesses grow</h1>

        <p>
          Pacific Tech Solutions builds premium websites, AI integrations, booking systems,
          quote tools, dashboards, and custom software for small to medium businesses ready to level up.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn primary">
            Build My System <ArrowRight size={18} />
          </a>

          <a href="#services" className="btn secondary">
            View Services
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>AI</strong>
            <span>Powered Business Systems</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Digital presence</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Custom-built approach</span>
          </div>
        </div>
      </div>

      <div className="hero-visual reveal-up delay-one">
        <div className="glass-panel dashboard-card">
          <div className="panel-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="system-status">
            <div>
              <p>Live Business System</p>
              <h3>AI Qoute & Lead System</h3>
            </div>

            <span className="status-dot">Online</span>
          </div>

        <div className="metric-grid">
  <div>
    <p>New Leads</p>
    <strong>Auto</strong>
  </div>

  <div>
    <p>Manual Work</p>
    <strong>Reduced</strong>
  </div>

  <div>
    <p>Response Time</p>
    <strong>Instant</strong>
  </div>

  <div>
    <p>Quote Requests</p>
    <strong>Organized</strong>
  </div>
</div>

    <div className="ai-flow">
  <div>
    <MousePointerClick /> Website Form
  </div>

  <span></span>

  <div>
    <BrainCircuit /> AI Assistant
  </div>

  <span></span>

  <div>
    <ShieldCheck /> Owner Approval
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="logo-strip">
      <span>Websites</span>
      <span>AI Quote Tools</span>
      <span>Dashboards</span>
      <span>Automations</span>
      <span>Booking Systems</span>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">What we build</p>
          <h2>Everything a modern business needs to operate online.</h2>
        </div>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 120}>
            <article className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
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
            Most small businesses lose time answering the same questions, chasing leads,
            sending manual quotes, and managing messy spreadsheets. We build systems that
            handle the boring work and make the business feel premium from the first click.
          </p>

          <div className="project-list">
            {projects.map((project) => (
              <span key={project}>{project}</span>
            ))}
          </div>
        </div>

        <div className="stack-card">
          <div className="stack-item">
            <Layers3 /> Website frontend
          </div>

          <div className="stack-item">
            <Bot /> AI workflow
          </div>

          <div className="stack-item">
            <Code2 /> Custom backend
          </div>

          <div className="stack-item">
            <Zap /> Automated follow-up
          </div>
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
          <h2>From idea to live system.</h2>
        </div>
      </Reveal>

      <div className="process-grid">
        {processSteps.map(([num, title, text], index) => (
          <Reveal key={num} delay={index * 120}>
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
          <h2>
            Designed for trades, real estate, service companies, clinics, local brands,
            and growing teams.
          </h2>

          <p>
            The goal is simple: make your business easier to find, easier to trust,
            easier to book, and easier to run.
          </p>
        </div>

        <div className="proof-card">
          <p>Business Impact</p>
          <h3>Professional systems that help your business run smoother.</h3>
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

        <p>
          We’ll help map the best website, AI tool, software, or automation system for your
  business. Send the details and we’ll get back to you with the next steps.
        </p>

    
      </div>

      {state.succeeded ? (
        <div className="success-card">
          <h3>Request sent.</h3>

          <p>
            Thanks for reaching out. Pacific Tech Solutions will get back to you soon.
          </p>

          <a className="btn secondary" href="#top">
            Back to top
          </a>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Your name" required />

          <ValidationError
            className="form-error"
            prefix="Name"
            field="name"
            errors={state.errors}
          />

          <input name="email" type="email" placeholder="Email address" required />

          <ValidationError
            className="form-error"
            prefix="Email"
            field="email"
            errors={state.errors}
          />

          <input name="phone" type="text" placeholder="Phone number optional" />

          <input name="business" type="text" placeholder="Business name" />

          <select name="service" defaultValue="" required>
            <option value="" disabled>
              What do you need?
            </option>
            <option>Website development</option>
            <option>AI integration</option>
            <option>Custom software</option>
            <option>Business automation</option>
            <option>Quote system</option>
            <option>Booking system</option>
            <option>Dashboard or admin panel</option>
            <option>Not sure yet</option>
          </select>

          <ValidationError
            className="form-error"
            prefix="Service"
            field="service"
            errors={state.errors}
          />

          <select name="budget" defaultValue="">
            <option value="" disabled>
              Estimated budget
            </option>
            <option>Under $500</option>
            <option>$500 - $1,000</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500 - $5,000</option>
            <option>$5,000+</option>
            <option>Not sure yet</option>
          </select>

          <select name="timeline" defaultValue="">
            <option value="" disabled>
              Timeline
            </option>
            <option>ASAP</option>
            <option>1-2 weeks</option>
            <option>2-4 weeks</option>
            <option>1-2 months</option>
            <option>Just exploring</option>
          </select>

          <textarea
            name="message"
            placeholder="Tell us about the project, business, and what you want the system to do..."
            required
          ></textarea>

          <ValidationError
            className="form-error"
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <input
            type="hidden"
            name="_subject"
            value="New quote request from Pacific Tech Solutions website"
          />

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
          <Reveal key={industry} delay={index * 90}>
            <div className="industry-card">
              <ShieldCheck />
              <span>{industry}</span>
            </div>
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
          <Reveal key={item.title} delay={index * 120}>
            <article className="package-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <div className="package-features">
                {item.features.map((feature) => (
                  <span key={feature}>
                    <Sparkles size={15} />
                    {feature}
                  </span>
                ))}
              </div>

              <a href="#contact" className="package-link">
                Request Quote <ArrowRight size={16} />
              </a>
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
          <Reveal key={item.question} delay={index * 90}>
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
  return (
    <a href="#contact" className="mobile-sticky-cta">
      Request Quote <ArrowRight size={16} />
    </a>
  );
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
        <a href="mailto:pacifictechsolutions7@gmail.com">
          pacifictechsolutions7@gmail.com
        </a>
        <span>Serving businesses across Canada</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
