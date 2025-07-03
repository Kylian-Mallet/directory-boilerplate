import Link from 'next/link';
import { getSlugs, getRegions, getCities } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MapPin, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const params: { slug: string; region: string }[] = [];
    const slugs = getSlugs();
    slugs.forEach((slug) => {
        getRegions(slug).forEach((region) => {
            params.push({ slug, region });
        });
    });
    return params;
}

export async function generateMetadata({ params }: { params: { slug: string; region: string } }): Promise<Metadata> {
    const { slug, region } = params;
    const cities = getCities(slug, region);
    
    if (!cities || cities.length === 0) {
        return {
            title: 'Page non trouvée',
            description: 'Cette page n\'existe pas.'
        };
    }

    const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} en ${region} - ${cities.length} Villes`;
    const description = `Trouvez les meilleurs ${slug} en ${region}. ${cities.length} villes disponibles avec des établissements de qualité : ${cities.slice(0, 5).join(', ')}${cities.length > 5 ? '...' : ''}.`;
    
    return {
        title,
        description,
        keywords: [slug, region, 'France', 'villes', 'annuaire', ...cities.slice(0, 10)].join(', '),
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'fr_FR',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: `/${slug}/${region}`,
        },
    };
}

interface RegionPageProps {
    params: { slug: string; region: string };
}

export default function RegionPage({ params: { slug, region } }: RegionPageProps) {
    const regions = getRegions(slug);
    if (!regions.includes(region)) {
        return notFound();
    }
    const cities = getCities(slug, region);
    if (!cities || cities.length === 0) {
        return notFound();
    }
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${slug.charAt(0).toUpperCase() + slug.slice(1)} en ${region}`,
        "description": `Annuaire des ${slug} en ${region}, France`,
        "url": `/${slug}/${region}`,
        "isPartOf": {
            "@type": "WebPage",
            "url": `/${slug}`
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": cities.length,
            "itemListElement": cities.map((city, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Place",
                    "name": city,
                    "addressRegion": region,
                    "addressCountry": "FR",
                    "url": `/${slug}/${region}/${city}`
                }
            }))
        }
    };
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <MapPin className="h-4 w-4" />
                            Région
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                            {region}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explorez les villes de {region} et découvrez leurs établissements. 
                            {cities.length} villes disponibles avec des {slug} de qualité.
                        </p>
                    </div>

                    {/* SEO Content Section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <Card className="border-0 card-shadow bg-card">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                                    {slug.charAt(0).toUpperCase() + slug.slice(1)} en {region} : Guide complet
                                </h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                                    <p>
                                        La région {region} offre une diversité exceptionnelle d'{slug.toLowerCase()} 
                                        répartis dans {cities.length} villes. Chaque destination propose ses 
                                        spécialités locales et son caractère unique.
                                    </p>
                                    <p>
                                        Que vous soyez résident ou visiteur, notre sélection vous guide vers 
                                        les meilleures adresses de {region}, avec des informations détaillées 
                                        sur chaque établissement : services, équipements, horaires et avis clients.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Cities Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                        {cities.map((city, index) => (
                            <Link key={city} href={`/${slug}/${region}/${city}`}>
                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-shadow border-0 bg-card h-full">
                                    <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Building2 className="h-8 w-8 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-heading font-bold text-foreground group-hover:text-secondary transition-colors">
                                                    {city}
                                                </h2>
                                                <p className="text-muted-foreground text-sm mt-1">
                                                    Ville de {region}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4">
                                            <div className="text-sm text-secondary font-medium group-hover:text-secondary/80 transition-colors">
                                                Découvrir →
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Regional Information */}
                    <div className="max-w-4xl mx-auto">
                        <Card className="border-0 card-shadow bg-card">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                                    Découvrir {region}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">
                                            Villes principales
                                        </h3>
                                        <p className="text-muted-foreground mb-3">
                                            {region} compte {cities.length} villes dans notre annuaire, 
                                            chacune avec ses spécialités et son charme particulier.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {cities.slice(0, 6).map((city) => (
                                                <span key={city} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                                    {city}
                                                </span>
                                            ))}
                                            {cities.length > 6 && (
                                                <span className="text-xs text-muted-foreground px-2 py-1">
                                                    +{cities.length - 6} autres
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">
                                            Services disponibles
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Tous nos établissements en {region} proposent des services 
                                            de qualité avec des informations complètes : coordonnées, 
                                            horaires, services et équipements disponibles.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
}