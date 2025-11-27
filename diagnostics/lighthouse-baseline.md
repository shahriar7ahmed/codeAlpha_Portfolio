# Lighthouse Baseline Report

## Test Date
To be run locally with: `npx lighthouse http://localhost:5173 --view`

## Expected Issues (Based on Bundle Analysis)

### Performance
- **Large Images**: 3.5MB total image size will significantly impact LCP (Largest Contentful Paint)
- **JS Bundle**: 383KB initial bundle may affect FCP (First Contentful Paint)
- **No Code Splitting**: All JS loaded upfront

### Accessibility
- Missing ARIA labels on interactive elements
- No keyboard navigation indicators
- Color contrast may need verification

### Best Practices
- Images not optimized (no WebP/AVIF)
- No lazy loading for below-fold images
- Missing meta tags (Open Graph, etc.)

### SEO
- Missing meta description
- Missing Open Graph tags
- No structured data

## Target Metrics
- **Performance**: Desktop ≥ 95, Mobile ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 90

## Notes
Run Lighthouse after each optimization phase to track improvements.

