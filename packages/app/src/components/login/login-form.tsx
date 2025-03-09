'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CustomErrorType } from '@game-portal/types';

import { loginUser } from '@/lib/api/login';
import { LoginDataProps, loginSchema } from '@/lib/schemas/login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginDataProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Login Successful!', {
        duration: 2000,
      });
      const userMarket = data.registrationCountry;
      router.push(`/${userMarket}`);
    },
    onError: (error: unknown) => {
      const errorMessage = error as CustomErrorType;
      toast.error(errorMessage?.data?.error ?? 'An error occured', {
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: LoginDataProps) => mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl my-4 font-semibold text-center mb-8">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    className="py-5"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    className="py-5"
                    placeholder="Enter your password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn('w-full mt-5 py-6 text-[1rem]', {
                'opacity-50': isPending,
              })}
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
