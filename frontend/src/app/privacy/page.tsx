import PageLayout from "@/components/layout/pageLayout";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-cream py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-stone-800 mb-4">
              Privacy Policy
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
                At Tosi Farms, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or make a purchase
                from us.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We collect several types of information from and about users
                  of our website:
                </p>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Personal Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Name and contact information (email, phone number,
                      address)
                    </li>
                    <li>Payment and billing information</li>
                    <li>Order history and preferences</li>
                    <li>Account credentials (username and password)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Automatic Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referral source and exit pages</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                3. How We Use Your Information
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve and personalize your experience</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Detect and prevent fraud and security breaches</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze website usage and improve our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We do not sell or rent your personal information to third
                  parties. We may share your information with:
                </p>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Service Providers
                  </h3>
                  <p>
                    We work with trusted third-party service providers who
                    assist us with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Payment processing</li>
                    <li>Shipping and delivery</li>
                    <li>Website hosting and maintenance</li>
                    <li>Email and marketing services</li>
                    <li>Analytics and performance monitoring</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Legal Requirements
                  </h3>
                  <p>
                    We may disclose your information if required to do so by law
                    or in response to valid requests by public authorities,
                    including to meet national security or law enforcement
                    requirements.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Business Transfers
                  </h3>
                  <p>
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that
                    transaction.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                5. Data Security
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p>These measures include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure socket layer (SSL) technology</li>
                  <li>Regular security assessments and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure. While we strive to protect
                  your information, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience and analyze website traffic. Cookies
                  are small text files stored on your device.
                </p>

                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">
                    Types of Cookies We Use
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Essential Cookies:</strong> Necessary for website
                      functionality
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> Help us understand
                      how visitors use our site
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> Remember your
                      preferences
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Used to deliver
                      relevant advertisements
                    </li>
                  </ul>
                </div>

                <p>
                  You can control cookie settings through your browser. However,
                  disabling cookies may affect website functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                7. Your Rights and Choices
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal
                    information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information (subject to legal obligations)
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing
                    communications at any time
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request transfer of your
                    data to another service
                  </li>
                  <li>
                    <strong>Object:</strong> Object to processing of your
                    personal information
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:hello@tosifarms.com"
                    className="text-amber-700 hover:text-amber-600"
                  >
                    hello@tosifarms.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                8. Data Retention
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law. When we
                no longer need your information, we will securely delete or
                anonymize it.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us so
                we can delete it.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                10. Third-Party Links
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to review their privacy policies before
                providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-stone-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any significant changes by posting the new Privacy Policy
                on this page and updating the &quot;Last updated&quot; date.
                Your continued use of our services after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-2xl text-stone-800 mb-4">
                12. Contact Us
              </h2>
              <div className="text-stone-600 leading-relaxed">
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us:
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
                read and understand this Privacy Policy and agree to the
                collection, use, and disclosure of your information as
                described.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/terms"
              className="text-center px-6 py-3 bg-white border border-amber-200/60 rounded-full text-amber-700 font-semibold hover:bg-amber-50 transition-colors"
            >
              View Terms & Conditions
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
