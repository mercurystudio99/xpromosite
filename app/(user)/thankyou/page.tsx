"use client";
import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import { useEffect, useState } from "react";

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export default function ThankYou() {
  // 30 minutes in seconds
  const [seconds, setSeconds] = useState(30 * 60);

  useEffect(() => {
    setSeconds(30 * 60); // Reset timer on mount
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 30 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerDisplay = `${pad(minutes)}:${pad(secs)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 max-w-7xl mx-auto">
        <div className="max-w-[1280px] mx-auto w-full">
          <BreadCrumbCustom
            currentPage={"THANK YOU"}
            previousPages={[{ name: "HOME", url: "/" }]}
          />
        </div>
        <div className="max-w-[1280px] w-[90%] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-newprimary mt-5 mb-12">
            <span role="img" aria-label="party">🎉</span> Tick Tock — You'll Hear from Us Soon! <span role="img" aria-label="party">🎉</span>
          </h1>
          <div className="flex flex-col items-center justify-center mb-10">
            <span className="text-[80px] md:text-[120px] font-extrabold text-newprimary leading-none">
              {timerDisplay}
            </span>
          </div>
          <div className="w-full space-y-6 text-center md:text-left mx-auto text-newprimary font-normal">
            <p className="text-center md:text-left">
              Thanks for your enquiry — we've received your request and one of our branding experts will be in touch within 30 minutes!
            </p>
            <p className="text-center md:text-left">
              We're currently reviewing the details (quantities, branding method, and any special requirements) to prepare an accurate quote tailored to your needs.
            </p>
            <div className="text-center md:text-left">
              <span className="font-bold text-base md:text-lg">⚡ Is your order urgent?</span><br />
              <span>
                If you need your products delivered in less than 15 days, please call us directly on 02 8014 3214 so we can prioritise your request and fast-track the process.
              </span>
            </div>
            <div className="text-center md:text-left">
              <span>In the meantime, feel free to:</span>
              <ul className="list-none mt-2 space-y-1">
                <li>- Browse more promotional products</li>
                <li>
                  - Contact us at
                  <a href="mailto:info@xpromo.com.au" className="font-bold underline ml-1">info@xpromo.com.au</a>
                </li>
                <li>
                  - Call <a href="tel:0280143214" className="font-bold underline ml-1">02 8014 3214</a> for general enquiries
                </li>
              </ul>
            </div>
            <p className="text-center md:text-left mt-4">
              We look forward to helping your brand stand out!
            </p>
            <p className="font-bold text-center md:text-left mt-8">— The XPromo Team</p>
          </div>
        </div>
      </section>
    </div>
  );
} 