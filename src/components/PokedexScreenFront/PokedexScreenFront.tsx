import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexScreenFront.css';
import { Pokemon } from '../../types/pokemon';

interface TypeColors {
  [key: string]: string;
  normal: string;
  fire: string;
  water: string;
  electric: string;
  grass: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
}

const colours: TypeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

interface PokedexScreenProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: boolean;
}

const PokedexScreenFront: React.FC<PokedexScreenProps> = ({ 
  pokemon, 
  loading, 
  error 
}) => {
  if (error) {
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

  if (loading) {
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

  if (!pokemon) {
    return (
      <div className='pokedex-screen'>
        <img
          src={LoadingPokemon}
          alt='No Pokemon selected'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  return (
    <div className='pokedex-screen'>
      <h2 className='pokemon-name'>{pokemon.name}</h2>
      <div className='pokemon-info'>
        <img
          className='pokemon-img'
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        <ul className='pokemon-stats'>
          <div className='divTable'>
            <div className='divTableBody'>
              <div className='divTableRow'>
                <div className='divTableCell'>Type</div>
                {pokemon.types.map((types) => (
                  <div
                    className='divTableCellType'
                    key={types.type.name}
                    style={{
                      backgroundColor: colours[types.type.name.toLowerCase()] || 'white'
                    }}
                  >
                    {types.type.name}
                  </div>
                ))}
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Height</div>
                <div className='divTableCell'>
                  {Math.round(pokemon.height * 3.9)}"
                </div>
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Weight</div>
                <div className='divTableCell'>
                  {Math.round(pokemon.weight / 4.3)} lbs
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PokedexScreenFront;