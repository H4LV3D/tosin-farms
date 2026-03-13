"use client";

import React from "react";
import Image from "next/image";
import { FadeSlideUp, StaggerContainer, StaggerItem } from "@/components/shared/MotionComponents";

export function Process() {
  const steps = [
    {
      number: "1",
      title: "Soil Preparation & Planting",
      desc: "We prepare our land with organic compost and plant high-yielding, disease-resistant varieties of cassava, maize, and fruits.",
    },
    {
      number: "2",
      title: "Careful Cultivation",
      desc: "Our team monitors every crop — weeding, mulching, and managing pests naturally so you receive clean, healthy produce.",
    },
    {
      number: "3",
      title: "On-Farm Processing",
      desc: "Our garri and flours are processed fresh on the farm using hygienic equipment — from peeling and grating to frying and sieving.",
    },
    {
      number: "4",
      title: "Delivered Locally",
      desc: "We supply households, markets, and businesses within our region — quickly and reliably, straight from the farm.",
    },
  ];

  return (
    <section id="process" className="py-24 lg:py-32 pattern-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <FadeSlideUp>
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-6">
                Our Process
              </span>
            </FadeSlideUp>
            <FadeSlideUp delay={0.1}>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-[#1c1917] mb-10">
                From Planting to
                <br />
                Your Doorstep
              </h2>
            </FadeSlideUp>

            <StaggerContainer className="space-y-10">
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="flex gap-6 group">
                    <div className="shrink-0 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[#1c1917] group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300 font-display font-bold text-lg">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1c1917] mb-2">{step.title}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <FadeSlideUp delay={0.2}>
              <figure className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=900&q=80"
                  alt="Farmer working in cassava field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1c1917]/20"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/90 backdrop-blur p-6 rounded-xl border border-white/40 shadow-lg">
                    <p className="font-display text-[#1c1917] font-medium italic text-sm leading-relaxed">
                      &quot;We grow what we know. Every crop on Tosi Farms is
                      handled with experience passed down through generations of
                      farming.&quot;
                    </p>
                    <p className="text-xs text-stone-500 mt-3 font-semibold uppercase tracking-widest">
                      — Tosi Farms Team
                    </p>
                  </div>
                </div>
              </figure>
            </FadeSlideUp>
          </div>
        </div>
      </div>
    </section>
  );
}
