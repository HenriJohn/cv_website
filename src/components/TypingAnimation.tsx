import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    showCursor?: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ 
    text, 
    speed = 100, 
    delay = 0,
    className = '',
    showCursor = true 
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (delay > 0) {
            const delayTimeout = setTimeout(() => {
                setCurrentIndex(0);
            }, delay);
            return () => clearTimeout(delayTimeout);
        }
    }, [delay]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && text.length > 0) {
            setIsComplete(true);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 ${isComplete ? 'animate-blink' : ''}`}>
                    |
                </span>
            )}
        </span>
    );
};

export default TypingAnimation;
