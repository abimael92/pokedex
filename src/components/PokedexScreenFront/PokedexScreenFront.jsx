import React from 'react';
import ErrorPokemon from '../../img/error.gif';
import LoadingPokemon from '../../img/loading.gif';
import './PokedexScreenFront.css';

const colours = {
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

const PokedexScreen = ({ pokemon, loading, error }) => {
	if (error) {
		return (
			<div className='pokedex-screen'>
				<img
					src={ErrorPokemon}
					alt='Hubo un error buscando tu pokemon'
					className='pokedex-no-screen'
				/>
			</div>
		);
	}

	return (
		<div className='pokedex-screen'>
			{!pokemon || loading ? (
				<img
					src={LoadingPokemon}
					alt='Aun no hay ningun pokemon'
					className='pokedex-no-screen'
				/>
			) : (
				<div>
					<h2 className='pokemon-name'>{pokemon.name}</h2>
					<div className='pokemon-info'>
						<img
							className='pokemon-img'
							src={pokemon.sprites.front_default}
							alt={pokemon.name}
						/>

						<ul className='pokemon-stats'>
							<div className='divTable'>
								<div className='divTableBody'>
									<div className='divTableRow'>
										<div className='divTableCell'>Type</div>
										{pokemon.types.map((types) => (
											<div
												className='divTableCellType'
												key={types.type.name}
												style={{
													backgroundColor:
														colours[
															types.type.name
														] || 'white',
												}}>
												{' '}
												{types.type.name}
											</div>
										))}
									</div>
									<div className='divTableRow'>
										<div className='divTableCell'>
											Height
										</div>
										<div className='divTableCell'>
											{Math.round(pokemon.height * 3.9)} "
										</div>
									</div>
									<div className='divTableRow'>
										<div className='divTableCell'>
											Weight
										</div>
										<div className='divTableCell'>
											{Math.round(pokemon.weight / 4.3)}{' '}
											lbs
										</div>
									</div>
								</div>
							</div>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};
export default PokedexScreen;
