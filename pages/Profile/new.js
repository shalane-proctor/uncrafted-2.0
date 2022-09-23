import Head from 'next/head';
import React from 'react';
import Footer from '../../components/Footer';
import ProfileForm from '../../components/Forms/ProfileForm';

export default function newProfile() {
  return (
    <>
      <Head>
        <title>Uncrafted - Create Profile</title>
        <meta name="Individula user profile" content="Individual user profile page" />
      </Head>
      <div className="center-page">
        <ProfileForm />
      </div>
      <Footer />
    </>
  );
}
