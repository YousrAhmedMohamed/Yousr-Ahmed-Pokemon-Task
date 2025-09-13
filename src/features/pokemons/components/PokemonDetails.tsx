import React from 'react';
import { useGetPokemonQuery } from '../../apis/pokemon';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { clearSelectedPokemon } from '../pokemonSlice';

export const PokemonDetails: React.FC = () => {
    const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon);
    const dispatch = useAppDispatch();

    const { data: pokemonDetails, isLoading, error } = useGetPokemonQuery(
        selectedPokemon?.id || 0,
        { skip: !selectedPokemon?.id }
    );

    const handleBackClick = () => {
        dispatch(clearSelectedPokemon());
    };
    if (isLoading) return <div>Loading...</div>


    if (error) return <div>Error: {JSON.stringify(error)}</div>

    if (!selectedPokemon) return null;

    const imageUrl = pokemonDetails?.sprites?.front_default || '/placeholder-pokemon.png';

    return (
        <div className="pokemon-details" data-testid="pokemon-details">
            <button onClick={handleBackClick} className="back-button">
                ← Back to List
            </button>


            <div className="pokemon-details-content">
                <div className='title-card'>
                    <h2>{pokemonDetails?.name}</h2>
                </div>

                <img src={imageUrl} alt={pokemonDetails?.name} className="pokemon-detail-image" />

                <div className="pokemon-stats">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">Name:</span>
                            <span className="stat-value">{pokemonDetails?.name} dm</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Height:</span>
                            <span className="stat-value">{pokemonDetails?.height} dm</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Weight:</span>
                            <span className="stat-value">{pokemonDetails?.weight} hg</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Types:</span>
                            <span className="stat-value">
                                <div className="types-list">
                                    {pokemonDetails?.types?.map((type, index) => (
                                        <span key={index}>
                                            {type.type.name}
                                        </span>

                                    ))}
                                </div>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};