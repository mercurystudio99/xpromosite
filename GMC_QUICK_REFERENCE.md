# Google Merchant Center - Quick Reference

## 🔗 Important URLs

### Production URLs (Replace with your actual domain)
```
Product Feed:     https://xpromo.com.au/api/google-merchant-feed
Product Sitemap:  https://xpromo.com.au/api/sitemap-products
Robots.txt:       https://xpromo.com.au/robots.txt
```

### Local Development URLs
```
Product Feed:     http://localhost:3000/api/google-merchant-feed
Product Sitemap:  http://localhost:3000/api/sitemap-products
Robots.txt:       http://localhost:3000/robots.txt
```

## 📋 Quick Setup Checklist

- [ ] Set `NEXT_PUBLIC_BASE_URL` in environment variables
- [ ] Test feed locally: `curl http://localhost:3000/api/google-merchant-feed`
- [ ] Deploy to production
- [ ] Create Google Merchant Center account
- [ ] Verify and claim website
- [ ] Submit product feed URL
- [ ] Set fetch schedule (recommended: every 6-12 hours)
- [ ] Monitor diagnostics for errors
- [ ] Submit sitemap to Google Search Console
- [ ] Test structured data with Rich Results Test
- [ ] Link to Google Ads (optional, for paid campaigns)

## 🧪 Testing Commands

### Test Product Feed
```bash
# Check if feed is accessible
curl https://xpromo.com.au/api/google-merchant-feed | head -50

# Save feed to file for inspection
curl https://xpromo.com.au/api/google-merchant-feed > product-feed.xml

# Check HTTP status
curl -I https://xpromo.com.au/api/google-merchant-feed
```

### Test Sitemap
```bash
# Check sitemap
curl https://xpromo.com.au/api/sitemap-products | head -50

# Count URLs in sitemap
curl -s https://xpromo.com.au/api/sitemap-products | grep -c "<loc>"
```

### Test Structured Data
```bash
# Test a specific product page
curl https://xpromo.com.au/(user)/categories/{categoryId}/{productId} | grep "application/ld+json"
```

## 🎯 Feed Customization Options

### In `app/api/google-merchant-feed/route.ts`

**Modify product limit:**
```typescript
.limit(5000); // Change to your preferred limit
```

**Change currency:**
```typescript
<g:price>${product.price.toFixed(2)} AUD</g:price>
```

**Add custom labels:**
```typescript
<g:custom_label_3>Your Custom Value</g:custom_label_3>
```

**Modify availability logic:**
```typescript
const availability = product.factoryDirect ? 'preorder' : 'in_stock';
```

## 🔍 Validation Tools

1. **Google Merchant Center Feed Diagnostics**
   - Access: GMC Dashboard > Products > Feeds > Diagnostics

2. **Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test any product page URL

3. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Submit and monitor sitemap

4. **XML Validator**
   - URL: https://www.xmlvalidation.com/
   - Validate feed XML structure

## 📊 Feed Statistics

To check feed stats, add this API endpoint:

**File:** `app/api/google-merchant-feed/stats/route.ts`
```typescript
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  await connectToDatabase();
  
  const total = await Product.countDocuments({ isActive: true });
  const factoryDirect = await Product.countDocuments({ isActive: true, factoryDirect: true });
  const localStock = await Product.countDocuments({ isActive: true, factoryDirect: false });
  const featured = await Product.countDocuments({ isActive: true, isFeatured: true });
  
  return NextResponse.json({
    totalProducts: total,
    factoryDirect,
    localStock,
    featured,
    lastUpdated: new Date().toISOString()
  });
}
```

## 🚨 Common Error Fixes

### Error: "Missing price"
**Fix:** Ensure all products have `price` field set

### Error: "Invalid image URL"
**Fix:** Check that image URLs are absolute and publicly accessible

### Error: "Description too short"
**Fix:** Ensure descriptions are at least 50 characters

### Error: "Missing brand"
**Fix:** Add default brand in feed generation:
```typescript
const brand = product.brand || 'Xpromo';
```

## 📈 Performance Optimization

### Cache Configuration
Current cache settings:
```typescript
'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
```

- **s-maxage=3600**: Cache for 1 hour
- **stale-while-revalidate=7200**: Serve stale content for 2 hours while revalidating

### Adjust for your needs:
- **High-frequency updates:** Reduce to 1800 (30 min)
- **Stable inventory:** Increase to 7200 (2 hours)

## 🔐 Security Considerations

1. **Feed is public:** Anyone can access the product feed (this is normal)
2. **Sensitive data:** Don't include internal costs, supplier info, etc.
3. **Rate limiting:** Consider adding rate limiting for production
4. **HTTPS only:** GMC requires HTTPS for feed URLs

## 📞 Support Contacts

- **Google Merchant Center Support:** https://support.google.com/merchants
- **Google Ads Support:** https://support.google.com/google-ads
- **Technical Issues:** Check implementation in `app/api/google-merchant-feed/route.ts`

## 🎓 Learning Resources

- [GMC Product Data Specification](https://support.google.com/merchants/answer/7052112)
- [Schema.org Product Documentation](https://schema.org/Product)
- [Google Shopping Best Practices](https://support.google.com/merchants/answer/6324372)
- [XML Sitemaps Protocol](https://www.sitemaps.org/protocol.html)

---

**Quick Tip:** Bookmark this page for easy reference! 🔖

