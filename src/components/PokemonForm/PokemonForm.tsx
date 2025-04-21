import React, { useState } from 'react';
import { getRandomPokemonId } from '../../utils/pokemonGenerations';
import './PokemonForm.css';
import { Generation } from '../../types/pokemon';

interface PokemonFormProps {
	setPokemonId: (identifier: string | number | null | ((prev: number | null) => number | null)) => void;
	generation: Generation;
  }

const PokemonForm: React.FC<PokemonFormProps> = ({ setPokemonId, generation }) => {
  const [pokemonName, setPokemonName] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (pokemonName.trim() !== '') {
        setPokemonId(pokemonName.toLowerCase());
      } else {
        const randomId = getRandomPokemonId(generation);
        setPokemonId(randomId);
      }
      setPokemonName('');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form className='pokemon-form' onSubmit={handleSubmit}>
      <input
        className='pokemon-input'
        type='text'
        name='pokemon'
        value={pokemonName}
        placeholder='Search...'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPokemonName(e.target.value)}
        autoComplete='off'
      />
     <button type='submit' className='pokemon-btn'  ></button>
    </form>
  );
};

export default PokemonForm;