// Dynamic page to list cities under a given slug and region
import Link from 'next/link';
import { getSlugs, getRegions, getCities } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const params: { slug: string; region: string }[] = [];
    const slugs = getSlugs();
    slugs.forEach((slug) => {
        getRegions(slug).forEach((region) => {
            params.push({ slug, region });
        });
    });
    return params;
}

interface RegionPageProps {
    params: { slug: string; region: string };
}

export default function RegionPage({ params: { slug, region } }: RegionPageProps) {
    const regions = getRegions(slug);
    if (!regions.includes(region)) {
        return notFound();
    }
    const cities = getCities(slug, region);
    if (!cities || cities.length === 0) {
        return notFound();
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold mb-6">{ region }</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                { cities.map((city) => (
                    <Link key={ city } href={ `/${ slug }/${ region }/${ city }` }>
                        <div className="p-6 border rounded-lg text-center hover:shadow-md transition">
                            <h2 className="text-xl font-medium">{ city }</h2>
                        </div>
                    </Link>
                )) }
            </div>
        </main>
    );
}