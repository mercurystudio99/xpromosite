"use client";

import { Textarea } from "@/components/ui/textarea";
import { ProductCarousel } from "./product-carousel";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { finalProducts } from "@/data/products"; // Import finalProducts
import Image from 'next/image'; // Import Image component
import { RelatedProducts } from './RelatedProducts'; // Import RelatedProducts component

// Define a type for your product based on finalProducts structure
type Product = typeof finalProducts[0];

export function ProductDetails({ product }: { product:any }) {
  const [productCount, setProductCount] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [sInstruction, setSInstruction] = useState("");
  const [moqValue, setMoqValue] = useState(10); // Default to 10
  const [selectedTab, setSelectedTab] = useState('specifications');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // State for related products with explicit type

  const dispatch = useDispatch();

  // Use default data if no product is provided (fallback)
  const {
    id = "",
    sku = "",
    name = "Product Name",
    description = "No description available",
    price = 0,
    discountedPrice,
    stock = 0,
    rating = 0,
    images = ["/images/product-placeholder.jpg"],
    variants = {},
    category = {},
    factoryDirect = false,
    specifications = {},
    shipping = {},
    newArrival = false,
    ecoProduct = false,
    industry = "",
    range = "",
    twentyFourHour = false,
    twentyFourLocation = "",
    showMOQ = false,
    moqMin = 10,
    moqMax = 1000,
  } = product || {};

  // Ensure MOQ values are always set to defaults if not provided or invalid
  const effectiveMoqMin = moqMin && moqMax && moqMin < moqMax ? moqMin : 10;
  const effectiveMoqMax = moqMin && moqMax && moqMin < moqMax ? moqMax : 1000;

  // Update moqValue when product changes to respect effective MOQ values
  useEffect(() => {
    setMoqValue(effectiveMoqMin);
  }, [effectiveMoqMin, id]);

  const handleAddToCart = () => {
    const productData = {
      id,
      sku,
      name,
      description,
      price,
      discountedPrice,
      stock,
      rating,
      images,
      variants,
      category,
      factoryDirect,
      specifications,
      shipping,
      newArrival,
      ecoProduct,
      industry,
      range,
      twentyFourHour,
      twentyFourLocation,
      quantity: moqValue, // Always use MOQ value now
      specialInstruction: sInstruction,
    };

    dispatch(addToCart(productData));
    setSInstruction("");
  };

  // Function to select random related products (excluding current product)
  const selectRelatedProducts = () => {
    const filteredProducts = finalProducts.filter(item => item.id !== product.id);
    const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
    setRelatedProducts(shuffled.slice(0, 4));
  };

  // Call selectRelatedProducts on component mount or when product changes
  useEffect(() => {
    selectRelatedProducts();
  }, [id]); // Re-select if product ID changes

  return (
    <>
    <div className="container mx-auto px-4 py-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
      {/* Product Carousel - pass actual images from the product */}
      <ProductCarousel 
        images={
          images && images.length > 0 
            ? images.map((img: any, index: number) => ({
                url: typeof img === 'string' ? img : (img?.url || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4="),
                altText: `Product image ${index + 1}`,
                position: index
              }))
            : [{
                url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=",
                altText: "Product placeholder",
                position: 0
              }]
        } 
      />

      {/* Product Information */}
      <div className="rounded-lg p-4 md:px-6 md:py-8">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
          {name}
        </h1>
        <p>SKU: {sku}</p>

        {/* Details Section */}
        <div className="space-y-6 rounded-3xl bg-newsecondary p-4 md:p-6 mt-2">
          {/* Description */}
          <div>
            <h2 className="mb-2 text-lg font-semibold lg:text-xl">
              Description
            </h2>
            <p className="text-sm lg:text-base whitespace-pre-line" style={{ color: '#05172d' }}>
              {isDescriptionExpanded 
                ? description 
                : `${description.substring(0, 150)}${description.length > 150 ? '...' : ''}`}
            </p>
            
            {description.length > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-2 text-newprimary font-bold hover:underline"
              >
                {isDescriptionExpanded ? "Read less" : "Read more..."}
              </button>
            )}
          </div>

          {/* Always show MOQ section with default range 10-1000 */}
          <div className="flex flex-col items-start w-full space-y-4">
            {/* Original Quantity Input - Adapted for MOQ */}
            <div className="flex flex-col md:flex-row items-start md:items-center w-full space-y-2 md:space-y-0 md:space-x-4">
               <h2 className="font-bold text-lg md:w-1/3">Quantity:</h2>
               <div className="flex flex-row items-center justify-start w-full md:flex-1">
                 <div className="flex items-center justify-center border-2 border-newprimary bg-white rounded-full px-4">
                   <button
                     type="button"
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
                     className="text-lg italic font-semibold w-16 min-w-[110px] bg-transparent text-center border-0 focus:outline-none"
                     min={effectiveMoqMin}
                     max={effectiveMoqMax}
                   />
                   <button
                     type="button"
                     onClick={() => setMoqValue(prev => Math.min(effectiveMoqMax, prev + 1))}
                     className="px-3 text-3xl text-newprimary"
                   >
                     +
                   </button>
                 </div>
               </div>
             </div>

            {/* Slider */}
            <div className="flex items-center w-full gap-4">
              <span className="text-sm font-semibold">{effectiveMoqMin}</span>
              <input
                type="range"
                min={effectiveMoqMin}
                max={effectiveMoqMax}
                value={moqValue}
                onChange={e => setMoqValue(Number(e.target.value))}
                className="flex-1 w-full custom-slider"
              />
              <span className="text-sm font-semibold">{effectiveMoqMax}+</span>
            </div>

            {/* MOQ Display Below Slider */}
            <div className="text-left w-full">
              <span className="text-base">MOQ: {effectiveMoqMin}</span>
            </div>

            {/* Prices Starting at */}
            <div className="flex items-center mt-2 w-full justify-start">
              <span className="font-bold text-xl mt-4 mb-2">Prices Starting at:</span>
              <span className="ml-4 text-xl font-normal">
                ${(discountedPrice || price).toFixed(2)}
              </span>
            </div>

          </div>

          {/* Special Instructions */}
          <div>
            <h2 className="mb-2 text-lg font-semibold lg:text-xl">
              Specialty Instructions
            </h2>
            <Textarea
              value={sInstruction}
              onChange={(e) => setSInstruction(e.target.value)}
              placeholder="PRINT POSITION, COLOURS, DIFFERENT QUANTITIES AND SIZES ETC."
              className="italic placeholder:text-xs min-h-[100px] bg-gray-50 rounded-3xl"
            />
          </div>

          {/* Estimated Total and Add to Quote Section */}
          <div className="flex flex-col md:flex-row bg-newsecondary rounded-3xl">
            {/* Left Column: Heading, Price, Description (approx 2/3 width) */}
            <div className="flex flex-col w-full md:w-[55%]">
              <div className="flex items-center mb-2">
                <h2 className="text-xs font-bold">Estimated Total:</h2>
                <span className="ml-4 text-2xl font-normal">
                  {(() => {
                    const total = (discountedPrice || price) * moqValue; // Always use MOQ value
                    return total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: total % 1 === 0 ? 0 : 2,
                      maximumFractionDigits: 2
                    });
                  })()}
                </span>
              </div>
              <p className="text-[10px] w-full">
                Estimated price includes simple decoration. A detailed quote will be provided after we review your artwork, quantities, and customization requirements.
              </p>
            </div>

            {/* Right Column: Add to Quote Button (approx 1/3 width) */}
            <div className="w-full md:w-[45%] px-2 md:px-4 py-6 flex items-center justify-center md:justify-end">
              <button
                onClick={handleAddToCart}
                className="w-full px-4 py-2 text-sm font-bold border-4 border-newprimary rounded-full text-newprimary hover:bg-newprimary hover:text-white transition-colors"
                disabled={moqValue < effectiveMoqMin} // Always use MOQ validation
              >
                ADD TO QUOTE
              </button>
            </div>
          </div>
        </div>
        {/* Orange promo bar directly after light-blue box */}
        <div className="bg-[#05172d] rounded-full w-full py-1 px-6 flex items-center justify-center mt-4" style={{maxWidth: 600}}>
          <span className="text-white text-center font-semibold text-lg">
            Order Now & Get 100 Branded Pens FREE!
          </span>
        </div>
      </div>
    </div>

    {/* New Tabbed Section for Specifications and Shipping Information - Full Width */}
    <div className="w-full px-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Specifications Tab */}
          <button
              className={`px-4 py-2 text-lg md:text-xl mb-2 md:mb-0 ${selectedTab === 'specifications' ? 'border-b-4 border-[#05172d] text-[#05172d] font-bold' : 'text-gray-500 font-normal'}`}
            onClick={() => setSelectedTab('specifications')}
          >
            Specifications
          </button>
          {/* Reviews Tab */}
          <button
              className={`px-4 py-2 text-lg md:text-xl mb-2 md:mb-0 md:ml-4 ${selectedTab === 'reviews' ? 'border-b-4 border-[#05172d] text-[#05172d] font-bold' : 'text-gray-500 font-normal'}`}
            onClick={() => setSelectedTab('reviews')}
          >
            Reviews
          </button>
          {/* Shipping Information Tab */}
          <button
              className={`px-4 py-2 text-lg md:text-xl mb-2 md:mb-0 md:ml-4 ${selectedTab === 'shipping' ? 'border-b-4 border-[#05172d] text-[#05172d] font-bold' : 'text-gray-500 font-normal'}`}
            onClick={() => setSelectedTab('shipping')}
          >
            Shipping Information
          </button>
        </div>

        <div className="mt-15 pt-10">
          {selectedTab === 'specifications' && (
            <div>
              {product && product.specifications ? (
                <div className="whitespace-pre-wrap">
                  {product.specifications}
                </div>
              ) : (
                <p>No specifications available.</p>
              )}
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="flex justify-center">
              <a 
                href="https://form.jotform.com/251545018131346" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-bold border-4 border-newprimary rounded-full text-newprimary hover:bg-newprimary hover:text-white transition-colors"
              >
                LEAVE A REVIEW
              </a>
            </div>
          )}

          {selectedTab === 'shipping' && (
            <div>
              {product && product.shippingInformation ? (
                <div className="whitespace-pre-wrap">
                  {product.shippingInformation}
                </div>
              ) : (
                <p>No shipping information available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* RELATED PRODUCTS section - moved to its own component */}
    <RelatedProducts currentProductId={product.id || product._id} />
    </>
  );
}