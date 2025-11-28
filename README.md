# 🎯 VS Code Portfolio - Henri-John Plaatjies

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://henrijohn.github.io/cv_website/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff)](https://vitejs.dev/)

> An interactive portfolio website that perfectly replicates the Visual Studio Code interface, showcasing professional experience as a Senior Test Automation Engineer.

## 🎯 Overview

This project transforms a traditional CV into an immersive, interactive experience by recreating the complete Visual Studio Code environment. Every detail—from the file explorer to the integrated terminal—has been meticulously crafted to provide an authentic developer experience while presenting professional credentials.

**Live Site:** [henrijohn.github.io/cv_website](https://henrijohn.github.io/cv_website/)

## ✨ Key Features

### 🎨 **Authentic VS Code Experience**
- Pixel-perfect Dark+ and Light+ theme implementation
- Complete theme system with CSS variables for seamless switching
- Authentic VS Code color palette and typography
- Smooth theme transitions with no flickering

### 📁 **Interactive File Explorer**
- Collapsible folder structure
- File type icons (TypeScript, JSON, Markdown, PDF, ENV)
- Active file highlighting with accent color
- Click to open files in the editor

### 💻 **Fully Functional Editor**
- Syntax highlighting for multiple languages (TypeScript, JSON, Markdown)
- Interactive JSON viewer with collapsible sections
- Markdown preview with live rendering
- Multiple tab support with close functionality
- Line numbers and breadcrumb navigation

### 🖥️ **Working Terminal**
- Command execution with real output
- Command history (up/down arrow keys)
- Custom commands: `help`, `about`, `skills`, `experience`, `contact`, `theme`, `clear`
- Auto-complete suggestions
- Terminal minimize/maximize

### 🎯 **Test Automation Showcase**
- Dedicated page demonstrating test automation expertise
- Interactive components designed for comprehensive testing
- Dynamic content loading, form validation, search autocomplete
- Data tables with sorting and filtering
- Modal dialogs and toast notifications
- Perfect for Playwright/Selenium test demonstrations

### 📱 **Responsive Design**
- Fully responsive layout for desktop, tablet, and mobile
- Adaptive sidebar that collapses on smaller screens
- Touch-friendly interface elements
- Optimized performance across all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/cv_website/` in your browser.

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to GitHub Pages
```bash
# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Live Site

**Production:** https://henrijohn.github.io/cv_website/

The site is automatically deployed via GitHub Actions on every push to the `main` branch.

## 👨‍💻 About Me

**Henri-John Plaatjies**  
Senior Test Automation Engineer

- 📧 henriplaatjies@gmail.com
- 📱 082 389 1647
- 📍 Cape Town, South Africa

### Expertise
- **Test Automation**: Playwright, Selenium, Appium, Robot Framework
- **CI/CD Integration**: GitLab CI/CD, Jenkins, Docker, GitHub Actions
- **API Testing**: Postman, Newman, GraphQL, REST
- **Performance Testing**: JMeter, K6
- **Languages**: Java, JavaScript, TypeScript, Python, SQL
- **QA Leadership & Mentoring**

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with modern hooks and concurrent features
- **TypeScript 5.9** - Type-safe development with strict mode
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS with custom theme system

### UI & Styling
- **Lucide React** - Beautiful, consistent icon system
- **React Syntax Highlighter** - Code syntax highlighting with VS Code themes
- **React Markdown** - Markdown rendering with custom components
- **Custom CSS Variables** - Complete theme system for dark/light modes

### Development & Deployment
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Static site hosting
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

### Testing & Quality
- **Test IDs** - Comprehensive data-testid attributes for E2E testing
- **Playwright-ready** - Built with test automation in mind
- **Accessible** - Semantic HTML and ARIA labels

## 📁 Project Structure

```
cv_website/
├── src/
│   ├── components/       # React components (Layout, Editor, Terminal, etc.)
│   ├── context/          # React context for state management
│   ├── data/            # CV content and file system data
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles and theme
│   └── main.tsx         # App entry point
├── public/              # Static assets (CV PDF, favicon)
├── .github/workflows/   # GitHub Actions for auto-deployment
└── dist/               # Production build output (generated)
```

## 🎮 Terminal Commands

Type these commands in the terminal:

- `help` - Show all available commands
- `about` - Display profile summary
- `skills` - List technical skills
- `experience` - Show work experience
- `contact` - Show contact information
- `theme` - Toggle light/dark theme
- `clear` - Clear terminal output

## 📦 Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions including:
- GitHub Pages (current setup)
- Vercel
- Netlify
- cPanel/FTP

## 📝 Customization Guide

Want to use this template for your own portfolio? Here's how:

### 1. **Update Personal Information**
```typescript
// src/data/fileSystem.ts
- Update README.md content with your profile
- Modify skills.json with your technical skills
- Update experience folder with your work history
- Change education.md with your qualifications
- Update contact.env with your contact details
```

### 2. **Customize Theme Colors**
```css
/* src/index.css */
:root {
  --vscode-bg: #1e1e1e;        /* Main background */
  --vscode-accent: #007acc;     /* Accent color */
  /* Modify other CSS variables as needed */
}
```

### 3. **Replace Assets**
- Replace `public/cv.pdf` with your CV
- Update `public/vite.svg` with your logo
- Modify favicon in `index.html`

### 4. **Update Configuration**
```json
// package.json
{
  "homepage": "https://yourusername.github.io/your-repo-name/"
}
```

### 5. **Deploy**
```bash
npm run deploy
```

## 🧪 Testing

This project is built with test automation in mind:

### Test Automation Features
- **Comprehensive test IDs** - Every interactive element has a `data-testid`
- **Showcase page** - Dedicated `/test-showcase` route with test components
- **Stable selectors** - Consistent naming conventions for reliable tests
- **Test documentation** - See `PLAYWRIGHT_TEST_IDS.md` for all test IDs

### Example Playwright Test
```typescript
import { test, expect } from '@playwright/test';

test('should navigate and open README', async ({ page }) => {
  await page.goto('https://henrijohn.github.io/cv_website/');
  await page.getByTestId('file-tree-item-readme-md').click();
  await expect(page.getByTestId('editor-tab-readme-md')).toBeVisible();
});
```

## 🚀 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: SVG icons for crisp rendering

## 🤝 Contributing

While this is a personal portfolio, contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

See [LICENSE](LICENSE) for more information.

## 🙏 Acknowledgments

- **VS Code** - For the amazing editor that inspired this project
- **React Community** - For the excellent libraries and tools
- **Tailwind CSS** - For the utility-first CSS framework

---

<div align="center">

**Built with ❤️ and ☕ by Henri-John Plaatjies**

[Portfolio](https://henrijohn.github.io/cv_website/) • [LinkedIn](https://linkedin.com/in/henri-john-plaatjies) • [Email](mailto:henriplaatjies@gmail.com)

*Last Updated: November 2025*

</div>
