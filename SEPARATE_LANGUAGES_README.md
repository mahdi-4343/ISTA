# ISTA Website - Separate Language Structure

## Overview

The ISTA website has been refactored to have completely separate HTML, CSS, and JavaScript files for English and Persian versions, as requested. This structure provides better maintainability, proper RTL support, and eliminates any overlap issues with language switching.

## New Structure

```
ista-website/
├── index.html                 # Main redirect page with language detection
├── en/                        # English version (LTR)
│   ├── index.html            # English HTML
│   ├── styles.css            # English CSS with LTR support
│   ├── script.js             # English JavaScript
│   └── cursor-style.css      # English Cursor-style design
├── fa/                        # Persian version (RTL)
│   ├── index.html            # Persian HTML with RTL
│   ├── styles.css            # Persian CSS with RTL support
│   ├── script.js             # Persian JavaScript
│   └── cursor-style.css      # Persian Cursor-style design
├── sw.js                      # Service Worker (shared)
├── manifest.json             # PWA Manifest (shared)
└── README.md                 # Main documentation
```

## Key Changes Made

### 1. Separate HTML Files

**English (`en/index.html`):**

- `lang="en"` and `dir="ltr"`
- English content throughout
- Language switcher points to Persian version
- Pricing section with USD pricing

**Persian (`fa/index.html`):**

- `lang="fa"` and `dir="rtl"`
- Persian content throughout
- Language switcher points to English version
- Pricing section with Iranian Toman pricing
- Persian numbers (۱۰K+, ۲.۵M, etc.)

### 2. Separate CSS Files

**English (`en/styles.css`):**

- LTR (left-to-right) layout
- English font stack (Inter primary)
- Left-aligned navigation underlines
- Left-positioned skip links and toasts

**Persian (`fa/styles.css`):**

- RTL (right-to-left) layout
- Persian font stack (Vazirmatn primary)
- Right-aligned navigation underlines
- Right-positioned skip links and toasts
- RTL-specific animations and transforms

### 3. Separate JavaScript Files

**English (`en/script.js`):**

- LTR-specific animations
- English error messages
- Left-positioned toast notifications

**Persian (`fa/script.js`):**

- RTL-specific animations
- Persian error messages ("مشکلی پیش آمد. لطفاً دوباره تلاش کنید.")
- Right-positioned toast notifications

### 4. Pricing Section Added

Both versions now include a comprehensive pricing section with:

**English Pricing:**

- Free: $0/month
- Pro: $4.99/month (Most Popular)
- Premium: $9.99/month

**Persian Pricing:**

- رایگان: ۰ تومان/ماه
- حرفه‌ای: ۱۵۰,۰۰۰ تومان/ماه (محبوب‌ترین)
- پریمیوم: ۳۰۰,۰۰۰ تومان/ماه

### 5. App Usage Functionality Removed

- Removed all interactive app demo features
- Removed timer functionality from JavaScript
- Removed app usage tracking features
- Simplified to showcase-only functionality

### 6. Language Switcher Improvements

- No overlap with other navigation elements
- Proper positioning in both LTR and RTL layouts
- Clear visual indicators (flag icons + text)
- Smooth transitions between languages

## Features Maintained

### ✅ Cursor-Style Design

- Dark theme with gradient accents
- Interactive hover effects
- Smooth animations
- Modern typography
- Responsive design

### ✅ Accessibility

- Skip links for keyboard navigation
- ARIA labels and roles
- Focus management
- Screen reader support
- Reduced motion support

### ✅ Performance

- Lazy loading for images
- Service Worker for caching
- Optimized animations
- Minimal JavaScript footprint

### ✅ SEO

- Proper meta tags for each language
- Structured data
- Open Graph and Twitter Card support
- Language-specific URLs

## Language Detection

The main `index.html` file includes:

1. **Stored Preference**: Checks `localStorage` for previously selected language
2. **Browser Detection**: Detects browser language settings
3. **Manual Override**: Users can manually switch languages
4. **Default Fallback**: Defaults to English if no preference detected

## RTL Support Details

### CSS RTL Adjustments

- `direction: rtl` and `text-align: right`
- Reversed margins and paddings where needed
- Right-aligned navigation underlines
- Right-positioned toasts and skip links
- RTL-specific phone mockup transforms

### JavaScript RTL Adjustments

- RTL-specific animation directions
- Persian error messages
- Right-positioned toast notifications
- RTL-aware focus management

### Font Support

- **English**: Inter font family
- **Persian**: Vazirmatn font family (with Inter fallback)
- **Monospace**: JetBrains Mono for both

## Navigation Structure

Both versions include:

- Home
- Features
- Screenshots
- **Pricing** (NEW)
- Download

## Deployment Considerations

1. **Server Configuration**: Ensure proper handling of language-specific routes
2. **CDN**: Consider separate caching strategies for each language
3. **Analytics**: Track language preferences and usage
4. **SEO**: Implement proper hreflang tags for language variants

## Maintenance

### Adding New Content

1. Update both `en/index.html` and `fa/index.html`
2. Update both CSS files if new styles are needed
3. Update both JavaScript files if new functionality is added
4. Test both LTR and RTL layouts

### Styling Changes

- Make changes in both `en/styles.css` and `fa/styles.css`
- Pay attention to RTL-specific adjustments
- Test both language versions

### JavaScript Changes

- Update both `en/script.js` and `fa/script.js`
- Consider RTL-specific behavior
- Test error messages in both languages

## Benefits of This Structure

1. **No Overlap**: Language switcher has dedicated space
2. **Proper RTL**: Full right-to-left support for Persian
3. **Maintainability**: Clear separation of concerns
4. **Performance**: No unnecessary language switching overhead
5. **SEO**: Proper language-specific URLs and content
6. **Accessibility**: Language-specific accessibility features
7. **User Experience**: Smooth, native-feeling language transitions

## Testing Checklist

- [ ] English version loads correctly
- [ ] Persian version loads correctly
- [ ] Language switching works smoothly
- [ ] RTL layout displays properly
- [ ] Pricing section shows correct currency
- [ ] Navigation highlights work in both languages
- [ ] Mobile responsiveness in both languages
- [ ] Accessibility features work in both languages
- [ ] No app usage functionality present
- [ ] Language switcher doesn't overlap with other elements

This structure provides a robust, maintainable, and user-friendly multilingual website that meets all the specified requirements.
