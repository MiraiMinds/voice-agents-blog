async function renderMermaid() {
  const codeBlocks = document.querySelectorAll<HTMLElement>(
    'pre[data-language="mermaid"], pre > code.language-mermaid, pre > code.lang-mermaid'
  );

  if (codeBlocks.length === 0) return;

  const { default: mermaid } = await import("mermaid");

  codeBlocks.forEach((target) => {
    const pre = target.matches("pre") ? target : target.parentElement;
    if (!pre) return;

    const wrapper = pre.closest(".expressive-code") ?? pre;
    const copyButton = wrapper.querySelector<HTMLButtonElement>(
      "button[data-code]"
    );
    const raw =
      copyButton?.dataset.code?.replace(/\u007f/g, "\n") ??
      pre.textContent ??
      "";

    const container = document.createElement("div");
    container.className = "mermaid";
    container.textContent = raw.trim();
    wrapper.replaceWith(container);
  });

  mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
  mermaid.run();
}

renderMermaid().catch((error) => {
  console.warn("Mermaid render failed:", error);
});
