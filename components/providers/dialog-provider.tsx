import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FormComponentProps {
  onSubmit: (data: any) => void | Promise<void>;
}

interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  
}

interface DialogContextType {
  dialogState: DialogState;
  showDialog: (config: Omit<DialogState, 'isOpen'>) => void;
  hideDialog: () => void;
  confirmDialog: (config: {
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

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    
  });

  const showDialog = (config: Omit<DialogState, 'isOpen'>) => {
    setDialogState({
      ...config,
      isOpen: true,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
    });
  };

  const hideDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  const confirmDialog = (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log({ config })
      showDialog({
        ...config,
        onConfirm: () => {
          hideDialog();
          resolve(true);
        },
        onCancel: () => {
          hideDialog();
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
      setDialogState({
        isOpen: true,
        title: config.title,
        description: '', // Not used for form dialogs
        confirmText: config.confirmText || 'Submit',
        cancelText: config.cancelText || 'Cancel',
        
      });
    });
  };

  const contextValue: DialogContextType = {
    dialogState,
    showDialog,
    hideDialog,
    confirmDialog,
    showForm,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

// Utility functions for easy access to dialog functions from anywhere in the app
let globalConfirmDialog: ((config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  
}) => Promise<boolean>) | null = null;


export function setGlobalConfirmDialog(
  confirmDialogFn: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    
  }) => Promise<boolean>
) {
  globalConfirmDialog = confirmDialogFn;
}



export function confirmDialog(config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  

}): Promise<boolean> {
  if (!globalConfirmDialog) {
    throw new Error('DialogProvider not initialized. Make sure to wrap your app with DialogProvider.');
  }
  return globalConfirmDialog(config);
}


