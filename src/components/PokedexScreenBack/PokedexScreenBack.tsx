import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import Stat from '../Stat/Stat';
import './PokedexScreenBack.css';
import { Pokemon } from '../../types/pokemon';
import { usePokemonTypeEffectiveness } from '../../hooks/usePokemonTypeEffectiveness';

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
  stats: Pokemon['stats'];
  isShiny: boolean;
  isFemale: boolean;
  onToggleGender: () => void;
}

const PokedexScreenBack: React.FC<PokedexScreenProps> = ({ 
  pokemon, 
  loading, 
  error, 
  stats,
  isShiny,
  isFemale
}) => {

  const {
    strengths,
    weaknesses,
    loading: typeLoading,
    error: typeError
  } = usePokemonTypeEffectiveness(pokemon?.name || '');

  if (error) {
    return (
      <div className="pokedex-screen-back">
        <img
          src={ErrorPokemon}
          alt="Hubo un error buscando tu pokemon"
          className="pokedex-no-screen"
        />
      </div>
    );
  }

  return (
    <div className="pokedex-screen-back">
      {!pokemon || loading ? (
        <img
          src={LoadingPokemon}
          alt="Aun no hay ningun pokemon"
          className="pokedex-no-screen"
        />
      ) : (
        <div>
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <div className="pokemon-info">
            <div className="pokemon-img-wrapper">
              <img
                className="pokemon-img"
                src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>

            <ul className="pokemon-stats">
              {pokemon.stats.map(item => (
                <Stat key={item.stat.name} item={item} />
              ))}
            </ul>
          </div>

          <div className="effectiveness-area">
            <div className="effectiveness-container">
            <h3 className="effectiveness-title">Strengths</h3>
              <div className="effectiveness-list">
              {typeLoading ? <p>Loading weaknesses...</p> : (
                <>
                {weaknesses.map(type => (
                  <div key={type} className="effectiveness-item" style={{
                    backgroundColor: colours[type.toLowerCase()] || 'white'
                  }}>{type}</div>
                ))}
                </>
              )}
              </div>
            </div>

            <div className="effectiveness-container">
              <h3 className="effectiveness-title">Weaknesses</h3>
              <div className="effectiveness-list">
              {typeLoading ? <p>Loading strengths...</p> : (
                <>
                {strengths.map(type => (
                  <div key={type} className="effectiveness-item" style={{
                    backgroundColor: colours[type.toLowerCase()] || 'white'
                  }}>{type}</div>
                ))}
                </>
              )}
              </div>
            </div>

        </div>


        </div>
      )}
    </div>
  );
};

export default PokedexScreenBack;
