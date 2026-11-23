import { useEffect, useState } from 'react';
import { puppyData } from '../data/catalogue';
import { fetchCatalogue } from '../services/api';

export function useCatalogue() {
  const [items, setItems] = useState(puppyData);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchCatalogue(controller.signal)
      .then(data => {
        setItems(data.map(p => ({
          ...puppyData.find(local => local.slug === p.slug),
          ...p,
        })));
        setApiError(false);
      })
      .catch(error => {
        if (error.name !== 'AbortError') setApiError(true);
      });
    return () => controller.abort();
  }, []);

  return { items, apiError };
}
