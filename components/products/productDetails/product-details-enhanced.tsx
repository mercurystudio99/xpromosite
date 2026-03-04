"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import Image from 'next/image';
import { RelatedProducts } from './RelatedProducts';
import { 
  Zap, 
  Palette, 
  Phone, 
  Star, 
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProductDetailsEnhancedProps {
  product: any;
}

export function ProductDetailsEnhanced({ product }: ProductDetailsEnhancedProps) {
  const [productCount, setProductCount] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [sInstruction, setSInstruction] = useState("");
  const [moqValue, setMoqValue] = useState(10);
  const [selectedTab, setSelectedTab] = useState('specifications');
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rushEnabled, setRushEnabled] = useState(false);
  const [decorationEnabled, setDecorationEnabled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Form states for modals
  const [mockupForm, setMockupForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sampleForm, setSampleForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stickyRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // Destructure product data
  const {
    _id,
    id = _id,
    sku = "",
    name = "Product Name",
    description = "No description available",
    price = 0,
    compareAtPrice,
    stock = 0,
    rating = 0,
    images = [],
    brand = "",
    category = {},
    specifications = "",
    shippingInformation = "",
    moqMin = 10,
    moqMax = 1000,
    colors = [],
    priceTiers = [],
    rushPrice = 0,
    decorationPrice = 0,
    productionTime = 10,
    rushProductionTime = 3,
    contactNumber = "",
    faqs = [],
  } = product || {};

  const effectiveMoqMin = moqMin && moqMax && moqMin < moqMax ? moqMin : 10;
  const effectiveMoqMax = moqMin && moqMax && moqMin < moqMax ? moqMax : 1000;

  // Sticky scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMoqValue(effectiveMoqMin);
  }, [effectiveMoqMin, id]);

  // Calculate delivery date
  const calculateDeliveryDate = () => {
    const days = rushEnabled ? rushProductionTime : productionTime;
    const date = new Date();
    let businessDaysAdded = 0;
    
    while (businessDaysAdded < days) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDaysAdded++;
      }
    }
    
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Calculate price based on quantity and selected tiers
  const calculatePrice = () => {
    let basePrice = price;
    
    // Use price tiers if available
    if (priceTiers && priceTiers.length > 0) {
      const sortedTiers = [...priceTiers].sort((a, b) => b.quantity - a.quantity);
      const tier = sortedTiers.find(t => moqValue >= t.quantity);
      if (tier) basePrice = tier.price;
    }
    
    let totalPrice = basePrice * moqValue;
    
    if (rushEnabled && rushPrice) {
      totalPrice += rushPrice * moqValue;
    }
    
    if (decorationEnabled && decorationPrice) {
      totalPrice += decorationPrice * moqValue;
    }
    
    return totalPrice;
  };

  const handleAddToCart = () => {
    const productData = {
      id,
      sku,
      name,
      description,
      price: calculatePrice() / moqValue,
      compareAtPrice,
      stock,
      rating,
      images,
      category,
      quantity: moqValue,
      specialInstruction: sInstruction,
      rushEnabled,
      decorationEnabled,
      selectedColor: colors[selectedColor]?.name || null,
    };

    dispatch(addToCart(productData));
    toast.success("Added to quote!");
    setSInstruction("");
  };

  const handleMockupSubmit = async () => {
    if (!mockupForm.name || !mockupForm.email) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...mockupForm,
          message: `Visual Mock-up Request for ${name} (SKU: ${sku})\n\n${mockupForm.message}`,
          source: "Visual Mock-up Request",
        }),
      });

      if (response.ok) {
        toast.success("Mock-up request sent successfully!");
        setMockupForm({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSampleSubmit = async () => {
    if (!sampleForm.name || !sampleForm.email || !sampleForm.address) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sampleForm,
          message: `Sample Request for ${name} (SKU: ${sku})\nShipping Address: ${sampleForm.address}`,
          source: "Sample Request",
        }),
      });

      if (response.ok) {
        toast.success("Sample request sent successfully!");
        setSampleForm({ name: "", email: "", phone: "", address: "" });
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle color selection and image change
  const handleColorSelect = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    // If color has an associated image, switch to it
    if (colors[colorIndex]?.imageUrl) {
      const imageIndex = images.findIndex((img: any) => 
        (typeof img === 'string' ? img : img.url) === colors[colorIndex].imageUrl
      );
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  const currentImages = images && images.length > 0 
    ? images.map((img: any) => typeof img === 'string' ? img : img.url)
    : ["/placeholder.svg"];

  return (
    <>
      <div ref={stickyRef} className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE - Product Image (Sticky) */}
          <div className={`${isSticky ? 'md:sticky md:top-4 md:h-fit' : ''}`}>
            {/* Main Image with Zoom */}
            <div 
              className="relative w-full bg-white p-4 rounded-lg cursor-zoom-in mb-4"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={currentImages[selectedImageIndex] || "/placeholder.svg"}
                alt={name}
                width={800}
                height={800}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {currentImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 flex-shrink-0 border-2 rounded ${
                    selectedImageIndex === index ? 'border-[#FF6B03]' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Product Info (Sticky) */}
          <div className={`${isSticky ? 'md:sticky md:top-4 md:h-fit md:overflow-y-auto md:max-h-screen' : ''}`}>
            <div className="space-y-4">
              {/* Product Name */}
              <h1 className="text-3xl font-bold">{name}</h1>

              {/* Brand, Icons, Price Row */}
              <div className="flex items-center gap-4 flex-wrap">
                {brand && (
                  <a 
                    href={`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#FF6B03] hover:scale-110 transition-transform font-semibold flex items-center gap-1"
                  >
                    <Star className="w-4 h-4" />
                    {brand}
                  </a>
                )}
                
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">SKU: {sku}</span>
                </div>

                <div className="text-2xl font-bold text-[#FF6B03]">
                  ${(compareAtPrice || price).toFixed(2)}
                  {compareAtPrice && compareAtPrice > price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Swatches */}
              {colors && colors.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Available Colors:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleColorSelect(index)}
                        className={`group relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === index ? 'border-[#FF6B03] scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hexCode }}
                        title={color.name}
                      >
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Table */}
              {priceTiers && priceTiers.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Volume Pricing:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {priceTiers.map((tier: any, index: number) => (
                      <div key={index} className="text-center p-2 bg-white rounded border">
                        <div className="text-sm text-gray-600">{tier.quantity}+</div>
                        <div className="font-bold text-[#FF6B03]">${tier.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rush & Decoration Options */}
              <div className="space-y-2">
                {rushPrice > 0 && (
                  <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={rushEnabled}
                      onChange={(e) => setRushEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">Rush Production</span>
                    <span className="text-sm text-gray-600">(+${rushPrice.toFixed(2)}/unit)</span>
                  </label>
                )}

                {decorationPrice > 0 && (
                  <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={decorationEnabled}
                      onChange={(e) => setDecorationEnabled(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Palette className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold">Premium Decoration</span>
                    <span className="text-sm text-gray-600">(+${decorationPrice.toFixed(2)}/unit)</span>
                  </label>
                )}
              </div>

              {/* Delivery Date */}
              {productionTime > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">Order today and get it by:</div>
                    <div className="text-lg text-blue-600">{calculateDeliveryDate()}</div>
                  </div>
                </div>
              )}

              {/* Contact Number */}
              {contactNumber && (
                <div className="bg-[#FF6B03] text-white p-4 rounded-lg flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <div>
                    <div className="text-sm">Need help? Call us:</div>
                    <div className="text-xl font-bold">{contactNumber}</div>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="bg-newsecondary p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">Quantity:</h2>
                  <div className="flex items-center border-2 border-newprimary bg-white rounded-full px-4">
                    <button
                      onClick={() => setMoqValue(prev => Math.max(effectiveMoqMin, prev - 1))}
                      className="px-3 text-3xl text-newprimary"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={moqValue}
                      onChange={(e) =>
                        setMoqValue(
                          Math.max(effectiveMoqMin, Math.min(effectiveMoqMax, parseInt(e.target.value) || effectiveMoqMin))
                        )
                      }
                      className="text-lg font-semibold w-20 bg-transparent text-center border-0 focus:outline-none"
                      min={effectiveMoqMin}
                      max={effectiveMoqMax}
                    />
                    <button
                      onClick={() => setMoqValue(prev => Math.min(effectiveMoqMax, prev + 1))}
                      className="px-3 text-3xl text-newprimary"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Slider */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{effectiveMoqMin}</span>
                  <input
                    type="range"
                    min={effectiveMoqMin}
                    max={effectiveMoqMax}
                    value={moqValue}
                    onChange={e => setMoqValue(Number(e.target.value))}
                    className="flex-1 custom-slider"
                  />
                  <span className="text-sm font-semibold">{effectiveMoqMax}+</span>
                </div>

                <div className="text-sm text-gray-600">MOQ: {effectiveMoqMin}</div>

                {/* Special Instructions */}
                <div>
                  <h3 className="font-semibold mb-2">Special Instructions:</h3>
                  <Textarea
                    value={sInstruction}
                    onChange={(e) => setSInstruction(e.target.value)}
                    placeholder="PRINT POSITION, COLOURS, DIFFERENT QUANTITIES AND SIZES ETC."
                    className="min-h-[80px] bg-white rounded-xl"
                  />
                </div>

                {/* Estimated Total */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Estimated Total:</span>
                    <span className="text-2xl font-bold text-[#FF6B03]">
                      ${calculatePrice().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4">
                    Estimated price includes selected options. A detailed quote will be provided after we review your requirements.
                  </p>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-newprimary hover:bg-newprimary/90 text-white text-lg py-6 rounded-full"
                  >
                    ADD TO QUOTE
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {/* Visual Mock-up Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-2 border-[#FF6B03] text-[#FF6B03] hover:bg-[#FF6B03] hover:text-white">
                      Get Visual Mock-up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Visual Mock-up</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Your Name *"
                        value={mockupForm.name}
                        onChange={(e) => setMockupForm({ ...mockupForm, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={mockupForm.email}
                        onChange={(e) => setMockupForm({ ...mockupForm, email: e.target.value })}
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={mockupForm.phone}
                        onChange={(e) => setMockupForm({ ...mockupForm, phone: e.target.value })}
                      />
                      <Textarea
                        placeholder="Tell us about your design requirements..."
                        value={mockupForm.message}
                        onChange={(e) => setMockupForm({ ...mockupForm, message: e.target.value })}
                        className="min-h-[100px]"
                      />
                      <Button 
                        onClick={handleMockupSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-[#FF6B03] hover:bg-[#e55d02]"
                      >
                        {isSubmitting ? "Sending..." : "Submit Request"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Sample Request Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-2 border-[#FF6B03] text-[#FF6B03] hover:bg-[#FF6B03] hover:text-white">
                      Request Sample
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Physical Sample</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Your Name *"
                        value={sampleForm.name}
                        onChange={(e) => setSampleForm({ ...sampleForm, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={sampleForm.email}
                        onChange={(e) => setSampleForm({ ...sampleForm, email: e.target.value })}
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={sampleForm.phone}
                        onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                      />
                      <Textarea
                        placeholder="Shipping Address *"
                        value={sampleForm.address}
                        onChange={(e) => setSampleForm({ ...sampleForm, address: e.target.value })}
                        className="min-h-[100px]"
                      />
                      <Button 
                        onClick={handleSampleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-[#FF6B03] hover:bg-[#e55d02]"
                      >
                        {isSubmitting ? "Sending..." : "Submit Request"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Promo Banner */}
              <div className="bg-[#05172d] rounded-full py-3 px-6 text-center">
                <span className="text-white font-semibold text-lg">
                  Order Now & Get 100 Branded Pens FREE!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <Image
            src={currentImages[selectedImageIndex] || "/placeholder.svg"}
            alt={name}
            width={1200}
            height={1200}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      {/* DESCRIPTION, SPECS, REVIEWS, SHIPPING - TABS SECTION */}
      <div className="w-full px-4 py-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 text-lg font-semibold ${
                selectedTab === 'description' 
                  ? 'border-b-4 border-[#05172d] text-[#05172d]' 
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 text-lg font-semibold ${
                selectedTab === 'specifications' 
                  ? 'border-b-4 border-[#05172d] text-[#05172d]' 
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`px-6 py-3 text-lg font-semibold ${
                selectedTab === 'reviews' 
                  ? 'border-b-4 border-[#05172d] text-[#05172d]' 
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`px-6 py-3 text-lg font-semibold ${
                selectedTab === 'shipping' 
                  ? 'border-b-4 border-[#05172d] text-[#05172d]' 
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedTab('shipping')}
            >
              Shipping Info
            </button>
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg">
            {selectedTab === 'description' && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{description}</p>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="prose max-w-none">
                {specifications ? (
                  <div className="whitespace-pre-wrap">{specifications}</div>
                ) : (
                  <p>No specifications available.</p>
                )}
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="mb-4">Share your experience with this product!</p>
                <a 
                  href="https://form.jotform.com/251545018131346" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-newprimary text-white rounded-full hover:bg-newprimary/90 transition-colors"
                >
                  LEAVE A REVIEW
                </a>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="prose max-w-none">
                {shippingInformation ? (
                  <div className="whitespace-pre-wrap">{shippingInformation}</div>
                ) : (
                  <p>No shipping information available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQs SECTION */}
      {faqs && faqs.length > 0 && (
        <div className="w-full px-4 py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq: any, index: number) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-left">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="p-4 bg-gray-50 border-t">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT REQUEST SECTION */}
      <div className="w-full px-4 py-12 bg-gradient-to-r from-[#07182d] to-[#0a2545]">
        <div className="container mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Have Questions or Special Requirements?</h2>
          <p className="mb-6">Our team is here to help you find the perfect promotional products for your needs.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-[#FF6B03] hover:bg-[#e55d02] text-white px-8 py-6 text-lg">
                Submit Custom Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Custom Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Your Name *" />
                <Input type="email" placeholder="Email *" />
                <Input type="tel" placeholder="Phone" />
                <Textarea 
                  placeholder="Tell us about your requirements..." 
                  className="min-h-[120px]"
                />
                <Button className="w-full bg-[#FF6B03] hover:bg-[#e55d02]">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts currentProductId={id || _id} />
    </>
  );
}

