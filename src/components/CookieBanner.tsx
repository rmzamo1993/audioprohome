'use client';

import { useState, useEffect } from 'react';

interface CookieBannerProps {
    lang: 'en' | 'es';
    dict: {
        cookies: {
            message: string;
            accept: string;
            reject: string;
        };
    };
}

export default function CookieBanner({ lang, dict }: CookieBannerProps) {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 15, 0.98)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--border)',
            padding: '1.5rem',
            zIndex: 1000,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.3)'
        }}>
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap'
            }}>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    margin: 0,
                    flex: '1 1 300px'
                }}>
                    {dict.cookies.message}
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexShrink: 0
                }}>
                    <button
                        onClick={handleReject}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--text-muted)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        {dict.cookies.reject}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="btn btn-primary"
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        {dict.cookies.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
