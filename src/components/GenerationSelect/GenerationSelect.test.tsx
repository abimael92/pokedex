import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

        it('renders all generation options from 1 to 8', () => {
            render(<GenerationSelect {...defaultProps} />);

            const options = screen.getAllByRole('option');
            expect(options).toHaveLength(8);

            for (let i = 1; i <= 8; i++) {
                const option = screen.getByText(`Gen ${i}`);
                expect(option).toBeInTheDocument();
                expect(option).toHaveValue(i.toString());
            }
        });

        it('selects the correct generation based on prop', () => {
            render(<GenerationSelect {...defaultProps} generation="3" />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toHaveValue('3');
        });

        it('renders with default generation when provided', () => {
            render(<GenerationSelect {...defaultProps} generation="5" />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toHaveValue('5');
        });
    });

    describe('Interactions', () => {
        it('calls setGeneration with correct value when selection changes', () => {
            render(<GenerationSelect {...defaultProps} />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');
            fireEvent.change(selectElement, { target: { value: '4' } });

            expect(mockSetGeneration).toHaveBeenCalledTimes(1);
            expect(mockSetGeneration).toHaveBeenCalledWith('4');
        });

        it('handles change to each generation option', () => {
            render(<GenerationSelect {...defaultProps} />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');

            for (let i = 1; i <= 8; i++) {
                fireEvent.change(selectElement, { target: { value: i.toString() } });
                expect(mockSetGeneration).toHaveBeenCalledWith(i.toString());
            }

            expect(mockSetGeneration).toHaveBeenCalledTimes(8);
        });

        it('updates selected value when generation prop changes', () => {
            const { rerender } = render(<GenerationSelect {...defaultProps} />);

            let selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toHaveValue('1');

            rerender(<GenerationSelect generation="7" setGeneration={mockSetGeneration} />);

            selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toHaveValue('7');
        });
    });

    describe('Accessibility', () => {
        it('has proper aria-label for screen readers', () => {
            render(<GenerationSelect {...defaultProps} />);

            const selectElement = screen.getByLabelText('Select Pokemon generation');
            expect(selectElement).toBeInTheDocument();
        });

        it('has proper select element semantics', () => {
            render(<GenerationSelect {...defaultProps} />);

            const selectElement = screen.getByRole('combobox');
            expect(selectElement).toBeInTheDocument();
        });
    });
});