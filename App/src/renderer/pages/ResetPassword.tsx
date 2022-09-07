const ResetPasswordPage = () => {
  return (
    <div>
      <div className="row">
        <div className="d-flex align-items-center justify-content-center">
          <div className="card col-md-6 mb-3">
            <div className="text-center mt-5">
              <img
                src="https://www.kura.go.ke/images/headers/kuralogo.png"
                className="img-fluid"
                style={{ height: '225px', width: '240px' }}
              />
            </div>
            <div className="card-body mb-5 p-3">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">
                  Reset your Account Password
                </h5>
                <p className="text-center small">
                  Enter your email address.
                  <br />
                  <small>We will send you an email with reset procedure</small>
                </p>
              </div>

              <form className="row g-3 needs-validation">
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="yourEmail"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your email address.
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-5">
                  <button className="btn btn-primary" type="submit">
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
