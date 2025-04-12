import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import { usePokemon } from '../../hooks/usePokemon';
import './Pokedex.css';

const Pokedex = () => {
	const [isActive, setIsActive] = useState(false);
	const {
		pokemon,
		loading,
		error,
		pokemonID,
		generation,
		setPokemonId,
		setGeneration,
	} = usePokemon();

	const flipCard = (cardID) => {
		const card = document.getElementById(`${cardID}`);
		if (card) card.classList.toggle('flipped');
	};

	const handlePokedexClick = () => {
		setIsActive(true);
	};

	const playCry = () => {
		if (pokemon?.cries?.latest) {
			const cryAudio = new Audio(pokemon.cries.latest);
			cryAudio.play();
		}
	};

	const playMonologue = () => {
		if (pokemon?.name?.toLowerCase() === 'mewtwo') {
			const mewtwoAudio = new Audio('/images/monologo.mp4');
			mewtwoAudio.play();
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
					<PokemonForm setPokemonId={setPokemonId} generation={generation} />
				</div>

				<div className='pokedex-bottom'>
					<div class='controller-wrapper'>
						<div class='d-pad'>
							<button
								class='d-pad-button up'
								onClick={() => {
									setPokemonId((prevId) => prevId + 1);
								}}
							>
								▲
							</button>
							<button
								class='d-pad-button left'
								onClick={() => flipCard(pokemonID)}
							>
								◄
							</button>
							<button class='d-pad-button center'></button>
							<button
								class='d-pad-button right'
								onClick={() => flipCard(pokemonID)}
							>
								►
							</button>
							<button
								class='d-pad-button down'
								onClick={() => {
									setPokemonId((prevId) => prevId - 1);
								}}
							>
								▼
							</button>
						</div>
					</div>

					<div className='cry-button-container'>
						<button className='cry-button' onClick={playCry}>
							<FaVolumeUp color='black' />
						</button>

						{(pokemon?.id === 150 ||
							pokemon?.name?.toLowerCase() === 'mewtwo') && (
							<button className='cry-button2' onClick={playMonologue}>
								<FaVolumeUp color='black' />
							</button>
						)}
						{/* easter egg */}
					</div>
				</div>
			</div>
			<div className='pokedex-right-front' />
			<div className='pokedex-right-back' />
		</div>
	);
};

export default Pokedex;
