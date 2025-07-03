import Link from 'next/link';
import { getSlugs, getRegions } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export async function generateStaticParams() {
    const slugs = getSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface SlugPageProps {
    params: { slug: string };
}

export default function SlugPage({ params: { slug } }: SlugPageProps) {
    const regions = getRegions(slug);
    if (!regions || regions.length === 0) {
        return notFound();
    }
    
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <TrendingUp className="h-4 w-4" />
                        Catégorie
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 capitalize">
                        {slug}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez les meilleures adresses dans toutes les régions de France
                    </p>
                </div>

                {/* Regions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {regions.map((region, index) => (
                        <Link key={region} href={`/${slug}/${region}`}>
                            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-shadow border-0 bg-card h-full">
                                <CardContent className="p-6 text-center space-y-4 h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                                                {region}
                                            </h2>
                                            <p className="text-muted-foreground text-sm mt-1">
                                                Région française
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4">
                                        <div className="text-sm text-primary font-medium group-hover:text-primary/80 transition-colors">
                                            Explorer →
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