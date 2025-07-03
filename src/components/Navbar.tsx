import Link from 'next/link';

import { directoryConfig } from '@config/directory.config';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-heading font-semibold">
            {directoryConfig.name}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
