import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-newsecondary text-newprimary py-12 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-1">
            <Image
              className="mb-4"
              src="/xpromo.png"
              height={400}
              width={400}
              alt="Xpromo Logo"
            />
            <p className="text-base mb-4">
              Committed to fostering diversity and inclusion
            </p>
            <p className="text-xl font-bold mb-2">FOLLOW US</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/xpromoau/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#05172d">
                  <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
                </svg>
              </a>
              <a href="https://m.facebook.com/p/Xpromo-61576987985306/?wtsid=rdr_06ZSzvZn8rzlmPAVj&hr=1" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#05172d">
                  <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/107498554" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="#05172d">
                  <path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">COMPANY INFO</h3>
            <ul className="space-y-2 text-base">
              <li><Link href="/aboutus">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/termsandcondition">Terms & Conditions</Link></li>
              <li><Link href="/privacypolicy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-base">
              <li><Link href="/sustainabilitypolicy">Sustainability policy</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/pmscolorcharter">PMS Colour Chart</Link></li>
              <li><Link href="/decorationoption">Decoration Options</Link></li>
            </ul>
          </div>

          {/* Top Categories Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">TOP CATEGORIES</h3>
            <ul className="space-y-2 text-base">
              <li><Link href="/categories/apparel">Promotional Apparel</Link></li>
              <li><Link href="/categories/headwear">Promotional Headwear</Link></li>
              <li><Link href="/categories/bags">Promotional Bags</Link></li>
              <li><Link href="/categories/drinkware">Promotional Drinkware</Link></li>
              <li><Link href="/categories/merch">Promotional Merch</Link></li>
              <li><Link href="/categories/eco-products">Promotional Eco-Products</Link></li>
              <li><Link href="/categories/tech">Promotional Tech Products</Link></li>
              <li><Link href="/categories/office">Promotional Office Products</Link></li>
              <li><Link href="/categories/outdoor">Promotional Outdoor Products</Link></li>
              <li><Link href="/categories/tradeshows">Promotional Tradeshows Products</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">NEWSLETTER</h3>
            <p className="text-base mb-4">
              Subscribe to our newsletter to get the latest updates
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                className="bg-white border-none rounded-full"
              />
            </div>
            <div className="text-base mt-4 font-bold">
              ABN 39 671 474 141
            </div>
          </div>
        </div>

        {/* Bottom Contact Information */}
        <div className="flex flex-col justify-center items-center mt-12 pt-8">
            <div className="flex flex-col items-center gap-4 text-base">
                <a href="mailto:info@xpromo.com.au" className="flex items-center font-bold gap-2">
                    <Mail className="w-6 h-6" />
                    info@xpromo.com.au
                </a>
                <a href="tel:0280143214" className="flex items-center font-bold gap-2">
                    <Phone className="w-6 h-6" />
                    02 8014 3214
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
