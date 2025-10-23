// src/components/PokemonForm/PokemonForm.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonForm from './PokemonForm';
import { getRandomPokemonId } from '../../utils/pokemonGenerations';
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


    describe('Interactions', () => {
        it('updates input value on change', () => {
            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
            fireEvent.change(input, { target: { value: 'Pikachu' } });

            expect(input.value).toBe('Pikachu');
        });

        it('calls setPokemonId with lowercase name when form is submitted with non-empty input', async () => {
            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i);
            const form = screen.getByTestId('pokemon-form');

            fireEvent.change(input, { target: { value: 'Charizard' } });
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockSetPokemonId).toHaveBeenCalledWith('charizard');
            });
        });

        // it('calls setPokemonId with random ID when form is submitted with empty input', async () => {
        //     // jest.spyOn(pokemonUtils, 'getRandomPokemonId').mockReturnValue(150);
        //     mockGetRandomPokemonId.mockReturnValue(150);

        //     render(<PokemonForm {...defaultProps} />);

        //     const form = screen.getByTestId('pokemon-form');
        //     fireEvent.submit(form);

        //     // await waitFor(() => expect(mockGetRandomPokemonId).toHaveBeenCalledWith(1));
        //     await waitFor(() => expect(mockSetPokemonId).toHaveBeenCalledWith(150));

        // });
    });

    it('resets input value after successful submission', async () => {
        render(<PokemonForm {...defaultProps} />);

        const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
        const form = screen.getByTestId('pokemon-form');

        fireEvent.change(input, { target: { value: 'Bulbasaur' } });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });

    it('trims whitespace from input before submission', async () => {
        render(<PokemonForm {...defaultProps} />);

        const input = screen.getByPlaceholderText(/search/i);
        const form = screen.getByTestId('pokemon-form');

        fireEvent.change(input, { target: { value: '  Squirtle  ' } });
        fireEvent.submit(form);

        // expect(mockSetPokemonId).toHaveBeenCalledWith('  squirtle  ');

        await waitFor(() => {
            expect(mockSetPokemonId).toHaveBeenCalledWith('squirtle');
        });
    });
});
