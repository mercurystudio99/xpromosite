import {
  Check,
  Leaf,
  Recycle,
  Users,
  Globe,
  BarChart,
  SquareCheck,
  Earth,
  Sprout,
  Wrench,
  Heart,
  RefreshCcw,
  Box,
} from "lucide-react";
import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-16 lg:py-20  max-w-7xl mx-auto">
        <BreadCrumbCustom
          currentPage={"SUSTAINABILITY POLICY"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0f172a] my-12">
          SUSTAINABILITY POLICY
        </h1>

        <div className="space-y-8 ">
          <div>
            <p className="font-semibold text-base">
              Xpromo Sustainability Statement & Policy
            </p>
            <p className="">
              At Xpromo, sustainability isn&apos;t just a buzzword—it&apos;s at
              the heart of everything we do. We are committed to transforming
              the promotional products industry through sustainable, ethical
              sourcing and environmentally conscious production methods. Our
              mission is to provide high-quality, long-lasting merchandise that
              delivers brand impact while minimizing environmental harm.
            </p>
          </div>

          <div>
            <p className="font-semibold text-base">
              Our Commitment to Sustainability
            </p>
            <p className="">
              We recognize that the traditional promotional product industry has
              often contributed to excessive waste, short product lifespans, and
              questionable manufacturing practices. At Xpromo, we are actively
              working to change that by focusing on:
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Sustainable Sourcing - We carefully select suppliers who share
                  our environmental and ethical values, ensuring that our supply
                  chain reflects our commitment to planet and people.
                </p>
              </div>

              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  High-Quality Products - We focus on durable, long-lasting
                  merchandise that customers will keep and use for years,
                  reducing landfill waste from disposable promotional items.
                </p>
              </div>

              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Eco-Friendly Materials - We offer a wide range of products
                  made from recycled, biodegradable, and organic materials,
                  reducing our environmental footprint while still delivering
                  effective branding solutions.
                </p>
              </div>

              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Waste Reduction - We implement efficient, reusable and
                  recyclable products and work with partners who minimize
                  production waste and use responsible disposal practices.
                </p>
              </div>

              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Ethical Manufacturing & Fair Trade Standards - We only
                  collaborate with suppliers who adhere to strict ethical and
                  fair labor practices, ensuring workers are treated with
                  dignity and respect.
                </p>
              </div>

              <div className="flex">
                <p>
                  <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Carbon Footprint Awareness - We continuously seek ways to
                  reduce emissions in our supply chain, from responsible
                  sourcing to efficient transportation and sustainable
                  packaging.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Sustainable Sourcing & Supplier Partnerships
            </p>
            <p className="">
              We believe that true sustainability starts at the source.
              That&apos;s why we carefully vet all our suppliers to ensure they
              meet our strict environmental and ethical standards, including:
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex">
                <p>
                  <Earth className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Eco-Conscious Manufacturing: We work with suppliers who
                  prioritize environmentally friendly production processes,
                  including reduced water consumption, low impact dyes, and
                  renewable energy.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Sprout className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Sustainable Material Selection: Our products feature recycled
                  plastics, organic cotton, bamboo, biobased paper and
                  cardboard, which all help reduce environmental impact.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Wrench className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Longevity-Focused Design: We prioritize durability by
                  selecting products that are built to last, reducing the need
                  for frequent replacements and cutting down on waste.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Users className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Ethical Labor Practices: We ensure our supply partners comply
                  with fair wages, safe working conditions, and internationally
                  recognized labor rights.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Our Sustainable Product Range
            </p>
            <p className="">
              We are proud to offer an expanding range of sustainable
              promotional products, including:
            </p>

            <div className="mt-3 space-y-2">
              <p className="">
                Reusable Drinkware: Stainless steel, bamboo, and glass
                alternatives to disposable plastic cups and bottles.
              </p>

              <p className="">
                Eco-Friendly Apparel: Organic cotton, recycled polyester, and
                hemp clothing with ethical manufacturing practices.
              </p>

              <p className="">
                Sustainable Bags: Tote Bags & Backpacks Made from organic
                cotton, jute, and rPET (recycled plastic bottles).
              </p>

              <p className="">
                Biodegradable & Compostable Products: Items that break down
                naturally without harming the environment.
              </p>

              <p className="">
                Recycled Stationery & Office Supplies: Notebooks, pens, and desk
                accessories made from recycled materials without compromising on
                quality or style.
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Reducing Waste & Promoting Responsible Consumption
            </p>
            <p className="">
              As part of our sustainability mission, we take steps to ensure
              that promotional products are not only environmentally friendly
              but also remain valuable to their recipients:
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex">
                <p>
                  <RefreshCcw className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Encouraging Durability - We emphasize products that replace
                  single-use plastics, such as reusable bags, metal straws, and
                  refillable water bottles.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Box className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Sustainable Packaging - We work with suppliers to provide
                  recyclable, or biodegradable packaging to reduce excess waste.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Wrench className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  End-of-Life Considerations - We educate our clients on proper
                  disposal and recycling options for their promotional items,
                  promoting a circular economy approach.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Ethical Manufacturing & Fair Trade Practices
            </p>
            <p className="">
              We believe that sustainability extends beyond the environment—it
              includes people and communities, too. That&apos;s why we only
              partner with suppliers who:
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex">
                <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                <p>
                  Follow ethical labor laws and provide safe working conditions.
                </p>
              </div>

              <div className="flex">
                <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                <p>Offer fair wages and protect worker rights.</p>
              </div>

              <div className="flex">
                <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                <p>
                  Prohibit child labor, forced labor, and other unfair
                  practices.
                </p>
              </div>

              <div className="flex">
                <SquareCheck className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                <p>
                  Are audited for compliance with global ethical sourcing
                  standards such as BSCI (Business Social Compliance Initiative)
                  and Sedex (Supplier Ethical Data Exchange).
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Carbon Footprint & Supply Chain Transparency
            </p>
            <p className="">
              We are committed to reducing our environmental impact at every
              stage of our supply chain. Our approach includes:
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex">
                <p>
                  <Sprout className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-0" />
                  Carbon Footprint Calculation - Measuring our carbon footprint
                  to identify areas for improvement.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Globe className="h-5 w-5 text-newprimary flex-shrink-0 mr-2 inline-block" />
                  Energy-Efficient Production - Encouraging manufacturers to use
                  solar, wind, and other renewable energy sources.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Recycle className="h-5 w-5 text-newprimary flex-shrink-0 mr-2 inline-block" />
                  Minimizing Waste in Production - Working with suppliers who
                  implement zero waste initiatives and closed-loop manufacturing
                  processes.
                </p>
              </div>

              <div className="flex">
                <p>
                  <Leaf className="h-5 w-5 text-newprimary flex-shrink-0 mr-2 inline-block" />
                  Local & Regional Sourcing - Whenever possible, we source
                  products from Australian or regional suppliers to cut down on
                  carbon emissions from long-distance shipping.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-base">
              Our Future Sustainability Goals
            </p>
            <p className="">
              At Xpromo, sustainability is an ongoing journey. We are committed
              to setting and achieving ambitious environmental goals, including:
            </p>

            <div className="mt-3 ">
              <p>
                Increasing our range of 100% recycled and biodegradable
                products.
              </p>
              <p>
                Expanding partnerships with B Corp-certified and environmentally
                responsible suppliers.
              </p>
              <p>
                Reducing plastic use in packaging and transitioning to 100%
                compostable or recyclable packaging.
              </p>
              <p>
                Creating in-house offset programs to balance our carbon
                footprint.
              </p>
              <p>
                Educating clients on the importance of sustainable promotional
                items and take-back or recycling programs.
              </p>
              <p>Join Us In Making A Difference</p>
              <p>
                We believe that promotional products should add value to brands
                without adding waste to the planet. By choosing Xpromo,
                you&apos;re not just buying merchandise—you&apos;re making a
                conscious decision to support sustainability, ethical business
                practices, and a better future for our environment.
              </p>
              <p className="mt-5">
                If you&apos;re looking to branded merchandise with purpose,
                we&apos;re here to help. Let&apos;s work together to create
                promotional products that inspire change while respecting our
                planet.
              </p>
              <p className="mt-3">
                <Heart className="h-5 w-5 text-newprimary  inline-block mr-2 flex-shrink-" />
                sustainability starts with small choices that lead to big
                impacts. Let&apos;s make them together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
