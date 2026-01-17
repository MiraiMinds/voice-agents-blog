import mermaid from "mermaid";

const codeBlocks = document.querySelectorAll<HTMLElement>(
  "pre > code.language-mermaid, pre > code.lang-mermaid"
);

codeBlocks.forEach((code) => {
  const pre = code.parentElement;
  if (!pre) return;

  const container = document.createElement("div");
  container.className = "mermaid";
  container.textContent = code.textContent ?? "";
  pre.replaceWith(container);
});

mermaid.initialize({ startOnLoad: true, securityLevel: "strict" });
mermaid.run();
