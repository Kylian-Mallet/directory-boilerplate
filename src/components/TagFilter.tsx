"use client";

import { Button } from './ui/button';
import { X } from 'lucide-react';
import { siteTexts } from '@config/texts.config';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagFilter({ tags, selectedTags, onChange }: TagFilterProps) {
  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTag(tag)}
            className={`rounded-full transition-all duration-300 ${
              selectedTags.includes(tag) 
                ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90' 
                : 'hover:bg-primary/10 hover:border-primary hover:text-primary border-2'
            }`}
          >
            {tag}
            {selectedTags.includes(tag) && (
              <X className="h-3 w-3 ml-1" />
            )}
          </Button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/80"
        >
          {siteTexts.tags.clearAll}
        </Button>
      )}
    </div>
  );
}