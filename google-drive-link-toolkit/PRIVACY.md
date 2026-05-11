# Privacy Policy — Drive Link Toolkit

**Last updated:** May 11, 2026

## Summary

Drive Link Toolkit does not collect, transmit, sell, or share any personal information or user data. Everything happens locally in your browser.

## What the extension accesses

- **The URL of your active tab** — only when you click the Drive Link Toolkit toolbar icon. The URL is read in-memory to extract a Google Drive file ID and is never stored or transmitted.
- **A custom phrase you type into the "Copy with Context" field** — stored locally in your browser via `chrome.storage.local` so it persists between popup opens. This data never leaves your device.
- **Your clipboard (write only)** — when you click a copy button, the selected link or composed text is written to your system clipboard.

## What the extension does NOT do

- It does not read, modify, or transmit the contents of any web page.
- It does not communicate with any server operated by us or any third party.
- It does not use analytics, telemetry, tracking pixels, or remote code.
- It does not access your Google account, files, or Drive contents.
- It does not sell or share data with third parties.

## Permissions

| Permission | Purpose |
|---|---|
| `activeTab` | Read the URL of the current tab when you click the toolbar icon, so the extension can extract a Drive file ID from supported Docs/Drive URLs. |
| `clipboardWrite` | Copy a generated link (or composed text) to your clipboard when you click a copy button. |
| `storage` | Save your custom "Copy with Context" phrase locally so it persists between popup opens. |

## Contact

For questions about this policy, contact: andy@weblytica.com
