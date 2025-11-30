import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getDictionary } from "@/i18n/dictionaries";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as 'en' | 'es');

    return (
        <>
            <Header lang={lang as 'en' | 'es'} />
            <main style={{ minHeight: 'calc(100vh - 400px)' }}>
                {children}
            </main>
            <Footer lang={lang as 'en' | 'es'} />
            <CookieBanner lang={lang as 'en' | 'es'} dict={dict} />
        </>
    );
}
