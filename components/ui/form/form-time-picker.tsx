import * as React from 'react';
import { View } from 'react-native';
import { Button, buttonTextVariants } from '../button';
import type { ButtonChildrenProps } from './button-types';
import { FormItem } from './form';
import { FormLabel } from './form-label';
import { FormDescription } from './form-description';
import { FormMessage } from './form-message';
import { useFormField } from './form';

import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetScrollView,
  BottomSheetView,
} from '~/components/deprecated-ui/bottom-sheet';
import { Calendar as CalendarIcon } from '~/lib/icons/Calendar';
import { Text } from '../text';
import type { Override } from './types';
import { Noop } from 'react-hook-form';
import { useColorScheme } from 'nativewind';
import { Input } from '../input';
import { Clock1Icon } from 'lucide-react-native';
// import { DatePicker } from 'react-native-wheel-datepicker';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Calendar } from '@/components/deprecated-ui/calendar';
import { Picker } from '@react-native-picker/picker';

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
  React.ComponentRef<typeof Button>,
  FormItemProps<typeof Calendar, string> & {
    mode?: 'time' | 'countdown';
    is24Hour?: boolean;
    display?: 'default' | 'spinner' | 'compact';
    placeholder?: string;
  }
>(({ label, description, is24Hour, value, onChange, placeholder = 'Pick a date', ...props }, ref) => {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [draft, setDraft] = React.useState<{ hours: number; minutes: number; isAm?: boolean }>(() => {
    const hours24 = value ? parseInt(value.split(':')[0]) : new Date().getHours();
    return {
      hours: value.split(':').length > 0 ? parseInt(value.split(':')[1]) : 0,
      minutes: value.split(':').length > 1 ? parseInt(value.split(':')[2]) : 0,
      isAm: hours24 < 12,
    };
  });

  console.log({ time: value })





  function commitDraft() {
    try {

      onChange?.(`${String(draft.hours).padStart(2, '0')}:${String(draft.minutes).padStart(2, '0')}`);
    } catch (e) {
      console.error(e);
    }

  }

  console.log({ value });
  console.log(value.split('T')[0])
  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <BottomSheet >
        <BottomSheetOpenTrigger asChild>
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
            // onPress={() => setIsOpen(true)}
            variant={'input'}
            size={"lg"}
          // {...props}
          >
            <Clock1Icon className='mr-2' color={isDark ? "white" : "black"} size={18} />
            <Text className={buttonTextVariants({ variant: 'input', size: 'default' })}>
              {value || placeholder || 'Set time'}
            </Text>
          </Button>

        </BottomSheetOpenTrigger>
        <BottomSheetContent snapPoints={["50%"]} enableOverDrag={false} detached={true} >

          <BottomSheetView hadHeader={false} className='pt-2 mx-auto px-10 flex items-center justify-center'>
            <Text className='px-3 pb-2 text-sm text-muted-foreground'>Scroll to set time</Text>
             <View className='py-4 flex-1 flex-row h-[300px] overflow-hidden items-center'>
            {/* seconds */}
            <Picker style = {{height: 300}} className='h-[300px] bg-red-400' >
              <Picker.Item label="Java" value="java" />
  <Picker.Item style = {{color: "white", backgroundColor: "red"}} label="JavaScript" value="js" />
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
                <Picker.Item style={{backgroundColor: "red"}} label={item} value={item} />
              ))}
            </Picker>
            
            <Picker>
              {["AM", "PM"].map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            
            
            {/* <TimerPickerAny
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
            /> */}

           
          </View>
            
            <View className={'pb-2 pt-4 flex-row justify-end gap-3'}>
              <BottomSheetCloseTrigger asChild>
                <Button className='flex-1' size={"lg"} variant={"secondary"} >
                  <Text>Close</Text>
                </Button>
              </BottomSheetCloseTrigger>
              <BottomSheetCloseTrigger asChild>
                <Button onPress={commitDraft} className='flex-1' size={"lg"} variant={"default"} >
                  <Text>Save</Text>
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
