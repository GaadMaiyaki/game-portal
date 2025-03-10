'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CustomErrorType, UserDataWithoutPassword } from '@game-portal/types';
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
  userData: UserDataWithoutPassword;
};

const UserProfileForm = ({
  handleToggleEditState,
  userData,
}: UserProfileFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<ProfileDataProps>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
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
    <div className="flex h-[82vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-gameportal-card-bg p-6 rounded-lg shadow-md">
        <div>
          <Button
            className="cursor-pointer bg-gameportal-background hover:bg-gameportal-background hover:opacity-75"
            onClick={() => handleToggleEditState(false)}
          >
            <ArrowLeft className="text-gameportal-primary-text" />
          </Button>

          <h2 className="text-2xl my-2 font-semibold text-center mb-5">
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
                  <FormLabel className="text-gameportal-secondary-text">
                    First Name
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your First Name"
                    className="py-5 border border-gameportal-border-secondary"
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
                  <FormLabel className="text-gameportal-secondary-text">
                    Last Name
                  </FormLabel>
                  <Input
                    {...field}
                    className="py-5 border border-gameportal-border-secondary"
                    placeholder="Enter your Last Name"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn(
                'w-full mt-5 py-6 text-[1rem] bg-gameportal-button-bg text-gameportal-button-text hover:bg-gameportal-button-bg hover:opacity-80 cursor-pointer',
                {
                  'opacity-50': isPending,
                }
              )}
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
