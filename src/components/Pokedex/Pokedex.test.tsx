import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokedex from './Pokedex';

describe('Pokedex', () => {
  it('renders the Pokedex component', () => {
    render(<Pokedex />);
    const flipButtons = screen.getAllByRole('button', { name: /flip pokemon card/i });
    expect(flipButtons.length).toBeGreaterThan(0);
  });
});
