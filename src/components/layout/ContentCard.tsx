import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ContentItem } from '@/types/content';

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const { fileName, meta } = item;

  return (
    <Link href={`/content/${fileName.replace('.mdx', '')}`}>
      <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-80 flex flex-col">
        {meta.image && (
          <div className="h-60 relative">
            <Image 
              src={meta.image} 
              alt={meta.title} 
              fill 
              className="object-cover object-top rounded-t-lg" 
            />
          </div>
        )}
        <CardContent className="p-4 space-y-2 flex-grow flex flex-col justify-between">
          <CardTitle className="line-clamp-2 pb-1">{meta.title}</CardTitle>
          {meta.summary && (
            <CardDescription className="line-clamp-3">{meta.summary}</CardDescription>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}