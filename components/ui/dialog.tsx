import { Icon } from '@/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/components/ui/native-only-animated-view';
import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Platform, Text, View, type ViewProps } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;


const dialogOverlayVariants = cva(
  'z-50 absolute top-0 bottom-0 w-screen h-screen items-center justify-center bg-black/50',
  {
    variants: {
      position: {
        center: 'fixed inset-0',
        bottom: 'fixed inset-0 items-end',
        top: 'fixed inset-0 items-start',
        left: 'fixed inset-0 justify-start',
        right: 'fixed inset-0 justify-end',
      },
    },
    defaultVariants: {
      position: 'center',
    },
  }
)
interface DialogOverlayProps extends Omit<DialogPrimitive.OverlayProps, 'asChild'>,
  React.RefAttributes<DialogPrimitive.OverlayRef>,
  VariantProps<typeof dialogOverlayVariants> {
  children?: React.ReactNode;
}

function DialogOverlay({
  className,
  children,
  position,
  ...props
}: DialogOverlayProps) {
  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
       
        className={cn(
          dialogOverlayVariants({ position }),
          Platform.select({
            web: 'animate-in fade-in-0 cursor-default [&>*]:cursor-auto',
          }),
          className
        )}
        {...props}
        asChild={Platform.OS !== 'web'}>
        <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <NativeOnlyAnimatedView entering={FadeIn.delay(50)} exiting={FadeOut.duration(150)}>
            <>{children}</>
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
}
interface DialogContentProps extends DialogPrimitive.ContentProps,
  React.RefAttributes<DialogPrimitive.ContentRef>,
  VariantProps<typeof dialogVariants>,
  VariantProps<typeof dialogOverlayVariants> {
  portalHost?: string;
}

function DialogContent({
  className,
  portalHost,
  children,
  sheet,
  modal,
  size,
  position,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay position={position}>
        <DialogPrimitive.Content
          className={cn(
            dialogVariants({ sheet, modal, size }),
            Platform.select({
              web: 'animate-in fade-in-0 zoom-in-95 duration-200',
            }),
            className
          )}
          
          {...props}>
          <>{children}</>
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded opacity-70 active:opacity-100',
              Platform.select({
                web: 'ring-offset-background focus:ring-ring data-[state=open]:bg-accent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
              })
            )}
            hitSlop={12}>
            <Icon
              as={X}
              className={cn('text-accent-foreground web:pointer-events-none size-4 shrink-0')}
            />
            <Text className="sr-only">Close</Text>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ViewProps) {
  return (
    <View className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.TitleProps & React.RefAttributes<DialogPrimitive.TitleRef>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-foreground text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.DescriptionProps & React.RefAttributes<DialogPrimitive.DescriptionRef>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export type DialogVariants = VariantProps<typeof dialogVariants>;

export const dialogVariants = cva(
  // Base styles applied to all dialog variants
  'relative z-50 flex flex-col gap-4 border border-border bg-background p-6 shadow-lg',
  {
    variants: {
      sheet: {
        // Sheet variants - slide in from edges
        bottom: 'h-[50vh] w-screen max-w-none rounded-t-xl border-b-0',
        left: 'h-screen max-w-sm rounded-r-xl border-l-0',
        right: 'h-screen max-w-sm rounded-l-xl border-r-0',
        top: 'w-screen max-w-none rounded-b-xl border-t-0',
      },
      modal: {
        // Modal variants - centered or positioned
        default: 'rounded-lg',
        fullScreen: 'h-screen w-screen max-w-none rounded-none border-0 p-0',
        sidePanel: 'h-screen max-w-md rounded-l-xl border-r-0',
        sidePanelLeft: 'h-screen max-w-md rounded-r-xl border-l-0',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md', 
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        full: 'max-w-full',
      }
    },
    defaultVariants: {
      modal: 'default',
      size: 'lg',
    },
    compoundVariants: [
      // Sheet variants override size
      {
        sheet: 'bottom',
        class: 'h-[85vh] max-w-none'
      },
      {
        sheet: 'top',
        class: 'h-[85vh] max-w-none'
      },
      {
        sheet: ['left', 'right'],
        class: 'max-w-sm'
      },
      // Full screen modal
      {
        modal: 'fullScreen',
        class: 'h-full w-full'
      },
      // Side panels
      {
        modal: ['sidePanel', 'sidePanelLeft'],
        class: 'h-full max-w-md'
      }
    ]
  }
)
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
