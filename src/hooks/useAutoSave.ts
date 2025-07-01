import { useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useAppSelector, useAppDispatch } from './';
import { setSaving, setSaved, setError } from '../store/slices/currentClientSlice';
import { addNotification } from '../store/slices/uiSlice';

export const useAutoSave = () => {
  const dispatch = useAppDispatch();
  const { data: currentClient, hasUnsavedChanges, isSaving } = useAppSelector(state => state.currentClient);
  const { isOnline } = useAppSelector(state => state.ui);
  
  // Référence pour éviter les sauvegardes multiples
  const savingRef = useRef(false);
  
  // Fonction de sauvegarde avec debounce
  const debouncedSave = useRef(
    debounce(async (clientData) => {
      if (savingRef.current || !clientData) return;
      
      try {
        savingRef.current = true;
        dispatch(setSaving(true));
        
        // Simuler l'API de sauvegarde (à remplacer par vraie API)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sauvegarder dans localStorage comme fallback
        localStorage.setItem(`beezia-client-${clientData.id}`, JSON.stringify(clientData));
        
        dispatch(setSaved());
        dispatch(addNotification({
          type: 'success',
          message: `Client "${clientData.metadata.nom}" sauvegardé automatiquement`
        }));
        
        console.log('✅ Client sauvegardé automatiquement:', clientData.metadata.nom);
        
      } catch (error) {
        console.error('❌ Erreur sauvegarde:', error);
        dispatch(setError('Erreur lors de la sauvegarde automatique'));
        dispatch(addNotification({
          type: 'error',
          message: 'Erreur lors de la sauvegarde automatique'
        }));
      } finally {
        savingRef.current = false;
        dispatch(setSaving(false));
      }
    }, 3000) // 3 secondes de debounce
  ).current;
  
  // Déclencher la sauvegarde automatique
  useEffect(() => {
    if (currentClient && hasUnsavedChanges && isOnline && !isSaving) {
      debouncedSave(currentClient);
    }
  }, [currentClient, hasUnsavedChanges, isOnline, isSaving, debouncedSave]);
  
  // Nettoyer le debounce au démontage
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);
  
  // Sauvegarder avant fermeture de page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
};