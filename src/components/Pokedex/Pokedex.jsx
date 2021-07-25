import React, { useState, useEffect } from 'react';
import FrontScreen from '../PokedexScreenFront/PokedexScreenFront';
import BackScreen from '../PokedexScreenBack/PokedexScreenBack';
import PokemonForm from '../PokemonForm/PokemonForm';
import './Pokedex.css';
import PokemonEvolveUp from '../PokemonEvolution/PokemonEvolveUp';



function Pokedex(){
  
  const [ error, setError ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ pokemon, setPokemon ] = useState(null)
  const RandomId = Math.floor(Math.random() * 151 + 1);
  // const RandomId = Math.floor(Math.random() * 806 + 1)

  const [ pokemonID, setPokemonId ] = useState(RandomId);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
        setLoading(false)
        setError(false)
      })
      .catch(err => {
        setLoading(false)
        setError(true)
        console.log(err);
      })
  }, [pokemonID])

  function flipCard(cardID) {
    const card = document.getElementById(`${cardID}`);
    card.classList.toggle("flipped");
  }

    return (
      <div className="pokedex">
        <div className="pokedex-left">
          <div className="pokedex-left-top">
          <div className={`light is-sky is-big pulseBox ${loading && 'is-animated'}`}  />
            <div className="light is-red" />
            <div className="light is-yellow" />
            <div className="light is-green" />
          </div>
          <div className="pokedex-screen-container" id={pokemonID} onClick={() => flipCard(pokemonID)}>
          <FrontScreen pokemon={pokemon} loading={loading} error={error}/>
          <BackScreen pokemon={pokemon} loading={loading} error={error} stats={pokemon}/>
          </div>
          <div className="pokedex-left-bottom">
          <PokemonForm setPokemonId={setPokemonId} setLoading={setLoading} setError={setError}/>
          </div>
            <div className="pokedex-left-bottom-lights">
              <div className="light is-blue is-medium" />
              <PokemonEvolveUp pokemonID={pokemonID}/>
              <div className="btn is-medium" onClick={() => setPokemonId(pokemonID - 1)}>-</div>
              <div className="btn is-medium" onClick={() => setPokemonId(pokemonID + 1)}>+</div>
            </div>
            
        </div>
        {/* <div className="pokedex-right-front" /> */}
        {/* <div className="pokedex-right-back" /> */}
      </div>
    )
  }
  
  export default Pokedex