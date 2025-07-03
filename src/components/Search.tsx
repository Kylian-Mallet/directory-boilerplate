"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from './ui/input';
import { ContentItem } from '@/types/content';
import TagFilter from './TagFilter';
import Pagination from './Pagination';
import { directoryConfig } from '@config/directory.config';
import { siteTexts } from '@config/texts.config';

// Dynamically import the ContentGrid component
const ContentGrid = dynamic(() => import('./layout/ContentGrid'));

export default function Search({ items }: { items: ContentItem[] }) {
  const [searchResults, setSearchResults] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    filterContent(query, selectedTypes);
  };

  const handleTagSelect = (types: string[]) => {
    setSelectedTypes(types);
    filterContent('', types);
    setCurrentPage(1);
  };

  const filterContent = (query: string, types: string[]) => {
    const filtered = items.filter((item) => {
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
    items.map(item => item.meta.type as string).filter(Boolean)
  ));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
      <Input
        type="search"
        placeholder={siteTexts.search.placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-md mx-auto"
      />
      <TagFilter 
        tags={allTypes}
        selectedTags={selectedTypes}
        onChange={handleTagSelect}
      />
      </div>
      <ContentGrid items={paginatedResults} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}