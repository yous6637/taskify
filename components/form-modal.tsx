import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useModal } from '@/components/providers/modal-provider';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Animated, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';

export function FormModal() {
  const { ModalState, hideModal } = useModal();
  const insets = useSafeAreaInsets();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(300));
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
    <Modal
      visible={ModalState.isOpen}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={hideModal}
    >
      {/* Backdrop */}
      <Animated.View
        className="flex-1 bg-black/75"
        style={{ opacity: fadeAnim }}
      >
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={hideModal}
        />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View className=" bg-white dark:bg-gray-950 rounded-t-3xl px-6 pt-6 pb-8">
          {/* Handle bar */}
          <View className="w-12 h-1 bg-muted-foreground rounded-full self-center mb-6" />

          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-foreground">
              Create New Goal
            </Text>
            <TouchableOpacity
              onPress={hideModal}
              className="w-8 h-8 bg-primary rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={20} color={'#ffffff'} />
            </TouchableOpacity>
          </View>


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
                size="lg"
                onPress={handleConfirm}
                className="flex-1 rounded-xl"
              >
                <Text>{ModalState.confirmText}</Text>
              </Button>
            </DialogFooter>
          )}
      </View>
      </Animated.View>
    </Modal>
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
