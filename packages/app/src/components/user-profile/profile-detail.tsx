'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store';
import { selectUserData } from '@/lib/store/features/auth/auth-slice';

type ProfileDetailProps = {
  handleToggleEditState: (status: boolean) => void;
};

const ProfileDetail = ({ handleToggleEditState }: ProfileDetailProps) => {
  const user = useAppSelector(selectUserData);

  if (!user) return undefined;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="text-gray-700 font-medium">
              Username: <span className="font-normal">{user.username}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Email: <span className="font-normal">{user.email}</span>
            </p>
            <p className="text-gray-700 font-medium">
              First Name: <span className="font-normal">{user.firstName}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Last Name: <span className="font-normal">{user.lastName}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Country:{' '}
              <span className="font-normal">{user.registrationCountry}</span>
            </p>
          </div>
          <Button
            className="w-full py-6 cursor-pointer"
            onClick={() => handleToggleEditState(true)}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
