import React, { useState } from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";
import { Link } from "react-router-dom";

export const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    email: "",
    displayName: "",
    username: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onChange = (event) => {
    const { value, name } = event.target;

    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onClickSignup = () => {
    const user = {
      email: form.email,
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };
    setPendingApiCall(true);
    props.actions
      .postSignup(user)
      .then((response) => {
        setPendingApiCall(false);
        props.history.push("/");
      })
      .catch((apiError) => {
        if (apiError.response.data && apiError.response.data.validationErrors) {
          setErrors(apiError.response.data.validationErrors);
        }
        setPendingApiCall(false);
      });
  };

  let passwordRepeatError;
  const { password, passwordRepeat } = form;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? "" : "Does not match to password";
  }

  let emailFormatError;
  const { email } = form;
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email) {
    emailFormatError = email.match(mailformat)
      ? ""
      : `${email} is not a valid email address`;
  }

  return (
    <div className="container col-6 shadow rounded p-5">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <Input
          name="email"
          label="Email Address"
          placeholder="Your email address"
          value={form.email}
          onChange={onChange}
          hasError={emailFormatError && true}
          error={emailFormatError}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="displayName"
          label="Display Name"
          placeholder="Your display name"
          value={form.displayName}
          onChange={onChange}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="username"
          label="Username"
          placeholder="Your username"
          value={form.username}
          onChange={onChange}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="password"
          label="Password"
          placeholder="Your password"
          type="password"
          value={form.password}
          onChange={onChange}
          hasError={errors.password && true}
          error={errors.password}
        />
      </div>
      <div className="col-12 mb-4">
        <Input
          name="passwordRepeat"
          label="Password Repeat"
          placeholder="Repeat your password"
          type="password"
          value={form.passwordRepeat}
          onChange={onChange}
          hasError={passwordRepeatError && true}
          error={passwordRepeatError}
        />
      </div>
      <div className="text-center d-grid gap-2 col-12 mx-auto">
        <ButtonWithProgress
          onClick={onClickSignup}
          disabled={
            pendingApiCall || passwordRepeatError || emailFormatError
              ? true
              : false
          }
          pendingApiCall={pendingApiCall}
          text="Sign Up"
        />
        <p className="fw-bold mt-2 pt-1 mb-0">
          Have already an account?{" "}
          <Link to="/login" className="link-danger">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
  history: {
    push: () => {},
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postSignup: (user) => dispatch(authActions.signupHandler(user)),
    },
  };
};

export default connect(null, mapDispatchToProps)(UserSignupPage);
