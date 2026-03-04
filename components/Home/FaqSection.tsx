"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of products do you offer?",
    answer:
      "We offer a wide range of promotional products including apparel, accessories, drinkware, office supplies, eco-friendly items, and custom merchandise. Our catalog includes everything from t-shirts and caps to premium corporate gifts.",
  },
  {
    question: "How do I place an order?",
    answer:
      "You can place an order through our website by selecting your desired products, customizing them with your design, and proceeding to checkout. For large or custom orders, you can also contact our sales team directly.",
  },
  {
    question: "Can I customize the products with my logo or design?",
    answer:
      "Yes! Most of our products can be customized with your logo, design, or message. We offer various printing and decoration methods including embroidery, screen printing, digital printing, and more.",
  },
  {
    question: "Is there a minimum order quantity (MOQ)?",
    answer:
      "Minimum order quantities vary by product. Most items have an MOQ of 25-50 pieces, but some products may have lower or higher minimums. Contact us for specific product MOQs.",
  },
  {
    question: "How long does it take to receive my order?",
    answer:
      "Standard production time is 10-15 business days after artwork approval. Rush services are available for many items. Shipping time varies by location and chosen shipping method.",
  },
  {
    question: "Can I see a sample before placing a large order?",
    answer:
      "Yes, we offer sample orders for most products. Sample costs and availability vary by item. Contact our team to request a sample of your desired product.",
  },
  {
    question: "How do I submit my logo or artwork?",
    answer:
      "You can upload your artwork directly through our website during the ordering process. We accept most common file formats (AI, EPS, PDF, PSD, JPG, PNG). Vector files are preferred for best results.",
  },
  {
    question: "Can you help me design my logo or artwork?",
    answer:
      "Yes, our in-house design team can help create or modify artwork for your products. Design services may incur additional fees. Contact us to discuss your design needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, bank transfers, and purchase orders (for qualified businesses). Payment terms may be available for established business accounts.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. International shipping rates and delivery times vary by location. Contact us for specific shipping quotes to your country.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We stand behind our products and offer returns on defective items. Custom products cannot be returned unless defective. Contact us within 14 days of receipt for return authorization.",
  },
  {
    question: "How can I get in touch with your team?",
    answer:
      "You can reach us through our contact form, email, phone, or live chat during business hours. Our customer service team is available Monday-Friday, 9am-5pm.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 italic">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
