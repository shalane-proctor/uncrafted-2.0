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
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Sign-in</h1>
        <p>Do you keep around too many craft supplies? Yeah me too.</p>
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Let&apos;s trade!
        </button>
      </div>
    </>
  );
}

export default Signin;
