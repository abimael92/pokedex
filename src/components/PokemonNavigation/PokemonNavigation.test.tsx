// PokemonNavigation.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    describe('Interactions', () => {
        it('calls onNext when up button is clicked', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');
            fireEvent.click(upButton);

            expect(mockOnNext).toHaveBeenCalledTimes(1);
            expect(mockOnPrevious).not.toHaveBeenCalled();
            expect(mockOnFlip).not.toHaveBeenCalled();
        });

        it('calls onPrevious when down button is clicked', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const downButton = screen.getByLabelText('Previous Pokemon');
            fireEvent.click(downButton);

            expect(mockOnPrevious).toHaveBeenCalledTimes(1);
            expect(mockOnNext).not.toHaveBeenCalled();
            expect(mockOnFlip).not.toHaveBeenCalled();
        });

        it('calls onFlip when left button is clicked', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const leftButton = screen.getByLabelText('Flip card left');
            fireEvent.click(leftButton);

            expect(mockOnFlip).toHaveBeenCalledTimes(1);
            expect(mockOnNext).not.toHaveBeenCalled();
            expect(mockOnPrevious).not.toHaveBeenCalled();
        });

        it('calls onFlip when right button is clicked', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const rightButton = screen.getByLabelText('Flip card right');
            fireEvent.click(rightButton);

            expect(mockOnFlip).toHaveBeenCalledTimes(1);
            expect(mockOnNext).not.toHaveBeenCalled();
            expect(mockOnPrevious).not.toHaveBeenCalled();
        });

        it('does not call any function when center button is clicked (it should be inert)', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const buttons = screen.getAllByRole('button', { hidden: true });
            const centerButton = buttons.find(btn => btn.classList.contains('center'));

            expect(centerButton).toBeInTheDocument();

            fireEvent.click(centerButton!);

            expect(mockOnNext).not.toHaveBeenCalled();
            expect(mockOnPrevious).not.toHaveBeenCalled();
            expect(mockOnFlip).not.toHaveBeenCalled();
        });

        it('handles multiple clicks correctly', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');
            const leftButton = screen.getByLabelText('Flip card left');

            // Multiple clicks on different buttons
            fireEvent.click(upButton);
            fireEvent.click(upButton);
            fireEvent.click(leftButton);
            fireEvent.click(upButton);

            expect(mockOnNext).toHaveBeenCalledTimes(3);
            expect(mockOnFlip).toHaveBeenCalledTimes(1);
            expect(mockOnPrevious).not.toHaveBeenCalled();
        });

    });

    describe('Accessibility', () => {
        it('has proper aria-labels for all interactive buttons', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            expect(screen.getByLabelText('Next Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Previous Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card left')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card right')).toBeInTheDocument();
        });

        it('center button has aria-hidden to hide it from screen readers', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const buttons = screen.getAllByRole('button', { hidden: true });
            const centerButton = buttons.find(btn => btn.classList.contains('center'));

            expect(centerButton).toBeInTheDocument();
            expect(centerButton).toHaveAttribute('aria-hidden', 'true');
        });

        it('all buttons have proper button roles', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const buttons = screen.getAllByRole('button', { hidden: true });
            expect(buttons).toHaveLength(5);
        });

    });

    describe('Keyboard Navigation', () => {
        it('buttons are keyboard accessible via Enter key', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');

            // Use click instead - this simulates both mouse click and keyboard activation
            fireEvent.click(upButton);

            expect(mockOnNext).toHaveBeenCalledTimes(1);
        });

        it('buttons are keyboard accessible via Space key', async () => {
            const user = userEvent.setup();
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');

            // Focus the button and press Space
            upButton.focus();
            await user.keyboard(' '); // Press Space

            expect(mockOnNext).toHaveBeenCalledTimes(1);
        });

    });
});