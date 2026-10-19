import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Phone,
  PhoneCall,
  Clock3,
  Globe2,
  Code2,
  Workflow,
  Mail,
  Check,
  Play,
  RotateCcw,
  Layers3,
  ShieldCheck,
  FileText,
  Plus,
  Sparkles,
  CalendarDays,
  Search,
  Command,
} from "lucide-react";

export const SERVICES = [
  {
    slug: "ai-receptionist",
    number: "01",
    name: "AI Receptionist",
    category: "FEWER INTERRUPTIONS",
    headline: "Answer calls. Keep working.",
    description:
      "Answer common questions, collect customer details, and pass requests to your team. We set it up around your business and the tools you use.",
    short:
      "Answer questions, take customer details, and pass on requests while your team works.",
    icon: PhoneCall,
    visual: "voice",
    tags: ["Customer inquiries", "Lead capture", "Human handoff"],
    features: [
      [
        "Answers shaped around your business",
        "Use approved service details, business hours, and FAQs as the foundation for responses.",
      ],
      [
        "Capture the details that matter",
        "Collect contact information and the reason for the inquiry, ready for your team to review.",
      ],
      [
        "Booking and handoff workflows",
        "Discuss appointment requests, supported calendar integrations, and when to route a conversation to a person.",
      ],
    ],
    steps: [
      "Define the questions and handoff rules.",
      "Connect the agreed tools and information.",
      "Test sample conversations before launch.",
    ],
    note: "Voice, chat, booking, and transfer capabilities depend on the provider and integrations agreed for your project. The example below is a scripted text demonstration, not a live phone agent.",
  },
  {
    slug: "quote-automation",
    number: "02",
    name: "Quote Automation",
    category: "LESS BACK-AND-FORTH",
    headline: "Prepare quotes with less typing.",
    description:
      "Collect the job details once and use them to prepare a quote. Your team reviews the scope and price before it goes to the customer.",
    short:
      "Collect project details, prepare a quote draft, and keep approval in your hands.",
    icon: FileText,
    visual: "quote",
    tags: ["Smart intake", "Draft preparation", "Owner approval"],
    features: [
      [
        "Consistent customer intake",
        "Ask the right questions for your services, with a structured request instead of an incomplete email.",
      ],
      [
        "Your rules, applied consistently",
        "Build around your pricing inputs, service logic, and review requirements. AI can help organize the information where useful.",
      ],
      [
        "Review before anything goes out",
        "Keep a human approval step for prices, scope, and exceptions. Automate the repetitive preparation, with control over the result.",
      ],
    ],
    steps: [
      "Map your services and quoting rules.",
      "Build the intake and draft workflow.",
      "Test edge cases and approval steps.",
    ],
    note: "Quote accuracy depends on the information and pricing rules provided. Our quote-generator project is in progress.",
  },
  {
    slug: "web-development",
    number: "03",
    name: "Web Development",
    category: "A BETTER FIRST IMPRESSION",
    headline: "A website that works for your business.",
    description:
      "Show customers what you do, answer their questions, and make it easy to contact you. Built to work on phones, tablets, and computers.",
    short:
      "Show your services clearly and help customers get in touch, on any screen.",
    icon: Globe2,
    visual: "web",
    tags: ["Responsive design", "Clear navigation", "Lead capture"],
    features: [
      [
        "Design with a reason",
        "A visual direction and page structure shaped around your business, content, and customer journey.",
      ],
      [
        "Mobile from the beginning",
        "Readable layouts, comfortable controls, and interactions that work with touch as well as a mouse.",
      ],
      [
        "A connected next step",
        "Service pages, contact flows, and the booking or business integrations your project calls for.",
      ],
    ],
    steps: [
      "Plan the content and customer journey.",
      "Design and build the responsive pages.",
      "Check the details and prepare for launch.",
    ],
    note: "Every website has its own scope. Content, hosting, integrations, and ongoing support are agreed before work begins.",
  },
  {
    slug: "software-development",
    number: "04",
    name: "Custom Software",
    category: "FEWER MANUAL STEPS",
    headline: "Built for your business. Not the other way around.",
    description:
      "Keep your tasks, records, and updates in one place. We build web tools for the jobs your team currently handles across spreadsheets and emails.",
    short:
      "Keep tasks, customer records, and updates together in one place.",
    icon: Code2,
    visual: "software",
    tags: ["Web applications", "Dashboards", "Connected workflows"],
    features: [
      [
        "One place for the important work",
        "Organize the data and actions your team needs in a focused dashboard, portal, or internal tool.",
      ],
      [
        "Connections that cut repeat work",
        "Discuss how forms, databases, notifications, and existing services can work together.",
      ],
      [
        "A clear path to the first release",
        "Define the essential features, test the workflow, and build from a useful starting point.",
      ],
    ],
    steps: [
      "Understand the users and current process.",
      "Build the essential application flow.",
      "Test, refine, and plan the next iteration.",
    ],
    note: "Features, access controls, data handling, hosting, and third-party dependencies are defined for each project.",
  },
];

export const PROJECTS = [
  {
    name: "AI Quote Generator",
    type: "Tools & software",
    status: "In progress",
    text: "Collect job details and prepare a quote for the business owner to review.",
    url: "https://ai-quote-generator-ibzle1kby-sidhu-projects.vercel.app/",
    art: "quote",
    code: "PTS / 001",
  },
  {
    name: "Resale Tracker",
    type: "Tools & software",
    status: "In progress",
    text: "Keep purchases, sale prices, and resale records in one place.",
    url: "https://resale-tracker-3.streamlit.app/",
    art: "software",
    code: "PTS / 002",
  },
  {
    name: "Next Level Auto Care",
    type: "Websites",
    status: "Website",
    text: "A business website for Next Level Auto Care. Explore the project using the link below.",
    url: "https://www.nextlevelautocare.ca/",
    art: "web",
    code: "PTS / 003",
  },
  {
    name: "Sidhu Pacific Homes",
    type: "Websites",
    status: "Website",
    text: "A business website for Sidhu Pacific Homes. Explore the project using the link below.",
    url: "https://www.sidhupacifichomes.com/",
    art: "home",
    code: "PTS / 004",
  },
  {
    name: "Roadrunner Automotive",
    type: "Websites",
    status: "Website",
    text: "A business website for Roadrunner Automotive. Explore the project using the link below.",
    url: "https://roadrunner-automotive.vercel.app/#top",
    art: "web",
    code: "PTS / 005",
  },
  {
    name: "Virtual Business Assistant", type: "Tools & software", status: "Coming soon",
    text: "Our next project: an assistant for answering calls, scheduling callbacks, booking meetings, and keeping your calendar organized.",
    art: "voice", code: "PTS / 006",
  },
];

export function DepthCard({ children, className = "", href, label }) {
  const node = useRef(null);
  const frame = useRef(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const reset = () => {
    cancelAnimationFrame(frame.current);
    node.current?.style.setProperty("--rx", "0deg");
    node.current?.style.setProperty("--ry", "0deg");
    node.current?.style.setProperty("--mx", "50%");
    node.current?.style.setProperty("--my", "50%");
  };
  function move(event) {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    );
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height),
    );
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (!node.current) return;
      node.current.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      node.current.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
      node.current.style.setProperty("--mx", `${x * 100}%`);
      node.current.style.setProperty("--my", `${y * 100}%`);
    });
  }
  const Tag = href ? "a" : "div";
  return (
    <Tag
      ref={node}
      href={href}
      aria-label={label}
      className={`depth-card ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </Tag>
  );
}

function Waveform({ active = false }) {
  return (
    <div
      className={`waveform ${active ? "wave-active" : ""}`}
      aria-hidden="true"
    >
      {[
        12, 22, 38, 20, 51, 70, 43, 28, 63, 85, 53, 31, 70, 47, 23, 59, 38, 21,
        42, 26, 13,
      ].map((height, index) => (
        <i
          key={index}
          style={{ "--height": `${height}%`, "--delay": `${index * 31}ms` }}
        />
      ))}
    </div>
  );
}

export function ServiceArt({ type }) {
  return (
    <div className={`service-art art-${type}`} aria-hidden="true">
      <div className="art-floor" />
      {type === "voice" ? (
        <>
          <div className="voice-disc">
            <PhoneCall size={32} />
          </div>
          <div className="art-floating art-tag">
            <span className="small-dot" /> INQUIRY CAPTURED
          </div>
          <div className="art-floating art-wave">
            <Waveform />
          </div>
          <div className="art-orbit-line" />
        </>
      ) : type === "quote" ? (
        <>
          <div className="quote-sheet sheet-under" />
          <div className="quote-sheet">
            <span>QUOTE / DRAFT</span>
            <i />
            <i />
            <i />
            <div>
              <Check size={12} /> Ready for review
            </div>
          </div>
          <div className="art-floating quote-badge">
            <FileText size={20} />
          </div>
        </>
      ) : type === "software" ? (
        <>
          <div className="software-plane plane-back" />
          <div className="software-plane">
            <div className="plane-top">
              <span />
              <span />
              <span />
            </div>
            <div className="software-grid">
              <div />
              <div />
              <div />
            </div>
            <div className="software-bars">
              {[30, 55, 42, 70, 60, 90].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="art-floating code-chip">
            <Code2 size={22} />
          </div>
        </>
      ) : (
        <>
          <div className="browser-plane">
            <div className="plane-top">
              <span />
              <span />
              <span />
            </div>
            <div className="browser-layout">
              <i />
              <i />
              <div />
              <b />
            </div>
          </div>
          <div className="phone-plane">
            <span />
            <i />
            <i />
            <b />
          </div>
          <div className="art-floating web-chip">
            <Globe2 size={20} />
          </div>
        </>
      )}
    </div>
  );
}

const EXAMPLES = {
  appointment: {
    label: "Book an appointment",
    steps: [
      ["Customer", "Hi, can I book an interior clean for my SUV?", "New inquiry", "Identifies the service and vehicle type."],
      ["AI receptionist", "Of course. Is there pet hair or heavy staining we should know about?", "Collect details", "Uses the business’s approved booking questions."],
      ["Customer", "Some dog hair. Friday afternoon would be great.", "Check availability", "Checks the connected calendar in this example."],
      ["AI receptionist", "Friday at 2 pm is available. What’s your name and the best email for the confirmation?", "Offer a time", "Keeps the appointment unconfirmed until the customer agrees."],
      ["Customer", "Alex. Use alex@example.com. Friday at 2 works.", "Customer agrees", "Records the contact details and requested service."],
      ["AI receptionist", "You’re booked for Friday at 2 pm. I’ll send the details by email. The team has your note about the dog hair.", "Booking complete", "Creates the booking, sends a confirmation, and shares a summary with the team."],
    ],
    result: "Appointment saved · Confirmation prepared · Team informed",
  },
  quote: {
    label: "Prepare a quote",
    steps: [
      ["Customer", "Can I get a quote to clean my driveway?", "New quote request", "Opens a request without guessing a price."],
      ["AI receptionist", "Sure. Roughly how large is it, what’s the surface, and are there any stains?", "Gather job details", "Asks the questions needed by the quoting rules."],
      ["Customer", "About 600 square feet of concrete, with an oil stain.", "Flag extra work", "Adds stain treatment as an item for the owner to check."],
      ["AI receptionist", "Thanks. What’s the job address and your email? The team will review the details before sending a price.", "Prepare the request", "Keeps the customer informed that the quote needs approval."],
      ["Customer", "123 Example Street, Surrey. alex@example.com.", "Build a draft", "Combines the details with configured pricing rules and flags the stain."],
      ["AI receptionist", "Your request is ready for the team. They’ll check the scope and email your quote.", "Owner review", "Saves a draft and notifies the owner. Nothing is priced or sent without approval in this example."],
    ],
    result: "Details collected · Quote drafted · Awaiting owner approval",
  },
  complex: {
    label: "Get a person involved",
    steps: [
      ["Customer", "I need to change a job that’s already booked.", "Existing booking", "Recognizes a request that may need staff approval."],
      ["AI receptionist", "I can pass that to the team. What name is the booking under, and what needs to change?", "Find the request", "Collects enough information for a staff member to help."],
      ["Customer", "Alex. It’s Friday’s driveway clean. Can we add the back patio?", "Scope change", "Flags extra work instead of promising it can fit the schedule."],
      ["AI receptionist", "The team will need to check the extra time and price. What’s the best way to reach you?", "Explain the next step", "Makes no changes to the booking or agreed price."],
      ["Customer", "Email me at alex@example.com.", "Prepare handoff", "Summarizes the booking, requested change, and contact details."],
      ["AI receptionist", "I’ve passed on your request. Your existing booking stays as it is until the team confirms the change.", "Team notified", "Creates a follow-up task for a person. The AI does not approve the change."],
    ],
    result: "Request summarized · Staff notified · Original booking unchanged",
  },
};

export function ReceptionistDemo({ compact = false, initialExample = "appointment" }) {
  const [example, setExample] = useState(initialExample);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = EXAMPLES[example];
  const thread = useRef(null);
  const finished = step === current.steps.length;
  useEffect(() => {
    if (!playing) return;
    if (finished) { setPlaying(false); return; }
    const timer = setTimeout(() => setStep(n => n + 1), 2600);
    return () => clearTimeout(timer);
  }, [playing, step, finished]);
  useEffect(() => {
    if (thread.current) thread.current.scrollTop = thread.current.scrollHeight;
  }, [step]);
  function play() {
    if (playing) { setPlaying(false); return; }
    if (finished) setStep(0);
    else if (!step) setStep(1);
    setPlaying(true);
  }
  return (
    <div className={`receptionist-scene workflow-scene ${compact ? "scene-compact" : ""}`}>
      <div className="scene-grid" aria-hidden="true" />
      <div className="receptionist-panel">
        <div className="receptionist-top"><span><PhoneCall size={16} /> PACIFIC / RECEPTION</span><span className="sample-label">INTERACTIVE DEMO</span></div>
        <div className="agent-identity"><span className="agent-symbol"><Phone size={24} /></span><div><span>FROM FIRST MESSAGE TO NEXT STEP</span><h2>See how it handles a request.</h2></div></div>
        <label className="demo-select-label">Choose an example<select aria-label="Receptionist example" value={example} onChange={e => {setPlaying(false);setExample(e.target.value);setStep(0);}}>{Object.entries(EXAMPLES).map(([key,item]) => <option key={key} value={key}>{item.label}</option>)}</select></label>
        <div className="conversation-thread" ref={thread} tabIndex={0} role="region" aria-label="Example conversation">
          {step === 0 ? <div className="thread-empty"><PhoneCall size={28}/><strong>A full conversation, start to finish.</strong><p>Press play or move through each step. See what the customer says and what happens behind the scenes.</p></div> : current.steps.slice(0,step).map(([who,text],i) => <div className={`chat-message ${who === "Customer" ? "from-customer" : "from-agent"}`} key={`${example}-${i}`}><span>{who}</span><p>{text}</p></div>)}
        </div>
        <div className="automation-event" aria-live="polite" aria-atomic="true"><span><Workflow size={15}/> WHAT THE SYSTEM DOES <b>{step}/{current.steps.length}</b></span><strong>{step ? current.steps[step-1][2] : "Ready when you are"}</strong><p>{step ? current.steps[step-1][3] : "This example uses fictional customer details and a sample business setup."}</p></div>
        <div className="workflow-progress" aria-hidden="true"><span style={{width:`${step/current.steps.length*100}%`}} /></div>
        <div className="demo-controls"><button className="button button-blue" onClick={play}>{playing ? "Pause" : finished ? "Play again" : "Play example"}<Play size={14}/></button><button className="demo-next" disabled={finished} onClick={() => {setPlaying(false);setStep(n=>Math.min(n+1,current.steps.length));}}>Next step <ArrowRight size={15}/></button><button className="demo-reset" aria-label="Reset conversation" onClick={() => {setPlaying(false);setStep(0);}}><RotateCcw size={16}/></button></div>
        {finished && <p className="workflow-result"><Check size={14}/>{current.result}</p>}
        <p className="simulation-note">Scripted example. No calls, bookings, or messages are sent.</p>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="hero business-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-enter">
            <span className="accent-dot" /> TECH THAT MAKES WORK EASIER.
          </p>
          <h1 id="hero-title" tabIndex={-1} className="hero-enter">
            Save time.
            <br />
            <span>Grow your<br />business.</span>
          </h1>
          <p className="hero-description hero-enter">
            AI receptionists, quote automation, websites, and software that take
            repetitive work off your plate.
          </p>
          <div className="hero-actions hero-enter">
            <a className="button button-blue" href="#expertise">
              See our services <ArrowDown size={17} />
            </a>
            <a className="text-link" href="/work/">
              Explore our work <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-assurances">
            <span>
              <Check size={12} /> Built for your business
            </span>
            <span>
              <Check size={12} /> You stay in control
            </span>
          </div>
        </div>
        <div className="hero-system hero-enter">
          <ReceptionistDemo compact />
        </div>
        <div className="hero-bottom">
          <span>LESS ADMIN. FEWER INTERRUPTIONS. MORE FOCUS.</span>
          <a href="#expertise">
            SEE WHAT WE DO <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ServiceCards({ Reveal }) {
  return (
    <section id="expertise" className="section expertise-section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">01</span>WHAT WE DO
              </p>
              <h2>
                Tools that save
                <br />
                <span className="muted-heading">you time.</span>
              </h2>
            </div>
            <p className="section-description">
              Answer calls, prepare quotes, or build a better website. Pick what you need help with.
            </p>
          </div>
        </Reveal>
        <div className="service-card-grid">
          {SERVICES.map((service) => (
            <Reveal key={service.slug}>
              <DepthCard
                href={`/services/${service.slug}/`}
                className="service-link-card"
                label={`Explore ${service.name}`}
              >
                <div className="service-card-top">
                  <span>
                    {service.number} / {service.category}
                  </span>
                  <span className="card-open">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <ServiceArt type={service.visual} />
                <div className="service-card-copy">
                  <h3>{service.name}</h3>
                  <p>{service.short}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="service-card-cta">
                    Explore the service <ArrowRight size={17} />
                  </span>
                </div>
              </DepthCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TimeCalculator() {
  const [tasks, setTasks] = useState(40);
  const [minutes, setMinutes] = useState(6);
  const [portion, setPortion] = useState(50);
  const current = (tasks * minutes) / 60;
  const recovered = (current * portion) / 100;
  return (
    <section className="section calculator-section">
      <div className="container calculator-layout">
        <div>
          <p className="eyebrow">
            <span className="section-number">02</span>A LITTLE LESS, ADDS UP.
          </p>
          <h2>
            What is repeat work
            <br />
            <span className="muted-heading">costing your week?</span>
          </h2>
          <p className="section-description">
            Explore a simple what-if. Adjust the inputs to estimate the time
            involved in a repetitive task.
          </p>
          <a className="inline-link" href="#contact">
            Let’s look at your workflow <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="time-calculator">
          <div className="calculator-heading">
            <Clock3 size={19} />
            <span>THE TIME-BACK EXPLORER</span>
          </div>
          <label htmlFor="tasks">
            Tasks each week <output>{tasks}</output>
            <input
              id="tasks"
              type="range"
              min="5"
              max="200"
              step="5"
              value={tasks}
              onChange={(e) => setTasks(Number(e.target.value))}
            />
          </label>
          <label htmlFor="minutes">
            Minutes per task <output>{minutes} min</output>
            <input
              id="minutes"
              type="range"
              min="1"
              max="30"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
          <label htmlFor="portion">
            Hypothetical time reduction <output>{portion}%</output>
            <input
              id="portion"
              type="range"
              min="10"
              max="90"
              step="5"
              value={portion}
              onChange={(e) => setPortion(Number(e.target.value))}
            />
          </label>
          <div className="calculator-result" aria-live="polite">
            <div>
              <strong>
                {recovered.toFixed(1)}
                <span>hrs</span>
              </strong>
              <span>potentially freed each week</span>
            </div>
            <div>
              <span>Current task time</span>
              <strong>{current.toFixed(1)} hrs / week</strong>
            </div>
          </div>
          <p>
            Illustration only, not a promised saving. Tasks × minutes ÷ 60 ×
            your selected reduction. Actual results depend on the workflow,
            implementation, and review required.
          </p>
        </div>
      </div>
    </section>
  );
}

export function WorkTeaser({ Reveal }) {
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <Reveal>
          <div className="work-invitation">
            <div>
              <p className="eyebrow">
                <span className="section-number">03</span>OUR WORK
              </p>
              <h2>
                See what
                <br />
                <span className="muted-heading">we’re building.</span>
              </h2>
              <p>
                Business websites and tools in progress. A closer look at what
                we’re building.
              </p>
              <a href="/work/" className="button button-dark">
                View our work <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="archive-stack" aria-hidden="true">
              <div className="archive-sheet archive-back">
                <Code2 size={21} />
                <span>TOOLS & SOFTWARE</span>
              </div>
              <div className="archive-sheet archive-front">
                <Globe2 size={25} />
                <span>WEBSITES & EXPERIENCES</span>
                <strong>
                  Built to be
                  <br />
                  put to work.
                </strong>
                <ArrowUpRight size={28} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const BUILD_STEPS = [
  {name:"Tell us what takes too long", text:"We look at how you work today and choose one problem to solve first.", question:"Where does your team lose the most time?", result:"A clear problem to solve", items:["Missed calls", "Slow quotes", "Repeat data entry"], icon:Search},
  {name:"Agree on a plan", text:"You get a clear scope, price, and timeline before we start building.", question:"What should the finished result do?", result:"A plan you can review", items:["What’s included", "Tools to connect", "Cost and timeline"], icon:FileText},
  {name:"Try it as we build", text:"We share a working version so you can use it and tell us what needs changing.", question:"Does this work the way your team needs?", result:"A working version to test", items:["Real examples", "Your feedback", "Changes made"], icon:Code2},
  {name:"Launch it together", text:"We test the details, show you how to use it, and agree on support after launch.", question:"Is your team ready to use it?", result:"Ready for everyday work", items:["Final checks", "Team walkthrough", "Support agreed"], icon:Check},
];
export function BusinessApproach({ Reveal }) {
  const [active,setActive] = useState(0);
  const cards = useRef([]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(visible.length) setActive(Number(visible[0].target.dataset.step));
    },{rootMargin:"-22% 0px -35% 0px",threshold:[0,.3,.7]});
    cards.current.forEach(n=>n && observer.observe(n));
    return ()=>observer.disconnect();
  },[]);
  const stage = BUILD_STEPS[active];
  const Icon = stage.icon;
  return <section className="section approach-section" id="approach"><div className="container">
    <Reveal><div className="section-heading"><div><p className="eyebrow"><span className="section-number">04</span>HOW IT WORKS</p><h2>From your idea.<br/><span className="muted-heading">To your everyday work.</span></h2></div><p className="section-description">You know your business. We’ll help build the tools. Here’s what working together looks like.</p></div></Reveal>
    <div className="process-story"><div className="process-display"><div className="process-display-top"><span>YOUR PROJECT</span><span>0{active+1} / 04</span></div><div className="process-orbit" aria-hidden="true"><div className="orbit-ring"/><span key={active}><Icon size={40}/></span></div><div className="process-display-copy" key={stage.name}><span className="overline">THE RESULT</span><h3>{stage.result}</h3><div className="process-checks">{stage.items.map((item,i)=><span key={item} style={{animationDelay:`${i*90}ms`}}><Check size={14}/>{item}</span>)}</div></div><div className="process-selector" aria-label="Explore project stages">{BUILD_STEPS.map((item,i)=><button key={item.name} aria-label={`Stage ${i+1}: ${item.name}`} aria-pressed={active===i} onClick={()=>{setActive(i);cards.current[i]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}}>0{i+1}</button>)}</div></div>
    <div className="process-story-steps">{BUILD_STEPS.map((item,i)=><article key={item.name} ref={n=>cards.current[i]=n} data-step={i} className={`story-step ${active===i?'is-current':''}`}><span className="story-index">0{i+1}</span><h3>{item.name}</h3><p>{item.text}</p><div className="story-question">{item.question}</div></article>)}</div></div>
  </div></section>;
}

export function BusinessFAQ() {
  const items = [
    ["How much will my project cost?", "Tell us what you need and which tools you already use. We’ll agree on the features and send you a quote before work starts. If the scope changes, we’ll discuss the price first."],
    ["Can the AI book appointments and answer calls?", "That can be part of the setup. We first check your phone and booking tools, then agree on what the assistant can do. The demo on this page shows an example; it isn’t connected to a live phone or calendar."],
    ["What happens when the AI doesn’t know the answer?", "We set rules for when it should ask for more details or pass the request to your team. It should be clear with the customer when a person needs to help."],
    ["Will I still approve quotes before they’re sent?", "Yes, if that’s the workflow we agree on. The system can collect details and prepare a draft while you make the final call on the price and scope."],
    ["Can you work with my current website and tools?", "Often, yes. Send us what you use and we’ll check what can connect, what needs changing, and any extra service costs before recommending a setup."],
    ["What happens after launch?", "We walk you through the setup and agree on any ongoing support. Hosting, third-party subscriptions, maintenance, and future changes are discussed before launch so you know what to expect."],
  ];
  return <section className="section faq-section"><div className="container faq-layout"><div><p className="eyebrow">BEFORE WE START</p><h2>Good questions.<br/><span className="muted-heading">Straight answers.</span></h2></div><div className="faq-list">{items.map(([q,a])=><details key={q} name="business-faq"><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</div></div></section>;
}

export function WorkPage() {
  const [filter, setFilter] = useState("All projects");
  const shown =
    filter === "All projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter);
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <a className="breadcrumb" href="/">
            HOME <ArrowRight size={12} /> OUR WORK
          </a>
          <p className="eyebrow">A COLLECTION OF WEBSITES & TOOLS</p>
          <h1 id="hero-title" tabIndex={-1}>
            Websites and tools
            <br />
            <span>we’re working on.</span>
          </h1>
          <p>
            Business websites, practical tools, and ideas in development.
            Explore the collection.
          </p>
          <div className="project-filters" aria-label="Filter projects">
            {["All projects", "Websites", "Tools & software"].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                <span>
                  {f === "All projects"
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.type === f).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section project-collection">
        <div className="container">
          <p className="project-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "project" : "projects"} in this
            view
          </p>
          <div className="project-grid">
            {shown.map((project) => (
              <article className="project-card" key={project.code}>
                <div className="project-card-art">
                  <div className="project-art-label">
                    <span>{project.code}</span>
                    <span
                      className={
                        project.status === "In progress"
                          ? "pending-badge"
                          : "website-badge"
                      }
                    >
                      {project.status}
                    </span>
                  </div>
                  <ServiceArt type={project.art} />
                </div>
                <div className="project-card-copy">
                  <span className="overline">{project.type}</span>
                  <h2>{project.name}</h2>
                  <p>{project.text}</p>
                  {project.status === "In progress" && (
                    <p className="pending-note">
                      In development. The preview may be incomplete or require
                      access.
                    </p>
                  )}
                  {project.url ? <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.status === "In progress"
                      ? "Open project preview"
                      : "Visit website"}
                    <ArrowUpRight size={19} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a> : <div className="project-coming"><Clock3 size={16} /> Planned project · Preview coming soon</div>}
                </div>
              </article>
            ))}
          </div>
          <p className="collection-note">
            Project illustrations, not
            screenshots of the websites.
          </p>
        </div>
      </section>
    </>
  );
}

function WebsitePreview() {
  const [device, setDevice] = useState("desktop");
  return (
    <section className="section service-demo-section">
      <div className="container service-demo-layout">
        <div>
          <p className="eyebrow">A SMALL CHANGE OF PERSPECTIVE</p>
          <h2>
            Different screens.
            <br />
            <span className="muted-heading">The same clear idea.</span>
          </h2>
          <p>
            Switch the sample between desktop and mobile. The layout rearranges
            around the screen, while the message and next step stay clear.
          </p>
        </div>
        <div className="responsive-lab">
          <div className="lab-controls" aria-label="Sample preview device">
            {["desktop", "mobile"].map((item) => (
              <button
                key={item}
                aria-pressed={device === item}
                onClick={() => setDevice(item)}
              >
                {item === "desktop" ? "Desktop" : "Mobile"}
              </button>
            ))}
            <span>ILLUSTRATIVE LAYOUT</span>
          </div>
          <div className={`sample-browser sample-${device}`}>
            <div className="sample-browser-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="sample-site">
              <div className="sample-nav">
                <strong>NORTH / STUDIO</strong>
                <span>Design with purpose ↗</span>
              </div>
              <div className="sample-site-hero">
                <div>
                  <span className="overline">
                    A SMALL BUSINESS. A BIG IDEA.
                  </span>
                  <h3>
                    Make a better
                    <br />
                    first impression.
                  </h3>
                  <p>
                    A clear story, a considered layout, and an easy next step.
                  </p>
                  <a href="#contact">
                    Build something like this <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className="sample-sculpture" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="sample-bottom">
                <span>Thoughtful design</span>
                <span>Easy to explore</span>
                <span>Ready for mobile</span>
              </div>
            </div>
          </div>
          <p className="lab-note">
            A sample interface built for this demonstration—not a client
            project.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkspaceDemo() {
  const [done, setDone] = useState([]);
  const tasks = [
    "Review a new inquiry",
    "Prepare a draft quote",
    "Notify the team",
  ];
  return (
    <section className="section service-demo-section">
      <div className="container service-demo-layout">
        <div>
          <p className="eyebrow">TRY A SMALL WORKSPACE</p>
          <h2>
            Less searching.
            <br />
            <span className="muted-heading">A clearer next action.</span>
          </h2>
          <p>
            Tap a task to move it to complete. This sample shows how a focused
            interface can make the next step feel obvious.
          </p>
        </div>
        <div className="workspace-demo">
          <div className="workspace-heading">
            <span>
              <Layers3 size={18} /> YOUR WORKSPACE
            </span>
            <span>SAMPLE DATA</span>
          </div>
          <div className="workspace-stats">
            <div>
              <strong>{tasks.length - done.length}</strong>
              <span>To do</span>
            </div>
            <div>
              <strong>{done.length}</strong>
              <span>Complete</span>
            </div>
            <div>
              <strong>{Math.round((done.length / tasks.length) * 100)}%</strong>
              <span>Progress</span>
            </div>
          </div>
          <div className="workspace-progress" aria-hidden="true">
            <span style={{ width: `${(done.length / tasks.length) * 100}%` }} />
          </div>
          <div className="workspace-tasks">
            {tasks.map((task, index) => (
              <button
                key={task}
                aria-pressed={done.includes(index)}
                onClick={() =>
                  setDone((previous) =>
                    previous.includes(index)
                      ? previous.filter((item) => item !== index)
                      : [...previous, index],
                  )
                }
              >
                <span className="task-check">
                  {done.includes(index) && <Check size={14} />}
                </span>
                <span>{task}</span>
                <span>{done.includes(index) ? "Complete" : "To do"}</span>
              </button>
            ))}
          </div>
          <div className="workspace-bottom">
            <span aria-live="polite">
              {done.length === 3
                ? "All clear. A little room to breathe."
                : `${done.length} of 3 tasks complete.`}
            </span>
            <button onClick={() => setDone([])}>
              <RotateCcw size={13} /> Reset demo
            </button>
          </div>
          <p className="lab-note">
            Interactive demonstration. Changes stay on this page and reset when
            you leave.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ service, SystemDemo }) {
  return (
    <>
      <section className="inner-hero service-hero">
        <div className="container service-hero-layout">
          <div>
            <a className="breadcrumb" href="/#expertise">
              SERVICES <ArrowRight size={12} /> {service.name.toUpperCase()}
            </a>
            <p className="eyebrow">{service.category}</p>
            <h1 id="hero-title" tabIndex={-1}>
              {service.headline}
            </h1>
            <p>{service.description}</p>
            <a className="button button-blue" href="#contact">
              Let’s explore {service.name.toLowerCase()}{" "}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <DepthCard className="service-hero-art">
            <ServiceArt type={service.visual} />
            <span className="hero-art-caption">
              {service.name.toUpperCase()} / BUILT AROUND YOUR BUSINESS
            </span>
          </DepthCard>
        </div>
      </section>
      <section className="section service-features">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE CAN BUILD TOGETHER</p>
              <h2>
                A clearer process.
                <br />
                <span className="muted-heading">A lighter workload.</span>
              </h2>
            </div>
          </div>
          <div className="feature-grid">
            {service.features.map(([title, text], i) => (
              <article key={title}>
                <span className="feature-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      {service.slug === "ai-receptionist" && (
        <section className="section service-demo-section">
          <div className="container service-demo-layout">
            <div>
              <p className="eyebrow">EXPLORE A CONVERSATION</p>
              <h2>
                A useful answer.
                <br />
                <span className="muted-heading">A thoughtful handoff.</span>
              </h2>
              <p>
                Choose a sample inquiry and see how a receptionist workflow
                could respond. Every example is scripted so you can explore the
                idea without making a call.
              </p>
            </div>
            <ReceptionistDemo />
          </div>
        </section>
      )}
      {service.slug === "quote-automation" && (
        <section className="section service-demo-section">
          <div className="container service-demo-layout">
            <div>
              <p className="eyebrow">FROM REQUEST TO REVIEW</p>
              <h2>
                Start with the details.
                <br />
                <span className="muted-heading">Finish with control.</span>
              </h2>
              <p>
                Try a sample intake workflow. It organizes an inquiry and
                prepares a follow-up draft, illustrating the first steps of a
                quoting process.
              </p>
              <a
                className="inline-link"
                href={PROJECTS[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview the quote generator{" "}
                <ArrowUpRight size={16} />
              </a>
            </div>
            <ReceptionistDemo initialExample="quote" />
          </div>
        </section>
      )}
      {service.slug === "web-development" && <WebsitePreview />}
      {service.slug === "software-development" && <WorkspaceDemo />}
      {(service.slug === "web-development" ||
        service.slug === "software-development") && (
        <section className="service-work-band">
          <div className="container">
            <div>
              <p className="eyebrow">FROM THE COLLECTION</p>
              <h2>See the work taking shape.</h2>
            </div>
            <a className="button button-dark" href="/work/">
              Explore our projects <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      )}
      <section className="section service-delivery">
        <div className="container">
          <div>
            <p className="eyebrow">A CLEAR STARTING POINT</p>
            <h2>Here’s how we begin.</h2>
          </div>
          <ol>
            {service.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="service-scope-note">{service.note}</p>
        </div>
      </section>
      <section className="related-services">
        <div className="container">
          <p className="eyebrow">OTHER SERVICES</p>
          <div>
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <a key={s.slug} href={`/services/${s.slug}/`}>
                <s.icon size={18} />
                {s.name}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
