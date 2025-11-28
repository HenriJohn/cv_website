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
          bg: 'var(--vscode-bg)',
          sidebar: 'var(--vscode-sidebar)',
          activityBar: 'var(--vscode-activityBar)',
          statusBar: 'var(--vscode-statusBar)',
          statusBarItem: 'var(--vscode-statusBarItem)',
          editor: 'var(--vscode-editor)',
          tabActive: 'var(--vscode-editor)',
          tabInactive: 'var(--vscode-tabInactive)',
          text: 'var(--vscode-text)',
          accent: 'var(--vscode-accent)',
          selection: 'var(--vscode-selection)',
          lineHighlight: 'var(--vscode-lineHighlight)',
          terminal: 'var(--vscode-terminal)',
          border: 'var(--vscode-border)',
        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
