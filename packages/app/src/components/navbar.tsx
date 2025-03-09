'use client';

import Link from 'next/link';
import { CustomErrorType, Market } from '@game-portal/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetUserData } from '@/hooks/useGetUserData';
import { logOutUser } from '@/lib/api/log-out';

const createNavItems = (market: Market | undefined) =>
  !market
    ? []
    : [
        { label: 'Home', path: `/${market}` },
        { label: 'Casino', path: `/${market}/casino` },
        { label: 'Profile', path: `/${market}/my-profile` },
      ];

const Navbar = () => {
  const userData = useGetUserData();
  const userMarket = userData?.registrationCountry;

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: unknown) => {
      const errorMessage = error as CustomErrorType;
      toast.error(errorMessage?.data?.error ?? 'An error occured', {
        duration: 5000,
      });
    },
  });

  const handleLogout = () => mutate();

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${userMarket}/market`} className="text-2xl font-bold">
            GamePortal
          </Link>
        </div>

        <div className="flex items-center gap-x-16">
          <ul className="hidden md:flex gap-6">
            {createNavItems(userMarket).map(({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="hover:text-gray-300 hover:underline pb-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {!userData ? (
            <Link
              href="/market/login"
              className="bg-blue-600 px-4 py-2 rounded-md"
            >
              Login
            </Link>
          ) : (
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-[2.5rem] h-[2.5rem] hover:opacity-85">
                    <AvatarImage />
                    <AvatarFallback className="text-gray-600 ">
                      {userData?.firstName?.slice(0, 1)}
                      {userData?.lastName?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-gray-100 text-gray-700 p-4 rounded-md shadow-lg mr-5">
                <p className="font-semibold text-center">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <Button
                  variant="outline"
                  className="mt-3 w-full text-left text-red-400"
                  onClick={handleLogout}
                >
                  {isPending ? 'Logging out...' : 'Logout'}
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
