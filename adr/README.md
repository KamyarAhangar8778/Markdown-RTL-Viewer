# Architectural Decision Records (ADRs)

این پوشه شامل تمامی سوابق تصمیم‌گیری‌های معماری (Architecture Decision Records) پروژه **RTL Markdown Studio** است. تمامی تصمیمات به روش ساختاریافته، شفاف و بر اساس استانداردهای مهندسی نرم‌افزار مستند شده‌اند.

---

## فهرست تصمیمات معماری (ADR Index)

| شماره | عنوان تصمیم | وضعیت | تاریخ | حوزه فنی |
| :--- | :--- | :--- | :--- | :--- |
| **[ADR-0001](./0001-rtl-markdown-architecture.md)** | معماری تبدیل و رندر دو لایه‌ای مارک‌داون راست‌چین (RTL) | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۱ | Core Domain / Rendering |
| **[ADR-0002](./0002-desktop-only-smooth-scroll.md)** | معماری اسکرول نرم انحصاری دسکتاپ با بارگذاری تنبل | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۲ | UX / Performance |
| **[ADR-0003](./0003-hybrid-code-typography-and-font-caching.md)** | تایپوگرافی هیبریدی بلاک‌های کد و کش تغییرناپذیر فونت | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۲ | Typography / Performance |
| **[ADR-0004](./0004-floating-island-header.md)** | معماری هدر شناور کپسولی (Floating Island) | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۳ | UI Shell / Design System |
| **[ADR-0005](./0005-deep-markdown-engine-seam.md)** | ماژول عمیق دامنه مارک‌داون و درز موتور درون‌پردازشی | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۳ | Architecture / Deep Modules |
| **[ADR-0006](./0006-three-layer-motion-design-system.md)** | سیستم موشن سه‌لایه‌ای و توکن‌های فنری فیزیک‌محور | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۴ | Motion Design / Animation |
| **[ADR-0007](./0007-fluid-magnification-studio-dock.md)** | معماری داک بزرگ‌نمایی شناور استودیو با فیزیک مجاورت | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۴ | Interaction Design / Toolbar |
| **[ADR-0008](./0008-zero-backend-client-side-privacy.md)** | پردازش ۱۰۰٪ سمت کلاینت و حریم خصوصی بدون تله‌متری | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۴ | Privacy / Security |
| **[ADR-0009](./0009-active-line-position-tracking.md)** | رهگیری غیرمسدودکننده خط فعال ویرایشگر در زمان واقعی | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۴ | Performance / Editor |
| **[ADR-0010](./0010-deferred-reactive-state-pipeline.md)** | وضعیت واکنشی معوق و بهینه‌سازی پایپ‌لاین پردازش | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۴ | React State / Performance |
| **[ADR-0011](./0011-zero-dependency-dual-language-i18n.md)** | بومی‌سازی دوزبانه تایپ‌سیف بدون وابستگی خارجی | پذیرفته‌شده | ۲۰۲۶-۰۹-۰4 | Internationalization (i18n) |
| **[ADR-0012](./0012-lru-caching-and-off-thread-processing.md)** | سیستم کش LRU و پردازش غیرمسدودکننده خارج از حلقه رندر | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۶ | Performance / Caching |
| **[ADR-0013](./0013-github-pages-static-deployment.md)** | استقرار ایستا روی GitHub Pages با خط لوله خودکار GitHub Actions | پذیرفته‌شده | ۲۰۲۶-۰۹-۰۷ | Deployment / CI-CD |

---

## استاندارد نگارش ADR

کلیه مستندات جدید باید از فرمت استاندارد زیر پیروی کنند:
1. **عنوان و شماره ترتیبی:** نام کوتاه و گویای تصمیم به همراه شناسه ۴ رقمی.
2. **وضعیت (Status):** `Accepted`, `Proposed`, `Deprecated`, `Superseded`.
3. **تاریخ (Date):** تاریخ ثبت تصمیم.
4. **زمینه و مسئله (Context):** شرح چالش فنی یا تجربیاتی که منجر به اتخاذ تصمیم شده است.
5. **تصمیم (Decision):** جزئیات راهکار مهندسی پیاده‌سازی‌شده و ساختار ماژول‌ها.
6. **پیامدها و بده‌بستان‌ها (Consequences):** نتایج مثبت، پیامدهای جانبی و Trade-offهای فنی.
