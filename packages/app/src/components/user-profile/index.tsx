'use client';

import { useState } from 'react';

import ProfileDetail from './profile-detail';
import UserProfileForm from './profile-form';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditState = (editStatus: boolean) =>
    setIsEditing(editStatus);

  return (
    <>
      {!isEditing && (
        <ProfileDetail handleToggleEditState={handleToggleEditState} />
      )}

      {isEditing && (
        <UserProfileForm handleToggleEditState={handleToggleEditState} />
      )}
    </>
  );
};

export default UserProfile;
