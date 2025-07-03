import { MapPin, Star, ExternalLink, Award } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ContentItem } from '@/types/content';
import { Button } from '@/components/ui/button';
import { siteTexts } from '@config/texts.config';

interface ContentCardProps {
    item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
    const { fileName, meta } = item;

    return (
        <Card className="group overflow-hidden border-0 card-shadow bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Preview image */}
            {meta.photo && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={meta.photo}
                        alt={meta.name}
                        className="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {meta.type && (
                        <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                                <Award className="h-3 w-3" />
                                {meta.type}
                            </span>
                        </div>
                    )}
                    {meta.rating && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                                <Star className="h-3 w-3 fill-current" />
                                {meta.rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>
            )}
            
            <CardContent className="p-6 space-y-4">
                {/* Business name */}
                <div className="space-y-2">
                    <CardTitle className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {meta.name}
                    </CardTitle>
                    
                    {/* Address preview */}
                    {meta.full_address && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{meta.full_address}</span>
                        </div>
                    )}
                </div>

                {/* Services preview */}
                {meta.services && meta.services.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {meta.services.slice(0, 2).map((service, index) => (
                            <span 
                                key={index}
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                            >
                                {service}
                            </span>
                        ))}
                        {meta.services.length > 2 && (
                            <span className="text-xs text-muted-foreground px-2 py-1">
                                +{meta.services.length - 2}
                            </span>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                    <Button 
                        asChild 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <Link href={`/${fileName}`} className="flex items-center gap-2">
                            {siteTexts.content.viewDetails}
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}