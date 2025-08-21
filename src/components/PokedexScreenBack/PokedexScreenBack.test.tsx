import { render, screen } from '@testing-library/react';
import PokedexScreenBack from './PokedexScreenBack';
import { Pokemon } from '../../types/pokemon';

// ✅ Mock @assets/icons
jest.mock('@assets/icons', () => ({
  fire: '/mock/fire.png',
  water: '/mock/water.png',
  grass: '/mock/grass.png',
}));

// ✅ Mock hook
jest.mock('../../hooks/usePokemonTypeEffectiveness', () => ({
  usePokemonTypeEffectiveness: jest.fn().mockReturnValue({
    strengths: ['Fire'],
    weaknesses: ['Water'],
    loading: false,
    error: false,
  }),
}));

const mockPokemon: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    base_experience: 64,
    height: 7,
    weight: 69,
    cries: { latest: '/audio/bulbasaur-cry.mp3', legacy: '/audio/bulbasaur-cry.ogg' },
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      sprites: {
      front_default: '/mock/bulbasaur.png',
      front_shiny: '/mock/bulbasaur-shiny.png',
      other: {
        'official-artwork': {
          front_default: '/mock/bulbasaur.png',
          front_shiny: '/mock/bulbasaur-shiny.png',
        },
        dream_world: {
          front_default: '/mock/bulbasaur-dream.png',
        },
      },
    },
    stats: [
      { base_stat: 45, stat: { name: 'hp', url: '' } },
      { base_stat: 49, stat: { name: 'attack', url: '' } },
    ],
    types: [{ slot: 1, type: { name: 'grass', url: '' } }],
    abilities: [
        { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
        { ability: { name: 'chlorophyll', url: '' }, is_hidden: true, slot: 3 },
      ],
  };
  

describe('PokedexScreenBack', () => {
  it('renders pokemon name and stats', () => {
    render(
      <PokedexScreenBack
        pokemon={mockPokemon}
        loading={false}
        error={false}
        stats={mockPokemon.stats}
        isShiny={false}
        isFemale={false}
        onToggleGender={() => {}}
      />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
  });

  it('shows mocked icons in strengths/weaknesses', () => {
    render(
      <PokedexScreenBack
        pokemon={mockPokemon}
        loading={false}
        error={false}
        stats={mockPokemon.stats}
        isShiny={false}
        isFemale={false}
        onToggleGender={() => {}}
      />
    );

    expect(screen.getByAltText('Fire icon')).toHaveAttribute('src', '/mock/fire.png');
    expect(screen.getByAltText('Water icon')).toHaveAttribute('src', '/mock/water.png');
  });
});
