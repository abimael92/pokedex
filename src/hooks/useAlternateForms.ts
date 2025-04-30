import { useState, useCallback } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

export const useAlternateForms = () => {
  const [forms, setForms] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = useCallback(async (pokemonID: number) => {
    console.log('Fetching alternate forms for Pokemon ID:', pokemonID);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`);
      const varieties = res.data.varieties.filter((v: any) => !v.is_default);
      console.log('Filtered varieties:', varieties); 

      setForms(varieties.map((v: any) => v.pokemon));
    } catch (err) {
      console.error('Error fetching alternate forms:', err);
      setError('Failed to fetch alternate forms');
      setForms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { forms, loading, error, fetchForms };
};
