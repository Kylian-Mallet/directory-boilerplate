import { getSlugs, getRegions, getCities, getListingSlugs, getListing } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MapPin, Star, Phone, Clock, Wifi, Car, Utensils, ExternalLink, Shield, Award } from 'lucide-react';
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
                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    {/* Hero Section */}
                    <div className="relative mb-12">
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            {/* Image */}
                            <div className="relative group">
                                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-2xl">
                                    {imageSrc && (
                                        <img
                                            src={imageSrc}
                                            alt={title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    {meta.type && (
                                        <div className="absolute top-6 right-6">
                                            <span className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm text-card-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-border">
                                                <Award className="h-4 w-4" />
                                                {meta.type}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                                        {title}
                                    </h1>
                                    
                                    {address && (
                                        <div className="flex items-start gap-3 text-muted-foreground">
                                            <MapPin className="h-5 w-5 mt-0.5" />
                                            <span className="text-lg leading-relaxed">{address}</span>
                                        </div>
                                    )}

                                    {(rating || reviews) && (
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full border border-accent/20">
                                                <Star className="h-5 w-5 text-accent fill-current" />
                                                <span className="font-semibold">
                                                    {rating?.toFixed(1)}
                                                </span>
                                            </div>
                                            {reviews && (
                                                <span className="text-muted-foreground">
                                                    {reviews} avis
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Contact Card */}
                                <Card className="bg-primary/5 border-primary/20 shadow-lg">
                                    <CardContent className="p-6 space-y-4">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <Phone className="h-5 w-5 text-primary" />
                                            {siteTexts.listing.contactTitle}
                                        </h3>
                                        
                                        <div className="space-y-3">
                                            {phone && (
                                                <a 
                                                    href={`tel:${phone}`}
                                                    className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-muted transition-colors group border border-border"
                                                >
                                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                        <Phone className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-medium text-foreground">{phone}</span>
                                                </a>
                                            )}
                                            
                                            {affiliateLink && (
                                                <Button 
                                                    asChild 
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold"
                                                >
                                                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                        <ExternalLink className="h-4 w-4" />
                                                        {siteTexts.listing.affiliateCta}
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Opening Hours */}
                        {openingHours && (
                            <Card className="bg-card shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-accent" />
                                        Horaires d'ouverture
                                    </h3>
                                    <div className="space-y-2">
                                        {openingHours.map((hour, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                                <span className="text-muted-foreground">{hour}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Services */}
                        {services && (
                            <Card className="bg-card shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Services
                                    </h3>
                                    <div className="space-y-3">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                    {getServiceIcon(service)}
                                                </div>
                                                <span className="text-foreground font-medium">{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Equipment */}
                        {equipment && (
                            <Card className="bg-card shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Award className="h-5 w-5 text-secondary" />
                                        Équipements
                                    </h3>
                                    <div className="space-y-3">
                                        {equipment.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                                <div className="p-2 bg-secondary/10 rounded-lg">
                                                    <Award className="h-4 w-4 text-secondary" />
                                                </div>
                                                <span className="text-foreground font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Description Section */}
                    <Card className="bg-card shadow-lg border-border mb-12">
                        <CardContent className="p-8">
                            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
                                <MDXRemote source={content} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom CTA */}
                    {affiliateLink && (
                        <div className="text-center">
                            <Card className="bg-primary border-0 shadow-2xl">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
                                        Prêt à découvrir {title} ?
                                    </h3>
                                    <p className="text-primary-foreground/80 mb-6 text-lg">
                                        Visitez leur site officiel pour plus d'informations et réservations
                                    </p>
                                    <Button 
                                        asChild 
                                        size="lg"
                                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
                                    >
                                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            <ExternalLink className="h-5 w-5" />
                                            {siteTexts.listing.bottomCta}
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}