'use client';

import { useState } from 'react';

import { useAppSelector } from '@/lib/store';
import { selectUserData } from '@/lib/store/features/auth/auth-slice';

import ProfileDetail from './profile-detail';
import UserProfileForm from './profile-form';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userData = useAppSelector(selectUserData);

  if (!userData) return undefined;

  const handleToggleEditState = (editStatus: boolean) =>
    setIsEditing(editStatus);

  return (
    <>
      {!isEditing && (
        <ProfileDetail
          handleToggleEditState={handleToggleEditState}
          userData={userData}
        />
      )}

      {isEditing && (
        <UserProfileForm
          handleToggleEditState={handleToggleEditState}
          userData={userData}
        />
      )}
    </>
  );
};

export default UserProfile;
