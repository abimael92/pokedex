import React, { ReactNode } from 'react';
import './PokedexShell.css';

interface PokedexShellProps {
    isActive: boolean;
    onClick: () => void;
    onClose: () => void;
    children: ReactNode;
    pokemonID: number | null;
}

const PokedexShell: React.FC<PokedexShellProps> = ({
    isActive,
    onClick,
    onClose,
    children,
    pokemonID
}) => {
    return (
        <div
            className={`pokedex ${isActive ? 'is-active' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            {children}
            
            {/* Right side panels */}
            <div className='pokedex-right-front' />
            <div
                className='pokedex-right-back'
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                role="button"
                aria-label="Close Pokemon card"
                tabIndex={0}
            >
                <div className="close-icon">×</div>
            </div>
        </div>
    );
};

export default PokedexShell;