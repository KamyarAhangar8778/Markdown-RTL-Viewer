/**
 * @file constants/sampleMarkdownFa.ts
 * @description Comprehensive Persian sample Markdown document showcasing GFM features, typography, and RTL handling.
 */

export const SAMPLE_RTL_MARKDOWN_FA = `# به استودیو راست‌چین‌ساز مارک‌داون خوش آمدید 👋

این یک سند مرجع و جامع برای بررسی و آزمایش **تمامی قابلیت‌های استاندارد مارک‌داون (CommonMark & GitHub Flavored Markdown)** در محیط دوزبانه (فارسی و انگلیسی) است.

---

## 📑 ۱. نگارش و تایپوگرافی متون (Typography & Formatting)

در نگارش متون روزمره و اسناد فنی می‌توانید از سبک‌های گوناگون نگارشی استفاده کنید:
- **متن پررنگ (Bold):** برای تأکید بر نکات حیاتی معماری مانند **پردازش بدون سرور (Client-Side Only)**
- *متن مورب (Italic):* برای اصطلاحات تخصصی نظیر *موتور همگام‌سازی لحظه‌ای*
- ***متن ترکیبی پررنگ و مورب:*** برای مواردی با ***اولویت بحرانی و فوری***
- ~~متن خط‌خورده (Strikethrough):~~ برای نشان دادن ~~روش‌های قدیمی و منسوخ شده~~
- کدهای درون‌خطی تک‌کلمه‌ای: متد \`calculateStats()\` یا کلاس \`MarkdownEngine\`
- کدهای درون‌خطی ترکیبی فارسی و انگلیسی: تابع \`پردازشگر متن parseDocument()\` بدون بهم‌ریختگی ترتیب کلمات
- کلیدهای میانبر سیستمی: ذخیره سریع با <kbd>Ctrl</kbd> + <kbd>S</kbd> یا جستجوی سریع با <kbd>Ctrl</kbd> + <kbd>K</kbd>

### تیتر سطح سوم (Heading Level 3)
#### تیتر سطح چهارم (Heading Level 4)
##### تیتر سطح پنجم (Heading Level 5)
###### تیتر سطح ششم (Heading Level 6)

---

## 📋 ۲. انواع لیست‌ها و مدیریت وظایف (Lists & Task Management)

### الف) لیست ترتیبی چندمرحله‌ای:
1. درج متن خام یا بارگذاری فایل \`.md\` در **ویرایشگر سمت چپ**
2. پردازش خودکار توسط **موتور LRU Cache** بدون بار پردازشی اضافی
3. استخراج آمارهای متنی (تعداد واژگان، کاراکترهای فارسی و تخمین زمان مطالعه)
4. مشاهده آنی خروجی در **پنل پیش‌نمایش سمت راست**

### ب) لیست‌های نامرتب و زیرمجموعه‌های تودرتو:
- استانداردهای معماری استودیو
  - طراحی ماژولار و تفکیک مسئولیت‌ها (SoC)
  - تایپوگرافی ترکیبی با فونت‌های **Vazirmatn** و **JetBrains Mono**
    - تنظیم فواصل خطوط برای خوانایی بهتر در متون طولانی
    - ایزوله‌سازی جهت متون لاتین درون کدهای برنامه

### ج) لیست وظایف تعاملی (GFM Task List):
- [x] پیاده‌سازی راست‌چین‌سازی هوشمند جداول و متون فارسی
- [x] سیستم کش محلی LRU جهت افزایش سرعت رندرینگ
- [x] پشتیبانی از کلیدهای میانبر صفحه‌کلید با المنت \`<kbd>\`
- [x] تفکیک هوشمند زبان در بلوک‌های کد و رفع تشخیص کاذب پایتون/CSS
- [ ] ذخیره‌سازی ابری اختیاری و پشتیبانی از قالب‌های سفارشی
- [ ] تولید مستقیم خروجی کتابچه الکترونیکی PDF

---

## 💬 ۳. یادداشت‌ها و نقل‌قول‌های تودرتو (Blockquotes & Callouts)

> 💡 **نکته کلیدی حریم خصوصی:** کلیه عملیات پردازش متن، فرمت‌بندی و تبدیل به صورت ۱۰۰٪ آفلاین و در مرورگر شما انجام می‌شود. هیچ داده‌ای به هیچ سروری ارسال نمی‌شود.
>
> اطلاعات شما همواره امن و تحت کنترل خودتان باقی خواهد ماند.
>> ⚙️ **معماری پردازش:** سیستم کش هوشمند باعث می‌شود اسناد حجیم با نرخ تازه‌سازی بیش از **۶۰ فریم بر ثانیه** بدون پرش اسکرول شوند.
>>> 🔒 **امنیت کلاینت:** داده‌ها در حافظه موقت ایزوله مرورگر نگهداری می‌شوند.

---

## 💻 ۴. بلوک‌های کد و زبان‌های برنامه‌نویسی (Code Blocks)

### ۱. متن ساده یا لاگ سیستمی (بدون زبان / Plain Text):
\`\`\`text
این یک نمونه متن خام یا خروجی لاگ سیستمی است.
سیستم به صورت هوشمند این بلوک را به عنوان متن ساده شناسایی کرده و زبان اشتباهی برای آن حدس نمی‌زند.
\`\`\`

### ۲. نمونه کد TypeScript:
\`\`\`typescript
import { processDocument } from '@/services/markdownEngine';

interface ConversionConfig {
  alignTables?: boolean;
  readingSpeedWpm?: number;
}

/**
 * پردازش و فرمت‌بندی هوشمند متن مارک‌داون
 */
export function formatMarkdown(rawText: string, config: ConversionConfig = {}) {
  const result = processDocument(rawText, config);
  console.log(\`تعداد کلمات پردازش شده: \${result.stats.wordCount}\`);
  return result;
}
\`\`\`

### ۳. اسکریپت پایتون (Python):
\`\`\`python
def normalize_persian_text(text: str) -> str:
    """تبدیل کاراکترهای عربی متداول به فارسی استاندارد"""
    replacements = {"ي": "ی", "ك": "ک", "ۀ": "ه‌ی"}
    for original, target in replacements.items():
        text = text.replace(original, target)
    return text.strip()

print(normalize_persian_text("متن آزمايشي با حروف عربي"))
\`\`\`

### ۴. ساختار داده JSON:
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

### ۵. کوئری پایگاه داده (SQL):
\`\`\`sql
SELECT document_id, title, word_count, created_at
FROM user_documents
WHERE language = 'fa' AND is_archived = FALSE
ORDER BY updated_at DESC
LIMIT 10;
\`\`\`

### ۶. دستورات ترمینال (Bash / Shell):
\`\`\`bash
# نصب بسته‌ها و راه‌اندازی سریع پروژه
bun install
bun run dev
\`\`\`

---

## 📊 ۵. جداول پیشرفته داده‌ها (GFM Data Tables)

| شناسه | نام مؤلفه | نوع الگوریتم | تراز پیش‌فرض | وضعیت پایداری |
| :--- | :--- | :---: | :---: | ---: |
| 01 | **موتور پارسر** | LRU Memoized Regex | راست‌چین (RTL) | ✅ پایدار |
| 02 | **هایلایتر کد** | Highlight.js Wrapper | چپ‌چین (LTR) | ✅ پایدار |
| 03 | **اسکرول همگام** | Proportional Ratio | هماهنگ | ⚡ سریع |
| 04 | **تفکیک فونت** | Unicode Range Segmenter | ترکیبی | 🛡️ بدون تداخل |

---

## 🔗 ۶. پیوندها و رسانه‌ها (Links & Media)

- صفحه رسمی مخزن پروژه: [گیت‌هاب استودیو](https://github.com)
- نشانی وب مستقیم: <https://github.com>
- راهنمای نگارش مارک‌داون: [CommonMark Specification](https://spec.commonmark.org)

تصویر نمونه با حاشیه و فریم بهینه‌شده:

![نمای استودیو مارک‌داون](https://picsum.photos/seed/markdown-studio/900/260)
`;
