import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useModal } from '@/components/providers/modal-provider';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function FormModal() {
  const { ModalState, hideModal } = useModal();
    const insets = useSafeAreaInsets();

  const handleConfirm = async () => {
    if (ModalState.onConfirm) {
      await ModalState.onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (ModalState.onCancel) {
      ModalState.onCancel();
    }
    hideModal();
  };

  const handleFormSubmit = async (data: any) => {
    if (ModalState.onFormSubmit) {
      await ModalState.onFormSubmit(data);
    }
  };

  return (
    <Dialog  open={ModalState.isOpen} onOpenChange={(open) => !open && hideModal()}>
      <DialogContent
        className='bg-gray-950 h-screen'
    // @ts-ignore
        align={ModalState.align}
        sideOffset={ModalState.sideOffset}
        alignOffset={ModalState.alignOffset}
        side={ModalState.side}
        insets = {insets}
      >
        <DialogHeader className='border-b-[0.5px] border-gray:200 dark:border-orange-100'>
          <DialogTitle className='text-center mb-6'>{ModalState.title}</DialogTitle>
        </DialogHeader>
        
        {ModalState.isFormModal && ModalState.formComponent ? (
          // Render the form component
          <ModalState.formComponent onSubmit={handleFormSubmit} />
        ) : (
          // Render the regular modal description
          <DialogDescription>
            {ModalState.description}
          </DialogDescription>
        )}
        
        {!ModalState.isFormModal && (
          <DialogFooter className='flex-row gap-3 justify-center'>
            <Button
              variant="secondary"
              size="lg"
              onPress={handleCancel}
              className="flex-1"
            >
              <Text>{ModalState.cancelText}</Text>
            </Button>
            <Button
              variant={ModalState.variant === 'destructive' ? 'destructive' : 'default'}
              size="lg"
              onPress={handleConfirm}
              className="flex-1 rounded-xl"
            >
              <Text>{ModalState.confirmText}</Text>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}



// Type definitions for the modal state (re-exported from modal-provider for convenience)
export interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
  // Form-specific properties
  formComponent?: React.ComponentType<any>;
  onFormSubmit?: (data: any) => void | Promise<void>;
  isFormModal?: boolean;
}

// Utility function to create modal configurations
export const createModalConfig = (config: Partial<ModalState>): Partial<ModalState> => ({
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  side: 'default',
  type: 'default',
  ...config,
});

// Predefined modal configurations
export const modalConfigs = {
  confirmDelete: createModalConfig({
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    variant: 'destructive',
    type: 'modal',
  }),

  bottomSheetAction: createModalConfig({
    type: 'bottomSheet',
    confirmText: 'Continue',
  }),

  sidePanel: createModalConfig({
    type: 'rightSheet',
    confirmText: 'Save',
  }),

  fullScreenEdit: createModalConfig({
    type: 'fullScreen',
    confirmText: 'Save Changes',
  }),

  quickPopover: createModalConfig({
    type: 'popover',
    confirmText: 'OK',
  }),
};
