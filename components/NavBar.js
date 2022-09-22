/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md" style={{ background: 'rgb(143, 68, 255)', color: 'white' }}>
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" style={{ color: 'white' }}>
            Uncrafted
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

// export default function NavBar() {
//   const { user } = useAuth();
//   return (
//     <Navbar
//       expand="lg"
//       style={{
//         marginBottom: '1.5rem',
//         marginLeft: '0px',
//         justifyContent: 'space-evenly',
//         background: '#D9D9D9',
//       }}
//     >
//       <Container>
//         <Navbar.Brand href="/" style={{ fontSize: '2rem', marginLeft: '20px', color: '#FF0001' }}>
//           Uncrafted <img src="" alt="Dice" height="40px" width="40px" />
//         </Navbar.Brand>
//         {/* <NavDropdown title={<img className="thumbnail-image" src={user.photoURL} alt="Profile Pic" style={{ width: '30%', borderRadius: '50%' }} />} id="basic-nav-dropdown" style={{ padding: '0px' }}> */}
//           <NavDropdown.Item href="/profile">
//             <a className="nav-link">Profile</a>
//           </NavDropdown.Item>
//           <NavDropdown.Item href="/trades">
//           <a className="nav-link">View My Trades</a></NavDropdown.Item>
//           <NavDropdown.Item href="/messages">Messages</NavDropdown.Item>
//           <NavDropdown.Item href="/Profile/Messages/newMsg">New Message</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
//         </NavDropdown>
//   );
// }
