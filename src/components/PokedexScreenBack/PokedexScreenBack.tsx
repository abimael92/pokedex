import React, { useState, useEffect } from 'react';
import Stat from '../Stat/Stat';

import Icons from '@assets/icons';  // Change back from named import // Changed from import * as Icons

import './PokedexScreenBack.css';

import { Pokemon } from '../../types/pokemon';
import { usePokemonTypeEffectiveness } from '../../hooks/usePokemonTypeEffectiveness';

const ErrorPokemon = '/images/status/error.gif';
const LoadingPokemon = '/images/status/loading.gif';

const colours: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const EffectivenessItem: React.FC<{ type: string; color: string; icon: string }> = ({ type, color, icon }) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="effectiveness-item" style={{ backgroundColor: color, position: 'relative' }}>
      <span
        className="effectiveness-text"
        style={{
          opacity: showText ? 1 : 0,
          transition: 'opacity 0.5s ease',
          position: showText ? 'static' : 'absolute',
          left: 0,
          right: 0,
          margin: 'auto',
        }}
      >
        {type}
      </span>
      <img
        className="effectiveness-icon"
        src={icon}
        alt={`${type} icon`}
        style={{
          width: 10,
          height: 10,
          marginLeft: '0.5rem',
          opacity: showText ? 0 : 1,
          transition: 'opacity 0.5s ease',
          position: showText ? 'absolute' : 'static',
          left: 0,
          right: 0,
          margin: 'auto',
        }}
      />
    </div>
  );
};

interface PokedexScreenProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: boolean;
  stats: Pokemon['stats'];
  isShiny: boolean;
  isFemale: boolean;
  onToggleGender: () => void;
}

const PokedexScreenBack: React.FC<PokedexScreenProps> = ({
  pokemon,
  loading,
  error,
  stats,
  isShiny,
}) => {
  const {
    strengths,
    weaknesses,
    loading: typeLoading,
    error: typeError,
  } = usePokemonTypeEffectiveness(pokemon?.name || '');

  if (error) {
    return (
      <div className="pokedex-screen-back">
        <img
          src={ErrorPokemon}
          alt="Hubo un error buscando tu pokemon"
          className="pokedex-no-screen"
        />
      </div>
    );
  }

  if (!pokemon || loading) {
    return (
      <div className="pokedex-screen-back">
        <img
          src={LoadingPokemon}
          alt="Aun no hay ningun pokemon"
          className="pokedex-no-screen"
        />
      </div>
    );
  }

  const renderEffectivenessList = (
    types: string[],
    label: string
  ) => (
    <div className="effectiveness-container">
      <h3 className="effectiveness-title">{label}</h3>
      <div className="effectiveness-list">
        {typeLoading ? (
          <p>Loading {label.toLowerCase()}...</p>
        ) : (
          types.map(type => {
            const key = type.toLowerCase() as keyof typeof Icons;
            return (
              <EffectivenessItem
                key={type}
                type={type}
                color={colours[key] || 'white'}
                icon={Icons[key] as string}
              />
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="pokedex-screen-back">
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="pokemon-info">
        <div className="pokemon-img-wrapper">
          <img
            className="pokemon-img"
            src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
        <ul className="pokemon-stats">
          {stats.map(item => (
            <Stat key={item.stat.name} item={item} />
          ))}
        </ul>
      </div>

      <div className="effectiveness-area">
        {renderEffectivenessList(strengths, 'Strengths')}
        {renderEffectivenessList(weaknesses, 'Weaknesses')}
      </div>
    </div>
  );
};

export default PokedexScreenBack;
