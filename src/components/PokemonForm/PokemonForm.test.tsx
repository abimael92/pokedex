// src/components/PokemonForm/PokemonForm.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonForm from './PokemonForm';
import * as pokemonUtils from '../../utils/pokemonGenerations';
import { Generation } from '../../types/pokemon';

// Mock the module manually so TS/Jest agree
const mockGetRandomPokemonId = jest.fn();
jest.mock('../../utils/pokemonGenerations', () => ({
    getRandomPokemonId: mockGetRandomPokemonId,
}));

describe('PokemonForm Component', () => {
    const mockSetPokemonId = jest.fn();

    const defaultProps = {
        setPokemonId: mockSetPokemonId,
        generation: '1' as Generation
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetRandomPokemonId.mockReturnValue(25); // Pikachu ID
    });

    describe('Rendering', () => {
        it('renders form with input and button', () => {
            render(<PokemonForm {...defaultProps} />);
            expect(screen.getByTestId('pokemon-form')).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
        });

        it('renders with empty input by default', () => {
            render(<PokemonForm {...defaultProps} />);
            const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
            expect(input.value).toBe('');
        });

        it('applies correct CSS classes', () => {
            render(<PokemonForm {...defaultProps} />);
            expect(screen.getByTestId('pokemon-form')).toHaveClass('pokemon-form');
            expect(screen.getByPlaceholderText(/search/i)).toHaveClass('pokemon-input');
            expect(screen.getByRole('button', { name: /search/i })).toHaveClass('pokemon-btn');
        });
    });
});
