import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import Stat from '../Stat/Stat';
import './PokedexScreenBack.css';
import { Pokemon } from '../../types/pokemon';

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

    if(error){
        return (
          <div className="pokedex-screen-back">
            <img
              src={ErrorPokemon}
              alt="Hubo un error buscando tu pokemon"
              className="pokedex-no-screen"
            />
          </div>
        )
      }

  return (
    <div className="pokedex-screen-back">
        { !pokemon || loading ? // Si no hay pokemon o si esta cargando
        <img
          src={LoadingPokemon}
          alt="Aun no hay ningun pokemon"
          className="pokedex-no-screen"
        /> :
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
        {pokemon.stats.map(item => <Stat key={item.stat.name} item={item}/>)}
        </ul>
      </div>
      </div>
}
    </div>
  )
}
export default PokedexScreenBack;