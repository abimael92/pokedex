import React from 'react';
import './PokedexDataScreen.css';

import { Pokemon } from '../../types/pokemon';
import { usePokemonForms } from '../../hooks/usePokemonForms';
import { usePokemonEvolution } from '../../hooks/usePokemonEvolution';

const ErrorPokemon = '/images/status/error.gif';
const LoadingPokemon = '/images/status/loading.gif';

interface PokedexScreenProps {
  pokemon: Pokemon | null;
}

const PokedexDataScreen: React.FC<PokedexScreenProps> = ({ pokemon }) => {
  const { description, loading: formsLoading, error: formsError } = usePokemonForms(pokemon?.id || 0);
  const { evolutionInfo, loading: evoLoading, error: evoError } = usePokemonEvolution(pokemon?.species?.url);

  if (formsError) {
    return (
      <div className='pokedex-screen'>
        <img
          src={ErrorPokemon}
          alt='Error loading Pokemon'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  if (formsLoading || !pokemon) {
    return (
      <div className='pokedex-screen'>
        <img
          src={LoadingPokemon}
          alt='Loading Pokemon'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  const evolutionRows = evolutionInfo?.evolutionChain?.reduce((rows: JSX.Element[][], step, index, array) => {
    if (index % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(
      <div key={index} className="evolution-step">
        <div className="evolution-stage">
          {/* Add sprite image */}
          {step.sprite && (
            <img
              src={step.sprite}
              alt={step.species}
              className="evolution-sprite"
              onError={(e) => {
                e.currentTarget.src = '/images/default-sprite.png';
              }}
            />
          )}
          <h4 className="evolution-species">{step.species}</h4>
          {step.minLevel && (
            <span className="evolution-detail">(Level: {step.minLevel})</span>
          )}
          {!step.minLevel && step.trigger && (
            <span className="evolution-detail">
              {step.trigger === 'use-item'
                ? `(Use ${step.item ?? 'item'})`
                : step.trigger === 'trade'
                ? `(Trade${step.heldItem ? ` holding ${step.heldItem}` : ''})`
                : `(${step.trigger})`}
            </span>
          )}
        </div>
        {index % 3 !== 2 && index < array.length - 1 && (
          <div className="evolution-arrow">
            <img 
              src="/images/arrow.png" 
              alt="evolves to" 
              className="arrow-icon"
            />
          </div>
        )}
      </div>
    );
    return rows;
  }, []);

  return (
    <div className='pokedex-description-screen'>
      <h3 className='pokemon-description-title'>Description:</h3>
      <div className="pokemon-description-text-container">
        <p className='pokemon-description-text'>
          {description || 'No description available.'}
        </p>
      </div>

      {evoLoading && <p>Loading evolution data...</p>}
      {evoError && <p>Failed to load evolution info.</p>}

      {!evoLoading && evolutionRows && evolutionRows.length > 0 && (
        <>
          <h3 className='pokemon-description-title'>Evolution Chart:</h3>
          <div className='evolution-container'>
            {evolutionRows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="evolution-row">
                {row}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PokedexDataScreen;
