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
  // console.log('Pokemon is:', pokemon);
  const { description, loading: formsLoading, error: formsError } = usePokemonForms(pokemon?.id || 0);
  const { evolutionInfo, loading: evoLoading, error: evoError } = usePokemonEvolution(pokemon?.species?.url);

  console.log('Pokemon Evolution Info:', evolutionInfo);

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
      <h2 className='pokemon-description-title'>Description:</h2>
      <p className='pokemon-description-text'>
        {description || 'No description available.'}
      </p>
  
      {/* Evolution Section */}
      {evoLoading && <p>Loading evolution data...</p>}
      {evoError && <p>Failed to load evolution info.</p>}
  
      {!evoLoading && evolutionInfo?.evolutionChain && (
        <>
          <h2 className='pokemon-description-title'>Evolution Chart:</h2>
          <div className='evolution-chain'>
            {evolutionInfo.evolutionChain.map((step, index, array) => (
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
  
                {index < array.length - 1 && (
                  <div className="evolution-arrow">
                    <img 
                      src="/images/arrow.png" 
                      alt="evolves to" 
                      className="arrow-icon"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default PokedexDataScreen;
