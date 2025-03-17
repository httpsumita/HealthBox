"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface FadeInTextProps {
  text: string;
  subtext?: string; // Optional subtext
  className?: string;
  subtextClassName?: string; // Custom styles for subtext
  delay?: number; // Optional delay before animation starts
}

const FadeInText: React.FC<FadeInTextProps> = ({
  text,
  subtext,
  className,
  subtextClassName,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div className="flex flex-col items-center mt-16">
      {/* Main Text */}
      <h1
        className={clsx(
          "opacity-0 transition-opacity duration-500 ease-in-out font-semibold text-center px-16",
          isVisible ? "opacity-100" : "",
          className
        )}
      >
        {text}
      </h1>

      {/* Subtext (Optional) */}
      {subtext && (
        <p
          className={clsx(
            "opacity-0 transition-opacity duration-500 ease-in-out mt-5", // Delayed fade-in
            isVisible ? "opacity-100" : "",
            subtextClassName
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};

export default FadeInText;
