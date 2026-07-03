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
        <FeaturedSystem />
        <Process />
        <Proof />
        <CTA />
        <Footer />
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
        <a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a>
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

        <h1>Tech systems that make your business look bigger, faster, and sharper.</h1>

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
              <h3>AI Growth Dashboard</h3>
            </div>

            <span className="status-dot">Online</span>
          </div>

          <div className="metric-grid">
            <div>
              <p>Leads</p>
              <strong>+42%</strong>
            </div>

            <div>
              <p>Manual Work</p>
              <strong>-68%</strong>
            </div>

            <div>
              <p>Response Time</p>
              <strong>Instant</strong>
            </div>

            <div>
              <p>Bookings</p>
              <strong>Auto</strong>
            </div>
          </div>

          <div className="ai-flow">
            <div>
              <BrainCircuit /> AI Assistant
            </div>

            <span></span>

            <div>
              <MousePointerClick /> Website Form
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
      <div className="section-heading">
        <p className="eyebrow">What we build</p>
        <h2>Everything a modern business needs to operate online.</h2>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <article
            className="service-card"
            key={service.title}
            style={{ '--delay': `${index * 90}ms` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedSystem() {
  return (
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
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>From idea to live system.</h2>
      </div>

      <div className="process-grid">
        {processSteps.map(([num, title, text]) => (
          <article className="process-card" key={num}>
            <strong>{num}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="proof">
      <div>
        <h2>Designed for trades, real estate, service companies, clinics, local brands, and growing teams.</h2>
        <p>
          The goal is simple: make your business easier to find, easier to trust, easier to book,
          and easier to run.
        </p>
      </div>

      <div className="proof-card">
        <p>Business Impact</p>
        <h3>More professional. More automated. More scalable.</h3>
      </div>
    </section>
  );
}

function CTA() {
  const [state, handleSubmit] = useForm('mnjkldgl');

  return (
    <section className="cta" id="contact">
      <div>
        <p className="eyebrow">Ready to build?</p>
        <h2>Request a quote for your next digital system.</h2>

        <p>
          Tell us what you need built. Pacific Tech Solutions helps businesses with
          websites, AI tools, custom software, automation systems, dashboards,
          booking flows, and quote systems.
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
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/PTS.png" alt="Pacific Tech Solutions logo" />
        <span>Pacific Tech Solutions</span>
      </div>

      <p>Solutions today. Success tomorrow.</p>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
