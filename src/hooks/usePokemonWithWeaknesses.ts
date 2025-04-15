import { useEffect, useState } from 'react';
import { Pokemon } from '../types/pokemon';

export const usePokemonWithWeaknesses = (idOrName: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        // Fetch Pokémon data
        const data = await fetchPokemonById(idOrName);
        console.log("Pokemon Data:", data);

        // Fetch weaknesses based on the Pokémon's types
        const weaknessesData = await getWeaknesses(idOrName);

        setPokemon(data);
        setWeaknesses(weaknessesData);
      } catch (error) {
        setError(true);
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idOrName]);

  return { pokemon, weaknesses, loading, error };
};



// Exporting all functions
export const fetchPokemonById = async (id: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Pokemon:', error);
    throw error;
  }
};

export const getWeaknesses = async (idOrName: string) => {
    // First, fetch the Pokemon by name or id
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    const pokemonData = await pokemonRes.json();

    // Fetch weaknesses based on types
    const damageFromMap = new Map<string, number>();

   // Loop through each type and fetch weakness data
  for (const type of pokemonData.types) {
    const res = await fetch(type.type.url);
    const typeData = await res.json();

    const doubleDamageFrom = typeData.damage_relations.double_damage_from;

     // Accumulate weaknesses
     doubleDamageFrom.forEach((entry: { name: string }) => {
        const count = damageFromMap.get(entry.name) || 0;
        damageFromMap.set(entry.name, count + 1);
      });
    }

    // Return the weaknesses as an array of type names
    return Array.from(damageFromMap.keys());
};

