import { getAllContent, getCities, getRegions, getSlugs } from '@/lib/content';
import Search from '@/components/Search';
import { siteTexts } from '@config/texts.config';
import { directoryConfig } from '@config/directory.config';
import Link from 'next/link';
import { ArrowRight, MapPin, Star, TrendingUp, Search as SearchIcon, Filter, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
    const content = getAllContent();
    // Determine main slug for content routing
    const slugs = getSlugs();
    const mainSlug = slugs[0] || '';
    // List unique regions (max 8 for better layout)
    const regions = getRegions(mainSlug).slice(0, 8);
    
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background with gradient */}
                <div className="absolute inset-0 gradient-bg"></div>
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="relative container mx-auto px-4 py-24 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight">
                                {siteTexts.hero.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                                {siteTexts.hero.description}
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button 
                                size="lg" 
                                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
                                asChild
                            >
                                <Link href="#search" className="flex items-center gap-2">
                                    Découvrir
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60 backdrop-blur-sm h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                asChild
                            >
                                <Link href="#regions">
                                    Explorer les régions
                                </Link>
                            </Button>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
                            <div className="text-center">
                                <div className="text-3xl lg:text-4xl font-heading font-bold text-white">
                                    {content.length}+
                                </div>
                                <div className="text-white/80 font-medium">Établissements</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl lg:text-4xl font-heading font-bold text-white">
                                    {regions.length}+
                                </div>
                                <div className="text-white/80 font-medium">Régions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl lg:text-4xl font-heading font-bold text-white">
                                    4.8
                                </div>
                                <div className="text-white/80 font-medium">Note moyenne</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Search Section */}
            <section id="search" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto px-4 relative">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                            <SearchIcon className="h-4 w-4" />
                            Recherche Intelligente
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                            {siteTexts.search.title}
                        </h2>
                        <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Trouvez rapidement les meilleurs établissements grâce à notre système de recherche avancé et nos filtres intelligents
                        </p>
                    </div>

                    {/* Search Features Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <Card className="text-center p-6 border-0 card-shadow bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <SearchIcon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground">
                                    Recherche Rapide
                                </h3>
                                <p className="text-muted-foreground">
                                    Trouvez instantanément ce que vous cherchez par nom, adresse ou service
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center p-6 border-0 card-shadow bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <Filter className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground">
                                    Filtres Avancés
                                </h3>
                                <p className="text-muted-foreground">
                                    Affinez vos résultats par catégorie, services et équipements
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center p-6 border-0 card-shadow bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center">
                                    <Zap className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground">
                                    Résultats Instantanés
                                </h3>
                                <p className="text-muted-foreground">
                                    Obtenez des résultats pertinents en temps réel pendant que vous tapez
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Main Search Component */}
                    <div className="max-w-6xl mx-auto">
                        <Card className="border-0 card-shadow bg-card/95 backdrop-blur-sm overflow-hidden">
                            <CardContent className="p-8 lg:p-12">
                                <Search items={content} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                        <div className="text-center p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
                            <div className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-2">
                                {content.length}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">Établissements référencés</div>
                        </div>
                        <div className="text-center p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
                            <div className="text-2xl lg:text-3xl font-heading font-bold text-secondary mb-2">
                                {regions.length}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">Régions couvertes</div>
                        </div>
                        <div className="text-center p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
                            <div className="text-2xl lg:text-3xl font-heading font-bold text-accent mb-2">
                                100%
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">Gratuit</div>
                        </div>
                        <div className="text-center p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
                            <div className="text-2xl lg:text-3xl font-heading font-bold text-primary mb-2">
                                24/7
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">Disponible</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Regions Section */}
            <section id="regions" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <TrendingUp className="h-4 w-4" />
                            Populaire
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                            {siteTexts.regions.title}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explorez nos régions les plus populaires et découvrez des établissements exceptionnels
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {regions.map((region, index) => (
                            <Link key={region} href={`/${mainSlug}/${region}`}>
                                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 card-shadow border-0 bg-card">
                                    <CardContent className="p-6 text-center space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                                                {region}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {getCities(mainSlug, region).length} villes
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 text-accent">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-medium">4.8</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                            Pourquoi nous choisir ?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Une plateforme moderne et intuitive pour découvrir les meilleurs établissements
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center p-8 border-0 card-shadow bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <SearchIcon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-foreground">
                                    Recherche Avancée
                                </h3>
                                <p className="text-muted-foreground">
                                    Trouvez exactement ce que vous cherchez avec nos filtres intelligents
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center p-8 border-0 card-shadow bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center">
                                    <Star className="h-8 w-8 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-foreground">
                                    Qualité Garantie
                                </h3>
                                <p className="text-muted-foreground">
                                    Tous nos établissements sont soigneusement sélectionnés et vérifiés
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center p-8 border-0 card-shadow bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="space-y-4">
                                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center">
                                    <MapPin className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-foreground">
                                    Couverture Nationale
                                </h3>
                                <p className="text-muted-foreground">
                                    Découvrez des établissements dans toute la France
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* SEO Text Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                            Votre guide de confiance
                        </h2>
                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                            <p className="text-lg leading-relaxed">
                                {siteTexts.seo.paragraph1}
                            </p>
                            <p className="text-lg leading-relaxed">
                                {siteTexts.seo.paragraph2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}