import { getSlugs, getRegions, getCities, getListingSlugs, getListing } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MapPin, Star, Phone, Clock, ExternalLink, Shield, Award, Wifi, Car, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { siteTexts } from '@config/texts.config';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const params: { slug: string; region: string; city: string; listing: string }[] = [];
    const slugs = getSlugs();
    slugs.forEach((slug) => {
        getRegions(slug).forEach((region) => {
            getCities(slug, region).forEach((city) => {
                getListingSlugs(slug, region, city).forEach((listing) => {
                    params.push({ slug, region, city, listing });
                });
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }: { params: { slug: string; region: string; city: string; listing: string } }): Promise<Metadata> {
    const { slug, region, city, listing } = params;
    const item = getListing(slug, region, city, listing);
    
    if (!item) {
        return {
            title: 'Établissement non trouvé',
            description: 'Cet établissement n\'existe pas.'
        };
    }

    const { meta } = item;
    const title = `${meta.name} - ${meta.type} à ${city} (${region})`;
    const description = `${meta.name} à ${city} : ${meta.type}. ${meta.full_address}. ${meta.rating ? `Note: ${meta.rating}/5` : ''} ${meta.services ? `Services: ${meta.services.slice(0, 3).join(', ')}` : ''}`;
    
    return {
        title,
        description,
        keywords: [meta.name, meta.type, city, region, 'France', ...(meta.services || [])].join(', '),
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'fr_FR',
            images: meta.photo ? [{ url: meta.photo, alt: meta.name }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: meta.photo ? [meta.photo] : undefined,
        },
        alternates: {
            canonical: `/${slug}/${region}/${city}/${listing}`,
        },
    };
}

interface ListingPageProps {
    params: { slug: string; region: string; city: string; listing: string };
}

const getServiceIcon = (service: string) => {
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes('wifi') || serviceLower.includes('wi-fi')) return <Wifi className="h-4 w-4" />;
    if (serviceLower.includes('livraison') || serviceLower.includes('delivery')) return <Utensils className="h-4 w-4" />;
    if (serviceLower.includes('parking')) return <Car className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
};

export default function ListingPage({ params: { slug, region, city, listing } }: ListingPageProps) {
    const item = getListing(slug, region, city, listing);
    if (!item) return notFound();
    
    const { meta, content } = item;
    const imageSrc = (meta.photo as string) || (meta.image as string) || '';
    const title = (meta.name as string) || (meta.title as string) || listing;
    const address = meta.full_address as string;
    const phone = meta.phone as string;
    const rating = meta.rating as number;
    const reviews = meta.reviews as number;
    const affiliateLink = (meta.affiliateLink as string) || (meta.affiliate_link as string);
    const openingHours = meta.opening_hours as string[];
    const services = meta.services as string[];
    const equipment = meta.equipment as string[];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": title,
        "description": meta.summary || `${meta.type} à ${city}`,
        "image": imageSrc,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": city,
            "addressRegion": region,
            "addressCountry": "FR"
        },
        "telephone": phone,
        "url": affiliateLink,
        "aggregateRating": rating ? {
            "@type": "AggregateRating",
            "ratingValue": rating,
            "reviewCount": reviews || 1,
            "bestRating": 5,
            "worstRating": 1
        } : undefined,
        "openingHours": openingHours,
        "amenityFeature": services?.map(service => ({
            "@type": "LocationFeatureSpecification",
            "name": service
        })),
        "additionalProperty": equipment?.map(item => ({
            "@type": "PropertyValue",
            "name": item
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Hero Section */}
                    <div className="mb-8">
                        {imageSrc && (
                            <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-2xl">
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="object-cover w-full h-full"
                                />
                                {meta.type && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                                            <Award className="h-4 w-4" />
                                            {meta.type}
                                        </span>
                                    </div>
                                )}
                                {rating && (
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                                            <Star className="h-4 w-4 fill-current" />
                                            {rating.toFixed(1)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                                {title}
                            </h1>
                            
                            {address && (
                                <div className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <span className="text-lg">{address}</span>
                                </div>
                            )}

                            {(rating || reviews) && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-accent fill-current" />
                                        <span className="font-semibold text-foreground">
                                            {rating?.toFixed(1)}
                                        </span>
                                    </div>
                                    {reviews && (
                                        <span className="text-muted-foreground">
                                            ({reviews} {siteTexts.listing.reviews})
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact & CTA */}
                    {(phone || affiliateLink) && (
                        <Card className="mb-8 bg-primary/5 border-primary/20">
                            <CardContent className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {phone && (
                                        <Button 
                                            asChild 
                                            variant="outline"
                                            className="flex-1 border-primary/30 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <a href={`tel:${phone}`} className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                {phone}
                                            </a>
                                        </Button>
                                    )}
                                    
                                    {affiliateLink && (
                                        <Button 
                                            asChild 
                                            className="flex-1 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                                        >
                                            <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                <ExternalLink className="h-4 w-4" />
                                                {siteTexts.listing.visitSite}
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Information Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Opening Hours */}
                        {openingHours && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary" />
                                        {siteTexts.listing.openingHours}
                                    </h3>
                                    <div className="space-y-2">
                                        {openingHours.map((hour, index) => (
                                            <div key={index} className="text-sm text-muted-foreground">
                                                {hour}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Services */}
                        {services && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-secondary" />
                                        {siteTexts.listing.services}
                                    </h3>
                                    <div className="space-y-2">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                {getServiceIcon(service)}
                                                <span>{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Equipment */}
                        {equipment && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Award className="h-5 w-5 text-accent" />
                                        {siteTexts.listing.equipment}
                                    </h3>
                                    <div className="space-y-2">
                                        {equipment.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Award className="h-3 w-3" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Description */}
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                                <MDXRemote source={content} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Content */}
                    <Card className="bg-muted/30">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                                {siteTexts.listing.about} {title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        {siteTexts.listing.practicalInfo}
                                    </h3>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p><strong>Type :</strong> {meta.type}</p>
                                        <p><strong>Ville :</strong> {city}</p>
                                        <p><strong>Région :</strong> {region}</p>
                                        {rating && <p><strong>Note :</strong> {rating}/5</p>}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Établissement de qualité
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {title} fait partie de notre sélection d'établissements vérifiés 
                                        pour vous garantir une expérience de qualité.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
}