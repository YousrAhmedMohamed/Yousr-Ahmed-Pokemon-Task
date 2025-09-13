import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon, PokemonListResponse } from '../../types'

const baseUrl = import.meta.env.VITE_POKEMON_API_BASE_URL || 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    tagTypes: ['Pokemon'],
    endpoints: (builder) => ({
        getPokemons: builder.query<PokemonListResponse, void>({
            query: () => '/pokemon',

            transformResponse: (response: any) => {
                const results = response.results.map((pokemon: any, id: number) => {
                    let ID = id + 1;

                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        id: ID,
                        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`
                    };
                });

                return {
                    count: response.count,
                    next: response.next,
                    previous: response.previous,
                    results
                };
            },
            providesTags: ['Pokemon'],
        }),
        getPokemon: builder.query<Pokemon, number>({
            query: (id) => `/pokemon/${id}`,
        }),

    }),
})

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonApi