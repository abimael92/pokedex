import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokedexDataScreen from './PokedexDataScreen';
import { Pokemon } from '../../types/pokemon';

// mock hooks
jest.mock('../../hooks/usePokemonForms', () => ({
  usePokemonForms: jest.fn(),
}));
jest.mock('../../hooks/usePokemonEvolution', () => ({
  usePokemonEvolution: jest.fn(),
}));

import { usePokemonForms } from '../../hooks/usePokemonForms';
import { usePokemonEvolution } from '../../hooks/usePokemonEvolution';

const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  species: { url: '/api/v2/pokemon-species/25/' },
} as any;

describe('PokedexDataScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when pokemon is null', () => {
    (usePokemonForms as jest.Mock).mockReturnValue({
      description: '',
      loading: true,
      error: false,
    });
    (usePokemonEvolution as jest.Mock).mockReturnValue({
      evolutionInfo: null,
      loading: false,
      error: false,
    });

    render(<PokedexDataScreen pokemon={null} />);

    expect(screen.getByAltText('Loading Pokemon')).toBeInTheDocument();
  });

  it('renders error state when forms hook fails', () => {
    (usePokemonForms as jest.Mock).mockReturnValue({
      description: '',
      loading: false,
      error: true,
    });
    (usePokemonEvolution as jest.Mock).mockReturnValue({
      evolutionInfo: null,
      loading: false,
      error: false,
    });

    render(<PokedexDataScreen pokemon={mockPokemon} />);

    expect(screen.getByAltText('Error loading Pokemon')).toBeInTheDocument();
  });

  it('renders description when forms data is available', () => {
    (usePokemonForms as jest.Mock).mockReturnValue({
      description: 'Electric mouse Pokémon',
      loading: false,
      error: false,
    });
    (usePokemonEvolution as jest.Mock).mockReturnValue({
      evolutionInfo: null,
      loading: false,
      error: false,
    });

    render(<PokedexDataScreen pokemon={mockPokemon} />);

    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText('Electric mouse Pokémon')).toBeInTheDocument();
  });

  it('renders evolution chart when data is available', () => {
    (usePokemonForms as jest.Mock).mockReturnValue({
      description: 'Electric mouse Pokémon',
      loading: false,
      error: false,
    });
    (usePokemonEvolution as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      evolutionInfo: {
        evolutionChain: [
          { species: 'Pichu', minLevel: 1, trigger: null },
          { species: 'Pikachu', minLevel: 10, trigger: null },
          { species: 'Raichu', minLevel: 20, trigger: null },
        ],
      },
    });

    render(<PokedexDataScreen pokemon={mockPokemon} />);

    expect(screen.getByText('Evolution Chart:')).toBeInTheDocument();
    expect(screen.getByText('Pichu')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Raichu')).toBeInTheDocument();
  });
});
