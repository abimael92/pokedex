import { useState, useEffect } from 'react';
import { fetchPokemonById } from '../services/pokemonApi';

export const usePokemonForms = (pokemonID: number) => {
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!pokemonID) return;

        const fetchDescription = async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await fetchPokemonById(pokemonID);

                // Correct endpoint: species
                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();

                const englishEntry = speciesData.flavor_text_entries.find(
                    (entry: any) => entry.language.name === 'en'
                );

                const flavorText = englishEntry?.flavor_text.replace(/\f/g, ' ') || 'No description available';

                setDescription(flavorText);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching species description:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchDescription();
    }, [pokemonID]);

    return { description, loading, error };
};
