// Dynamic page to list regions under a given slug
import Link from 'next/link';
import { getSlugs, getRegions } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const slugs = getSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface SlugPageProps {
    params: { slug: string };
}

export default function SlugPage({ params: { slug } }: SlugPageProps) {
    const regions = getRegions(slug);
    if (!regions || regions.length === 0) {
        return notFound();
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold mb-6">{ slug }</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                { regions.map((region) => (
                    <Link key={ region } href={ `/${ slug }/${ region }` }>
                        <div className="p-6 border rounded-lg text-center hover:shadow-md transition">
                            <h2 className="text-xl font-medium">{ region }</h2>
                        </div>
                    </Link>
                )) }
            </div>
        </main>
    );
}