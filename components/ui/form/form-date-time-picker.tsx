import * as React from 'react';
// import { TimerPicker } from 'react-native-timer-picker';
import {Picker} from '@react-native-picker/picker';

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
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }


  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
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
            onPress={() => setIsOpen(true)}
            {...props}
          />
        </DialogTrigger>

        <DialogContent sheet="bottom" size="md" className='dark:bg-gray-900 max-h-[80vh]'>
          <DialogHeader className='py-4'>
            <DialogTitle className='text-lg font-semibold'>
              {label ? String(label).replace(/\*$/, '') : 'Select time'}
            </DialogTitle>
          </DialogHeader>
          <View className='py-4 flex-1 overflow-hidden items-center'>
            {/* seconds */}
            <Picker >
              {["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"].map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            {/* minutes */}
            <Picker >
              {["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"].map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            {/* hours */}
            <Picker >
              {["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"].map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            
            <Picker>
              {["AM", "PM"].map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            
            
            {/* <TimerPickerAny
              padWithNItems={2}
              hourLabel={':' as any}
              minuteLabel={':' as any}
              secondLabel={'' as any}
              
              use12HourPicker={!is24Hour}
              onDurationChange={(v: any) => {
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
            /> */}

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
