import { useState, useEffect } from 'react';

interface TypewriterCycleOptions {
  texts: string[];
  speed?: number;
  delay?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
}

export const useTypewriterCycle = ({
  texts,
  speed = 100,
  delay = 0,
  deleteSpeed = 50,
  pauseDuration = 2000,
  cursor = true
}: TypewriterCycleOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    if (delay > 0 && !hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    } else {
      setHasStarted(true);
    }
  }, [delay, hasStarted, texts.length]);

  useEffect(() => {
    if (!hasStarted || texts.length === 0 || isPaused) return;

    const currentText = texts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        } else {
          // Finished typing - pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting backward
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting - move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [displayedText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [cursor]);

  return {
    displayedText,
    isComplete: !isDeleting && displayedText === texts[currentTextIndex],
    isDeleting,
    currentTextIndex,
    cursor: cursor && showCursor ? '|' : ''
  };
};

export default useTypewriterCycle;