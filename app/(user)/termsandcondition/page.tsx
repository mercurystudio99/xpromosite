import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";

export default function TermsAndConditions() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="py-12 md:py-16 lg:py-20  max-w-7xl mx-auto">
        <BreadCrumbCustom
          currentPage={"TERMS & CONDITIONS"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12 mt-5">
          TERMS & CONDITIONS
        </h1>

        <div className="space-y-8  mx-auto">
          <div>
            <p className="font-semibold">1. Agreement to Terms</p>
            <p className="">
              By making a purchase from Xpromo (&quot;Seller&quot;), the
              customer (&quot;Buyer&quot;) acknowledges and agrees to abide by
              these Terms and Conditions. These terms govern all present and
              future transactions. Xpromo reserves the right to amend these
              terms as necessary.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              2. Order Submission and Communication
            </p>
            <p className="">
              To ensure accuracy and avoid miscommunication, all purchase orders
              must be submitted in writing, preferably via email. This allows
              for proper documentation of the customer&apos;s requirements and
              expectations.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              3. Payment Terms and Transaction Fees
            </p>
            <p className="">
              Full payment must be received before production unless otherwise
              agreed in writing. Payments made via credit card are subject to a
              1.75% transaction fee. Visa, Mastercard, and American Express.
              Customers may choose direct bank transfers as a fee-free payment
              alternative.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              4. Ownership and Responsibility for Goods
            </p>
            <p className="">
              Until payment has been received in full, all products remain the
              property of Xpromo. Responsibility for the goods transfers to the
              customer once the order has been dispatched.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              5. Product Availability and Variability
            </p>
            <p className="mt-2">
              Stock Status: Product availability is subject to change, and
              certain items may become unavailable or discontinued.
            </p>

            <p className="mt-2">
              Color Accuracy: While every effort is made to achieve precise PMS
              color matching, minor variations may occur due to material and
              printing differences.
            </p>

            <p className="mt-2">
              Quantity Tolerance: Due to production methods, delivered
              quantities may fluctuate by ±5%, with final invoices reflecting
              the actual quantity supplied.
            </p>

            <p className="mt-2">
              Urgent Orders: Orders requiring expedited processing outside of
              standard timeframes may be subject to additional charges.
            </p>

            <p className="mt-2">
              Use of Provided Artwork: Customers grant Xpromo permission to
              utilize submitted artwork and files for production purposes.
            </p>
          </div>

          <div>
            <p className="font-semibold">6. Artwork Submission and Approval</p>
            <p className="">
              For optimal results, customers must provide artwork in the correct
              format, following our specified guidelines before proceeding to
              production. Xpromo will provide an artwork proof, which the
              customer must review and approve. Once approved, changes may not
              be possible.
            </p>
          </div>

          <div>
            <p className="font-semibold">7. Shipping and Handling Fees</p>
            <p className="">
              Freight and handling charges apply to all orders and will be
              included in the final invoice. Shipping costs vary based on order
              size, weight, and delivery location, and customers are responsible
              for covering these expenses.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              8. Late Payments and Debt Collection
            </p>
            <p className="">
              Invoices not paid by the due date may incur late fees. If payment
              remains outstanding, the debt may be assigned to a collection
              agency, with all related legal and recovery costs borne by the
              customer.
            </p>
          </div>

          <div>
            <p className="font-semibold">9. Amendments and Cancellations</p>
            <p className="">
              Changes or cancellations to orders are subject to the following
              conditions:
            </p>

            <p className="mt-2">
              Orders may only be canceled if agreed upon, and a cancellation fee
              may apply if production has already started.
            </p>

            <p className="mt-2">
              Indent or custom orders canceled more than 48 hours after
              confirmation may result in additional charges.
            </p>

            <p className="mt-2">
              Modifications to an order after approval may require extra payment
              to cover incurred costs.
            </p>
          </div>

          <div>
            <p className="font-semibold">10. Returns and Faulty Goods</p>
            <p className="">
              If goods are defective, customers must notify Xpromo in writing
              within seven days of receiving the order. Items must be returned
              in their original condition at the customer&apos;s expense. Xpromo
              will inspect returned goods and determine if a replacement or
              refund is warranted.
            </p>
          </div>

          <div>
            <p className="font-semibold">11. Legal Liability and Limitations</p>
            <p className="">
              Xpromo is not responsible for indirect losses, damages, or delays
              caused by unforeseen circumstances, including supplier shortages,
              shipping issues, or natural disasters. Our liability is limited to
              replacing faulty goods or providing a refund as per Australian
              consumer laws.
            </p>
          </div>

          <div>
            <p className="font-semibold">12. Warranty Coverage</p>
            <p className="">
              Unless explicitly stated, all implied warranties are excluded to
              the maximum extent permitted by law. However, any manufacturer
              warranties available will be passed on to the customer.
            </p>
          </div>

          <div>
            <p className="font-semibold">13. Privacy and Confidentiality</p>
            <p className="mt-2">
              Xpromo handles customer information in compliance with Australian
              privacy regulations.
            </p>

            <p className="mt-2">
              Customer data will not be shared with third parties without
              consent, except as required by law.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              14. Governing Law and Dispute Resolution
            </p>
            <p className="">
              These Terms and Conditions are governed by Australian law. Any
              legal disputes arising under these terms shall be settled in
              Australian courts.
            </p>
          </div>

          <div>
            <p className="font-semibold">15. Policy Modifications</p>
            <p className="">
              Xpromo reserves the right to revise these terms at any time.
              Continued use of our services and purchases will be considered
              acceptance of the updated terms.
            </p>

            <p className="mt-2">
              For any questions, please contact us at info@xpromo.com.au
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
