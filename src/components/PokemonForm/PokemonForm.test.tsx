// src/components/PokemonForm/PokemonForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonForm from './PokemonForm';

describe('PokemonForm Component', () => {
    const mockSetPokemonId = vi.fn();

    beforeEach(() => {
        mockSetPokemonId.mockClear();
    });

    test('renders input and button', () => {
        render(<PokemonForm setPokemonId={mockSetPokemonId} generation="1" />);
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('updates input value on change', () => {
        render(<PokemonForm setPokemonId={mockSetPokemonId} generation="1" />);
        const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Bulbasaur' } });
        expect(input.value).toBe('Bulbasaur');
    });

    test('calls setPokemonId with typed name on submit', () => {
        render(<PokemonForm setPokemonId={mockSetPokemonId} generation="1" />);
        const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
        const form = screen.getByTestId('pokemon-form');

        fireEvent.change(input, { target: { value: 'Bulbasaur' } });
        fireEvent.submit(form);

        expect(mockSetPokemonId).toHaveBeenCalledWith('bulbasaur');
    });

    test('calls setPokemonId with random ID if input is empty', () => {
        render(<PokemonForm setPokemonId={mockSetPokemonId} generation="1" />);
        const form = screen.getByTestId('pokemon-form');

        fireEvent.submit(form);

        expect(mockSetPokemonId).toHaveBeenCalled();
    });
});
