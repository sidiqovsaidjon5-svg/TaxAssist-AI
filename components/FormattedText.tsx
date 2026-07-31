"use client";

import React from "react";

interface FormattedTextProps {
  content: string;
  className?: string;
}

export function FormattedText({ content, className = "" }: FormattedTextProps) {
  // Parse markdown bold **text** and line breaks cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Split line by ** to identify bold sections
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <p key={lineIdx} className={lineIdx > 0 ? "mt-2" : ""}>
          {parts.map((part, partIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={partIdx} className="font-semibold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return <div className={`leading-relaxed text-slate-700 ${className}`}>{renderFormattedText(content)}</div>;
}
