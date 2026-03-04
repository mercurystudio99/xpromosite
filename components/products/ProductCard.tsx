import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { MessageSquare } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  moqMin?: number;
  moqMax?: number;
  images?: { url: string }[] | string[];
  categories?: { _id: string; name: string; slug?: string }[];
  slug?: string;
  [key: string]: any; // For other properties that may exist
}

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  linkHref?: string;
}

export function ProductCard({ 
  product, 
  showAddToCart = true,
  linkHref 
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  // Generate link href if not provided
  const getProductLink = () => {
    if (linkHref) return linkHref;
    
    // Use the first category slug if available, otherwise fallback
    const categorySlug = product.categories?.[0]?.slug || 'products';
    return `/categories/${categorySlug}/${product._id}`;
  };

  // Get image URL from various possible formats
  const getImageUrl = (index: number = 0) => {
    if (!product.images || product.images.length === 0) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
    }
    
    if (index >= product.images.length) {
      index = 0; // Fallback to first image
    }
    
    const image = product.images[index];
    if (typeof image === 'string') {
      return image;
    }
    return image?.url || '/placeholder.svg';
  };

  // Check if second image exists
  const hasSecondImage = product.images && product.images.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ 
      id: product._id, 
      name: product.name,
      price: product.price,
      images: product.images || [],
      quantity: 1
    }));
  };

  const handleQuickQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart/quote (same as "Add to Quote" button)
    dispatch(addToCart({ 
      id: product._id, 
      name: product.name,
      price: product.price,
      images: product.images || [],
      quantity: 1
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-[#05172d] flex flex-col w-full hover:shadow-lg transition-shadow">
      <Link href={getProductLink()}>
        {/* Square image container */}
        <div 
          className="w-full aspect-square relative overflow-hidden rounded-t-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={getImageUrl(0)}
            alt={product.name}
            fill
            className={`object-contain transition-opacity duration-300 ${isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'}`}
          />
          {/* Second image on hover */}
          {hasSecondImage && (
            <Image
              src={getImageUrl(1)}
              alt={`${product.name} - alternate view`}
              fill
              className={`object-contain transition-opacity duration-300 absolute inset-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {/* Cart button overlay */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              className="absolute top-2 right-2 w-6 h-6 bg-white border border-[#05172d] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm z-10"
            >
              <Image
                src="/cart.png"
                alt="Add to cart"
                width={12}
                height={12}
                className="object-contain"
              />
            </button>
          )}
          {/* Quick Quote button */}
          <button
            onClick={handleQuickQuote}
            className="absolute top-2 left-2 px-2 py-1 bg-[#FF6B03] text-white text-[10px] font-bold rounded-full flex items-center gap-1 hover:bg-[#e55d02] transition-colors shadow-sm z-10"
          >
            <MessageSquare className="w-3 h-3" />
            Quick Quote
          </button>
          {/* Factory Direct Badge */}
          {product.factoryDirect && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              Factory Direct
            </div>
          )}
        </div>
        
        {/* Content section with padding */}
        <div className="p-3 flex-1 flex flex-col">
          <div className="min-h-[72px] overflow-hidden">
            <h3 className="text-left font-semibold text-[17px] leading-tight mb-2 text-[#05172d] line-clamp-3">
              {product.name}
            </h3>
          </div>
          
          {/* Pricing section */}
          <div className="text-left mb-2">
            <div className="relative">
              <span className="price-with-from text-[#07182d] text-sm font-medium">
                ${product.price?.toFixed(2) || '0.00'}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="ml-2 text-xs text-gray-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Minimum quantity */}
            <div className="text-[10px] text-gray-600 mt-1">
              MIN QTY: {product.moqMin || 100}
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 3).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="text-[9px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-[9px] text-gray-500">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
