import Link from 'next/link';
import { getSlugs, getRegions, getCities } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <Link 
                        href={`/${slug}`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Retour à {slug}</span>
                    </Link>
                </div>
            </div>

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
                        Explorez les villes de {region} et découvrez leurs établissements
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            </main>
        </div>
    );
}