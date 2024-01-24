import { useState } from "react";
// import { useHistory } from "react-router";

const Signup = () => {
  //   const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    // Your existing code for form submission
  };

  const postDetails = (pics) => {
    // Your existing code for handling picture upload
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form>
            <div class="row mb-3">
              <label for="Name" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input type="name" class="form-control" id="Name" 
                placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input type="email" class="form-control" id="email"
                  placeholder="Enter Your Email Address"
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div class="row mb-3">
              <label for="password" class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-7 mx-0 px-0">
                <input type= {show? "text":"password"} class="form-control" id="password"
                  placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div class="col-sm-2 mx-0 px-0">
                <button class="btn btn-primary" type="button" onClick={handleClick}>
                  {show ? "Hide": "Show"}
                </button>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-3 col-form-label">Upload Pic</label>
              <div class="col-sm-9">
                <input type="file" class="form-control" aria-label="file example" required />
                <div class="invalid-feedback">Example invalid form file feedback</div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;
