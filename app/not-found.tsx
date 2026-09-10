import React from 'react';
import Link from 'next/link';

/**
 * Custom 404 Not Found page for RTL Markdown Studio.
 *
 * @returns {React.JSX.Element} Not Found UI.
 */
export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-black text-zinc-100">
      <h2 className="text-2xl font-bold mb-4">صفحه پیدا نشد (404)</h2>
      <p className="text-zinc-400 mb-6">صفحه مورد نظر یافت نشد.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors"
      >
        بازگشت به استودیو
      </Link>
    </div>
  );
}
