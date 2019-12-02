import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    /**
     * @param ctx
     * @return Object
     */
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    /**
     * React render function
     *
     * @returns {*}
     */
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="author" content="Oilpattern.com"/>

                    <meta property="og:type" content="website"/>
                    <meta property="og:image" content="https://oilpattern.com/images/share.jpg"/>
                    <meta property="og:url" content="https://Oilpattern.com/"/>
                    <meta name="twitter:card" content="summary_large_image"/>

                    <link rel="alternate" href="https://oilpattern.com/" hrefLang="en"/>
                    <link rel="canonical" href="https://oilpattern.com/"/>
                    <script type='application/ld+json' dangerouslySetInnerHTML={{__html:`
                        {
                            "@context": "http://schema.org",
                            "@type": "WebSite",
                            "name": "Oilpattern.com",
                            "url": "https://oilpattern.com/",
                            "description": "The bowling oilpattern catalog",
                            "potentialAction": [{
                                "@type": "SearchAction",
                                "target": "https://oilpattern.com/?search={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }]
                        }
                    `}}/>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:`
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "url": "https://oilpattern.com/",
                            "logo": "https://oilpattern.com/images/icon/logo_512x512.png"
                        }
                    `}}/>

                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="shortcut icon" href="/images/favicon.ico"/>
                    <link rel="apple-touch-icon" href="/images/logo_192x192.png"/>

                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="theme-color" content="#3F51B5"/>
                    <noscript>
                        <style dangerouslySetInnerHTML={{__html: `.mdl-layout__content { opacity: 1 !important }`}} />
                    </noscript>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{__html: `
                        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', {scope: '/'});
                    `}}/>}
                </body>
            </Html>
        )
    }
}
