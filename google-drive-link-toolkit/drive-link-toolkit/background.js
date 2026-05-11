"use strict";

const ICONS = {
  docs: {
    16: "icons/docs-16.png",
    48: "icons/docs-48.png",
    128: "icons/docs-128.png"
  },
  sheets: {
    16: "icons/sheets-16.png",
    48: "icons/sheets-48.png",
    128: "icons/sheets-128.png"
  },
  slides: {
    16: "icons/slides-16.png",
    48: "icons/slides-48.png",
    128: "icons/slides-128.png"
  },
  inactive: {
    16: "icons/inactive-16.png",
    48: "icons/inactive-48.png",
    128: "icons/inactive-128.png"
  }
};

function iconKeyForUrl(url) {
  if (!url) return "inactive";
  try {
    const u = new URL(url);
    if (u.hostname.includes("docs.google.com")) {
      if (u.pathname.startsWith("/spreadsheets/d/")) return "sheets";
      if (u.pathname.startsWith("/presentation/d/")) return "slides";
      return "docs";
    }
    if (u.hostname.includes("drive.google.com")) {
      if (/^\/(file\/d\/|drive\/folders\/|open)/.test(u.pathname)) return "docs";
    }
  } catch (e) { /* not a URL */ }
  return "inactive";
}

function updateIcon(tabId, url) {
  const key = iconKeyForUrl(url);
  chrome.action.setIcon({ tabId, path: ICONS[key] }).catch(() => { /* tab gone */ });
}

function refreshTab(tabId) {
  chrome.tabs.get(tabId).then(tab => {
    if (tab) updateIcon(tabId, tab.url);
  }).catch(() => {});
}

function refreshAllTabs() {
  chrome.tabs.query({}).then(tabs => {
    for (const tab of tabs) {
      if (tab.id !== undefined) updateIcon(tab.id, tab.url);
    }
  }).catch(() => {});
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateIcon(tabId, changeInfo.url || tab.url);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  refreshTab(tabId);
});

chrome.tabs.onReplaced.addListener((addedTabId) => {
  refreshTab(addedTabId);
});

chrome.runtime.onInstalled.addListener(refreshAllTabs);
chrome.runtime.onStartup.addListener(refreshAllTabs);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "refreshIcon" && typeof msg.tabId === "number") {
    refreshTab(msg.tabId);
  }
});
