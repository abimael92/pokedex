import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokedexDataScreen from './PokedexDataScreen';
import { vi } from 'vitest';

// ✅ Mock hooks using Vitest's vi.fn
vi.mock('../../hooks/usePokemonForms', () => ({
  usePokemonForms: vi.fn(),
}));
vi.mock('../../hooks/usePokemonEvolution', () => ({
  usePokemonEvolution: vi.fn(),
}));

import { usePokemonForms } from '../../hooks/usePokemonForms';
import { usePokemonEvolution } from '../../hooks/usePokemonEvolution';

const mockPokemon: Pokemon = {
  id: 25,
  name: 'Pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,
  species: { name: 'pikachu', url: '/api/v2/pokemon-species/25/' },
  sprites: {
    front_default: '/mock/pikachu.png',
    front_shiny: '/mock/pikachu-shiny.png',
    other: { 'official-artwork': { front_default: '/mock/pikachu.png', front_shiny: '/mock/pikachu-shiny.png' } },
  },
  stats: [
    { base_stat: 35, stat: { name: 'hp', url: '' } },
    { base_stat: 55, stat: { name: 'attack', url: '' } },
  ],
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  abilities: [
    { ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 },
    { ability: { name: 'lightning-rod', url: '' }, is_hidden: true, slot: 3 },
  ],
  cries: { latest: '/audio/pikachu.mp3', legacy: '/audio/pikachu.ogg' },
};


describe('PokedexDataScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when pokemon is null', () => {
    (usePokemonForms as any).mockReturnValue({ description: '', loading: true, error: false });
    (usePokemonEvolution as any).mockReturnValue({ evolutionInfo: null, loading: false, error: false });

    render(<PokedexDataScreen pokemon={null} />);

    // ✅ Should show the loading image
    expect(screen.getByAltText('Loading Pokemon')).toBeInTheDocument();
  });

  it('renders error state when forms hook fails', () => {
    (usePokemonForms as any).mockReturnValue({ description: '', loading: false, error: true });
    (usePokemonEvolution as any).mockReturnValue({ evolutionInfo: null, loading: false, error: false });

    render(<PokedexDataScreen pokemon={mockPokemon} />);

    // ✅ Should show the error image
    expect(screen.getByAltText('Error loading Pokemon')).toBeInTheDocument();
  });

  it('renders description when forms data is available', () => {
    (usePokemonForms as any).mockReturnValue({ description: 'Electric mouse Pokémon', loading: false, error: false });
    (usePokemonEvolution as any).mockReturnValue({ evolutionInfo: null, loading: false, error: false });

    render(<PokedexDataScreen pokemon={mockPokemon} />);

    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText('Electric mouse Pokémon')).toBeInTheDocument();
  });
});
