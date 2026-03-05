import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ─── Config ────────────────────────────────────────────────────────────────
const WORDS = ['PRIME GATE'];
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const FLAP_INTERVAL_MS = 55;   // speed of random flipping
const SETTLE_STAGGER_MS = 70;  // delay between each letter locking in

// ─── Colour palette matching INTERFACE template ─────────────────────────────
const COLOR = {
  bg: '#0a0a0a',
  bgBottom: '#111111',
  divider: '#000000',
  border: 'rgba(255,255,255,0.07)',
  shadow: '0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
  textShuffle: '#FF6B00',       // orange while flipping
  textSettled: '#F5F5F5',       // near-white when locked
  textSettledBottom: '#CECECE', // slightly dimmer on bottom half
  textShuffleBottom: '#CC4400',
};

// ─── Single Flap ─────────────────────────────────────────────────────────────
interface FlapProps {
  char: string;
  isSettled: boolean;
  isActive: boolean; // currently shuffling
}

function Flap({ char, isSettled, isActive }: FlapProps) {
  const topRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);
  const prevChar = useRef(char);

  // Subtle GSAP flip tween on every char change while shuffling
  useEffect(() => {
    if (!topRef.current || !botRef.current) return;
    if (prevChar.current === char && !isActive) return;
    prevChar.current = char;

    // quick Y-scale blip to simulate the mechanical flip
    gsap.fromTo(
      topRef.current,
      { scaleY: 0.6, opacity: 0.4 },
      { scaleY: 1, opacity: 1, duration: 0.06, ease: 'power1.out' }
    );
    gsap.fromTo(
      botRef.current,
      { scaleY: 0.6, opacity: 0.4 },
      { scaleY: 1, opacity: 1, duration: 0.06, ease: 'power1.out', delay: 0.03 }
    );
  }, [char, isActive]);

  return (
    <div
      className="relative flex-shrink-0 select-none"
      style={{
        width: 'clamp(28px, 5.5vw, 64px)',
        height: 'clamp(40px, 7.5vw, 88px)',
        background: COLOR.bg,
        border: `1px solid ${COLOR.border}`,
        borderRadius: 4,
        boxShadow: COLOR.shadow,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* ── Top half ── */}
      <div
        className="absolute inset-0 flex items-end justify-center overflow-hidden"
        style={{ bottom: '50%', background: COLOR.bg }}
      >
        <span
          ref={topRef}
          className="font-mono font-bold leading-none"
          style={{
            fontSize: 'clamp(18px, 3.8vw, 48px)',
            transform: 'translateY(50%)',
            color: isSettled ? COLOR.textSettled : isActive ? COLOR.textShuffle : '#555',
            transition: isSettled ? 'color 0.4s ease' : 'none',
            letterSpacing: '0.02em',
          }}
        >
          {char || ' '}
        </span>
      </div>

      {/* ── Bottom half ── */}
      <div
        className="absolute inset-0 flex items-start justify-center overflow-hidden"
        style={{ top: '50%', background: COLOR.bgBottom }}
      >
        <span
          ref={botRef}
          className="font-mono font-bold leading-none"
          style={{
            fontSize: 'clamp(18px, 3.8vw, 48px)',
            transform: 'translateY(-50%)',
            color: isSettled ? COLOR.textSettledBottom : isActive ? COLOR.textShuffleBottom : '#444',
            transition: isSettled ? 'color 0.4s ease' : 'none',
            letterSpacing: '0.02em',
          }}
        >
          {char || ' '}
        </span>
      </div>

      {/* ── Centre split line ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-20"
        style={{
          top: 'calc(50% - 1px)',
          height: 2,
          background: COLOR.divider,
          boxShadow: '0 0 4px 2px rgba(0,0,0,0.95)',
        }}
      />
    </div>
  );
}

// ─── Row of flaps for one word ───────────────────────────────────────────────
interface FlapRowProps {
  target: string;
}

function FlapRow({ target }: FlapRowProps) {
  const letters = target.split('');
  const [chars, setChars] = useState<string[]>(
    letters.map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)])
  );
  const [settled, setSettled] = useState<boolean[]>(letters.map(() => false));
  const [active, setActive] = useState<boolean[]>(letters.map(() => true));

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Global shuffle tick — randomises all unsettled letters each frame
    tickRef.current = setInterval(() => {
      setChars(prev =>
        prev.map((c, i) =>
          settled[i]
            ? letters[i]
            : CHARSET[Math.floor(Math.random() * CHARSET.length)]
        )
      );
    }, FLAP_INTERVAL_MS);

    // Stagger-settle: each letter locks in with increasing delay
    letters.forEach((letter, idx) => {
      const t = setTimeout(() => {
        setChars(prev => { const n = [...prev]; n[idx] = letter; return n; });
        setSettled(prev => { const n = [...prev]; n[idx] = true; return n; });
        setActive(prev => { const n = [...prev]; n[idx] = false; return n; });
      }, 500 + idx * SETTLE_STAGGER_MS);
      timeoutsRef.current.push(t);
    });

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      timeoutsRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop global ticker once everything is settled
  useEffect(() => {
    if (settled.every(Boolean) && tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settled]);

  return (
    <div className="flex items-center" style={{ gap: 'clamp(2px, 0.4vw, 6px)' }}>
      {letters.map((letter, i) =>
        letter === ' ' ? (
          <div
            key={i}
            style={{ width: 'clamp(10px, 1.5vw, 22px)', flexShrink: 0 }}
          />
        ) : (
          <Flap
            key={i}
            char={chars[i] ?? letter}
            isSettled={settled[i]}
            isActive={active[i]}
          />
        )
      )}
    </div>
  );
}

// ─── Public component ────────────────────────────────────────────────────────
export default function SolariBoard() {
  return (
    <div
      className="inline-flex flex-col items-center"
      style={{ gap: 'clamp(6px, 1vw, 14px)' }}
      role="heading"
      aria-level={1}
      aria-label={WORDS.join(' ')}
    >
      {/* Animated board rows */}
      <div
        className="flex flex-col items-center"
        style={{
          gap: 'clamp(4px, 0.6vw, 8px)',
          padding: 'clamp(10px, 1.5vw, 20px)',
          background: 'rgba(0,0,0,0.15)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {WORDS.map((word, i) => (
          <FlapRow key={i} target={word} />
        ))}
      </div>

      {/* Static "IMPORTS" subtitle */}
      <p
        className="uppercase font-light tracking-[0.5em] text-zinc-400"
        style={{ fontSize: 'clamp(9px, 1.1vw, 13px)', marginTop: 'clamp(6px, 1vw, 16px)' }}
      >
        IMPORTS
      </p>
    </div>
  );
}
