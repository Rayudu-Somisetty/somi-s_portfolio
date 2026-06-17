import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import cursorIcon from '@/assets/cursor-icon.png';
import cursorLightIcon from '@/assets/cursor-icon(2).png';
import clickIcon from '@/assets/click-icon.png';
import clickLightIcon from '@/assets/click-icon(2).png';

type CustomCursorProps = {
  returnToDefaultCursor?: boolean;
};

const CustomCursor = ({ returnToDefaultCursor = true }: CustomCursorProps) => {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -9999, y: -9999 });
  const isClickingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorEnabled = !returnToDefaultCursor;
  const showClickIcon = isClicking || isHovering;
  const activeCursorIcon = theme === 'light'
    ? showClickIcon
      ? clickLightIcon
      : cursorLightIcon
    : showClickIcon
      ? clickIcon
      : cursorIcon;
  const activeCursorBackground = `url("${activeCursorIcon}")`;

  const updateCursorTransform = useCallback(() => {
    const cursorElement = cursorRef.current;
    if (!cursorElement) {
      return;
    }

    const { x, y } = positionRef.current;
    const scale = isClickingRef.current ? 0.8 : 1;
    cursorElement.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`;
  }, []);

  const setCursorHovering = useCallback((nextIsHovering: boolean) => {
    if (isHoveringRef.current === nextIsHovering) {
      return;
    }

    isHoveringRef.current = nextIsHovering;
    setIsHovering(nextIsHovering);
  }, []);

  const setCursorClicking = useCallback((nextIsClicking: boolean) => {
    if (isClickingRef.current === nextIsClicking) {
      return;
    }

    isClickingRef.current = nextIsClicking;
    setIsClicking(nextIsClicking);
    updateCursorTransform();
  }, [updateCursorTransform]);

  useEffect(() => {
    const cursorElement = cursorRef.current;
    if (!cursorElement) {
      return;
    }

    cursorElement.style.backgroundImage = activeCursorBackground;
    cursorElement.className = `cursor-inner cursor-inner--${theme}`;
  }, [activeCursorBackground, theme]);

  useEffect(() => {
    if (!cursorEnabled) {
      document.body.classList.remove('custom-cursor-hidden');
      return;
    }

    const getInteractiveElement = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      return element?.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])') ?? null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        updateCursorTransform();
      });
    };

    const handlePointerDown = () => setCursorClicking(true);
    const handlePointerUp = () => setCursorClicking(false);

    const handlePointerOver = (event: PointerEvent) => {
      setCursorHovering(Boolean(getInteractiveElement(event.target)));
    };

    const handlePointerOut = (event: PointerEvent) => {
      const currentInteractive = getInteractiveElement(event.target);
      const nextInteractive = getInteractiveElement(event.relatedTarget);

      if (currentInteractive && !nextInteractive) {
        setCursorHovering(false);
      }
    };

    document.body.classList.add('custom-cursor-hidden');
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    updateCursorTransform();

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      document.body.classList.remove('custom-cursor-hidden');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, [cursorEnabled, setCursorClicking, setCursorHovering, updateCursorTransform]);

  if (!cursorEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`cursor-inner cursor-inner--${theme}`}
      style={{
        backgroundImage: activeCursorBackground,
      }}
    />
  );
};

export default CustomCursor;
