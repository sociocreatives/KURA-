import { MemoryRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CaptureReadingsPage from './pages/CapureReadingsPage';
import SettingsPage from './pages/SettingsPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import AuthLayoutRoute from './components/AuthLayout';
import HomePage from './pages/HomePage';

export function AddLibrary(urlOfTheLibrary: any) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

export default function App() {
  return (
    <div>
      <Router>
        <Dashboard>
          <Switch>
            <AuthLayoutRoute path="/" exact component={LoginPage} />
            <ProtectedRoute
              path="/reset-password"
              exact
              component={ResetPasswordPage}
            />
            <ProtectedRoute path="/dashboard" exact component={HomePage} />
            <ProtectedRoute
              path="/capture-readings"
              exact
              component={CaptureReadingsPage}
            />
            <ProtectedRoute path="/settings" exact component={SettingsPage} />
            <ProtectedRoute
              path="/user-accounts"
              exact
              component={UserAccountPage}
            />
          </Switch>
        </Dashboard>
      </Router>
      <ToastContainer />
    </div>
  );
}
