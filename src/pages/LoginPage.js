import React, { useEffect, useState } from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setApiError();
  }, [username, password]);

  const onClickLogin = () => {
    const body = {
      username,
      password,
    };
    setPendingApiCall(true);
    props.actions
      .postLogin(body)
      .then((response) => {
        setPendingApiCall(false);
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          setPendingApiCall(false);
          setApiError(error.response.data.message);
        }
      });
  };
  let disableSubmit = false;
  if (username === "") {
    disableSubmit = true;
  }
  if (password === "") {
    disableSubmit = true;
  }

  return (
    <div className="container col-5 shadow rounded p-5">
      <h1 className="text-center mb-4">{t("login")}</h1>
      <div className="col-12 mb-4">
        <Input
          label=""
          placeholder={t("usernamePlaceHolder")}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="col-12 mb-4">
        <Input
          label=""
          placeholder={t("passwordPlaceHolder")}
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      {apiError && (
        <div className="col-12 mb-4">
          <div className="alert alert-danger">{apiError}</div>
        </div>
      )}
      <div className="text-center d-grid gap-2 col-12 mx-auto">
        <ButtonWithProgress
          onClick={onClickLogin}
          disabled={disableSubmit || pendingApiCall}
          text={t("login")}
          pendingApiCall={pendingApiCall}
        />
        <p className="fw-bold mt-2 pt-1 mb-0">
          {t("askForSignup")}{" "}
          <Link to="/signup" className="link-danger">
            {t("signup")}
          </Link>
        </p>
      </div>
    </div>
  );
};

LoginPage.defaultProps = {
  actions: {
    postLogin: () => new Promise((resolve, reject) => resolve({})),
  },
  dispatch: () => {},
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postLogin: (body) => dispatch(authActions.loginHandler(body)),
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
