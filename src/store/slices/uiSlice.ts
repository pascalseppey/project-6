import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: string;
  sidebarCollapsed: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: string;
  }>;
  isOnline: boolean;
  lastSyncAttempt: string | null;
}

const initialState: UIState = {
  activeTab: 'Dashboard',
  sidebarCollapsed: false,
  notifications: [],
  isOnline: navigator.onLine,
  lastSyncAttempt: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      state.notifications.unshift(notification);
      
      // Garder seulement les 10 dernières notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    
    setLastSyncAttempt: (state, action: PayloadAction<string>) => {
      state.lastSyncAttempt = action.payload;
    }
  }
});

export const {
  setActiveTab,
  setSidebarCollapsed,
  addNotification,
  removeNotification,
  clearNotifications,
  setOnlineStatus,
  setLastSyncAttempt
} = uiSlice.actions;

export default uiSlice.reducer;