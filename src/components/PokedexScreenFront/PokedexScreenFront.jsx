import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexScreenFront.css';

function PokedexScreen({ pokemon, loading, error }){

    if(error){
        return (
          <div className="pokedex-screen">
            <img
              src={ErrorPokemon}
              alt="Hubo un error buscando tu pokemon"
              className="pokedex-no-screen"
            />
          </div>
        )
      }

  return (
    <div className="pokedex-screen">
        { !pokemon || loading ? 
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
        {/* {pokemon.stats.map(item => <Stat key={item.stat.name} item={item}/>)} */}
        <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  {pokemon.types.map(types => 
                  <div className="divTableCell" key={types.type.name}> {types.type.name}</div>)}
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">{Math.round(pokemon.height * 3.9)} "</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">{Math.round(pokemon.weight / 4.3)} lbs</div>
                </div>
              </div>
        </div>
        </ul>
        </div>
        </div>
}
    </div>
  )
}
export default PokedexScreen;