import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClientMetadata {
  id: string;
  nom: string;
  email: string;
  createdAt: string;
  lastModified: string;
}

interface ClientsState {
  availableClients: ClientMetadata[];
  lastActiveClientId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  availableClients: [],
  lastActiveClientId: null,
  isLoading: false,
  error: null
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setAvailableClients: (state, action: PayloadAction<ClientMetadata[]>) => {
      state.availableClients = action.payload;
    },
    
    addClient: (state, action: PayloadAction<ClientMetadata>) => {
      const existingIndex = state.availableClients.findIndex(c => c.id === action.payload.id);
      if (existingIndex >= 0) {
        state.availableClients[existingIndex] = action.payload;
      } else {
        state.availableClients.push(action.payload);
      }
    },
    
    removeClient: (state, action: PayloadAction<string>) => {
      state.availableClients = state.availableClients.filter(c => c.id !== action.payload);
      if (state.lastActiveClientId === action.payload) {
        state.lastActiveClientId = null;
      }
    },
    
    setLastActiveClient: (state, action: PayloadAction<string>) => {
      state.lastActiveClientId = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setAvailableClients,
  addClient,
  removeClient,
  setLastActiveClient,
  setLoading,
  setError
} = clientsSlice.actions;

export default clientsSlice.reducer;