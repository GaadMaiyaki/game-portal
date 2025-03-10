'use client';

import { UserDataWithoutPassword } from '@game-portal/types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ProfileDetailProps = {
  handleToggleEditState: (status: boolean) => void;
  userData: UserDataWithoutPassword;
};

const ProfileDetail = ({
  handleToggleEditState,
  userData,
}: ProfileDetailProps) => {
  return (
    <div className="flex justify-center items-center h-[82vh] p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg bg-gameportal-card-bg border-none">
        <CardHeader>
          <CardTitle className="text-center text-gameportal-secondary-text text-xl font-semibold">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="font-medium">
              <span className="text-gameportal-secondary-text">Username:</span>
              &nbsp;
              <span className="text-gameportal-primary-text font-normal">
                {userData.username}
              </span>
            </p>
            <p className=" font-medium">
              <span className="text-gameportal-secondary-text">Email:</span>
              &nbsp;
              <span className="text-gameportal-primary-text font-normal">
                {userData.email}
              </span>
            </p>
            <p className="font-medium">
              <span className="text-gameportal-secondary-text">
                First Name:
              </span>
              &nbsp;
              <span className="text-gameportal-primary-text font-normal">
                {userData.firstName}
              </span>
            </p>
            <p className="text-gameportal-primary-text font-medium">
              <span className="text-gameportal-secondary-text">Last Name:</span>
              &nbsp;
              <span className="text-gameportal-primary-text font-normal">
                {userData.lastName}
              </span>
            </p>
            <p className="font-medium">
              <span className="text-gameportal-secondary-text">Country:</span>
              &nbsp;
              <span className="text-gameportal-primary-text font-normal">
                {userData.registrationCountry}
              </span>
            </p>
          </div>
          <Button
            className="w-full py-6 mt-4 cursor-pointer bg-gameportal-button-bg text-gameportal-button-text hover:bg-gameportal-button-bg hover:opacity-80"
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
