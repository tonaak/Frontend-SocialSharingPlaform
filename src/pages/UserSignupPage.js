import React, { useEffect, useState } from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setErrors({});
  }, [i18n.language]);

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
      language: i18n.language,
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
      password === passwordRepeat ? "" : `${t("passwordNotMatch")}`;
  }

  let emailFormatError;
  const { email } = form;
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email) {
    emailFormatError = email.match(mailformat)
      ? ""
      : `${email} ${t("emailNotValid")}`;
  }

  return (
    <div className="container col-6 shadow rounded p-5 mb-3">
      <h1 className="text-center">{t("signup")}</h1>
      <div className="col-12 mb-3">
        <Input
          name="email"
          label={t("email")}
          placeholder={t("emailHolder")}
          value={form.email}
          onChange={onChange}
          hasError={emailFormatError && true}
          error={emailFormatError}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="displayName"
          label={t("displayName")}
          placeholder={t("displayNameHolder")}
          value={form.displayName}
          onChange={onChange}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="username"
          label={t("username")}
          placeholder={t("usernamePlaceHolder")}
          value={form.username}
          onChange={onChange}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          name="password"
          label={t("password")}
          placeholder={t("passwordPlaceHolder")}
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
          label={t("passwordRepeat")}
          placeholder={t("passwordRepeatHolder")}
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
          text={t("signup")}
        />
        <p className="fw-bold mt-2 pt-1 mb-0">
          {t("askForLogin")}{" "}
          <Link to="/login" className="link-danger">
            {t("login")}
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
