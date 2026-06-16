import { useEffect } from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import cursorIcon from '@/assets/cursor-icon.png';
import clickIcon from '@/assets/click-icon.png';

type CustomCursorProps = {
  returnToDefaultCursor?: boolean;
};

const CustomCursor = ({ returnToDefaultCursor = true }: CustomCursorProps) => {
  const { position, isClicking, isHovering } = useCustomCursor();
  const cursorEnabled = !returnToDefaultCursor;
  const showClickIcon = isClicking || isHovering;
  const activeCursorIcon = showClickIcon ? clickIcon : cursorIcon;

  useEffect(() => {
    if (cursorEnabled) {
      document.body.classList.add('custom-cursor-hidden');
    } else {
      document.body.classList.remove('custom-cursor-hidden');
    }

    return () => {
      document.body.classList.remove('custom-cursor-hidden');
    };
  }, [cursorEnabled]);

  if (!cursorEnabled) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="cursor-inner"
        style={{
          left: position.x,
          top: position.y,
          backgroundImage: `url(${activeCursorIcon})`,
          transform: isClicking ? 'translate3d(-50%, -50%, 0) scale(0.8)' : 'translate3d(-50%, -50%, 0) scale(1)',
        }}
      />
    </>
  );
};

export default CustomCursor;
