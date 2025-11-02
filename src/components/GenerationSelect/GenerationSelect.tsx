import React from 'react';
import { Generation } from '../../types/pokemon';
import './GenerationSelect.css';

interface GenerationSelectProps {
    generation: Generation;
    setGeneration: (generation: Generation) => void;
}

const GenerationSelect: React.FC<GenerationSelectProps> = ({ generation, setGeneration }) => {
    return (
        <div
            className='generation-select-wrapper'
            data-testid="generation-select-wrapper" // Add this line
        >
            <select
                id='generation'
                value={generation}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setGeneration(e.target.value as Generation);
                }}
                className='generation-select'
                data-testid="generation-select"
                aria-label="Select Pokemon generation"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((gen) => (
                    <option key={gen} value={gen.toString()}>
                        Gen {gen}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenerationSelect;