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

  const handleFormSubmit = async (data: any) => {
    if (dialogState.onFormSubmit) {
      await dialogState.onFormSubmit(data);
    }
  };

  return (
    <AlertDialog open={dialogState.isOpen} onOpenChange={(open) => !open && hideDialog()}>
      <AlertDialogContent
        className={dialogVariants({
          side: dialogState.side,
          type: dialogState.type
        })}
      >
        <AlertDialogHeader className='border-b border-muted-foreground'>
          <AlertDialogTitle className='text-center mb-6'>{dialogState.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          {dialogState.isFormDialog && dialogState.formComponent ? (
            // Render the form component
            <dialogState.formComponent onSubmit={handleFormSubmit} />
          ) : (
            // Render the regular dialog description
            <AlertDialogDescription>
              {dialogState.description}
            </AlertDialogDescription>
          )}
        </AlertDialogBody>
        {!dialogState.isFormDialog && (
          <AlertDialogFooter className='flex-row gap-3 justify-center'>
            <AlertDialogCancel buttonVariant={{ variant: "secondary", size: "lg" }} onPress={handleCancel}>
              <Text>{dialogState.cancelText}</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              onPress={handleConfirm}
              buttonVariant={{ variant: dialogState.variant, size: "lg" }}
              className={"rounded-xl"}
            >
              <Text>{dialogState.confirmText}</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

const dialogVariants = cva(
  // Base classes
  'bg-background border-border z-50 flex flex-col gap-4 border shadow-lg shadow-black/5',
  {
    variants: {
      side: {
        default: cn(
          'w-full max-w-[calc(100%-2rem)] rounded-lg p-6 sm:max-w-lg',
          Platform.select({
            web: 'animate-in fade-in-0 zoom-in-95 duration-200',
          })
        ),
        top: cn(
          'w-full max-w-none rounded-b-lg p-6 fixed top-0 left-0 right-0',
          Platform.select({
            web: 'animate-in slide-in-from-top duration-200',
          })
        ),
        bottom: cn(
          'w-full max-w-none rounded-t-lg p-6 fixed bottom-0 left-0 right-0',
          Platform.select({
            web: 'animate-in slide-in-from-bottom duration-200',
          })
        ),
        left: cn(
          'h-full max-h-none rounded-r-lg p-6 fixed top-0 left-0 bottom-0 w-80 sm:w-96',
          Platform.select({
            web: 'animate-in slide-in-from-left duration-200',
          })
        ),
        right: cn(
          'h-full max-h-none rounded-l-lg p-6 fixed top-0 right-0 bottom-0 w-80 sm:w-96',
          Platform.select({
            web: 'animate-in slide-in-from-right duration-200',
          })
        ),
      },
      type: {
        default: 'relative',
        bottomSheet: cn(
          'fixed h-[50vh] bottom-0 left-0 right-0 w-full max-w-none rounded-t-xl rounded-b-0 p-6',
          Platform.select({
            web: 'animate-in slide-in-from-bottom duration-300',
          })
        ),
        leftSheet: cn(
          'fixed top-0 left-0 bottom-0 h-full max-h-none rounded-r-xl p-6 w-80 sm:w-96',
          Platform.select({
            web: 'animate-in slide-in-from-left duration-300',
          })
        ),
        rightSheet: cn(
          'fixed top-0 right-0 bottom-0 h-full max-h-none rounded-l-xl p-6 w-80 sm:w-96',
          Platform.select({
            web: 'animate-in slide-in-from-right duration-300',
          })
        ),
        fullScreen: cn(
          'fixed inset-0 w-full h-full max-w-none max-h-none rounded-none p-6',
          Platform.select({
            web: 'animate-in fade-in duration-200',
          })
        ),
        modal: cn(
          'relative w-full max-w-[calc(100%-2rem)] rounded-lg p-6 sm:max-w-lg',
          Platform.select({
            web: 'animate-in fade-in-0 zoom-in-95 duration-200',
          })
        ),
        popover: cn(
          'relative w-auto min-w-64 max-w-sm rounded-md p-4 shadow-md',
          Platform.select({
            web: 'animate-in fade-in-0 zoom-in-95 duration-150',
          })
        ),
      },
    },
    defaultVariants: {
      side: 'default',
      type: 'default',
    },
  }
);

// Type definitions for the dialog state
export interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  variant?: 'default' | 'destructive';
  side?: 'default' | 'top' | 'bottom' | 'left' | 'right';
  type?: 'default' | 'bottomSheet' | 'leftSheet' | 'rightSheet' | 'fullScreen' | 'modal' | 'popover';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

// Utility function to create dialog configurations
export const createDialogConfig = (config: Partial<DialogState>): Partial<DialogState> => ({
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  side: 'default',
  type: 'default',
  ...config,
});

// Predefined dialog configurations
export const dialogConfigs = {
  confirmDelete: createDialogConfig({
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    variant: 'destructive',
    type: 'modal',
  }),

  bottomSheetAction: createDialogConfig({
    type: 'bottomSheet',
    confirmText: 'Continue',
  }),

  sidePanel: createDialogConfig({
    type: 'rightSheet',
    confirmText: 'Save',
  }),

  fullScreenEdit: createDialogConfig({
    type: 'fullScreen',
    confirmText: 'Save Changes',
  }),

  quickPopover: createDialogConfig({
    type: 'popover',
    confirmText: 'OK',
  }),
};