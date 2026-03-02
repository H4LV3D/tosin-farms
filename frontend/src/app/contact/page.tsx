"use client";

import PageLayout from "@/components/layout/pageLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
              Have questions about our products or services? We&apos;d love to
              hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Information Cards */}
            <div className="bg-white rounded-2xl p-8 border border-amber-200/60 shadow-sm">
              <div className="w-14 h-14 bg-amber-700/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl text-stone-800 mb-3">Call Us</h3>
              <p className="text-stone-600 mb-4">Mon-Fri from 8am to 6pm</p>
              <a
                href="tel:+2340000000000"
                className="text-amber-700 font-semibold hover:text-amber-600 transition-colors"
              >
                +234 000 000 0000
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-amber-200/60 shadow-sm">
              <div className="w-14 h-14 bg-amber-700/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl text-stone-800 mb-3">
                Email Us
              </h3>
              <p className="text-stone-600 mb-4">
                We&apos;ll respond within 24 hours
              </p>
              <a
                href="mailto:hello@tosifarms.com"
                className="text-amber-700 font-semibold hover:text-amber-600 transition-colors"
              >
                hello@tosifarms.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-amber-200/60 shadow-sm">
              <div className="w-14 h-14 bg-amber-700/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl text-stone-800 mb-3">
                Visit Us
              </h3>
              <p className="text-stone-600 mb-4">
                Come see our farm and operations
              </p>
              <address className="text-amber-700 font-semibold not-italic">
                Off Farm Road,
                <br />
                Local Gov, State
              </address>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-amber-200/60 shadow-sm">
              <h2 className="font-display font-bold text-3xl text-stone-800 mb-8 text-center">
                Send Us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-stone-700 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-stone-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-stone-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 outline-none transition-all"
                      placeholder="+234 000 000 0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-stone-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="bulk">Bulk Orders</option>
                      <option value="delivery">Delivery & Shipping</option>
                      <option value="partnership">
                        Partnership Opportunities
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-stone-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20 outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-400 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <h3 className="font-bold text-xl text-stone-800 mb-4">
              Business Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-stone-600">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200/60">
                <p className="font-semibold text-stone-800">Monday - Friday</p>
                <p>8:00 AM - 6:00 PM</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200/60">
                <p className="font-semibold text-stone-800">
                  Saturday - Sunday
                </p>
                <p>9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
