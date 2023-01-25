/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md" style={{ background: 'rgb(143, 68, 255)', color: 'white' }}>
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" href="#">
            <img src="/./logo.png" alt="Uncrafted Logo" width="40" height="40" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: 'white' }}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li>
              <Link passHref href="/">
                <a className="nav-link" style={{ color: 'white' }}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link passHref href="/profile">
                <a className="nav-link" style={{ color: 'white' }}>
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link passHref href="/messages">
                <a className="nav-link" style={{ color: 'white' }}>
                  Messages
                </a>
              </Link>
            </li>
            <li>
              <Link passHref href="/Profile/new">
                <a className="nav-link" style={{ color: 'white' }}>
                  Create Profile
                </a>
              </Link>
            </li>
            <button type="button" className="btn" style={{ backgroundColor: 'white' }} onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
