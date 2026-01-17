type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

function setTheme(theme: Theme, persist: boolean) {
  applyTheme(theme);

  if (!persist) return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures
  }
}

function toggleTheme() {
  const current =
    (document.documentElement.dataset.theme as Theme | undefined) ??
    getStoredTheme() ??
    getSystemTheme();
  setTheme(current === "dark" ? "light" : "dark", true);
}

function syncToggleButton(button: HTMLButtonElement) {
  const theme =
    (document.documentElement.dataset.theme as Theme | undefined) ??
    getStoredTheme() ??
    getSystemTheme();
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  button.setAttribute("title", `Switch to ${nextTheme} theme`);
}

function init() {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    toggleTheme();
    syncToggleButton(button);
  });

  syncToggleButton(button);

  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", () => {
    if (getStoredTheme() !== null) return;
    applyTheme(getSystemTheme());
    syncToggleButton(button);
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    const stored = isTheme(event.newValue) ? event.newValue : null;
    applyTheme(stored ?? getSystemTheme());
    syncToggleButton(button);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
