import React, { useState, useEffect } from 'react';
import './PokemonForm.css';

function PokemonForm({ setPokemonId, setLoading, setError, generation }) {
	const [pokemon, setPokemon] = useState('');

	const getRandomIdByGen = (gen) => {
		switch (gen) {
			case '1':
				return Math.floor(Math.random() * 151) + 1;
			case '2':
				return Math.floor(Math.random() * 100) + 152;
			case '3':
				return Math.floor(Math.random() * 135) + 252;
			case '4':
				return Math.floor(Math.random() * 107) + 387;
			case '5':
				return Math.floor(Math.random() * 156) + 494;
			case '6':
				return Math.floor(Math.random() * 72) + 650;
			case '7':
				return Math.floor(Math.random() * 88) + 722;
			case '8':
				return Math.floor(Math.random() * 96) + 810;
			default:
				return Math.floor(Math.random() * 151) + 1;
		}
	};

	useEffect(() => {
		const fetchRandomByGeneration = async () => {
			setLoading(true);
			try {
				const id = getRandomIdByGen(generation);
				setPokemonId(id);
				setError(false);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchRandomByGeneration();
	}, [generation]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			let id;
			if (pokemon.trim() !== '') {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
				);
				const data = await response.json();
				id = data.id;
			} else {
				id = getRandomIdByGen(generation);
			}
			setPokemonId(id);
			setError(false);
			setPokemon('');
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
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
