'use client'
import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

type InputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: LucideIcon;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  defaultValue,
  onChange,
  onKeyDown,
  onBlur,
  placeholder,
  type = 'text',
  className = '',
  icon: Icon,
  label,
}, ref) => {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-lg bg-[#111827] border border-[#374151] text-white placeholder-gray-500 transition duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 ${className}`}
        />
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
