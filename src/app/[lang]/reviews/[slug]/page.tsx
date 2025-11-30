import { getProducts } from '@/lib/products';
import { getDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string; lang: 'en' | 'es' }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, lang } = await params;
    const products = getProducts(lang);
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.title} Review - AudioProHome`,
        description: product.summary,
    };
}

export default async function ReviewPage({ params }: PageProps) {
    const { slug, lang } = await params;
    const dict = await getDictionary(lang);
    const products = getProducts(lang);
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 20px' }}>
            <div className="flex flex-col gap-8">
                {/* Breadcrumb */}
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Link href={`/${lang}`}>{dict.common.home}</Link> &gt; <Link href={`/${lang}#reviews`}>{dict.common.reviews}</Link> &gt; <span style={{ color: 'var(--text-main)' }}>{product.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ gridTemplateColumns: '2fr 1fr' }}>
                    {/* Main Content */}
                    <div>
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>{product.title}</h1>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="badge badge-accent">{product.category}</span>
                            <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>★ {product.rating}/5.0</span>
                            <span style={{ color: 'var(--text-muted)' }}>{dict.product.by_team}</span>
                        </div>

                        <div style={{
                            height: '400px',
                            background: '#1a1a1a',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: '2rem',
                            marginTop: '2rem',
                            marginRight: '2rem',
                            backgroundImage: `url(${product.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} />

                        <div className="prose" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            <ReactMarkdown
                                components={{
                                    h3: ({ node, ...props }) => <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
                                    p: ({ node, ...props }) => <p style={{ marginBottom: '1.5rem' }} {...props} />,
                                    strong: ({ node, ...props }) => <strong style={{ color: 'var(--text-main)' }} {...props} />,
                                }}
                            >
                                {product.fullReview}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <div className="card" style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.price}</div>
                            <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{dict.product.in_stock}</div>

                            <a
                                href={product.affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ width: '100%', marginBottom: '1rem', fontSize: '1.1rem' }}
                            >
                                {dict.product.check_price}
                            </a>

                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '2rem' }}>
                                {dict.product.secure_trans}
                            </div>

                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{dict.product.pros}</h4>
                            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                                {product.pros.map((pro, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <span style={{ color: '#10b981' }}>✓</span> {pro}
                                    </li>
                                ))}
                            </ul>

                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>{dict.product.cons}</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {product.cons.map((con, i) => (
                                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <span style={{ color: '#ef4444' }}>✕</span> {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
