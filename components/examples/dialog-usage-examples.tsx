import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { confirmDialog, DialogConfigs } from '@/lib/dialog-utils';
import { useDialog } from '@/components/providers/dialog-provider';

export function DialogUsageExamples() {
  const { showDialog } = useDialog();

  // Example 1: Using the global confirmDialog function
  const handleDeleteItem = async () => {
    const confirmed = await confirmDialog({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (confirmed) {
      console.log('Item deleted!');
      // Perform delete action here
    } else {
      console.log('Delete cancelled');
    }
  };

  // Example 2: Using predefined dialog configs
  const handleDeleteWithConfig = async () => {
    const confirmed = await confirmDialog(DialogConfigs.deleteConfirm);
    
    if (confirmed) {
      console.log('Item deleted with config!');
    }
  };

  // Example 3: Using the context directly for more control
  const handleCustomDialog = () => {
    showDialog({
      title: 'Custom Action',
      description: 'This is a custom dialog with specific handlers.',
      confirmText: 'Proceed',
      cancelText: 'Go Back',
      onConfirm: async () => {
        console.log('Custom confirm action');
        // Add your custom logic here
      },
      onCancel: () => {
        console.log('Custom cancel action');
        // Add your custom cancel logic here
      },
      variant: 'default',
    });
  };

  // Example 4: Async operations in confirm handler
  const handleAsyncOperation = async () => {
    const confirmed = await confirmDialog({
      title: 'Save Changes',
      description: 'Do you want to save your changes before continuing?',
      confirmText: 'Save',
      cancelText: 'Don\'t Save',
    });

    if (confirmed) {
      console.log('Saving...');
      // Simulate async save operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Saved successfully!');
    }
  };

  return (
    <View className="p-4 space-y-4">
      <Text className="text-lg font-semibold mb-4">Dialog Usage Examples</Text>
      
      <Button onPress={handleDeleteItem} variant="destructive">
        <Text>Delete Item (Basic Usage)</Text>
      </Button>

      <Button onPress={handleDeleteWithConfig} variant="destructive">
        <Text>Delete Item (With Config)</Text>
      </Button>

      <Button onPress={handleCustomDialog} variant="outline">
        <Text>Custom Dialog (Context)</Text>
      </Button>

      <Button onPress={handleAsyncOperation} variant="default">
        <Text>Async Save Operation</Text>
      </Button>
    </View>
  );
}

/*
USAGE DOCUMENTATION:

## How to use the Dialog System

### 1. Basic Usage - Global confirmDialog function
```typescript
import { confirmDialog } from '@/lib/dialog-utils';

const handleAction = async () => {
  const confirmed = await confirmDialog({
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    confirmText: 'Yes', // optional, defaults to 'Confirm'
    cancelText: 'No', // optional, defaults to 'Cancel'
    variant: 'destructive' // optional, 'default' or 'destructive'
  });

  if (confirmed) {
    // User clicked confirm
    console.log('Action confirmed');
  } else {
    // User clicked cancel or closed dialog
    console.log('Action cancelled');
  }
};
```

### 2. Using Predefined Configs
```typescript
import { confirmDialog, DialogConfigs } from '@/lib/dialog-utils';

const handleDelete = async () => {
  const confirmed = await confirmDialog(DialogConfigs.deleteConfirm);
  if (confirmed) {
    // Handle delete
  }
};
```

### 3. Using Context for Advanced Control
```typescript
import { useDialog } from '@/components/providers/dialog-provider';

const { showDialog, hideDialog } = useDialog();

const handleAdvancedDialog = () => {
  showDialog({
    title: 'Advanced Dialog',
    description: 'This dialog has custom handlers',
    onConfirm: async () => {
      // Custom confirm logic
      console.log('Custom confirm');
    },
    onCancel: () => {
      // Custom cancel logic
      console.log('Custom cancel');
    }
  });
};
```

### Available Dialog Variants:
- 'default': Standard blue confirm button
- 'destructive': Red confirm button for dangerous actions

### Predefined Configurations:
- DialogConfigs.deleteConfirm
- DialogConfigs.saveChanges
- DialogConfigs.logOut
- DialogConfigs.resetData
*/
