import { useEffect } from 'react';
import { useDialog, setGlobalConfirmDialog, setGlobalShowForm } from './dialog-provider';
import { ConfirmDialog } from '@/components/confirtm-dialog';

export function DialogInitializer() {
  const { confirmDialog, showForm } = useDialog();

  useEffect(() => {
    // Set the global dialog functions when the component mounts
    setGlobalConfirmDialog(confirmDialog);
    setGlobalShowForm(showForm);
  }, [confirmDialog, showForm]);

  // Render the ConfirmDialog component
  return <ConfirmDialog />;
}
