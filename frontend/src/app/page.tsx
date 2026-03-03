import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Comparison } from "@/components/sections/Comparison";
import { TestimonialsCTA } from "@/components/sections/TestimonialsCTA";
import { PageObserver } from "@/components/shared/pageObserver";
import PageLayout from "@/components/layout/pageLayout";

export default function Home() {
  return (
    <PageLayout isHomePage={true}>
      <PageObserver />
      <Hero />
      <WhyChooseUs />
      <Products />
      <Process />
      <Comparison />
      <TestimonialsCTA />
    </PageLayout>
  );
}
