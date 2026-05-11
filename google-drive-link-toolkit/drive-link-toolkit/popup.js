"use strict";

const FILE_TYPES = {
  document:     { label: "Google Doc",     badge: "badge-doc",     noun: "doc" },
  spreadsheets: { label: "Google Sheet",   badge: "badge-sheet",   noun: "sheet" },
  presentation: { label: "Google Slides",  badge: "badge-slide",   noun: "slides" },
  forms:        { label: "Google Form",    badge: "badge-form",    noun: "form" },
  drawings:     { label: "Google Drawing", badge: "badge-drawing", noun: "drawing" },
  file:         { label: "Drive File",     badge: "badge-file",    noun: "file" },
  folder:       { label: "Folder",         badge: "badge-folder",  noun: "folder" }
};

function presetsForType(type) {
  const noun = (FILE_TYPES[type] && FILE_TYPES[type].noun) || "link";
  return [
    `Here's the ${noun}:`,
    `Link to the ${noun}:`,
    `See the ${noun}:`,
    `For reference, the ${noun}:`
  ];
}

const ID_RE = /[a-zA-Z0-9_-]{20,}/;

function parseUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname;
    const path = u.pathname;

    if (host.includes("docs.google.com")) {
      const m = path.match(/^\/(document|spreadsheets|presentation|forms|drawings)\/d\/([a-zA-Z0-9_-]+)/);
      if (m) return { type: m[1], id: m[2] };
    }
    if (host.includes("drive.google.com")) {
      let m = path.match(/^\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (m) return { type: "file", id: m[1] };
      m = path.match(/^\/drive\/folders\/([a-zA-Z0-9_-]+)/);
      if (m) return { type: "folder", id: m[1] };
      if (path === "/open") {
        const id = u.searchParams.get("id");
        if (id) return { type: "file", id };
      }
    }
  } catch (e) { /* not a URL */ }
  return null;
}

function parseInput(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const parsed = parseUrl(trimmed);
  if (parsed) return parsed;
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return { type: "file", id: trimmed };
  }
  const m = trimmed.match(ID_RE);
  if (m) return { type: "file", id: m[0], idOnly: true };
  return null;
}

function buildLinks(type, id) {
  const groups = [];

  // Universal
  const universal = { name: "Share & Open", links: [] };
  if (type === "document" || type === "spreadsheets" || type === "presentation" || type === "forms" || type === "drawings") {
    universal.links.push({ label: "Share",   url: `https://docs.google.com/${type}/d/${id}/edit?usp=sharing` });
    universal.links.push({ label: "Edit",    url: `https://docs.google.com/${type}/d/${id}/edit` });
  } else if (type === "file") {
    universal.links.push({ label: "Share",   url: `https://drive.google.com/file/d/${id}/view?usp=sharing` });
    universal.links.push({ label: "View",    url: `https://drive.google.com/file/d/${id}/view` });
  } else if (type === "folder") {
    universal.links.push({ label: "Folder",  url: `https://drive.google.com/drive/folders/${id}` });
    universal.links.push({ label: "Share",   url: `https://drive.google.com/drive/folders/${id}?usp=sharing` });
  }
  groups.push(universal);

  // Type-specific exports
  if (type === "document") {
    groups.push({ name: "Export", links: [
      { label: "PDF",   url: `https://docs.google.com/document/d/${id}/export?format=pdf` },
      { label: "DOCX",  url: `https://docs.google.com/document/d/${id}/export?format=docx` },
      { label: "TXT",   url: `https://docs.google.com/document/d/${id}/export?format=txt` },
      { label: "HTML",  url: `https://docs.google.com/document/d/${id}/export?format=html` },
      { label: "ODT",   url: `https://docs.google.com/document/d/${id}/export?format=odt` },
      { label: "EPUB",  url: `https://docs.google.com/document/d/${id}/export?format=epub` }
    ]});
  } else if (type === "spreadsheets") {
    groups.push({ name: "Export", links: [
      { label: "XLSX",  url: `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx` },
      { label: "CSV",   url: `https://docs.google.com/spreadsheets/d/${id}/export?format=csv` },
      { label: "TSV",   url: `https://docs.google.com/spreadsheets/d/${id}/export?format=tsv` },
      { label: "PDF",   url: `https://docs.google.com/spreadsheets/d/${id}/export?format=pdf` },
      { label: "ODS",   url: `https://docs.google.com/spreadsheets/d/${id}/export?format=ods` }
    ]});
  } else if (type === "presentation") {
    groups.push({ name: "Export", links: [
      { label: "PDF",   url: `https://docs.google.com/presentation/d/${id}/export?format=pdf` },
      { label: "PPTX",  url: `https://docs.google.com/presentation/d/${id}/export?format=pptx` },
      { label: "TXT",   url: `https://docs.google.com/presentation/d/${id}/export?format=txt` }
    ]});
  } else if (type === "forms") {
    groups.push({ name: "Form Links", links: [
      { label: "View form",   url: `https://docs.google.com/forms/d/${id}/viewform` },
      { label: "Edit form",   url: `https://docs.google.com/forms/d/${id}/edit` },
      { label: "Pre-fill",    url: `https://docs.google.com/forms/d/${id}/viewform?usp=pp_url` }
    ], note: "Responses spreadsheet requires the Drive API." });
  } else if (type === "drawings") {
    groups.push({ name: "Export", links: [
      { label: "PNG",   url: `https://docs.google.com/drawings/d/${id}/export/png` },
      { label: "SVG",   url: `https://docs.google.com/drawings/d/${id}/export/svg` },
      { label: "PDF",   url: `https://docs.google.com/drawings/d/${id}/export/pdf` },
      { label: "JPEG",  url: `https://docs.google.com/drawings/d/${id}/export/jpeg` }
    ]});
  } else if (type === "file") {
    groups.push({ name: "Download & Embed", links: [
      { label: "Download",  url: `https://drive.google.com/uc?export=download&id=${id}` },
      { label: "Preview",   url: `https://drive.google.com/file/d/${id}/preview` },
      { label: "Thumb sm",  url: `https://drive.google.com/thumbnail?id=${id}&sz=w200` },
      { label: "Thumb lg",  url: `https://drive.google.com/thumbnail?id=${id}&sz=w800` }
    ]});
  }

  return groups;
}

// ─────────────────────────── State ───────────────────────────
let currentState = null; // { type, id, groups, allLinks }

// ─────────────────────────── Render ──────────────────────────
const $ = (sel) => document.querySelector(sel);

function render(parsed) {
  const badge = $("#typeBadge");
  const fileIdRow = $("#fileIdDisplay");
  const empty = $("#emptyState");
  const container = $("#linksContainer");
  const composer = $("#composer");

  if (!parsed) {
    currentState = null;
    badge.className = "badge badge-empty";
    badge.textContent = "No file detected";
    fileIdRow.hidden = true;
    empty.hidden = false;
    container.hidden = true;
    container.innerHTML = "";
    composer.hidden = true;
    return;
  }

  const meta = FILE_TYPES[parsed.type] || FILE_TYPES.file;
  badge.className = `badge ${meta.badge}`;
  badge.textContent = meta.label;

  fileIdRow.hidden = false;
  $("#fileIdValue").textContent = parsed.id;

  empty.hidden = true;
  container.hidden = false;
  composer.hidden = false;

  const groups = buildLinks(parsed.type, parsed.id);
  const allLinks = [];
  container.innerHTML = "";

  for (const group of groups) {
    const section = document.createElement("div");
    section.className = "section";
    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = group.name;
    header.addEventListener("click", () => section.classList.toggle("collapsed"));
    section.appendChild(header);

    const body = document.createElement("div");
    body.className = "section-body";

    for (const link of group.links) {
      allLinks.push(link);
      body.appendChild(renderLinkRow(link));
    }
    if (group.note) {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = group.note;
      body.appendChild(note);
    }
    section.appendChild(body);
    container.appendChild(section);
  }

  currentState = { ...parsed, groups, allLinks };
  populateLinkSelect(allLinks);
  renderPresets(parsed.type);
}

function renderPresets(type) {
  const container = $("#presets");
  container.innerHTML = "";
  for (const phrase of presetsForType(type)) {
    const btn = document.createElement("button");
    btn.className = "preset";
    btn.dataset.preset = phrase;
    btn.textContent = phrase;
    btn.addEventListener("click", () => {
      const textarea = $("#customText");
      textarea.value = phrase;
      chrome.storage.local.set({ customText: phrase });
      updateActivePreset();
    });
    container.appendChild(btn);
  }
  updateActivePreset();
}

function updateActivePreset() {
  const textarea = $("#customText");
  const current = textarea.value.trim();
  document.querySelectorAll(".preset").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.preset === current);
  });
}

function renderLinkRow(link) {
  const row = document.createElement("div");
  row.className = "link-row";
  row.tabIndex = 0;

  const label = document.createElement("div");
  label.className = "link-label";
  label.textContent = link.label;

  const url = document.createElement("div");
  url.className = "link-url";
  url.textContent = link.url;
  url.title = link.url;

  const copyBtn = document.createElement("button");
  copyBtn.className = "icon-btn";
  copyBtn.textContent = "⧉";
  copyBtn.title = "Copy link";
  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    copyText(link.url, copyBtn);
  });

  const openBtn = document.createElement("button");
  openBtn.className = "icon-btn";
  openBtn.textContent = "↗";
  openBtn.title = "Open in new tab";
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chrome.tabs.create({ url: link.url });
  });

  row.appendChild(label);
  row.appendChild(url);
  row.appendChild(copyBtn);
  row.appendChild(openBtn);

  row.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      copyText(link.url, copyBtn);
    }
  });
  row.addEventListener("click", () => row.focus());

  return row;
}

function populateLinkSelect(allLinks) {
  const select = $("#linkSelect");
  select.innerHTML = "";
  for (let i = 0; i < allLinks.length; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = allLinks[i].label;
    opt.title = allLinks[i].url;
    select.appendChild(opt);
  }
  const shareIdx = allLinks.findIndex(l => /share/i.test(l.label));
  if (shareIdx >= 0) select.value = shareIdx;
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

// ─────────────────────────── Clipboard ───────────────────────
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = "✓";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove("copied");
      }, 1500);
    }
  } catch (e) {
    console.error("Copy failed:", e);
  }
}

// ─────────────────────────── Composer ────────────────────────
function setupComposer() {
  const textarea = $("#customText");
  const copyBtn = $("#copyComposed");
  const feedback = $("#composerFeedback");

  chrome.storage.local.get(["customText"], (data) => {
    if (data.customText) textarea.value = data.customText;
    updateActivePreset();
  });

  textarea.addEventListener("input", () => {
    chrome.storage.local.set({ customText: textarea.value });
    updateActivePreset();
  });

  copyBtn.addEventListener("click", async () => {
    if (!currentState) return;
    const idx = parseInt($("#linkSelect").value, 10);
    const link = currentState.allLinks[idx];
    if (!link) return;
    const combined = `${textarea.value} ${link.url}`;
    await navigator.clipboard.writeText(combined);
    copyBtn.classList.add("copied");
    copyBtn.textContent = "Copied!";
    feedback.textContent = `Copied: ${truncate(combined, 50)}`;
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.textContent = "Copy";
      feedback.textContent = "";
    }, 1500);
  });
}

// ─────────────────────────── Input handling ──────────────────
function setupInput() {
  const input = $("#idInput");
  const clearBtn = $("#clearBtn");

  input.addEventListener("input", () => {
    const parsed = parseInput(input.value);
    render(parsed);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    input.focus();
    render(null);
  });
}

// ─────────────────────────── Copy file ID button ─────────────
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-copy-target='fileId']");
  if (btn && currentState) {
    copyText(currentState.id, btn);
  }
});

// ─────────────────────────── Init ────────────────────────────
async function init() {
  setupInput();
  setupComposer();

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && typeof tab.id === "number") {
      chrome.runtime.sendMessage({ type: "refreshIcon", tabId: tab.id }).catch(() => {});
    }
    const parsed = tab ? parseUrl(tab.url) : null;
    if (parsed) {
      $("#idInput").value = parsed.id;
      render(parsed);
    } else {
      render(null);
    }
  } catch (e) {
    render(null);
  }
}

document.addEventListener("DOMContentLoaded", init);
