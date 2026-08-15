/**
 * @file constants/sampleTemplates.ts
 * @description Pre-defined sample Persian Markdown templates for testing, demo, and initialization.
 */

import { SampleTemplate } from '@/types/markdown';

/**
 * Pre-defined sample Persian Markdown templates.
 * Contains technical documentation and educational article templates with RTL-specific styling elements.
 */
export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'doc-sample',
    titleFa: 'مستندات فنی پروژه',
    descriptionFa: 'نمونه متن مارک‌داون شامل تیترها، جدول، کد و لیست‌ها',
    content: `# راهنمای جامع معماری سیستم

این یک **مستند فنی** نمونه است که برای بررسی راست‌چین‌سازی کامل مارک‌داون طراحی شده است.

> **نکته مهم:** تمامی بخش‌های این سند شامل جدول‌ها، لیست‌ها و اقتباس‌ها به طور کامل راست‌چین می‌شوند.

---

### ویژگی‌های کلیدی سیستم
1. قابلیت راست‌چین‌سازی هوشمند تمامی خطوط
2. پشتیبانی از **تغییر اعداد انگلیسی به فارسی** (مثلا 1234 به ۱۲۳۴)
3. حفظ جهت چپ‌به‌راست (LTR) برای قطعه‌کدها
4. رابط کاربری مدرن با تم تاریک و افکت شیشه‌ای (Glassmorphism)

### جدول زمان‌بندی فازهای پروژه

| نام فاز | مسئول | مدت زمان (روز) | وضعیت |
| :--- | :--- | :--- | :--- |
| طراحی UI/UX | تیم دیزاین | 5 | تکمیل شده |
| توسعه کامپوننت‌ها | تیم فرانت‌اند | 10 | در حال انجام |
| راست‌چین‌سازی مارک‌داون | توسعه‌دهنده ارشد | 3 | آماده تست |

---

### قطعه کد نمونه (تایپوگرافی دوگانه انگلیسی/فارسی)
\`\`\`typescript
// پیکربندی سیستم با فونت ترکیبی
interface SystemConfig {
  rtlEnabled: boolean; // فعال بودن راست‌چین
  editorFont: 'Vazirmatn' | 'JetBrains Mono';
  persianDigits: boolean; // تبدیل ارقام به فارسی
}

// تابع راه‌اندازی اولیه استودیو
function initializeStudio(config: SystemConfig): void {
  const message = 'خوش آمدید به استودیو مارک‌داون';
  console.log(\`\${message} | Initializing Studio...\`, config);
}
\`\`\`

---

برای شروع کار کافیست متن خود را پیست کنید یا فایل \`.md\` آپلود نمایید!
`,
  },
  {
    id: 'article-sample',
    titleFa: 'مقاله آموزشی فارسی',
    descriptionFa: 'نمونه مقاله شامل تیترهای مختلف، فرمول و نقل‌قول',
    content: `# هنر طراحی رابط کاربری مدرن در سال 2026

طراحی رابط کاربری همواره در حال تکامل است. استفاده از **شفافیت (Glassmorphic)** و **نویز سینمایی** حس زنده بودن و زیبایی خاصی به اپلیکیشن‌های مدرن می‌بخشد.

### چرا راست‌چین‌سازی مارک‌داون اهمیت دارد؟
در زبان‌های راست‌چین مانند *فارسی* و *عربی*، عدم تنظیم درست جهت‌گیری متون باعث به‌هم‌ریختگی نقطه، علائم نگارشی و لیست‌ها می‌شود.

> "زیبایی در سادگی و دقت در جزئیات نهفته است." - شعار تیم دیزاین

* لایه 1: تشخیص هوشمند زبان
* لایه 2: اصلاح علائم نگارشی
* لایه 3: رندر با فونت وزیرمتن
`,
  },
];
