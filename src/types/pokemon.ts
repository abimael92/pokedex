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

interface AbilityEffectEntry {
  short_effect: string;
  language: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
  effect_entries?: AbilityEffectEntry[]; // Add effect_entries as an optional property
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female?: string | null;
  front_shiny_female?: string | null;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny?: string;
    };
    dream_world?: {
      front_default: string;
    };
  };
}




export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites
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