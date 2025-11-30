import { getProducts } from '@/lib/products';
import { getDictionary } from '@/i18n/dictionaries';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

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

    const isSpanish = lang === 'es';
    const baseUrl = 'https://audioprohome.com';

    return {
        title: `${product.title} Review ${new Date().getFullYear()} - AudioProHome`,
        description: product.summary,
        keywords: isSpanish
            ? `${product.title}, reseña, review, ${product.category.toLowerCase()}, audio profesional, estudio casero`
            : `${product.title}, review, ${product.category.toLowerCase()}, professional audio, home studio`,
        openGraph: {
            title: `${product.title} Review`,
            description: product.summary,
            images: [product.image],
            type: 'article',
        },
        alternates: {
            canonical: `${baseUrl}/${lang}/reviews/${slug}`,
        },
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

    const isSpanish = lang === 'es';
    const baseUrl = 'https://audioprohome.com';

    // Extract numeric price for schema
    const numericPrice = product.price.replace(/[^0-9.,]/g, '').replace(',', '.');
    const currency = product.price.includes('€') ? 'EUR' : 'USD';

    // Product Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.summary,
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: product.title.split(' ')[0] // Extract brand name
        },
        offers: {
            '@type': 'Offer',
            price: numericPrice,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
            url: product.affiliateLink,
            seller: {
                '@type': 'Organization',
                name: 'Amazon'
            }
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toString(),
            reviewCount: '1',
            bestRating: '5',
            worstRating: '1'
        },
        review: {
            '@type': 'Review',
            reviewRating: {
                '@type': 'Rating',
                ratingValue: product.rating.toString(),
                bestRating: '5'
            },
            author: {
                '@type': 'Organization',
                name: 'AudioProHome Team'
            },
            reviewBody: product.summary
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: isSpanish ? 'Inicio' : 'Home',
                item: `${baseUrl}/${lang}`
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: `${product.category}s`,
                item: `${baseUrl}/${lang}?category=${product.category}`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.title,
                item: `${baseUrl}/${lang}/reviews/${slug}`
            }
        ]
    };

    // FAQPage Schema (if FAQs exist)
    const faqSchema = product.faqs ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: product.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    } : null;

    return (
        <>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <Script
                    id="faq-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <div className="container" style={{ padding: '4rem 20px' }}>
                <div className="flex flex-col gap-8">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <Link href={`/${lang}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <span itemProp="name">{dict.common.home}</span>
                                <meta itemProp="position" content="1" />
                            </Link>
                            {' '}&gt;{' '}
                            <Link href={`/${lang}?category=${product.category}`}>
                                {product.category}s
                            </Link>
                            {' '}&gt;{' '}
                            <span style={{ color: 'var(--text-main)' }}>{product.title}</span>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ gridTemplateColumns: '2fr 1fr' }}>
                        {/* Main Content */}
                        <article itemScope itemType="https://schema.org/Review">
                            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }} itemProp="name">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-6 mb-12">
                                <span className="badge badge-accent">{product.category}</span>
                                <span style={{ color: '#fbbf24', fontWeight: 'bold' }} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                    ★ <span itemProp="ratingValue">{product.rating}</span>/5.0
                                    <meta itemProp="bestRating" content="5" />
                                </span>
                                <span style={{ color: 'var(--text-muted)' }} itemProp="author" itemScope itemType="https://schema.org/Organization">
                                    <span itemProp="name">{dict.product.by_team}</span>
                                </span>
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

                            <div className="prose" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }} itemProp="reviewBody">
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

                            {/* FAQ Section */}
                            {product.faqs && product.faqs.length > 0 && (
                                <section style={{ marginTop: '4rem' }} itemScope itemType="https://schema.org/FAQPage">
                                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)' }}>
                                        {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {product.faqs.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="card"
                                                style={{ padding: '1.5rem', background: 'var(--surface)' }}
                                                itemScope
                                                itemProp="mainEntity"
                                                itemType="https://schema.org/Question"
                                            >
                                                <h3
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        marginBottom: '0.75rem',
                                                        color: 'var(--primary)',
                                                        fontWeight: 600
                                                    }}
                                                    itemProp="name"
                                                >
                                                    {faq.question}
                                                </h3>
                                                <div
                                                    style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}
                                                    itemScope
                                                    itemProp="acceptedAnswer"
                                                    itemType="https://schema.org/Answer"
                                                >
                                                    <div itemProp="text">{faq.answer}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </article>

                        {/* Sidebar */}
                        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                            <div className="card" style={{ padding: '2rem' }} itemScope itemType="https://schema.org/Offer">
                                <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }} itemProp="price" content={numericPrice}>
                                    {product.price}
                                    <meta itemProp="priceCurrency" content={currency} />
                                </div>
                                <div style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    <span itemProp="availability" content="https://schema.org/InStock">{dict.product.in_stock}</span>
                                </div>

                                <a
                                    href={product.affiliateLink}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="btn btn-primary"
                                    style={{ width: '100%', marginBottom: '1rem', fontSize: '1.1rem' }}
                                    itemProp="url"
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
        </>
    );
}
