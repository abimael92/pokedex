import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

export const useAlternateForms = (pokemonID: number | null) => {
  const [forms, setForms] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonID) return;

    const fetchForms = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`);
        const varieties = res.data.varieties.filter((v: any) => !v.is_default);
        setForms(varieties.map((v: any) => v.pokemon));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch alternate forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [pokemonID]);

  return { forms, loading, error };
};
