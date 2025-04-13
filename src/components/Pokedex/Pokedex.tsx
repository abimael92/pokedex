import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import { usePokemon } from '../../hooks/usePokemon';
import {  Generation } from '../../types/pokemon';
import './Pokedex.css';

const Pokedex: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const {
        pokemon,
        loading,
        error,
        pokemonID,
        generation,
        setPokemonId,
        setGeneration,
    } = usePokemon();

    const flipCard = (cardID: number | null): void => {
        if (!cardID) return;
        const card = document.getElementById(cardID.toString());
        if (card) card.classList.toggle('flipped');
    };

    const handlePokedexClick = (): void => {
        setIsActive(true);
    };

    const playCry = (): void => {
        if (pokemon?.cries?.latest) {
            const cryAudio = new Audio(pokemon.cries.latest);
            cryAudio.play().catch(e => console.error('Error playing cry:', e));
        }
    };

    const playMonologue = (): void => {
        if (pokemon?.name?.toLowerCase() === 'mewtwo') {
            const mewtwoAudio = new Audio('/images/monologo.mp4');
            mewtwoAudio.play().catch(e => console.error('Error playing monologue:', e));
        }
    };

    return (
        <div
            className={`pokedex ${isActive ? 'is-active' : ''}`}
            onClick={handlePokedexClick}
            role="button"
            tabIndex={0}
        >
            <div className='pokedex-left'>
                <div className='pokedex-left-top-row'>
                    <div className='pokedex-left-top-lights'>
                        <div
                            className={`light is-sky is-big pulseBox ${
                                loading ? 'is-animated' : ''
                            }`}
                            aria-busy={loading}
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
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								setGeneration(e.target.value as Generation);
							}}
							className='generation-select'
							aria-label="Select Pokemon generation"
						>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((gen) => (
								<option key={gen} value={gen.toString()}>
									Gen {gen}
								</option>
							))}
						</select>
                        </div>
                    )}
                </div>

                <div
                    className='pokedex-screen-container'
                    id={pokemonID?.toString()}
                    onClick={() => flipCard(pokemonID)}
                    role="button"
                    aria-label="Flip Pokemon card"
                >
                    <FrontScreen pokemon={pokemon} loading={loading} error={error} />
                    <BackScreen
                        pokemon={pokemon}
                        loading={loading}
                        error={error}
						stats={pokemon?.stats || []} 
                    />
                </div>
                
                <div className='pokedex-left-bottom'>
                    <PokemonForm setPokemonId={setPokemonId} generation={generation} />
                </div>

                <div className='pokedex-bottom'>
                    <div className='controller-wrapper'>
                        <div className='d-pad'>
                            <button
                                className='d-pad-button up'
								onClick={() => setPokemonId((prevId: number | null) => (prevId || 0) + 1)}
                                aria-label="Next Pokemon"
                            >
                                ▲
                            </button>
                            <button
                                className='d-pad-button left'
                                onClick={() => flipCard(pokemonID)}
                                aria-label="Flip card left"
                            >
                                ◄
                            </button>
                            <button className='d-pad-button center' aria-hidden="true" />
                            <button
                                className='d-pad-button right'
                                onClick={() => flipCard(pokemonID)}
                                aria-label="Flip card right"
                            >
                                ►
                            </button>
                            <button
                                className='d-pad-button down'
                                onClick={() => setPokemonId((prevId) => (prevId || 1) - 1)}
                                aria-label="Previous Pokemon"
                            >
                                ▼
                            </button>
                        </div>
                    </div>

                    <div className='cry-button-container'>
                        <button 
                            className='cry-button' 
                            onClick={playCry}
                            aria-label="Play Pokemon cry"
                            disabled={!pokemon?.cries?.latest}
                        >
                            <FaVolumeUp color='black' />
                        </button>

                        {(pokemon?.id === 150 || pokemon?.name?.toLowerCase() === 'mewtwo') && (
                            <button 
                                className='cry-button2' 
                                onClick={playMonologue}
                                aria-label="Play Mewtwo monologue"
                            >
                                <FaVolumeUp color='black' />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='pokedex-right-front' />
            <div className='pokedex-right-back' />
        </div>
    );
};

export default Pokedex;