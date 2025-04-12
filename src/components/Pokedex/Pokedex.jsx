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

	useEffect(() => {
		const generateAndFetchRandomId = async () => {
			let randomId;
			switch (generation) {
				case '1':
					randomId = Math.floor(Math.random() * 151) + 1; // Gen 1: 1–151
					break;
				case '2':
					randomId = Math.floor(Math.random() * 100) + 152; // Gen 2: 152–251
					break;
				case '3':
					randomId = Math.floor(Math.random() * 135) + 252; // Gen 3: 252–386
					break;
				case '4':
					randomId = Math.floor(Math.random() * 107) + 387; // Gen 4: 387–493
					break;
				case '5':
					randomId = Math.floor(Math.random() * 156) + 494; // Gen 5: 494–649
					break;
				case '6':
					randomId = Math.floor(Math.random() * 72) + 650; // Gen 6: 650–721
					break;
				case '7':
					randomId = Math.floor(Math.random() * 88) + 722; // Gen 7: 722–809
					break;
				case '8':
					randomId = Math.floor(Math.random() * 96) + 810; // Gen 8: 810–905
					break;
				default:
					randomId = Math.floor(Math.random() * 151) + 1;
			}
			setPokemonId(randomId);
		};
		generateAndFetchRandomId();
	}, [generation]);

	// Fetch the Pokemon data based on the generated Pokemon ID
	useEffect(() => {
		if (!pokemonID) return;

		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
			.then((res) => res.json())
			.then((data) => {
				setLoading(true);
				setError(false);
				setTimeout(() => {
					setPokemon(data);
					setLoading(false);
				}, 500);
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
				console.log(err);
			});
	}, [pokemonID]);

	// Fetch Pokemon data based on generation list
	useEffect(() => {
		const fetchPokemon = async () => {
			if (!genPokemonList.length || pokemonID !== null) return;

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
	}, [genIndex, genPokemonList, pokemonID]);

	const flipCard = (cardID) => {
		const card = document.getElementById(`${cardID}`);
		if (card) card.classList.toggle('flipped');
	};

	const handlePokedexClick = () => {
		setIsActive(true);
	};

	const handleGenerationChange = (e) => {
		const selectedGen = e.target.value;
		setGeneration(selectedGen);

		const genMapping = {
			1: Array.from({ length: 151 }, (_, i) => (i + 1).toString()),
			2: Array.from({ length: 100 }, (_, i) => (i + 152).toString()),
			3: Array.from({ length: 135 }, (_, i) => (i + 252).toString()),
			4: Array.from({ length: 107 }, (_, i) => (i + 387).toString()),
			5: Array.from({ length: 156 }, (_, i) => (i + 494).toString()),
			6: Array.from({ length: 72 }, (_, i) => (i + 650).toString()),
			7: Array.from({ length: 88 }, (_, i) => (i + 722).toString()),
			8: Array.from({ length: 96 }, (_, i) => (i + 810).toString()),
		};

		setGenPokemonList(genMapping[selectedGen] || []);
		setGenIndex(0);
	};

	const playCry = () => {
		if (pokemon && pokemon.cries && pokemon.cries.latest) {
			const cryAudio = new Audio(pokemon.cries.latest);
			cryAudio.play();
		}
	};

	console.log('this is the pokemon data: ', pokemon);

	return (
		<div
			className={`pokedex ${isActive ? 'is-active' : ''}`}
			onClick={handlePokedexClick}
		>
			<div className='pokedex-left'>
				<div className='pokedex-left-top-row'>
					<div className='pokedex-left-top-lights'>
						<div
							className={`light is-sky is-big pulseBox ${
								loading ? 'is-animated' : ''
							}`}
						/>
						<div className='light is-red' />
						<div className='light is-yellow' />
						<div className='light is-green' />
					</div>

					{isActive && (
						<div className='generation-select-wrapper'>
							<select
								id='generation'
								value={generation}
								onChange={handleGenerationChange}
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
						setPokemonId={setPokemonId}
						generation={generation}
						setLoading={setLoading}
						setError={setError}
					/>
				</div>

				<div className='pokedex-bottom'>
					<div className='arrow-buttons-container'>
						<button
							id='keyboard_key_up'
							className='btn movements_control'
							onClick={() => setPokemonId((prevId) => prevId + 1)}
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
							onClick={() => setPokemonId((prevId) => prevId - 1)}
						>
							▼
						</button>
					</div>

					<div className='cry-button-container'>
						<button className='cry-button' onClick={playCry}>
							Play Cry
						</button>
					</div>
				</div>
			</div>
			<div className='pokedex-right-front' />
			<div className='pokedex-right-back' />
		</div>
	);
};

export default Pokedex;
