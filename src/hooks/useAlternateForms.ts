import { useState, useCallback } from 'react';
import axios from 'axios';
import { generationRanges } from '../utils/pokemonGenerations'; // Import the utility

interface Pokemon {
  name: string;
  url: string;
}

export const useAlternateForms = () => {
  const [forms, setForms] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = useCallback(async (pokemonID: number, generation: number) => {
    // Get the valid range for the generation
    const range = generationRanges[generation] || generationRanges[1];

    // If pokemonID is greater than the last ID of the generation, skip the request
    if (pokemonID > range.end) {
      console.warn(`Pokémon ID ${pokemonID} is beyond the last Pokémon ID of generation ${generation}`);
      setError(`Pokémon ID ${pokemonID} is beyond the last Pokémon ID of generation ${generation}`);
      setForms([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`);

      const varieties = res.data.varieties.filter((v: any) => !v.is_default);
      setForms(varieties.map((v: any) => v.pokemon));
    } catch (err: any) {
      console.warn('Handled fetchForms error:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('No alternate forms found for this Pokémon.');
        } else {
          setError(`Server responded with status ${err.response?.status}`);
        }
      } else {
        setError('An unexpected error occurred.');
      }

      setForms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { forms, loading, error, fetchForms };
};
