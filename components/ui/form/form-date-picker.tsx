import * as React from 'react';
import { View } from 'react-native';
import { Button, buttonTextVariants } from '../button';
import type { ButtonChildrenProps } from './button-types';
import { FormItem } from './form';
import { FormLabel } from './form-label';
import { FormDescription } from './form-description';
import { FormMessage } from './form-message';
import { useFormField } from './form';
import { Calendar } from '~/components/deprecated-ui/calendar';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '~/components/deprecated-ui/bottom-sheet';
import { Calendar as CalendarIcon } from '~/lib/icons/Calendar';
import { X } from '~/lib/icons/X';
import { cn } from '~/lib/utils';
import { Text } from '../text';
import type { Override } from './types';
import { Noop } from 'react-hook-form';
import { useColorScheme } from 'nativewind';
import { Input } from '../input';

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

const FormDatePicker = React.forwardRef<
  React.ComponentRef<typeof Input>,
  FormItemProps<typeof Calendar, string> & { placeholder?: string }
>(({ label, description, value, onChange, placeholder = 'Pick a date', ...props }, ref) => {
  const { error, formItemNativeID, formDescriptionNativeID, formMessageNativeID } = useFormField();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  console.log({ value });
  console.log(value.split('T')[0])
  return (
    <FormItem>
      {!!label && <FormLabel nativeID={formItemNativeID}>{label}</FormLabel>}
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Input
            className='flex-row gap-3 justify-start px-3 relative'
            // @ts-ignore
            ref={ref!}
            aria-labelledby={formItemNativeID}
            aria-describedby={
              !error
                ? `${formDescriptionNativeID}`
                : `${formDescriptionNativeID} ${formMessageNativeID}`
            }
            aria-invalid={!!error}
            placeholder={placeholder}
            LeftIcon={() => <CalendarIcon color = {isDark ? "white" : "black"} size={18} />}
            RightIcon={() => <X size={18} className='text-muted-foreground text-xs' />}
            onChangeText={onChange}
            value={value ? (new Date(value).toDateString()) : 'Pick a date'}
          />
           
        </BottomSheetOpenTrigger>
        <BottomSheetContent>
          <BottomSheetView hadHeader={false} className='pt-2'>
            <Calendar
              style={{ height: 358 }}
              date={value ? new Date(value).toISOString() : new Date().toISOString()}
              state="selected"
              minDate={new Date().toISOString()}
              
              onDayPress={(day) => {
                onChange?.(new Date(day.dateString).toISOString() === value ? '' : new Date(day.dateString).toISOString());
              }}
              markedDates={{
                [new Date(value).toISOString() ?? '']: {
                  selected: true,
                },
              }}
              theme={{
                textSectionTitleColor: isDark ? '#9CA3AF' : '#6B7280',
                selectedDayBackgroundColor: '#F97316',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#F97316',
                dayTextColor: isDark ? '#D1D5DB' : '#374151',
                textDisabledColor: isDark ? '#4B5563' : '#9CA3AF',
                dotColor: '#F97316',
                selectedDotColor: '#FFFFFF',
                arrowColor: isDark ? '#FFFFFF' : '#000000',
                monthTextColor: isDark ? '#FFFFFF' : '#000000',
                indicatorColor: isDark ? '#FFFFFF' : '#000000',
                timeLabel: {
                  color: isDark ? '#9CA3AF' : '#6B7280',
                }
              }}
              current={value ? new Date(value).toISOString() : new Date().toISOString()}
              
              {...props}
            />
            <View className={'pb-2 pt-4 flex-row justify-end gap-3'}>
              <BottomSheetCloseTrigger asChild>
                <Button className='flex-1' size={"lg"} variant={"secondary"} >
                  <Text>Save</Text>
                </Button>
              </BottomSheetCloseTrigger>
              <BottomSheetCloseTrigger asChild>
                <Button className='flex-1' size={"lg"} variant={"default"} >
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

FormDatePicker.displayName = 'FormDatePicker';

export { FormDatePicker };
