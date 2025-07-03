import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { generateMetadata } from '@/lib/metadata';
import './globals.css';
import Navbar from '@/components/Navbar';
import { directoryConfig } from '@config/directory.config';
import { siteTexts } from '@config/texts.config';
import Script from 'next/script';
import { analyticsConfig } from '@config/analytics.config';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Star, Shield } from 'lucide-react';

export const metadata: Metadata = generateMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Prepare Google Fonts URL for heading and body based on config
    const headingFamily = directoryConfig.theme.fonts.heading.split(',')[0].trim().replace(/\s+/g, '+');
    const bodyFamily = directoryConfig.theme.fonts.body.split(',')[0].trim().replace(/\s+/g, '+');
    const fontsUrl = `https://fonts.googleapis.com/css2?family=${headingFamily}:wght@300;400;500;600;700;800;900&family=${bodyFamily}:wght@300;400;500;600;700&display=swap`;
    
    return (
        <html lang="fr">
        <head>
            {/* Preconnect to Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            {/* Load Google Fonts based on config */}
            <link href={fontsUrl} rel="stylesheet"/>
            {/* Inject theme CSS variables from config */}
            <style>{`
          :root {
            ${Object.entries(directoryConfig.theme.colors || {}).map(
                ([key, value]) => `--${key}: ${value};`,
            ).join('\n')}
            --font-heading: ${directoryConfig.theme.fonts.heading};
            --font-body: ${directoryConfig.theme.fonts.body};
          }
          
          /* Custom gradient utilities */
          .gradient-bg {
            background: var(--hero-bg);
          }
          
          .card-shadow {
            box-shadow: var(--card-shadow);
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: var(--muted);
          }
          
          ::-webkit-scrollbar-thumb {
            background: var(--border);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: var(--muted-foreground);
          }
        `}</style>
        </head>
        <body className={cn('flex flex-col min-h-screen bg-background font-body antialiased')}>
        {/* Yandex Metrica integration */}
        {analyticsConfig.yandexMetricaId !== 'YOUR_YANDEX_METRICA_ID' && (
            <>
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
            </>
        )}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50">
            {siteTexts.common.skipToContent}
        </a>
        <Navbar/>
        <div id="main-content" className="flex-1">
            {children}
        </div>
        
        {/* Enhanced Footer */}
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                                    {directoryConfig.name}
                                </h3>
                                <p className="text-muted-foreground max-w-md leading-relaxed">
                                    {directoryConfig.description}
                                </p>
                            </div>
                            
                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Shield className="h-4 w-4 text-primary" />
                                    <span>{siteTexts.footer.trustIndicators.verified}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Star className="h-4 w-4 text-accent" />
                                    <span>{siteTexts.footer.trustIndicators.authentic}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 text-secondary" />
                                    <span>{siteTexts.footer.trustIndicators.updated}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-heading font-semibold text-foreground">
                                {siteTexts.footer.navigation}
                            </h4>
                            <nav className="space-y-3">
                                <Link href="/" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    {siteTexts.navigation.home}
                                </Link>
                                <Link href="/#search" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    {siteTexts.navigation.search}
                                </Link>
                                <Link href="/#regions" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    {siteTexts.navigation.regions}
                                </Link>
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-heading font-semibold text-foreground">
                                {siteTexts.footer.contact}
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{siteTexts.footer.contactInfo.country}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${siteTexts.footer.contactInfo.email}`} className="text-sm hover:text-foreground transition-colors">
                                        {siteTexts.footer.contactInfo.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${siteTexts.footer.contactInfo.phone}`} className="text-sm hover:text-foreground transition-colors">
                                        {siteTexts.footer.contactInfo.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-border py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {new Date().getFullYear()} {directoryConfig.name}. {siteTexts.footer.copyright}
                        </p>
                        
                        {/* Legal Links */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <a href="/mentions-legales" className="text-muted-foreground hover:text-foreground transition-colors">
                                {siteTexts.footer.legal.legalNotice}
                            </a>
                            <a href="/politique-confidentialite" className="text-muted-foreground hover:text-foreground transition-colors">
                                {siteTexts.footer.legal.privacy}
                            </a>
                            <a href="/conditions-utilisation" className="text-muted-foreground hover:text-foreground transition-colors">
                                {siteTexts.footer.legal.terms}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}