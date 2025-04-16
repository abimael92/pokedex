import React, { ReactNode } from 'react';
import './PokedexShell.css';
import PokedexDataScreen from '../PokedexDataScreen/PokedexDataScreen';
import { usePokemon } from '../../hooks/usePokemon';


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

    const {
        pokemon,
        loading,
        error,

    } = usePokemon();
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
                <div className='pokedex-right-back' >
                    <div className='pokedex-right-layout' >

                <div
                    className='pokedex-screen-container'
                    id={pokemonID?.toString()}
                  
                >
                    <div
                    className='pokedex-screen-data'
                    id={pokemonID?.toString()}
                   
                    role="button"
                    aria-label="Flip Pokemon card"
                >
                    <PokedexDataScreen pokemon={pokemon} />
                </div>
                </div>

                </div>

            </div>
            </div>
    );
};

export default PokedexShell;