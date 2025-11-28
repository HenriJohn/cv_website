# Playwright Test IDs Reference

This document lists all `data-testid` attributes available for Playwright automation testing.

## Title Bar
- `title-bar` - Main title bar container
- `vscode-logo` - VS Code logo icon
- `menu-bar` - Menu bar container
- `menu-file` - File menu item
- `menu-edit` - Edit menu item
- `menu-selection` - Selection menu item
- `menu-view` - View menu item
- `menu-go` - Go menu item
- `menu-run` - Run menu item
- `menu-terminal` - Terminal menu item
- `menu-help` - Help menu item
- `window-controls` - Window controls container
- `window-minimize` - Minimize button
- `window-maximize` - Maximize button
- `window-close` - Close button

## Activity Bar
- `activity-bar` - Activity bar container
- `toggle-sidebar-btn` - Toggle sidebar visibility button
- `toggle-theme-btn` - Toggle light/dark theme button

## Sidebar (Explorer)
- `sidebar` - Sidebar container
- `sidebar-title` - "Explorer" title
- `portfolio-section-toggle` - Portfolio section collapse/expand toggle
- `file-tree-item-{filename}` - Individual file/folder items (dynamic based on filename)
  - Examples:
    - `file-tree-item-portfolio` - Portfolio folder
    - `file-tree-item-readme-md` - README.md file
    - `file-tree-item-skills-json` - skills.json file
    - `file-tree-item-experience` - experience folder
    - `file-tree-item-education-md` - education.md file
    - `file-tree-item-contact-env` - contact.env file
    - `file-tree-item-download-cv-pdf` - download-cv.pdf file

## Editor
- `editor` - Editor container
- `editor-tabs` - Tabs container
- `editor-tab-{filename}` - Individual tab (dynamic based on filename)
  - Examples:
    - `editor-tab-readme-md`
    - `editor-tab-skills-json`
    - `editor-tab-education-md`
- `close-tab-{filename}` - Close tab button (dynamic based on filename)
  - Examples:
    - `close-tab-readme-md`
    - `close-tab-skills-json`

## Terminal
- `terminal` - Terminal container
- `terminal-tab` - Terminal tab label
- `terminal-clear-btn` - Clear terminal button
- `terminal-toggle-btn` - Minimize/maximize terminal button
- `terminal-input` - Terminal input field

## Status Bar
- `status-bar` - Status bar container
- `status-git-branch` - Git branch indicator
- `status-errors` - Errors/warnings counter
- `status-position` - Line and column position
- `status-spaces` - Indentation setting
- `status-encoding` - File encoding (UTF-8)
- `status-language` - Language mode
- `status-notifications` - Notifications bell icon

## Usage Examples

### Playwright Test Examples

```typescript
import { test, expect } from '@playwright/test';

test('should toggle sidebar', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Toggle sidebar
  await page.getByTestId('toggle-sidebar-btn').click();
  await expect(page.getByTestId('sidebar')).not.toBeVisible();
  
  await page.getByTestId('toggle-sidebar-btn').click();
  await expect(page.getByTestId('sidebar')).toBeVisible();
});

test('should open file from sidebar', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Click on README.md
  await page.getByTestId('file-tree-item-readme-md').click();
  
  // Verify tab is opened
  await expect(page.getByTestId('editor-tab-readme-md')).toBeVisible();
});

test('should toggle theme', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Toggle theme
  await page.getByTestId('toggle-theme-btn').click();
  
  // Verify theme changed (check for light theme class)
  await expect(page.locator('html')).toHaveClass(/light/);
});

test('should type command in terminal', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Type help command
  await page.getByTestId('terminal-input').fill('help');
  await page.getByTestId('terminal-input').press('Enter');
  
  // Verify output contains help text
  await expect(page.getByTestId('terminal')).toContainText('Available commands');
});

test('should close editor tab', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Open a file
  await page.getByTestId('file-tree-item-skills-json').click();
  
  // Close the tab
  await page.getByTestId('close-tab-skills-json').click();
  
  // Verify tab is closed
  await expect(page.getByTestId('editor-tab-skills-json')).not.toBeVisible();
});

test('should minimize and maximize terminal', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Minimize terminal
  await page.getByTestId('terminal-toggle-btn').click();
  
  // Verify terminal is minimized (check height)
  const terminal = page.getByTestId('terminal');
  await expect(terminal).toHaveClass(/h-\[35px\]/);
  
  // Maximize terminal
  await page.getByTestId('terminal-toggle-btn').click();
  await expect(terminal).toHaveClass(/h-48|h-56/);
});

test('should clear terminal', async ({ page }) => {
  await page.goto('http://localhost:5173/cv_website/');
  
  // Type some commands
  await page.getByTestId('terminal-input').fill('help');
  await page.getByTestId('terminal-input').press('Enter');
  
  // Clear terminal
  await page.getByTestId('terminal-clear-btn').click();
  
  // Verify terminal is empty (only welcome message should remain)
  const terminalContent = await page.getByTestId('terminal').textContent();
  expect(terminalContent).not.toContain('Available commands');
});
```

## Notes

- All file/folder test IDs are dynamically generated by converting the filename to lowercase and replacing non-alphanumeric characters with hyphens
- Test IDs are stable and won't change unless the component structure changes
- Use `getByTestId()` for reliable element selection in Playwright tests
- All interactive elements have test IDs for comprehensive test coverage
