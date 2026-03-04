# Google Merchant Center (GMC) Integration Guide

## Overview
This guide explains the Google Merchant Center integration for Xpromo to increase search visibility and enable Google Shopping ads.

## What's Been Implemented

### 1. Google Merchant Center Product Feed (RSS/XML)
**Location:** `/api/google-merchant-feed`

**Access URL:** `https://xpromo.com.au/api/google-merchant-feed`

**Features:**
- RSS 2.0 format with Google Merchant requirements
- Supports up to 5,000 products per feed
- Includes all required fields:
  - Product ID (SKU)
  - Title
  - Description
  - Price (AUD)
  - Availability
  - Images (main + additional)
  - Product categories
  - Brand information
  - Custom labels (Factory Direct/Local Stock, Budget Category, Featured)

### 2. Structured Data (Schema.org JSON-LD)
**Location:** `components/products/ProductStructuredData.tsx`

**Implemented on:** Individual product detail pages

**Features:**
- Product schema markup
- Price information
- Brand details
- Images
- Availability status
- Sale prices (when applicable)
- Aggregate ratings

**Benefits:**
- Rich snippets in Google search results
- Better product visibility
- Enhanced CTR from search results

### 3. Product Sitemap
**Location:** `/api/sitemap-products`

**Access URL:** `https://xpromo.com.au/api/sitemap-products`

**Features:**
- XML sitemap format
- All active products
- All active categories
- Main pages
- Product images included
- Update frequency and priority settings

### 4. Robots.txt Configuration
**Location:** `public/robots.txt`

**Features:**
- References both sitemaps
- Allows GMC feed access
- Blocks admin/private areas
- Proper crawl permissions

## Setup Instructions

### Step 1: Set Up Google Merchant Center Account

1. Go to [Google Merchant Center](https://merchants.google.com/)
2. Sign in with your Google account
3. Create a new Merchant Center account
4. Verify and claim your website: `https://xpromo.com.au`
5. Set up business information:
   - Business name: Xpromo
   - Country: Australia
   - Currency: AUD

### Step 2: Submit Product Feed to GMC

1. In Google Merchant Center, go to **Products** > **Feeds**
2. Click **"+"** to create a new feed
3. Choose:
   - **Country of sale:** Australia
   - **Language:** English
   - **Destinations:** Select "Shopping ads" and "Free listings"
4. **Feed name:** "Xpromo Products"
5. **Input method:** Select "Scheduled fetch"
6. **Feed URL:** `https://xpromo.com.au/api/google-merchant-feed`
7. **Fetch schedule:** Daily (recommended) or multiple times per day
8. **Time:** Choose off-peak hours (e.g., 2 AM AEST)
9. Click **Create Feed**

### Step 3: Verify Product Feed

1. Wait for the first fetch (or click "Fetch now")
2. Check for any errors in the **Diagnostics** tab
3. Common issues to fix:
   - Missing GTINs (we set `identifier_exists: no` since these are promotional products)
   - Image quality issues
   - Description length
   - Price formatting

### Step 4: Set Up Google Shopping Campaign (Optional)

1. Link Google Merchant Center to Google Ads
2. Create a Shopping campaign:
   - Campaign type: Shopping
   - Sales country: Australia
   - Inventory filter: All products
   - Budget: Set your daily budget
   - Bidding: Manual CPC or Target ROAS

3. Create product groups:
   - By custom label 0 (Factory Direct vs Local Stock)
   - By custom label 1 (Budget Category)
   - By brand
   - By category

### Step 5: Monitor and Optimize

#### In Google Merchant Center:
- Check **Diagnostics** for feed errors
- Monitor **Product status** (approved/disapproved)
- Review **Opportunities** for optimization suggestions

#### In Google Ads (if running Shopping campaigns):
- Monitor CTR (Click-Through Rate)
- Track conversion rate
- Adjust bids by product performance
- Use negative keywords to filter irrelevant searches

## Feed Update Schedule

The product feed automatically updates when accessed. Recommended fetch schedule:
- **Production:** Every 6-12 hours
- **During sales/updates:** Every 1-2 hours
- **Low activity periods:** Daily

## Custom Labels Explained

The feed includes custom labels for better targeting:

1. **custom_label_0:** Factory Direct or Local Stock
   - Use this to create separate campaigns for each fulfillment type
   - Adjust bids based on margin differences

2. **custom_label_1:** Budget Category
   - Values: Budget, Mid-Range, Premium
   - Target different audience segments

3. **custom_label_2:** Featured
   - Marks featured products
   - Consider higher bids for these products

## Structured Data Benefits

The Schema.org markup on product pages provides:

1. **Rich Snippets:** Display price, availability, ratings in search results
2. **Better Indexing:** Help Google understand product data
3. **Enhanced CTR:** More attractive search listings
4. **Voice Search:** Better compatibility with voice assistants

## Sitemap Benefits

1. **Faster Indexing:** New products discovered quickly
2. **Better Crawl Budget:** Guides crawlers to important pages
3. **Image SEO:** Product images indexed separately
4. **Priority Signals:** Tells search engines which pages are most important

## Testing & Validation

### Test Product Feed
```bash
curl https://xpromo.com.au/api/google-merchant-feed
```

### Test Structured Data
1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter a product page URL: `https://xpromo.com.au/(user)/categories/{categoryId}/{productId}`
3. Check for Product schema validation

### Test Sitemap
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Submit sitemap: `https://xpromo.com.au/api/sitemap-products`
3. Monitor indexing status

## Troubleshooting

### Common GMC Issues:

**1. "Missing required attribute: price"**
- Check that all products have valid prices
- Ensure price format is correct (e.g., "25.99 AUD")

**2. "Image quality issue"**
- Images should be at least 800x800 pixels
- Use high-quality product images
- Ensure images are accessible (not behind login)

**3. "Description too short"**
- Product descriptions should be at least 50 characters
- Include relevant product details

**4. "Invalid availability"**
- Check that availability values are: `in_stock`, `out_of_stock`, or `preorder`

### Feed Not Updating:

1. Check the feed URL is accessible
2. Verify no server errors (500/503)
3. Check database connection
4. Verify products are marked as `isActive: true`

## Performance Monitoring

Track these KPIs:

1. **GMC Metrics:**
   - Impressions
   - Clicks
   - CTR
   - Conversion rate
   - Product disapprovals

2. **SEO Metrics:**
   - Organic traffic to product pages
   - Rich snippet appearance rate
   - Position in search results
   - Click-through rate from search

3. **Technical Metrics:**
   - Feed fetch success rate
   - Number of active products in feed
   - Feed processing time
   - Sitemap indexing rate

## Environment Variables

Ensure this is set in your `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://xpromo.com.au
```

## Support & Resources

- [Google Merchant Center Help](https://support.google.com/merchants)
- [Google Shopping Ads Guide](https://support.google.com/google-ads/answer/2454022)
- [Product Feed Specification](https://support.google.com/merchants/answer/7052112)
- [Schema.org Product Markup](https://schema.org/Product)

## Next Steps

1. ✅ Submit feed to Google Merchant Center
2. ✅ Verify and fix any feed errors
3. ✅ Link to Google Ads (if running paid campaigns)
4. ✅ Submit sitemap to Google Search Console
5. ✅ Test structured data on key product pages
6. ✅ Monitor performance weekly
7. ✅ Optimize based on data

## Notes

- The feed is cached for 1 hour to improve performance
- Products must have `isActive: true` to appear in the feed
- Images must be publicly accessible URLs
- Prices are automatically formatted in AUD
- Maximum 5,000 products per feed (GMC recommendation)

---

**Last Updated:** October 2025
**Implementation Status:** ✅ Complete

