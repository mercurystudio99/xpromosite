"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";

const blogPosts = {
  "sustainable-promotional-products": {
    title: "The Rise of Sustainable Promotional Products: Why Your Brand Should Go Green",
    date: "10th March 2025",
    image: "/blog/image1.jpg",
    alt: "Sustainable promotional products",
    content: (
      <>
        <p className="text-newprimary mb-4">
          Sustainability is no longer a trend—it&apos;s a necessity. Consumers and businesses alike are becoming more
          environmentally conscious, and companies are expected to reflect these values in their branding strategies. One of
          the best ways to do this is by switching to sustainable promotional products.
        </p>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Why Sustainability Matters in Branding</h3>
        <p className="text-newprimary mb-4">
          A growing number of businesses are making sustainability a core value, and customers are taking notice. According to recent studies:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li>73% of consumers say they would definitely or probably change their consumption habits to reduce their environmental impact.</li>
          <li>87% of consumers have a more positive image of companies that support environmental issues.</li>
          <li>Companies with strong sustainability programs have 4x the performance of those without.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Benefits of Sustainable Promotional Products</h3>
        <p className="text-newprimary mb-2">When you choose eco-friendly promotional items, you're gaining multiple advantages:</p>
        
        <h4 className="text-lg font-semibold text-newprimary mt-4 mb-2">1. Enhanced Brand Image</h4>
        <p className="text-newprimary mb-4">
          Sustainable promotional products communicate your brand's commitment to environmental responsibility. This positive association can strengthen customer loyalty and attract new environmentally conscious consumers.
        </p>
        
        <h4 className="text-lg font-semibold text-newprimary mt-4 mb-2">2. Increased Perceived Value</h4>
        <p className="text-newprimary mb-4">
          Eco-friendly products are often perceived as higher quality and more thoughtfully designed than conventional alternatives. Recipients are more likely to keep and use these items, extending your brand's visibility.
        </p>
        
        <h4 className="text-lg font-semibold text-newprimary mt-4 mb-2">3. Genuine Environmental Impact</h4>
        <p className="text-newprimary mb-4">
          By choosing recycled, biodegradable, or sustainably sourced materials, you're reducing waste, conserving resources, and decreasing your carbon footprint. This creates real positive change beyond marketing benefits.
        </p>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Popular Sustainable Promotional Products</h3>
        <p className="text-newprimary mb-4">Here are some eco-friendly promotional products gaining popularity:</p>
        
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Recycled Paper Products:</span> Notebooks, journals, and business cards made from post-consumer recycled paper.</li>
          <li><span className="font-semibold">Reusable Drinkware:</span> Stainless steel water bottles, bamboo coffee cups, and silicone collapsible cups.</li>
          <li><span className="font-semibold">Organic Cotton Bags:</span> Totes, backpacks, and produce bags made from organic, fair-trade cotton.</li>
          <li><span className="font-semibold">Biodegradable Pens:</span> Writing instruments made from materials like cornstarch, bamboo, or recycled paper.</li>
          <li><span className="font-semibold">Solar-Powered Items:</span> Chargers, calculators, and flashlights that harness renewable energy.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Making the Transition to Sustainable Promotional Products</h3>
        <p className="text-newprimary mb-4">
          Ready to make the switch? Here are some practical steps to incorporate sustainability into your promotional product strategy:
        </p>
        
        <ol className="list-decimal pl-5 mb-4 text-newprimary">
          <li>Audit your current promotional products and identify sustainable alternatives.</li>
          <li>Partner with suppliers who prioritize environmental responsibility.</li>
          <li>Consider the full lifecycle of promotional products before purchasing.</li>
          <li>Communicate your sustainability efforts to your customers.</li>
          <li>Start small if necessary—even incremental changes make a difference.</li>
        </ol>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Conclusion</h3>
        <p className="text-newprimary mb-4">
          Sustainable promotional products represent a win-win opportunity for businesses: they benefit the environment while enhancing your brand's reputation and appeal. By investing in eco-friendly promotional items, you're not just marketing your business—you're demonstrating your commitment to a better future.
        </p>
        <p className="text-newprimary mb-4">
          Ready to explore sustainable promotional product options for your brand? Contact us today to discuss eco-friendly alternatives that align with your marketing goals and environmental values.
        </p>
      </>
    ),
  },
  "choose-right-promotional-product": {
    title: "How to Choose the Right Promotional Product for Your Business",
    date: "9th March 2025",
    image: "/blog/image2.jpg",
    alt: "Hand holding promotional product",
    content: (
      <>
        <p className="text-newprimary mb-4">
          Promotional products are a powerful marketing tool, but choosing the right item can make all the difference in brand awareness and customer engagement. With thousands of options available, how do you decide which product is best for your business?
        </p>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">1. Know Your Audience</h3>
        <p className="text-newprimary mb-4">
          The most effective promotional products are those that resonate with your target market. Consider:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Demographics:</span> Age, gender, occupation, and income level can influence product preferences.</li>
          <li><span className="font-semibold">Psychographics:</span> Interests, values, and lifestyle factors should guide your selection.</li>
          <li><span className="font-semibold">Usage Patterns:</span> Choose items that fit naturally into your audience's daily routines.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">2. Define Your Marketing Objectives</h3>
        <p className="text-newprimary mb-4">
          Different products serve different marketing goals:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Brand Awareness:</span> Highly visible items like apparel, bags, or drinkware.</li>
          <li><span className="font-semibold">Lead Generation:</span> Products that encourage information exchange, like downloadable content paired with physical items.</li>
          <li><span className="font-semibold">Customer Loyalty:</span> Higher-value gifts that demonstrate appreciation, like premium tech accessories or custom gift sets.</li>
          <li><span className="font-semibold">Product Launch:</span> Items that complement or demonstrate your new product or service.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">3. Consider Practicality and Usefulness</h3>
        <p className="text-newprimary mb-4">
          The most effective promotional products are those that recipients will actually use. Items that solve problems or serve a practical purpose have staying power:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li>Desk accessories for office workers</li>
          <li>Tech tools for digital professionals</li>
          <li>Active lifestyle products for health-conscious consumers</li>
          <li>Kitchen items for foodies or home cooks</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">4. Align with Your Brand Identity</h3>
        <p className="text-newprimary mb-4">
          Your promotional products should be a natural extension of your brand:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li>Choose items that reflect your brand's personality—professional, fun, innovative, or eco-conscious.</li>
          <li>Select products in your brand colors or that complement your visual identity.</li>
          <li>Ensure quality standards match your brand's positioning.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">5. Establish a Realistic Budget</h3>
        <p className="text-newprimary mb-4">
          Budget considerations should include:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Cost per item:</span> Balance quality with quantity needs.</li>
          <li><span className="font-semibold">Customization expenses:</span> More colors or complex logos increase costs.</li>
          <li><span className="font-semibold">Shipping and distribution:</span> Factor these into your total budget.</li>
          <li><span className="font-semibold">Value over price:</span> Sometimes spending more on fewer, higher-quality items yields better results.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">6. Consider Distribution Method</h3>
        <p className="text-newprimary mb-4">
          How you'll distribute promotional products affects your selection:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Trade shows:</span> Portable, lightweight items that are easy to transport and distribute.</li>
          <li><span className="font-semibold">Direct mail:</span> Flat, lightweight products to minimize postage costs.</li>
          <li><span className="font-semibold">In-person gifts:</span> More substantial or premium items that make an impression.</li>
          <li><span className="font-semibold">Employee recognition:</span> Personalized, higher-value products.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">7. Think Seasonally and Contextually</h3>
        <p className="text-newprimary mb-4">
          Timing matters when selecting promotional products:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li>Summer promotions might feature outdoor items like coolers or beach towels.</li>
          <li>Winter campaigns could include warm accessories or seasonal desk items.</li>
          <li>Consider industry-specific timing, like fiscal year-end for B2B clients.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Conclusion</h3>
        <p className="text-newprimary mb-4">
          The right promotional product can significantly impact your marketing success. By considering your audience, objectives, brand alignment, and practical factors, you can select items that not only promote your business but also provide genuine value to recipients.
        </p>
        <p className="text-newprimary mb-4">
          Need help finding the perfect promotional products for your business? Contact our team of experts who can guide you through the selection process and help you create a memorable branded experience.
        </p>
      </>
    ),
  },
  "promotional-product-trends-2025": {
    title: "The Top Promotional Product Trends for 2025",
    date: "11th March 2025",
    image: "/blog/image3.jpg",
    alt: "Promotional product trends",
    content: (
      <>
        <p className="text-newprimary mb-4">
          The promotional product industry is constantly evolving, and staying ahead of the trends can give your brand a competitive edge. In 2025, sustainability, innovation, and personalization are leading the way in promotional merchandise.
        </p>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">1. Eco-Friendly & Sustainable Products</h3>
        <p className="text-newprimary mb-4">
          Consumers are demanding greener alternatives, and brands are responding by switching to:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Recycled & Biodegradable Materials:</span> Pens, notebooks, and bags made from reclaimed and compostable materials.</li>
          <li><span className="font-semibold">Reusable Everyday Items:</span> Stainless steel straws, collapsible cups, and eco-conscious packaging.</li>
          <li><span className="font-semibold">Ocean Plastic Products:</span> Items made from recovered ocean plastic are gaining popularity as both functional products and conversation starters.</li>
          <li><span className="font-semibold">Zero-Waste Kits:</span> Bundled products that help recipients reduce their personal environmental footprint.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">2. Tech-Forward Promotional Items</h3>
        <p className="text-newprimary mb-4">
          Technology continues to dominate the promotional product landscape with innovative options:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Wireless Charging Solutions:</span> Branded charging pads, power banks, and multi-device charging stations.</li>
          <li><span className="font-semibold">Smart Home Accessories:</span> Voice assistant compatible products and IoT device accessories.</li>
          <li><span className="font-semibold">Wearable Tech:</span> Fitness trackers, smartwatch accessories, and tech-enhanced apparel.</li>
          <li><span className="font-semibold">Digital Integration:</span> Physical products with QR codes linking to exclusive digital content or experiences.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">3. Health & Wellness Products</h3>
        <p className="text-newprimary mb-4">
          The focus on personal health and wellbeing continues to grow:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Personal Care Kits:</span> Custom branded sanitizer, masks, and wellness accessories.</li>
          <li><span className="font-semibold">Fitness Equipment:</span> Resistance bands, yoga accessories, and workout trackers.</li>
          <li><span className="font-semibold">Mental Health Support:</span> Stress relief items, mindfulness tools, and products promoting work-life balance.</li>
          <li><span className="font-semibold">Immunity Boosters:</span> Vitamin packs, herbal tea kits, and health-focused gift sets.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">4. Hyper-Personalized Merchandise</h3>
        <p className="text-newprimary mb-4">
          One-size-fits-all is being replaced by customized approaches:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">On-demand Personalization:</span> Products customized with recipient's name or preferences at point of distribution.</li>
          <li><span className="font-semibold">Variable Data Printing:</span> Allowing for individualized messaging or designs across product batches.</li>
          <li><span className="font-semibold">AI-Enhanced Selection:</span> Using customer data to match recipients with the most relevant promotional products.</li>
          <li><span className="font-semibold">Co-created Products:</span> Items that recipients can further customize to their preferences.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">5. Remote Work Essentials</h3>
        <p className="text-newprimary mb-4">
          With hybrid work models here to stay, home office products remain essential:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Ergonomic Accessories:</span> Wrist rests, posture correctors, and monitor stands.</li>
          <li><span className="font-semibold">Virtual Meeting Enhancers:</span> Branded lighting, microphones, and webcam covers.</li>
          <li><span className="font-semibold">Productivity Tools:</span> Custom planning systems, digital organization tools with physical components.</li>
          <li><span className="font-semibold">Home/Office Transition Products:</span> Compact, portable items that move easily between work locations.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">6. Experience-Based Promotional Marketing</h3>
        <p className="text-newprimary mb-4">
          Products paired with experiences create lasting impressions:
        </p>
        <ul className="list-disc pl-5 mb-4 text-newprimary">
          <li><span className="font-semibold">Virtual Experience Kits:</span> Physical items paired with online events or classes.</li>
          <li><span className="font-semibold">Subscription-Based Promotions:</span> Regularly delivered branded items that build anticipation and loyalty.</li>
          <li><span className="font-semibold">DIY Kits:</span> Products that recipients assemble or create, building connection through activity.</li>
          <li><span className="font-semibold">Augmented Reality Integration:</span> Products that unlock AR experiences through smartphone apps.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-newprimary mt-6 mb-3">Conclusion</h3>
        <p className="text-newprimary mb-4">
          As we move through 2025, the most successful promotional products will balance innovation with practicality, sustainability with desirability, and brand presence with genuine value. By embracing these trends, your brand can create memorable impressions that resonate with recipients and strengthen customer relationships.
        </p>
        <p className="text-newprimary mb-4">
          Looking to incorporate these trends into your promotional marketing strategy? Contact our team to explore cutting-edge promotional products that align with your brand goals and audience preferences.
        </p>
      </>
    ),
  },
};

const BlogPostPage = () => {
  const params = useParams();
  const id = params.id as keyof typeof blogPosts;
  
  const post = blogPosts[id];
  
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="py-20 max-w-7xl mx-auto px-4">
          <BreadCrumbCustom
            currentPage={"BLOG POST"}
            previousPages={[
              { name: "HOME", url: "/" },
              { name: "BLOG", url: "/blog" }
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-center text-newprimary mt-5 mb-12">
            Blog Post Not Found
          </h1>
          <p className="text-center text-newprimary">
            The blog post you are looking for does not exist. Please return to the <Link href="/blog" className="text-newprimary underline">blog listing</Link>.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 max-w-7xl mx-auto px-4">
        <BreadCrumbCustom
          currentPage={"BLOG POST"}
          previousPages={[
            { name: "HOME", url: "/" },
            { name: "BLOG", url: "/blog" }
          ]}
        />
        
        <article className="mt-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-newprimary mb-4">
              {post.title}
            </h1>
            <p className="text-sm text-graytext font-bold mb-6">
              {post.date}
            </p>
            <div className="w-full max-w-3xl mb-8">
              <Image
                src={post.image}
                alt={post.alt}
                width={900}
                height={500}
                className="object-cover w-full rounded-lg"
              />
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {post.content}
            
            <div className="mt-12 border-t pt-8 border-newprimary">
              <h3 className="text-xl font-semibold text-newprimary mb-4">
                Share this article
              </h3>
              <div className="flex space-x-4">
                <button className="p-2 bg-blue-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 bg-sky-500 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="p-2 bg-blue-800 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="p-2 bg-red-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button className="p-2 bg-gray-700 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.127 22.562l-0.896-0.288 0.896 0.288zM12 1c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09 0.301 2.246 0.464 3.442 0.464 6.627 0 12-4.974 12-11.111s-5.373-11.111-12-11.111zM12.866 15.123l-3.045-3.275-5.945 3.27 6.544-6.931 3.045 3.275 5.945-3.27-6.544 6.931z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-12 border-t pt-8 border-newprimary">
              <Link 
                href="/blog"
                className="inline-flex items-center text-newprimary font-semibold hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog Listing
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default BlogPostPage;