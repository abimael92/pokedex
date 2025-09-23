// PokedexShell.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PokedexShell from './PokedexShell';

describe('PokedexShell', () => {
    const mockOnClick = jest.fn();
    const mockOnClose = jest.fn();

    it('renders children and applies active class', () => {
        render(
            <PokedexShell
                isActive={true}
                onClick={mockOnClick}
                onClose={mockOnClose}
                pokemonID={1}
                pokemon={null}
            >
                <div data-testid="child">Hello Child</div>
            </PokedexShell>
        );

        // Check that children render
        expect(screen.getByTestId('child')).toHaveTextContent('Hello Child');

        // Check that is-active class is applied
        const container = screen.getByTestId('pokedex-container');
        expect(container).toHaveClass('is-active');


        // Simulate click
        fireEvent.click(container);
        expect(mockOnClick).toHaveBeenCalled();
    });
});
