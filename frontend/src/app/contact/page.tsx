"use client";

import PageLayout from "@/components/layout/pageLayout";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="bg-[#fcfaf5]">
        {/* ── Section 1: Hero ─────────────────────────────────── */}
        <div className="relative h-[400px] md:h-[600px] overflow-hidden flex items-center justify-center text-center px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-stone-900/40 z-10" />
            <img
              src="https://images.unsplash.com/photo-1594771804886-a933bb2d609b?q=80&w=2682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Tosin Farms"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="relative z-20 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-sm">
              Connect With Us
            </h1>
            <p className="text-base md:text-xl text-stone-100/90 max-w-2xl mx-auto leading-relaxed font-medium">
              We&apos;re here to cultivate partnerships and ensure your table always has the best harvest.
            </p>
          </div>
        </div>

        {/* ── Section 2: Contact Method Cards ────────────────── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-20 relative z-30 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-10 shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 transition-colors">
                <Phone className="w-8 h-8 text-amber-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-xl text-stone-900 mb-4">Customer Support</h3>
              <p className="text-sm text-stone-500 mb-8 leading-relaxed">Need urgent help with an order? Our team is available weekdays.</p>
              <div className="space-y-4">
                <a href="tel:+2348007270000" className="flex items-center gap-3 text-stone-800 text-sm font-bold hover:text-amber-700 transition-colors">
                  <span className="p-2 bg-stone-50 rounded-lg"><Phone className="w-4 h-4" /></span>
                  +234 800 123 4567
                </a>
                <div className="flex items-center gap-3 text-stone-500 text-xs">
                  <Clock className="w-4 h-4" />
                  Mon-Fri, 9am - 5pm
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-10 shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 transition-colors">
                <Mail className="w-8 h-8 text-amber-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-xl text-stone-900 mb-4">General Inquiry</h3>
              <p className="text-sm text-stone-500 mb-8 leading-relaxed">For partnerships, stock questions, or just a friendly hello.</p>
              <div className="space-y-4">
                <a href="mailto:hello@tosifarms.com" className="flex items-center gap-3 text-stone-800 text-sm font-bold hover:text-amber-700 transition-colors">
                  <span className="p-2 bg-stone-50 rounded-lg"><Mail className="w-4 h-4" /></span>
                  hello@tosifarms.com
                </a>
                <div className="flex gap-4 pt-2">
                  <Link href="#" className="p-2.5 bg-stone-100 rounded-md hover:bg-amber-100 hover:text-amber-700 text-stone-400 transition-all"><Instagram className="w-4 h-4" /></Link>
                  <Link href="#" className="p-2.5 bg-stone-100 rounded-md hover:bg-amber-100 hover:text-amber-700 text-stone-400 transition-all"><Facebook className="w-4 h-4" /></Link>
                  <Link href="#" className="p-2.5 bg-stone-100 rounded-md hover:bg-amber-100 hover:text-amber-700 text-stone-400 transition-all"><Twitter className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-10 shadow-xl shadow-stone-200/50 border border-stone-100 transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-600 transition-colors">
                <MapPin className="w-8 h-8 text-amber-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold text-xl text-stone-900 mb-4">Our Base</h3>
              <p className="text-sm text-stone-500 mb-8 leading-relaxed">Visit our demonstration farm to see where the magic happens.</p>
              <div className="space-y-4">
                <p className="flex items-start gap-3 text-stone-800 text-sm font-bold">
                  <span className="p-2 bg-stone-50 rounded-lg mt-1"><MapPin className="w-4 h-4" /></span>
                  <span>
                    12 Agribusiness Hub, <br />
                    Farm Estate, Lagos, Nigeria
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Section 3: Form + FAQ ─────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-16 py-24">
            {/* Form Section (3/5) */}
            <div className="lg:col-span-3">
              <div className="mb-12">
                <span className="text-amber-700 font-bold uppercase tracking-widest text-[10px] mb-2 block">Direct Message</span>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-stone-900">Send us a line.</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 bg-amber-50/50 p-8 md:p-12 rounded-[2rem] border border-amber-100/50">
                {submitStatus === "success" && (
                  <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-sm font-medium animate-in zoom-in-95 fill-mode-both">
                    ✨ Message received! We&apos;ll get back to you within 24 hours.
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8 font-medium">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-stone-600 text-xs">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white px-6 py-4 rounded-md border border-stone-200 focus:border-amber-700 focus:ring-4 focus:ring-amber-700/10 outline-none transition-all placeholder:text-stone-300 text-sm"
                      placeholder="Jane Cooper"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-stone-600 text-xs">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white px-6 py-4 rounded-md border border-stone-200 focus:border-amber-700 focus:ring-4 focus:ring-amber-700/10 outline-none transition-all placeholder:text-stone-300 text-sm"
                      placeholder="jane@tosifarms.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-stone-600 text-xs font-medium">Inquiry Type</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white px-6 py-4 rounded-md border border-stone-200 focus:border-amber-700 focus:ring-4 focus:ring-amber-700/10 outline-none transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Choose a reason...</option>
                    <option value="general">I have a general question</option>
                    <option value="bulk">I want to order in bulk (Wholesale)</option>
                    <option value="partnership">I&apos;d love to partner with you</option>
                    <option value="feedback">I have feedback/testimonial</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-stone-600 text-xs font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white px-6 py-4 rounded-md border border-stone-200 focus:border-amber-700 focus:ring-4 focus:ring-amber-700/10 outline-none transition-all resize-none placeholder:text-stone-300 text-sm"
                    placeholder="Tell us what's on your mind... we listen."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-stone-900 hover:bg-amber-700 disabled:bg-stone-300 text-white font-bold py-5 px-12 rounded-2xl transition-all active:scale-95 shadow-lg shadow-stone-200 overflow-hidden relative group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Sending..." : "Send A Request"}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
              </form>
            </div>

            {/* FAQ Section (2/5) */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <span className="text-amber-700 font-bold uppercase tracking-widest text-[10px] mb-2 block">Quick Answers</span>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-stone-900">FAQs</h2>
              </div>

              <Accordion>
                <AccordionItem title="Do you deliver nationwide?" isOpen={true}>
                  Yes! We deliver across Nigeria. Metro Lagos delivery takes 24-48 hours, while other states take 3-5 business days depending on the perishability of the items.
                </AccordionItem>
                <AccordionItem title="Can I buy in bulk for a business?">
                  Absolutely. We offer competitive wholesale pricing for restaurants, caterers, and retail resellers. Use the &quot;Wholesale&quot; option in the contact form for better rates.
                </AccordionItem>
                <AccordionItem title="How do you ensure farm-to-table freshness?">
                  We harvest on-demand. When you place an order, our farm teams initiate the process, ensuring the transit time is minimized and temperature is controlled for perishables.
                </AccordionItem>
                <AccordionItem title="Interested in visiting the farm?">
                  We host educational farm visits every last Saturday of the month. Please send us an email to reserve a slot for your family or group.
                </AccordionItem>
                <AccordionItem title="Payment Methods?">
                  We accept all major credit/debit cards, bank transfers through Paystack, and secure online payments. For bulk orders, we can process invoiced payments.
                </AccordionItem>
              </Accordion>

              <div className="mt-12 p-8 bg-stone-900 rounded-xl text-white">
                <h4 className="font-bold text-xl mb-4 leading-tight">Can&apos;t find what you need?</h4>
                <p className="text-stone-400 mb-6 text-xs">Our live chat is open 9-5 during weekdays for immediate assistance.</p>
                <Button variant="outline" className="w-full h-12 rounded-lg border-white/20 hover:bg-white text-stone-900 transition-all font-bold group">
                  Start Live Chat
                  <MessageSquare className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Bottom CTA ─────────────────────────── */}
        <section className="bg-amber-700 py-30 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-amber-600 rounded-full blur-[100px] opacity-20" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-amber-800 rounded-full blur-[100px] opacity-20" />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8 tracking-tight">
              Ready to taste the difference?
            </h2>
            <p className="text-lg md:text-xl text-amber-50/80 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of happy families enjoying fresh farm produce every week and experience the difference that quality makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/shop" className="w-full sm:w-auto px-12 py-4 bg-white text-amber-700 font-black rounded-lg hover:bg-stone-100 transition-all shadow-xl shadow-amber-900/20 group">
                Shop Now
                <HiArrowLongRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-12 py-4 border-2 border-amber-400/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                Our Story
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
