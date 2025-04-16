import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexDataScreen.css';
import { Pokemon } from '../../types/pokemon';
import { usePokemonForms } from '../../hooks/usePokemonForms';

interface PokedexScreenProps {
  pokemon: Pokemon | null;
}

const PokedexDataScreen: React.FC<PokedexScreenProps> = ({ pokemon }) => {

  console.log('Pokemon pokemon?.id :', pokemon?.id );
  const { description, loading: formsLoading, error: formsError } = usePokemonForms(pokemon?.id || 0);

  console.log('Pokemon Description:', description);

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
    </div>
  );
};

export default PokedexDataScreen;
