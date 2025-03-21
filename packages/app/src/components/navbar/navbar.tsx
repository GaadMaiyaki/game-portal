'use client';

import Link from 'next/link';
import { CustomErrorType, Market } from '@game-portal/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetUserData } from '@/hooks/useGetUserData';
import { logOutUser } from '@/lib/api/log-out';
import { BrandConfigProps } from '@/lib/configs/brand';
import { cn } from '@/lib/utils';

const createNavItems = (
  brandMenu: BrandConfigProps['menu']['items'],
  market: Market | undefined
) => {
  return !market
    ? []
    : brandMenu.map((menu) => ({
        ...menu,
        path: `/${market}${menu.path}`,
      }));
};

type NavbarProps = {
  brandConfigData: BrandConfigProps;
};

const Navbar = ({ brandConfigData }: NavbarProps) => {
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

  const menuPosition = brandConfigData.menu.position;

  return (
    <nav className="sticky top-0 bg-gameportal-header-bg text-gameportal-header-text py-4 px-6 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href={`/${userMarket}`}
            className="flex items-center text-2xl font-bold"
          >
            <Image
              height={100}
              width={100}
              src={brandConfigData.logo.src}
              alt={brandConfigData.logo.alt}
              className="h-[32px] w-[32px] mr-2 rounded-md"
            />
            {brandConfigData.brandName}
          </Link>
        </div>

        <ul
          className={cn('hidden md:flex gap-x-6 flex-1 mx-10', {
            'justify-end': menuPosition === 'left',
            'justify-start': menuPosition === 'right',
          })}
        >
          {createNavItems(brandConfigData.menu.items, userMarket).map(
            ({ label, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className="hover:text-gameportal-secondary-text hover:underline pb-4"
                >
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>

        {!userData ? (
          <Link
            href="/login"
            className="bg-gameportal-background px-4 py-2 rounded-md"
          >
            Login
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="w-[2.7rem] h-[2.7rem] hover:opacity-85 border border-gameportal-border shadow-2xl cursor-pointer">
                <AvatarImage />
                <AvatarFallback className="text-gameportal-primary-text font-semibold shadow">
                  {userData?.firstName?.slice(0, 1)}
                  {userData?.lastName?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-gameportal-background text-gameportal-primary-text p-4 rounded-md shadow-lg mr-5">
              <p className="font-semibold text-center">
                {userData?.firstName} {userData?.lastName}
              </p>
              <Button
                variant="outline"
                className="mt-3 w-full bg-gameportal-background text-left text-gameportal-secondary-accent"
                onClick={handleLogout}
              >
                {isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
