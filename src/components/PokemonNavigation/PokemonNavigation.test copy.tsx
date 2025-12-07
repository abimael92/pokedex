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

            // Check for all D-pad buttons
            expect(screen.getByLabelText('Next Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Previous Pokemon')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card left')).toBeInTheDocument();
            expect(screen.getByLabelText('Flip card right')).toBeInTheDocument();

            // Check for center button (hidden aria)
            expect(screen.getByRole('button', { hidden: true })).toBeInTheDocument();
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
            const centerButton = screen.getByRole('button', { hidden: true });

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

            const centerButton = screen.getByRole('button', { hidden: true });
            fireEvent.click(centerButton);

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

            const centerButton = screen.getByRole('button', { hidden: true });
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

            const buttons = screen.getAllByRole('button');
            expect(buttons).toHaveLength(5); // 4 directional + 1 center
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
            fireEvent.keyDown(upButton, { key: 'Enter', code: 'Enter' });

            expect(mockOnNext).toHaveBeenCalledTimes(1);
        });

        it('buttons are keyboard accessible via Space key', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const downButton = screen.getByLabelText('Previous Pokemon');
            fireEvent.keyDown(downButton, { key: ' ', code: 'Space' });

            expect(mockOnPrevious).toHaveBeenCalledTimes(1);
        });

        it('does not trigger on other key presses', () => {
            render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const leftButton = screen.getByLabelText('Flip card left');
            fireEvent.keyDown(leftButton, { key: 'Escape', code: 'Escape' });

            expect(mockOnFlip).not.toHaveBeenCalled();
        });
    });

    describe('Component Structure', () => {
        it('wraps buttons in controller-wrapper div', () => {
            const { container } = render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const wrapper = container.querySelector('.controller-wrapper');
            expect(wrapper).toBeInTheDocument();
        });

        it('contains d-pad div with correct structure', () => {
            const { container } = render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const dPad = container.querySelector('.d-pad');
            expect(dPad).toBeInTheDocument();
            expect(dPad?.children).toHaveLength(5); // 5 buttons
        });

        it('maintains proper button order in DOM', () => {
            const { container } = render(
                <PokemonNavigation
                    onNext={mockOnNext}
                    onPrevious={mockOnPrevious}
                    onFlip={mockOnFlip}
                />
            );

            const buttons = container.querySelectorAll('.d-pad-button');
            const buttonClasses = Array.from(buttons).map(btn =>
                Array.from(btn.classList).filter(c => c !== 'd-pad-button')
            );

            // Should be: up, left, center, right, down
            expect(buttonClasses[0]).toContain('up');
            expect(buttonClasses[1]).toContain('left');
            expect(buttonClasses[2]).toContain('center');
            expect(buttonClasses[3]).toContain('right');
            expect(buttonClasses[4]).toContain('down');
        });
    });

    describe('Edge Cases', () => {
        it('renders without crashing when all callbacks are provided', () => {
            expect(() => {
                render(
                    <PokemonNavigation
                        onNext={mockOnNext}
                        onPrevious={mockOnPrevious}
                        onFlip={mockOnFlip}
                    />
                );
            }).not.toThrow();
        });

        it('handles empty function callbacks gracefully', () => {
            const emptyFn = () => { };
            expect(() => {
                render(
                    <PokemonNavigation
                        onNext={emptyFn}
                        onPrevious={emptyFn}
                        onFlip={emptyFn}
                    />
                );
            }).not.toThrow();
        });

        it('buttons remain clickable when callbacks are empty functions', () => {
            const emptyFn = () => { };
            render(
                <PokemonNavigation
                    onNext={emptyFn}
                    onPrevious={emptyFn}
                    onFlip={emptyFn}
                />
            );

            const upButton = screen.getByLabelText('Next Pokemon');
            expect(() => {
                fireEvent.click(upButton);
            }).not.toThrow();
        });
    });
});