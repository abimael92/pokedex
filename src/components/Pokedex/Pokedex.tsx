import React, { useState } from 'react';
import { usePokemon } from '../../hooks/usePokemon';
import { usePokemonAudio } from '../../hooks/usePokemonAudio';
import useFlipCard from '../../hooks/useFlipCard';
import PokedexShell from '../PokedexShell/PokedexShell';
import StatusLights from '../StatusLights/StatusLights';
import GenerationSelect from '../GenerationSelect/GenerationSelect';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import PokemonNavigation from '../PokemonNavigation/PokemonNavigation';
import CryButtons from '../CryButtons/CryButtons';
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

    const { playCry, playMonologue } = usePokemonAudio();
    const { flipCard } = useFlipCard();

    const handlePokedexClick = (): void => {
        setIsActive(true);
    };

    return (
        <PokedexShell 
            isActive={isActive}
            onClick={handlePokedexClick}
            onClose={() => flipCard(pokemonID, true)}
            pokemonID={pokemonID}
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
        </PokedexShell>
    );
};

export default Pokedex;