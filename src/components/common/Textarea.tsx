// src/components/common/Textarea.tsx
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        id={name}
        name={name}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        {...props}
      />
    </div>
  );
};
