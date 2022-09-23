import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getSingleProfile } from '../../../api/profileData';
import ProfileForm from '../../../components/Forms/ProfileForm';
import Footer from '../../../components/Footer';

export default function EditPost() {
  const [editMyProfile, setEditMyProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProfile(firebaseKey).then(setEditMyProfile);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Uncrafted - Update My Profile</title>
        <meta name="update profile" content="Update my profile page" />
      </Head>
      <div className="center-page">
        <ProfileForm profileObj={editMyProfile} />
      </div>
      <Footer />
    </>
  );
}
