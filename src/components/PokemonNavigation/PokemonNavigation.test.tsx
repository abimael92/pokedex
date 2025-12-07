// PokemonNavigation.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonNavigation from './PokemonNavigation';

describe('PokemonNavigation', () => {
    const mockOnNext = jest.fn();
    const mockOnPrevious = jest.fn();
    const mockOnFlip = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders all navigation buttons', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            // Check for all D-pad buttons with labels
            expect(screen.getByLabelText('Next Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Previous Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card left')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card right')).toBeInTheDocument();

            const buttons = screen.getAllByRole('button', { hidden: true });
            const centerButton = buttons.find(btn => btn.classList.contains('center'));
            expect(centerButton).toBeInTheDocument();
            expect(centerButton).toHaveClass('d-pad-button', 'center');
        });

        it('renders correct button symbols', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            expect(screen.getByText('▲')).toBeInTheDocument(); // Up
            expect(screen.getByText('▼')).toBeInTheDocument(); // Down
            expect(screen.getByText('◄')).toBeInTheDocument(); // Left
            expect(screen.getByText('►')).toBeInTheDocument(); // Right
        });

        it('applies correct CSS classes', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');
            const downButton = screen.getByLabelText('Previous Pokemon');
            const leftButton = screen.getByLabelText('Flip card left');
            const rightButton = screen.getByLabelText('Flip card right');
            const buttons = screen.getAllByRole('button', { hidden: true });
            // pick the one you need, for example:
            const centerButton = buttons.find(btn => btn.classList.contains('center'));


            expect(upButton).toHaveClass('d-pad-button', 'up');
            expect(downButton).toHaveClass('d-pad-button', 'down');
            expect(leftButton).toHaveClass('d-pad-button', 'left');
            expect(rightButton).toHaveClass('d-pad-button', 'right');
            expect(centerButton).toHaveClass('d-pad-button', 'center');
        });
    });

});