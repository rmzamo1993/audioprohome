import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';

interface HeaderProps {
  lang: 'en' | 'es';
}

export default async function Header({ lang }: HeaderProps) {
  const dict = await getDictionary(lang);

  return (
    <header style={{
      height: 'var(--header-height)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container flex items-center justify-between" style={{ height: '100%' }}>
        <Link href={`/${lang}`} style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Audio<span style={{ color: 'var(--primary)' }}>Pro</span>Home
        </Link>

        <nav className="flex gap-8">
          <Link href={`/${lang}`} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dict.common.home}</Link>
          <Link href={`/${lang}?category=Monitor`} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dict.common.monitors}</Link>
          <Link href={`/${lang}?category=Interface`} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dict.common.interfaces}</Link>
          <Link href={`/${lang}?category=Headphones`} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dict.common.headphones}</Link>
          <Link href={`/${lang}?category=Microphone`} style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{dict.common.microphones}</Link>
          <Link href={lang === 'en' ? '/es' : '/en'} style={{ color: 'var(--secondary)', fontWeight: 600 }}>
            {lang === 'en' ? 'ES' : 'EN'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
