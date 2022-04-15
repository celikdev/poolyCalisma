import {configureStore} from '@reduxjs/toolkit';
import mainReducer from './slices/Main';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
