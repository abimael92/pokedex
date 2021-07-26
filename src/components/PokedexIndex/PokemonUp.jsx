import React from 'react';
// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pokedex/Pokedex.css';

function PokemonEvolveUp({ pokemonID }) {

    const getPokemonUp = async () => {

        try {
            const pokeApiSpecies = `https://pokeapi.co/api/v2/pokedex/1/`;
            const res = await axios.get(pokeApiSpecies);

            let pokemon_entries = res.data.pokemon_entries
            let pokeId = (pokemonID);
            let pokemonUp = pokemon_entries[pokeId].pokemon_species.name;
            console.log(pokemonUp);

        } catch (e) {
            console.log(e);
        }
    }

    const getPokemonDown = async () => {

        try {
            const pokeApiSpecies = `https://pokeapi.co/api/v2/pokedex/1/`;
            const res = await axios.get(pokeApiSpecies);

            let pokemon_entries = res.data.pokemon_entries
            let pokeId = (pokemonID-2);
            let pokemonUp = pokemon_entries[pokeId].pokemon_species.name;
            console.log(pokemonUp);

        } catch (e) {
            console.log(e);
        }
    }

    return (

        <div>
            <button className="btn is-medium" onClick={() => getPokemonDown()}> ᐊ </button>
            <button className="btn is-medium" onClick={() => getPokemonUp()}> ᐅ </button>
        </div>
    )

}
export default PokemonEvolveUp;