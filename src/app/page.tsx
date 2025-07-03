import { getAllContent, getCities, getRegions, getSlugs } from '@/lib/content';
import Search from '@/components/Search';
import { siteTexts } from '@config/texts.config';
import Link from 'next/link';

export default function Home() {
    const content = getAllContent();
    // Determine main slug for content routing
    const slugs = getSlugs();
    const mainSlug = slugs[0] || '';
    // List unique regions (max 12)
    const regions = getRegions(mainSlug).slice(0, 12);
    return (
        <>
            {/* Hero Section */ }
            <section className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold">
                        { siteTexts.hero.title }
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
                        { siteTexts.hero.description }
                    </p>
                </div>
            </section>

            {/* Search & Listings Section */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-4">
                        {siteTexts.search.title}
                    </h2>
                    <Search items={content} />
                </div>
            </section>

            {/* Regions Section */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        {siteTexts.regions.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {regions.map((region) => (
                            <Link key={region} href={`/${mainSlug}/${region}`}>
                              <div className="p-6 border rounded-lg text-center hover:shadow-md transition">
                                <h3 className="text-lg font-medium">{region}</h3>
                              </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Text Section */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-2xl mx-auto text-center text-muted-foreground">
                    <p className="mb-4">
                        {siteTexts.seo.paragraph1}
                    </p>
                    <p>
                        {siteTexts.seo.paragraph2}
                    </p>
                </div>
            </section>
        </>
    );
}