import ContentGrid from '@/components/layout/ContentGrid';
import { getSlugs, getRegions, getCities, getListings } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';
import { siteTexts } from '@config/texts.config';
import Link from 'next/link';

export async function generateStaticParams() {
    const params: { slug: string; region: string; city: string }[] = [];
    const slugs = getSlugs();
    slugs.forEach((slug) => {
        getRegions(slug).forEach((region) => {
            getCities(slug, region).forEach((city) => {
                params.push({ slug, region, city });
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }: { params: { slug: string; region: string; city: string } }): Promise<Metadata> {
    const { slug, region, city } = params;
    const listings = getListings(slug, region, city);
    
    const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} à ${city} (${region}) - ${listings.length} Établissements`;
    const description = `Découvrez les meilleurs ${slug} à ${city} en ${region}. ${listings.length} établissements sélectionnés avec avis, coordonnées et informations détaillées.`;
    
    return {
        title,
        description,
        keywords: [slug, city, region, 'France', 'établissements', 'annuaire', 'avis'].join(', '),
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
            canonical: `/${slug}/${region}/${city}`,
        },
    };
}

interface CityPageProps {
    params: { slug: string; region: string; city: string };
}

export default function CityPage({ params: { slug, region, city } }: CityPageProps) {
    const regions = getRegions(slug);
    if (!regions.includes(region)) return notFound();
    const cities = getCities(slug, region);
    if (!cities.includes(city)) return notFound();
    const listings = getListings(slug, region, city);
    
    // Get other cities in the same region for internal linking (exclude current city)
    const otherCities = cities.filter(c => c !== city);
    // Limit to 8 cities for better layout and performance
    const relatedCities = otherCities.slice(0, 8);
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${slug.charAt(0).toUpperCase() + slug.slice(1)} à ${city}`,
        "description": `Annuaire des ${slug} à ${city}, ${region}`,
        "url": `/${slug}/${region}/${city}`,
        "isPartOf": {
            "@type": "WebPage",
            "url": `/${slug}/${region}`
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": listings.length,
            "itemListElement": listings.map((listing, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "LocalBusiness",
                    "name": listing.meta.name,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": city,
                        "addressRegion": region,
                        "addressCountry": "FR",
                        "streetAddress": listing.meta.full_address
                    },
                    "url": `/${listing.fileName}`
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
                        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Building2 className="h-4 w-4" />
                            {siteTexts.categories.city}
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 capitalize">
                            {city}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                            <MapPin className="h-5 w-5" />
                            <span className="text-lg">{region}, France</span>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Découvrez les meilleurs {slug} de {city}. {listings.length} établissements 
                            sélectionnés pour leur qualité et leur service.
                        </p>
                    </div>

                    {/* Listings */}
                    {listings.length > 0 ? (
                        <>
                            <ContentGrid items={listings} />
                            
                            {/* Internal Linking - Other Cities in Region */}
                            {relatedCities.length > 0 && (
                                <div className="mt-20 mb-16">
                                    <Card className="border-0 card-shadow bg-card">
                                        <CardContent className="p-8">
                                            <div className="text-center mb-8">
                                                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                                                    Autres villes en {region}
                                                </h2>
                                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                                    Découvrez également nos sélections de {slug} dans d'autres villes de {region}
                                                </p>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {relatedCities.map((relatedCity) => {
                                                    const relatedListings = getListings(slug, region, relatedCity);
                                                    return (
                                                        <Link 
                                                            key={relatedCity} 
                                                            href={`/${slug}/${region}/${relatedCity}`}
                                                            className="group"
                                                        >
                                                            <Card className="h-full border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background">
                                                                <CardContent className="p-4 h-full flex flex-col justify-between">
                                                                    <div className="space-y-2">
                                                                        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                                                                            {relatedCity}
                                                                        </h3>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {relatedListings.length} {relatedListings.length === 1 ? 'établissement' : 'établissements'}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3 group-hover:gap-2 transition-all duration-300">
                                                                        <span>Découvrir</span>
                                                                        <ArrowRight className="h-3 w-3" />
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                            
                                            {/* Link to region page if there are more cities */}
                                            {otherCities.length > 8 && (
                                                <div className="text-center mt-8">
                                                    <Link 
                                                        href={`/${slug}/${region}`}
                                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                                                    >
                                                        Voir toutes les villes de {region}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            
                            {/* SEO Content Section - Moved to Bottom */}
                            <div className="max-w-4xl mx-auto mt-16 space-y-8">
                                <Card className="border-0 card-shadow bg-card">
                                    <CardContent className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                                            {slug.charAt(0).toUpperCase() + slug.slice(1)} à {city} : Notre sélection
                                        </h2>
                                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                                            <p>
                                                {city}, située en {region}, propose une sélection de {listings.length} {slug.toLowerCase()} 
                                                de qualité. Chaque établissement a été choisi pour son excellence et la satisfaction 
                                                de ses clients.
                                            </p>
                                            <p>
                                                Notre annuaire vous fournit toutes les informations nécessaires : coordonnées, 
                                                horaires d'ouverture, services proposés, équipements disponibles et avis clients 
                                                pour vous aider à faire le meilleur choix.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 card-shadow bg-card">
                                    <CardContent className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                                            Pourquoi choisir {city} ?
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                                    Qualité garantie
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    Tous les {slug} référencés à {city} sont vérifiés et 
                                                    évalués selon nos critères de qualité stricts pour 
                                                    vous garantir une expérience exceptionnelle.
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-foreground mb-3">
                                                    {siteTexts.features.completeInformation.title}
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    {siteTexts.features.completeInformation.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                                <Building2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                                Aucun établissement trouvé
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Il n'y a pas encore d'établissements référencés dans cette ville. 
                                Revenez bientôt pour découvrir de nouvelles adresses !
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}