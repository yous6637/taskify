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
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
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
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

  }) => Promise<boolean>;
  showForm: (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps>;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
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
    side: 'default',
    type: 'default',
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
    setModalState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const confirmModal = (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
    variant?: 'default' | 'destructive';
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log({ config })
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
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
  }): Promise<any> => {
    return new Promise((resolve, reject) => {
      setModalState({
        isOpen: true,
        title: config.title,
        description: '', // Not used for form Modals
        confirmText: config.confirmText || 'Submit',
        cancelText: config.cancelText || 'Cancel',
        variant: config.variant || 'default',
        side: config.side || 'default',
        type: config.type || 'default',
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

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// Utility functions for easy access to Modal functions from anywhere in the app
let globalConfirmModal: ((config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

}) => Promise<boolean>) | null = null;

let globalShowForm: ((config: {
  title: string;
  formComponent: React.ComponentType<FormComponentProps>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
}) => Promise<any>) | null = null;

export function setGlobalConfirmModal(
  confirmModalFn: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

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
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
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
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

}): Promise<boolean> {
  if (!globalConfirmModal) {
    throw new Error('ModalProvider not initialized. Make sure to wrap your app with ModalProvider.');
  }
  return globalConfirmModal(config);
}

export function showForm(config: {
  title: string;
  formComponent: React.ComponentType<FormComponentProps>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
}): Promise<any> {
  if (!globalShowForm) {
    throw new Error('ModalProvider not initialized. Make sure to wrap your app with ModalProvider.');
  }
  return globalShowForm(config);
}
