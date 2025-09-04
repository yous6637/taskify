import { useEffect } from 'react';
import { useModal, setGlobalConfirmModal, setGlobalShowForm } from './modal-provider';
import { FormModal } from '@/components/form-modal';

export function ModalInitializer() {
  const { confirmModal, showForm } = useModal();

  useEffect(() => {
    // Set the global modal functions when the component mounts
    setGlobalConfirmModal(confirmModal);
    setGlobalShowForm(showForm)
  }, [confirmModal, showForm]);

  // Render the ConfirmModal component
  return <FormModal />;
}
