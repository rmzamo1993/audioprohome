import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://audioprohome.com';

    // Get all products for both languages
    const productsEn = getProducts('en');
    const productsEs = getProducts('es');

    // Main pages
    const routes = [
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/es`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/en/process`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/es/process`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ];

    // Product review pages - English
    const productRoutesEn = productsEn.map((product) => ({
        url: `${baseUrl}/en/reviews/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Product review pages - Spanish
    const productRoutesEs = productsEs.map((product) => ({
        url: `${baseUrl}/es/reviews/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Category pages - English
    const categoriesEn = [
        { url: `${baseUrl}/en?category=Interface`, priority: 0.85 },
        { url: `${baseUrl}/en?category=Monitor`, priority: 0.85 },
        { url: `${baseUrl}/en?category=Headphones`, priority: 0.85 },
        { url: `${baseUrl}/en?category=Microphone`, priority: 0.85 },
    ].map(cat => ({
        url: cat.url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: cat.priority,
    }));

    // Category pages - Spanish
    const categoriesEs = [
        { url: `${baseUrl}/es?category=Interface`, priority: 0.85 },
        { url: `${baseUrl}/es?category=Monitor`, priority: 0.85 },
        { url: `${baseUrl}/es?category=Headphones`, priority: 0.85 },
        { url: `${baseUrl}/es?category=Microphone`, priority: 0.85 },
    ].map(cat => ({
        url: cat.url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: cat.priority,
    }));

    return [
        ...routes,
        ...productRoutesEn,
        ...productRoutesEs,
        ...categoriesEn,
        ...categoriesEs,
    ];
}
