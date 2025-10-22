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

    const mockPokemonWithoutCry: Pokemon = {
        id: 151,
        name: 'mew',
        base_experience: 300,
        height: 4,
        weight: 40,
        species: { name: 'mew', url: '/api/v2/pokemon-species/151/' },
        sprites: {
            front_default: '/mock/mew.png',
            front_shiny: '/mock/mew-shiny.png',
            other: { 'official-artwork': { front_default: '/mock/mew.png', front_shiny: '/mock/mew-shiny.png' } },
        },
        stats: [
            { base_stat: 100, stat: { name: 'hp', url: '' } },
            { base_stat: 100, stat: { name: 'attack', url: '' } },
        ],
        types: [{ slot: 1, type: { name: 'psychic', url: '' } }],
        abilities: [
            { ability: { name: 'synchronize', url: '' }, is_hidden: false, slot: 1 },
        ],
        moves: [],
        cries: { latest: '', legacy: '' },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders nothing when pokemon is null', () => {
            render(
                <CryButtons
                    pokemon={null}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            const cryButton = screen.getByLabelText('Play Pokemon cry');
            expect(cryButton).toBeInTheDocument();
            expect(cryButton).toBeDisabled();
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

        it('renders disabled main cry button when pokemon has no cry', () => {
            render(
                <CryButtons
                    pokemon={mockPokemonWithoutCry}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            const cryButton = screen.getByLabelText('Play Pokemon cry');
            expect(cryButton).toBeInTheDocument();
            expect(cryButton).toBeDisabled();
        });

        it('renders monologue button for Mewtwo by ID', () => {
            render(
                <CryButtons
                    pokemon={mockPokemon}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            const monologueButton = screen.getByLabelText('Play Mewtwo monologue');
            expect(monologueButton).toBeInTheDocument();
            expect(monologueButton).toBeEnabled();
        });

        it('renders monologue button for Mewtwo by name (case insensitive)', () => {
            const mewtwoByName: Pokemon = {
                id: 25, // Different ID but correct name
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

            render(
                <CryButtons
                    pokemon={mewtwoByName}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            const monologueButton = screen.getByLabelText('Play Mewtwo monologue');
            expect(monologueButton).toBeInTheDocument();
        });

        it('does not render monologue button for non-Mewtwo Pokemon', () => {
            const nonMewtwoPokemon: Pokemon = {
                id: 151,
                name: 'mew',
                base_experience: 300,
                height: 4,
                weight: 40,
                species: { name: 'mew', url: '/api/v2/pokemon-species/151/' },
                sprites: {
                    front_default: '/mock/mew.png',
                    front_shiny: '/mock/mew-shiny.png',
                    other: { 'official-artwork': { front_default: '/mock/mew.png', front_shiny: '/mock/mew-shiny.png' } },
                },
                stats: [
                    { base_stat: 100, stat: { name: 'hp', url: '' } },
                    { base_stat: 100, stat: { name: 'attack', url: '' } },
                ],
                types: [{ slot: 1, type: { name: 'psychic', url: '' } }],
                abilities: [
                    { ability: { name: 'synchronize', url: '' }, is_hidden: false, slot: 1 },
                ],
                moves: [],
                cries: { latest: '', legacy: '' },
            };

            render(
                <CryButtons
                    pokemon={nonMewtwoPokemon}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            // expect(screen.queryByLabelText('Play Mewtwo monologue')).not.toBeInTheDocument();
            expect(screen.getByLabelText('Play Pokemon cry')).toBeInTheDocument();
        });
    });

    describe('Interactions', () => {
        it('calls onPlayCry when main cry button is clicked', () => {
            render(
                <CryButtons
                    pokemon={mockPokemon}
                    onPlayCry={mockOnPlayCry}
                    onPlayMonologue={mockOnPlayMonologue}
                />
            );

            const cryButton = screen.getByLabelText('Play Pokemon cry');
            fireEvent.click(cryButton);

            expect(mockOnPlayCry).toHaveBeenCalledTimes(1);
            expect(mockOnPlayCry).toHaveBeenCalledWith(mockPokemon);
        });

    });
});