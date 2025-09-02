import { cn } from '@/lib/utils';
import { Platform, TextInput, View, type TextInputProps } from 'react-native';

type AdditionalProps = {
  LeftIcon?: () => React.ReactNode;
  RightIcon?: () => React.ReactNode;
};

type Props = TextInputProps & React.RefAttributes<TextInput> & AdditionalProps;
function Input({ className, placeholderClassName, LeftIcon, RightIcon, ...props }: Props) {
  return (
    <View
      className={cn(
        'flex-row items-center rounded-lg border border-input bg-background px-3 py-1 text-base leading-5 text-foreground shadow-sm shadow-black/5 dark:bg-input/30 sm:h-10',
        props.editable === false &&
          cn(
            'opacity-50',
            Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
          ),
        Platform.select({
          web: cn(
            'outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
          ),
          native: 'placeholder:text-muted-foreground/50',
        }),
        className
      )}>
      {LeftIcon && (
        <View className="mr-2">
          <LeftIcon />
        </View>
      )}
      <TextInput
        className={cn('flex focus-visible:border-none w-full border-none min-w-0 flex-row items-center', placeholderClassName)}
        {...props}
      />
      {RightIcon && (
        <View className="ml-2">
          <RightIcon />
        </View>
      )}
    </View>
  );
}

export { Input };
