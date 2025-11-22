# Henri-John Plaatjies - VS Code Portfolio Website

> An interactive portfolio website designed to look and feel like Visual Studio Code

## 🎯 About

This is a unique portfolio website that mimics the Visual Studio Code interface, showcasing my experience as a **Senior Test Automation Engineer**. The website presents my CV content in an interactive, developer-friendly format.

## ✨ Features

- 🎨 **Authentic VS Code Dark+ Theme** - Pixel-perfect color matching
- 📁 **Interactive File Explorer** - Navigate through CV sections like files
- 💻 **Syntax-Highlighted Editor** - View experience, skills, and education as code
- 🖥️ **Functional Terminal** - Run commands to view CV information
- 📊 **Professional Status Bar** - Real VS Code-style status indicators
- 📱 **Fully Responsive** - Works on all devices (desktop, tablet, mobile)
- 🌓 **Theme Toggle** - Switch between dark and light themes
- 📥 **CV Download** - Download PDF version of CV

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

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Syntax Highlighting**: Prism.js with VS Code Dark+ theme
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

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

## 📝 Customization

To customize this portfolio for your own use:

1. Update CV content in `src/data/fileSystem.ts`
2. Modify colors in `src/index.css`
3. Update contact info in `README.md` and `src/data/fileSystem.ts`
4. Replace `public/cv.pdf` with your own CV
5. Update `package.json` homepage URL

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it and create your own version!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

---

**Built with ❤️ by Henri-John Plaatjies**  
*Last Updated: November 2025*
