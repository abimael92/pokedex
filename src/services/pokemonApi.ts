import { Pokemon } from '../types/pokemon'; // adjust the path as needed

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
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

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Failed to fetch Pokemon:', error);
		throw error;
	}
};
