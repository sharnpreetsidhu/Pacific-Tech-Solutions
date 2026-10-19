import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Auth from "./Auth";
import Home from "./Home";
import "./App.css";

const serviceOptions = {
  detailing: [
    "Interior Detail",
    "Exterior Wash",
    "Full Detail",
    "Paint Correction",
    "Ceramic Coating",
  ],
  trades: [
    "Electrical Repair",
    "Lighting Install",
    "Plumbing Issue",
    "Painting Job",
    "Handyman Repair",
  ],
};

const defaultPricing = {
  detailing: {
    interiorDetail: {
      Sedan: 65,
      SUV: 75,
      Truck: 75,
    },
    exteriorWash: {
      Sedan: 40,
      SUV: 50,
      Truck: 60,
    },
    fullDetail: {
      Sedan: 100,
      SUV: 120,
      Truck: 130,
    },
    addons: {
      petHair: 60,
      stains: 50,
      moderateCondition: 10,
      heavyCondition: 30,
    },
  },
  trades: {
    base: {
      Small: 180,
      Medium: 350,
      Large: 650,
    },
    addons: {
      thisWeek: 75,
      emergency: 150,
    },
  },
};

function mergePricing(industry, savedPricing) {
  const defaults = defaultPricing[industry] || defaultPricing.detailing;

  return {
    ...defaults,
    ...(savedPricing || {}),
    interiorDetail: {
      ...(defaults.interiorDetail || {}),
      ...(savedPricing?.interiorDetail || {}),
    },
    exteriorWash: {
      ...(defaults.exteriorWash || {}),
      ...(savedPricing?.exteriorWash || {}),
    },
    fullDetail: {
      ...(defaults.fullDetail || {}),
      ...(savedPricing?.fullDetail || {}),
    },
    base: {
      ...(defaults.base || {}),
      ...(savedPricing?.base || {}),
    },
    addons: {
      ...(defaults.addons || {}),
      ...(savedPricing?.addons || {}),
    },
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateQuote(form, pricing = defaultPricing[form.industry]) {
  let base = 0;
  let addOns = 0;
  const notes = [];

  if (form.industry === "detailing") {
    const detailPricing = mergePricing("detailing", pricing);

    if (form.service === "Full Detail") {
      base = Number(detailPricing.fullDetail?.[form.vehicleType] || 240);
    } else if (form.service === "Exterior Wash") {
      base = Number(detailPricing.exteriorWash?.[form.vehicleType] || 80);
    } else {
      base = Number(detailPricing.interiorDetail?.[form.vehicleType] || 140);
    }

    if (form.condition === "Moderate") {
      addOns += Number(detailPricing.addons?.moderateCondition || 0);
    }

    if (form.condition === "Heavy") {
      addOns += Number(detailPricing.addons?.heavyCondition || 0);
    }

    if (form.petHair) {
      addOns += Number(detailPricing.addons?.petHair || 0);
      notes.push("Pet hair removal may require extra time.");
    }

    if (form.stains) {
      addOns += Number(detailPricing.addons?.stains || 0);
      notes.push("Stain treatment should be confirmed after photo review.");
    }

    if (form.photos?.length > 0) {
      notes.push(
        `${form.photos.length} photo${
          form.photos.length > 1 ? "s" : ""
        } uploaded for review.`
      );
    }
  }

  if (form.industry === "trades") {
    const tradePricing = mergePricing("trades", pricing);

    base = Number(tradePricing.base?.[form.jobSize] || 180);

    if (form.urgency === "This week") {
      addOns += Number(tradePricing.addons?.thisWeek || 0);
    }

    if (form.urgency === "Emergency") {
      addOns += Number(tradePricing.addons?.emergency || 0);
    }

    notes.push("Final price may change after in-person inspection.");

    if (form.photos?.length > 0) {
      notes.push(
        `${form.photos.length} job photo${
          form.photos.length > 1 ? "s" : ""
        } uploaded for review.`
      );
    }
  }

  const low = base + addOns;
  const high = low + (form.industry === "detailing" ? 60 : 200);

  return {
    priceRange: `$${low} - $${high}`,
    finalPrice: `${Math.round((low + high) / 2)}`,
    estimateTime:
      form.industry === "detailing"
        ? form.condition === "Heavy"
          ? "4–6 hours"
          : "2–4 hours"
        : form.jobSize === "Large"
        ? "1–3 days"
        : "2–6 hours",
    packageName:
      form.industry === "detailing"
        ? `${form.service || "Detailing"} Quote`
        : `${form.service || "Trade Service"} Quote`,
    ownerNotes: notes.length
      ? notes
      : ["Quote looks straightforward based on the customer details."],
    customerMessage: `Thanks ${
      form.name || "there"
    }, based on the details provided, we prepared an estimated quote for your request. The final price can be confirmed after reviewing all job details.`,
  };
}

function getInitialPage() {
  const path = window.location.pathname;

  if (path.startsWith("/b/")) return "publicQuote";
  if (path === "/login") return "login";
  if (path === "/dashboard") return "dashboard";

  return "home";
}

function toUiRequest(row) {
  return {
    id: row.id,
    name: row.customer_name,
    phone: row.customer_phone,
    email: row.customer_email,
    service: row.service,
    vehicleType: row.vehicle_type,
    condition: row.condition,
    petHair: row.pet_hair,
    stains: row.stains,
    jobSize: row.job_size,
    urgency: row.urgency,
    notes: row.notes,
    photos: row.photos || [],
    quote: row.quote || {},
    status: row.status || "New",
    createdAt: row.created_at,
    industry: row.quote?.industry || "detailing",
  };
}

function PublicQuoteForm({ goHome }) {
  const [publicBusiness, setPublicBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    industry: "detailing",
    service: "Interior Detail",
    vehicleType: "Sedan",
    condition: "Light",
    petHair: false,
    stains: false,
    jobSize: "Small",
    urgency: "Flexible",
    notes: "",
    photos: [],
  });

  useEffect(() => {
    async function loadBusinessBySlug() {
      const slug = window.location.pathname.replace("/b/", "").trim();

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Public business fetch error:", error);
        setMessage("Could not load this business.");
      }

      if (!data) {
        setMessage("Business quote link not found.");
      } else {
        const businessType = data.industry || "detailing";

        setPublicBusiness(data);
        setForm((prev) => ({
          ...prev,
          industry: businessType,
          service: serviceOptions[businessType][0],
        }));
      }

      setLoading(false);
    }

    loadBusinessBySlug();
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);

    const photoPreviews = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, ...photoPreviews],
    }));
  }

  function removePhoto(photoId) {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((photo) => photo.id !== photoId),
    }));
  }

  async function submitPublicRequest(e) {
    e.preventDefault();

    if (!publicBusiness) return;

    const businessPricing = mergePricing(
      form.industry,
      publicBusiness.pricing
    );

    const quote = {
      ...generateQuote(form, businessPricing),
      industry: form.industry,
    };

    const { error } = await supabase.from("quote_requests").insert({
      business_id: publicBusiness.id,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email,
      service: form.service,
      vehicle_type: form.vehicleType,
      condition: form.condition,
      pet_hair: form.petHair,
      stains: form.stains,
      job_size: form.jobSize,
      urgency: form.urgency,
      notes: form.notes,
      photos: form.photos,
      quote,
      final_price: quote.finalPrice,
      status: "New",
    });

    if (error) {
      console.error("Public quote insert error:", error);
      setMessage(error.message);
      return;
    }

    setSubmitted(true);
  }

  if (loading) {
    return <p className="loading-screen">Loading quote form...</p>;
  }

  if (message && !publicBusiness) {
    return (
      <main className="public-quote-page">
        <section className="auth-card">
          <h1>Link not found</h1>
          <p className="auth-subtitle">{message}</p>
          <button className="primary-btn full" onClick={goHome}>
            Back Home
          </button>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="public-quote-page">
        <section className="auth-card">
          <p className="eyebrow">{publicBusiness.business_name}</p>
          <h1>Request sent</h1>
          <p className="auth-subtitle">
            Thanks, {form.name}. Your quote request was sent to{" "}
            {publicBusiness.business_name}. They’ll review it and get back to
            you.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="public-quote-page">
      <section className="public-quote-shell">
        <div className="public-quote-copy">
          <p className="eyebrow">Quote request</p>
          <h1>{publicBusiness.business_name}</h1>
          <p>
            Fill out this form with your job details. The business will review
            your request and prepare your quote.
          </p>
        </div>

        <form className="form-card public-form-card" onSubmit={submitPublicRequest}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Phone
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="778-000-0000"
              required
            />
          </label>

          <label>
            Email
            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your@email.com"
            />
          </label>

          <label>
            Service needed
            <select
              value={form.service}
              onChange={(e) => updateField("service", e.target.value)}
            >
              {serviceOptions[form.industry].map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>

          {form.industry === "detailing" ? (
            <>
              <label>
                Vehicle type
                <select
                  value={form.vehicleType}
                  onChange={(e) => updateField("vehicleType", e.target.value)}
                >
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Truck</option>
                </select>
              </label>

              <label>
                Vehicle condition
                <select
                  value={form.condition}
                  onChange={(e) => updateField("condition", e.target.value)}
                >
                  <option>Light</option>
                  <option>Moderate</option>
                  <option>Heavy</option>
                </select>
              </label>

              <div className="checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    checked={form.petHair}
                    onChange={(e) => updateField("petHair", e.target.checked)}
                  />
                  Pet hair
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.stains}
                    onChange={(e) => updateField("stains", e.target.checked)}
                  />
                  Stains
                </label>
              </div>
            </>
          ) : (
            <>
              <label>
                Job size
                <select
                  value={form.jobSize}
                  onChange={(e) => updateField("jobSize", e.target.value)}
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </label>

              <label>
                Urgency
                <select
                  value={form.urgency}
                  onChange={(e) => updateField("urgency", e.target.value)}
                >
                  <option>Flexible</option>
                  <option>This week</option>
                  <option>Emergency</option>
                </select>
              </label>
            </>
          )}

          <label>
            Extra details
            <textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Describe what you need..."
            />
          </label>

          <label>
            Upload photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </label>

          {form.photos.length > 0 && (
            <div className="photo-preview-grid">
              {form.photos.map((photo) => (
                <div className="photo-preview" key={photo.id}>
                  <img src={photo.url} alt={photo.name} />
                  <button type="button" onClick={() => removePhoto(photo.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {message && <p className="auth-message">{message}</p>}

          <button className="primary-btn full" type="submit">
            Submit Quote Request
          </button>
        </form>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [businessLoading, setBusinessLoading] = useState(false);
  const [ownerBusiness, setOwnerBusiness] = useState(null);
  const [pricing, setPricing] = useState(defaultPricing.detailing);

  const [business, setBusiness] = useState({
    name: "My Service Business",
    industry: "detailing",
  });

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const previewForm = {
    name: "",
    phone: "",
    email: "",
    industry: business.industry,
    service: serviceOptions[business.industry][0],
    vehicleType: "Sedan",
    condition: "Light",
    petHair: false,
    stains: false,
    jobSize: "Small",
    urgency: "Flexible",
    notes: "",
    photos: [],
  };

  const quotePreview = useMemo(
    () => generateQuote(previewForm, pricing),
    [business.industry, pricing]
  );

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

     if (session && !window.location.pathname.startsWith("/b/")) {
  await loadOrCreateBusiness(session);
}

      setAuthLoading(false);
    }

    getSession();

 const {
  data: { subscription },
} = supabase.auth.onAuthStateChange((_event, session) => {
  const isPublicQuotePage = window.location.pathname.startsWith("/b/");

  setSession(session);

  if (session && !isPublicQuotePage) {
    loadOrCreateBusiness(session);
    setPage("dashboard");
    window.history.pushState({}, "", "/dashboard");
  }
});

    return () => subscription.unsubscribe();
  }, []);

  async function loadOrCreateBusiness(currentSession) {
    if (!currentSession?.user) return;

    setBusinessLoading(true);

    const user = currentSession.user;

    const { data: existingBusiness, error: fetchError } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Business fetch error:", fetchError);
      alert("Business profile could not load. Check Supabase permissions.");
      setBusinessLoading(false);
      return;
    }

    if (existingBusiness) {
      const businessType = existingBusiness.industry || "detailing";
      const savedPricing = mergePricing(
        businessType,
        existingBusiness.pricing
      );

      setOwnerBusiness(existingBusiness);
      setPricing(savedPricing);

      setBusiness({
        name: existingBusiness.business_name,
        industry: businessType,
      });

      await loadQuoteRequests(existingBusiness.id);

      setBusinessLoading(false);
      return;
    }

    const businessName =
      user.user_metadata?.business_name || "My Service Business";
    const businessType = user.user_metadata?.business_type || "detailing";
    const startingPricing = defaultPricing[businessType];

    const baseSlug = slugify(businessName) || "business";
    const uniqueSlug = `${baseSlug}-${user.id.slice(0, 6)}`;

    const { data: newBusiness, error: insertError } = await supabase
      .from("businesses")
      .insert({
        owner_id: user.id,
        business_name: businessName,
        slug: uniqueSlug,
        industry: businessType,
        pricing: startingPricing,
        email: user.email,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Business insert error:", insertError);
      alert("Business profile could not be created. Check Supabase RLS.");
      setBusinessLoading(false);
      return;
    }

    setOwnerBusiness(newBusiness);
    setPricing(mergePricing(businessType, newBusiness.pricing));

    setBusiness({
      name: newBusiness.business_name,
      industry: newBusiness.industry || businessType,
    });

    await loadQuoteRequests(newBusiness.id);

    setBusinessLoading(false);
  }

  async function loadQuoteRequests(businessId) {
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Quote requests fetch error:", error);
      return;
    }

    const mappedRequests = (data || []).map(toUiRequest);
    setRequests(mappedRequests);
    setSelectedRequest(mappedRequests[0] || null);
  }

  function navigate(nextPage, path) {
    setPage(nextPage);
    window.history.pushState({}, "", path);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setOwnerBusiness(null);
    setRequests([]);
    setSelectedRequest(null);
    navigate("home", "/");
  }

  function getPublicLink() {
    if (!ownerBusiness) return "";
    return `${window.location.origin}/b/${ownerBusiness.slug}`;
  }

  async function copyPublicLink() {
    const publicLink = getPublicLink();

    if (!publicLink) return;

    try {
      await navigator.clipboard.writeText(publicLink);
      alert("Customer quote link copied.");
    } catch (error) {
      console.error("Copy link error:", error);
      alert(publicLink);
    }
  }

  async function sharePublicLink() {
    const publicLink = getPublicLink();

    if (!publicLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${business.name} Quote Request`,
          text: `Request a quote from ${business.name}:`,
          url: publicLink,
        });
        return;
      } catch (error) {
        console.error("Share cancelled or failed:", error);
      }
    }

    try {
      await navigator.clipboard.writeText(publicLink);
      alert("Sharing is not supported here, so the link was copied instead.");
    } catch (error) {
      console.error("Share fallback error:", error);
      alert(publicLink);
    }
  }

  function changeIndustry(industry) {
    setBusiness((prev) => ({
      ...prev,
      industry,
    }));

    setPricing((prev) => mergePricing(industry, prev));
  }

  function updatePricing(path, value) {
    setPricing((prev) => {
      const updated = structuredClone(prev || {});
      let current = updated;

      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }

        current = current[path[i]];
      }

      current[path[path.length - 1]] = Number(value);

      return updated;
    });
  }

  async function savePricing() {
    if (!ownerBusiness) return;

    const cleanedPricing = mergePricing(business.industry, pricing);

    const { error } = await supabase
      .from("businesses")
      .update({
        pricing: cleanedPricing,
        industry: business.industry,
        business_name: business.name,
      })
      .eq("id", ownerBusiness.id);

    if (error) {
      console.error("Pricing save error:", error);
      alert("Could not save pricing.");
      return;
    }

    setPricing(cleanedPricing);

    setOwnerBusiness((prev) => ({
      ...prev,
      pricing: cleanedPricing,
      industry: business.industry,
      business_name: business.name,
    }));

    alert("Settings saved.");
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Status update error:", error);
      return;
    }

    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => ({ ...prev, status }));
    }
  }

  async function updateFinalPrice(id, finalPrice) {
    const updatedQuote = {
      ...selectedRequest?.quote,
      finalPrice,
    };

    const { error } = await supabase
      .from("quote_requests")
      .update({
        final_price: finalPrice,
        quote: updatedQuote,
      })
      .eq("id", id);

    if (error) {
      console.error("Final price update error:", error);
      return;
    }

    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              quote: {
                ...request.quote,
                finalPrice,
              },
            }
          : request
      )
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => ({
        ...prev,
        quote: {
          ...prev.quote,
          finalPrice,
        },
      }));
    }
  }

  if (authLoading) {
    return <p className="loading-screen">Loading...</p>;
  }

  if (page === "publicQuote") {
    return <PublicQuoteForm goHome={() => navigate("home", "/")} />;
  }

  if (page === "home") {
    return (
      <Home
        goToLogin={() => navigate("login", "/login")}
        goToDashboard={() => navigate("dashboard", "/dashboard")}
      />
    );
  }

  if (page === "login" && !session) {
    return <Auth />;
  }

  if (page === "dashboard" && !session) {
    return <Auth />;
  }

  return (
    <main>
      <section className="hero">
        <nav>
          <div className="logo">QuotePilot AI</div>

          <div className="nav-actions">
            <button onClick={() => navigate("home", "/")}>Home</button>
            <button onClick={handleLogout}>Logout</button>

            <button
              className={business.industry === "detailing" ? "active" : ""}
              onClick={() => changeIndustry("detailing")}
            >
              Detailing
            </button>

            <button
              className={business.industry === "trades" ? "active" : ""}
              onClick={() => changeIndustry("trades")}
            >
              Trades
            </button>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">Owner dashboard</p>

            <div className="business-name-display">
              <p>Business name</p>
              <strong>{business.name}</strong>
            </div>

            <h1>{business.name}</h1>

            <p className="hero-text">
              Manage quote requests, review smart quote drafts, update quote
              pricing, and track customer approval status.
            </p>

            {ownerBusiness ? (
              <div className="public-link-box">
                <p>Your customer quote link</p>

                <strong>{getPublicLink()}</strong>

                <div className="share-link-actions">
                  <button type="button" onClick={copyPublicLink}>
                    Copy Link
                  </button>

                  <button type="button" onClick={sharePublicLink}>
                    Share Link
                  </button>

                  <a href={getPublicLink()} target="_blank" rel="noreferrer">
                    Open Form
                  </a>
                </div>
              </div>
            ) : (
              <p className="hero-text">
                No business link found yet. Log out and log back in.
              </p>
            )}

            {businessLoading && <p className="hero-text">Loading business...</p>}

            <div className="hero-buttons">
              <a href="#settings" className="primary-btn">
                Pricing Settings
              </a>
              <a href="#dashboard" className="secondary-btn">
                View Requests
              </a>
            </div>
          </div>

          <div className="quote-card preview-card">
            <div className="card-top">
              <span>Live Quote Draft</span>
              <strong>{business.name}</strong>
            </div>

            <h3>{quotePreview.packageName}</h3>
            <p className="price">{quotePreview.priceRange}</p>
            <p>Estimated time: {quotePreview.estimateTime}</p>

            <div className="mini-list">
              {quotePreview.ownerNotes.map((note, index) => (
                <p key={index}>• {note}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="settings">
        <div className="section-heading">
          <p className="eyebrow">Business settings</p>
          <h2>Pricing settings</h2>
          <p>
            Set your own prices. These numbers control the estimates on your
            public quote form.
          </p>
        </div>

        {business.industry === "detailing" ? (
          <div className="settings-grid">
            <label>
              Interior Detail - Sedan
              <input
                type="number"
                value={pricing.interiorDetail?.Sedan || ""}
                onChange={(e) =>
                  updatePricing(["interiorDetail", "Sedan"], e.target.value)
                }
              />
            </label>

            <label>
              Interior Detail - SUV
              <input
                type="number"
                value={pricing.interiorDetail?.SUV || ""}
                onChange={(e) =>
                  updatePricing(["interiorDetail", "SUV"], e.target.value)
                }
              />
            </label>

            <label>
              Interior Detail - Truck
              <input
                type="number"
                value={pricing.interiorDetail?.Truck || ""}
                onChange={(e) =>
                  updatePricing(["interiorDetail", "Truck"], e.target.value)
                }
              />
            </label>

            <label>
              Exterior Wash - Sedan
              <input
                type="number"
                value={pricing.exteriorWash?.Sedan || ""}
                onChange={(e) =>
                  updatePricing(["exteriorWash", "Sedan"], e.target.value)
                }
              />
            </label>

            <label>
              Exterior Wash - SUV
              <input
                type="number"
                value={pricing.exteriorWash?.SUV || ""}
                onChange={(e) =>
                  updatePricing(["exteriorWash", "SUV"], e.target.value)
                }
              />
            </label>

            <label>
              Exterior Wash - Truck
              <input
                type="number"
                value={pricing.exteriorWash?.Truck || ""}
                onChange={(e) =>
                  updatePricing(["exteriorWash", "Truck"], e.target.value)
                }
              />
            </label>

            <label>
              Full Detail - Sedan
              <input
                type="number"
                value={pricing.fullDetail?.Sedan || ""}
                onChange={(e) =>
                  updatePricing(["fullDetail", "Sedan"], e.target.value)
                }
              />
            </label>

            <label>
              Full Detail - SUV
              <input
                type="number"
                value={pricing.fullDetail?.SUV || ""}
                onChange={(e) =>
                  updatePricing(["fullDetail", "SUV"], e.target.value)
                }
              />
            </label>

            <label>
              Full Detail - Truck
              <input
                type="number"
                value={pricing.fullDetail?.Truck || ""}
                onChange={(e) =>
                  updatePricing(["fullDetail", "Truck"], e.target.value)
                }
              />
            </label>

            <label>
              Pet Hair Add-on
              <input
                type="number"
                value={pricing.addons?.petHair || ""}
                onChange={(e) =>
                  updatePricing(["addons", "petHair"], e.target.value)
                }
              />
            </label>

            <label>
              Stains Add-on
              <input
                type="number"
                value={pricing.addons?.stains || ""}
                onChange={(e) =>
                  updatePricing(["addons", "stains"], e.target.value)
                }
              />
            </label>

            <label>
              Moderate Condition Add-on
              <input
                type="number"
                value={pricing.addons?.moderateCondition || ""}
                onChange={(e) =>
                  updatePricing(
                    ["addons", "moderateCondition"],
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Heavy Condition Add-on
              <input
                type="number"
                value={pricing.addons?.heavyCondition || ""}
                onChange={(e) =>
                  updatePricing(["addons", "heavyCondition"], e.target.value)
                }
              />
            </label>
          </div>
        ) : (
          <div className="settings-grid">
            <label>
              Small Job Base Price
              <input
                type="number"
                value={pricing.base?.Small || ""}
                onChange={(e) =>
                  updatePricing(["base", "Small"], e.target.value)
                }
              />
            </label>

            <label>
              Medium Job Base Price
              <input
                type="number"
                value={pricing.base?.Medium || ""}
                onChange={(e) =>
                  updatePricing(["base", "Medium"], e.target.value)
                }
              />
            </label>

            <label>
              Large Job Base Price
              <input
                type="number"
                value={pricing.base?.Large || ""}
                onChange={(e) =>
                  updatePricing(["base", "Large"], e.target.value)
                }
              />
            </label>

            <label>
              This Week Urgency Add-on
              <input
                type="number"
                value={pricing.addons?.thisWeek || ""}
                onChange={(e) =>
                  updatePricing(["addons", "thisWeek"], e.target.value)
                }
              />
            </label>

            <label>
              Emergency Add-on
              <input
                type="number"
                value={pricing.addons?.emergency || ""}
                onChange={(e) =>
                  updatePricing(["addons", "emergency"], e.target.value)
                }
              />
            </label>
          </div>
        )}

        <button className="primary-btn save-settings-btn" onClick={savePricing}>
          Save Settings
        </button>
      </section>

      <section className="section" id="dashboard">
        <div className="section-heading dashboard-heading">
          <div>
            <p className="eyebrow">Owner side</p>
            <h2>Quote dashboard</h2>
            <p>
              Customer quote requests from your public link will appear here.
            </p>
          </div>
        </div>

        <div className="dashboard">
          <div className="request-list">
            <h3>Quote Requests</h3>

            {requests.length === 0 ? (
              <p className="empty">
                No quote requests yet. Share your public quote link with a
                customer or open it yourself to test.
              </p>
            ) : (
              requests.map((request) => (
                <button
                  key={request.id}
                  className={`request-item ${
                    selectedRequest?.id === request.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <span>{request.name}</span>
                  <small>{request.service}</small>
                  <em>{request.status}</em>
                </button>
              ))
            )}
          </div>

          <div className="quote-detail">
            {selectedRequest ? (
              <>
                <div className="detail-top">
                  <div>
                    <p className="eyebrow">Generated quote</p>
                    <h3>{selectedRequest.quote.packageName}</h3>
                  </div>

                  <span className="status">{selectedRequest.status}</span>
                </div>

                <div className="detail-grid">
                  <div>
                    <strong>Customer</strong>
                    <p>{selectedRequest.name}</p>
                    <p>{selectedRequest.phone}</p>
                    <p>{selectedRequest.email || "No email added"}</p>
                  </div>

                  <div>
                    <strong>Suggested price range</strong>
                    <p className="price small">
                      {selectedRequest.quote.priceRange}
                    </p>
                    <p>{selectedRequest.quote.estimateTime}</p>
                  </div>
                </div>

                <label className="final-price-box">
                  Final quote price
                  <div className="price-input-wrap">
                    <span>$</span>
                    <input
                      value={selectedRequest.quote.finalPrice || ""}
                      onChange={(e) =>
                        updateFinalPrice(selectedRequest.id, e.target.value)
                      }
                    />
                  </div>
                </label>

                <div className="message-box">
                  <strong>Customer message</strong>
                  <p>{selectedRequest.quote.customerMessage}</p>
                </div>

                <div className="message-box">
                  <strong>Owner notes</strong>
                  {(selectedRequest.quote.ownerNotes || []).map(
                    (note, index) => (
                      <p key={index}>• {note}</p>
                    )
                  )}
                </div>

                {selectedRequest.notes && (
                  <div className="message-box">
                    <strong>Customer notes</strong>
                    <p>{selectedRequest.notes}</p>
                  </div>
                )}

                <div className="action-row">
                  <button
                    onClick={() => updateStatus(selectedRequest.id, "Sent")}
                  >
                    Mark Sent
                  </button>

                  <button
                    onClick={() => updateStatus(selectedRequest.id, "Accepted")}
                  >
                    Mark Accepted
                  </button>

                  <button
                    onClick={() => updateStatus(selectedRequest.id, "Booked")}
                  >
                    Mark Booked
                  </button>
                </div>
              </>
            ) : (
              <p className="empty">
                Select a quote request to view the quote draft.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}