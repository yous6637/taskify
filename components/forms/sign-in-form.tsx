import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { Form, FormField } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import * as React from 'react';
import { type TextInput, View } from 'react-native';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@/lib/utils';

export function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const signInSchema = z.object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  

  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const passwordInputRef = React.useRef<TextInput>(null);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        return;
      }
      console.error(JSON.stringify(signInAttempt, null, 2));
    } catch (err) {
      if (err instanceof Error) {
        const isEmailMessage =
          err.message.toLowerCase().includes('identifier') ||
          err.message.toLowerCase().includes('email');
        form.setError(isEmailMessage ? 'email' : 'password', {
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
          <CardTitle className="text-center text-xl sm:text-left">Sign in to Taskify</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <Form {...form}>
            <View className="gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormInput
                    label="Email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <View className="gap-1.5">
                    <View className="flex-row items-center">
                      <Text className="font-medium">Password</Text>
                      <Link asChild href={`/(auth)/forgot-password?email=${form.watch('email')}`}>
                        <Button
                          variant="link"
                          size="sm"
                          className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4">
                          <Text className="font-normal leading-4">Forgot your password?</Text>
                        </Button>
                      </Link>
                    </View>
                    <FormInput
                      // @ts-ignore forwarded ref typing for native Input
                      ref={passwordInputRef}
                      placeholder="********"
                      secureTextEntry
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      returnKeyType="send"
                      onSubmitEditing={form.handleSubmit(onSubmit)}
                    />
                  </View>
                )}
              />

              <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                <Text>Continue</Text>
              </Button>
            </View>
          </Form>

          <Text className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/(auth)/sign-up" className="text-sm underline underline-offset-4">
              Sign up
            </Link>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
