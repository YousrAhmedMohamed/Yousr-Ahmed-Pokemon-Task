import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, PokemonState } from '../../types';
import { storage } from './utils/storage';

const initialState: PokemonState = {
  selectedPokemon: storage.getSelectedPokemon(),
};
export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
      storage.setSelectedPokemon(action.payload);
    },
    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
      storage.setSelectedPokemon(null);
    },
  },
})

export const { setSelectedPokemon, clearSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;