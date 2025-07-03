import Link from 'next/link';
import { getSlugs, getRegions } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const slugs = getSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    const regions = getRegions(slug);
    
    if (!regions || regions.length === 0) {
        return {
            title: 'Page non trouvée',
            description: 'Cette page n\'existe pas.'
        };
    }

    const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Annuaire par Régions`;
    const description = `Découvrez les meilleurs ${slug} dans toutes les régions de France. ${regions.length} régions disponibles avec des établissements de qualité sélectionnés pour vous.`;
    
    return {
        title,
        description,
        keywords: [slug, 'France', 'régions', 'annuaire', 'établissements', ...regions].join(', '),
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
            canonical: `/${slug}`,
        },
    };
}

interface SlugPageProps {
    params: { slug: string };
}

export default function SlugPage({ params: { slug } }: SlugPageProps) {
    const regions = getRegions(slug);
    if (!regions || regions.length === 0) {
        return notFound();
    }
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${slug.charAt(0).toUpperCase() + slug.slice(1)} par Régions`,
        "description": `Annuaire des meilleurs ${slug} dans toutes les régions de France`,
        "url": `/${slug}`,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": regions.length,
            "itemListElement": regions.map((region, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Place",
                    "name": region,
                    "url": `/${slug}/${region}`
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
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <TrendingUp className="h-4 w-4" />
                            Catégorie
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 capitalize">
                            {slug}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Découvrez les meilleures adresses dans toutes les régions de France. 
                            {regions.length} régions disponibles avec des établissements soigneusement sélectionnés.
                        </p>
                    </div>

                    {/* Regions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
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

                    {/* SEO Content Section - Moved to Bottom */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Card className="border-0 card-shadow bg-card">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                                    Pourquoi choisir notre annuaire de {slug} ?
                                </h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                                    <p>
                                        Notre plateforme vous offre un accès privilégié aux meilleurs {slug} de France, 
                                        répartis dans {regions.length} régions. Chaque établissement est soigneusement 
                                        sélectionné selon des critères de qualité stricts.
                                    </p>
                                    <p>
                                        Que vous recherchiez un service de proximité ou que vous planifiez un voyage, 
                                        notre annuaire vous guide vers les meilleures adresses, avec des informations 
                                        détaillées, des avis clients et des coordonnées à jour.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 card-shadow bg-card">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                                    Explorez les régions françaises
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">
                                            Couverture nationale
                                        </h3>
                                        <p className="text-muted-foreground">
                                            De la Bretagne à la Provence, de l'Alsace aux Pyrénées, 
                                            découvrez une sélection d'établissements dans chaque région 
                                            de France métropolitaine.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-3">
                                            Qualité garantie
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Tous nos partenaires sont vérifiés et évalués selon nos 
                                            standards de qualité pour vous garantir une expérience 
                                            exceptionnelle.
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