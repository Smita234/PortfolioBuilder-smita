import { Formik } from "formik";
import { Button, Card, CardContent } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// //import "./signup.css";
import app_config from "../config";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../useContext";

const SignIn = () => {
  const url = app_config.api_url;

  const { setCurrentUser } = useContext(UserContext);

  //   // Two important thing to use with Formik
  //   // 1. formObject
  const signinForm = {
    email: "",
    password: "",
  };

  //   // 2. submit callback function
  const SignInSubmit = (formdata) => {
    console.log(formdata);

    // three things are required to request
    // 1. address
    // 2. http request method
    // 3. data and its format

    const reqOpt = {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url + "/user/check-login", reqOpt)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "You have loggdin successfully!",
          });
        } else if (res.status === 300) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Email or password is incorrect!",
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
      });
  };

  return (
    <div className="signup-bg">
      <h1 className="text-center">SignIn Here</h1>
      <hr />
      <div className="col-md-4 mx-auto">
        <Card>
          <CardContent>
            <Formik initialValues={signinForm} onSubmit={SignInSubmit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <label className="mt-3">Email</label>
                  <input
                    placeholder="email"
                    className="form-control"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                  />

                  <label className="mt-3">Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    className="w-100 mt-5"
                    variant="contained"
                    color="secondary"
                    // startIcon={<GoogleIcon />}
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
