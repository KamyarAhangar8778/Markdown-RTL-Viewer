'use client';

/**
 * @file components/motion/loader-shapes.tsx
 * @description Advanced mathematical and SVG shape loaders (Morph, Comet, Scramble, Metaballs, Newton, Helix, Percent, DotMatrix, Dither).
 */

import React, { useEffect, useId, useState } from 'react';
import { motion } from 'motion/react';
import { EASE_IN_OUT } from '@/lib/ease';
import { PartProps } from './loader-types';

const REDUCED = {
  animate: { opacity: [1, 0.4, 1] },
  transition: { duration: 1.4, ease: EASE_IN_OUT, repeat: Infinity },
};

const MORPH_POINTS = 24;

/**
 * Calculates regular n-gon radius for morphable SVG path generation.
 */
function ngonRadius(ang: number, n: number, phase = 0): number {
  const seg = (2 * Math.PI) / n;
  const a = ang - phase;
  const local = (((a % seg) + seg) % seg) - seg / 2;
  return Math.cos(Math.PI / n) / Math.cos(local);
}

/**
 * Generates an SVG path sampled evenly at MORPH_POINTS for seamless interpolation.
 */
function morphPath(radiusAt: (ang: number) => number): string {
  const parts: string[] = [];
  for (let i = 0; i < MORPH_POINTS; i++) {
    const ang = (i / MORPH_POINTS) * 2 * Math.PI - Math.PI / 2;
    const r = Math.min(1.05, radiusAt(ang));
    const x = (50 + Math.cos(ang) * 46 * r).toFixed(2);
    const y = (50 + Math.sin(ang) * 46 * r).toFixed(2);
    parts.push(`${i === 0 ? 'M' : 'L'}${x} ${y}`);
  }
  return `${parts.join(' ')} Z`;
}

const MORPH_PATHS = [
  morphPath(() => 1),
  morphPath((a) => ngonRadius(a, 4, Math.PI / 4)),
  morphPath((a) => ngonRadius(a, 3)),
  morphPath((a) => ngonRadius(a, 6)),
  morphPath((a) => ngonRadius(a, 4)),
];

const MORPH_SEQ = [...MORPH_PATHS.flatMap((p) => [p, p]), MORPH_PATHS[0]];
const MORPH_ROT = [0, 0, 72, 72, 144, 144, 216, 216, 288, 288, 360];
const MORPH_SCALE = [1, 1, 0.88, 0.88, 1, 1, 0.88, 0.88, 1, 1, 1];

export function Morph({ size, speed, reduce }: PartProps): React.JSX.Element {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      animate={
        reduce
          ? { opacity: [1, 0.4, 1] }
          : { rotate: MORPH_ROT, scale: MORPH_SCALE }
      }
      transition={
        reduce
          ? { duration: 1.4, ease: EASE_IN_OUT, repeat: Infinity }
          : { duration: speed * 5, ease: EASE_IN_OUT, repeat: Infinity }
      }
    >
      <title>Loading</title>
      <motion.path
        fill="currentColor"
        d={MORPH_PATHS[0]}
        animate={reduce ? undefined : { d: MORPH_SEQ }}
        transition={
          reduce
            ? undefined
            : { duration: speed * 5, ease: EASE_IN_OUT, repeat: Infinity }
        }
      />
    </motion.svg>
  );
}

const COMET_TRAIL = [0, 1, 2, 3, 4, 5];

export function Comet({ size, speed, reduce }: PartProps): React.JSX.Element {
  const head = size * 0.2;
  const r = size / 2 - head / 2;
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0"
        animate={reduce ? REDUCED.animate : { rotate: 360 }}
        transition={
          reduce
            ? REDUCED.transition
            : { duration: speed, ease: 'linear', repeat: Infinity }
        }
      >
        {COMET_TRAIL.map((i) => {
          const scale = 1 - i * 0.13;
          const sz = head * scale;
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full bg-current"
              style={{
                width: sz,
                height: sz,
                marginLeft: -sz / 2,
                marginTop: -sz / 2,
                opacity: 1 - i * 0.16,
                transform: `rotate(${-i * 15}deg) translateY(${-r}px)`,
              }}
            />
          );
        })}
      </motion.span>
    </span>
  );
}

const SCRAMBLE_TARGET = 'LOADING';
const SCRAMBLE_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*#@';

export function Scramble({ size, speed, reduce }: PartProps): React.JSX.Element {
  const [text, setText] = useState(SCRAMBLE_TARGET);
  useEffect(() => {
    if (reduce) {
      return;
    }
    let tick = 0;
    const total = SCRAMBLE_TARGET.length + 4;
    const id = setInterval(
      () => {
        const reveal = tick % total;
        let s = '';
        for (let i = 0; i < SCRAMBLE_TARGET.length; i++) {
          s +=
            i < reveal
              ? SCRAMBLE_TARGET[i]
              : SCRAMBLE_GLYPHS[
                  Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)
                ];
        }
        setText(s);
        tick++;
      },
      (speed / SCRAMBLE_TARGET.length) * 1000 * 0.55,
    );
    return () => clearInterval(id);
  }, [speed, reduce]);

  const displayText = reduce ? SCRAMBLE_TARGET : text;

  return (
    <span
      className="font-mono font-medium tracking-[0.2em] tabular-nums"
      style={{ fontSize: size * 0.42 }}
    >
      {displayText}
    </span>
  );
}

export function Metaballs({ size, speed, reduce }: PartProps): React.JSX.Element {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img">
      <title>Loading</title>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feColorMatrix
            in="b"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
          />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill="currentColor">
        <motion.circle
          cy="50"
          r="15"
          animate={reduce ? { opacity: [0.4, 1, 0.4] } : { cx: [30, 70, 30] }}
          transition={{ duration: speed * 1.6, ease: EASE_IN_OUT, repeat: Infinity }}
          cx={reduce ? 40 : 30}
        />
        <motion.circle
          cy="50"
          r="15"
          animate={reduce ? { opacity: [0.4, 1, 0.4] } : { cx: [70, 30, 70] }}
          transition={{ duration: speed * 1.6, ease: EASE_IN_OUT, repeat: Infinity }}
          cx={reduce ? 60 : 70}
        />
      </g>
    </svg>
  );
}

const NEWTON_BALLS = [0, 1, 2, 3, 4];

export function Newton({ size, speed, reduce }: PartProps): React.JSX.Element {
  const d = size * 0.2;
  const out = d * 1.1;
  const moves: Record<number, { x: number[]; times: number[] }> = {
    0: { x: [0, -out, 0, 0], times: [0, 0.28, 0.5, 1] },
    4: { x: [0, 0, out, 0], times: [0, 0.5, 0.78, 1] },
  };

  return (
    <span className="flex items-center justify-center" style={{ height: d }}>
      {NEWTON_BALLS.map((i) => {
        const move = moves[i];
        return (
          <motion.span
            key={i}
            className="rounded-full bg-current"
            style={{ width: d, height: d }}
            animate={reduce || !move ? undefined : { x: move.x }}
            transition={
              reduce || !move
                ? undefined
                : {
                    duration: speed * 1.5,
                    ease: EASE_IN_OUT,
                    repeat: Infinity,
                    times: move.times,
                  }
            }
          />
        );
      })}
    </span>
  );
}

export function Helix({ size, speed, reduce }: PartProps): React.JSX.Element {
  const rows = 7;
  const dot = size * 0.14;
  const amp = size * 0.32;
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      {Array.from({ length: rows }, (_, r) => {
        const top = (r / (rows - 1)) * (size - dot);
        const delay = (r / rows) * speed;
        return (
          <span key={`row-${top}`}>
            <motion.span
              className="absolute rounded-full bg-current"
              style={{ width: dot, height: dot, left: size / 2 - dot / 2, top }}
              animate={
                reduce
                  ? { opacity: [0.4, 1, 0.4] }
                  : {
                      x: [amp, -amp, amp],
                      scale: [1, 0.5, 1],
                      opacity: [1, 0.45, 1],
                    }
              }
              transition={{
                duration: speed,
                ease: EASE_IN_OUT,
                repeat: Infinity,
                delay,
              }}
            />
            <motion.span
              className="absolute rounded-full bg-current"
              style={{ width: dot, height: dot, left: size / 2 - dot / 2, top }}
              animate={
                reduce
                  ? { opacity: [0.4, 1, 0.4] }
                  : {
                      x: [-amp, amp, -amp],
                      scale: [0.5, 1, 0.5],
                      opacity: [0.45, 1, 0.45],
                    }
              }
              transition={{
                duration: speed,
                ease: EASE_IN_OUT,
                repeat: Infinity,
                delay,
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

export function Percent({ size, speed, reduce }: PartProps): React.JSX.Element {
  const [p, setP] = useState(0);
  useEffect(() => {
    const dur = (reduce ? speed * 2 : speed) * 1000;
    const start = { t: 0 };
    const tickMs = 40;
    const id = setInterval(() => {
      start.t += tickMs;
      const next = Math.min(100, Math.round((start.t / dur) * 100));
      setP(next);
      if (next >= 100) start.t = 0;
    }, tickMs);
    return () => clearInterval(id);
  }, [speed, reduce]);

  return (
    <span
      className="flex flex-col items-center"
      style={{ gap: size * 0.14, width: size * 1.4 }}
    >
      <span
        className="font-mono font-medium tabular-nums"
        style={{ fontSize: size * 0.42, lineHeight: 1 }}
      >
        {p}%
      </span>
      <span
        className="w-full overflow-hidden rounded-full bg-current/15"
        style={{ height: Math.max(3, size * 0.1) }}
      >
        <span
          className="block h-full rounded-full bg-current"
          style={{ width: `${p}%` }}
        />
      </span>
    </span>
  );
}

export function DotMatrix({ size, speed, reduce }: PartProps): React.JSX.Element {
  const n = 3;
  const gap = size * 0.14;
  const dot = (size - gap * (n - 1)) / n;
  const cells = Array.from({ length: n * n }, (_, idx) => idx);
  return (
    <span
      className="grid"
      style={{
        gap,
        gridTemplateColumns: `repeat(${n}, ${dot}px)`,
      }}
    >
      {cells.map((idx) => {
        const x = idx % n;
        const y = Math.floor(idx / n);
        const delay = ((x + y) / (2 * (n - 1))) * speed;
        return (
          <motion.span
            key={idx}
            className="rounded-full bg-current"
            style={{ width: dot, height: dot }}
            animate={
              reduce
                ? { opacity: [0.3, 1, 0.3] }
                : { opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }
            }
            transition={{
              duration: speed,
              ease: EASE_IN_OUT,
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
    </span>
  );
}

const BAYER_4 = [
  0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5,
];

export function Dither({ size, speed, reduce }: PartProps): React.JSX.Element {
  const n = 4;
  const gap = Math.max(1, size * 0.05);
  const cell = (size - gap * (n - 1)) / n;
  return (
    <span
      className="grid"
      style={{ gap, gridTemplateColumns: `repeat(${n}, ${cell}px)` }}
    >
      {BAYER_4.map((order, idx) => (
        <motion.span
          key={`dither-${idx}`}
          className="bg-current"
          style={{ width: cell, height: cell }}
          animate={reduce ? { opacity: [0.3, 1, 0.3] } : { opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: speed,
            ease: EASE_IN_OUT,
            repeat: Infinity,
            delay: (order / BAYER_4.length) * speed,
          }}
        />
      ))}
    </span>
  );
}
