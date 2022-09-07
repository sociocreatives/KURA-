import { useState } from 'react';
import { withRouter } from 'react-router-dom';
// import { endpoints } from 'renderer/api';
import Auth from './../api/auth-service';
import AppLogo from './../icons/logo.png';
import { toast } from 'react-toastify';

const LoginPage = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = async (e: any) => {
    e.preventDefault();

    try {
      const response = await Auth.login(username, password);
      // show message
      console.log('succes', response);
      toast.success('Successfully logged.');
      // console.log(data);

      // // clear message
      setUsername('');
      setPassword('');

      props.history.push('/capture-readings');
      window.location.reload();
    } catch (error: any) {
      toast.error('Invalid credentials or server error');
      return props.history.push('/');
    }
  };
  return (
    <div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-center">
          <div className="card col-md-6 mb-3">
            <div className="text-center mt-5">
              <img
                src={AppLogo}
                className="img-fluid"
                style={{ height: '130px', width: '180px' }}
              />
            </div>
            <div className="card-body mb-5 p-3">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">
                  Login to Your Account
                </h5>
                <p className="text-center small">
                  Enter your username & password to login
                </p>
              </div>

              <div className="row g-3 needs-validation">
                <div className="col-12">
                  <label className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      Username
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      Password
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 mt-5">
                  <button
                    className="btn btn-primary"
                    onClick={(e: any) => authenticateUser(e)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
