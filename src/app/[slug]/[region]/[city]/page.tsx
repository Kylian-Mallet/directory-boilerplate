import ContentGrid from '@/components/layout/ContentGrid';
import { getSlugs, getRegions, getCities, getListings } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Building2, MapPin } from 'lucide-react';

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

interface CityPageProps {
    params: { slug: string; region: string; city: string };
}

export default function CityPage({ params: { slug, region, city } }: CityPageProps) {
    const regions = getRegions(slug);
    if (!regions.includes(region)) return notFound();
    const cities = getCities(slug, region);
    if (!cities.includes(city)) return notFound();
    const listings = getListings(slug, region, city);
    
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <Building2 className="h-4 w-4" />
                        Ville
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 capitalize">
                        {city}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{region}, France</span>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez les meilleurs établissements de {city}
                    </p>
                </div>

                {/* Listings */}
                {listings.length > 0 ? (
                    <ContentGrid items={listings} />
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
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}