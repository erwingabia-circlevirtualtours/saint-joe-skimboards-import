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
    cyan: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30',
    volt: 'bg-brand-volt/15 text-brand-volt border-brand-volt/30',
    sunset: 'bg-brand-sunset/15 text-brand-sunset border-brand-sunset/30',
    dark: 'bg-slate-800/80 text-slate-200 border-slate-700',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
