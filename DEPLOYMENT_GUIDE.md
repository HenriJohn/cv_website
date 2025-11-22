# 🚀 Deployment Guide - Henri-John Plaatjies Portfolio

## ✅ Your Website is Ready!

Your VS Code-style portfolio website is ready to deploy.

---

## 📦 Deploy to GitHub Pages (Current Setup)

Your site is automatically deployed to GitHub Pages via GitHub Actions!

**Live Site:** https://henrijohn.github.io/cv_website/

Every time you push to the `main` branch, the site automatically rebuilds and deploys.

---

## 🌐 Alternative Deployment Options

### Option 1: Vercel (Recommended for React/Vite)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your site will be live!

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Option 3: cPanel/FTP

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload via FTP:
   - Use your hosting provider's FTP credentials
   - Upload all files from `dist/` to your `public_html/` directory

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📝 Making Updates

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. GitHub Actions will automatically deploy!

---

## 🎨 Customization Tips

- **Colors**: Edit `src/index.css` for theme colors
- **Content**: Update `src/data/fileSystem.ts` for CV content
- **Components**: Modify files in `src/components/`
- **Styling**: Uses Tailwind CSS - check `tailwind.config.js`

---

**Need help?** Check the README.md for more information!
