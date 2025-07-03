import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { generateMetadata } from '@/lib/metadata';
import './globals.css';
import Navbar from '@/components/Navbar';
import { directoryConfig } from '@config/directory.config';
import { siteTexts } from '@config/texts.config';
import Script from 'next/script';
import { analyticsConfig } from '@config/analytics.config';

export const metadata: Metadata = generateMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Prepare Google Fonts URL for heading and body based on config
    const headingFamily = directoryConfig.theme.fonts.heading.split(',')[0].trim().replace(/\s+/g, '+');
    const bodyFamily = directoryConfig.theme.fonts.body.split(',')[0].trim().replace(/\s+/g, '+');
    const fontsUrl = `https://fonts.googleapis.com/css2?family=${ headingFamily }&family=${ bodyFamily }&display=swap`;
    return (
        <html lang="en">
        <head>
            {/* Preconnect to Google Fonts */ }
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            {/* Load Google Fonts based on config */ }
            <link href={ fontsUrl } rel="stylesheet"/>
            {/* Inject theme CSS variables from config */ }
            <style>{ `
          :root {
            ${ Object.entries(directoryConfig.theme.colors || {}).map(
                ([key, value]) => `--${ key }: ${ value };`,
            ).join('\n') }
            --font-heading: ${ directoryConfig.theme.fonts.heading };
            --font-body: ${ directoryConfig.theme.fonts.body };
          }
        ` }</style>
        </head>
        <body className={ cn('flex flex-col min-h-screen bg-background font-body antialiased') }>
        {/* Yandex Metrica integration */}
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${analyticsConfig.yandexMetricaId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${analyticsConfig.yandexMetricaId}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <a href="#main-content" className="sr-only focus:not-sr-only">
            { siteTexts.skipToContent }
        </a>
        <Navbar/>
        <div id="main-content" className="flex-1">
            { children }
        </div>
        <footer className="bg-background border-t border-muted py-4">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                © { new Date().getFullYear() } { directoryConfig.name }. { siteTexts.footer.copyright }
            </div>
        </footer>
        </body>
        </html>
    );
}