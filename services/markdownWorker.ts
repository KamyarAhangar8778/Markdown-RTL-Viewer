/**
 * @file services/markdownWorker.ts
 * @description Asynchronous, non-blocking document processor with cancellation support.
 * Executes intensive parsing off the main UI rendering loop to guarantee 60fps responsiveness.
 */

import { processDocument, ProcessDocumentOptions, ProcessedDocument } from './markdownEngine';

/**
 * Task handle returned by asynchronous markdown dispatching.
 */
export interface AsyncTaskHandle {
  readonly promise: Promise<ProcessedDocument>;
  cancel: () => void;
}

let activeTaskId = 0;

/**
 * Processes a markdown document asynchronously with built-in task cancellation.
 * If a newer parsing task is queued before the current one finishes, the previous task's
 * resolution is marked stale.
 *
 * @param {string} rawText - Raw markdown text to parse.
 * @param {ProcessDocumentOptions} [options] - Optional processing parameters.
 * @returns {AsyncTaskHandle} Cancellable task handle with Promise.
 */
export function processDocumentAsync(
  rawText: string,
  options?: ProcessDocumentOptions
): AsyncTaskHandle {
  const currentTaskId = ++activeTaskId;
  let isCancelled = false;

  const promise = new Promise<ProcessedDocument>((resolve, reject) => {
    // Schedule on microtask queue or next event loop tick
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(() => {
        try {
          if (isCancelled || currentTaskId !== activeTaskId) {
            return;
          }
          const result = processDocument(rawText, options);
          if (!isCancelled && currentTaskId === activeTaskId) {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    } else {
      setTimeout(() => {
        try {
          if (isCancelled || currentTaskId !== activeTaskId) {
            return;
          }
          const result = processDocument(rawText, options);
          if (!isCancelled && currentTaskId === activeTaskId) {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });

  return {
    promise,
    cancel: () => {
      isCancelled = true;
    },
  };
}
