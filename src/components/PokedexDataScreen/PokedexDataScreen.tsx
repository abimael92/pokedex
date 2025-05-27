import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexDataScreen.css';
import { Pokemon } from '../../types/pokemon';
import { usePokemonForms } from '../../hooks/usePokemonForms';
import { usePokemonEvolution } from '../../hooks/usePokemonEvolution';

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

  return (
    <div className='pokedex-description-screen'>
      <h3 className='pokemon-description-title'>Description:</h3>
      <div className="pokemon-description-text-container">
      <p className='pokemon-description-text'>
        {description || 'No description available.'}
      </p>
    </div>

  
      {/* Evolution Section */}
      {evoLoading && <p>Loading evolution data...</p>}
      {evoError && <p>Failed to load evolution info.</p>}
  
      {!evoLoading && evolutionInfo?.evolutionChain && evolutionInfo.evolutionChain.length > 0 && (
        <>
          <h3 className='pokemon-description-title'>Evolution Chart:</h3>
          <div className='evolution-container'>
            {evolutionInfo.evolutionChain.reduce((rows: JSX.Element[][], step, index, array) => {
              // Start new row every 3 steps
              if (index % 3 === 0) rows.push([]);
              
              // Add current step to last row
              rows[rows.length - 1].push(
                <div key={index} className="evolution-step">
                  <div className="evolution-stage">
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

                  {/* Only show arrow if not last in row AND not last in chain */}
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
            }, []).map((row, rowIndex) => (
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