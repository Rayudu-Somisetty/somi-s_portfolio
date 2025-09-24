import { useState, useEffect } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  loop?: boolean;
  deleteSpeed?: number;
  pauseTime?: number;
}

export const useTypewriter = ({
  text,
  speed = 100,
  delay = 0,
  cursor = true,
  loop = false,
  deleteSpeed = 50,
  pauseTime = 1000,
}: TypewriterOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (!isDeleting && currentIndex === text.length) {
        // Finished typing
        setIsComplete(true);
        if (loop) {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else if (isDeleting && currentIndex > 0) {
        // Deleting
        setDisplayedText(text.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        // Finished deleting
        setIsDeleting(false);
        setIsComplete(false);
      }
    }, delay || (isDeleting ? deleteSpeed : speed));

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting, speed, delay, deleteSpeed, pauseTime, loop]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [cursor]);

  const cursorChar = showCursor ? '|' : ' ';
  
  return {
    displayedText: displayedText + (cursor ? cursorChar : ''),
    isComplete,
    isDeleting,
  };
};

export default useTypewriter;