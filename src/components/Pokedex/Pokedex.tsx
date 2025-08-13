import React, { useState, useEffect, useCallback } from 'react';
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

import { getRandomColor } from '@utils/colors'; 

import './Pokedex.css';

const Pokedex: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [previousPokemonId, setPreviousPokemonId] = useState<number | null>(null);
  const [previousForm, setPreviousForm] = useState<string | null>(null);

  const { pokemon, loading, error, pokemonID, generation, setPokemonId, setGeneration } = usePokemon();
  const { playCry, playMonologue } = usePokemonAudio();
  const { flipCard } = useFlipCard();
  const { forms, fetchForms } = useAlternateForms();

  /** Fetch forms when pokemonID or generation changes */
  useEffect(() => {
    if (pokemonID && generation) {
      const genNum = Number(generation);
      if (!isNaN(genNum)) fetchForms(pokemonID, genNum);
    }
  }, [pokemonID, generation, fetchForms]);

  /** Handlers */
  const handlePokedexClick = () => setIsActive(true);
  const handleToggleGender = () => setIsFemale(prev => !prev);
  const handleToggleShiny = () => setIsShiny(prev => !prev);

  const handleSelectForm = useCallback((formUrl: string, formName: string) => {
    if (!previousForm && !previousPokemonId) {
      setPreviousForm(formName);
      setPreviousPokemonId(pokemonID);
      setPokemonId(Number(formUrl.split('/').at(-2)));
    }
  }, [previousForm, previousPokemonId, pokemonID, setPokemonId]);

  const handleRevertForm = () => {
    setPokemonId(previousPokemonId);
    setPreviousForm(null);
    setPreviousPokemonId(null);
  };

  const handleNextPokemon = () => {
    setPreviousForm(null);
    setPreviousPokemonId(null);
    setPokemonId(prevId => (prevId || 0) + 1);
  };

  const handlePreviousPokemon = () => {
    setPreviousForm(null);
    setPreviousPokemonId(null);
    setPokemonId(prevId => (prevId || 1) - 1);
  };

  return (
    <PokedexShell
      isActive={isActive}
      onClick={handlePokedexClick}
      onClose={() => flipCard(pokemonID, true)}
      pokemonID={pokemonID}
      pokemon={pokemon}
    >
      <div className="pokedex-left">
        {/* Top row */}
        <div className="pokedex-left-top-row">
          <StatusLights loading={loading} />
          {isActive && <GenerationSelect generation={generation} setGeneration={setGeneration} />}
        </div>

        {/* Main screen */}
        <div
          className="pokedex-screen-container"
          id={pokemonID?.toString()}
          onClick={(e) => { e.stopPropagation(); flipCard(pokemonID); }}
          role="button"
          aria-label="Flip Pokemon card"
        >
          <FrontScreen
            pokemon={pokemon}
            loading={loading}
            error={error}
            isShiny={isShiny}
            isFemale={isFemale}
            onToggleGender={handleToggleGender}
          />
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

        {/* Bottom row */}
        <div className="pokedex-left-bottom">
          <PokemonForm setPokemonId={setPokemonId} generation={generation} />
        </div>

        <div className="pokedex-bottom">
          <PokemonNavigation
            onNext={handleNextPokemon}
            onPrevious={handlePreviousPokemon}
            onFlip={() => flipCard(pokemonID)}
          />

          {forms.length > 0 && !previousForm && (
            <div className="form-buttons-container">
              {forms.map((form, index) => (
                <div key={index} className="form-button-container">
                  <label className="forms-label">
                    {form.name.split('-').slice(1).join('-')}
                  </label>
                  <button
                    onClick={() => handleSelectForm(form.url, form.name)}
                    className="form-button"
                    aria-label={`Select ${form.name}`}
                    style={{
                      backgroundColor: getRandomColor(),
                      borderColor: getRandomColor(),
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {previousForm && (
            <button
              onClick={handleRevertForm}
              className="form-button"
              style={{
                backgroundColor: getRandomColor(),
                borderColor: getRandomColor(),
              }}
            >
              Revert Form
            </button>
          )}

          <div className="pokedex-controls-column">
            <CryButtons
              pokemon={pokemon}
              onPlayCry={playCry}
              onPlayMonologue={playMonologue}
            />
            <button
              className={`shiny-toggle-button ${isShiny ? 'active' : 'inactive'}`}
              onClick={handleToggleShiny}
              title={isShiny ? 'Disable Shiny' : 'Enable Shiny'}
            >
              <span
                role="img"
                aria-label={isShiny ? 'shiny' : 'not-shiny'}
                className="shiny-icon"
              >
                ✨
                {isShiny && <span className="cancel-line"></span>}
              </span>
              {!isShiny ? 'Shiny' : 'Normal'}
            </button>
          </div>
        </div>
      </div>
    </PokedexShell>
  );
};

export default Pokedex;
