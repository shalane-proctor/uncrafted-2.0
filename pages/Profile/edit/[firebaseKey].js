import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProfile } from '../../../api/profileData';
import ProfileForm from '../../../components/Forms/ProfileForm';

export default function EditPost() {
  const [editMyProfile, setEditMyProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProfile(firebaseKey).then(setEditMyProfile);
  }, [firebaseKey]);

  return <ProfileForm profileObj={editMyProfile} />;
}
