import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Form, FormField } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { useSignUp } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { type TextStyle, View } from 'react-native';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@/lib/utils';

const RESEND_CODE_INTERVAL_SECONDS = 30;

const TABULAR_NUMBERS_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };

export function VerifyEmailForm() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { email = '' } = useLocalSearchParams<{ email?: string }>();
  const schema = z.object({
    code: z
      .string()
      .regex(/^\d{6}$/g, 'Enter the 6-digit code'),
  });
  const form = useForm({
    defaultValues: { code: '' },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const { countdown, restartCountdown } = useCountdown(RESEND_CODE_INTERVAL_SECONDS);

  async function onSubmit(values: z.infer<typeof schema>) {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        return;
      }
      // TODO: Handle other statuses
      // If the status is not complete, check why. User may need to
      // complete further steps.
      console.error(JSON.stringify(signUpAttempt, null, 2));
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        form.setError('code', { type: 'server', message: err.message });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  async function onResendCode() {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      restartCountdown();
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        form.setError('code', { type: 'server', message: err.message });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the verification code sent to {email || 'your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <Form {...form}>
            <View className="gap-6">
              <View className="gap-1.5">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormInput
                      label="Verification code"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      autoComplete="sms-otp"
                      textContentType="oneTimeCode"
                      returnKeyType="send"
                      onSubmitEditing={form.handleSubmit(onSubmit)}
                      {...field}
                    />
                  )}
                />
                <Button variant="link" size="sm" disabled={countdown > 0} onPress={onResendCode}>
                  <Text className="text-center text-xs">
                    Didn&apos;t receive the code? Resend{' '}
                    {countdown > 0 ? (
                      <Text className="text-xs" style={TABULAR_NUMBERS_STYLE}>
                        ({countdown})
                      </Text>
                    ) : null}
                  </Text>
                </Button>
              </View>
              <View className="gap-3">
                <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                  <Text>Continue</Text>
                </Button>
                <Button variant="link" className="mx-auto" onPress={router.back}>
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          </Form>
        </CardContent>
      </Card>
    </View>
  );
}

function useCountdown(seconds = 30) {
  const [countdown, setCountdown] = React.useState(seconds);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = React.useCallback(() => {
    setCountdown(seconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [seconds]);

  React.useEffect(() => {
    startCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startCountdown]);

  return { countdown, restartCountdown: startCountdown };
}
