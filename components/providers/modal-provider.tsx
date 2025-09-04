import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormComponentProps {
  onSubmit: (data: any) => void | Promise<void>;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
  // Form-specific properties
  formComponent?: React.ComponentType<FormComponentProps>;
  onFormSubmit?: (data: any) => void | Promise<void>;
  isFormModal?: boolean;
}

interface ModalContextType {
  ModalState: ModalState;
  showModal: (config: Omit<ModalState, 'isOpen'>) => void;
  hideModal: () => void;
  confirmModal: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
  }) => Promise<boolean>;
  showForm: (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
  }) => Promise<any>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [ModalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'default',
    side: 'bottom',
    isFormModal: false,
  });

  const showModal = (config: Omit<ModalState, 'isOpen'>) => {
    setModalState({
      ...config,
      isOpen: true,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      variant: config.variant || 'default',
    });
  };

  const hideModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const confirmModal = (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
    variant?: 'default' | 'destructive';
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log({ config });
      showModal({
        ...config,
        onConfirm: () => {
          hideModal();
          resolve(true);
        },
        onCancel: () => {
          hideModal();
          resolve(false);
        },
      });
    });
  };

  const showForm = (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
  }): Promise<any> => {
    return new Promise((resolve, reject) => {
      setModalState({
        isOpen: true,
        title: config.title,
        description: '', // Not used for form Modals
        confirmText: config.confirmText || 'Submit',
        cancelText: config.cancelText || 'Cancel',
        variant: config.variant || 'default',
        side: config.side,
        isFormModal: true,
        formComponent: config.formComponent,
        onFormSubmit: (data: any) => {
          hideModal();
          resolve(data);
        },
        onCancel: () => {
          hideModal();
          reject(new Error('Form cancelled'));
        },
      });
    });
  };

  const contextValue: ModalContextType = {
    ModalState,
    showModal,
    hideModal,
    confirmModal,
    showForm,
  };

  // Set global functions for easy access
  React.useEffect(() => {
    setGlobalConfirmModal(confirmModal);
    setGlobalShowForm(showForm);
  }, [confirmModal, showForm]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// Utility functions for easy access to Modal functions from anywhere in the app
let globalConfirmModal:
  | ((config: {
      title: string;
      description: string;
      confirmText?: string;
      cancelText?: string;
      variant?: 'default' | 'destructive';
      side?: 'top' | 'bottom';
      align?: 'start' | 'center' | 'end';
      alignOffset?: number;
      sideOffset?: number;
    }) => Promise<boolean>)
  | null = null;

let globalShowForm:
  | ((config: {
      title: string;
      formComponent: React.ComponentType<FormComponentProps>;
      confirmText?: string;
      cancelText?: string;
      variant?: 'default' | 'destructive';
      side?: 'top' | 'bottom';
      align?: 'start' | 'center' | 'end';
      alignOffset?: number;
      sideOffset?: number;
    }) => Promise<any>)
  | null = null;

export function setGlobalConfirmModal(
  confirmModalFn: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
  }) => Promise<boolean>
) {
  globalConfirmModal = confirmModalFn;
}

export function setGlobalShowForm(
  showFormFn: (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    alignOffset?: number;
    sideOffset?: number;
  }) => Promise<any>
) {
  globalShowForm = showFormFn;
}

export function confirmModal(config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
}): Promise<boolean> {
  if (!globalConfirmModal) {
    throw new Error(
      'ModalProvider not initialized. Make sure to wrap your app with ModalProvider.'
    );
  }
  return globalConfirmModal(config);
}

export function showForm(config: {
  title: string;
  formComponent: React.ComponentType<FormComponentProps>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
}): Promise<any> {
  if (!globalShowForm) {
    throw new Error(
      'ModalProvider not initialized. Make sure to wrap your app with ModalProvider.'
    );
  }
  return globalShowForm(config);
}
