import React, { useState } from 'react';
import { getRandomPokemonId } from '../../utils/pokemonGenerations';
import './PokemonForm.css';

function PokemonForm({ setPokemonId, generation }) {
	const [pokemonName, setPokemonName] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (pokemonName.trim() !== '') {
				setPokemonId(pokemonName.toLowerCase());
			} else {
				const randomId = getRandomPokemonId(generation);
				setPokemonId(randomId);
			}
			setPokemonName('');
		} catch (error) {
			console.error('Form submission error:', error);
		}
	};

	return (
		<form className='pokemon-form' onSubmit={handleSubmit}>
			<input
				className='pokemon-input'
				type='text'
				name='pokemon'
				value={pokemonName}
				placeholder='Search...'
				onChange={(e) => setPokemonName(e.target.value)}
				autoComplete='off'
			/>
			<input type='submit' className='pokemon-btn' value='' />
		</form>
	);
}

export default PokemonForm;
