import React from 'react';
// import React, { useState, useEffect } from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import Stat from '../Stat/Stat';
import './PokedexScreenBack.css';

function PokedexScreen({ pokemon, loading, error, stats }){

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
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        <ul className="pokemon-stats"> 
        {pokemon.stats.map(item => <Stat key={item.stat.name} item={item}/>)}
        </ul>
      </div>
      </div>
}
    </div>
  )
}
export default PokedexScreen;