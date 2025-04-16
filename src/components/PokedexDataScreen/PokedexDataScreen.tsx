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

  console.log('Pokemon is:', pokemon );
  const { description, loading: formsLoading, error: formsError } = usePokemonForms(pokemon?.id || 0);
  const { evolutionInfo, loading: evoLoading, error: evoError } = usePokemonEvolution(pokemon?.species?.url);


  console.log('Pokemon Description:', description);
  console.log('Pokemon Description:', evolutionInfo);

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
      <h2 className='pokemon-description-title'> Description: </h2>
      <p className='pokemon-description-text'>
        {description || 'No description available.'}
      </p>
      {evoLoading && <p>Loading evolution data...</p>}
    {evoError && <p>Failed to load evolution info.</p>}

    {!evoLoading && evolutionInfo?.evolutionChain && (
  <>
    <h2 className='pokemon-description-title'>Evolution Chart:</h2>
    <ul className='pokemon-description-text'>
      {evolutionInfo.evolutionChain.map((step, index) => (
        <li key={index}>
          <h4>{step.species}</h4>
          {step.minLevel && `(Level: ${step.minLevel})`}
          {!step.minLevel && step.trigger && (
            ` – (${step.trigger === 'use-item'
              ? `Use Item: ${step.item ?? 'Unknown'}`
              : step.trigger === 'trade'
              ? `Must trade${step.item ? ` while holding ${step.item}` : ''}`
              : step.trigger})`
          )}

          {/* Handle branching evolutions */}
          {Array.isArray(step.evolvesTo) && step.evolvesTo.length > 0 && (
            <div style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
              <strong>Evolves to:</strong>
              <ul>
                {step.evolvesTo.map((subStep, subIndex) => (
                  <li key={subIndex}>
                    <h4>{subStep.species}</h4>
                    {subStep.minLevel && `(Level: ${subStep.minLevel})`}
                    {!subStep.minLevel && subStep.trigger && (
                      ` – (${subStep.trigger === 'use-item'
                        ? `Use Item: ${subStep.item ?? 'Unknown'}`
                        : subStep.trigger === 'trade'
                        ? `Must trade${subStep.item ? ` while holding ${subStep.item}` : ''}`
                        : subStep.trigger})`
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
    {evolutionInfo.evolvesFrom && (
      <p className='pokemon-description-text'>
        Evolves from: <strong>{evolutionInfo.evolvesFrom}</strong>
      </p>
    )}
  </>
)}


    </div>
  );
};

export default PokedexDataScreen;
