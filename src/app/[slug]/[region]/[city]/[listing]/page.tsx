import { getSlugs, getRegions, getCities, getListingSlugs, getListing } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MapPin, Star, Phone, Clock, Wifi, Car, Utensils, ArrowLeft, ExternalLink, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { siteTexts } from '@config/texts.config';
import Link from 'next/link';

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
                <div className="container mx-auto px-4 py-4">
                    <Link 
                        href={`/${slug}/${region}/${city}`}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Retour à {city}</span>
                    </Link>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Hero Section */}
                <div className="relative mb-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Image */}
                        <div className="relative group">
                            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl">
                                {imageSrc && (
                                    <img
                                        src={imageSrc}
                                        alt={title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}
                                {meta.type && (
                                    <div className="absolute top-6 right-6">
                                        <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
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
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                    {title}
                                </h1>
                                
                                {address && (
                                    <div className="flex items-start gap-3 text-slate-600">
                                        <MapPin className="h-5 w-5 mt-0.5 text-slate-400" />
                                        <span className="text-lg leading-relaxed">{address}</span>
                                    </div>
                                )}

                                {(rating || reviews) && (
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                                            <Star className="h-5 w-5 text-amber-500 fill-current" />
                                            <span className="font-semibold text-amber-700">
                                                {rating?.toFixed(1)}
                                            </span>
                                        </div>
                                        {reviews && (
                                            <span className="text-slate-500">
                                                {reviews} avis
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Contact Card */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 shadow-lg">
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                        {siteTexts.listing.contactTitle}
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {phone && (
                                            <a 
                                                href={`tel:${phone}`}
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-colors group"
                                            >
                                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                                    <Phone className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <span className="font-medium text-slate-700">{phone}</span>
                                            </a>
                                        )}
                                        
                                        {affiliateLink && (
                                            <Button 
                                                asChild 
                                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold"
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
                        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-emerald-600" />
                                    Horaires d'ouverture
                                </h3>
                                <div className="space-y-2">
                                    {openingHours.map((hour, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                            <span className="text-slate-600">{hour}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Services */}
                    {services && (
                        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    Services
                                </h3>
                                <div className="space-y-3">
                                    {services.map((service, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                {getServiceIcon(service)}
                                            </div>
                                            <span className="text-slate-700 font-medium">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Equipment */}
                    {equipment && (
                        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Équipements
                                </h3>
                                <div className="space-y-3">
                                    {equipment.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Award className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Description Section */}
                <Card className="bg-white shadow-lg border-0 mb-12">
                    <CardContent className="p-8">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <MDXRemote source={content} />
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom CTA */}
                {affiliateLink && (
                    <div className="text-center">
                        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-2xl">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Prêt à découvrir {title} ?
                                </h3>
                                <p className="text-blue-100 mb-6 text-lg">
                                    Visitez leur site officiel pour plus d'informations et réservations
                                </p>
                                <Button 
                                    asChild 
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
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
    );
}