import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
  import { Text } from '@/components/ui/text';
  import { useDialog } from '@/components/providers/dialog-provider';
   
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogState.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onPress={handleCancel}>
              <Text>{dialogState.cancelText}</Text>
            </AlertDialogCancel>
            <AlertDialogAction 
              onPress={handleConfirm}
              className={dialogState.variant === 'destructive' ? 'bg-destructive' : ''}
            >
              <Text>{dialogState.confirmText}</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }