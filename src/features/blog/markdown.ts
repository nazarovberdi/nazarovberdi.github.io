import {
  bundledLanguages,
  codeToHtml,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";

const FRONTMATTER_BOUNDARY = "---";
const SHIKI_LIGHT_THEME: BundledTheme = "github-light";
const SHIKI_DARK_THEME: BundledTheme = "vesper";

export interface FrontmatterAttributes {
  title?: string;
  date?: string;
  summary?: string;
}

export interface ParsedMarkdownFile {
  attributes: FrontmatterAttributes;
  body: string;
}

function normalizeLanguage(language: string): BundledLanguage | null {
  const candidate = language.trim().toLowerCase();

  if (!candidate) {
    return null;
  }

  return candidate in bundledLanguages ? (candidate as BundledLanguage) : null;
}

function encodeDataAttribute(value: string): string {
  return encodeURIComponent(value);
}

async function renderCodeFence(
  code: string,
  language: string,
): Promise<string> {
  const normalizedLanguage = normalizeLanguage(language);
  const copyButton = `<button class="blog-code-copy" type="button" data-code="${encodeDataAttribute(code)}">Copy</button>`;

  if (!normalizedLanguage) {
    const languageClass = language
      ? ` class="language-${escapeHtml(language)}"`
      : "";
    return `<div class="blog-code-block" data-language="${escapeHtml(language || "text")}">${copyButton}<pre><code${languageClass}>${escapeHtml(code)}</code></pre></div>`;
  }

  const html = await codeToHtml(code, {
    lang: normalizedLanguage,
    themes: { light: SHIKI_LIGHT_THEME, dark: SHIKI_DARK_THEME },
    defaultColor: false,
  });

  return `<div class="blog-code-block" data-language="${escapeHtml(normalizedLanguage)}">${copyButton}${html}</div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInline(markdown: string): string {
  const codeSpans: string[] = [];

  // 1. Extract code spans FIRST (before escaping)
  let text = markdown.replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `__CODE_SPAN_${codeSpans.length}__`;
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  // 2. Escape the remaining text
  let html = escapeHtml(text);

  // 3. Apply other markdown transforms
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt: string, src: string) =>
      `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`,
  );

  html = html.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label: string, href: string) =>
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${label}</a>`,
  );

  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // 4. Restore code spans
  return codeSpans.reduce(
    (result, replacement, index) =>
      result.replace(`__CODE_SPAN_${index}__`, replacement),
    html,
  );
}

function flushParagraph(buffer: string[], output: string[]): void {
  if (!buffer.length) {
    return;
  }

  output.push(`<p>${formatInline(buffer.join(" "))}</p>`);
  buffer.length = 0;
}

function flushList(
  buffer: string[],
  output: string[],
  type: "ul" | "ol",
): void {
  if (!buffer.length) {
    return;
  }

  const items = buffer.map((item) => `<li>${formatInline(item)}</li>`).join("");
  output.push(`<${type}>${items}</${type}>`);
  buffer.length = 0;
}

export function parseFrontmatter(raw: string): ParsedMarkdownFile {
  if (!raw.startsWith(`${FRONTMATTER_BOUNDARY}\n`)) {
    return {
      attributes: {},
      body: raw.trim(),
    };
  }

  const lines = raw.split("\n");
  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === FRONTMATTER_BOUNDARY,
  );

  if (closingIndex === -1) {
    return {
      attributes: {},
      body: raw.trim(),
    };
  }

  const attributes: FrontmatterAttributes = {};

  for (const line of lines.slice(1, closingIndex)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line
      .slice(0, separatorIndex)
      .trim() as keyof FrontmatterAttributes;
    const value = line.slice(separatorIndex + 1).trim();

    if (value) {
      attributes[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }

  return {
    attributes,
    body: lines
      .slice(closingIndex + 1)
      .join("\n")
      .trim(),
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const lines = markdown.split("\n");
  const output: string[] = [];
  const paragraphBuffer: string[] = [];
  const unorderedListBuffer: string[] = [];
  const orderedListBuffer: string[] = [];
  let codeFenceLanguage = "";
  let inCodeFence = false;
  let codeFenceLines: string[] = [];

  const flushAll = () => {
    flushParagraph(paragraphBuffer, output);
    flushList(unorderedListBuffer, output, "ul");
    flushList(orderedListBuffer, output, "ol");
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("```")) {
      flushAll();

      if (inCodeFence) {
        output.push(
          await renderCodeFence(codeFenceLines.join("\n"), codeFenceLanguage),
        );
        inCodeFence = false;
        codeFenceLanguage = "";
        codeFenceLines = [];
      } else {
        inCodeFence = true;
        codeFenceLanguage = trimmedLine.slice(3).trim();
      }

      continue;
    }

    if (inCodeFence) {
      codeFenceLines.push(line);
      continue;
    }

    if (!trimmedLine) {
      flushAll();
      continue;
    }

    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushAll();
      const level = (headingMatch[1] ?? "#").length;
      const content = headingMatch[2] ?? "";
      output.push(`<h${level}>${formatInline(content)}</h${level}>`);
      continue;
    }

    const unorderedListMatch = trimmedLine.match(/^-\s+(.*)$/);
    if (unorderedListMatch) {
      flushParagraph(paragraphBuffer, output);
      flushList(orderedListBuffer, output, "ol");
      unorderedListBuffer.push(unorderedListMatch[1] ?? "");
      continue;
    }

    const orderedListMatch = trimmedLine.match(/^\d+\.\s+(.*)$/);
    if (orderedListMatch) {
      flushParagraph(paragraphBuffer, output);
      flushList(unorderedListBuffer, output, "ul");
      orderedListBuffer.push(orderedListMatch[1] ?? "");
      continue;
    }

    const blockquoteMatch = trimmedLine.match(/^>\s+(.*)$/);
    if (blockquoteMatch) {
      flushAll();
      output.push(
        `<blockquote><p>${formatInline(blockquoteMatch[1] ?? "")}</p></blockquote>`,
      );
      continue;
    }

    paragraphBuffer.push(trimmedLine);
  }

  flushAll();

  if (inCodeFence) {
    output.push(
      await renderCodeFence(codeFenceLines.join("\n"), codeFenceLanguage),
    );
  }

  return output.join("\n");
}
