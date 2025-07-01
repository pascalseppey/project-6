import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import NotificationCenter from './components/NotificationCenter';
import { useAutoSave, useCrossTabSync, useAppDispatch } from './hooks';
import { setOnlineStatus } from './store/slices/uiSlice';

function App() {
  const dispatch = useAppDispatch();
  
  // Hooks pour la gestion automatique
  useAutoSave();
  useCrossTabSync();
  
  // Gérer le statut de connexion
  useEffect(() => {
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);
  
  return (
    <>
      <Dashboard />
      <NotificationCenter />
    </>
  );
}

export default App;