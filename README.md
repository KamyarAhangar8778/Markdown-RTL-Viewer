# RTL Markdown Studio | استودیو راست‌چین‌ساز مارک‌داون

یک استودیوی مدرن، امن و کلاینت‌محور برای تبدیل، ویرایش، تحلیل آماری و پیش‌نمایش بلادرنگ اسناد مارک‌داون (`.md`) به صورت کاملاً راست‌چین (RTL) با حفظ ساختار قطعه‌کدها.

---

## 🌟 ویژگی‌های کلیدی (Key Features)

- **راست‌چین‌سازی هوشمند (RTL Engine):** تنظیم جهت‌گیری تیترها، پاراگراف‌ها، لیست‌ها، جداول و نقل‌قول‌ها با ایزولاسیون کامل `dir="rtl"`.
- **ایزولاسیون قطعه‌کدها (Code Isolation):** حفظ جهت چپ‌به‌راست (LTR) و فرمت اصلی برای تمامی بلوک‌های کد (`pre` و `code`).
- **تبدیل اختیاری ارقام (Persianizer):** قابلیت تبدیل هوشمند اعداد انگلیسی (0-9) به فارسی (۰-۹) در بدنه متن بدون تخریب کدهای مارک‌داون.
- **تحلیل و آمار بلادرنگ (Live Document Stats):** محاسبه تعداد کلمات، کاراکترها، تفکیک حروف فارسی/لاتین و زمان تخمینی مطالعه.
- **آپلود و دانلود سریع:** پشتیبانی از کشیدن و رها کردن (Drag & Drop) فایل‌های `.md` و دانلود خروجی پردازش‌شده.
- **کپی سریع با بازخورد:** امکان کپی متن راست‌چین‌شده در کلیپ‌بورد با سیستم اعلان (Toast Notification).
- **طراحی شیشه‌ای تیره (Dark Glassmorphism):** رابط کاربری با کنتراست استاندارد، فونت وزیرمتن و انیمیشن رمزگشایی متن.
- **اسکرول روان دسکتاپ (Lenis Smooth Scroll):** پیمایش بهینه‌شده برای دسکتاپ همراه با مدیریت خودکار عملکرد در موبایل.

---

## 🛠️ پشته فناوری (Tech Stack)

- **فریم‌ورک:** Next.js 15 (App Router) + React 19
- **زبان:** TypeScript (Strict Mode)
- **مدیریت وضعیت:** React Context API (`store/MarkdownContext.tsx`)
- **رندر مارک‌داون:** `react-markdown` + `remark-gfm`
- **استایل‌دهی:** Tailwind CSS v4 + متغیرهای طراحی شیشه‌ای (`DESIGN.md`)
- **کامپوننت‌های پایه:** Radix UI Primitives & Lucide Icons
- **موتور اسکرول:** Lenis

---

## 📂 ساختار ماژولار پروژه (Directory Structure)

```text
/
├── app/               # صفحات و ساختار App Router در Next.js
│   ├── globals.css    # تعاریف استایل سراسری و Tailwind CSS
│   ├── layout.tsx     # لایه ریشه و فراهم‌کننده اسکرول
│   └── page.tsx       # صفحه اصلی استودیو
├── components/
│   ├── layout/        # هدر، فوتر و اسکرول روان
│   ├── ui/            # المان‌های اتمیک (Button, Card, Modal, Toast, Tooltip)
│   └── views/         # نماهای اصلی (EditorView, PreviewView, UploadModal)
├── docs/              # راهنماهای فنی، معماری و دیاگرام‌ها
├── hooks/             # هوک‌های سفارشی (useClipboard, useDesktopSmoothScroll, ...)
├── store/             # ارائه‌دهنده و وضعیت سراسری مارک‌داون
├── types/             # تایپ‌ها و اینترفیس‌های TypeScript
└── utils/             # توابع خالص تبدیل RTL، فارسی‌ساز و محاسبه آمار
```

---

## 🚀 راه‌اندازی و اجرا (Getting Started)

### پیش‌نیازها
- Node.js 20+ یا Bun

### نصب وابستگی‌ها
```bash
npm install
```

### اجرای محیط توسعه
```bash
npm run dev
```
برنامه در آدرس `http://localhost:3000` در دسترس خواهد بود.

### بیلد نسخه نهایی
```bash
npm run build
npm run start
```

### اعتبارسنجی و لینت کدها
```bash
npm run lint
```

---

## 🔒 حریم خصوصی و امنیت (Privacy & Security)

- **۱۰۰٪ پردازش سمت کلاینت (In-Memory Processing):** کلیه فرآیندهای تحلیل، تبدیل متن و مدیریت فایل درون مرورگر کاربر انجام شده و هیچ داده‌ای به سرور خارجی ارسال نمی‌شود.

---

## 📚 مستندات تکمیلی (Documentation)

- [معماری سیستم و جریان داده (ARCHITECTURE.md)](./ARCHITECTURE.md)
- [مشخصات سیستم طراحی (DESIGN.md)](./DESIGN.md)
- [راهنمای توسعه و راه‌اندازی (docs/DEVELOPMENT_GUIDE.md)](./docs/DEVELOPMENT_GUIDE.md)
- [دیاگرام‌های معماری (docs/ARCHITECTURE_DIAGRAMS.md)](./docs/ARCHITECTURE_DIAGRAMS.md)
- [راهنمای ایجنت‌های هوش مصنوعی (AGENTS.md)](./AGENTS.md)
