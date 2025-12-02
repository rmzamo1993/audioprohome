import Link from 'next/link';
import { Product } from '@/lib/products';
import { getDictionary } from '@/i18n/dictionaries';

interface ProductCardProps {
    product: Product;
    lang: 'en' | 'es';
}

export default async function ProductCard({ product, lang }: ProductCardProps) {
    const dict = await getDictionary(lang);
    return (
        <div className="card flex flex-col h-full">
            <div style={{
                height: '240px',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Image will go here. Using a text placeholder until image is generated to ensure layout is correct */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    color: '#fbbf24' // Amber for stars
                }}>
                    ★ {product.rating}
                </div>
            </div>

            <div className="flex flex-col flex-grow" style={{ padding: '1.5rem' }}>
                <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="badge badge-accent">{product.category}</span>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{product.price}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', marginTop: '0.75rem' }}>
                    <Link href={`/${lang}/reviews/${product.slug}`} style={{ color: 'var(--text-main)' }}>
                        {product.title}
                    </Link>
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {product.summary}
                </p>

                <Link href={`/${lang}/reviews/${product.slug}`} className="btn btn-primary" style={{ width: '100%' }}>
                    {dict.product.read_review}
                </Link>
            </div>
        </div>
    );
}
