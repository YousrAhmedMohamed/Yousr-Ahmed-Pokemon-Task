export interface Pokemon {
    id: number;
    name: string;
    height?: number;
    weight?: number;
    sprites?: {
        front_default: string;
        other?: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types?: {
        type: {
            name: string;
        };
    }[];

}

export interface PokemonListItem {
    name: string;
    url: string;
    id: number;
    imageUrl: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonState {
    selectedPokemon: Pokemon | null;
}