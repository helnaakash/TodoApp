import React from "react";
import useLogin from "./useLogin";

const Login = () => {
  const { formik } = useLogin();

  return (
    <div>
      <div className="log-box">
        <div className="row  justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow">
              <div className="card-title text-center border-bottom">
                <h2 className="log-text p-3">LOG IN</h2>
              </div>
              <div className="card-body">
                <form
                  className="log-form"
                  autoComplete="off"
                  // onSubmit={}
                >
                  <div className="mb-4">
                    <label name="Username" className="sign-text form-label">
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      placeholder="Please enter username"
                      name="username"
                      onChange={formik?.handleChange}
                      value={formik.values.username}
                    />
                    {formik.errors.username && (
                      <span className="input-error form-floating">
                        {" "}
                        {formik.errors.username}
                      </span>
                    )}
                  </div>

                  <div className="mb-5">
                    <label name="password" className="sign-text form-label">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="password"
                      placeholder="Please enter password"
                      name="password"
                      onChange={formik?.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && (
                      <span className="input-error form-floating">
                        {" "}
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="sign-submit d-grid">
                      <button
                        type="submit"
                        onClick={formik?.handleSubmit}
                        className="sign-text btn text-light main-bg"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
