import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import { usePokemon } from '../../hooks/usePokemon';
import GenerationSelect from '../GenerationSelect/GenerationSelect';
import PokemonNavigation from '../PokemonNavigation/PokemonNavigation';
import StatusLights from '../StatusLights/StatusLights';
import CryButtons from '../CryButtons/CryButtons';
import { usePokemonAudio } from '../../hooks/usePokemonAudio';
import useFlipCard from '../../hooks/useFlipCard';
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
    const { flipCard } = useFlipCard();

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
					onClick={(e) => {
						e.stopPropagation();
						flipCard(pokemonID);
					}}
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
                    <PokemonNavigation
                        onNext={() => setPokemonId((prevId: number | null) => (prevId || 0) + 1)}
                        onPrevious={() => setPokemonId((prevId) => (prevId || 1) - 1)}
                        onFlip={() => flipCard(pokemonID)}
                    />

				<CryButtons 
					pokemon={pokemon}
					onPlayCry={playCry}
					onPlayMonologue={playMonologue}
				/>
                </div>
            </div>
				<div className='pokedex-right-front' >
				</div>
			<div
				className='pokedex-right-back'
				onClick={(e) => {
					e.stopPropagation();
					flipCard(pokemonID, true);
				}}
				role="button"
				aria-label="Close Pokemon card"
				tabIndex={0}
			/>
					<div className="close-icon"> this is a test</div>

        </div>
    );
};

export default Pokedex;