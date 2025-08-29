# ISTA Website Deployment Guide

This guide will help you deploy the ISTA website to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended - Free)

1. **Sign up/Login** to [Netlify](https://netlify.com)
2. **Drag & Drop** the entire `ista-website` folder to Netlify's deploy area
3. **Wait** for deployment to complete
4. **Get** your live URL (e.g., `https://random-name.netlify.app`)
5. **Customize** the URL in Netlify settings

**Alternative Method (Git):**

```bash
# Push to GitHub first, then connect Netlify to your repository
git add .
git commit -m "Initial ISTA website"
git push origin main
```

### 2. Vercel (Free)

1. **Sign up/Login** to [Vercel](https://vercel.com)
2. **Import** your GitHub repository
3. **Configure** build settings (not needed for static site)
4. **Deploy** automatically

### 3. GitHub Pages (Free)

1. **Create** a new repository on GitHub
2. **Upload** all files to the repository
3. **Go to** Settings > Pages
4. **Select** source branch (main)
5. **Save** and wait for deployment

### 4. Firebase Hosting (Free)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init hosting

# Deploy
firebase deploy
```

## 🌐 Custom Domain Setup

### 1. Purchase a Domain

- **Recommended**: Namecheap, GoDaddy, or Google Domains
- **Domain suggestions**: `ista-app.com`, `istawellness.com`, `digitalista.com`

### 2. Configure DNS

#### For Netlify:

1. **Add** custom domain in Netlify dashboard
2. **Update** DNS records at your domain provider:

   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app

   Type: A
   Name: @
   Value: 75.2.60.5
   ```

#### For Vercel:

1. **Add** domain in Vercel dashboard
2. **Update** DNS records:

   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.19
   ```

### 3. SSL Certificate

- **Automatic**: Most platforms provide free SSL
- **Manual**: Upload certificate if needed

## 📱 PWA Configuration

### 1. Generate Icons

Create app icons in various sizes:

- 16x16, 32x32, 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

**Online Tools:**

- [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- [Favicon Generator](https://realfavicongenerator.net/)

### 2. Update Manifest

Edit `manifest.json` with your app details:

```json
{
  "name": "ISTA - Digital Wellness App",
  "short_name": "ISTA",
  "description": "Your app description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#2563eb",
  "theme_color": "#2563eb"
}
```

### 3. Test PWA

- **Chrome DevTools**: Application tab
- **Lighthouse**: PWA audit
- **Mobile**: Add to home screen

## 🔧 Environment Configuration

### 1. Update URLs

Replace placeholder URLs in `index.html`:

```html
<!-- Update these URLs -->
<meta property="og:url" content="https://your-domain.com/" />
<meta property="og:image" content="https://your-domain.com/og-image.png" />
```

### 2. Analytics Setup

Add Google Analytics or other tracking:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Social Media

Update social media links in footer:

```html
<a href="https://twitter.com/ista_app">Twitter</a>
<a href="https://instagram.com/ista_app">Instagram</a>
```

## 📊 Performance Optimization

### 1. Image Optimization

- **Compress** images using tools like TinyPNG
- **Use** WebP format when possible
- **Implement** lazy loading

### 2. Caching

- **Browser caching**: Configure in hosting platform
- **CDN**: Use Cloudflare or similar
- **Service Worker**: Already implemented

### 3. Compression

- **Gzip**: Enable in hosting platform
- **Brotli**: Modern compression algorithm

## 🔍 SEO Setup

### 1. Meta Tags

Already included in `index.html`:

- Title, description, keywords
- Open Graph tags
- Twitter Card tags

### 2. Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Robots.txt

Create `robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

## 🧪 Testing Checklist

### Before Deployment

- [ ] All links work correctly
- [ ] Language switching works
- [ ] Responsive design on all devices
- [ ] PWA features functional
- [ ] Performance scores > 90
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility

### After Deployment

- [ ] Website loads correctly
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] Analytics tracking
- [ ] Social media sharing
- [ ] Mobile app store links
- [ ] Contact forms (if added)

## 🚨 Troubleshooting

### Common Issues

#### 1. Language Switching Not Working

- Check browser console for errors
- Verify localStorage is enabled
- Test in incognito mode

#### 2. PWA Not Installing

- Check manifest.json syntax
- Verify service worker registration
- Test on HTTPS

#### 3. Images Not Loading

- Check file paths
- Verify image files exist
- Test with different browsers

#### 4. Performance Issues

- Optimize images
- Minify CSS/JS
- Enable compression
- Use CDN

### Support

- **Documentation**: Check README.md
- **Issues**: Create GitHub issue
- **Community**: Stack Overflow

## 📈 Monitoring

### 1. Performance Monitoring

- **Google PageSpeed Insights**
- **WebPageTest**
- **Lighthouse CI**

### 2. Analytics

- **Google Analytics**
- **Hotjar** (user behavior)
- **Uptime Robot** (availability)

### 3. Error Tracking

- **Sentry** (JavaScript errors)
- **LogRocket** (session replay)

## 🔄 Updates & Maintenance

### 1. Regular Updates

- **Security patches**
- **Performance improvements**
- **Content updates**
- **Feature additions**

### 2. Backup Strategy

- **Version control** (Git)
- **Hosting backups**
- **Database backups** (if applicable)

### 3. Monitoring

- **Uptime monitoring**
- **Performance tracking**
- **User feedback**

---

**Need Help?** Contact the development team or create an issue in the repository.
