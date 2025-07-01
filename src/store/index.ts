import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import clientsSlice from './slices/clientsSlice';
import currentClientSlice from './slices/currentClientSlice';
import uiSlice from './slices/uiSlice';

const persistConfig = {
  key: 'beezia-root',
  storage,
  whitelist: ['clients', 'ui'] // Ne pas persister currentClient (rechargé depuis JSON)
};

const rootReducer = combineReducers({
  clients: clientsSlice,
  currentClient: currentClientSlice,
  ui: uiSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;