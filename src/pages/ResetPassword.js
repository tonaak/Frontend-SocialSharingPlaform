import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();
  const search = useLocation().search;

  const vi = { "Accept-Language": "vi-VN,vi;" };
  const en = { "Accept-Language": "en-US,en;" };

  useEffect(() => {
    const tokenParams = new URLSearchParams(search).get("token");
    setToken(tokenParams);
  }, [search, token]);

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const onClickSubmit = () => {
    setPendingApiCall(true);
    const body = {
      password,
    };
    axios
      .post(`/api/1.0/reset_password?token=${token}`, body, {
        headers: i18n.language === "vi" ? vi : en,
      })
      .then((response) => {
        setPendingApiCall(false);
        alert(`${t("passwordChanged")}`);
        props.history.push("/login");
      })
      .catch((error) => {
        setPendingApiCall(false);
        setError(`${t("invalidToken")}`);
      });
  };

  let passwordRepeatError;
  if (password || passwordRepeat) {
    passwordRepeatError =
      password === passwordRepeat ? "" : `${t("passwordNotMatch")}`;
  }

  let passwordFormatError;
  let passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (password) {
    passwordFormatError = password.match(passwordFormat)
      ? ""
      : `${t("invalidPassword")}`;
  }

  return (
    <div className="container col-5 shadow rounded p-5">
      <h2 className="text-center mb-4">{t("resetPassword")}</h2>
      <div className="col-12 mb-3">
        <Input
          name="password"
          label={t("newPassword")}
          placeholder={t("passwordPlaceHolder")}
          type="password"
          value={password}
          onChange={onChangePassword}
          hasError={passwordFormatError && true}
          error={passwordFormatError}
        />
      </div>
      <div className="col-12 mb-4">
        <Input
          name="passwordRepeat"
          label={t("passwordRepeat")}
          placeholder={t("passwordRepeatHolder")}
          type="password"
          value={passwordRepeat}
          onChange={onChangePasswordRepeat}
          hasError={passwordRepeatError && true}
          error={passwordRepeatError}
        />
      </div>
      <div className="text-center d-grid gap-2 col-12 mx-auto">
        <ButtonWithProgress
          onClick={onClickSubmit}
          disabled={
            password === "" ||
            passwordFormatError ||
            pendingApiCall ||
            passwordRepeatError
              ? true
              : false
          }
          pendingApiCall={pendingApiCall}
          text={t("resetPassword")}
        />
      </div>
      <div className="mt-2 text-center text-danger">{error}</div>
    </div>
  );
};

export default ResetPassword;
