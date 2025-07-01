import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './';
import { syncFromOtherTab } from '../store/slices/currentClientSlice';

export const useCrossTabSync = () => {
  const dispatch = useAppDispatch();
  const currentClient = useAppSelector(state => state.currentClient.data);
  const channelRef = useRef<BroadcastChannel | null>(null);
  
  useEffect(() => {
    // Créer le canal de communication
    channelRef.current = new BroadcastChannel('beezia-client-sync');
    
    // Écouter les changements des autres onglets
    channelRef.current.onmessage = (event) => {
      const { type, payload } = event.data;
      
      if (type === 'CLIENT_DATA_UPDATED' && payload) {
        dispatch(syncFromOtherTab(payload));
      }
    };
    
    return () => {
      channelRef.current?.close();
    };
  }, [dispatch]);
  
  // Notifier les autres onglets lors de changements
  useEffect(() => {
    if (currentClient && channelRef.current) {
      channelRef.current.postMessage({
        type: 'CLIENT_DATA_UPDATED',
        payload: currentClient
      });
    }
  }, [currentClient]);
};