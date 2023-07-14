import React, { useState } from "react";
import "./PokemonForm.css";

function PokemonForm({ setPokemonId, setLoading, setError }) {
	const [pokemon, setPokemon] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (pokemon !== "") {
			setError(true);
			setLoading(true);
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
				);
				const data = await response.json();
				const pokemonID = data.id;
				setPokemonId(pokemonID);
				setPokemon("");
			} catch (error) {
				console.log(error);
				setError(true);
				setLoading(false);
			}
		} else {
			setError(true);
		}
	};
	return (
		<form className="pokemon-form" onSubmit={handleSubmit}>
			<input
				className="pokemon-input"
				type="text"
				name="pokemon"
				value={pokemon}
				placeholder="Search..."
				//Actualizas el valor del input cuando el usuario teclea
				onChange={(e) => setPokemon(e.target.value)}
				autoComplete="off"
			/>
			<input type="submit" className="pokemon-btn" value="" />
		</form>
	);
}

export default PokemonForm;
