import PageLayout from "@/components/layout/pageLayout";
import Link from "next/link";
import { Tractor, Users, Heart, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-6">
              About Tosi Farms
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
              Growing quality produce with care and dedication for our community
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="font-display font-bold text-3xl text-stone-800">
                Our Story
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Tosi Farms began with a simple vision: to provide fresh,
                  high-quality agricultural products to our local community
                  while maintaining sustainable farming practices.
                </p>
                <p>
                  For years, we&apos;ve been cultivating the finest cassava,
                  maize, fruits, and garri, building strong relationships with
                  households, traders, and businesses throughout our region.
                </p>
                <p>
                  Our commitment to quality starts with the soil and extends
                  through every step of our process, ensuring that what reaches
                  your table is nothing but the best.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200/60">
              <h3 className="font-display font-bold text-2xl text-stone-800 mb-6">
                Our Mission
              </h3>
              <p className="text-stone-600 leading-relaxed mb-8">
                To be the trusted source of premium agricultural products in our
                region, supporting local communities through sustainable farming
                practices and exceptional customer service.
              </p>
              <h3 className="font-display font-bold text-2xl text-stone-800 mb-6">
                Our Vision
              </h3>
              <p className="text-stone-600 leading-relaxed">
                To create a thriving agricultural ecosystem that benefits
                farmers, customers, and the environment, while preserving
                traditional farming knowledge for future generations.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="font-display font-bold text-3xl text-center text-stone-800 mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-700/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-xl text-stone-800">Quality</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We never compromise on the quality of our products, ensuring
                  the best for our customers.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-700/10 rounded-full flex items-center justify-center">
                  <Tractor className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-xl text-stone-800">
                  Sustainability
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Our farming practices protect the environment and ensure
                  long-term viability.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-700/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-xl text-stone-800">Community</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We&apos;re committed to supporting and uplifting our local
                  community.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-700/10 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-xl text-stone-800">Excellence</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We strive for excellence in everything we do, from farm to
                  delivery.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-stone-800 rounded-2xl p-12 text-center text-white">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Ready to Experience Our Quality?
            </h2>
            <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
              Visit our shop to explore our full range of fresh, high-quality
              products delivered straight from our farm to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full border border-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
