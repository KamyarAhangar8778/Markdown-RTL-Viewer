/**
 * @file constants/sampleMarkdownEn.ts
 * @description Comprehensive English sample Markdown document showcasing GFM features, typography, and bidirectional layout.
 */

export const SAMPLE_RTL_MARKDOWN_EN = `# Welcome to RTL Markdown Studio 👋

This is a comprehensive reference document designed to test and demonstrate **all standard Markdown & GFM (GitHub Flavored Markdown) features** in a modern dual-language environment.

---

## 📑 1. Typography & Inline Formatting

Markdown provides versatile inline formatting for technical documentation and everyday notes:
- **Bold text:** Highlight mission-critical architectural concepts like **Client-Side Privacy**
- *Italic text:* Emphasize terminology such as *real-time synchronized scrolling*
- ***Bold & Italic combined:*** Express ***immediate critical urgency***
- ~~Strikethrough formatting:~~ Clearly mark ~~deprecated legacy version 1.0~~
- Single inline code tokens: Functions like \`calculateStats()\` or class \`MarkdownEngine\`
- Bidirectional inline code tokens: Function \`processRtlText() با زبان فارسی\` preserving character ordering
- Hardware keyboard shortcuts: Quick export via <kbd>Ctrl</kbd> + <kbd>S</kbd> or command palette via <kbd>Ctrl</kbd> + <kbd>K</kbd>

### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6

---

## 📋 2. Lists & Task Management (GFM Task Lists)

### A) Ordered Step-by-Step Sequence:
1. Enter raw markdown text or load an existing \`.md\` file in the **Left Editor**
2. Automated transformation takes place via the **LRU Cache Engine** with zero UI lag
3. Live document statistics extraction (word count, Persian glyph count, reading time)
4. Instant bidirectional rendering inside the **Right Preview**

### B) Hierarchical Unordered Lists:
- Studio Engineering Standards
  - Modular architecture and separation of concerns (SoC)
  - Hybrid typography pairing **Vazirmatn** and **JetBrains Mono**
    - Balanced line heights for enhanced readability in long-form articles
    - Strict directionality isolation for LTR code snippets

### C) Interactive Task List:
- [x] Implement intelligent RTL table and text auto-alignment
- [x] In-memory LRU cache pipeline for 60 FPS rendering
- [x] Keyboard shortcut styling with physical \`<kbd>\` caps
- [x] Smart language isolation in code blocks to prevent Python/CSS false-positives
- [ ] Optional cloud sync and custom workspace themes
- [ ] Direct export engine for high-resolution PDF workbooks

---

## 💬 3. Blockquotes & Nested Callouts

> 💡 **Privacy Guarantee:** All text processing, formatting, and conversion executes 100% locally in your browser sandbox. Zero data ever leaves your device.
>
> Your documents and notes remain entirely private and under your control.
>> ⚙️ **Under the Hood:** An intelligent LRU memoization pipeline allows large documents to scroll at over **60 FPS** without stutter.
>>> 🔒 **Client Isolation:** Temporary data is held solely in browser-isolated state.

---

## 💻 4. Code Blocks Across Popular Languages

### 1. Plain Text or System Logs (No Language Tag):
\`\`\`text
This is raw unhighlighted text or terminal log output.
The system intelligently avoids guessing incorrect languages like Python or CSS for plain notes.
\`\`\`

### 2. TypeScript Application Logic:
\`\`\`typescript
import { processDocument } from '@/services/markdownEngine';

interface ConversionConfig {
  alignTables?: boolean;
  readingSpeedWpm?: number;
}

/**
 * High-performance RTL document processing entry point
 */
export function formatMarkdown(rawText: string, config: ConversionConfig = {}) {
  const result = processDocument(rawText, config);
  console.log(\`Processed words: \${result.stats.wordCount}\`);
  return result;
}
\`\`\`

### 3. Python Automation Script:
\`\`\`python
def normalize_persian_text(text: str) -> str:
    """Standardize Arabic characters to standard Persian Unicode"""
    replacements = {"ي": "ی", "ك": "ک"}
    for original, target in replacements.items():
        text = text.replace(original, target)
    return text.strip()

print(normalize_persian_text("Sample text with Unicode"))
\`\`\`

### 4. Structured JSON Payload:
\`\`\`json
{
  "app": "RTL Markdown Studio",
  "version": "2.4.0",
  "features": {
    "syntaxHighlighting": true,
    "lruCache": true,
    "offlineReady": true
  }
}
\`\`\`

### 5. Relational Database Query (SQL):
\`\`\`sql
SELECT document_id, title, word_count, created_at
FROM user_documents
WHERE language = 'en' AND is_archived = FALSE
ORDER BY updated_at DESC
LIMIT 10;
\`\`\`

### 6. Terminal Commands (Bash):
\`\`\`bash
# Install dependencies and start rapid local dev server
bun install
bun run dev
\`\`\`

---

## 📊 5. Advanced GFM Data Tables

| ID | System Module | Algorithm Core | Alignment | Engine Status |
| :--- | :--- | :---: | :---: | ---: |
| 01 | **Parser Engine** | LRU Memoized Regex | RTL Optimized | ✅ Active |
| 02 | **Syntax Highlighter** | Highlight.js Wrapper | Isolated LTR | ✅ Active |
| 03 | **Sync Scroll** | Proportional Ratio | Bidirectional | ⚡ 60 FPS |
| 04 | **Font Segmenter** | Unicode Range Segmenter | Hybrid | 🛡️ Conflict-Free |

---

## 🔗 6. Links & Media

- Official project repository: [GitHub Studio Repository](https://github.com)
- Direct web address: <https://github.com>
- Markdown specification: [CommonMark Specification](https://spec.commonmark.org)

Sample illustration banner with responsive styling:

![Markdown Studio Banner](https://picsum.photos/seed/markdown-studio/900/260)
`;
