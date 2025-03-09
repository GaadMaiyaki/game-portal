'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CustomErrorType } from '@game-portal/types';
import { ArrowLeft } from 'lucide-react';

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
import { ProfileDataProps, profileSchema } from '@/lib/schemas/profile';
import { updateUserProfile } from '@/lib/api/update-user-profile';
import { useAppDispatch } from '@/lib/store';
import { setUserData } from '@/lib/store/features/auth/auth-slice';

type UserProfileFormProps = {
  handleToggleEditState: (status: boolean) => void;
};

const UserProfileForm = ({ handleToggleEditState }: UserProfileFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<ProfileDataProps>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: '', lastName: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      dispatch(setUserData(data));
      toast.success('Profile successfully updated!', {
        duration: 2000,
      });
      handleToggleEditState(false);
    },
    onError: (error: unknown) => {
      const errorMessage = error as CustomErrorType;
      toast.error(errorMessage?.data?.error ?? 'An error occured', {
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: ProfileDataProps) => mutate(data);

  return (
    <div className="flex h-[85vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <div>
          <Button
            className="cursor-pointer"
            onClick={() => handleToggleEditState(false)}
          >
            <ArrowLeft />
          </Button>

          <h2 className="text-2xl my-4 font-semibold text-center mb-8">
            Edit Profile
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your First Name"
                    className="py-5"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    {...field}
                    className="py-5"
                    placeholder="Enter your Last Name"
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
              {isPending ? 'Editing profile...' : 'Edit Profile'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserProfileForm;
