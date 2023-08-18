import React, { useState, useEffect } from 'react';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import './Pokedex.css';

const Pokedex = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState(null);
	const [prevPokemonId, setPrevPokemonId] = useState(null);
	const [nextPokemonId, setNextPokemonId] = useState(null);
	const RandomId = Math.floor(Math.random() * 151 + 1);
	// const RandomId = Math.floor(Math.random() * 806 + 1)

	const [pokemonID, setPokemonId] = useState(RandomId);
	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
			.then((res) => res.json())
			.then((data) => {
				setPokemon(data);
				setLoading(false);
				setError(false);
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
				console.log(err);
			});
	}, [pokemonID]);

	useEffect(() => {
		if (nextPokemonId !== null) {
			setPokemonId(nextPokemonId);
			setNextPokemonId(null);
		}
	}, [nextPokemonId]);

	useEffect(() => {
		if (prevPokemonId !== null) {
			setPokemonId(prevPokemonId);
			setPrevPokemonId(null);
		}
	}, [prevPokemonId]);

	function flipCard(cardID) {
		const card = document.getElementById(`${cardID}`);
		card.classList.toggle('flipped');
	}

	async function collectSpeciesNames(chain) {
		let speciesNames = [];

		// Helper function to extract the species name from an evolution chain
		function extractSpeciesName(evolution) {
			if (evolution.species && evolution.species.name) {
				const speciesName = evolution.species.name;
				if (!speciesNames.includes(speciesName)) {
					speciesNames.push(speciesName);
				}
			}
		}

		// Recursive function to iterate through the evolution chain
		function iterateEvolutionChain(chain) {
			if (chain) {
				extractSpeciesName(chain);

				if (chain.evolves_to && chain.evolves_to.length > 0) {
					chain.evolves_to.forEach((evolution) => {
						extractSpeciesName(evolution);
						iterateEvolutionChain(evolution);
					});
				}
			}
		}

		iterateEvolutionChain(chain);

		return speciesNames;
	}

	const setPokemonEvolution = async (pokemonID) => {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
			);
			const data = await response.json();
			const evolutionChainURL = data.evolution_chain.url;
			const evolutionResponse = await fetch(evolutionChainURL);
			const evolutionData = await evolutionResponse.json();

			const evolutionDataLog = JSON.stringify(evolutionData, null, 4);
			console.log(evolutionDataLog);

			const currentSpeciesName = evolutionData.chain.species.name;
			const evolutionChain = await collectSpeciesNames(
				evolutionData.chain
			);

			console.log(evolutionChain);

			const currentIndex = evolutionChain.indexOf(currentSpeciesName);

			if (
				currentIndex !== -1 &&
				currentIndex < evolutionChain.length - 1
			) {
				const nextSpeciesName = evolutionChain[currentIndex + 1];
				const nextSpeciesResponse = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${nextSpeciesName}`
				);
				const nextSpeciesData = await nextSpeciesResponse.json();
				const nextSpeciesID = nextSpeciesData.id;

				setNextPokemonId(nextSpeciesID); // Use the separate state variable
			} else {
				console.log('No evolution found.');
				alert('No evolution found.');
			}
		} catch (error) {
			alert('An error occurred');
			console.log(error);
		}
	};

	const setPokemonPreEvolution = async (pokemonID) => {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`
			);
			const data = await response.json();
			const evolutionChainURL = data.evolution_chain.url;
			const evolutionResponse = await fetch(evolutionChainURL);
			const evolutionData = await evolutionResponse.json();

			const evolutionDataLog = JSON.stringify(evolutionData, null, 4);
			console.log(evolutionDataLog);

			const currentSpeciesName = evolutionData.chain.species.name;
			const evolutionChain = await collectSpeciesNames(
				evolutionData.chain
			);
			console.log(evolutionChain);

			const currentIndex = evolutionChain.indexOf(currentSpeciesName);

			if (evolutionChain && evolutionChain.length > 0) {
				const preEvolutionSpeciesName =
					evolutionChain[currentIndex + 1];
				const preEvolutionResponse = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${preEvolutionSpeciesName}`
				);
				const preEvolutionData = await preEvolutionResponse.json();
				const preEvolutionID = preEvolutionData.id;

				setPrevPokemonId(preEvolutionID);
			} else {
				console.log('No pre-evolution found.');
				alert('No pre-evolution found.');
			}
		} catch (error) {
			alert('An error occurred');
			console.log(error);
		}
	};

	const [isActive, setIsActive] = useState(false);

	const handlePokedexClick = () => {
		setIsActive(true);
	};

	return (
		<div
			className={`pokedex ${isActive ? 'is-active' : ''}`}
			onClick={handlePokedexClick}>
			<div className='pokedex-left'>
				<div className='pokedex-left-top'>
					<div
						className={`light is-sky is-big pulseBox ${
							loading && 'is-animated'
						}`}
					/>
					<div className='light is-red' />
					<div className='light is-yellow' />
					<div className='light is-green' />
				</div>
				<div
					className='pokedex-screen-container'
					id={pokemonID}
					onClick={() => flipCard(pokemonID)}>
					<FrontScreen
						pokemon={pokemon}
						loading={loading}
						error={error}
					/>
					<BackScreen
						pokemon={pokemon}
						loading={loading}
						error={error}
						stats={pokemon}
					/>
				</div>
				<div className='pokedex-left-bottom'>
					<PokemonForm
						setPokemonId={setPokemonId}
						setLoading={setLoading}
						setError={setError}
					/>
				</div>
				<div className='pokedex-bottom'>
					<div id='wrapper'>
						<div id='controls'>
							<button
								id='keyboard_key_up'
								className=' btn movements_control'
								onClick={() => {
									console.log('Pokemon ID:', pokemonID + 1);
									setPokemonId((prevId) => prevId + 1);
								}}>
								▲
							</button>
							<button
								id='keyboard_key_left'
								className=' btn movements_control'
								onClick={() =>
									setPokemonPreEvolution(pokemonID)
								}>
								◄
							</button>
							<button
								id='keyboard_key_right'
								className=' btn movements_control'
								onClick={() => setPokemonEvolution(pokemonID)}>
								►
							</button>
							<button
								id='keyboard_key_down'
								className=' btn  movements_control'
								onClick={() => {
									console.log('Pokemon ID:', pokemonID - 1);
									setPokemonId((prevId) => prevId - 1);
								}}>
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
