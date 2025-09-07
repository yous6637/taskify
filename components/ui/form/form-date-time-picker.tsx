import * as React from 'react';
import { TimerPicker } from 'react-native-timer-picker';
import { Button, buttonTextVariants } from '../button';
import type { ButtonChildrenProps } from './button-types';
import { FormItem } from './form';
import { FormLabel } from './form-label';
import { FormDescription } from './form-description';
import { FormMessage } from './form-message';
import { useFormField } from './form';
import { LinearGradient } from 'expo-linear-gradient';

import { Clock1Icon } from 'lucide-react-native';
import { X } from '~/lib/icons/X';
import { cn } from '~/lib/utils';
import { Text } from '../text';
import { Keyboard, View } from 'react-native';
import type { Override } from './types';
import { Noop } from 'react-hook-form';
import MaskedView from '@react-native-masked-view/masked-view'; // for transparent fade-out
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
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

const FormDateTimePicker = React.forwardRef<
  React.ComponentRef<typeof Button>,
  FormItemProps<typeof Button, string> &  {
    mode?: 'time' | 'countdown';
    is24Hour?: boolean;
    display?: 'default' | 'spinner' | 'compact';
    placeholder?: string;
  }
>(({ label, description,placeholder, value, onChange, mode = 'time', is24Hour = true, display = 'default', ...props }, ref) => {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();
  const initialDate = React.useMemo(() => (value ? new Date(value) : new Date()), [value]);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isOpen, setIsOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<{ hours: number; minutes: number; isAm?: boolean }>(() => {
    const hours24 = initialDate.getHours();
    const minutes = initialDate.getMinutes();
    return {
      hours: is24Hour ? hours24 : ((hours24 + 11) % 12) + 1,
      minutes,
      isAm: hours24 < 12,
    };
  });

  console.log({time : value})



  

  function commitDraft() {
    try {
   
    onChange?.(`${String(draft.hours).padStart(2, '0')}:${String(draft.minutes).padStart(2, '0')}`);
    setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
    
  }

  function handleCancel() {
    setIsOpen(false);
  }

  const TimerPickerAny = TimerPicker 

  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className='flex-row gap-3 justify-start px-3 relative'
            aria-labelledby={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-disabled={true}
            // aria-invalid={!!error}
            onPress={() => setIsOpen(true)}
            variant={'input'}
            size={"lg"}
            {...props}
          >
           <Clock1Icon className='mr-2' color = {isDark ? "white" : "black"} size={18} />
            <Text className={buttonTextVariants({ variant: 'input', size: 'default' })}>
              {value || placeholder || 'Set time'}
            </Text>
          </Button>

        </DialogTrigger>

        <DialogContent sheet="bottom" size="md" className='dark:bg-gray-900 max-h-[80vh]'>
          <DialogHeader className='py-4'>
            <DialogTitle className='text-lg font-semibold'>
              {label ? String(label).replace(/\*$/, '') : 'Select time'}
            </DialogTitle>
          </DialogHeader>
          <View className='py-4 flex-1 overflow-hidden items-center'>
            <TimerPickerAny
              padWithNItems={2}
              hourLabel={<Text className='text-orange-500'>{":"}</Text>}
              minuteLabel={'' as any}
              hideSeconds
              
              // LinearGradient={LinearGradient}
              use12HourPicker={!is24Hour}
              onDurationChange={(v) => {
                const { hours, minutes, isAmpm, ampm } = v || {};
                console.log({ v });
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
                pickerItem: { fontSize: 30 },
                pickerLabel: { fontSize: 20, marginTop: 0 },
                
                pickerContainer: { marginRight: 6 },
                pickerItemContainer: { width: 100, borderColor: "#F97316", borderTopWidth: 1 },
                pickerLabelContainer: {
                  right: -20,
                  top: 0,
                  bottom: 6,
                  width: 40,
                  alignItems: 'center',
                },
              }}
            />

            <View className='flex-row justify-between gap-3 mt-6 px-1'>
              <DialogClose asChild>
                <Button variant='secondary' className='flex-1' size={"lg"} onPress={handleCancel}>
                  <Text>Cancel</Text>
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button className='flex-1' size={"lg"} onPress={commitDraft}>
                  <Text>Save</Text>
                </Button>
              </DialogClose>
            </View>
          </View>
        </DialogContent>
      </Dialog>

      {!!description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

FormDateTimePicker.displayName = 'FormDateTimePicker';

export { FormDateTimePicker };
