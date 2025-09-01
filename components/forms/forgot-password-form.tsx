import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Form, FormField } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { useSignIn } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@/lib/utils';

export function ForgotPasswordForm() {
  const { email: emailParam = '' } = useLocalSearchParams<{ email?: string }>();
  const { signIn, isLoaded } = useSignIn();

  const schema = z.object({
    email: z.string().email('Enter a valid email address'),
  });

  const form = useForm({
    defaultValues: { email: String(emailParam) },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: values.email,
      });

      router.push(`/(auth)/reset-password?email=${values.email}`);
    } catch (err) {
      if (err instanceof Error) {
        form.setError('email', { type: 'server', message: err.message });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Forgot password?</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <Form {...form}>
            <View className="gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    label="Email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    {...field}
                    returnKeyType="send"
                    onSubmitEditing={form.handleSubmit(onSubmit)}
                  />
                )}
              />

              <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                <Text>Reset your password</Text>
              </Button>
            </View>
          </Form>
        </CardContent>
      </Card>
    </View>
  );
}
