import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteTexts } from '@config/texts.config';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold font-heading">{siteTexts.errors.pageNotFound.title}</h2>
                <p className="text-xl text-muted-foreground">{siteTexts.errors.pageNotFound.message}</p>
                <Button asChild>
                    <Link href="/">{siteTexts.errors.pageNotFound.backButton}</Link>
                </Button>
            </div>
        </div>
    );
}