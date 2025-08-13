import React, { useState,useEffect } from 'react';
import { usePokemon } from '../../hooks/usePokemon';
import { usePokemonAudio } from '../../hooks/usePokemonAudio';
import { useAlternateForms } from '../../hooks/useAlternateForms';  
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
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const [isFemale, setIsFemale] = useState<boolean>(false);
    const [previousPokemonId, setPreviousPokemonId] = useState<number | null>(null);  
    const [previousForm, setPreviousForm] = useState<string | null>(null); 

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

    const { forms, fetchForms } = useAlternateForms();

    useEffect(() => {
        if (pokemonID && generation) {
            const generationNumber = Number(generation);  // Convert generation to a number
            if (!isNaN(generationNumber)) {
                fetchForms(pokemonID, generationNumber); // Pass the numeric generation
            } else {
                console.warn('Invalid generation value');
            }
        }
    }, [pokemonID, generation, fetchForms]);


    // useEffect(() => {
    //     if (pokemonID) {
    //         console.log('Fetching forms for Pokémon ID:', pokemonID);

    //     }
    //     if (pokemonID === previousPokemonId ){
    //         setPreviousForm(null);
    //         setPreviousPokemonId(null);
    //     }

    
    // }, [forms,pokemonID]);
    

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };


    const handlePokedexClick = () => setIsActive(true);
    const handleToggleGender = () => setIsFemale((prev) => !prev);

    const handleSelectForm = (formUrl: string, formName: string) => {
        if (previousForm === null && previousPokemonId === null) {
            setPreviousForm(formName);
            setPreviousPokemonId(pokemonID);
            setPokemonId(Number(formUrl.split('/').at(-2)));
        }

    };

    const handleRevertForm = () => {
            setPokemonId(previousPokemonId);
            setPreviousForm(null);
            setPreviousPokemonId(null);
    };

    return (
        <PokedexShell 
            isActive={isActive}
            onClick={handlePokedexClick}
            onClose={() => flipCard(pokemonID, true)}
            pokemonID={pokemonID}
            pokemon={pokemon} 
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
                <FrontScreen pokemon={pokemon} loading={loading} error={error} isShiny={isShiny} isFemale={isFemale}
                onToggleGender={handleToggleGender}/>

                    <BackScreen
                        pokemon={pokemon}
                        loading={loading}
                        error={error}
                        stats={pokemon?.stats || []} 
                        isShiny={isShiny}
                        isFemale={isFemale}
                        onToggleGender={handleToggleGender}
                        />
                </div>

                <div className='pokedex-left-bottom'>
                    <PokemonForm setPokemonId={setPokemonId} generation={generation} />
                </div>

                <div className='pokedex-bottom'>

                <div className='pokedex-bottom'>

                    <PokemonNavigation
                         onNext={() => {
                            setPreviousForm(null);
                            setPreviousPokemonId(null);
                            setPokemonId((prevId: number | null) => (prevId || 0) + 1);
                          }}
                          onPrevious={() => {
                            setPreviousForm(null);
                            setPreviousPokemonId(null);
                            setPokemonId((prevId: number | null) => (prevId || 1) - 1);
                          }}
                        onFlip={() => flipCard(pokemonID)}
                    />

                    {forms.length > 0 && !previousForm && (
                    <div className="form-buttons-container">
                        {forms.map((form: { name: string; url: string }, index: React.Key) => (
                        <div key={index} className="form-button-container">
                            <label className='forms-label'> {form.name.split('-').slice(1).join('-')}</label>
                            <button
                            onClick={() => handleSelectForm(form.url, form.name)}
                            className="form-button"
                            aria-label={`Select ${form.name}`}
                            style={{
                                backgroundColor: getRandomColor(),
                                borderColor: getRandomColor()
                            }}
                            />

                            {/* <label className="form-tooltip"> ${form.name}</label> */}

                            </div>
                        ))}
                    </div>
                    )}
{/* 
if (pokemonID !== previousPokemonId && previousPokemonId !== null && forms.length > 0) {
            setPreviousForm(null);
            setPreviousPokemonId(null);
          } */}

{(() => {

  console.log('--- Buttons Check ---');
  console.log('pokemonID:', pokemonID);

  console.log('forms.length:', forms.length);
  console.log('previousForm:', previousForm);
  console.log('previousPokemonId:', previousPokemonId);


  return null;
})()}


                 { previousForm && (
                    <button onClick={handleRevertForm} className="form-button"  style={{
                        backgroundColor: getRandomColor(),
                        borderColor: getRandomColor()
                    }}>
                    Revert Form
                </button>

                 )  }

                    </div>

                <div className="pokedex-controls-column">
                <CryButtons 
                    pokemon={pokemon}
                    onPlayCry={playCry}
                    onPlayMonologue={playMonologue}
                />

                <button
                    className={`shiny-toggle-button ${isShiny ? 'active' : 'inactive'}`}
                    onClick={() => setIsShiny(prev => !prev)}
                    title={isShiny ? "Disable Shiny" : "Enable Shiny"}
                >
                     <span 
                        role="img" 
                        aria-label={isShiny ? "shiny" : "not-shiny"}
                        className="shiny-icon"
                        >
                        ✨
                        {isShiny && <span className="cancel-line"></span>}
                        </span>
                    
                    {!isShiny ? "Shiny" : "Normal"}
                </button>
                </div>

                </div>
            </div>
       </PokedexShell>
    );
};

export default Pokedex;