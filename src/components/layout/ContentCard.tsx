import { MapPin } from 'lucide-react';
import React from 'react';
// Using <img> for external URLs without Next.js image optimization
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ContentItem } from '@/types/content';

interface ContentCardProps {
    item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
    const { fileName, meta } = item;

    return (
        <Link href={ `/${ fileName }` }>
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-80 flex flex-col">
                {/* Preview image */ }
                { (meta.photo) && (
                    <div className="h-60 overflow-hidden rounded-t-lg relative">
                        <img
                            src={ meta.photo }
                            alt={ meta.name }
                            className="object-cover object-center w-full h-full"
                        />
                        {meta.type && (
                            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                                {meta.type}
                            </span>
                        )}
                    </div>
                ) }
                <CardContent className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    {/* Business name */ }
                    <CardTitle className="line-clamp-2 pb-1">{ meta.name }</CardTitle>
                    {/* Address preview */ }
                    { meta.full_address && (
                        <span className="text-xs text-muted-foreground line-clamp-2 flex items-center">
                            <MapPin className="mr-1 h-4 w-4"/>
                            { meta.full_address }
                        </span>
                    ) }
                </CardContent>
            </Card>
        </Link>
    );
}