import { useEffect, useRef, useState, useCallback } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const getInteractiveElement = useCallback((target: EventTarget | null) => {
    const element = target as HTMLElement | null;
    return element?.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])') ?? null;
  }, []);

  const handleMouseOver = useCallback((e: Event) => {
    setIsHovering(Boolean(getInteractiveElement(e.target)));
  }, [getInteractiveElement]);

  const handleMouseOut = useCallback((e: Event) => {
    const currentInteractive = getInteractiveElement(e.target);
    const nextInteractive = getInteractiveElement(e.relatedTarget);

    if (currentInteractive && !nextInteractive) {
      setIsHovering(false);
    }
  }, [getInteractiveElement]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver, handleMouseOut]);

  return { position, isClicking, isHovering };
};
