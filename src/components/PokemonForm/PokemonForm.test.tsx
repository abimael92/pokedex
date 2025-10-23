// src/components/PokemonForm/PokemonForm.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonForm from './PokemonForm';
import { Generation } from '../../types/pokemon';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as pokemonGenerations from '../../utils/pokemonGenerations';

// Mock the module using Vitest
vi.mock('../../utils/pokemonGenerations', () => ({
    getRandomPokemonId: vi.fn()
}));

const mockGetRandomPokemonId = vi.mocked(pokemonGenerations.getRandomPokemonId);

describe('PokemonForm Component', () => {
    const mockSetPokemonId = vi.fn();

    const defaultProps = {
        setPokemonId: mockSetPokemonId,
        generation: '1' as Generation
    };

    beforeEach(() => {
        vi.clearAllMocks();
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

        it('calls setPokemonId with random ID when form is submitted with empty input', async () => {
            mockGetRandomPokemonId.mockReturnValue(150);

            render(<PokemonForm {...defaultProps} />);

            const form = screen.getByTestId('pokemon-form');
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockSetPokemonId).toHaveBeenCalledWith(150);
            });
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

            await waitFor(() => {
                expect(mockSetPokemonId).toHaveBeenCalledWith('squirtle');
            });
        });
    });

    describe('Accessibility', () => {
        it('has proper aria-label on search button', () => {
            render(<PokemonForm {...defaultProps} />);

            const button = screen.getByRole('button', { name: /search/i });
            expect(button).toBeInTheDocument();
        });

        it('has proper input attributes', () => {
            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i);
            expect(input).toHaveAttribute('autocomplete', 'off');
            expect(input).toHaveAttribute('name', 'pokemon');
            expect(input).toHaveAttribute('type', 'text');
        });
    });

    describe('Edge Cases', () => {
        it('calls getRandomPokemonId with correct generation when form is submitted with empty input', async () => {
            mockGetRandomPokemonId.mockReturnValue(33); // Match what the actual function returns

            render(<PokemonForm setPokemonId={mockSetPokemonId} generation="3" />);

            const form = screen.getByTestId('pokemon-form');
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockGetRandomPokemonId).toHaveBeenCalledWith(3);
            });
        });

        it('handles special characters in input', async () => {
            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i);
            const form = screen.getByTestId('pokemon-form');

            fireEvent.change(input, { target: { value: "Nidoran♂" } });
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockSetPokemonId).toHaveBeenCalledWith("nidoran♂");
            });
        });

        it('handles numeric input', async () => {
            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i);
            const form = screen.getByTestId('pokemon-form');

            fireEvent.change(input, { target: { value: "25" } });
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockSetPokemonId).toHaveBeenCalledWith("25");
            });
        });

        it('handles generation prop changes correctly', async () => {
            const { rerender } = render(<PokemonForm setPokemonId={mockSetPokemonId} generation="1" />);

            let form = screen.getByTestId('pokemon-form');
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockGetRandomPokemonId).toHaveBeenCalledWith(1);
            });

            // Clear mocks and test with different generation
            mockGetRandomPokemonId.mockClear();
            rerender(<PokemonForm setPokemonId={mockSetPokemonId} generation="4" />);

            form = screen.getByTestId('pokemon-form');
            fireEvent.submit(form);

            await waitFor(() => {
                expect(mockGetRandomPokemonId).toHaveBeenCalledWith(4);
            });
        });
    });

    describe('Error Handling', () => {
        it('handles form submission errors gracefully', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
            mockSetPokemonId.mockImplementation(() => {
                throw new Error('Test error');
            });

            render(<PokemonForm {...defaultProps} />);

            const input = screen.getByPlaceholderText(/search/i);
            const form = screen.getByTestId('pokemon-form');

            fireEvent.change(input, { target: { value: 'Pikachu' } });
            fireEvent.submit(form);

            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
            });

            consoleSpy.mockRestore();
        });
    });
});