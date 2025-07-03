// Dynamic page to render a single listing .mdx under slug/region/city
import { getSlugs, getRegions, getCities, getListingSlugs, getListing } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
// Use standard <img> for external URLs
import { notFound } from 'next/navigation';
import { MapPin, Star, PhoneCall } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { siteTexts } from '@config/texts.config';

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
        <main className="container mx-auto px-4 py-8 space-y-8">
            {/* Top Section */ }
            <div className="md:flex md:gap-8">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden rounded-lg">
                    { imageSrc && (
                        <img
                            src={imageSrc}
                            alt={title}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    ) }
                    { meta.type && (
                        <span
                            className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
              { meta.type }
            </span>
                    ) }
                </div>
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-3xl font-heading font-bold">{ title }</h1>
                    { address && (
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-5 w-5"/>
                            <span>{ address }</span>
                        </div>
                    ) }
                    { (rating || reviews) && (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            { rating != null && <Star className="h-5 w-5 text-yellow-500"/> }
                            { rating != null && <span>{ rating.toFixed(1) }</span> }
                            { reviews != null && <span>({ reviews } avis)</span> }
                        </div>
                    ) }
                    <Card>
                        <CardContent className="space-y-2">
                            <h3 className="font-semibold">{ siteTexts.listing.contactTitle }</h3>
                            { phone && (
                                <div className="flex items-center space-x-2">
                                    <PhoneCall className="h-5 w-5"/>
                                    <a href={ `tel:${ phone }` } className="underline">
                                        { phone }
                                    </a>
                                </div>
                            ) }
                            { affiliateLink && (
                                <Button asChild>
                                    <a href={ affiliateLink } target="_blank" rel="noopener noreferrer">
                                        { siteTexts.listing.affiliateCta }
                                    </a>
                                </Button>
                            ) }
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Info Section */ }
            <section>
                <h2 className="text-2xl font-semibold mb-4">{ siteTexts.listing.infoTitle }</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    { openingHours && (
                        <div>
                            <h3 className="font-medium mb-2">Horaires d'ouverture</h3>
                            <ul className="text-muted-foreground space-y-1 list-inside">
                                { openingHours.map((oh) => (
                                    <li key={ oh }>{ oh }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                    { (services || equipment) && (
                        <div>
                            { services && (
                                <>
                                    <h3 className="font-medium mb-2">Services</h3>
                                    <ul className="text-muted-foreground list-disc list-inside space-y-1">
                                        { services.map((s) => (
                                            <li key={ s }>{ s }</li>
                                        )) }
                                    </ul>
                                </>
                            ) }
                            { equipment && (
                                <>
                                    <h3 className="font-medium mt-4 mb-2">Équipements</h3>
                                    <ul className="text-muted-foreground list-disc list-inside space-y-1">
                                        { equipment.map((e) => (
                                            <li key={ e }>{ e }</li>
                                        )) }
                                    </ul>
                                </>
                            ) }
                        </div>
                    ) }
                </div>
            </section>

            {/* Description Section */ }
            <section className="prose prose-lg max-w-none">
                <MDXRemote source={ content }/>
            </section>

            {/* Bottom CTA */ }
            { affiliateLink && (
                <div className="text-center py-8">
                    <Button asChild>
                        <a href={ affiliateLink } target="_blank" rel="noopener noreferrer">
                            { siteTexts.listing.bottomCta }
                        </a>
                    </Button>
                </div>
            ) }
        </main>
    );
}