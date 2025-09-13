import React from 'react'
import { useGetPokemonsQuery } from '../apis/pokemon'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSelectedPokemon } from './pokemonSlice';
import type { Pokemon } from '../../types';
import { PokemonDetails } from './components/PokemonDetails';

export const Pokemons: React.FC = () => {
    const { data: pokemons, error, isLoading } = useGetPokemonsQuery();
    const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon);
    const dispatch = useAppDispatch();

    const handlePokemonClick = (pokemon: Pokemon) => {
        dispatch(setSelectedPokemon(pokemon));
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {JSON.stringify(error)}</div>

    if (selectedPokemon) return <PokemonDetails />
    return (
        <div>
            <div className='title-card'>

                <h2>PokeReact</h2>
            </div>
            <ul className='pokemon-card-warpper'>
                {pokemons?.results?.map((pokemon) => <div
                    key={pokemon.name}
                    className="pokemon-card"
                    onClick={() => handlePokemonClick(pokemon)}
                    data-testid={`pokemon-card-${pokemon.name}`}
                >
                    <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        className="pokemon-image"
                    />
                    <div className="pokemon-card-header">
                        <h3>{pokemon.name}</h3>

                    </div>

                </div>


                )}
            </ul>
        </div>
    )
}