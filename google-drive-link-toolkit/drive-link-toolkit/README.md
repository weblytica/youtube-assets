# Drive Link Toolkit

A Chrome extension that detects when you're on a Google Drive, Docs, Sheets, Slides, Forms, or Drawings page, extracts the file ID, and gives you one-click access to every useful link variant — share, edit, export (PDF/DOCX/XLSX/CSV/PPTX/SVG/PNG/...), direct download, embed/preview, and thumbnails.

## Features

- Auto-detects file ID and type from the active tab
- Paste any Google Drive URL or raw file ID
- Generates type-specific link variants (Docs export, Sheets export, Slides export, Drawings export, generic-file download/preview/thumbnail, folder share)
- One-click copy on every link, with visual feedback
- "Copy with Context" composer: combine a phrase with any link, with type-aware presets ("Here's the doc:", "Link to the sheet:", "Link to the slides:", etc.)
- Persists your custom phrase between popup opens
- Keyboard shortcut: `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)

## Install (developer mode)

1. Open `chrome://extensions`
2. Toggle "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `drive-link-toolkit` folder

## Permissions

- `activeTab` — Read the URL of the current tab when you click the toolbar icon, so the extension can extract the file ID.
- `clipboardWrite` — Copy generated links to your clipboard when you click a copy button.
- `storage` — Remember your custom "Copy with Context" phrase between sessions.

No data is sent to any server. The extension runs entirely in your browser.
