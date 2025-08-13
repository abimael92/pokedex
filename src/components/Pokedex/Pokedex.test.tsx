import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokedex from './Pokedex';


describe('Pokedex', () => {
  it('renders the Pokedex title', () => {
    render(<Pokedex />)
    expect(screen.getByText(/pokedex/i)).toBeInTheDocument()
  })
})
