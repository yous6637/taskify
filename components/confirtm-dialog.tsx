import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { useDialog } from '@/components/providers/dialog-provider';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Platform } from 'react-native';

export function ConfirmDialog() {
  const { dialogState, hideDialog } = useDialog();

  const handleConfirm = async () => {
    if (dialogState.onConfirm) {
      await dialogState.onConfirm();
    }
    hideDialog();
  };

  const handleCancel = () => {
    if (dialogState.onCancel) {
      dialogState.onCancel();
    }
    hideDialog();
  };

 

  return (
    <AlertDialog open={dialogState.isOpen} onOpenChange={(open) => !open && hideDialog()}>
      <AlertDialogContent
        
      >
        <AlertDialogHeader className='border-b border-muted-foreground'>
          <AlertDialogTitle className='text-center mb-6'>{dialogState.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
         
            // Render the regular dialog description
            <AlertDialogDescription>
              {dialogState.description}
            </AlertDialogDescription>
          
        </AlertDialogBody>
        
          <AlertDialogFooter className='flex-row gap-3 justify-center'>
            <AlertDialogCancel buttonVariant={{ variant: "secondary", size: "lg" }} onPress={handleCancel}>
              <Text>{dialogState.cancelText}</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={handleConfirm}
              buttonVariant={{  size: "lg" }}
              className={"rounded-xl"}
            >
              <Text>{dialogState.confirmText}</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        
      </AlertDialogContent>
    </AlertDialog>
  );
}



// Type definitions for the dialog state
export interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;

  cancelText: string;
  onConfirm?: () => void | Promise<void>;
}

// Utility function to create dialog configurations
export const createDialogConfig = (config: Partial<DialogState>): Partial<DialogState> => ({
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  ...config,
});

// Predefined dialog configurations
export const dialogConfigs = {
  confirmDelete: createDialogConfig({
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
  }),

 
  
};