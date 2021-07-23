import React from 'react';
// import React, { useState, useEffect } from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
// import Stat from '../Stat/Stat';
import './PokedexScreen.css';

function PokedexScreen({ pokemon, loading, error }){

  // const [ evolution, setEvolution ] = useState(null)

  // if(pokemon){
  //   useEffect(() => {
  //     fetch(`https://pokeapi.co/api/v2/evolution-trigger${pokemon.id}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setEvolution(data)
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }, [evolution])

  // }

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
        { !pokemon || loading ? // Si no hay pokemon o si esta cargando
        <img
          src={LoadingPokemon}
          alt="Aun no hay ningun pokemon"
          className="pokedex-no-screen"
        /> :
      <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        {/* <ul className="pokemon-stats"> */}
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
        {/* </ul> */}
      </div>
}
    </div>
  )
}
export default PokedexScreen;