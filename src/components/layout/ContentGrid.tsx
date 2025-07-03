import React from 'react';
import { ContentItem } from '@/types/content';
import ContentCard from './ContentCard';

interface ContentGridProps {
    items: ContentItem[];
    className?: string;
}

export default function ContentGrid({ items, className = '' }: ContentGridProps) {
    return (
        <div className={ `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${ className }` }>
            { items.map((item) => (
                <ContentCard key={ item.fileName } item={ item }/>
            )) }
        </div>
    );
}