import { ReactChild, ReactChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from 'renderer/api/auth-service';

import AppLogo from './../../icons/logo.png';

interface PropsType {
  children: ReactChild | ReactChildren;
}

export default function Dashboard({ children }: PropsType) {
  const [token, _setToken] = useState(authService.getToken());
  const [user, _setUser] = useState(authService.getStoredUser());
  const logoutUser = (e: any) => {
    console.log(token, user);
    e.preventDefault();
    authService.logout();
    window.location.reload();
  };

  return (
    <>
      <section>
        <aside id="sidebar" className="sidebar">
          <div className="pt-5 pb-3 mt-5 mb-5 text-center">
            <img
              src={AppLogo}
              className="img-fluid"
              style={{ height: '130px', width: '180px' }}
            />
            <h1 className="text-white font-bold-800 mt-4">KURA.</h1>
          </div>
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <Link to="/dashboard" href="/dashboard" className="nav-link">
                <i className="fa fa-home fa-lg" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/capture-readings"
                href="/capture-readings"
                className="nav-link"
              >
                <i className="fa fa-android fa-lg" />
                Capture Readings
              </Link>
            </li>

            {user?.role === 'admin' && token && (
              <>
                <li className="nav-item">
                  <Link
                    to="/user-accounts"
                    href="/user-accounts"
                    className="nav-link"
                  >
                    <i className="fa fa-users fa-lg" />
                    User Accounts
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/settings" href="/settings" className="nav-link">
                    <i className="fa fa-cogs fa-lg" />
                    Settings
                  </Link>
                </li>
              </>
            )}
            {/* to beremoved */}

            <li className="nav-item">
              <button
                style={{ border: 'none' }}
                onClick={(e) => logoutUser(e)}
                className="nav-link"
              >
                <i className="fa fa-user fa-lg" />
                Logout
              </button>
            </li>

            <li className="nav-item signout">
              <Link to="" href="" className="nav-link">
                {/* Logout */}
              </Link>
            </li>
          </ul>
        </aside>
      </section>
      <main id="main" className="main">
        {children}
      </main>
    </>
  );
}
