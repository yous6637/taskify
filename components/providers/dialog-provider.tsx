import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DialogState {
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
    variant: 'default',
    side: 'default',
    type: 'default',
  });

  const showDialog = (config: Omit<DialogState, 'isOpen'>) => {
    setDialogState({
      ...config,
      isOpen: true,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      variant: config.variant || 'default',
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
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
    variant?: 'default' | 'destructive';
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

  const contextValue: DialogContextType = {
    dialogState,
    showDialog,
    hideDialog,
    confirmDialog,
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

// Utility function for easy access to confirmDialog from anywhere in the app
let globalConfirmDialog: ((config: {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

}) => Promise<boolean>) | null = null;

export function setGlobalConfirmDialog(
  confirmDialogFn: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
    type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

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
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';

}): Promise<boolean> {
  if (!globalConfirmDialog) {
    throw new Error('DialogProvider not initialized. Make sure to wrap your app with DialogProvider.');
  }
  return globalConfirmDialog(config);
}
