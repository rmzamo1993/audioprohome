import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import { getDictionary } from '@/i18n/dictionaries';
import { Metadata } from 'next';
import Script from 'next/script';

interface PageProps {
    params: Promise<{ lang: 'en' | 'es' }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const isSpanish = lang === 'es';

    const title = isSpanish
        ? 'AudioProHome - Reseñas Profesionales de Equipos de Estudio Casero 2025'
        : 'AudioProHome - Professional Home Studio Equipment Reviews 2025';

    const description = isSpanish
        ? 'Reseñas expertas de las mejores interfaces de audio, monitores de estudio, auriculares y micrófonos para producción musical profesional en casa. Guías completas y comparativas actualizadas 2025.'
        : 'Expert reviews of the best audio interfaces, studio monitors, headphones, and microphones for professional home music production. Complete guides and comparisons updated 2025.';

    const keywords = isSpanish
        ? 'interfaz de audio, monitores de estudio, auriculares profesionales, micrófono condensador, estudio casero, producción musical, DAW, grabación vocal, mezcla audio, podcasting, home studio'
        : 'audio interface, studio monitors, professional headphones, condenser microphone, home studio, music production, DAW, vocal recording, audio mixing, podcasting, recording equipment';

    const url = isSpanish ? 'https://audioprohome.com/es' : 'https://audioprohome.com/en';

    return {
        title,
        description,
        keywords,
        authors: [{ name: 'AudioProHome Team' }],
        creator: 'AudioProHome',
        publisher: 'AudioProHome',
        alternates: {
            canonical: url,
            languages: {
                'en': 'https://audioprohome.com/en',
                'es': 'https://audioprohome.com/es',
            },
        },
        openGraph: {
            type: 'website',
            locale: isSpanish ? 'es_ES' : 'en_US',
            url,
            title,
            description,
            siteName: 'AudioProHome',
            images: [
                {
                    url: 'https://audioprohome.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'AudioProHome - Professional Home Studio Reviews',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://audioprohome.com/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'your-google-verification-code',
        },
    };
}


export default async function Home({ params, searchParams }: PageProps) {
    const { lang } = await params;
    const { category } = await searchParams;
    const dict = await getDictionary(lang);
    const allProducts = getProducts(lang);

    const products = category
        ? allProducts.filter(p => p.category === category)
        : allProducts;

    const isSpanish = lang === 'es';
    const baseUrl = 'https://audioprohome.com';

    // JSON-LD Structured Data for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AudioProHome',
        url: `${baseUrl}/${lang}`,
        description: isSpanish
            ? 'Reseñas profesionales de equipos de estudio casero'
            : 'Professional home studio equipment reviews',
        inLanguage: isSpanish ? 'es' : 'en',
        publisher: {
            '@type': 'Organization',
            name: 'AudioProHome',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
            }
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/${lang}/reviews/{search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };

    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AudioProHome',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
            'https://facebook.com/audioprohome',
            'https://twitter.com/audioprohome',
            'https://instagram.com/audioprohome'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: ['English', 'Spanish']
        }
    };

    return (
        <>
            <Script
                id="structured-data-website"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Script
                id="structured-data-organization"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />

            <div>
                {/* Hero Section */}
                <section
                    aria-label={isSpanish ? 'Sección principal' : 'Hero section'}
                    style={{
                        position: 'relative',
                        padding: '8rem 0',
                        background: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)',
                        overflow: 'hidden',
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '600px',
                        background: 'var(--primary)',
                        filter: 'blur(150px)',
                        opacity: 0.15,
                        zIndex: 0
                    }} />

                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{
                            fontSize: '4rem',
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(to bottom right, #fff, #94a3b8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {dict.home.hero_title} <br />
                            <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>
                                {dict.home.hero_subtitle}
                            </span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-muted)',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem'
                        }}>
                            {dict.home.hero_desc}
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#featured" className="btn btn-primary">{dict.home.explore_btn}</a>
                            <a href={`/${lang}/process`} className="btn btn-outline">{dict.home.process_btn}</a>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section
                    id="featured"
                    aria-label={isSpanish ? 'Productos destacados' : 'Featured products'}
                    style={{ padding: '6rem 0' }}
                >
                    <div className="container">
                        <h2 className="section-title">
                            {category ? `${category}s` : dict.home.featured_title}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                            {dict.home.featured_desc}
                        </p>

                        <div className="grid grid-cols-1 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} lang={lang} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section
                    aria-label={isSpanish ? 'Categorías de productos' : 'Product categories'}
                    style={{ padding: '6rem 0', background: 'var(--surface)' }}
                >
                    <div className="container">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="section-title">{dict.home.categories_title}</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{dict.home.categories_desc}</p>
                            </div>
                        </div>

                        <nav aria-label={isSpanish ? 'Navegación por categorías' : 'Category navigation'}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { name: dict.common.interfaces, desc: dict.home.cat_interface_desc, id: 'interfaces' },
                                    { name: dict.common.monitors, desc: dict.home.cat_monitor_desc, id: 'monitors' },
                                    { name: dict.common.headphones, desc: dict.home.cat_headphone_desc, id: 'headphones' },
                                    { name: dict.common.microphones, desc: dict.home.cat_microphone_desc, id: 'microphones' }
                                ].map((cat) => (
                                    <article key={cat.id} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{cat.name}</h3>
                                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                            {cat.desc}
                                        </p>
                                        <a href={`/${lang}?category=${cat.id === 'monitors' ? 'Monitor' : cat.id === 'interfaces' ? 'Interface' : cat.id === 'headphones' ? 'Headphones' : cat.id === 'microphones' ? 'Microphone' : ''}`} className="btn btn-outline" style={{ width: '100%' }}>
                                            {dict.home.view_btn} {cat.name}
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </nav>
                    </div>
                </section>
            </div>
        </>
    );
}
