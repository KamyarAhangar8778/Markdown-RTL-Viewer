'use client';

/**
 * @file components/layout/footer.tsx
 * @description Footer component displaying technology stack, copyright, and system status.
 */

import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-panel border-t border-zinc-800 py-4 px-6 text-xs text-zinc-400 mt-auto shadow-2xl backdrop-blur-xl bg-black/90">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
        <div className="flex items-center gap-2 text-zinc-300">
          <div className="p-1 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span>پردازش کلاینت-محور و امن بدون ارسال متون به سرور</span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>توسعه‌یافته با تم آبسیدین دارک</span>
          <Heart className="w-3.5 h-3.5 text-zinc-300 fill-zinc-300" />
          <span>توسط Next.js & Tailwind CSS 4</span>
        </div>
      </div>
    </footer>
  );
};

