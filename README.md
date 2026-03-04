# Stromkostenrechner — Next.js SEO Website

## Setup

```bash
npm install
npm run dev       # Development: http://localhost:3000
npm run build     # Production build
npm run start     # Start production server
```

## SEO Features Implemented

### On-Page SEO
- **Title Tag**: Optimized with target keyword "Stromkostenrechner 2026" + secondary keywords
- **Meta Description**: Compelling 155-char description with keyword + CTA
- **H1**: Contains primary keyword "Stromkostenrechner 2026"
- **H2/H3 Hierarchy**: Proper semantic heading structure with LSI keywords
- **Keyword Density**: Natural use of: stromkostenrechner, stromverbrauch berechnen, stromkosten berechnen, kWh, kilowattstunden, strompreis
- **Canonical URL**: Prevents duplicate content
- **lang="de"**: Signals German content to Google

### Structured Data (Schema.org)
- `WebApplication` schema with feature list
- `FAQPage` schema for FAQ rich snippets in Google (increases CTR dramatically)

### Technical SEO
- `robots.txt` — allows all crawling
- `sitemap.xml` — helps Google discover and index
- **Open Graph** tags for social sharing
- **Twitter Card** meta tags
- Compressed output (`compress: true` in next.config.js)
- No `X-Powered-By` header (security + minor SEO)
- Fast loading — minimal dependencies

### Content SEO
- **2000+ words** of unique, keyword-rich German content
- Topics covered: how to calculate, average prices, biggest power consumers, savings tips, photovoltaik, average household consumption
- **FAQ section** with 6 common questions (also generates FAQ rich snippets)
- **Data table** with 12 common household appliances
- Internal anchor links (header nav)

## Deployment Recommendations

1. **Vercel** (best for Next.js): `vercel deploy`
2. Custom domain: `stromkostenrechner.de` (exact match domain = SEO boost)
3. Enable **HTTPS** (required for ranking)
4. Submit sitemap to **Google Search Console**
5. Set up **Google Analytics** to track organic traffic
6. Build **backlinks** from German energy/finance blogs
7. Update `lastmod` in sitemap.xml when content changes

## Calculation Logic

```
kWh/Tag     = (Watt × Stunden/Tag) / 1000
kWh/Woche   = kWh/Tag × Tage/Woche
kWh/Monat   = kWh/Woche × (365/12/7)  → exact: 4.3452...
kWh/Jahr    = kWh/Woche × 52
Kosten      = kWh × Strompreis (€/kWh)
```
# electricityCostDE
# electricityCostDE
