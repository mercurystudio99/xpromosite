import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20  max-w-7xl mx-auto">
        <BreadCrumbCustom
          currentPage={"FAQ"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0f172a] my-12">
          FAQ
        </h1>

        <div className="space-y-8">
          <div>
            <p className="font-semibold">
              Why Should I Choose Xpromo for My Branding Needs?
            </p>
            <p className="mt-1">
              Xpromo is an Australian company that specializes in sustainable
              promotional products. We are committed to offering high- quality,
              eco-friendly merchandise that reflects your brand values while
              minimizing environmental impact. With competitive pricing and
              exceptional customer service, we&quot;re your one-stop shop for
              all promotional needs.
            </p>
          </div>

          <div>
            <p className="font-semibold">How Do I Place an Order?</p>
            <p className="mt-1">Ordering from Xpromo is simple! You can:</p>
            <p className="mt-2">
              Submit a request for a quote on our website.
              <br />
              Email or call us with your order details.
              <br />
              Provide information regarding product selection, branding
              requirements, and delivery address.
              <br />
              Once your request is received, we&quot;ll send an order
              confirmation and artwork proof for approval before production
              begins.
            </p>
          </div>

          <div>
            <p className="font-semibold">What Are Your Delivery Timeframes?</p>
            <p className="mt-1">
              Yes! We offer express production and shipping for select items.
              Depending on the product and decoration method, we can deliver
              within 24 to 72 hours. If you&quot;re on a tight deadline, let us
              know, and we&quot;ll find the fastest solution for you.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What File Type Do You Require for My Logo?
            </p>
            <p className="mt-1">
              For the best print quality, we need vector files (AI, EPS, or PDF
              with outlined text). These formats ensure sharp, professional
              results at any size. If you only have raster images, our design
              team can assist in preparing your artwork.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can You Match My Brand Colours Exactly?
            </p>
            <p className="mt-1">
              We use the Pantone Matching System (PMS) to ensure your branding
              stays consistent. Keep in mind that slight variations may occur
              depending on the product material and printing method.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              How Long Does Artwork Approval Take?
            </p>
            <p className="mt-1">
              Once we receive your artwork file, we&quot;ll create a proof
              within 24 to 48 hours for you to review. After you approve the
              design, we can begin production.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Do You Run Regular Special Promotions?
            </p>
            <p className="mt-1">
              Yes! We frequently run seasonal promotions, bulk order discounts,
              and exclusive deals. Subscribe to our newsletter or check our
              website for current offers.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What Is the Average Production Time?
            </p>
            <p className="mt-1">
              Production times vary depending on the product and branding
              method:
            </p>
            <p className="mt-2">
              Standard Orders: 7-14 business days after artwork approval.
              <br />
              Rush Orders: Available in as little as 24-72 hours for select
              items.
              <br />
              Custom-made products may require 4-6 weeks, depending on
              complexity and volume.
              <br />
              If you need your items by a specific date, let us know in advance
              so we can plan accordingly.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can You Match a Competitor&quot;s Price?
            </p>
            <p className="mt-1">
              Yes! If you find the same product at a lower price from another
              Australian supplier, we&quot;ll match or beat their quote. Send us
              the details, and we&quot;ll review it for you.
            </p>
          </div>

          <div>
            <p className="font-semibold">Do You Ship Internationally?</p>
            <p className="mt-1">
              While we primarily serve customers across Australia, we can
              arrange international shipping upon request. Contact us for a
              custom shipping quote based on your location.
            </p>
          </div>

          <div>
            <p className="font-semibold">What Payment Methods Do You Accept?</p>
            <p className="mt-1">We offer several payment options, including:</p>
            <p className="mt-2">
              Credit Cards (VISA, MasterCard, AMEX)
              <br />
              Direct Bank Transfers
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Do Credit Card Transactions Have Additional Fees?
            </p>
            <p className="mt-1">
              Yes, payments made via credit card will incur a processing
              surcharge:
            </p>
            <p className="mt-2">
              VISA/MasterCard: 1.75%
              <br />
              AMEX: 1.95%
              <br />
              To avoid extra charges, you may opt for bank transfer.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What Is a Set-Up Fee? Why Do I Have to Pay It Again for Reorders?
            </p>
            <p className="mt-1">
              A set-up fee covers the cost of preparing the equipment and
              materials to print or engrave your logo. It&quot;s a one-time
              charge per new design. For repeat orders within six months, a
              reduced set-up fee applies, or we retain your branding details.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Do You Offer Environmentally Friendly Promotional Products?
            </p>
            <p className="mt-1">
              Yes! We have an extensive range of eco-friendly products,
              including:
            </p>
            <p className="mt-2">
              Reusable drinkware and tote bags
              <br />
              Organic cotton and bamboo apparel
              <br />
              Recycled and biodegradable materials
              <br />
              We&quot;re committed to reducing waste and offering responsible
              branding solutions.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Can I Get a Sample Before Placing a Large Order?
            </p>
            <p className="mt-1">
              Yes! We offer product samples so you can check quality before
              committing to a bulk order. Some samples are free, while others
              may require a nominal fee that can be credited toward your final
              order.
            </p>
          </div>

          <div>
            <p className="font-semibold">Do You Offer Custom Packaging?</p>
            <p className="mt-1">
              Yes! We provide standard packaging and customized boxes to enhance
              the presentation of your promotional items. Let us know if you
              have any specific packaging requirements.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What Happens If My Order Is Damaged or Damaged?
            </p>
            <p className="mt-1">
              In the rare event that your order is received damaged or incorrect
              products, please contact us within 7 days of delivery. We&quot;ll
              work with you to resolve the issue quickly.
            </p>
          </div>

          <div>
            <p className="font-semibold">Still Have Questions?</p>
            <p className="mt-1">
              Our team is here to help! Reach out via phone or email for any
              additional inquiries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
