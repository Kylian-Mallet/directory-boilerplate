import Link from 'next/link';
import { directoryConfig } from '@config/directory.config';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            {directoryConfig.name}
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Rechercher</span>
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