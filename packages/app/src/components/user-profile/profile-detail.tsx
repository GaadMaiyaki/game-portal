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
          <div className="space-y-3">
            {[
              { label: 'Username', value: userData.username },
              { label: 'Email', value: userData.email },
              { label: 'First Name', value: userData.firstName },
              { label: 'Last Name', value: userData.lastName },
              { label: 'Country', value: userData.registrationCountry },
            ].map(({ label, value }) => (
              <div key={label} className="flex">
                <span className="text-gameportal-secondary-text font-medium min-w-[120px]">
                  {label}:
                </span>
                <span className="text-gameportal-primary-text font-normal flex-1 capitalize">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <Button
            className="w-full py-6 mt-4 cursor-pointer bg-gameportal-button-bg text-gameportal-button-text cursor-pointer text-[0.95rem] hover:bg-gameportal-button-bg hover:opacity-80"
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
