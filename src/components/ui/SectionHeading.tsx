import { type ReactNode } from 'react';
import Badge from './Badge';

interface SectionHeadingProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}
    >
      {badge && (
        <Badge variant={dark ? 'dark' : 'light'}>
          {badge}
        </Badge>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
