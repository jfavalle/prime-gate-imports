import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-=?';
const TARGET = 'PRIME GATE IMPORTS';
const SHUFFLE_DURATION = 80;   // ms per frame during shuffle
const SETTLE_DELAY = 60;       // ms between each letter settling

interface FlipFlapProps {
  char: string;
  isSpace: boolean;
  settled: boolean;
  shuffling: boolean;
}

function FlipFlap({ char, isSpace, settled, shuffling }: FlipFlapProps) {
  if (isSpace) {
    return <div className="w-3 sm:w-4 lg:w-5 flex-shrink-0" aria-hidden="true" />;
  }

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center justify-center
                 bg-zinc-950 rounded-sm overflow-hidden
                 w-[1.6rem] h-[2.2rem]
                 sm:w-[2rem] sm:h-[2.8rem]
                 lg:w-[3rem] lg:h-[4.2rem]
                 shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top half */}
      <div className="absolute inset-0 bottom-1/2 flex items-end justify-center overflow-hidden bg-zinc-950">
        <span
          className="font-mono font-bold tracking-tighter select-none leading-none
                     text-base sm:text-xl lg:text-3xl
                     translate-y-1/2"
          style={{
            color: settled ? '#FFFFFF' : shuffling ? '#D4AF37' : '#888',
            transition: settled ? 'color 0.3s ease' : 'none',
            fontFamily: "'Geist Mono', 'Courier New', monospace",
            textShadow: settled ? '0 0 12px rgba(212,175,55,0.25)' : 'none',
          }}
        >
          {char}
        </span>
      </div>

      {/* Bottom half */}
      <div className="absolute inset-0 top-1/2 flex items-start justify-center overflow-hidden"
        style={{ background: 'rgb(9,9,11)' }}
      >
        <span
          className="font-mono font-bold tracking-tighter select-none leading-none
                     text-base sm:text-xl lg:text-3xl
                     -translate-y-1/2"
          style={{
            color: settled ? '#E4E4E7' : shuffling ? '#B8941F' : '#666',
            transition: settled ? 'color 0.3s ease' : 'none',
            fontFamily: "'Geist Mono', 'Courier New', monospace",
          }}
        >
          {char}
        </span>
      </div>

      {/* Center split line — the mechanical split */}
      <div
        className="absolute left-0 right-0 z-10"
        style={{
          top: 'calc(50% - 0.5px)',
          height: '1px',
          background: 'rgba(0,0,0,0.85)',
          boxShadow: '0 0 3px 1px rgba(0,0,0,0.9)',
        }}
      />

      {/* Subtle screw dots top */}
      <div className="absolute top-[3px] left-[3px] w-[3px] h-[3px] rounded-full bg-white/5" />
      <div className="absolute top-[3px] right-[3px] w-[3px] h-[3px] rounded-full bg-white/5" />
    </div>
  );
}

export default function SolariBoard() {
  const targetChars = TARGET.split('');
  const [displayChars, setDisplayChars] = useState<string[]>(
    targetChars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
  );
  const [settled, setSettled] = useState<boolean[]>(targetChars.map(() => false));
  const [shuffling, setShuffling] = useState<boolean[]>(targetChars.map(() => true));

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Global shuffle interval — keeps randomizing all unsettled chars
    intervalRef.current = setInterval(() => {
      setDisplayChars(prev =>
        prev.map((ch, i) =>
          settled[i]
            ? targetChars[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
    }, SHUFFLE_DURATION);

    // Stagger-settle each letter one by one
    targetChars.forEach((_, idx) => {
      const t = setTimeout(() => {
        setDisplayChars(prev => {
          const next = [...prev];
          next[idx] = targetChars[idx];
          return next;
        });
        setSettled(prev => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        setShuffling(prev => {
          const next = [...prev];
          next[idx] = false;
          return next;
        });
      }, 400 + idx * SETTLE_DELAY);

      timeoutsRef.current.push(t);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeoutsRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update display for settled chars (ensure they don't get overwritten)
  useEffect(() => {
    const allSettled = settled.every(Boolean);
    if (allSettled && intervalRef.current) {
      clearInterval(intervalRef.current);
      setDisplayChars(targetChars.map((c) => c));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settled]);

  return (
    <div
      className="inline-flex flex-wrap justify-center gap-[3px] sm:gap-1 lg:gap-[5px]
                 px-4 py-3 sm:px-6 sm:py-4
                 rounded-lg"
      style={{
        background: 'rgba(0,0,0,0.08)',
      }}
      aria-label="Prime Gate Imports"
      role="heading"
      aria-level={1}
    >
      {targetChars.map((ch, i) =>
        ch === ' ' ? (
          <FlipFlap key={i} char="" isSpace settled={false} shuffling={false} />
        ) : (
          <FlipFlap
            key={i}
            char={displayChars[i] ?? ch}
            isSpace={false}
            settled={settled[i]}
            shuffling={shuffling[i]}
          />
        )
      )}
    </div>
  );
}
