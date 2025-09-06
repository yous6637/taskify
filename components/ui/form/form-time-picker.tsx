import * as React from 'react';
import { TimerPicker } from 'react-native-timer-picker';
import { Button, buttonTextVariants } from '../button';
import type { ButtonChildrenProps } from './button-types';
import { FormItem } from './form';
import { FormLabel } from './form-label';
import { FormDescription } from './form-description';
import { FormMessage } from './form-message';
import { useFormField } from './form';
import { Clock1Icon } from 'lucide-react-native';
import { X } from '~/lib/icons/X';
import { cn } from '~/lib/utils';
import { Text } from '../text';
import { View } from 'react-native';
import type { Override } from './types';
import { Noop } from 'react-hook-form';
import MaskedView from '@react-native-masked-view/masked-view'; // for transparent fade-out
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetCloseTrigger,
  BottomSheetView,
} from '@/components/deprecated-ui/bottom-sheet';
import { Input } from '../input';
import { useColorScheme } from 'nativewind';

interface FormFieldFieldProps<T> {
  name: string;
  onBlur: Noop;
  onChange: (val: T) => void;
  value: T;
  disabled?: boolean;
}

type FormItemProps<T extends React.ElementType<any>, U> = Override<
  React.ComponentPropsWithoutRef<T>,
  FormFieldFieldProps<U>
> & {
  label?: string;
  description?: string;
};

const FormTimePicker = React.forwardRef<
  React.ComponentRef<typeof Input>,
  FormItemProps<typeof Input, string> &  {
    mode?: 'time' | 'countdown';
    is24Hour?: boolean;
    display?: 'default' | 'spinner' | 'compact';
  }
>(({ label, description, value, onChange, mode = 'time', is24Hour = true, display = 'default', ...props }, ref) => {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();
  const initialDate = React.useMemo(() => (value ? new Date(value) : new Date()), [value]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [draft, setDraft] = React.useState<{ hours: number; minutes: number; isAm?: boolean }>(() => {
    const hours24 = initialDate.getHours();
    const minutes = initialDate.getMinutes();
    return {
      hours: is24Hour ? hours24 : ((hours24 + 11) % 12) + 1,
      minutes,
      isAm: hours24 < 12,
    };
  });

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Pick a time';
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: !is24Hour 
      });
    } catch {
      return 'Pick a time';
    }
  };

  function commitDraft() {
    const base = new Date(initialDate);
    let hours24 = draft.hours;
    if (!is24Hour) {
      // convert 12h to 24h using draft.isAm
      const isAm = draft.isAm ?? (base.getHours() < 12);
      hours24 = ((draft.hours % 12) + (isAm ? 0 : 12)) % 24;
    }
    base.setHours(hours24, draft.minutes, 0, 0);
    onChange?.(base.toISOString());
  }

  const TimerPickerAny = TimerPicker as any;

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}

      <BottomSheet >
        <BottomSheetOpenTrigger asChild>
          <Input
            className='flex-row gap-3 justify-start px-3 relative'
            aria-labelledby={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-invalid={!!error}
            LeftIcon={() => <Clock1Icon size={18} />}
            RightIcon={() => <X size={18} className='text-muted-foreground text-xs' />}
            onChangeText={onChange}
            value={formatTime(value)}
            {...props}
          />
            
        </BottomSheetOpenTrigger>

        <BottomSheetContent snapPoints={["60%"]} enableBlurKeyboardOnGesture = {true} enableDynamicSizing = {false}  backgroundStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <BottomSheetHeader className='py-4'>
            <Text className='text-lg font-semibold'>
              {label ? String(label).replace(/\*$/, '') : 'Select time'}
            </Text>
          </BottomSheetHeader>
          <BottomSheetView className='py-4 flex-1 overflow-hidden'>
            <TimerPickerAny
              padWithNItems={2}
              ref={ref}
              hourLabel={':' as any}
              minuteLabel={':' as any}
              secondLabel={'' as any}
              use12HourPicker={!is24Hour}
              onChange={(v: any) => {
                const { hours, minutes, isAmpm, ampm } = v || {};
                setDraft((prev) => ({
                  hours: typeof hours === 'number' ? hours : prev.hours,
                  minutes: typeof minutes === 'number' ? minutes : prev.minutes,
                  isAm: typeof isAmpm === 'boolean' ? isAmpm :
                    typeof ampm === 'string' ? ampm?.toUpperCase?.() === 'AM' : prev.isAm,
                }));
              }}
              // MaskedView={MaskedView}
              styles={{
                theme: isDark ? 'dark' : 'light',
                backgroundColor: 'transparent',
                pickerItem: { fontSize: 20 },
                pickerLabel: { fontSize: 20, marginTop: 0 },
                pickerContainer: { marginRight: 6 },
                pickerItemContainer: { width: 100 },
                pickerLabelContainer: {
                  right: -20,
                  top: 0,
                  bottom: 6,
                  width: 40,
                  alignItems: 'center',
                },
              }}
            />

            <View className='flex-row justify-between mt-6 px-1'>
              <BottomSheetCloseTrigger asChild>
                <Button variant='outline' className='min-w-[120px]'>
                  <Text>Cancel</Text>
                </Button>
              </BottomSheetCloseTrigger>

              <BottomSheetCloseTrigger asChild>
                <Button className='min-w-[120px]' onPress={commitDraft}>
                  <Text>OK</Text>
                </Button>
              </BottomSheetCloseTrigger>
            </View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>

      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormTimePicker.displayName = 'FormTimePicker';

export { FormTimePicker };
