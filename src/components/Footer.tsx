import { getDictionary } from '@/i18n/dictionaries';

interface FooterProps {
    lang: 'en' | 'es';
}

export default async function Footer({ lang }: FooterProps) {
    const dict = await getDictionary(lang);

    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '4rem 0',
            marginTop: '4rem',
            background: 'var(--surface)'
        }}>
            <div className="container flex flex-col items-center gap-4">
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    Audio<span style={{ color: 'var(--primary)' }}>Pro</span>Home
                </div>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '500px' }}>
                    {dict.common.footer_text}
                </p>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.875rem', marginTop: '2rem' }}>
                    © {new Date().getFullYear()} AudioProHome. {dict.common.rights}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                    {dict.common.disclaimer}
                </div>
            </div>
        </footer>
    );
}
