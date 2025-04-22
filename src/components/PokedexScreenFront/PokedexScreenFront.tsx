import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexScreenFront.css';
import { Pokemon } from '../../types/pokemon';
import useAbilityEffects from '../../hooks/useAbilityEffects';  

interface TypeColors {
  [key: string]: string;
  normal: string;
  fire: string;
  water: string;
  electric: string;
  grass: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
}

const colours: TypeColors = {
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

const darkenColor = (color: string, amount: number) => {
  let colorHex = color.startsWith('#') ? color.slice(1) : color;
  let r = parseInt(colorHex.slice(0, 2), 16);
  let g = parseInt(colorHex.slice(2, 4), 16);
  let b = parseInt(colorHex.slice(4, 6), 16);

  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

interface PokedexScreenProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: boolean;
  isShiny: boolean;
  isFemale: boolean;
  onToggleGender: () => void;
}

const PokedexScreenFront: React.FC<PokedexScreenProps> = ({ 
  pokemon, 
  loading, 
  error,
  isShiny,
  isFemale,
  onToggleGender
}) => {
  const abilityEffects = useAbilityEffects(pokemon?.abilities || []);
 
  const hasFemaleSprite = pokemon?.sprites.front_female !== null;

  const getSpriteUrl = () => {
    if (!pokemon) return '';
    
    if (isShiny) {
      return isFemale 
        ? pokemon.sprites.front_shiny_female || pokemon.sprites.front_shiny 
        : pokemon.sprites.front_shiny;
    }
    
    return isFemale 
      ? pokemon.sprites.front_female || pokemon.sprites.front_default 
      : pokemon.sprites.front_default;
  };



  if (error) {
    return (
      <div className='pokedex-screen'>
        <img
          src={ErrorPokemon}
          alt='Error loading Pokemon'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className='pokedex-screen'>
        <img
          src={LoadingPokemon}
          alt='Loading Pokemon'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className='pokedex-screen'>
        <img
          src={LoadingPokemon}
          alt='No Pokemon selected'
          className='pokedex-no-screen'
        />
      </div>
    );
  }

  return (
    <div className='pokedex-screen'>
      <div className='pokemon-screen-top'>    
      <h2 className='pokemon-name'>{pokemon.name}</h2>
      </div>
  
      <div className='pokemon-info'>
      <div className="pokemon-img-wrapper">
        <img
          className="pokemon-img"
          src={getSpriteUrl()}

          alt={pokemon.name}
          onError={(e) => {
            // Fallback to default sprite if gender-specific sprite fails to load
            if (isFemale) {
              e.currentTarget.src = isShiny 
                ? pokemon.sprites.front_shiny 
                : pokemon.sprites.front_default;
            }
          }}
        />
      </div>


        <ul className='pokemon-stats'>
          <div className='divTable'>
            <div className='divTableBody'>
              <div className='divTableRow'>
                <div className='divTableCell'>Type</div>
                <div className='divTableCellData'>
                  {pokemon.types.map((types) => (
                    <div
                      className='divTableCellType'
                      key={types.type.name}
                      style={{
                        backgroundColor: colours[types.type.name.toLowerCase()] || 'white'
                      }}
                    >
                      {types.type.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className='divTableRow'>
                <div className='divTableCell'>Height</div>
                <div className='divTableCellData'>
                  {Math.round(pokemon.height * 3.9)}"
                </div>
              </div>
              <div className='divTableRow'>
                <div className='divTableCell'>Weight</div>
                <div className='divTableCellData'>
                  {Math.round(pokemon.weight / 4.3)} lbs
                </div>
              </div>
            </div>
          </div>
        </ul>

        {hasFemaleSprite && (
  <button 
    className={`gender-toggle-switch ${isFemale ? 'female' : 'male'}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent event bubbling
      e.preventDefault(); // Prevent default behavior
      onToggleGender();
    }}
    title={`Switch to ${isFemale ? 'male' : 'female'}`}
  >
    <span className="gender-icon">{isFemale ? '♀' : '♂'}</span>
    <span className="gender-slider"></span>
  </button>
)}
      </div>

      {/* Abilities Section - Displayed below with gap */}
      <div className='abilities-container'>
        <h3 className='abilities-title'>Abilities</h3>
        <div className='abilities-list'>
          {pokemon.abilities.map((ability, index) => (
            <div
              key={index}
              className={`ability-item ${ability.is_hidden ? 'hidden' : ''}`}
              title={ability.ability.name}
              style={{
                backgroundColor: ability.is_hidden
                  ? darkenColor(colours[pokemon.types[0].type.name.toLowerCase()] || 'white', 50) // Darken if hidden
                  : colours[pokemon.types[0].type.name.toLowerCase()] || 'white',
              }}
            >
              <div className='ability-name'>{ability.ability.name}</div>

                {/* Display the EN effect text if available */}
                <div
                  className='ability-tooltip'
                  dangerouslySetInnerHTML={{
                    __html: ability.is_hidden
                      ? `<strong>Hidden Ability:</strong> ${abilityEffects[ability.ability.name] || 'Loading...'}`
                      : abilityEffects[ability.ability.name] || 'Loading...'
                  }}
                />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexScreenFront;
