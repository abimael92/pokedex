export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    cries: {
      latest: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    types: {
      type: {
        name: string;
      };
    }[];
    height: number;
    weight: number;
    abilities: {
      ability: {
        name: string;
      };
    }[];
  }

  export type Generation = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';