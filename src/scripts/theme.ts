type Theme = "dark" | "light";

const STORAGE_KEY = "blog-theme";

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || pathname.startsWith("/blog/");
}

function getDefaultTheme(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

function setTheme(theme: Theme, persist: boolean) {
  applyTheme(theme);

  if (!persist) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures
  }
}

function toggleTheme() {
  const current =
    (document.documentElement.dataset.theme as Theme | undefined) ??
    getStoredTheme() ??
    getDefaultTheme();
  setTheme(current === "dark" ? "light" : "dark", true);
}

function syncToggleButton(button: HTMLButtonElement) {
  const theme =
    (document.documentElement.dataset.theme as Theme | undefined) ??
    getStoredTheme() ??
    getDefaultTheme();
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  button.setAttribute("title", `Switch to ${nextTheme} theme`);
}

function init() {
  if (!isBlogPath(window.location.pathname)) {
    document.documentElement.dataset.theme = "dark";
    return;
  }

  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) return;

  applyTheme(getStoredTheme() ?? getDefaultTheme());

  button.addEventListener("click", () => {
    toggleTheme();
    syncToggleButton(button);
  });

  syncToggleButton(button);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
