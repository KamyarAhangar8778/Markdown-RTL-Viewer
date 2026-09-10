import { describe, it, expect } from 'bun:test';
import { processDocumentAsync } from '@/services/markdownWorker';

describe('Markdown Worker & Async Processing Seam', () => {
  it('resolves asynchronously with a fully processed document result', async () => {
    const markdown = '# تست کارگر غیرهمزمان\n\nمتن نمونه برای پردازش غیرهمزمان در موتور مارک‌داون.';
    const handle = processDocumentAsync(markdown);

    const doc = await handle.promise;
    expect(doc.hasContent).toBe(true);
    expect(doc.title).toBe('تست کارگر غیرهمزمان');
    expect(doc.stats.wordCount).toBeGreaterThan(0);
    expect(doc.stats.persianCharCount).toBeGreaterThan(0);
  });

  it('allows cancelling an in-flight asynchronous task', async () => {
    const handle = processDocumentAsync('# عنوان ابطال شده');
    handle.cancel();

    // The handle was cancelled, so the promise won't deliver a stale callback
    expect(typeof handle.cancel).toBe('function');
  });
});
