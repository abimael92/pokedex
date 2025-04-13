import { Pokemon, Generation } from '../types/pokemon';

export const isGeneration = (value: string): value is Generation => {
  return ['1', '2', '3', '4', '5', '6', '7', '8'].includes(value);
};

export const isPokemon = (data: unknown): data is Pokemon => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'sprites' in data
  );
};