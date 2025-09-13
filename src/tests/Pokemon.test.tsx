import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { render } from './utils/test-utils';
import { Pokemons } from '../features/pokemons/Pokemons';
import { useGetPokemonsQuery, useGetPokemonQuery } from '../features/apis/pokemon';


jest.mock('../features/apis/pokemon', () => ({
    useGetPokemonsQuery: jest.fn(),
    useGetPokemonQuery: jest.fn(),
}));

const mockUseGetPokemonListQuery = useGetPokemonsQuery as jest.Mock;
const mockUseGetPokemonQuery = useGetPokemonQuery as jest.Mock;


const mockPokemonList = {
    count: 3,
    next: null,
    previous: null,
    results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
};


const mockPokemonDetails = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } }
    ],
    abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } }
    ],
    stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } }
    ]
};

describe('Pokemons', () => {
    beforeEach(() => {
        mockUseGetPokemonListQuery.mockReturnValue({
            data: mockPokemonList,
            error: null,
            isLoading: false,
            refetch: jest.fn(),
            isFetching: false,
        });

        mockUseGetPokemonQuery.mockReturnValue({
            data: mockPokemonDetails,
            error: null,
            isLoading: false,
            refetch: jest.fn(),
            isFetching: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state', () => {
        mockUseGetPokemonListQuery.mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
            refetch: jest.fn(),
            isFetching: true,
        });

        render(<Pokemons />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        mockUseGetPokemonListQuery.mockReturnValue({
            data: null,
            error: { message: 'Failed to load' },
            isLoading: false,
            refetch: jest.fn(),
            isFetching: false,
        });

        render(<Pokemons />);
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });

    it('renders pokemon list correctly', () => {
        render(<Pokemons />);
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('ivysaur')).toBeInTheDocument();
        expect(screen.getByText('venusaur')).toBeInTheDocument();
    });

    it('dispatches setSelectedPokemon when a pokemon card is clicked', () => {
        const { store } = render(<Pokemons />);

        const initialState = store.getState();
        expect(initialState.pokemon.selectedPokemon).toBeNull();

        const bulbasaurCard = screen.getByTestId('pokemon-card-bulbasaur');
        fireEvent.click(bulbasaurCard);

        const finalState = store.getState();
        expect(finalState.pokemon.selectedPokemon).toEqual({
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
        });
    });
});