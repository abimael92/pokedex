// src/types/pokemon.ts
export type Generation = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type Stat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny?: string;
      };
      dream_world?: {
        front_default: string;
      };
    };
  };
  cries: {
    latest: string;
    legacy?: string;
  };
  stats: Stat[];
  types: PokemonType[];
  abilities: Ability[];
  species: {
    name: string;
    url: string;
  };
  moves?: {
    move: {
      name: string;
      url: string;
    };
  }[];
}