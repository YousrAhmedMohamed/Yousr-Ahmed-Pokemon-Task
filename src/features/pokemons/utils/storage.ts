import type { Pokemon } from "../../../types";

const STORAGE_KEYS = {
    SELECTED_POKEMON: 'selected_pokemon'
};

export const storage = {

    getSelectedPokemon: (): Pokemon | null => {
        try {
            const pokemon = localStorage.getItem(STORAGE_KEYS.SELECTED_POKEMON);
            return pokemon ? JSON.parse(pokemon) : null;
        } catch {
            return null;
        }
    },

    setSelectedPokemon: (pokemon: Pokemon | null): void => {
        if (pokemon) {
            localStorage.setItem(STORAGE_KEYS.SELECTED_POKEMON, JSON.stringify(pokemon));
        } else {
            localStorage.removeItem(STORAGE_KEYS.SELECTED_POKEMON);
        }
    },


};

