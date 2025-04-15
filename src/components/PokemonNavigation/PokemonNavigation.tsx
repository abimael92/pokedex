// PokemonNavigation.tsx
import React from 'react';

interface PokemonNavigationProps {
    onNext: () => void;
    onPrevious: () => void;
    onFlip: () => void;
}

const PokemonNavigation: React.FC<PokemonNavigationProps> = ({ 
    onNext, 
    onPrevious, 
    onFlip 
}) => {
    return (
        <div className="controller-wrapper">
            <div className="d-pad">
                <button
                    className="d-pad-button up"
                    onClick={onNext}
                    aria-label="Next Pokemon"
                >
                    ▲
                </button>
                <button
                    className="d-pad-button left"
                    onClick={onFlip}
                    aria-label="Flip card left"
                >
                    ◄
                </button>
                <button className="d-pad-button center" aria-hidden="true" />
                <button
                    className="d-pad-button right"
                    onClick={onFlip}
                    aria-label="Flip card right"
                >
                    ►
                </button>
                <button
                    className="d-pad-button down"
                    onClick={onPrevious}
                    aria-label="Previous Pokemon"
                >
                    ▼
                </button>
            </div>
        </div>
    );
};

export default PokemonNavigation;