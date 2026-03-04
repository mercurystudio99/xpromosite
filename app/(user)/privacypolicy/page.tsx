"use client";

import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 max-w-7xl mx-auto">
        <div className="max-w-[1280px] mx-auto w-full px-4">
          <BreadCrumbCustom
            currentPage={"PRIVACY POLICY"}
            previousPages={[{ name: "HOME", url: "/" }]}
          />
        </div>
        <div className="max-w-[1280px] w-[90%] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-newprimary mt-5 mb-12">
            PRIVACY POLICY
          </h1>
          <div className="w-full space-y-8">
            <p className="text-newprimary text-left">
              <span className="font-bold">Last Updated: 19/05/2025</span>
            </p>
            <p className="text-newprimary text-left">
              At XPromo, your privacy matters. As a trusted provider of custom promotional products and branded merchandise, we are committed to protecting the personal information you share with us when engaging through our website, quotes, orders, or support. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information in line with Australian privacy regulations.
            </p>
            <p className="text-newprimary text-left">
              By using our services or accessing https://www.xpromo.com.au, you agree to the practices described below.
            </p>
            <div className="text-newprimary text-left space-y-6">
              <div>
                <span className="font-bold">1. Our Commitment to Your Privacy</span>
                <p>
                  We respect your right to privacy and transparency. Any information collected is used to help us provide an exceptional experience—from quoting and fulfilment to customer care. We handle your data responsibly, in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).
                </p>
              </div>
              <div>
                <span className="font-bold">2. What We Collect</span>
                <p>We may collect personal and technical data through direct interactions or automatically via our website. This may include:</p>
                <ul className="list-disc ml-6">
                  <li>Full name and company name</li>
                  <li>Email address, phone number, delivery/billing addresses</li>
                  <li>Product preferences and quote/order details</li>
                  <li>Uploaded logos, artwork, or instructions</li>
                  <li>Browser, device type, and operating system</li>
                  <li>Pages visited, time spent, and referring URLs</li>
                  <li>IP address and geographic location</li>
                  <li>Data from cookies and analytics tools</li>
                </ul>
              </div>
              <div>
                <span className="font-bold">3. How We Use Your Information</span>
                <p>We collect your data for the following purposes:</p>
                <ul className="list-disc ml-6">
                  <li>To Process Orders & Quotes: Creating accurate quotes, managing production, and delivering branded goods</li>
                  <li>To Communicate: Responding to enquiries, providing order updates, and offering support</li>
                  <li>To Improve Website Experience: Enhancing site functionality and tailoring content through analytics</li>
                  <li>To Send Marketing Communications: With your consent, we may share product updates, offers, and newsletters (opt-out available anytime)</li>
                  <li>To Fulfil Legal & Operational Requirements: Meeting tax, audit, and regulatory obligations</li>
                </ul>
                <p>We will never use your information for purposes unrelated to your original intent without your explicit consent.</p>
              </div>
              <div>
                <span className="font-bold">4. Sharing of Information</span>
                <p>We may share your information with trusted partners when necessary to fulfil your request or support our operations. These include:</p>
                <ul className="list-disc ml-6">
                  <li>Couriers & Logistics Providers for order delivery</li>
                  <li>Decoration Partners & Product Suppliers to fulfil custom branding</li>
                  <li>Payment Gateways to process transactions securely</li>
                  <li>IT Service Providers for hosting, analytics, and support</li>
                </ul>
                <p>All third-party providers are required to adhere to privacy and data security standards. We do not sell your data to third parties.</p>
                <p>We may also share your information to:</p>
                <ul className="list-disc ml-6">
                  <li>Comply with legal requirements</li>
                  <li>Prevent fraud or misuse</li>
                  <li>Protect our website and business operations</li>
                </ul>
              </div>
              <div>
                <span className="font-bold">5. Cookies & Tracking Technologies</span>
                <p>We use cookies and similar technologies to provide a smoother, more personalised experience on our site. These tools help us remember your preferences, analyse site traffic, and optimise performance.</p>
                <p>You may choose to disable cookies in your browser settings, although this may affect website functionality.</p>
              </div>
              <div>
                <span className="font-bold">6. Your Rights & Choices</span>
                <p>You have the right to access, correct, or delete your personal information at any time—subject to legal retention requirements.</p>
                <br />
                <p>To make a request, contact us via:</p>
                <br />
                <a href="mailto:info@xpromo.com.au" className="font-bold underline mt-2 block">info@xpromo.com.au</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 