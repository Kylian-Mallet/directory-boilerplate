"use client";

import { useEffect } from 'react';
import { Button } from './ui/button';
import { siteTexts } from '@config/texts.config';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">{siteTexts.errors.generalError.title}</h2>
        <p className="text-muted-foreground">
          {error.message || siteTexts.errors.generalError.message}
        </p>
        <Button onClick={reset}>{siteTexts.errors.generalError.tryAgain}</Button>
      </div>
    </div>
  );
}