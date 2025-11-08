import React, { useState, useEffect, useRef } from "react";
import "./AnimatedBanner.css";

const AnimatedBanner = ({
  texts = ["Learn React", "Build Projects", "Get Hired"],
  typingSpeed = 120,
  erasingSpeed = 60,
  delayBeforeErase = 1000,
  delayBeforeNext = 500,
  loop = true,
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [fade, setFade] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = texts[index % texts.length];
    if (!isErasing) {
      if (text.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        // Pause before erasing
        timeoutRef.current = setTimeout(() => setIsErasing(true), delayBeforeErase);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          erasingSpeed
        );
      } else {
        // Fade out before next word
        setFade(true);
        timeoutRef.current = setTimeout(() => {
          setFade(false);
          setIsErasing(false);
          setIndex((prev) => (loop ? (prev + 1) % texts.length : prev + 1));
        }, delayBeforeNext);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isErasing, index]);

  return (
    <div className="banner-container" aria-live="polite">
      <span className={`banner-text ${fade ? "fade-out" : "fade-in"}`}>
        {text}
      </span>
      <span className="cursor">|</span>
    </div>
  );
};

export default AnimatedBanner;
