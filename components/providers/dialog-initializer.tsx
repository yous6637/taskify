import { useEffect } from 'react';
import { useDialog, setGlobalConfirmDialog } from './dialog-provider';
import { ConfirmDialog } from '@/components/confirtm-dialog';

export function DialogInitializer() {
  const { confirmDialog } = useDialog();

  useEffect(() => {
    // Set the global confirmDialog function when the component mounts
    setGlobalConfirmDialog(confirmDialog);
  }, [confirmDialog]);

  // Render the ConfirmDialog component
  return <ConfirmDialog />;
}
