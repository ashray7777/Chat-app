import React from 'react';
import  Signup  from '../components/Authentication/Signup';
import  Login  from '../components/Authentication/Login';

const Homepage = () => {

  return (
    <div class="container-xl d-flex justify-content-center align-items-center flex-column">
    <div class="d-flex justify-content-center p-3 bg-primary text-white w-50 m-40px 0 15px 0 rounded-lg border mt-5">
        <h1 class="display-4 fw-bolder">Chat-App</h1>
    </div>
    <div class="bg-white w-50 p-4 rounded-lg border">
        <ul class="nav nav-pills nav-justified mb-1em" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="login-tab" data-bs-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="signup-tab" data-bs-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">Sign Up</a>
        </li>
        </ul>
        <div class="tab-content">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
            <Login />
        </div>
        <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
            <Signup />
        </div>
        </div>
    </div>
    </div>

  )
}

export default Homepage