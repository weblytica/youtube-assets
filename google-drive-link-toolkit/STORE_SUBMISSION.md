# Chrome Web Store Submission Package — Drive Link Toolkit

## Pre-submission checklist

- [x] Manifest V3
- [x] No remote code execution (all JS is bundled)
- [x] No analytics, no telemetry, no network calls
- [x] Permissions reduced to the minimum (`activeTab`, `clipboardWrite`, `storage`)
- [x] `host_permissions` removed (was unnecessary — `activeTab` handles it on click)
- [x] Privacy policy written (see `PRIVACY.md`)
- [ ] Real icons (current icons are placeholder solid-blue squares — replace before submitting)
- [ ] Screenshots prepared (1–5 images, 1280×800 or 640×400 PNG/JPG)
- [ ] Promotional tile (440×280 PNG/JPG)
- [ ] ZIP the `drive-link-toolkit/` folder for upload
- [ ] One-time $5 developer registration fee paid (if first submission)

## Store listing fields

### Name
`Drive Link Toolkit`

### Summary (132 character limit)
`Extract Google Drive file IDs and generate every useful link variant — share, export, embed, download — with one-click copy.`

### Category
`Productivity`

### Language
`English`

### Detailed description (paste into "Description")
```
Drive Link Toolkit gives you instant access to every useful link variant for any Google Drive file — without ever leaving the page or opening the Drive API.

WHAT IT DOES
Open a Google Doc, Sheet, Slides, Form, Drawing, generic Drive file, or folder, then click the toolbar icon. The extension extracts the file ID and presents every link variant you might need:

• Share & edit links
• Export links (PDF, DOCX, XLSX, CSV, TSV, PPTX, ODT, ODS, EPUB, HTML, plain text)
• Drawings export (PNG, SVG, PDF, JPEG)
• Direct download links for generic Drive files
• Preview/embed links
• Thumbnail URLs (small and large)
• Folder share links
• Pre-fill base URLs for Google Forms

KEY FEATURES
• Auto-detects file ID and type from the current tab
• Paste any Google Drive URL or raw file ID to generate links for files you're not currently viewing
• One-click copy on every link with visual feedback
• "Copy with Context" composer — pair a custom phrase with any link, with type-aware presets like "Here's the doc:", "Link to the sheet:", "Link to the slides:"
• Persists your custom phrase between sessions
• Keyboard shortcut: Ctrl+Shift+L (Windows/Linux) or Cmd+Shift+L (Mac)
• Color-coded file type badge (Doc, Sheet, Slides, Form, Drawing, File, Folder)
• Collapsible link groups

PRIVACY
Drive Link Toolkit runs entirely in your browser. It does not collect, transmit, or share any data. It does not access your Google account or your file contents — only the URL of the tab you're on, and only when you click the toolbar icon.

PERMISSIONS
• activeTab — read the URL of the current tab when you click the icon, to extract the file ID
• clipboardWrite — copy generated links to your clipboard
• storage — remember your custom "Copy with Context" phrase

No host permissions are requested. The extension does not run on any page automatically.
```

---

## Permission justifications (paste into the Privacy tab during submission)

The Chrome Web Store submission form asks you to justify each permission. Use these:

### `activeTab` — Justification
> When the user clicks the extension's toolbar icon on a Google Docs, Sheets, Slides, Forms, Drawings, or Drive page, the extension reads the URL of the active tab in order to extract the file ID via regex. The URL is processed in-memory inside the popup and is never stored or transmitted. The extension does not inject scripts or read page contents.

### `clipboardWrite` — Justification
> The extension's core feature is generating shareable/export/embed link variants for Google Drive files. When the user clicks a copy button next to a link, or the "Copy" button in the "Copy with Context" composer, the extension writes the selected link (or composed text) to the system clipboard via `navigator.clipboard.writeText()`. Clipboard write happens only in response to an explicit user click.

### `storage` — Justification
> The extension stores a single string — the user's custom phrase from the "Copy with Context" field — in `chrome.storage.local` so it persists between popup opens. No other data is stored. Nothing is synced to Google or any remote server.

### Host permission justification
> None requested. The extension does not declare host permissions. URL access is granted by `activeTab` only when the user clicks the toolbar icon.

### Remote code use
> No. All JavaScript is bundled inside the extension package. The extension does not load remote scripts, eval strings, or fetch executable code from any server.

---

## Single purpose description (required)

> Drive Link Toolkit has a single purpose: to extract the file ID from the URL of a Google Drive, Docs, Sheets, Slides, Forms, or Drawings page (or from user-pasted input) and generate every useful link variant (share, export, download, embed, thumbnail) so the user can copy whichever one they need with a single click.

---

## Data usage disclosure (Privacy practices tab)

Check the following boxes on the submission form:

- **Personally identifiable information:** No
- **Health information:** No
- **Financial and payment information:** No
- **Authentication information:** No
- **Personal communications:** No
- **Location:** No
- **Web history:** No
- **User activity:** No
- **Website content:** No

Certify:
- [x] I do not sell or transfer user data to third parties.
- [x] I do not use or transfer user data for purposes unrelated to the item's single purpose.
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes.

**Privacy policy URL:** (you need to host `PRIVACY.md` somewhere public — GitHub Pages, your weblytica.com site, or a Gist works. Paste the URL here.)

---

## Assets you still need to produce

### Icons (replace the placeholder solid-blue squares)
- `icon16.png` — 16×16, shown in the extensions menu
- `icon48.png` — 48×48, shown on the extensions management page
- `icon128.png` — 128×128, shown in the Chrome Web Store listing

Recommended: a stylized chain link or "ID" mark on the Drive blue (#1a73e8) background. Keep it readable at 16px.

### Screenshots (1–5 required, 1280×800 or 640×400)
Suggested shots:
1. Popup open on a Google Doc, showing the type badge, file ID, share/edit/export links
2. Popup open on a Google Sheet, showing XLSX/CSV/TSV export links
3. Popup open on a generic Drive file, showing direct download + thumbnail URLs
4. "Copy with Context" section in use, with a preset selected
5. Empty state with a user pasting a URL into the input field

### Promotional tile (optional but recommended, 440×280)
Hero image with the extension name and a single-sentence value prop: "Every Google Drive link variant, one click away."

---

## Things to know about review

- **First review takes a few business days.** Subsequent updates are usually faster.
- **Most common rejection reasons** for this kind of extension:
  - Permissions broader than the stated purpose (we already trimmed this — `host_permissions` removed)
  - Missing or vague single-purpose description (use the one above verbatim)
  - Permission justifications that just restate the permission name (use the prose above)
  - Privacy policy URL missing or returning 404 (host `PRIVACY.md` somewhere public first)
- **Don't claim to be affiliated with Google** anywhere in the listing. The name "Drive Link Toolkit" is fine; phrases like "Official Google Drive helper" are not.
- **The keyboard shortcut** declared in `manifest.json` (`Ctrl+Shift+L`) may conflict with Chrome's "Toggle Reader Mode" on some platforms. If you get rejected for that, change to `Ctrl+Shift+Y` or similar.

---

## Final ZIP

When ready, zip the contents of `drive-link-toolkit/` (not the parent folder — the ZIP root should contain `manifest.json` at the top level). Upload that ZIP to the Developer Dashboard.

PowerShell command:
```powershell
Compress-Archive -Path "drive-link-toolkit\*" -DestinationPath "drive-link-toolkit-v1.0.0.zip"
```
