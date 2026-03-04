import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import Image from "next/image";
export default function DecorationOptionPage() {
  return (
    <div className=" max-w-7xl mx-auto  min-h-screen 0">
      <section className="py-20  w-full   ">
        <BreadCrumbCustom
          currentPage={"DECORATION OPTIONS"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-newprimary my-12">
          DECORATION OPTIONS
        </h1>
        <div className="space-y-8 ">
          <div>
            <p className="font-semibold">1. Screen Printing (Silk Screening)</p>
            <p className="">
              Best for: Apparel (t-shirts, hoodies), tote bags, and flat
              surfaces.
              <br />
              How it works: Ink is pushed through a mesh screen onto the
              product, one color at a time. Each color requires a separate
              screen.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Cost-effective for bulk orders</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Vibrant, long-lasting prints</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works well on fabric and hard surfaces</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />

                <p>Limited to simple designs with solid colors</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Not ideal for small or intricate details</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">
              2. Digital Transfer Printing (DTG & Direct to Garment - DTG)
            </p>
            <p className="">
              Best for: T-shirts, hoodies, promotional items, and hard surfaces.
              <br />
              How it works: Uses inkjet technology to print full-color images
              directly onto fabric or surfaces.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Full-color, high-resolution prints</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>No setup cost for multiple colors</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Great for complex designs and photographs</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works best on 100% cotton fabric (for DTG)</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Can be more expensive for large runs</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">3. Embroidery</p>
            <p className="">
              Best for: Polo shirts, caps, jackets, bags, and uniforms.
              <br />
              How it works: A machine stitches the design onto fabric using
              colored threads.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Premium, high-end look</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Extremely durable and long-lasting</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Great for logos and simple designs</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Limited color gradients and fine details</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>More expensive than printing methods</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">
              4. Heat Transfer (Vinyl & Digital Transfers)
            </p>
            <p className="">
              Best for: T-shirts, sportswear, promotional items, and hats.
              <br />
              How it works: A design is printed on a special transfer material,
              then applied to the product using heat and pressure.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Great for small, detailed designs</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works for vibrant colors and gradients</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Suitable well for short-run or custom orders</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Less durable than screen printing or embroidery</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>
                  Not ideal for bulk orders due to time-consuming application
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">5. Sublimation Printing</p>
            <p className="">
              Best for: Polyester garments and promotional items with a white or
              light-colored base.
              <br />
              How it works: Heat converts ink into a gas, which then fuses into
              the material, creating a permanent, full-color design.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Extremely durable (doesn&apos;t fade, crack, or peel)</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>High-quality, vibrant colors</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Ideal for full-color prints and photographic images</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Only works on polyester or polymer-coated surfaces</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Requires light-colored backgrounds for best results</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">6. Pad Printing</p>
            <p className="">
              Best for: Pens, mugs, keychains, and irregularly shaped items.
              <br />
              How it works: A silicone pad picks up the ink from an etched plate
              and transfers it onto the product.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works on curved and uneven surfaces</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Can print fine details and small text</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Great for plastic, metal, and glass products</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Limited to one or a few colors per print</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Small print area compared to other methods</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">7. Debossing & Embossing</p>
            <p className="">
              Best for: Leather products, notebooks, and corporate gifts.
              <br />
              How it works: A metal die is pressed into the material to create a
              raised (embossed) or indented (debossed) design.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Elegant, sophisticated look</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Long-lasting and subtle branding</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>No ink or color limitations</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>
                  Limited to certain materials (leather, faux leather, thick
                  paper)
                </p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Higher setup costs due to custom die creation</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">8. Laser Engraving</p>
            <p className="">
              Best for: Metal, wood, glass, and leather items like pens,
              drinkware, and awards.
              <br />
              How it works: A laser beam removes a thin layer of the material to
              create a permanent design.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Permanent, high-end finish</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Precise and highly detailed</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works well on a wide range of materials</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>
                  No color options—only the material&apos;s natural finish is
                  revealed
                </p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Not suitable for soft or flexible surfaces</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">9. UV Printing</p>
            <p className="">
              Best for: Hard surfaces like metal, plastic, glass, and wood.
              <br />
              How it works: Ultraviolet (UV) light cures the ink immediately
              after printing, creating a durable, high-resolution image.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Full-color, photo-quality prints</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Scratch-resistant and long-lasting</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works on virtually any hard surface</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>More expensive than pad printing or screen printing</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Not ideal for flat or curved surfaces</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">10. Foil Stamping</p>
            <p className="">
              Best for: Luxury packaging, stationery, and high-end promotional
              products.
              <br />
              How it works: A heated die press applies a metallic foil (gold,
              silver, etc.) onto the surface, creating a shiny, embossed design.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Luxurious, high-end appearance</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Durable and resistant to fading</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Works well on paper, leather, and packaging</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Limited to one color per stamp</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Higher production costs</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold">
              11. Hydrographic Printing (Water Transfer Printing)
            </p>
            <p className="">
              Best for: 3D objects like helmets, car parts, and promotional
              items with complex shapes.
              <br />
              How it works: A printed film is floated on water and transferred
              onto an object through immersion.
              <br />
              Pros:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Can cover entire surfaces, including curved areas</p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>
                  Excellent for complex patterns like camouflage or carbon fiber
                </p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/check.png"}
                  height={100}
                  width={100}
                  className="h-3 w-auto mr-2"
                  alt="check"
                />
                <p>Highly durable results</p>
              </div>
            </div>
            <p className="mt-2">Cons:</p>
            <div className="mt-1 space-y-1">
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>
                  More expensive and time-consuming than other printing methods
                </p>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/cross.png"}
                  height={100}
                  width={100}
                  className="h-4 w-4 mr-2"
                  alt="check"
                />
                <p>Requires a protective coating for durability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
