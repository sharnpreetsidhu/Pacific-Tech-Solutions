import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm, ValidationError } from "@formspree/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Code2,
  Command,
  FileText,
  GitBranch,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MousePointer2,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import "./style.css";
import {
  SERVICES,
  HomeHero,
  ServiceCards,
  TimeCalculator,
  WorkTeaser,
  BusinessApproach,
  BusinessFAQ,
  WorkPage,
  ServicePage,
} from "./pages.jsx";

const PROFILE = { email: "admin@pacifictechsolutions.ca" };
const FORM_ID = "mnjkldgl";
const INTRO_KEY = "pts-business-intro-v3";
const routePath =
  window.location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") ||
  "/";
const currentService = SERVICES.find(
  (service) => routePath === `/services/${service.slug}`,
);
const isHome = routePath === "/";
function BrandMark({ className = "" }) {
  return (
    <span className={`original-logo ${className}`}>
      <img
        src="/PTS.png"
        width="1254"
        height="1254"
        alt="Pacific Tech Solutions"
      />
    </span>
  );
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function initialIntro() {
  if (!isHome) return false;
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.location.hash
  )
    return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "seen";
  } catch {
    return false;
  }
}

function Opening({ onFinish }) {
  const skip = useRef(null);
  useEffect(() => {
    skip.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(onFinish, 2050);
    return () => window.clearTimeout(timer);
  }, [onFinish]);
  return (
    <div
      className="opening"
      role="dialog"
      aria-modal="true"
      aria-label="Pacific Tech Solutions introduction"
      onKeyDown={(event) => {
        if (event.key === "Escape") onFinish();
      }}
    >
      <div className="opening-coordinates" aria-hidden="true">
        <span>PACIFIC TECH SOLUTIONS</span>
        <span>IDEA → INTERFACE</span>
      </div>
      <div className="opening-grid" aria-hidden="true" />
      <div className="opening-frame frame-a" aria-hidden="true" />
      <div className="opening-frame frame-b" aria-hidden="true" />
      <div className="opening-symbol" aria-hidden="true">
        <BrandMark />
        <span>MORE TIME FOR WHAT MATTERS.</span>
      </div>
      <button className="intro-skip" ref={skip} onClick={onFinish}>
        Skip intro <ArrowRight size={15} />
      </button>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const element = useRef(null);
  useEffect(() => {
    const node = element.current;
    if (
      !node ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    // Only animate content below the fold. Content is visible if JS/API support fails.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove("reveal-pending");
    };
  }, []);
  return (
    <div ref={element} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onOutside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    const query = window.matchMedia("(min-width: 801px)");
    const onResize = () => {
      if (query.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    query.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      query.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="container nav-row">
        <a
          className="brand"
          href="/"
          aria-label="Pacific Tech Solutions home"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span>
            Pacific<span className="brand-sub">TECH SOLUTIONS</span>
          </span>
        </a>
        <nav
          className={`nav-links ${open ? "is-open" : ""}`}
          id="primary-nav"
          aria-label="Main navigation"
        >
          {[
            ["/work/", "Our work"],
            ["/#expertise", "Services"],
            ["/#approach", "How it works"],
          ].map(([id, text]) => (
            <a key={id} href={id} onClick={() => setOpen(false)}>
              {text}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

const SCENARIOS = {
  website: {
    label: "Website inquiry",
    initials: "AC",
    name: "Alex Chen",
    subject: "A better home for my business.",
    message:
      "We need a new website for our local business, with services and an easy way to get in touch.",
    service: "Business website",
    detail: "Service pages + contact flow",
    action: "Prepare a discovery call",
    tag: "Website project",
  },
  booking: {
    label: "Booking request",
    initials: "JM",
    name: "Jordan Morgan",
    subject: "Can we make booking easier?",
    message:
      "Our customers book over the phone. We would like them to request an appointment online.",
    service: "Booking system",
    detail: "Appointment request workflow",
    action: "Confirm booking requirements",
    tag: "Software project",
  },
  automation: {
    label: "Automation inquiry",
    initials: "SL",
    name: "Sam Lee",
    subject: "Less admin. More actual work.",
    message:
      "We copy every website inquiry into a spreadsheet and then email the team. Can this be connected?",
    service: "Lead automation",
    detail: "Form → spreadsheet → team alert",
    action: "Map the existing workflow",
    tag: "Automation project",
  },
};
const STAGES = [
  { title: "Capture", subtitle: "A new conversation", icon: Mail },
  { title: "Organize", subtitle: "Useful, structured details", icon: Sparkles },
  { title: "Review", subtitle: "You stay in control", icon: ShieldCheck },
];

function SystemDemo() {
  const [scenario, setScenario] = useState("website");
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const timers = useRef([]);
  const reduced = useReducedMotion();
  const item = SCENARIOS[scenario];
  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  useEffect(() => {
    if (reduced && running) {
      clearTimers();
      setStage(2);
      setRunning(false);
      setComplete(true);
    }
  }, [reduced, running]);
  function run() {
    clearTimers();
    setComplete(false);
    if (reduced) {
      setStage(2);
      setComplete(true);
      return;
    }
    setStage(0);
    setRunning(true);
    timers.current = [
      window.setTimeout(() => setStage(1), 850),
      window.setTimeout(() => setStage(2), 1750),
      window.setTimeout(() => {
        setRunning(false);
        setComplete(true);
      }, 2550),
    ];
  }
  function chooseStage(index) {
    clearTimers();
    setRunning(false);
    setComplete(false);
    setStage(index);
  }
  return (
    <div
      className={`system-demo ${running ? "is-running" : ""}`}
      id="playground"
    >
      <div className="demo-chrome">
        <span className="chrome-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Pacific / workflow</span>
        <span className="demo-label">INTERACTIVE DEMO</span>
      </div>
      <div className="demo-body">
        <div className="demo-title">
          <div>
            <span className="overline">ONE INQUIRY. A CLEAR NEXT STEP.</span>
            <h2>Meet your next workflow.</h2>
          </div>
          <div className="demo-app-icon">
            <Workflow size={22} />
          </div>
        </div>
        <label className="scenario-picker">
          <span>Try a scenario</span>
          <span className="select-wrap">
            <select
              value={scenario}
              onChange={(event) => {
                clearTimers();
                setScenario(event.target.value);
                setStage(0);
                setRunning(false);
                setComplete(false);
              }}
              aria-label="Demo scenario"
            >
              {Object.entries(SCENARIOS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} />
          </span>
        </label>
        <div
          className="workflow-steps"
          role="tablist"
          aria-label="Workflow stages"
        >
          {STAGES.map((step, index) => (
            <button
              type="button"
              key={step.title}
              id={`stage-tab-${index}`}
              role="tab"
              aria-selected={stage === index}
              aria-controls="stage-panel"
              tabIndex={stage === index ? 0 : -1}
              className={`${stage === index ? "active" : ""} ${stage > index ? "done" : ""}`}
              onClick={() => chooseStage(index)}
              onKeyDown={(event) => {
                let next;
                if (event.key === "ArrowRight") next = (index + 1) % 3;
                if (event.key === "ArrowLeft") next = (index + 2) % 3;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = 2;
                if (next !== undefined) {
                  event.preventDefault();
                  chooseStage(next);
                  document.getElementById(`stage-tab-${next}`)?.focus();
                }
              }}
            >
              <span className="step-icon">
                {stage > index ? <Check size={17} /> : <step.icon size={17} />}
              </span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>
        <div
          className="stage-panel"
          id="stage-panel"
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage}`}
          tabIndex={0}
        >
          <div className="stage-content" key={`${scenario}-${stage}`}>
            {stage === 0 && (
              <>
                <div className="message-heading">
                  <span className="avatar">{item.initials}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Sample customer · Website form</span>
                  </div>
                  <span className="tiny-badge">NEW</span>
                </div>
                <h3>{item.subject}</h3>
                <p>{item.message}</p>
                <div className="message-bottom">
                  <span>
                    <span className="small-dot" /> Inquiry received
                  </span>
                  <Mail size={15} />
                </div>
              </>
            )}
            {stage === 1 && (
              <>
                <div className="panel-label">
                  <Sparkles size={16} /> Structured inquiry{" "}
                  <span className="tiny-badge">ORGANIZED</span>
                </div>
                <dl className="structured-data">
                  <div>
                    <dt>Service</dt>
                    <dd>{item.service}</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>{item.detail}</dd>
                  </div>
                  <div>
                    <dt>Next step</dt>
                    <dd>{item.action}</dd>
                  </div>
                </dl>
                <p className="panel-footnote">
                  The right details, ready for a human decision.
                </p>
              </>
            )}
            {stage === 2 && (
              <>
                <div className="panel-label">
                  <ShieldCheck size={17} /> Ready for your review{" "}
                  <span className="review-dot" />
                </div>
                <div className="review-card">
                  <span className="overline">SUGGESTED FOLLOW-UP</span>
                  <p>
                    Hi {item.name.split(" ")[0]}, thanks for reaching out. Let’s
                    talk through your {item.service.toLowerCase()} and map out
                    the next steps.
                  </p>
                </div>
                <div className="approval-note">
                  <CheckCheck size={16} />
                  <span>Draft prepared. Nothing sent automatically.</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="demo-actions">
          <span aria-live="polite">
            {running
              ? `Step ${stage + 1} of 3 · ${STAGES[stage].title}`
              : complete
                ? "Complete. Your turn to explore."
                : "A small example of what’s possible."}
          </span>
          <button className="run-button" onClick={run} disabled={running}>
            {running ? "Running" : complete ? "Replay" : "Run demo"}
            {complete ? (
              <RotateCcw size={14} />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
      <div className="demo-disclaimer">
        <span className="small-dot" /> Illustrative demo · Sample data · No live
        AI requests
      </div>
    </div>
  );
}

function Contact() {
  const [state, handleSubmit] = useForm(FORM_ID);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    service: currentService?.name || "",
    message: "",
  });
  const completed = Object.values(fields).filter((value) =>
    value.trim(),
  ).length;
  function trackForm(event) {
    const { name, value } = event.target;
    if (name in fields)
      setFields((previous) => ({ ...previous, [name]: value }));
  }
  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <Reveal>
          <p className="eyebrow">
            <span className="accent-dot" /> LET’S TALK ABOUT YOUR BUSINESS.
          </p>
          <h2>
            Let’s get
            <br />
            some time
            <br />
            <span>back.</span>
          </h2>
          <p className="contact-description">
            Tell us what takes up too much of your day. We’ll help you explore a
            simpler way to get it done.
          </p>
          <a className="email-link" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
            <ArrowUpRight size={19} />
          </a>
          <span className="contact-location">
            Based in British Columbia · Working with businesses across Canada
          </span>
        </Reveal>
        <Reveal className="contact-form-wrap">
          {state.succeeded ? (
            <div className="success-panel" role="status">
              <span className="success-icon">
                <Check size={26} />
              </span>
              <p className="eyebrow">MESSAGE RECEIVED</p>
              <h3>A good place to start.</h3>
              <p>
                Thanks for reaching out. We’ll review your project and get back
                to you by email.
              </p>
              <a className="button button-blue" href="#top">
                Back to the top <ArrowUpRight size={17} />
              </a>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              onChange={trackForm}
            >
              <div className="form-heading">
                <span>START A CONVERSATION</span>
                <span className="form-completion" aria-live="polite">
                  {completed} / 4 details
                </span>
                <ArrowUpRight size={23} />
              </div>
              <div className="form-progress" aria-hidden="true">
                <span style={{ width: `${completed * 25}%` }} />
              </div>
              <div className="form-row">
                <label htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Chen"
                    required
                  />
                </label>
                <label htmlFor="contact-email">
                  Email address
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    required
                  />
                </label>
              </div>
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="form-error"
              />
              <label htmlFor="contact-service">
                What are you thinking?
                <select
                  id="contact-service"
                  name="service"
                  defaultValue={currentService?.name || ""}
                  required
                >
                  <option value="" disabled>
                    Select a starting point
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service.slug}>{service.name}</option>
                  ))}
                  <option>Something else / not sure yet</option>
                </select>
              </label>
              <label htmlFor="contact-message">
                A little about your idea
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="Which task, question, or workflow would you like to make easier?"
                  required
                />
              </label>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="form-error"
              />
              <details className="optional-details">
                <summary>
                  Add budget & timeline <Plus size={15} />
                </summary>
                <div className="form-row">
                  <label htmlFor="budget">
                    Budget <span>(optional)</span>
                    <input
                      id="budget"
                      name="budget"
                      placeholder="An estimate is fine"
                    />
                  </label>
                  <label htmlFor="timeline">
                    Timeline <span>(optional)</span>
                    <input
                      id="timeline"
                      name="timeline"
                      placeholder="When would you like to launch?"
                    />
                  </label>
                </div>
              </details>
              <div className="form-honeypot" aria-hidden="true">
                <label>
                  Leave this empty
                  <input name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <input
                type="hidden"
                name="_subject"
                value="New Pacific Tech Solutions project inquiry"
              />
              <ValidationError errors={state.errors} className="form-error" />
              <button
                className="button button-blue submit-button"
                type="submit"
                disabled={state.submitting}
              >
                {state.submitting
                  ? "Sending your message…"
                  : "Send project inquiry"}
                <ArrowUpRight size={18} />
              </button>
              <p className="form-note">
                Your details are used to respond to your inquiry. Prefer email?{" "}
                <a href={`mailto:${PROFILE.email}`}>Get in touch directly.</a>
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <a href="/" className="brand" aria-label="Pacific Tech Solutions home">
          <BrandMark />
          <span>
            Pacific<span className="brand-sub">TECH SOLUTIONS</span>
          </span>
        </a>
        <span>Websites, software, and AI that save you time.</span>
        <a href="#top" className="back-top">
          Back to top <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="container footer-services">
        {SERVICES.map((service) => (
          <a key={service.slug} href={`/services/${service.slug}/`}>
            {service.name}
          </a>
        ))}
        <a href="/work/">Our work</a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Pacific Tech Solutions</span>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <span>Built for your business.</span>
      </div>
    </footer>
  );
}
function App() {
  const [intro, setIntro] = useState(initialIntro);
  const reduced = useReducedMotion();
  const finishIntro = React.useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "seen");
    } catch {}
    setIntro(false);
    requestAnimationFrame(() =>
      document.getElementById("hero-title")?.focus({ preventScroll: true }),
    );
  }, []);
  useEffect(() => {
    if (reduced && intro) finishIntro();
  }, [reduced, intro, finishIntro]);
  useEffect(() => {
    if (!intro) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [intro]);
  return (
    <>
      {intro && !reduced && <Opening onFinish={finishIntro} />}
      <div
        className={`site ${intro ? "intro-playing" : "site-ready"}`}
        inert={intro ? true : undefined}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">
          <div id="top" />
          {isHome ? (
            <>
              <HomeHero />
              <ServiceCards Reveal={Reveal} />
              <TimeCalculator />
              <WorkTeaser Reveal={Reveal} />
              <BusinessApproach Reveal={Reveal} />
              <BusinessFAQ />
            </>
          ) : routePath === "/work" ? (
            <WorkPage />
          ) : currentService ? (
            <ServicePage service={currentService} SystemDemo={SystemDemo} />
          ) : (
            <section className="inner-hero">
              <div className="container">
                <h1 id="hero-title">Page not found.</h1>
                <a className="button button-blue" href="/">
                  Return home <ArrowRight size={17} />
                </a>
              </div>
            </section>
          )}
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
