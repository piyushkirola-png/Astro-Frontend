import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'accent';
  className?: string;
}

export default function Badge({ children, variant = 'light', className = '' }: BadgeProps) {
  const variants = {
    light: 'bg-accent-50 text-accent-700 border-accent-200',
    dark: 'bg-white/10 text-accent-300 border-white/15',
    accent: 'bg-accent-500 text-white border-accent-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
