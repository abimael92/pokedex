import { useState, useEffect } from 'react';
import { fetchPokemonById, fetchPokemonByName } from '../services/pokemonApi';
import {
	getRandomPokemonId,
	getGenerationPokemonList,
} from '../utils/pokemonGenerations';
import { Pokemon, Generation } from '../types/pokemon';

export const usePokemon = (initialGeneration: Generation = '1') => {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [pokemonID, setPokemonId] = useState<number | null>(null);
	const [generation, setGeneration] = useState<Generation>(initialGeneration);
	const [genPokemonList, setGenPokemonList] = useState<string[]>(
		getGenerationPokemonList(initialGeneration)
	);
	const [genIndex, setGenIndex] = useState<number>(0);

	// Initialize with random Pokemon from selected generation
	useEffect(() => {
		if (pokemonID === null) {
			const randomId = getRandomPokemonId(Number(generation)); // Cast generation to number here
			setPokemonId(randomId);
		}
	}, [pokemonID, generation]);

	// Fetch Pokemon by ID
	useEffect(() => {
		if (!pokemonID) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(false);
				const data = await fetchPokemonById(pokemonID);
				setPokemon(data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
				console.error('Failed to fetch Pokemon:', err);
			}
		};

		// Added delay for better UX (shows loading state)
		const timer = setTimeout(fetchData, 500);
		return () => clearTimeout(timer);
	}, [pokemonID]);

	// Update when generation changes
	useEffect(() => {
		setGenPokemonList(getGenerationPokemonList(Number(generation))); // Cast to number
		setGenIndex(0);
	}, [generation]);

	const setPokemonIdentifier = (
		identifier:
			| string
			| number
			| null
			| ((prev: number | null) => number | null)
	) => {
		if (identifier === null || identifier === '') {
			const randomId = getRandomPokemonId(Number(generation)); // Cast generation to number here as well
			setPokemonId(randomId);
		} else if (typeof identifier === 'string') {
			fetchPokemonByName(identifier)
				.then((data) => setPokemonId(data.id))
				.catch((err) => console.error('Failed to fetch Pokémon:', err));
		} else {
			setPokemonId(identifier);
		}
	};

	const handleGenerationChange = (selectedGen: Generation) => {
		setGeneration(selectedGen);
		const randomId = getRandomPokemonId(Number(selectedGen)); // Cast selectedGen to number here
		setPokemonId(randomId); // Force a new random Pokémon
	};

	return {
		pokemon,
		loading,
		error,
		pokemonID,
		generation,
		setPokemonId: setPokemonIdentifier,
		setGeneration: handleGenerationChange,
		setGenIndex,
	};
};
