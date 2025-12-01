'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
    lang: 'en' | 'es';
    dict: {
        common: {
            home: string;
            monitors: string;
            interfaces: string;
            headphones: string;
            microphones: string;
        };
    };
}

export default function MobileMenu({ lang, dict }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                className="mobile-menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setIsOpen(false)}
                >
                    <nav
                        className="mobile-menu-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Link
                            href={`/${lang}`}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}
                        >
                            {dict.common.home}
                        </Link>
                        <Link
                            href={`/${lang}?category=Monitor`}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}
                        >
                            {dict.common.monitors}
                        </Link>
                        <Link
                            href={`/${lang}?category=Interface`}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}
                        >
                            {dict.common.interfaces}
                        </Link>
                        <Link
                            href={`/${lang}?category=Headphones`}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}
                        >
                            {dict.common.headphones}
                        </Link>
                        <Link
                            href={`/${lang}?category=Microphone`}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}
                        >
                            {dict.common.microphones}
                        </Link>
                        <Link
                            href={lang === 'en' ? '/es' : '/en'}
                            onClick={() => setIsOpen(false)}
                            style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1.1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}
                        >
                            {lang === 'en' ? 'ES' : 'EN'}
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
