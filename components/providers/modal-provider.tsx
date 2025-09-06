import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogVariants } from '../ui/dialog';
export interface FormComponentProps<T extends unknown> {
  onSubmit: (data: T) => void | Promise<void>;
}

interface ModalState<T extends unknown> extends DialogVariants {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  // Form-specific properties
  formComponent?: React.ComponentType<FormComponentProps<T>>;
  onFormSubmit?: <T>(data: T) => void | Promise<T>;
  isFormModal?: boolean;
}

interface ModalContextType<T extends any> extends DialogVariants {
  ModalState: ModalState<T>;
  showModal: (config: Omit<ModalState<T>, 'isOpen'>) => void;
  hideModal: () => void;
  confirmModal: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }) => Promise<boolean>;
  showForm: (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps<T>>;
    confirmText?: string;
    cancelText?: string;
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }) => Promise<T>;
}

const ModalContext = createContext<ModalContextType<any> | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [ModalState, setModalState] = useState<ModalState<any>>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    sheet: 'bottom',
    modal: 'default',
    isFormModal: false,
  });

  const showModal = (config: Omit<ModalState<any>, 'isOpen'>) => {
    setModalState({
      ...config,
      isOpen: true,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
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
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
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
    formComponent: React.ComponentType<FormComponentProps<any>>;
    confirmText?: string;
    cancelText?: string;
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }): Promise<any> => {
    return new Promise((resolve, reject) => {
      console.log({...config})
      setModalState({
        isOpen: true,
        title: config.title,
        description: '', // Not used for form Modals
        confirmText: config.confirmText || 'Submit',
        cancelText: config.cancelText || 'Cancel',
        sheet: config.sheet,
        size: config.size,
        modal: config.modal,
        isFormModal: true,
        formComponent: config.formComponent,
        onFormSubmit: (data) => {
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

  const contextValue: ModalContextType<any> = {
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

export function useModal<T extends any>() {
  const context = useContext(ModalContext) as ModalContextType<T> | undefined;
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
      sheet?: 'bottom' | 'left' | 'right' | 'top';
      modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
      size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
      alignOffset?: number;
      sideOffset?: number;
    }) => Promise<boolean>)
  | null = null;

let globalShowForm:
  | ((config: {
      title: string;
      formComponent: React.ComponentType<FormComponentProps<any>>;
      confirmText?: string;
      cancelText?: string;
      sheet?: 'bottom' | 'left' | 'right' | 'top';
      modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
      size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
    }) => Promise<any>)
  | null = null;

export function setGlobalConfirmModal(
  confirmModalFn: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }) => Promise<boolean>
) {
  globalConfirmModal = confirmModalFn;
}

export function setGlobalShowForm(
  showFormFn: (config: {
    title: string;
    formComponent: React.ComponentType<FormComponentProps<any>>;
    confirmText?: string;
    cancelText?: string;
    sheet?: 'bottom' | 'left' | 'right' | 'top';
    modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  }) => Promise<any>
) {
  globalShowForm = showFormFn;
}

export function confirmModal(config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  sheet?: 'bottom' | 'left' | 'right' | 'top';
  modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
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

export function showForm<T extends any>(config: {
  title: string;
  formComponent: React.ComponentType<FormComponentProps<T>>;
  confirmText?: string;
  cancelText?: string;
  sheet?: 'bottom' | 'left' | 'right' | 'top';
  modal?: 'default' | 'fullScreen' | 'sidePanel' | 'sidePanelLeft';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}): Promise<T> {
  if (!globalShowForm) {
    throw new Error(
      'ModalProvider not initialized. Make sure to wrap your app with ModalProvider.'
    );
  }
  return globalShowForm(config);
}
