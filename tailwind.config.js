/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          activityBar: '#333333',
          statusBar: '#007acc',
          statusBarItem: '#ffffff',
          editor: '#1e1e1e',
          tabActive: '#1e1e1e',
          tabInactive: '#2d2d2d',
          text: '#d4d4d4',
          accent: '#007acc',
          selection: '#264f78',
          lineHighlight: '#2f3139',
          terminal: '#1e1e1e',
        }
      }
    },
  },
  plugins: [],
}
