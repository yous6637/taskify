import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Form, FormField } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { useSignIn } from '@clerk/clerk-expo';
import { LockIcon } from 'lucide-react-native';
import * as React from 'react';
import { TextInput, View } from 'react-native';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@/lib/utils';
export function ResetPasswordForm() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const resetSchema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    code: z
      .string()
      .regex(/^\d{6}$/g, 'Enter the 6-digit code'),
  });

 
  const form = useForm({
    defaultValues: { password: '', code: '' },
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  });

  const codeInputRef = React.useRef<TextInput>(null);

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: values.code,
        password: values.password,
      });

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        const isPasswordMessage = err.message.toLowerCase().includes('password');
        form.setError(isPasswordMessage ? 'password' : 'code', {
          type: 'server',
          message: err.message,
        });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Reset password</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the code sent to your email and set a new password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <Form {...form}>
            <View className="gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormInput
                    // @ts-ignore forwarded ref typing for native Input
                    ref={undefined}
                    label="New password"
                    secureTextEntry
                    LeftIcon={() => <LockIcon className="size-4" />}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => codeInputRef.current?.focus()}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormInput
                    // @ts-ignore forwarded ref typing for native Input
                    ref={codeInputRef}
                    label="Verification code"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    returnKeyType="send"
                    onSubmitEditing={form.handleSubmit(onSubmit)}
                  />
                )}
              />

              <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                <Text>Reset Password</Text>
              </Button>
            </View>
          </Form>
        </CardContent>
      </Card>
    </View>
  );
}
