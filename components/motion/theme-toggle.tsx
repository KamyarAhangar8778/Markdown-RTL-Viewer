"use client";

/**
 * @file components/motion/theme-toggle.tsx
 * @description Theme toggle component repainting the page through the View Transition API.
 * Supports rectangle, circle, circle-blur, and blinds animation variants.
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { useEffect, useSyncExternalStore, type ComponentPropsWithoutRef } from "react";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { cn } from "@/lib/utils";
import {
  type ThemeVariant,
  type RectStart,
  VT_STYLE_ID,
  VT_CSS,
  RECT_FROM,
  CIRCLE_ORIGIN,
} from "./theme-toggle-config";

export type { ThemeVariant, RectStart };

const emptySubscribe = () => () => {};

export interface ThemeToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick" | "onToggle"> {
  /** Animation variant for the reveal. Default: "rectangle". */
  variant?: ThemeVariant;
  /** Origin direction for the reveal. Default: "bottom-up". */
  start?: RectStart;
  /** Custom CSS classes for the toggle icon. */
  iconClassName?: string;
  /** Optional click callback after toggle execution. */
  onToggle?: (newTheme: "light" | "dark") => void;
}

/**
 * Custom hook to toggle theme using the View Transition API with configurable variants.
 *
 * @param {object} options - Options including variant and origin direction.
 * @returns {object} Controller object containing theme state and toggle function.
 */
export function useThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
}: { variant?: ThemeVariant; start?: RectStart } = {}) {
  const { setTheme, resolvedTheme } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(VT_STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = VT_STYLE_ID;
    el.textContent = VT_CSS;
    document.head.appendChild(el);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || resolvedTheme === undefined) : true;

  const toggle = (originOverride?: string) => {
    const next = isDark ? "light" : "dark";

    if (reduce || typeof document === "undefined" || !("startViewTransition" in document)) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    if (variant === "rectangle") {
      root.style.setProperty("--beui-vt-from", RECT_FROM[start]);
      root.dataset.beuiVt = "rect";
    } else if (variant === "blinds") {
      root.dataset.beuiVt = "blinds";
    } else {
      const origin = originOverride || CIRCLE_ORIGIN[start];
      root.style.setProperty("--beui-vt-origin", origin);
      root.dataset.beuiVt = variant;
    }

    const docWithVT = document as Document & {
      startViewTransition(cb: () => void | Promise<void>): { finished: Promise<void> };
    };

    const vt = docWithVT.startViewTransition(() => {
      setTheme(next);
    });

    vt.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return { isDark, mounted, toggle };
}

/**
 * ThemeToggle button component rendering an interactive icon with View Transition reveals.
 */
export function ThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
  className,
  iconClassName,
  onToggle,
  ...rest
}: ThemeToggleProps) {
  const { isDark, mounted, toggle } = useThemeToggle({ variant, start });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let origin: string | undefined;
    if (variant === "circle" || variant === "circle-blur") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((rect.left + rect.width / 2) / window.innerWidth) * 100);
      const y = Math.round(((rect.top + rect.height / 2) / window.innerHeight) * 100);
      origin = `${x}% ${y}%`;
    }
    toggle(origin);
    onToggle?.(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleClick}
      className={cn("flex items-center justify-center cursor-pointer select-none", className)}
      {...rest}
    >
      {mounted ? (
        <ActionSwapIcon
          value={isDark ? "dark" : "light"}
          animation="blur"
          className={iconClassName}
        >
          {isDark ? (
            <Sun className={iconClassName} />
          ) : (
            <Moon className={iconClassName} />
          )}
        </ActionSwapIcon>
      ) : (
        <span className={iconClassName} aria-hidden="true" />
      )}
    </button>
  );
}
