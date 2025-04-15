import React from 'react';
import "./CryButtons.css"
import { FaVolumeUp } from 'react-icons/fa';
import { Pokemon } from '../../types/pokemon';

interface CryButtonsProps {
    pokemon: Pokemon | null;
    onPlayCry: (pokemon: Pokemon | null) => void;
    onPlayMonologue: (pokemon: Pokemon | null) => void;
}

const CryButtons: React.FC<CryButtonsProps> = ({ 
    pokemon, 
    onPlayCry, 
    onPlayMonologue 
}) => {
    return (
        <div className='cry-button-container'>
            <button 
                className='cry-button' 
                onClick={() => onPlayCry(pokemon)}
                aria-label="Play Pokemon cry"
                disabled={!pokemon?.cries?.latest}
            >
                <FaVolumeUp color='black' />
            </button>

            {(pokemon?.id === 150 || pokemon?.name?.toLowerCase() === 'mewtwo') && (
                <button 
                    className='cry-button2' 
                    onClick={() => onPlayMonologue(pokemon)}
                    aria-label="Play Mewtwo monologue"
                >
                    <FaVolumeUp color='black' />
                </button>
            )}
        </div>
    );
};

export default CryButtons;