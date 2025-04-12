import React, { useState, useEffect } from 'react';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import './Pokedex.css';

const Pokedex = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState(null);
	const [isActive, setIsActive] = useState(false);
	const [pokemonID, setPokemonId] = useState(null);

	const [generation, setGeneration] = useState('1');
	const [genPokemonList, setGenPokemonList] = useState([]);
	const [genIndex, setGenIndex] = useState(0);

	// Fetch generation list
	useEffect(() => {
		const fetchGenPokemon = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`https://pokeapi.co/api/v2/generation/${generation}`
				);
				const data = await res.json();
				const sortedList = data.pokemon_species.map((s) => s.name).sort(); // Sort for consistent next/prev

				setGenPokemonList(sortedList);
				setGenIndex(0); // Start at first of list
			} catch (err) {
				console.error(err);
				setError(true);
				setLoading(false);
			}
		};
		fetchGenPokemon();
	}, [generation]);

	// Fetch specific pokemon from generation list
	useEffect(() => {
		const fetchPokemon = async () => {
			if (!genPokemonList.length) return;

			try {
				setLoading(true);
				const name = genPokemonList[genIndex];
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
				const data = await res.json();
				setPokemon(data);
				setPokemonId(data.id);
				setError(false);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchPokemon();
	}, [genPokemonList, genIndex]);

	const flipCard = (cardID) => {
		const card = document.getElementById(`${cardID}`);
		card.classList.toggle('flipped');
	};

	const handlePokedexClick = () => {
		setIsActive(true);
	};

	return (
		<div
			className={`pokedex ${isActive ? 'is-active' : ''}`}
			onClick={handlePokedexClick}
		>
			<div className='pokedex-left'>
				<div
					className='pokedex-left-top'
					style={isActive ? { position: 'relative' } : {}}
				>
					<div
						className={`light is-sky is-big pulseBox ${
							loading && 'is-animated'
						}`}
					/>
					<div className='light is-red' />
					<div className='light is-yellow' />
					<div className='light is-green' />

					{isActive && (
						<div className='generation-select-container'>
							<select
								id='generation'
								value={generation}
								onChange={(e) => setGeneration(e.target.value)}
								className='generation-select'
							>
								<option value='1'>Gen 1</option>
								<option value='2'>Gen 2</option>
								<option value='3'>Gen 3</option>
								<option value='4'>Gen 4</option>
								<option value='5'>Gen 5</option>
								<option value='6'>Gen 6</option>
								<option value='7'>Gen 7</option>
								<option value='8'>Gen 8</option>
							</select>
						</div>
					)}
				</div>

				<div
					className='pokedex-screen-container'
					id={pokemonID}
					onClick={() => flipCard(pokemonID)}
				>
					<FrontScreen pokemon={pokemon} loading={loading} error={error} />
					<BackScreen
						pokemon={pokemon}
						loading={loading}
						error={error}
						stats={pokemon}
					/>
				</div>

				<div className='pokedex-left-bottom'>
					<PokemonForm
						setPokemonId={(id) => {
							const index = genPokemonList.findIndex(
								(name) => name === id.toLowerCase()
							);
							if (index !== -1) setGenIndex(index);
							else alert('Pokémon not found in this generation!');
						}}
						setLoading={setLoading}
						setError={setError}
					/>
				</div>

				<div className='pokedex-bottom'>
					<div id='wrapper'>
						<div id='controls'>
							<button
								id='keyboard_key_up'
								className='btn movements_control'
								onClick={() => {
									setGenIndex((prev) =>
										prev + 1 >= genPokemonList.length ? 0 : prev + 1
									);
								}}
							>
								▲
							</button>
							<button
								id='keyboard_key_left'
								className='btn movements_control'
								onClick={() => flipCard(pokemonID)}
							>
								◄
							</button>
							<button
								id='keyboard_key_right'
								className='btn movements_control'
								onClick={() => flipCard(pokemonID)}
							>
								►
							</button>
							<button
								id='keyboard_key_down'
								className='btn movements_control'
								onClick={() => {
									setGenIndex((prev) =>
										prev - 1 < 0 ? genPokemonList.length - 1 : prev - 1
									);
								}}
							>
								▼
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='pokedex-right-front' />
			<div className='pokedex-right-back' />
		</div>
	);
};

export default Pokedex;
