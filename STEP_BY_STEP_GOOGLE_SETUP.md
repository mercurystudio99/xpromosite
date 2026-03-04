# 📝 Step-by-Step Guide: Submit Your Site to Google

## 🎯 Overview
This guide shows you exactly how to submit your Xpromo site to Google Search Console and Google Merchant Center. Follow each step carefully.

**Time Required:**
- Google Search Console: 15-20 minutes
- Google Merchant Center: 20-30 minutes

---

# Part 1: Google Search Console (GSC)

## 📍 What This Does:
- Tells Google about your website
- Submits your sitemaps for indexing
- Lets you monitor search performance
- Shows any errors Google finds

---

## Step 1: Create/Login to Google Search Console

### 1.1 Go to Google Search Console
- Open your browser
- Go to: **https://search.google.com/search-console**
- Click **"Start now"** or **"Sign in"**

### 1.2 Sign In
- Use your Google account (Gmail)
- If you don't have one, click **"Create account"**
- Sign in with your credentials

✅ **Result:** You're now at the Google Search Console dashboard

---

## Step 2: Add Your Property (Website)

### 2.1 Add Property
- Click the property selector at the top (says "Search property")
- Click **"+ Add property"**

### 2.2 Choose Property Type
You'll see TWO options:

**Option A: Domain** (Recommended)
- Enter: `xpromo.com.au`
- Click **"Continue"**

**Option B: URL Prefix**
- Enter: `https://xpromo.com.au`
- Click **"Continue"**

👉 **I recommend Option A (Domain)** - it covers all versions (www, non-www, http, https)

✅ **Result:** Google now asks you to verify ownership

---

## Step 3: Verify Ownership

Google will show you several verification methods. Choose the easiest one:

### Method 1: HTML File Upload (Easiest for You)

#### 3.1 Download Verification File
- Google shows a file like: `google1234567890abcdef.html`
- Click **"Download"** button
- Save the file to your computer

#### 3.2 Upload to Your Website
You need to upload this file to: `https://xpromo.com.au/google1234567890abcdef.html`

**For Next.js (your site):**
```bash
# Put the file in your public folder
# Copy the downloaded file to:
D:\Project\xpromo\public\google1234567890abcdef.html

# Then deploy your site
npm run build
# Deploy to production
```

#### 3.3 Verify
- After uploading and deploying, go back to Google Search Console
- Click **"Verify"** button
- Wait 5-10 seconds

✅ **Success Message:** "Ownership verified"

---

### Method 2: DNS Verification (Alternative)

If you have access to your domain DNS settings:

#### 3.1 Get TXT Record
- Google shows a TXT record like: `google-site-verification=abc123xyz789`

#### 3.2 Add to DNS
- Go to your domain registrar (where you bought xpromo.com.au)
- Find DNS settings
- Add new TXT record:
  - **Type:** TXT
  - **Host:** @ (or leave blank)
  - **Value:** `google-site-verification=abc123xyz789`
  - **TTL:** 3600

#### 3.3 Verify
- Wait 10-30 minutes for DNS to propagate
- Click **"Verify"** in Google Search Console

✅ **Result:** Website verified!

---

## Step 4: Submit Your Sitemaps

### 4.1 Go to Sitemaps Section
- In the left sidebar, click **"Sitemaps"**
- You'll see a page titled "Sitemaps"

### 4.2 Add Sitemap Index
- Find the box that says **"Add a new sitemap"**
- In the text field, enter: `api/sitemap-index`
- Click **"Submit"**

✅ **Result:** Status shows "Success" (may take a few minutes)

### 4.3 Add Individual Sitemaps (Optional but Recommended)
Add these one by one:

1. Enter: `api/sitemap-products`
   - Click **"Submit"**

2. Enter: `api/sitemap-categories`
   - Click **"Submit"**

3. Enter: `api/sitemap-pages`
   - Click **"Submit"**

✅ **Result:** All 4 sitemaps submitted!

---

## Step 5: Check Sitemap Status

### 5.1 Wait for Processing
- It may take 24-48 hours for Google to process
- Check back in 1-2 days

### 5.2 View Status
- Go to **Sitemaps** section
- You'll see a table with:
  - **Submitted:** Number of URLs you submitted
  - **Indexed:** Number of URLs Google indexed
  - **Status:** "Success" (green) or error messages

### 5.3 What Success Looks Like
```
Sitemap: api/sitemap-index
Status: Success ✅
Last read: 2 hours ago
Submitted: 500
Indexed: 450 (will increase over time)
```

✅ **Done!** Google Search Console is complete!

---

# Part 2: Google Merchant Center (GMC)

## 📍 What This Does:
- Lists your products in Google Shopping
- Shows products in search results with images/prices
- Enables Shopping ads (if you want to run paid ads)
- Free product listings in Google Shopping tab

---

## Step 1: Create Google Merchant Center Account

### 1.1 Go to Google Merchant Center
- Open browser
- Go to: **https://merchants.google.com**
- Click **"Get started"** or **"Sign in"**

### 1.2 Sign In
- Use the SAME Google account as Search Console
- Sign in with your credentials

### 1.3 Choose Account Type
- Select **"Manage your products on Google"**
- Click **"Continue"**

✅ **Result:** You're at the account creation screen

---

## Step 2: Set Up Your Business Information

### 2.1 Enter Business Name
- **Business name:** `Xpromo`
- Click **"Continue"**

### 2.2 Select Country
- **Country where your business is based:** Australia 🇦🇺
- **Time zone:** `(GMT+10:00) Australian Eastern Time`
- Click **"Continue"**

### 2.3 Choose Business Type (if asked)
- Select: **Online store with physical location** or **Online only**
- Click **"Continue"**

✅ **Result:** Basic info saved

---

## Step 3: Verify and Claim Your Website

### 3.1 Enter Website URL
- **Website URL:** `https://xpromo.com.au`
- Click **"Continue"**

### 3.2 Verify Website
GMC will check if you already verified in Search Console:

**If Already Verified in GSC:**
- ✅ Green checkmark appears
- Shows: "Website verified"
- Click **"Continue"**

**If Not Verified:**
- Follow the same steps as GSC verification above
- Use HTML file upload or DNS method

### 3.3 Claim Website
- Click **"Claim website"**
- Choose method:
  - **Recommended:** HTML tag (easiest)
  - Alternative: DNS record

**HTML Tag Method:**
- GMC shows a meta tag like:
  ```html
  <meta name="google-site-verification" content="abc123xyz789">
  ```
- I'll add this to your site (let me know if you need help)
- Click **"Verify and claim"**

✅ **Result:** Website verified and claimed!

---

## Step 4: Configure Shipping and Tax Settings

### 4.1 Go to Shipping Settings
- Click **"Tools"** icon (wrench) in top menu
- Click **"Shipping and returns"**
- Click **"Add shipping service"**

### 4.2 Create Shipping Service
Fill in the form:

- **Service name:** `Standard Shipping`
- **Delivery time:** 
  - **Min:** 3 days
  - **Max:** 7 days
- **Shipping cost:**
  - **Option 1 (Free Shipping):** `0 AUD`
  - **Option 2 (Flat Rate):** Set your rate (e.g., `9.95 AUD`)
- **Country:** Australia
- Click **"Save"**

### 4.3 Tax Settings
- Click **"Tools"** → **"Tax"**
- **For Australia:** Tax is usually included in price
- Select: **"My prices include tax (GST)"**
- GST rate: `10%`
- Click **"Save"**

✅ **Result:** Shipping and tax configured!

---

## Step 5: Create Product Feed

### 5.1 Go to Products Section
- Click **"Products"** in the left sidebar
- Click **"Feeds"**
- Click the blue **"+"** button (or **"Create feed"**)

### 5.2 Select Country and Language
- **Country of sale:** Australia 🇦🇺
- **Language:** English
- **Destinations:** 
  - ✅ Check **"Shopping ads"**
  - ✅ Check **"Free listings"**
- Click **"Continue"**

### 5.3 Name Your Feed
- **Feed name:** `Xpromo Products`
- Click **"Continue"**

### 5.4 Choose Input Method
Select: **"Scheduled fetch"**
- This means Google will automatically fetch from your website
- Click **"Continue"**

### 5.5 Enter Feed URL
This is the MOST IMPORTANT step:

- **Feed URL:** `https://xpromo.com.au/api/google-merchant-feed`
- **Fetch frequency:** 
  - Select **"Daily"** (or choose specific hours)
  - **Recommended:** Every 12 hours
- **Time:** Choose off-peak hours
  - **Option 1:** 02:00 (2 AM AEST)
  - **Option 2:** 14:00 (2 PM AEST)
- Click **"Create feed"**

✅ **Result:** Feed created successfully!

---

## Step 6: Fetch and Test Your Feed

### 6.1 Manual Fetch (First Time)
- You should see your new feed: **"Xpromo Products"**
- Status shows: **"Never fetched"**
- Click the **"..."** (three dots) next to your feed
- Click **"Fetch now"**

### 6.2 Wait for Processing
- A spinner appears: "Fetching feed..."
- This takes 1-5 minutes
- **Don't close the page!**

### 6.3 Check Results
After fetching completes, you'll see:

**Success Screen:**
```
Feed name: Xpromo Products
Status: ✅ Active
Products found: 500 (your number)
Approved: 480
Pending: 20
Disapproved: 0
```

**If You See Errors:**
- Click on the feed name
- Click **"Diagnostics"** tab
- Shows which products have issues
- Common issues:
  - Image too small (need 800x800 minimum)
  - Description too short (need 50+ characters)
  - Missing required fields

---

## Step 7: Monitor and Fix Issues

### 7.1 Check Diagnostics Tab
- Click your feed name: **"Xpromo Products"**
- Click **"Diagnostics"** tab
- Shows:
  - **Critical issues:** Fix immediately
  - **Warnings:** Fix when possible
  - **Suggestions:** Optional improvements

### 7.2 Common Issues and Fixes

**Issue 1: Image Quality**
```
Error: "Image too small"
Fix: Product images must be at least 800x800 pixels
```

**Issue 2: Missing Description**
```
Error: "Description too short"
Fix: Descriptions must be at least 50 characters
```

**Issue 3: Missing Price**
```
Error: "Missing price"
Fix: Check that all products have valid prices in database
```

**Issue 4: Invalid GTIN**
```
Warning: "Missing GTIN"
Fix: This is okay! Your feed already has:
      <g:identifier_exists>no</g:identifier_exists>
```

### 7.3 Export Product Issues
- Click **"Download"** button
- Save CSV file
- Fix issues in your database
- Wait for next automatic fetch (or click "Fetch now")

✅ **Result:** Issues identified and fixed!

---

## Step 8: Link to Google Ads (Optional)

### 8.1 Link Google Ads Account
- Click **"Tools"** (wrench icon)
- Click **"Linked accounts"**
- Click **"Google Ads"**
- Click **"Link account"**

### 8.2 Enter Google Ads Customer ID
- Enter your Google Ads Customer ID (format: 123-456-7890)
- Click **"Send link request"**

### 8.3 Approve Link
- Go to your Google Ads account
- Approve the link request

✅ **Result:** Can now run Shopping ads!

---

# 🎉 Verification Checklist

## ✅ Google Search Console
- [ ] Account created
- [ ] Website added: xpromo.com.au
- [ ] Ownership verified (HTML file or DNS)
- [ ] Sitemap submitted: api/sitemap-index
- [ ] Additional sitemaps submitted (products, categories, pages)
- [ ] Status shows "Success"

## ✅ Google Merchant Center
- [ ] Account created
- [ ] Business info entered (name, country, time zone)
- [ ] Website verified and claimed
- [ ] Shipping settings configured
- [ ] Tax settings configured
- [ ] Product feed created: "Xpromo Products"
- [ ] Feed URL entered: https://xpromo.com.au/api/google-merchant-feed
- [ ] Fetch schedule set: Every 12 hours
- [ ] First fetch completed successfully
- [ ] Products approved (check Diagnostics tab)
- [ ] No critical errors
- [ ] (Optional) Google Ads linked

---

# 📊 What to Expect After Submission

## Week 1
- Google starts crawling your sitemaps
- GMC processes your product feed
- Some products appear in Google Shopping
- Search Console shows indexing progress

## Week 2-4
- More products indexed
- Start seeing impressions in GMC
- Products appear in search results
- Rich snippets may appear

## Month 2-3
- Steady growth in impressions
- Regular traffic from Google Shopping
- Search rankings improve
- Rich snippets for most products

## Month 3+
- Significant organic traffic increase
- Hundreds/thousands of GMC impressions
- Products ranking for keywords
- Rich snippets showing stars/prices

---

# 🆘 Troubleshooting

## Problem: "Couldn't fetch sitemap"
**Solution:**
- Check if URL is accessible: `curl https://xpromo.com.au/api/sitemap-index`
- Make sure site is deployed
- Wait 24 hours and try again

## Problem: "Couldn't verify website"
**Solution:**
- Check if verification file is in correct location: `/public/google123.html`
- Make sure file is deployed to production
- Try DNS verification instead

## Problem: "Feed fetch failed"
**Solution:**
- Check if URL works in browser: https://xpromo.com.au/api/google-merchant-feed
- Should show XML with products
- Check for server errors (500/503)
- Verify database connection

## Problem: "Many products disapproved"
**Solution:**
- Click feed → Diagnostics tab
- Download error report (CSV)
- Common fixes:
  - Upload larger images (800x800+)
  - Add longer descriptions (50+ chars)
  - Check all products have prices
  - Ensure products are active

## Problem: "No products showing in Google Shopping"
**Solution:**
- Check GMC Diagnostics: 0 critical errors
- Wait 1-2 weeks for Google to index
- Make sure you selected "Free listings" destination
- Check feed schedule is running

---

# 📞 Need Help?

If you get stuck at any step:

1. **Check Status:**
   - GSC: Look for green checkmarks ✅
   - GMC: Status should be "Active"

2. **Read Error Messages:**
   - Google usually explains what's wrong
   - Follow the suggested fix

3. **Common Fixes:**
   - Wait 24 hours (many things take time)
   - Try manual fetch in GMC
   - Check URLs in browser first
   - Verify site is deployed

4. **Resources:**
   - [Google Search Console Help](https://support.google.com/webmasters)
   - [Google Merchant Center Help](https://support.google.com/merchants)

---

# 🎯 Quick Reference

## Your Important URLs
```
Website:           https://xpromo.com.au
Sitemap Index:     https://xpromo.com.au/api/sitemap-index
Products Sitemap:  https://xpromo.com.au/api/sitemap-products
Categories Sitemap: https://xpromo.com.au/api/sitemap-categories
Pages Sitemap:     https://xpromo.com.au/api/sitemap-pages
GMC Feed:          https://xpromo.com.au/api/google-merchant-feed
```

## Access Your Accounts
```
Google Search Console: https://search.google.com/search-console
Google Merchant Center: https://merchants.google.com
```

---

**Time to Complete:** 30-50 minutes total
**Difficulty:** Easy (just follow the steps!)
**Result:** Your site fully integrated with Google! 🎉

---

*Last Updated: October 2025*
*Created for: Xpromo (xpromo.com.au)*

