import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { render } from './utils/test-utils';
import { PokemonDetails } from '../features/pokemons/components/PokemonDetails';
import { useGetPokemonQuery } from '../features/apis/pokemon';


jest.mock('../features/apis/pokemon', () => ({
    useGetPokemonQuery: jest.fn(),
}));

const mockUseGetPokemonByNameQuery = useGetPokemonQuery as jest.Mock;

const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        other: {
            'official-artwork': {
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
            }
        }
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

describe('PokemonDetails', () => {
    beforeEach(() => {
        mockUseGetPokemonByNameQuery.mockReturnValue({
            data: mockPokemon,
            error: null,
            isLoading: false,
            refetch: jest.fn(),
            isFetching: false,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders nothing when no pokemon is selected', () => {
        const { container } = render(<PokemonDetails />);
        expect(container.firstChild).toBeNull();
    });

    it('renders loading state', () => {
        const preloadedState = {
            pokemon: {
                selectedPokemon: { name: 'bulbasaur', id: 1 }
            },
        };

        mockUseGetPokemonByNameQuery.mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
            refetch: jest.fn(),
            isFetching: true,
        });

        render(<PokemonDetails />, { preloadedState });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders pokemon details correctly', () => {
        const preloadedState = {
            pokemon: {
                selectedPokemon: mockPokemon
            },
        };

        render(<PokemonDetails />, { preloadedState });

        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('7 dm')).toBeInTheDocument();
        expect(screen.getByText('69 hg')).toBeInTheDocument();
    });

    it('dispatches clearSelectedPokemon when back button is clicked', () => {
        const preloadedState = {
            pokemon: {
                selectedPokemon: mockPokemon
            },
        };

        const { store } = render(<PokemonDetails />, { preloadedState });

        const initialState = store.getState();
        expect(initialState.pokemon.selectedPokemon).toEqual(mockPokemon);

        const backButton = screen.getByText('← Back to List');
        fireEvent.click(backButton);

        const finalState = store.getState();
        expect(finalState.pokemon.selectedPokemon).toBeNull();
    });
});