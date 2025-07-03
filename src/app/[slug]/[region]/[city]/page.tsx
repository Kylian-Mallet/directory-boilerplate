// Dynamic page to list listings under a given slug, region, and city
import ContentGrid from '@/components/layout/ContentGrid';
import { getSlugs, getRegions, getCities, getListings } from '@/lib/content';
import { notFound } from 'next/navigation';

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
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold mb-6 capitalize">{ city }</h1>
            <ContentGrid items={ listings }/>
        </main>
    );
}