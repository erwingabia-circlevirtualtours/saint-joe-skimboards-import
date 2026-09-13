import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'volt' | 'sunset' | 'dark' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
}) => {
  const styles = {
    cyan: 'bg-sky-50 text-sky-800 border-sky-200',
    volt: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    sunset: 'bg-amber-50 text-amber-800 border-amber-200',
    dark: 'bg-slate-900 text-white border-slate-800',
    outline: 'bg-white text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
