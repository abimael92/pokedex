import React, { useState, useEffect } from 'react';
import '../Pokedex/Pokedex.css';

function PokemonEvolveUp({ pokemonID }) {

    const [pokemon, setPokemon] = useState('');
    // const [pokemonID, setPokemonId] = useState();
    // console.log(pokemonID);
    var pokemonName = '';

    // const [pokemon, setPokemon] = useState();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.evolution_chain.url);

                let preEvol = data.evolves_from_species;

                // console.log(chain.evolves_to[0].species.name);

                if (preEvol !== null) {
                    pokemonName = (preEvol.name);
                    // pokemon(preEvol.name);
                    console.log(pokemonName);
                } else {
                    // setPokemon('');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);




    return (
        <div>
            {<button className="btn is-medium"> ▼ </button>}
            {/* <button className="btn is-medium" onClick={() => setPokemonId(pokemonName)}> ▼ </button> */}
        </div>
    )
}
export default PokemonEvolveUp;

   // const checkEvolution = e => {
    //     e.preventDefault()
    //     if(pokemonName !== ''){

    //         const pokemonID = window.isNaN(Number(pokemonName)) ? pokemonName.toLowerCase() : pokemonName
    //         setPokemonId(pokemonID)
    //         setPokemon('')
    //         return
    //       } 
    //     }

// let evoChain = [];
// let evoData = chain.chain;

// do {
//   let numberOfEvolutions = evoData['evolves_to'].length;  

//   evoChain.push({
//     "species_name": evoData .species.name,
//     "min_level": !evoData ? 1 : evoData .min_level,
//     "trigger_name": !evoData ? null : evoData .trigger.name,
//     "item": !evoData ? null : evoData .item
//   });

//   if(numberOfEvolutions > 1) {
//     for (let i = 1;i < numberOfEvolutions; i++) { 
//       evoChain.push({
//         "species_name": evoData.evolves_to[i].species.name,
//         "min_level": !evoData.evolves_to[i]? 1 : evoData.evolves_to[i].min_level,
//         "trigger_name": !evoData.evolves_to[i]? null : evoData.evolves_to[i].trigger.name,
//         "item": !evoData.evolves_to[i]? null : evoData.evolves_to[i].item
//      });
//     }
//   }        

//   evoData = evoData['evolves_to'][0];

// } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

// return evoChain;

// useEffect(() => {
//     fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonID}`)
//       .then(res => res.json())
//       .then(data => {
//         setPokemon(data)
//         setLoading(false)
//         setError(false)
//       })
//       .catch(err => {
//         setLoading(false)
//         setError(true)
//         console.log(err);
//       })
//   }, [pokemonID])