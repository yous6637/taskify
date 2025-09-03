// Re-export the confirmDialog function for easy access throughout the app
export { confirmDialog } from '@/components/providers/dialog-provider';

// Common dialog configurations for reusability
export const DialogConfigs = {
  deleteConfirm: {
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'destructive' as const,
  },
  
  saveChanges: {
    title: 'Save Changes',
    description: 'Do you want to save the changes you made?',
    confirmText: 'Save',
    cancelText: 'Discard',
    variant: 'default' as const,
  },
  
  logOut: {
    title: 'Log Out',
    description: 'Are you sure you want to log out of your account?',
    confirmText: 'Log Out',
    cancelText: 'Cancel',
    variant: 'default' as const,
  },
  
  resetData: {
    title: 'Reset Data',
    description: 'This will reset all your data to default values. This action cannot be undone.',
    confirmText: 'Reset',
    cancelText: 'Cancel',
    variant: 'destructive' as const,
  },
} as const;
