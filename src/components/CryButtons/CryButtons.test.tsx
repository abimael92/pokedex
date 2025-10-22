import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryButtons from './CryButtons';
import { Pokemon } from '../../types/pokemon';

// Mock the react-icons component
jest.mock('react-icons/fa', () => ({
    FaVolumeUp: () => <span data-testid="volume-icon">VolumeIcon</span>
}));

describe('CryButtons', () => {
    const mockOnPlayCry = jest.fn();
    const mockOnPlayMonologue = jest.fn();

    const mockPokemon: Pokemon = {
        id: 150,
        name: 'mewtwo',
        base_experience: 340,
        height: 20,
        weight: 1220,
        species: { name: 'mewtwo', url: '/api/v2/pokemon-species/150/' },
        sprites: {
            front_default: '/mock/mewtwo.png',
            front_shiny: '/mock/mewtwo-shiny.png',
            other: { 'official-artwork': { front_default: '/mock/mewtwo.png', front_shiny: '/mock/mewtwo-shiny.png' } },
        },
        stats: [
            { base_stat: 106, stat: { name: 'hp', url: '' } },
            { base_stat: 110, stat: { name: 'attack', url: '' } },
        ],
        types: [{ slot: 1, type: { name: 'psychic', url: '' } }],
        abilities: [
            { ability: { name: 'pressure', url: '' }, is_hidden: false, slot: 1 },
            { ability: { name: 'unnerve', url: '' }, is_hidden: true, slot: 3 },
        ],
        moves: [],
        cries: { latest: '/audio/mewtwo.mp3', legacy: '/audio/mewtwo.ogg' },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders main cry button when pokemon has cry', () => {
        render(
            <CryButtons
                pokemon={mockPokemon}
                onPlayCry={mockOnPlayCry}
                onPlayMonologue={mockOnPlayMonologue}
            />
        );

        const cryButton = screen.getByLabelText('Play Pokemon cry');
        expect(cryButton).toBeInTheDocument();
        expect(cryButton).toBeEnabled();
    });
});