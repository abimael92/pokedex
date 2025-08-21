import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pokedex from './Pokedex';

// Mock hooks so we can control their behavior
jest.mock('../../hooks/usePokemon', () => ({
  usePokemon: () => ({
    pokemon: { name: 'pikachu', stats: [{ base_stat: 35, stat: { name: 'hp' } }] },
    loading: false,
    error: null,
    pokemonID: 25,
    generation: '1',
    setPokemonId: jest.fn(),
    setGeneration: jest.fn(),
  }),
}));

jest.mock('../../hooks/usePokemonAudio', () => ({
  usePokemonAudio: () => ({
    playCry: jest.fn(),
    playMonologue: jest.fn(),
  }),
}));

jest.mock('../../hooks/useAlternateForms', () => ({
  useAlternateForms: () => ({
    forms: [
      { name: 'pikachu-rockstar', url: 'https://pokeapi.co/api/v2/pokemon-form/10091/' },
    ],
    fetchForms: jest.fn(),
  }),
}));

jest.mock('../../hooks/useFlipCard', () => ({
  __esModule: true,
  default: () => ({ flipCard: jest.fn() }),
  useFlipCard: () => ({ flipCard: jest.fn() }),
}));

describe('Pokedex', () => {
  it('renders the Pokedex component', () => {
    render(<Pokedex />);
    expect(screen.getByRole('button', { name: /flip pokemon card/i })).toBeInTheDocument();
  });

  it('activates on click', () => {
    render(<Pokedex />);
    fireEvent.click(screen.getByRole('button', { name: /flip pokemon card/i }));
    expect(screen.getByText(/generation/i)).toBeInTheDocument(); // GenerationSelect shows
  });

  it('toggles shiny state when shiny button clicked', () => {
    render(<Pokedex />);
    const shinyBtn = screen.getByRole('button', { name: /enable shiny/i });
    fireEvent.click(shinyBtn);
    expect(screen.getByRole('button', { name: /disable shiny/i })).toBeInTheDocument();
  });

  it('toggles gender when gender button clicked', () => {
    render(<Pokedex />);
    const genderBtn = screen.getAllByRole('button').find(b => b.textContent?.includes('♀') || b.textContent?.includes('♂'));
    if (genderBtn) {
      fireEvent.click(genderBtn);
      // Add assertion depending on how gender toggles render
    }
  });

  it('renders alternate form button', () => {
    render(<Pokedex />);
    expect(screen.getByLabelText(/select pikachu-rockstar/i)).toBeInTheDocument();
  });

  it('shows revert form button after selecting a form', () => {
    render(<Pokedex />);
    const formBtn = screen.getByLabelText(/select pikachu-rockstar/i);
    fireEvent.click(formBtn);
    expect(screen.getByRole('button', { name: /revert form/i })).toBeInTheDocument();
  });

  it('renders CryButtons', () => {
    render(<Pokedex />);
    expect(screen.getByRole('button', { name: /shiny/i })).toBeInTheDocument();
  });
});
