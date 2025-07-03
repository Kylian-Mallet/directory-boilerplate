'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { directoryConfig } from '@config/directory.config';
import { siteTexts } from '@config/texts.config';
import { Search, Menu, ArrowLeft } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  
  // Parse the current path to determine navigation context
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Generate breadcrumb navigation based on current path
  const getBreadcrumbNavigation = () => {
    if (pathSegments.length === 0) return null;
    
    const [slug, region, city, listing] = pathSegments;
    
    if (listing) {
      // On listing page: back to city
      return {
        href: `/${slug}/${region}/${city}`,
        label: `${siteTexts.navigation.backToCity} ${city}`
      };
    } else if (city) {
      // On city page: back to region
      return {
        href: `/${slug}/${region}`,
        label: `${siteTexts.navigation.backToRegion} ${region}`
      };
    } else if (region) {
      // On region page: back to slug
      return {
        href: `/${slug}`,
        label: `${siteTexts.navigation.backToCategory} ${slug}`
      };
    } else if (slug) {
      // On slug page: back to home
      return {
        href: '/',
        label: siteTexts.navigation.backToHome
      };
    }
    
    return null;
  };
  
  const backNavigation = getBreadcrumbNavigation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo or Back button */}
          <div className="flex items-center gap-4">
            {backNavigation ? (
              <Link 
                href={backNavigation.href}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">{backNavigation.label}</span>
              </Link>
            ) : (
              <Link 
                href="/" 
                className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                {directoryConfig.name}
              </Link>
            )}
          </div>
          
          {/* Right side - Navigation items */}
          <div className="flex items-center gap-4">
            {/* Show logo on non-home pages when back button is present */}
            {backNavigation && (
              <Link 
                href="/" 
                className="hidden md:block text-lg font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                {directoryConfig.name}
              </Link>
            )}
            
            <Link 
              href="/#search" 
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">{siteTexts.navigation.search}</span>
            </Link>
            
            <button className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;