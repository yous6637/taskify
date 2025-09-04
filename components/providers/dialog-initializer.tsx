import { useEffect } from 'react';
import { useDialog, setGlobalConfirmDialog } from './dialog-provider';
import { ConfirmDialog } from '@/components/confirtm-dialog';

export function DialogInitializer() {
  const { confirmDialog, showForm } = useDialog();

  useEffect(() => {
    // Set the global dialog functions when the component mounts
    setGlobalConfirmDialog(confirmDialog);
  }, [confirmDialog, showForm]);

  // Render the ConfirmDialog component
  return <ConfirmDialog />;
}
