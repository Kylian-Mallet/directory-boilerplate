"use client";

import { useState } from 'react';
import { Input } from './ui/input';
import { ContentItem } from '@/types/content';
import TagFilter from './TagFilter';
import Pagination from './Pagination';
import { directoryConfig } from '@config/directory.config';
import { siteTexts } from '@config/texts.config';
import ContentGrid from './layout/ContentGrid';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function Search({ items }: { items: ContentItem[] }) {
  const [searchResults, setSearchResults] = useState(items || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterContent(query, selectedTypes);
  };

  const handleTagSelect = (types: string[]) => {
    setSelectedTypes(types);
    filterContent(searchQuery, types);
    setCurrentPage(1);
  };

  const filterContent = (query: string, types: string[]) => {
    const filtered = (items || []).filter((item) => {
      // Prepare searchable text from new frontmatter fields
      const searchText = [
        item.meta.name,
        item.meta.type,
        item.meta.full_address,
        ...(item.meta.services || []),
        ...(item.meta.equipment || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesSearch = searchText.includes(query.toLowerCase());
      const matchesType = types.length === 0 || types.includes(item.meta.type as string);
      return matchesSearch && matchesType;
    });
    setSearchResults(filtered);
  };

  // Pagination logic
  const itemsPerPage = directoryConfig.itemsPerPage || 9;
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get all unique business types for filtering
  const allTypes = Array.from(new Set(
    (items || []).map(item => item.meta.type as string).filter(Boolean)
  ));

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <Card className="border-0 card-shadow bg-card">
        <CardContent className="p-6 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder={siteTexts.search.placeholder}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
            />
          </div>
          
          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              {siteTexts.search.filterByCategory}
            </div>
            <TagFilter 
              tags={allTypes}
              selectedTags={selectedTypes}
              onChange={handleTagSelect}
            />
          </div>
          
          {/* Results count */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? siteTexts.search.resultFound : siteTexts.search.resultsFound}
            </p>
            {(searchQuery || selectedTypes.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTypes([]);
                  setSearchResults(items || []);
                  setCurrentPage(1);
                }}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {siteTexts.search.clearFilters}
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {paginatedResults.length > 0 ? (
        <>
          <ContentGrid items={paginatedResults} />
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <Card className="border-0 card-shadow bg-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <SearchIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground">
                {siteTexts.search.noResultsTitle}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {siteTexts.search.noResultsMessage}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}