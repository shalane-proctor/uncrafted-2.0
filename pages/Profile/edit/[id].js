import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProfileForm from '../../../components/Forms/ProfileForm';
import Footer from '../../../components/Footer';
import { getSingleUser } from '../../../api/new/userData';

export default function EditProfile() {
  const [editMyProfile, setEditMyProfile] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setEditMyProfile);
  }, [id]);

  return (
    <>
      <Head>
        <title>Uncrafted - Update My Profile</title>
        <meta name="update profile" content="Update my profile page" />
      </Head>
      <div className="center-page">
        <ProfileForm user={editMyProfile} />
      </div>
      <Footer />
    </>
  );
}
