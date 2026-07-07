"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Handshake,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Mail,
  Phone,
  User,
  Building,
  Sparkles,
  ArrowLeft,
  Loader2,
  Zap,
  Package,
  Award
} from "lucide-react";
import Link from "next/link";
import { InstagramIcon } from "@/components/ui/instagram-icon";

type PartnershipType = "creator" | "brand" | "consignment" | "wholesale";

export default function PartnerPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    partnershipType: "creator" as PartnershipType,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message or proposal details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partner/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const partnershipOptions: { value: PartnershipType; label: string; description: string }[] = [
    {
      value: "creator",
      label: "Content Creator / Influencer",
      description: "For creators, sneakerheads, and influencers looking to review drops, create lookbooks, or promote referral links.",
    },
    {
      value: "brand",
      label: "Brand Collaboration",
      description: "For designers, customizers, and streetwear labels looking to showcase or launch exclusive collections.",
    },
    {
      value: "consignment",
      label: "Consignment Partner",
      description: "For resellers, collectors, and shops wanting to list authentic kicks and apparel on our high-traffic platform.",
    },
    {
      value: "wholesale",
      label: "Bulk & Wholesale Buyer",
      description: "For retail businesses looking to purchase sneakers, apparel, or accessories in larger volumes.",
    },
  ];

  return (
    <div className="min-h-screen bg-ink text-stone-50">
      {/* Dynamic Grid Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #FF5A1F 0, #FF5A1F 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-stone-50/50 transition-colors hover:text-hazard"
        >
          <ArrowLeft size={16} /> Back to shop
        </Link>

        {/* Header */}
        <div className="mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-hazard/30 bg-hazard/10 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-hazard">
            <Handshake size={14} /> Partner With Us
          </div>
          <h1 className="mt-4 font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl">
            LET'S SHIFT THE <span className="text-hazard">CULTURE</span> TOGETHER.
          </h1>
          <p className="mt-4 text-base text-stone-50/60 sm:text-lg">
            We connect authentic global streetwear drops with the East African market. Whether you design apparel, create content, or resell authentic kicks, let's build the future of drip.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Tiers & Value Props */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-display text-xl uppercase tracking-wider text-stone-50/40">
              Partnership Pathways
            </h2>

            <div className="space-y-4">
              {partnershipOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setFormData((prev) => ({ ...prev, partnershipType: opt.value }))}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    formData.partnershipType === opt.value
                      ? "border-hazard bg-hazard/5 ring-1 ring-hazard/20"
                      : "border-stone-50/10 bg-white/5 hover:border-stone-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base uppercase tracking-wide">
                      {opt.label}
                    </h3>
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        formData.partnershipType === opt.value
                          ? "border-hazard bg-hazard"
                          : "border-stone-50/30"
                      }`}
                    >
                      {formData.partnershipType === opt.value && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-stone-50/60 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Value Highlights */}
            <div className="rounded-3xl border border-stone-50/10 bg-white/5 p-7 backdrop-blur-sm">
              <h3 className="font-display text-lg uppercase tracking-tight mb-5">Why collaborate?</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Zap className="text-hazard" size={18} />,
                    title: "Fast-Growing Audience",
                    desc: "Instant visibility to thousands of active sneakerheads and premium shoppers across Kenya.",
                  },
                  {
                    icon: <Package className="text-hazard" size={18} />,
                    title: "Hassle-Free Delivery",
                    desc: "We run our own logistics system, handling MPesa secure payouts, sorting, and express deliveries.",
                  },
                  {
                    icon: <Award className="text-hazard" size={18} />,
                    title: "Verified Authenticity",
                    desc: "We stand for 100% genuine products. Partnering with us stamps your gear with trust.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-50/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-sm uppercase tracking-wide">{item.title}</h4>
                      <p className="text-xs text-stone-50/50 leading-normal">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Portal Application Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stone-50/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
              {/* Background gradient bubble */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-hazard/5 filter blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl uppercase tracking-tight">
                      Submit Your Proposal
                    </h2>
                    <p className="mt-1 text-sm text-stone-50/50">
                      Tell us who you are and how we can work together. We review applications within 48 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Name */}
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                            Full Name <span className="text-hazard">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-stone-50/40">
                              <User size={16} />
                            </span>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="e.g. Brian Murutu"
                              className={`w-full rounded-xl border bg-ink/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors ${
                                errors.name
                                  ? "border-hazard focus:border-hazard"
                                  : "border-stone-50/10 focus:border-hazard"
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="mt-1 text-xs text-hazard">{errors.name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                            Email Address <span className="text-hazard">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-stone-50/40">
                              <Mail size={16} />
                            </span>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="e.g. brian@example.com"
                              className={`w-full rounded-xl border bg-ink/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors ${
                                errors.email
                                  ? "border-hazard focus:border-hazard"
                                  : "border-stone-50/10 focus:border-hazard"
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="mt-1 text-xs text-hazard">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Phone */}
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                            Phone / WhatsApp Number <span className="text-hazard">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-stone-50/40">
                              <Phone size={16} />
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="e.g. +254 712 345 678"
                              className={`w-full rounded-xl border bg-ink/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors ${
                                errors.phone
                                  ? "border-hazard focus:border-hazard"
                                  : "border-stone-50/10 focus:border-hazard"
                              }`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-1 text-xs text-hazard">{errors.phone}</p>
                          )}
                        </div>

                        {/* Company */}
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                            Company / Brand Name
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-3.5 text-stone-50/40">
                              <Building size={16} />
                            </span>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="e.g. RetroCustoms"
                              className="w-full rounded-xl border border-stone-50/10 bg-ink/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-hazard"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Website */}
                      <div>
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                          Social Media Profile / Website Link
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3.5 text-stone-50/40">
                            <InstagramIcon size={16} />
                          </span>
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="e.g. instagram.com/username or yourwebsite.com"
                            className="w-full rounded-xl border border-stone-50/10 bg-ink/50 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-hazard"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-stone-50/50">
                          Proposal Details / Message <span className="text-hazard">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Briefly describe your products, creator reach, or bulk inventory proposal..."
                          className={`w-full rounded-xl border bg-ink/50 p-4 text-sm outline-none transition-colors resize-none ${
                            errors.message
                              ? "border-hazard focus:border-hazard"
                              : "border-stone-50/10 focus:border-hazard"
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-hazard">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-hazard py-4 font-display text-sm uppercase tracking-wide text-white transition-all hover:scale-[1.01] hover:bg-hazard/90 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  /* Success State */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hazard/10 text-hazard">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="mt-6 font-display text-2xl uppercase tracking-tight">
                      Application Submitted!
                    </h3>
                    <p className="mt-2 text-sm text-stone-50/60 max-w-md mx-auto">
                      Thank you for reaching out. We have received your details, and our team will get in touch via email or WhatsApp within the next 48 hours.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                      <Link
                        href="/shop"
                        className="inline-flex items-center justify-center rounded-xl bg-hazard px-6 py-3 font-display text-xs uppercase tracking-wide text-white hover:bg-hazard/90 transition-colors"
                      >
                        Browse Shop
                      </Link>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            website: "",
                            partnershipType: "creator",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center justify-center rounded-xl border border-stone-50/20 px-6 py-3 font-display text-xs uppercase tracking-wide text-stone-50 hover:bg-white/5 transition-colors"
                      >
                        Submit another response
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
