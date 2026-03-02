import PageLayout from "@/components/layout/pageLayout";
import Link from "next/link";

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-cream py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-stone-800 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-stone-600">Last updated: March 2, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-amber-200/60 shadow-sm space-y-8">
            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Welcome to Tosi Farms. These Terms and Conditions govern your
                use of our website and the purchase of products from us. By
                accessing our website or making a purchase, you agree to be
                bound by these terms. Please read them carefully before using
                our services.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                2. Products and Services
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Tosi Farms provides fresh agricultural products including
                  cassava, maize, fruits, and garri. We strive to ensure all
                  product descriptions and images are accurate, but we do not
                  guarantee that they are entirely error-free or complete.
                </p>
                <p>We reserve the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or discontinue products without notice</li>
                  <li>Limit quantities available for purchase</li>
                  <li>Refuse service to anyone for any reason</li>
                  <li>Update pricing as necessary</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                3. Orders and Pricing
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  All prices are displayed in Nigerian Naira (NGN) and are
                  subject to change without notice. We reserve the right to
                  correct any pricing errors on our website.
                </p>
                <p>
                  By placing an order, you are making an offer to purchase
                  products from us. We reserve the right to accept or decline
                  your order for any reason, including product availability,
                  errors in pricing, or problems identified by our fraud
                  detection systems.
                </p>
                <p>
                  Once your order is confirmed, we will send you a confirmation
                  email with your order details.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                4. Payment
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We accept various payment methods as displayed at checkout.
                  Payment must be received before we process your order. You
                  agree to provide current, complete, and accurate purchase and
                  account information for all purchases.
                </p>
                <p>
                  All payments are processed securely through our trusted
                  payment partners. We do not store your full credit card or
                  payment information on our servers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                5. Delivery and Shipping
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Delivery times are estimates and not guaranteed. We will make
                  reasonable efforts to deliver products within the estimated
                  timeframe, but we are not liable for delays caused by
                  circumstances beyond our control.
                </p>
                <p>
                  Risk of loss and title for products pass to you upon delivery
                  to the carrier. You are responsible for providing accurate
                  delivery information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                6. Returns and Refunds
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Due to the perishable nature of our products, we have a
                  limited return policy. If you receive damaged or defective
                  products, please contact us within 24 hours of delivery with
                  photographic evidence.
                </p>
                <p>
                  Refunds will be processed to the original payment method
                  within 7-10 business days of approval. Shipping costs are
                  non-refundable unless the return is due to our error.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                7. Product Quality and Safety
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We take great care to ensure our products meet high quality
                  and safety standards. However, as these are agricultural
                  products, natural variations may occur.
                </p>
                <p>
                  It is your responsibility to inspect products upon receipt and
                  store them properly according to provided guidelines.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                8. User Accounts
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  When you create an account with us, you are responsible for
                  maintaining the security of your account and password. You
                  agree to accept responsibility for all activities that occur
                  under your account.
                </p>
                <p>
                  You must notify us immediately of any unauthorized use of your
                  account or any other security breach.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                9. Intellectual Property
              </h2>
              <p className="text-stone-600 leading-relaxed">
                All content on this website, including text, images, logos, and
                designs, is the property of Tosi Farms or its content suppliers
                and is protected by copyright and intellectual property laws.
                You may not reproduce, distribute, or create derivative works
                without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-stone-600 leading-relaxed">
                To the maximum extent permitted by law, Tosi Farms shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of our website or
                products.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                11. Governing Law
              </h2>
              <p className="text-stone-600 leading-relaxed">
                These Terms and Conditions are governed by and construed in
                accordance with the laws of Nigeria. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of Nigeria.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any
                time. Changes will be effective immediately upon posting to the
                website. Your continued use of the website after changes
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                13. Contact Information
              </h2>
              <div className="text-stone-600 leading-relaxed">
                <p className="mb-4">
                  If you have any questions about these Terms and Conditions,
                  please contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:hello@tosifarms.com"
                      className="text-amber-700 hover:text-amber-600"
                    >
                      hello@tosifarms.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 000 000 0000
                  </p>
                  <p>
                    <strong>Address:</strong> Off Farm Road, Local Gov, State
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-stone-200">
              <p className="text-stone-600 text-center">
                By using our website and services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms and
                Conditions.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/privacy"
              className="text-center px-6 py-3 bg-white border border-amber-200/60 rounded-full text-amber-700 font-semibold hover:bg-amber-50 transition-colors"
            >
              View Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-center px-6 py-3 bg-amber-700 rounded-full text-white font-semibold hover:bg-amber-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
