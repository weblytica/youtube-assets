


```
# Chrome Extension Build Prompt: Google Drive Link Toolkit

## Overview

Build a Chrome Extension called **Drive Link Toolkit** that detects when the user is on a Google Drive, Docs, Sheets, Slides, or Forms page, extracts the file ID from the URL, and presents a popup with every useful link variant for that file. The extension also allows pasting a file ID to generate links, composing custom text with a link for clipboard copy, and one-click copying of any individual link.

## Core Requirements

### Manifest V3

- Use Manifest V3 (not V2)
- Permissions: `activeTab`, `clipboardWrite`
- Host permissions: `*://docs.google.com/*`, `*://drive.google.com/*`
- Popup-based UI (no background service worker needed for v1)
- Icon set: 16, 48, 128px (use simple placeholder SVGs or PNGs)

### File ID Detection

When the popup opens, read the current tab's URL and extract the file ID using regex. Support all of these URL patterns:

| Pattern | Example |
|---|---|
| Google Docs | `https://docs.google.com/document/d/{ID}/edit` |
| Google Sheets | `https://docs.google.com/spreadsheets/d/{ID}/edit` |
| Google Slides | `https://docs.google.com/presentation/d/{ID}/edit` |
| Google Forms | `https://docs.google.com/forms/d/{ID}/edit` |
| Google Drawings | `https://docs.google.com/drawings/d/{ID}/edit` |
| Generic Drive file | `https://drive.google.com/file/d/{ID}/view` |
| Drive open shortcut | `https://drive.google.com/open?id={ID}` |
| Drive folder | `https://drive.google.com/drive/folders/{ID}` |

The regex should reliably capture the file ID (typically 25-60 chars, alphanumeric plus hyphens and underscores).

Also detect the **file type** from the URL path:
- `/document/` = Google Doc
- `/spreadsheets/` = Google Sheet
- `/presentation/` = Google Slides
- `/forms/` = Google Form
- `/drawings/` = Google Drawing
- `/file/` = Generic Drive file (could be PDF, image, ZIP, etc.)
- `/drive/folders/` = Folder

### Link Generation

Based on the detected file type, generate all applicable link variants. Display them in grouped sections.

**Universal links (all file types):**
- Share link: `https://docs.google.com/{type}/d/{ID}/edit?usp=sharing` (or `drive.google.com/file/d/{ID}/view?usp=sharing` for generic files)
- Open by ID: `https://drive.google.com/open?id={ID}`
- File ID only: `{ID}` (just the raw ID for copying)

**Google Docs export links:**
- PDF: `https://docs.google.com/document/d/{ID}/export?format=pdf`
- DOCX: `https://docs.google.com/document/d/{ID}/export?format=docx`
- Plain text: `https://docs.google.com/document/d/{ID}/export?format=txt`
- HTML: `https://docs.google.com/document/d/{ID}/export?format=html`
- ODT: `https://docs.google.com/document/d/{ID}/export?format=odt`
- EPUB: `https://docs.google.com/document/d/{ID}/export?format=epub`

**Google Sheets export links:**
- XLSX: `https://docs.google.com/spreadsheets/d/{ID}/export?format=xlsx`
- CSV: `https://docs.google.com/spreadsheets/d/{ID}/export?format=csv`
- TSV: `https://docs.google.com/spreadsheets/d/{ID}/export?format=tsv`
- PDF: `https://docs.google.com/spreadsheets/d/{ID}/export?format=pdf`
- ODS: `https://docs.google.com/spreadsheets/d/{ID}/export?format=ods`

**Google Slides export links:**
- PDF: `https://docs.google.com/presentation/d/{ID}/export?format=pdf`
- PPTX: `https://docs.google.com/presentation/d/{ID}/export?format=pptx`
- Plain text: `https://docs.google.com/presentation/d/{ID}/export?format=txt`

**Google Forms:**
- View form (respondent view): `https://docs.google.com/forms/d/{ID}/viewform`
- Edit form: `https://docs.google.com/forms/d/{ID}/edit`
- Pre-filled link base: `https://docs.google.com/forms/d/{ID}/viewform?usp=pp_url`
- Responses spreadsheet: (note: can't generate without API, show a note about this)

**Google Drawings export links:**
- PNG: `https://docs.google.com/drawings/d/{ID}/export/png`
- SVG: `https://docs.google.com/drawings/d/{ID}/export/svg`
- PDF: `https://docs.google.com/drawings/d/{ID}/export/pdf`
- JPEG: `https://docs.google.com/drawings/d/{ID}/export/jpeg`

**Generic Drive files (non-Google-native):**
- View: `https://drive.google.com/file/d/{ID}/view`
- Share: `https://drive.google.com/file/d/{ID}/view?usp=sharing`
- Direct download: `https://drive.google.com/uc?export=download&id={ID}`
- Thumbnail (small): `https://drive.google.com/thumbnail?id={ID}&sz=w200`
- Thumbnail (large): `https://drive.google.com/thumbnail?id={ID}&sz=w800`
- Preview/embed: `https://drive.google.com/file/d/{ID}/preview`

**Folders:**
- Folder link: `https://drive.google.com/drive/folders/{ID}`
- Share link: `https://drive.google.com/drive/folders/{ID}?usp=sharing`

### Paste-a-File-ID Feature

Include an input field at the top of the popup labeled "Paste a File ID or URL." Behavior:

- If the user pastes a raw file ID (no slashes, looks like an ID string), generate the "Open by ID" link and a "Go" button that opens `https://drive.google.com/open?id={ID}` in a new tab
- If the user pastes a full Google Drive/Docs URL, parse it the same way as the active tab detection and generate all relevant links
- When the popup opens on a detected Drive page, auto-populate this field with the extracted file ID
- Include a "Clear" button to reset and enter a different ID

### Custom Text + Link Composer

A section at the bottom of the popup called "Copy with Context." It contains:

- A text input (or small textarea) pre-filled with "Here's the link:" (editable by the user)
- A dropdown or radio to select which link variant to pair with the text (default: Share link)
- A "Copy" button that copies the combined text to clipboard, e.g.:
  ```
  Here's the link: https://docs.google.com/document/d/{ID}/edit?usp=sharing
  ```
- Remember the user's last custom text using `chrome.storage.local` so it persists between popup opens
- Include a few quick-select preset phrases:
  - "Here's the link:"
  - "Link to the doc:"
  - "See attached:"
  - "For reference:"
  - Custom (free text)

### Copy Behavior

- Every generated link has a small copy icon/button next to it
- Clicking the copy button copies that specific link to the clipboard
- Show brief visual feedback on copy (button text changes to "Copied!" for 1.5 seconds, or a small checkmark appears)
- The "Copy with Context" section copies the combined text + selected link

### Additional Features

**Link tester:** Each link has a small "open" icon (external link icon) that opens that URL in a new tab so the user can verify it works.

**File type badge:** Show a colored badge/label at the top of the popup indicating the detected file type (e.g., "Google Doc", "Google Sheet", "Drive File", "Folder"). Use Google's file type colors if possible (blue for Docs, green for Sheets, yellow for Slides, purple for Forms).

**Keyboard shortcuts:**
- `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac) opens the popup
- Within the popup, `Ctrl+C` on a focused link row copies it

**Empty state:** When the user is not on a Google Drive page and hasn't pasted an ID, show a friendly message: "Open a Google Drive file or paste a File ID above to get started."

## UI/UX Guidelines

- Popup width: 380px, max height: 500px (scrollable if needed)
- Clean, minimal design. White background, subtle borders, no heavy styling
- Group links under collapsible section headers (e.g., "Export Links", "Share Links", "Embed/Preview")
- Default: all sections expanded. User can collapse sections they don't use.
- Use monospace font for the file ID display
- Use Google's product colors for the file type badge:
  - Docs: #4285F4 (blue)
  - Sheets: #0F9D58 (green)
  - Slides: #F4B400 (yellow/gold)
  - Forms: #7627BB (purple)
  - Drawings: #DB4437 (red)
  - Drive file: #4285F4 (blue)
  - Folder: #5f6368 (gray)
- Copy buttons should be small, icon-based (clipboard icon), right-aligned on each row
- Open-in-new-tab icons should be subtle, next to the copy button

## File Structure

```
drive-link-toolkit/
  manifest.json
  popup.html
  popup.css
  popup.js
  icons/
    icon16.png
    icon48.png
    icon128.png
```

Keep it simple. Single HTML file for the popup, one CSS file, one JS file. No build tools, no frameworks, no dependencies.

## Edge Cases to Handle

- URL has extra query params (e.g., `?usp=sharing&ouid=123&rtpof=true`) - still extract the ID correctly
- URL has a fragment/hash (e.g., `#heading=h.abc123`) - still extract the ID
- URL uses `/copy` instead of `/edit` (e.g., force-copy links) - still extract the ID
- User is on `drive.google.com` but not on a specific file (e.g., the Drive home page or search results) - show the empty state with the paste field
- File ID contains hyphens and underscores (both are valid)
- Very long file IDs (some are 44+ characters)

## What NOT to Build (v1 scope)

- No Google Drive API integration (no OAuth, no file metadata lookup)
- No file browsing or search
- No batch operations
- No sharing permission changes
- No file upload or creation
- No settings page (keep it simple)
```


