// Static categories for navbar, based on actual API data structure
// Preserves current ordering and hierarchy from the database

export type StaticCategory = {
  categoryName: string;
  slug?: string;
  subcategories: StaticCategory[];
};

export const staticCategories: StaticCategory[] = [
  // 1. APPAREL
  {
    categoryName: "Apparel",
    slug: "apparel",
    subcategories: [
      {
        categoryName: "T-Shirts",
        slug: "t-shirts",
        subcategories: [
          { categoryName: "Short Sleeve T-shirts", slug: "short-sleeve-t-shirts", subcategories: [] },
          { categoryName: "Long Sleeve T-shirts", slug: "long-sleeve-t-shirts", subcategories: [] },
          { categoryName: "Sports T-shirts", slug: "sports-t-shirts", subcategories: [] },
          { categoryName: "V Neck T-shirts", slug: "v-neck-t-shirts", subcategories: [] },
          { categoryName: "American Apparel T-Shirts", slug: "american-apparel-t-shirts", subcategories: [] },
          { categoryName: "AS Colour T-Shirts", slug: "as-colour-t-shirts", subcategories: [] },
          { categoryName: "Singlets", slug: "singlets", subcategories: [] },
          { categoryName: "Mens T-shirts", slug: "mens-t-shirts", subcategories: [] },
          { categoryName: "Womens T-shirts", slug: "womenst-shirts", subcategories: [] },
          { categoryName: "Kids T-shirts", slug: "kids-t-shirts", subcategories: [] },
        ],
      },
      {
        categoryName: "Hoodies & Sweatshirts",
        slug: "hoodies-sweatshirts",
        subcategories: [
          { categoryName: "Hoodies", slug: "hoodies", subcategories: [] },
          { categoryName: "Sweatshirts", slug: "sweatshirts", subcategories: [] },
          { categoryName: "Zip Hoodies", slug: "zip-hoodies", subcategories: [] },
          { categoryName: "AS Colour Hoodies", slug: "as-colour-hoodies", subcategories: [] },
          { categoryName: "Mens Hoodies", slug: "mens-hoodies", subcategories: [] },
          { categoryName: "Womens Hoodies", slug: "womens-hoodies", subcategories: [] },
          { categoryName: "Kids Hoodies", slug: "kids-hoodies", subcategories: [] },
        ],
      },
      {
        categoryName: "Socks",
        slug: "socks",
        subcategories: [
          { categoryName: "Sublimated Socks", slug: "sublimated-socks", subcategories: [] },
          { categoryName: "Promotional Socks", slug: "promotional-socks", subcategories: [] },
          { categoryName: "Work Socks", slug: "work-socks", subcategories: [] },
          { categoryName: "Sport Socks", slug: "sport-socks", subcategories: [] },
          { categoryName: "Kids Socks", slug: "kids-socks", subcategories: [] },
        ],
      },
      {
        categoryName: "Polos",
        slug: "polos",
        subcategories: [
          { categoryName: "Cotton Polos", slug: "cotton-polos", subcategories: [] },
          { categoryName: "Polyester Polos", slug: "polyester-polos", subcategories: [] },
          { categoryName: "Mens Polos", slug: "mens-polos", subcategories: [] },
          { categoryName: "Womens Polos", slug: "womens-polos", subcategories: [] },
          { categoryName: "Retail Polos", slug: "retail-polos", subcategories: [] },
        ],
      },
      {
        categoryName: "Jackets",
        slug: "jackets",
        subcategories: [
          { categoryName: "Casual Jackets", slug: "casual-jackets", subcategories: [] },
          { categoryName: "Vests", slug: "vests", subcategories: [] },
          { categoryName: "Puffer Jackets", slug: "puffer-jackets", subcategories: [] },
          { categoryName: "Corporate Jackets", slug: "corporate-jackets", subcategories: [] },
          { categoryName: "Mens Jackets", slug: "mens-jackets", subcategories: [] },
          { categoryName: "Rain Coats", slug: "rain-coats", subcategories: [] },
        ],
      },
      {
        categoryName: "Bottoms",
        slug: "bottoms",
        subcategories: [
          { categoryName: "Trackpants", slug: "trackpants", subcategories: [] },
          { categoryName: "Pants", slug: "pants", subcategories: [] },
          { categoryName: "Shorts", slug: "shorts", subcategories: [] },
          { categoryName: "Board Shorts", slug: "board-shorts", subcategories: [] },
          { categoryName: "Skirts", slug: "skirts", subcategories: [] },
        ],
      },
      {
        categoryName: "Accessories",
        slug: "accessories",
        subcategories: [
          { categoryName: "Bandanas", slug: "bandanas", subcategories: [] },
          { categoryName: "Scarves", slug: "scarves", subcategories: [] },
          { categoryName: "Shoes", slug: "shoes", subcategories: [] },
          { categoryName: "Gloves", slug: "gloves", subcategories: [] },
          { categoryName: "Sunglasses", slug: "sunglasses", subcategories: [] },
          { categoryName: "Aprons", slug: "aprons", subcategories: [] },
          { categoryName: "Belts", slug: "belts", subcategories: [] },
          { categoryName: "Blankets", slug: "blankets", subcategories: [] },
          { categoryName: "Sleeping Accessories", slug: "sleeping-accessories", subcategories: [] },
        ],
      },
      {
        categoryName: "Apparel By Industry",
        slug: "apparel-by-industry",
        subcategories: [
          { categoryName: "Hospitality", slug: "hospitality", subcategories: [] },
          { categoryName: "Corporate", slug: "corporate", subcategories: [] },
          { categoryName: "Medical", slug: "medical", subcategories: [] },
          { categoryName: "Education", slug: "education", subcategories: [] },
          { categoryName: "Sports & Fitness", slug: "sports-fitness", subcategories: [] },
          { categoryName: "Construction", slug: "construction", subcategories: [] },
        ],
      },
    ],
  },
  // 2. HEADWEAR
  {
    categoryName: "Headwear",
    slug: "headwear",
    subcategories: [
      {
        categoryName: "Caps",
        slug: "caps",
        subcategories: [
          { categoryName: "Baseball Caps", slug: "baseball-caps", subcategories: [] },
          { categoryName: "Trucker Caps", slug: "trucker-caps", subcategories: [] },
          { categoryName: "Snapback Caps", slug: "snapback-caps", subcategories: [] },
          { categoryName: "Fitted Caps", slug: "fitted-caps", subcategories: [] },
          { categoryName: "Adjustable Caps", slug: "adjustable-caps", subcategories: [] },
        ],
      },
      {
        categoryName: "Bucket Hats",
        slug: "bucket-hats",
        subcategories: [
          { categoryName: "Cotton Bucket Hats", slug: "cotton-bucket-hats", subcategories: [] },
          { categoryName: "Reversible Bucket Hats", slug: "reversible-bucket-hats", subcategories: [] },
          { categoryName: "Adjustable Bucket Hats", slug: "adjustable-bucket-hats", subcategories: [] },
        ],
      },
      {
        categoryName: "Hats",
        slug: "hats",
        subcategories: [
          { categoryName: "Straw Hats", slug: "straw-hats", subcategories: [] },
          { categoryName: "Wide Brim Hats", slug: "wide-brim-hats", subcategories: [] },
          { categoryName: "Kids Hats", slug: "kids-hats", subcategories: [] },
        ],
      },
      {
        categoryName: "Beanies",
        slug: "beanies",
        subcategories: [
          { categoryName: "Acrylic Beanies", slug: "acrylic-beanies", subcategories: [] },
          { categoryName: "Knit Beanies", slug: "knit-beanies", subcategories: [] },
          { categoryName: "Cuffed Beanies", slug: "cuffed-beanies", subcategories: [] },
          { categoryName: "Pom-Pom Beanies", slug: "pom-pom-beanies", subcategories: [] },
        ],
      },
      {
        categoryName: "Visors",
        slug: "visors",
        subcategories: [
          { categoryName: "Adjustable Visors", slug: "adjustable-visors", subcategories: [] },
          { categoryName: "Sports Visors", slug: "sports-visors", subcategories: [] },
        ],
      },
      {
        categoryName: "Sweatband",
        slug: "sweatband",
        subcategories: [],
      },
    ],
  },
  // 3. BAGS
  {
    categoryName: "Bags",
    slug: "bags",
    subcategories: [
      {
        categoryName: "Tote Bags",
        slug: "tote-bags",
        subcategories: [
          { categoryName: "Cotton Tote Bags", slug: "cotton-tote-bags", subcategories: [] },
          { categoryName: "Non-woven Tote Bags", slug: "non-woven-tote-bags", subcategories: [] },
          { categoryName: "Premium Tote Bags", slug: "premium-tote-bags", subcategories: [] },
          { categoryName: "Laminated Tote Bags", slug: "laminated-tote-bags", subcategories: [] },
          { categoryName: "Recycled Tote Bags", slug: "recycled-tote-bags", subcategories: [] },
          { categoryName: "Jute Tote Bags", slug: "jute-tote-bags", subcategories: [] },
          { categoryName: "Large Capacity Tote Bags", slug: "large-capacity-tote-bags", subcategories: [] },
        ],
      },
      {
        categoryName: "Backpacks",
        slug: "backpacks",
        subcategories: [
          { categoryName: "Casual Backpacks", slug: "casual-backpacks", subcategories: [] },
          { categoryName: "Premium Backpacks", slug: "premium-backpacks", subcategories: [] },
          { categoryName: "Waterproof Backpacks", slug: "waterproof-backpacks", subcategories: [] },
          { categoryName: "Crossbody Backpacks", slug: "crossbody-backpacks", subcategories: [] },
        ],
      },
      {
        categoryName: "Business Bags",
        slug: "business-bags",
        subcategories: [
          { categoryName: "Briefcases", slug: "briefcases", subcategories: [] },
          { categoryName: "Laptop Sleeves", slug: "laptop-sleeves", subcategories: [] },
          { categoryName: "Laptop Backpacks", slug: "laptop-backpacks", subcategories: [] },
        ],
      },
      {
        categoryName: "Cooler Bags",
        slug: "cooler-bags",
        subcategories: [
          { categoryName: "Soft Coolers", slug: "soft-coolers", subcategories: [] },
          { categoryName: "Cooler Boxes", slug: "cooler-boxes", subcategories: [] },
        ],
      },
      {
        categoryName: "Drawstring Bags",
        slug: "drawstring-bags",
        subcategories: [
          { categoryName: "Premium Drawstring Bags", slug: "premium-drawstring-bags", subcategories: [] },
          { categoryName: "Standard Drawstring Bags", slug: "standard-drawstring-bags", subcategories: [] },
          { categoryName: "Small Gift Bags", slug: "small-gift-bags", subcategories: [] },
        ],
      },
      {
        categoryName: "Duffel Bags",
        slug: "duffel-bags",
        subcategories: [
          { categoryName: "Travel Duffle Bags", slug: "travel-duffle-bags", subcategories: [] },
          { categoryName: "Sports Duffle Bags", slug: "sports-duffle-bags", subcategories: [] },
          { categoryName: "Lightweight Duffle Bags", slug: "lightweight-duffle-bags", subcategories: [] },
        ],
      },
      {
        categoryName: "Other Bags",
        slug: "other-bags",
        subcategories: [
          { categoryName: "Waist Bags", slug: "waist-bags", subcategories: [] },
          { categoryName: "Paper Bags", slug: "paper-bags", subcategories: [] },
          { categoryName: "Luggages", slug: "luggages", subcategories: [] },
          { categoryName: "Purses", slug: "purses", subcategories: [] },
          { categoryName: "Toiletry bags", slug: "toiletry-bags", subcategories: [] },
        ],
      },
    ],
  },
  // 4. DRINKWARE
  {
    categoryName: "Drinkware",
    slug: "drinkware",
    subcategories: [
      {
        categoryName: "Water Bottles",
        slug: "water-bottles",
        subcategories: [
          { categoryName: "Vacuum Insulated Bottles", slug: "vacuum-insulated-bottles", subcategories: [] },
          { categoryName: "Plastic Bottles", slug: "plastic-bottles", subcategories: [] },
          { categoryName: "Stainless Steel Bottles", slug: "stainless-steel-bottles", subcategories: [] },
          { categoryName: "Glass Bottles", slug: "glass-bottles", subcategories: [] },
          { categoryName: "Sports Bottles", slug: "sports-bottles", subcategories: [] },
          { categoryName: "Collapsible Bottles", slug: "collapsible-bottles", subcategories: [] },
        ],
      },
      {
        categoryName: "Reusable Cups",
        slug: "reusable-cups",
        subcategories: [
          { categoryName: "Vacuum Insulated Cups", slug: "vacuum-insulated-cups", subcategories: [] },
          { categoryName: "Coffee Cups", slug: "coffee-cups", subcategories: [] },
          { categoryName: "Ceramic Mugs", slug: "ceramic-mugs", subcategories: [] },
          { categoryName: "Travel Mugs", slug: "travel-mugs", subcategories: [] },
          { categoryName: "Enamel Mugs", slug: "enamel-mugs", subcategories: [] },
        ],
      },
      {
        categoryName: "Tumblers",
        slug: "tumblers",
        subcategories: [
          { categoryName: "Vacuum Insulated Tumblers", slug: "vacuum-insulated-tumblers", subcategories: [] },
          { categoryName: "Acrylic Tumblers", slug: "acrylic-tumblers", subcategories: [] },
          { categoryName: "Straw Lid Tumblers", slug: "straw-lid-tumblers", subcategories: [] },
          { categoryName: "Travel Tumblers", slug: "travel-tumblers", subcategories: [] },
          { categoryName: "Wine Tumblers", slug: "wine-tumblers", subcategories: [] },
        ],
      },
      {
        categoryName: "Bar Accessories",
        slug: "bar-accessories",
        subcategories: [
          { categoryName: "Bottle Openers", slug: "bottle-openers", subcategories: [] },
          { categoryName: "Coasters", slug: "coasters", subcategories: [] },
          { categoryName: "Wine Stoppers", slug: "wine-stoppers", subcategories: [] },
          { categoryName: "Shakers", slug: "shakers", subcategories: [] },
          { categoryName: "Bar Mats", slug: "bar-mats", subcategories: [] },
          { categoryName: "Straws", slug: "straws", subcategories: [] },
        ],
      },
      {
        categoryName: "Glassware",
        slug: "glassware",
        subcategories: [
          { categoryName: "Wine Glasses", slug: "wine-glasses", subcategories: [] },
          { categoryName: "Carafes", slug: "carafes", subcategories: [] },
          { categoryName: "Beer Glasses", slug: "beer-mugs", subcategories: [] },
          { categoryName: "Shot Glasses", slug: "shot-glasses", subcategories: [] },
          { categoryName: "Other Glassware", slug: "other-glassware", subcategories: [] },
        ],
      },
      {
        categoryName: "Sport Shakers",
        slug: "sport-shakers",
        subcategories: [],
      },
      {
        categoryName: "Stubby Coolers",
        slug: "stubby-coolers",
        subcategories: [],
      },
    ],
  },
  // 5. MERCH
  {
    categoryName: "Merch",
    slug: "merch",
    subcategories: [
      {
        categoryName: "Keyrings",
        slug: "keyrings",
        subcategories: [
          { categoryName: "Bottle Opener Keyrings", slug: "bottle-opener-keyrings", subcategories: [] },
          { categoryName: "Metal Keyrings", slug: "metal-keyrings", subcategories: [] },
          { categoryName: "Acrylic Keyrings", slug: "acrylic-keyrings", subcategories: [] },
          { categoryName: "PVC Keyrings", slug: "pvc-keyrings", subcategories: [] },
          { categoryName: "Leather Keyrings", slug: "leather-keyrings", subcategories: [] },
          { categoryName: "Eco Keyrings", slug: "eco-keyrings", subcategories: [] },
          { categoryName: "Other Keyrings", slug: "other-keyrings", subcategories: [] },
        ],
      },
      {
        categoryName: "Event Merchandise",
        slug: "event-merchandise",
        subcategories: [
          { categoryName: "Wristbands", slug: "wristbands", subcategories: [] },
          { categoryName: "Pins & Badges", slug: "pins-badges", subcategories: [] },
          { categoryName: "Vinyl Stickers", slug: "vinyl-stickers", subcategories: [] },
          { categoryName: "Stress Shapes", slug: "stress-shapes", subcategories: [] },
          { categoryName: "Air Freshener", slug: "air-freshener", subcategories: [] },
          { categoryName: "Fans", slug: "fans", subcategories: [] },
          { categoryName: "Other Event Merchandise", slug: "other-event-merchandise", subcategories: [] },
        ],
      },
      {
        categoryName: "Personal Care",
        slug: "personal-care",
        subcategories: [
          { categoryName: "Lip Balms", slug: "lip-balms", subcategories: [] },
          { categoryName: "Hand Sanitiser", slug: "hand-sanitiser", subcategories: [] },
          { categoryName: "Scent Diffuser", slug: "scent-diffuser", subcategories: [] },
          { categoryName: "Mirrors", slug: "mirrors", subcategories: [] },
          { categoryName: "Combs & Hair Brushes", slug: "combs-hair-brushes", subcategories: [] },
          { categoryName: "Candles", slug: "candles", subcategories: [] },
          { categoryName: "Pillboxes", slug: "pillboxes", subcategories: [] },
          { categoryName: "Other Personal Care", slug: "other-personal-care", subcategories: [] },
        ],
      },
      {
        categoryName: "Magnets",
        slug: "magnets",
        subcategories: [
          { categoryName: "Fridge Magnets", slug: "fridge-magnets", subcategories: [] },
          { categoryName: "Calendar Magnets", slug: "calendar-magnets", subcategories: [] },
          { categoryName: "Notepad Magnets", slug: "notepad-magnets", subcategories: [] },
          { categoryName: "Custom Die-Cut Magnets", slug: "custom-die-cut-magnets", subcategories: [] },
        ],
      },
      {
        categoryName: "Toys & Novelties",
        slug: "toys-novelties",
        subcategories: [
          { categoryName: "Plush Toys", slug: "plush-toys", subcategories: [] },
          { categoryName: "Piggy Banks", slug: "piggy-banks", subcategories: [] },
          { categoryName: "Fidget Spinners", slug: "fidget-spinners", subcategories: [] },
          { categoryName: "Yo-Yos", slug: "yo-yos", subcategories: [] },
          { categoryName: "Other Toys", slug: "other-toys", subcategories: [] },
        ],
      },
      {
        categoryName: "Pet Supplies",
        slug: "pet-supplies",
        subcategories: [
          { categoryName: "Bowls & Feeders", slug: "bowls-feeders", subcategories: [] },
          { categoryName: "Pet Clothes & Accessories", slug: "pet-clothes-accessories", subcategories: [] },
          { categoryName: "Collars & Leashes", slug: "collars-leashes", subcategories: [] },
          { categoryName: "Pet Toys", slug: "pet-toys", subcategories: [] },
          { categoryName: "Other Pet Supplies", slug: "other-pet-supplies", subcategories: [] },
        ],
      },
      {
        categoryName: "Patches",
        slug: "patches",
        subcategories: [
          { categoryName: "Embroidered Patches", slug: "embroidered-patches", subcategories: [] },
          { categoryName: "Other Patches", slug: "other-patches", subcategories: [] },
        ],
      },
      {
        categoryName: "Car Sunshades",
        slug: "car-sunshades",
        subcategories: [],
      },
      {
        categoryName: "Gifts",
        slug: "gifts",
        subcategories: [],
      },
      {
        categoryName: "Inflatable Items",
        slug: "inflatable-items",
        subcategories: [],
      },
    ],
  },
  // 6. ECO-PRODUCTS
  {
    categoryName: "Eco-Products",
    slug: "eco-products",
    subcategories: [
      {
        categoryName: "Tech Accessories",
        slug: "tech-accessories",
        subcategories: [
          { categoryName: "Eco Phone Chargers", slug: "eco-phone-chargers", subcategories: [] },
          { categoryName: "Eco USB drives", slug: "eco-usb-drives", subcategories: [] },
          { categoryName: "Eco Mouse and Mousepads", slug: "eco-mouse-and-mousepads", subcategories: [] },
          { categoryName: "Eco Earphones", slug: "eco-earphones", subcategories: [] },
          { categoryName: "Eco Power Banks", slug: "eco-power-banks", subcategories: [] },
          { categoryName: "Eco Cables", slug: "eco-cables", subcategories: [] },
          { categoryName: "Eco Bluetooth Speakers", slug: "eco-bluetooth-speakers", subcategories: [] },
        ],
      },
      {
        categoryName: "Eco Drinkware",
        slug: "eco-drinkware",
        subcategories: [
          { categoryName: "Eco Cups", slug: "eco-cups", subcategories: [] },
          { categoryName: "Wheat Straw Bottles", slug: "wheat-straw-bottles", subcategories: [] },
          { categoryName: "Eco Bottles", slug: "eco-bottles", subcategories: [] },
          { categoryName: "Recycled PET Drinkware", slug: "recycled-pet-drinkware", subcategories: [] },
          { categoryName: "Reusable Straw Sets", slug: "reusable-straw-sets", subcategories: [] },
          { categoryName: "Other Eco Drinkware", slug: "other-eco-drinkware", subcategories: [] },
        ],
      },
      {
        categoryName: "Eco Apparel",
        slug: "eco-apparel",
        subcategories: [
          { categoryName: "Organic Cotton Apparel", slug: "organic-cotton-apparel", subcategories: [] },
          { categoryName: "Recycled Polyester Apparel", slug: "recycled-polyester-apparel", subcategories: [] },
          { categoryName: "Bamboo Apparel", slug: "bamboo-apparel", subcategories: [] },
          { categoryName: "Other Eco Apparel", slug: "other-eco-apparel", subcategories: [] },
        ],
      },
      {
        categoryName: "Stationery",
        slug: "stationery",
        subcategories: [
          { categoryName: "Eco Notebooks", slug: "eco-notebooks", subcategories: [] },
          { categoryName: "Eco Pens", slug: "eco-pens", subcategories: [] },
          { categoryName: "Bamboo Rulers", slug: "bamboo-rulers", subcategories: [] },
          { categoryName: "Other Eco Stationery", slug: "other-eco-stationery", subcategories: [] },
        ],
      },
      {
        categoryName: "Cutlery & Tableware",
        slug: "cutlery-tableware",
        subcategories: [],
      },
      {
        categoryName: "Eco Bags",
        slug: "eco-bags",
        subcategories: [],
      },
      {
        categoryName: "Eco Packaging",
        slug: "eco-packaging",
        subcategories: [],
      },
      {
        categoryName: "Reusable Lunch Boxes",
        slug: "reusable-lunch-boxes",
        subcategories: [],
      },
    ],
  },
  // 7. TECH
  {
    categoryName: "Tech",
    slug: "tech",
    subcategories: [
      {
        categoryName: "Phone Accessories",
        slug: "phone-accessories",
        subcategories: [
          { categoryName: "Headphones & Earbuds", slug: "headphones-earbuds", subcategories: [] },
          { categoryName: "Ring Holders", slug: "ring-holders", subcategories: [] },
          { categoryName: "Wireless Chargers", slug: "wireless-chargers", subcategories: [] },
          { categoryName: "Other Phone Accessories", slug: "other-phone-accessories", subcategories: [] },
        ],
      },
      {
        categoryName: "Power Banks",
        slug: "power-banks",
        subcategories: [
          { categoryName: "Standard Power Banks", slug: "standard-power-banks", subcategories: [] },
          { categoryName: "Solar Power Banks", slug: "solar-power-banks", subcategories: [] },
          { categoryName: "Wireless Power Banks", slug: "wireless-power-banks", subcategories: [] },
        ],
      },
      {
        categoryName: "Speakers",
        slug: "speakers",
        subcategories: [
          { categoryName: "Bluetooth Speakers", slug: "bluetooth-speakers", subcategories: [] },
          { categoryName: "Eco Speakers", slug: "eco-speakers", subcategories: [] },
        ],
      },
      {
        categoryName: "USB Drives",
        slug: "usb-drives",
        subcategories: [],
      },
      {
        categoryName: "RFID Card Holder",
        slug: "rfid-card-holder",
        subcategories: [],
      },
      {
        categoryName: "Cables & Adapters",
        slug: "cables-adapters",
        subcategories: [],
      },
      {
        categoryName: "Smart Watches",
        slug: "smart-watches",
        subcategories: [],
      },
      {
        categoryName: "Mice",
        slug: "mice",
        subcategories: [],
      },
      {
        categoryName: "Other Tech",
        slug: "other-tech",
        subcategories: [],
      },
    ],
  },
  // 8. OFFICE
  {
    categoryName: "Office",
    slug: "office",
    subcategories: [
      {
        categoryName: "Pens",
        slug: "pens",
        subcategories: [
          { categoryName: "Ballpoint Pens", slug: "ballpoint-pens", subcategories: [] },
          { categoryName: "Stylus Pens", slug: "stylus-pens", subcategories: [] },
          { categoryName: "Recycled Pens", slug: "recycled-pens", subcategories: [] },
          { categoryName: "Metal Pens", slug: "metal-pens", subcategories: [] },
          { categoryName: "Plastic Pens", slug: "plastic-pens", subcategories: [] },
          { categoryName: "Multi-Ink Pens", slug: "multi-ink-pens", subcategories: [] },
          { categoryName: "Pencils and Crayons", slug: "pencils-and-crayons", subcategories: [] },
          { categoryName: "Other Pens", slug: "other-pens", subcategories: [] },
        ],
      },
      {
        categoryName: "Notebooks",
        slug: "notebooks",
        subcategories: [
          { categoryName: "Hardcover Notebooks", slug: "hardcover-notebooks", subcategories: [] },
          { categoryName: "Softcover Notebooks", slug: "softcover-notebooks", subcategories: [] },
          { categoryName: "Spiral Bound Notebooks", slug: "spiral-bound-notebooks", subcategories: [] },
          { categoryName: "Gift Boxed Sets", slug: "gift-boxed-sets", subcategories: [] },
        ],
      },
      {
        categoryName: "Desk Accessories",
        slug: "desk-accessories",
        subcategories: [
          { categoryName: "Organisers", slug: "organisers", subcategories: [] },
          { categoryName: "Mouse Pads", slug: "mouse-pads", subcategories: [] },
          { categoryName: "Pencil Case", slug: "pencil-case", subcategories: [] },
          { categoryName: "Phone Stands", slug: "phone-stands", subcategories: [] },
          { categoryName: "Rulers", slug: "rulers", subcategories: [] },
          { categoryName: "Sticky Notes & Memo Pads", slug: "sticky-notes-memo-pads", subcategories: [] },
          { categoryName: "Calendars & Planners", slug: "calendars-planners", subcategories: [] },
          { categoryName: "Screen Wipes", slug: "screen-wipes", subcategories: [] },
        ],
      },
      {
        categoryName: "ID & Badge Products",
        slug: "id-badge-products",
        subcategories: [
          { categoryName: "Name Tags", slug: "name-tags", subcategories: [] },
          { categoryName: "Badge Holders", slug: "badge-holders", subcategories: [] },
          { categoryName: "Retractable Reels", slug: "retractable-reels", subcategories: [] },
          { categoryName: "Conference ID Cards", slug: "conference-id-cards", subcategories: [] },
        ],
      },
    ],
  },
  // 9. OUTDOOR
  {
    categoryName: "Outdoor",
    slug: "outdoor",
    subcategories: [
      {
        categoryName: "Beach Items",
        slug: "beach-items",
        subcategories: [
          { categoryName: "Beach Towels", slug: "beach-towels", subcategories: [] },
          { categoryName: "Beach Balls", slug: "beach-balls", subcategories: [] },
          { categoryName: "Beach Umbrellas", slug: "beach-umbrellas", subcategories: [] },
          { categoryName: "Beach Sunglasses", slug: "beach-sunglasses", subcategories: [] },
          { categoryName: "Flip Flops", slug: "flip-flops", subcategories: [] },
          { categoryName: "Phone Pouches", slug: "phone-pouches", subcategories: [] },
          { categoryName: "Other Beach Items", slug: "other-beach-items", subcategories: [] },
        ],
      },
      {
        categoryName: "Umbrellas",
        slug: "umbrellas",
        subcategories: [
          { categoryName: "Standard Umbrellas", slug: "standard-umbrellas", subcategories: [] },
          { categoryName: "Compact Umbrellas", slug: "compact-umbrellas", subcategories: [] },
          { categoryName: "Windproof Umbrellas", slug: "windproof-umbrellas", subcategories: [] },
        ],
      },
      {
        categoryName: "BBQ & Picnic",
        slug: "bbq-picnic",
        subcategories: [
          { categoryName: "BBQ accessories", slug: "bbq-accessories", subcategories: [] },
          { categoryName: "Cooler Bags", slug: "cooler-bags", subcategories: [] },
          { categoryName: "Picnic Rugs", slug: "picnic-rugs", subcategories: [] },
          { categoryName: "Wine Totes", slug: "wine-totes", subcategories: [] },
          { categoryName: "Cheese Boards", slug: "cheese-boards", subcategories: [] },
          { categoryName: "Cutlery Sets", slug: "cutlery-sets", subcategories: [] },
          { categoryName: "Foldable Chairs", slug: "foldable-chairs", subcategories: [] },
          { categoryName: "Other BBQ & Picnic", slug: "other-bbq-picnic", subcategories: [] },
        ],
      },
      {
        categoryName: "Sports Equipment",
        slug: "sports-equipment",
        subcategories: [
          { categoryName: "Jerseys", slug: "jerseys", subcategories: [] },
          { categoryName: "Footballs", slug: "footballs", subcategories: [] },
          { categoryName: "Frisbees", slug: "frisbees", subcategories: [] },
          { categoryName: "Sports Towels", slug: "sports-towels", subcategories: [] },
          { categoryName: "Other Sports Equipment", slug: "other-sports-equipment", subcategories: [] },
        ],
      },
      {
        categoryName: "Fitness Accessories",
        slug: "fitness-accessories",
        subcategories: [
          { categoryName: "Resistance Bands", slug: "resistance-bands", subcategories: [] },
          { categoryName: "Yoga Mats", slug: "yoga-mats", subcategories: [] },
          { categoryName: "Cooling Towels", slug: "cooling-towels", subcategories: [] },
          { categoryName: "Other Fitness Accessories", slug: "other-fitness-accessories", subcategories: [] },
        ],
      },
      {
        categoryName: "Travel Gear",
        slug: "travel-gear",
        subcategories: [
          { categoryName: "Luggage Tags", slug: "luggage-tags", subcategories: [] },
          { categoryName: "Passport Holders", slug: "passport-holders", subcategories: [] },
          { categoryName: "Neck Pillows", slug: "neck-pillows", subcategories: [] },
          { categoryName: "Other Travel Gear", slug: "other-travel-gear", subcategories: [] },
        ],
      },
      {
        categoryName: "Tools",
        slug: "tools",
        subcategories: [],
      },
    ],
  },
  // 10. TRADESHOWS
  {
    categoryName: "Tradeshows",
    slug: "tradeshows",
    subcategories: [
      {
        categoryName: "Displays",
        slug: "displays",
        subcategories: [
          { categoryName: "Retractable Banners", slug: "retractable-banners", subcategories: [] },
          { categoryName: "Table Covers", slug: "table-covers", subcategories: [] },
          { categoryName: "Flags", slug: "flags", subcategories: [] },
          { categoryName: "Marquees", slug: "marquees", subcategories: [] },
        ],
      },
      {
        categoryName: "Giveaways",
        slug: "giveaways",
        subcategories: [
          { categoryName: "Giveaway Pens", slug: "giveaway-pens", subcategories: [] },
          { categoryName: "Giveaway Notebooks", slug: "giveaway-notebooks", subcategories: [] },
          { categoryName: "Stress Balls", slug: "stress-balls", subcategories: [] },
          { categoryName: "Giveaway Keyrings", slug: "giveaway-keyrings", subcategories: [] },
          { categoryName: "Giveaway Bottles", slug: "giveaway-bottles", subcategories: [] },
          { categoryName: "Giveaway Bags", slug: "giveaway-bags", subcategories: [] },
          { categoryName: "Lollies", slug: "lollies", subcategories: [] },
        ],
      },
      {
        categoryName: "Lanyards",
        slug: "lanyards",
        subcategories: [
          { categoryName: "Standard Lanyards", slug: "standard-lanyards", subcategories: [] },
          { categoryName: "Card Holders", slug: "card-holders", subcategories: [] },
          { categoryName: "Eco Lanyards", slug: "eco-lanyards", subcategories: [] },
          { categoryName: "Retractable Lanyards", slug: "retractable-lanyards", subcategories: [] },
          { categoryName: "Other Lanyards", slug: "other-lanyards", subcategories: [] },
        ],
      },
      {
        categoryName: "Presentation Kits",
        slug: "presentation-kits",
        subcategories: [
          { categoryName: "Laser Pointers", slug: "laser-pointers", subcategories: [] },
          { categoryName: "Branded Folders", slug: "branded-folders", subcategories: [] },
          { categoryName: "USBs", slug: "usbs", subcategories: [] },
          { categoryName: "Business Cards", slug: "business-cards", subcategories: [] },
        ],
      },
      {
        categoryName: "Trophies",
        slug: "trophies",
        subcategories: [],
      },
    ],
  },
]; 