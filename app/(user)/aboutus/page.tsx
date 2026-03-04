import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { SquareCheck } from "lucide-react";
export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20  max-w-7xl mx-auto">
        <div className="max-w-[1280px] mx-auto w-full px-4">
          <BreadCrumbCustom
            currentPage={"ABOUT US"}
            previousPages={[{ name: "HOME", url: "/" }]}
          />
        </div>
        <div className="max-w-[1280px] w-[90%] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-newprimary mt-5 mb-12">
            ABOUT US
          </h1>

          {/* New About Us Hero Section (moved below heading, no duplicate heading, font size matches paragraph) */}
          <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 md:py-12">
            {/* Image Left */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src="images/about_us.png" 
                alt="About Xpromo Team" 
                className="rounded-lg object-cover w-full max-w-md md:max-w-full h-64 md:h-80" 
              />
            </div>
            {/* Text Right */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="max-w-[90%] mx-auto">
                <p className="text-newprimary mb-4 text-left">
                  We're changing the promo game with a <span className="font-bold">transparent</span>, <span className="font-bold">flexible</span>, and <span className="font-bold">lightning-fast approach.</span>
                </p>
                <p className="text-newprimary text-left">
                  We're <span className="font-bold">Xpromo</span> — your Australian partner in branded merchandise that gets results. Whether it's fast access to local stock or cost-effective factory-direct solutions, we're here to help you promote smarter, not harder
                </p>
                <div className="mt-8 flex justify-center">
                  <a href="/contact" className="bg-[#07182d] text-white rounded-full px-8 py-1 text-xl font-normal hover:bg-[#122a4d] transition-colors">
                    Contact the Xpromo Team
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Why Xpromo Section (90% width, matching Sustainable & Ethical Approach style) */}
          <section className="w-[90%] mx-auto mt-12 mb-16">
            <h2 className="text-2xl font-bold text-newprimary mb-8 text-left">Why Xpromo?</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <span className="mr-2 mt-1"><SquareCheck className="h-5 w-5 text-newprimary flex-shrink-0" /></span>
                <div>
                  <span className="font-bold text-newprimary">Quick Response Times</span>
                  <div className="text-newprimary">We're fast. Expect replies within 30 minutes—because your time matters.</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1"><SquareCheck className="h-5 w-5 text-newprimary flex-shrink-0" /></span>
                <div>
                  <span className="font-bold text-newprimary">Flexible Fulfillment</span>
                  <div className="text-newprimary">Need it now? We offer local stock for quick turnaround.<br/>Planning ahead? Go factory-direct for bulk orders and custom builds.</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1"><SquareCheck className="h-5 w-5 text-newprimary flex-shrink-0" /></span>
                <div>
                  <span className="font-bold text-newprimary">Transparent Process</span>
                  <div className="text-newprimary">Clear timelines, upfront costs, and honest service. No surprises—just solid results.</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1"><SquareCheck className="h-5 w-5 text-newprimary flex-shrink-0" /></span>
                <div>
                  <span className="font-bold text-newprimary">Products That Perform</span>
                  <div className="text-newprimary">From event giveaways to premium client gifts, we source quality items that represent your brand with impact.</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <a href="/allproducts" className="bg-[#07182d] text-white rounded-full px-8 py-1 text-xl font-normal hover:bg-[#122a4d] transition-colors">
                Get a Quote Today
              </a>
            </div>
          </section>

          <div className="w-full space-y-8">
            {/* Introductory paragraph removed as requested */}
          </div>
        </div>
      </section>
    </div>
  );
}
