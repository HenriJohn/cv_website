import React, { useState, useEffect, useRef } from 'react';

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
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(delay === 0);
    const indexRef = useRef(0);

    useEffect(() => {
        // Reset on text change
        setDisplayedText('');
        setIsComplete(false);
        setHasStarted(delay === 0);
        indexRef.current = 0;
    }, [text, delay]);

    useEffect(() => {
        if (delay > 0 && !hasStarted) {
            const delayTimeout = setTimeout(() => {
                setHasStarted(true);
            }, delay);
            return () => clearTimeout(delayTimeout);
        }
    }, [delay, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        if (indexRef.current < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, indexRef.current + 1));
                indexRef.current += 1;
            }, speed);

            return () => clearTimeout(timeout);
        } else if (indexRef.current === text.length && text.length > 0) {
            setIsComplete(true);
        }
    }, [hasStarted, displayedText, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${isComplete ? 'animate-blink' : ''}`} />
            )}
        </span>
    );
};

export default TypingAnimation;
