const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "do", "switch", "case", "break", "continue", "new", "this", "class",
  "extends", "super", "import", "from", "export", "default", "try", "catch",
  "finally", "throw", "async", "await", "yield", "typeof", "instanceof",
  "in", "of", "void", "delete", "with", "debugger", "static", "get", "set",
]);

const BUILTINS = new Set([
  "console", "Math", "Array", "Object", "String", "Number", "Boolean",
  "Date", "JSON", "Promise", "Map", "Set", "RegExp", "Error", "parseInt",
  "parseFloat", "isNaN", "undefined", "null", "NaN", "Infinity",
  "document", "window", "setTimeout", "setInterval", "fetch",
]);

const BOOLEANS = new Set(["true", "false"]);

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightLine(code) {
  let result = "";
  let i = 0;

  while (i < code.length) {
    if (code[i] === "/" && code[i + 1] === "/") {
      result += `<span class="syn-comment">${escapeHtml(code.slice(i))}</span>`;
      break;
    }

    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      result += `<span class="syn-string">${escapeHtml(code.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }

    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      result += `<span class="syn-string">${escapeHtml(code.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }

    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      result += `<span class="syn-template">${escapeHtml(code.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }

    if (/\d/.test(code[i]) && (i === 0 || /[\s(,;=!&|<>+\-*/%[\]{}]/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[\d.xXeE_]/.test(code[j])) j++;
      result += `<span class="syn-number">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (KEYWORDS.has(word)) {
        result += `<span class="syn-keyword">${escapeHtml(word)}</span>`;
      } else if (BOOLEANS.has(word)) {
        result += `<span class="syn-boolean">${escapeHtml(word)}</span>`;
      } else if (BUILTINS.has(word)) {
        result += `<span class="syn-builtin">${escapeHtml(word)}</span>`;
      } else if (j < code.length && code[j] === "(") {
        result += `<span class="syn-function">${escapeHtml(word)}</span>`;
      } else {
        result += `<span>${escapeHtml(word)}</span>`;
      }
      i = j;
      continue;
    }

    if ("=!<>&|+-*/%?:.".includes(code[i])) {
      let j = i;
      while (j < code.length && "=!<>&|+-*/%?:.".includes(code[j])) j++;
      result += `<span class="syn-operator">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    if ("()[]{}".includes(code[i])) {
      result += `<span class="syn-bracket">${escapeHtml(code[i])}</span>`;
      i++;
      continue;
    }

    if (",;".includes(code[i])) {
      result += `<span class="syn-punctuation">${escapeHtml(code[i])}</span>`;
      i++;
      continue;
    }

    result += escapeHtml(code[i]);
    i++;
  }

  return result;
}

export function highlightCode(code) {
  return code.split("\n").map(highlightLine).join("\n");
}

export function parseMarkdown(content) {
  if (!content) return "";

  // 1. Extract code blocks first (preserve them from escaping)
  const codeBlocks = [];
  let processed = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const id = codeBlocks.length;
      codeBlocks.push({ lang: lang || "javascript", code: code.trim() });
      return `\x00CODEBLOCK_${id}\x00`;
    }
  );

  // 2. Extract inline code (preserve from escaping)
  const inlineCodes = [];
  processed = processed.replace(
    /`([^`]+)`/g,
    (_, code) => {
      const id = inlineCodes.length;
      inlineCodes.push(code);
      return `\x00INLINE_${id}\x00`;
    }
  );

  // 3. Now escape HTML in the remaining text
  processed = escapeHtml(processed);

  // 4. Restore inline code
  processed = processed.replace(
    /\x00INLINE_(\d+)\x00/g,
    (_, id) => `<code class="code-inline">${escapeHtml(inlineCodes[parseInt(id)])}</code>`
  );

  // 5. Headers
  processed = processed.replace(/^### (.*)/gm, '<h3>$1</h3>');
  processed = processed.replace(/^## (.*)/gm, '<h2>$1</h2>');

  // 6. Bold
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 7. Italic
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 8. Blockquotes (after escapeHtml, > is &gt;)
  processed = processed.replace(/^&gt; (.*)/gm, '<blockquote>$1</blockquote>');

  // 9. Unordered lists
  processed = processed.replace(/^- (.*)/gm, '<li>$1</li>');
  processed = processed.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // 10. Ordered lists
  processed = processed.replace(/^\d+\. (.*)/gm, '<li>$1</li>');

  // 11. Tables
  processed = processed.replace(
    /^\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/gm,
    (_, header, body) => {
      const headers = header.split("|").map((h) => h.trim()).filter(Boolean);
      const rows = body.trim().split("\n").map((row) =>
        row.split("|").map((c) => c.trim()).filter(Boolean)
      );
      let table = '<table><thead><tr>';
      headers.forEach((h) => { table += `<th>${h}</th>`; });
      table += '</tr></thead><tbody>';
      rows.forEach((row) => {
        table += '<tr>';
        row.forEach((c) => { table += `<td>${c}</td>`; });
        table += '</tr>';
      });
      table += '</tbody></table>';
      return table;
    }
  );

  // 12. Restore code blocks with syntax highlighting (AFTER bold/italic to protect * chars)
  processed = processed.replace(
    /\x00CODEBLOCK_(\d+)\x00/g,
    (_, id) => {
      const block = codeBlocks[parseInt(id)];
      const highlighted = highlightCode(block.code);
      return `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${block.lang}</span><div class="code-block-dots"><span style="background:#ff5f57"></span><span style="background:#febc2e"></span><span style="background:#28c840"></span></div></div><pre><code>${highlighted}</code></pre></div>`;
    }
  );

  // 13. Paragraphs (double newline)
  processed = processed.replace(/\n\n/g, '</p><p>');
  processed = `<p>${processed}</p>`;

  // 14. Line breaks
  processed = processed.replace(/\n/g, '<br/>');

  // 15. Clean up
  processed = processed.replace(/<p>\s*<\/p>/g, '');
  processed = processed.replace(/<p>(<h[23]>)/g, '$1');
  processed = processed.replace(/(<\/h[23]>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<div class="code-block">)/g, '$1');
  processed = processed.replace(/(<\/div>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<ul>)/g, '$1');
  processed = processed.replace(/(<\/ul>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<blockquote>)/g, '$1');
  processed = processed.replace(/(<\/blockquote>)<\/p>/g, '$1');
  processed = processed.replace(/<p>(<table>)/g, '$1');
  processed = processed.replace(/(<\/table>)<\/p>/g, '$1');

  return processed;
}
