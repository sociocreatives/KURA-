import Content from '../components/Content/Content';

const ProfilePage = () => {
  return (
    <Content whichPage="Profile">
      <section className="section dashboard">
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-3 p-4">
              <h4 className="card-title">Manage your profile information:</h4>
              <div className="card-body mt-4 pl-4">
                <div className="row">
                  <div className="col-md-8">
                    <h4 className="text-primary"> Vehicle Details</h4>
                    <form>
                      <div className="form-group">
                        <p className="text-secondary">Username</p>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <p className="text-secondary">Email Address</p>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <p className="text-secondary">
                          Enter your Current Password
                        </p>
                        <input
                          type="password"
                          name="password"
                          placeholder="Current Password"
                          className="form-control"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-4 pl-3 pr-3 btn btn-success"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="col-md-4">
                    <h4 className="text-primary"> Change your password</h4>
                    <form>
                      <div className="form-group mt-3">
                        <p className="text-secondary">Current Password</p>
                        <input
                          type="password"
                          name="password"
                          placeholder="Current Password"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <p className="text-secondary">New Password</p>
                        <input
                          type="password"
                          name="new_password"
                          placeholder="New Password"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <p className="text-secondary">Confirm New Password</p>
                        <input
                          type="password"
                          name="confirm_new_password"
                          placeholder="Confirm New Password"
                          className="form-control"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-4 pl-3 pr-3 btn btn-success"
                      >
                        Change Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default ProfilePage;
