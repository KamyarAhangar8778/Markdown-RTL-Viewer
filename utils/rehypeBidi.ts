/**
 * @file utils/rehypeBidi.ts
 * @description rehype plugin that isolates Latin runs inside Persian/Arabic
 * text with `dir="ltr"` spans and injects ZWNJ between script boundaries.
 *
 * Runs on the rendered HTML AST, so fenced/inline code, links, images and
 * tables are untouched (their text lives in separate nodes already wrapped
 * by the theme's CSS). Builds nodes manually to avoid a `hastscript` dep.
 */

import type { Plugin } from 'unified';
import type { Root, Text, Element, Parent } from 'hast';
import { visit } from 'unist-util-visit';

const ZWNJ = '‌';
// A Latin run: letters/digits plus common URL & path punctuation.
const LATIN_RUN = /[A-Za-z0-9](?:[A-Za-z0-9._@#%&/+=:()\-]*[A-Za-z0-9])?/g;

/**
 * Wrap a raw string in a `dir="ltr"` span element.
 */
function ltrSpan(text: string): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { dir: 'ltr', className: ['bidi-latin'] },
    children: [{ type: 'text', value: text }],
  };
}

/**
 * Split a Persian/Latin mixed string into isolated Latin runs and the
 * surrounding text, injecting ZWNJ at script boundaries. Returns a list of
 * hast nodes (text or ltr span).
 */
function buildBidiNodes(value: string): Array<Text | Element> {
  const nodes: Array<Text | Element> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  LATIN_RUN.lastIndex = 0;
  while ((match = LATIN_RUN.exec(value)) !== null) {
    const run = match[0];
    if (!run) break;

    const before = value.slice(lastIndex, match.index);
    if (before) nodes.push({ type: 'text', value: before + ZWNJ });

    nodes.push(ltrSpan(run));

    lastIndex = match.index + run.length;
  }

  const tail = value.slice(lastIndex);
  if (tail) nodes.push({ type: 'text', value: ZWNJ + tail });

  return nodes;
}

/**
 * rehype plugin: isolate Latin runs inside bidi text.
 */
export const rehypeBidi: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      // Skip text inside code (already dir=ltr via theme CSS).
      const parentTag = (parent as Element | undefined)?.tagName;
      if (parentTag === 'code' || parentTag === 'pre') return;

      if (!/[A-Za-z]/.test(node.value)) return;

      const nodes = buildBidiNodes(node.value);
      if (nodes.length > 1 && parent && index !== undefined) {
        parent.children.splice(index, 1, ...nodes);
        return index + nodes.length;
      }
    });
  };
};
