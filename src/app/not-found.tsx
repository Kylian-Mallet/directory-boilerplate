import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { siteTexts } from '@config/texts.config';
import { directoryConfig } from '@config/directory.config';
import { Home, Search, MapPin, ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 py-12 relative">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    {/* 404 Visual */}
                    <div className="space-y-6">
                        <div className="relative">
                            <h1 className="text-8xl lg:text-9xl font-heading font-bold text-primary/20 select-none">
                                404
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Compass className="h-12 w-12 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                                {siteTexts.errors.pageNotFound.title}
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
                                {siteTexts.errors.pageNotFound.message}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button 
                            asChild 
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="h-5 w-5" />
                                {siteTexts.errors.pageNotFound.backButton}
                            </Link>
                        </Button>
                        
                        <Button 
                            asChild 
                            variant="outline" 
                            size="lg"
                            className="border-2 border-primary/20 hover:border-primary hover:bg-primary/10 h-14 px-8 text-lg font-semibold transition-all duration-300"
                        >
                            <Link href="/#search" className="flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                {siteTexts.navigation.search}
                            </Link>
                        </Button>
                    </div>

                    {/* Helpful Links */}
                    <Card className="border-0 card-shadow bg-card/80 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
                                Peut-être cherchez-vous...
                            </h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link 
                                    href="/"
                                    className="group flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-muted transition-all duration-300 border border-border/50 hover:border-primary/50"
                                >
                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Home className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                            Page d'accueil
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Retour à l'accueil
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </Link>

                                <Link 
                                    href="/#search"
                                    className="group flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-muted transition-all duration-300 border border-border/50 hover:border-primary/50"
                                >
                                    <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                                        <Search className="h-5 w-5 text-secondary" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-foreground group-hover:text-secondary transition-colors">
                                            Recherche
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Trouvez ce que vous cherchez
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                                </Link>

                                <Link 
                                    href="/#regions"
                                    className="group flex items-center gap-3 p-4 bg-background rounded-xl hover:bg-muted transition-all duration-300 border border-border/50 hover:border-primary/50"
                                >
                                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                                        <MapPin className="h-5 w-5 text-accent" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                                            Régions
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Explorer par région
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                </Link>

                                <div className="group flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Compass className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-foreground">
                                            Aide
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Besoin d'assistance ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Site Info */}
                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Vous êtes sur <span className="font-semibold text-primary">{directoryConfig.name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            {directoryConfig.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}