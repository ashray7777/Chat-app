import React from 'react'

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form>
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="email" class="form-control" id="inputEmail3" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="inputPassword3" />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;