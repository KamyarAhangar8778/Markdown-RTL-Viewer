/**
 * @file utils/fileHelpers.ts
 * @description Pure File I/O helper utilities for browser-based file downloading and reading.
 */

/**
 * Downloads string content as a downloadable file in the browser environment.
 *
 * @param content - File text content to be saved.
 * @param filename - Name of the downloaded file (e.g. "rtl-document.md").
 * @param mimeType - MIME type format of the file. Defaults to 'text/markdown;charset=utf-8'.
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType = 'text/markdown;charset=utf-8'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Reads plain text content asynchronously from a user-provided File object.
 *
 * @param file - The File object selected or dropped by the user.
 * @returns A Promise resolving to the file's text content.
 */
export function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || '');
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

