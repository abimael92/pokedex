import React, { useEffect, useState } from 'react';
import { Generation } from '../../types/pokemon';
import './GenerationSelect.css';

interface GenerationSelectProps {
    generation: Generation;
    setGeneration: (generation: Generation) => void;
}

// Optional: Update GenerationSelect component for mobile
const GenerationSelect: React.FC<GenerationSelectProps> = ({ generation, setGeneration }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className='generation-select-wrapper' data-testid="generation-select-wrapper">
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
                        {isMobile ? `G${gen}` : `Gen ${gen}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenerationSelect;