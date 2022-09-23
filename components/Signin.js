/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>Uncrafted - Sign In</title>
        <meta name="description" content="Meta description for the team page" />
      </Head>
      <div
        className="text-center d-flex justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
          fontWeight: '700',
        }}
      >
        <h1>Sign-in</h1>
        <img src="/./logo.png" alt="Uncrafted Logo" height="500px" width="500px" />
        <h2>Do you keep around too many craft supplies? Yeah me too.</h2>
        <button type="button" className="btn btn-lg copy-btn" style={{ background: 'rgb(143, 68, 255', border: 'rgb(143, 68, 255)', color: 'white' }} onClick={signIn}>
          Let&apos;s trade!
        </button>
      </div>
    </>
  );
}

export default Signin;
