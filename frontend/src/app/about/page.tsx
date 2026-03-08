import PageLayout from "@/components/layout/pageLayout";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutHistory } from "@/components/sections/AboutHistory";
import { AboutValues } from "@/components/sections/AboutValues";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Tosin Farms",
  description: "Learn about Tosin Farms, our mission, vision, and values.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="min-h-screen">
        <AboutHero />
        <AboutMission />
        <AboutStats />
        <AboutHistory />
        <AboutValues />
        <AboutCTA />
      </div>
    </PageLayout>
  );
}
