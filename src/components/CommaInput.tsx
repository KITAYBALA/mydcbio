import React, { useState, useEffect } from 'react';

interface CommaInputProps {
  value: string[];
  onChange: (items: string[]) => void;
  className?: string;
  placeholder?: string;
  isTextarea?: boolean;
  rows?: number;
}

export const CommaInput: React.FC<CommaInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'tag1, tag2, tag3',
  isTextarea = false,
  rows = 3,
}) => {
  const [text, setText] = useState(() => (value || []).join(', '));

  // Sync if value was replaced externally (e.g. Reset Defaults, Tab switch, external state update)
  useEffect(() => {
    const currentParsed = text
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const isDifferent =
      currentParsed.length !== (value || []).length ||
      currentParsed.some((val, idx) => val !== value[idx]);

    if (isDifferent) {
      setText((value || []).join(', '));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawVal = e.target.value;
    setText(rawVal);

    const parsed = rawVal
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onChange(parsed);
  };

  const handleBlur = () => {
    const parsed = text
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    setText(parsed.join(', '));
    onChange(parsed);
  };

  if (isTextarea) {
    return (
      <textarea
        rows={rows}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
    />
  );
};
