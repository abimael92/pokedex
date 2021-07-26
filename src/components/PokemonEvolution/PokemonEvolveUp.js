import React from 'react';
// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pokedex/Pokedex.css';

function PokemonEvolveUp({ pokemon, pokemonID }) {

    // let pokemonData = ({ Pokemon: pokemon, Evolutions: [] });

    const processedApi = async () => {

        try {
            const pokeApiSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;
            const res = await axios.get(pokeApiSpecies);

            return res.data.evolution_chain.url;

        } catch (e) {
            console.log(e);
        }
    }

    const getEvolution = async () => {

        try {
            const pokeApi = await processedApi();
            const res = await axios.get(pokeApi);

            // let evChain = res.data.chain.evolves_to[0];
            let firstEvol = res.data.chain.evolves_to;
            let sndEvol = res.data.chain.evolves_to[0].evolves_to;
            // console.log(res.data.chain.evolves_to[0].evolves_to[0].species.name);
            let evolutionChain = [];

            // do {
            if (firstEvol.length > 0) {

                for (let i = 0; i < firstEvol.length; i++) {

                    let evolutionPoke = firstEvol[i].species.name;
                    evolutionChain.push({ "first_Evolution": evolutionPoke });
                }
            }

            if (sndEvol.length > 0) {

                for (let i = 0; i < sndEvol.length; i++) {

                    let evolutionPoke = sndEvol[i].species.name;
                    evolutionChain.push({ "second_Evolution": evolutionPoke });
                }
            }

            console.log(evolutionChain);

        } catch (e) {
            console.log("error: ", e);
        }
    }

    const getPreEvolution = async () => {
        try {
            const pokeApi = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;
            const res = await axios.get(pokeApi);

            let preEvol = res.data.evolves_from_species;
            if (preEvol !== null) {
                let pokemonName = (preEvol.name);
                // pokemon(preEvol.name);
                console.log(pokemonName);
            } else {
                console.log(`${res.data.name} does not have a previous evolution`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {<button className="btn is-medium" onClick={() => getEvolution()}> ▲ </button>}
            {<button className="btn is-medium" onClick={() => getPreEvolution()}> ▼ </button>}
            {/* <button className="btn is-medium" onClick={() => setPokemonId(pokemonName)}> ▼ </button> */}
        </div>
    )

}
export default PokemonEvolveUp;





// let evoChain = [];
// let evoData = chain.chain;

// do {
//   let numberOfEvolutions = evoData['evolves_to'].length;  


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
