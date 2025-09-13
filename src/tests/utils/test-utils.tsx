import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { pokemonSlice } from '../../features/pokemons/pokemonSlice';

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        pokemon: pokemonSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  const result = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    ...result,
    store,
  };
}


export * from '@testing-library/react';
export { render };