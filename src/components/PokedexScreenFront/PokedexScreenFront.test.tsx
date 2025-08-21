import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokedexScreenFront from './PokedexScreenFront';
import { Pokemon } from '../../types/pokemon';

// Mock the custom hook
jest.mock('../../hooks/useAbilityEffects', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    overgrow: 'Boosts Grass moves',
    chlorophyll: 'Doubles Speed in Sun',
  })),
}));

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  cries: { latest: '/audio/bulbasaur.mp3', legacy: '/audio/bulbasaur.ogg' },
  species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
  sprites: {
    front_default: '/mock/bulbasaur.png',
    front_shiny: '/mock/bulbasaur-shiny.png',
    front_female: '/mock/bulbasaur-female.png',
    front_shiny_female: '/mock/bulbasaur-shiny-female.png',
    other: {
      'official-artwork': { front_default: '', front_shiny: '' },
      dream_world: { front_default: '' },
    },
  },
  stats: [
    { base_stat: 45, stat: { name: 'hp', url: '' } },
    { base_stat: 49, stat: { name: 'attack', url: '' } },
  ],
  types: [
    { slot: 1, type: { name: 'grass', url: '' } },
    { slot: 2, type: { name: 'poison', url: '' } },
  ],
  abilities: [
    { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
    { ability: { name: 'chlorophyll', url: '' }, is_hidden: true, slot: 3 },
  ],
};

describe('PokedexScreenFront', () => {
  it('renders loading state', () => {
    render(<PokedexScreenFront pokemon={null} loading={true} error={false} isShiny={false} isFemale={false} onToggleGender={() => {}} />);
    expect(screen.getByAltText(/Loading Pokemon/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<PokedexScreenFront pokemon={null} loading={false} error={true} isShiny={false} isFemale={false} onToggleGender={() => {}} />);
    expect(screen.getByAltText(/Error loading Pokemon/i)).toBeInTheDocument();
  });

  it('renders pokemon info and types', () => {
    render(<PokedexScreenFront pokemon={mockPokemon} loading={false} error={false} isShiny={false} isFemale={false} onToggleGender={() => {}} />);
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
    expect(screen.getByText(/Height/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight/i)).toBeInTheDocument();
  });

  it('renders abilities with hidden ability tooltip', () => {
    render(<PokedexScreenFront pokemon={mockPokemon} loading={false} error={false} isShiny={false} isFemale={false} onToggleGender={() => {}} />);
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
    const hiddenAbility = screen.getByText(/Hidden Ability:/i);
    expect(hiddenAbility).toBeInTheDocument();
  });

  it('toggles gender when button clicked', () => {
    const onToggleGender = jest.fn();
    render(<PokedexScreenFront pokemon={mockPokemon} loading={false} error={false} isShiny={false} isFemale={false} onToggleGender={onToggleGender} />);
    const button = screen.getByTitle(/Switch to female/i);
    fireEvent.click(button);
    expect(onToggleGender).toHaveBeenCalled();
  });

  it('renders shiny sprite if isShiny is true', () => {
    render(<PokedexScreenFront pokemon={mockPokemon} loading={false} error={false} isShiny={true} isFemale={false} onToggleGender={() => {}} />);
    const img = screen.getByAltText(/Bulbasaur/i) as HTMLImageElement;
    expect(img.src).toContain('/mock/bulbasaur-shiny.png');
  });

  it('renders female sprite if isFemale is true', () => {
    render(<PokedexScreenFront pokemon={mockPokemon} loading={false} error={false} isShiny={false} isFemale={true} onToggleGender={() => {}} />);
    const img = screen.getByAltText(/Bulbasaur/i) as HTMLImageElement;
    expect(img.src).toContain('/mock/bulbasaur-female.png');
  });
});
