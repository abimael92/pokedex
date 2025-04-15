import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import { usePokemon } from '../../hooks/usePokemon';
import GenerationSelect from '../GenerationSelect/GenerationSelect';
import PokemonNavigation from '../PokemonNavigation/PokemonNavigation';
import StatusLights from '../StatusLights/StatusLights';

import { usePokemonAudio } from '../../hooks/usePokemonAudio';
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

	const { audioError, playCry, playMonologue } = usePokemonAudio();

    const flipCard = (cardID: number | null): void => {
        if (!cardID) return;
        const card = document.getElementById(cardID.toString());
        if (card) card.classList.toggle('flipped');
    };

    const handlePokedexClick = (): void => {
        setIsActive(true);
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
				<StatusLights loading={loading} />

					{isActive && (
						<GenerationSelect 
							generation={generation} 
							setGeneration={setGeneration} 
						/>
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
<PokemonNavigation
    onNext={() => setPokemonId((prevId: number | null) => (prevId || 0) + 1)}
    onPrevious={() => setPokemonId((prevId) => (prevId || 1) - 1)}
    onFlip={() => flipCard(pokemonID)}
/>
                    </div>

                    <div className='cry-button-container'>
                        <button 
                            className='cry-button' 
							onClick={() => playCry(pokemon)}
                            aria-label="Play Pokemon cry"
                            disabled={!pokemon?.cries?.latest}
                        >
                            <FaVolumeUp color='black' />
                        </button>

                        {(pokemon?.id === 150 || pokemon?.name?.toLowerCase() === 'mewtwo') && (
                            <button 
                                className='cry-button2' 
								onClick={() => playMonologue(pokemon)}
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