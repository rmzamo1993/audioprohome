import { getDictionary } from '@/i18n/dictionaries';

interface PageProps {
    params: Promise<{ lang: 'en' | 'es' }>;
}

export default async function ProcessPage({ params }: PageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <div className="container" style={{ padding: '6rem 20px', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to bottom right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {dict.process.title}
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '2rem' }}>
                    {dict.process.subtitle}
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                    {dict.process.intro}
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {[
                    { title: dict.process.step1_title, desc: dict.process.step1_desc, icon: '🔍' },
                    { title: dict.process.step2_title, desc: dict.process.step2_desc, icon: '🎛️' },
                    { title: dict.process.step3_title, desc: dict.process.step3_desc, icon: '⚖️' },
                    { title: dict.process.step4_title, desc: dict.process.step4_desc, icon: '✅' }
                ].map((step, index) => (
                    <div key={index} className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{step.icon}</div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
