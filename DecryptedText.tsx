"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
  className = "",
}: Props) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= text.length || iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters]);

  return <span className={className}>{displayText}</span>;
}