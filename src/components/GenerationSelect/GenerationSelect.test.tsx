import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenerationSelect from './GenerationSelect';
import { Generation } from '../../types/pokemon';

describe('GenerationSelect', () => {
    const mockSetGeneration = jest.fn();

    const defaultProps = {
        generation: '1' as Generation,
        setGeneration: mockSetGeneration,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders the select element with correct attributes', () => {
            render(<GenerationSelect {...defaultProps} />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toBeInTheDocument();
            expect(selectElement).toHaveAttribute('id', 'generation');
            expect(selectElement).toHaveClass('generation-select');
        });

    });

});