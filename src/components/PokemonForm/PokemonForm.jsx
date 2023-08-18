import React, { useState } from 'react';
import './PokemonForm.css';

function PokemonForm({ setPokemonId, setLoading, setError }) {
	const [pokemon, setPokemon] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (pokemon !== '') {
			setError(true);
			setLoading(true);
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
				);
				const data = await response.json();
				const pokemonID = data.id;
				setPokemonId(pokemonID);
				setPokemon('');
			} catch (error) {
				console.log(error);
				setError(true);
				setLoading(false);
			}
		} else {
			setLoading(true);
			try {
				// Send a request for a random Pokémon
				const randomPokemonID = Math.floor(Math.random() * 151) + 1;
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`
				);
				const data = await response.json();
				setPokemonId(randomPokemonID);
				setPokemon('');
				setError(false);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setError(true);
				setLoading(false);
			}
		}
	};
	return (
		<form className='pokemon-form' onSubmit={handleSubmit}>
			<input
				className='pokemon-input'
				type='text'
				name='pokemon'
				value={pokemon}
				placeholder='Search...'
				onChange={(e) => setPokemon(e.target.value)}
				autoComplete='off'
			/>
			<input type='submit' className='pokemon-btn' value='' />
		</form>
	);
}

export default PokemonForm;
