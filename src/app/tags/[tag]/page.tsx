import { getContentByTag } from '@/lib/content';
import ContentGrid from '@/components/layout/ContentGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { siteTexts } from '@config/texts.config';

export default function TagPage({ params }: { params: { tag: string } }) {
  const content = getContentByTag(params.tag);

  return (
    <main id="main-content" className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <Button asChild variant="outline">
          <Link href="/">{siteTexts.tagPage.back}</Link>
        </Button>
        <h1 className="text-3xl font-bold font-heading">
          {siteTexts.tagPage.heading} "{params.tag}"
        </h1>
      </div>
      <ContentGrid items={content} />
    </main>
  );
}