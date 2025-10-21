/**
 * Custom hook for fetching and caching meals data
 * Implements efficient data fetching with error handling
 */

import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Cache meals in memory to avoid redundant API calls
let mealsCache = null;
let cacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute

export function useMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMeals() {
      // Check cache first
      const now = Date.now();
      if (mealsCache && (now - cacheTime) < CACHE_DURATION) {
        setMeals(mealsCache);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/meals`, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch meals. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server.');
        }

        // Update cache
        mealsCache = data;
        cacheTime = now;

        setMeals(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching meals:', err);
          setError(err.message || 'Something went wrong!');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();

    return () => {
      controller.abort();
    };
  }, []);

  return { meals, isLoading, error };
}
