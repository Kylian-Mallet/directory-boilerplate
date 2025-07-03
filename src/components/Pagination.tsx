"use client";

import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteTexts } from '@config/texts.config';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show only a subset of pages for better UX
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    
    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        {siteTexts.pagination.previous}
      </Button>
      
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-muted-foreground">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className={`min-w-[40px] transition-all duration-300 ${
                  currentPage === page 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {siteTexts.pagination.next}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}