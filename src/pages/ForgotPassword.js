import axios from "axios";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";

export const ForgotPassword = (props) => {
  const [email, setEmail] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [status, setStatus] = useState();
  const { t } = useTranslation();

  let emailFormatError;
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email) {
    emailFormatError = email.match(mailformat)
      ? ""
      : `${email} ${t("emailNotValid")}`;
  }

  let disableSubmit = false;
  if (email === "" || email === undefined) {
    disableSubmit = true;
  }

  const onClickSubmit = () => {
    setPendingApiCall(true);
    axios
      .post(`/api/1.0/forgot_password?email=${email}`, email)
      .then((response) => {
        setPendingApiCall(false);
        setStatus(true);
      })
      .catch((error) => {
        setPendingApiCall(false);
        setStatus(false);
      });
  };

  return (
    <div className="container col-5 shadow rounded p-5">
      <h2 className="text-center mb-4">{t("forgotPassword")}</h2>

      <div className="form-group">
        <Input
          placeholder="Email"
          className="w-100"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus();
          }}
          hasError={emailFormatError}
          error={emailFormatError}
        />
      </div>
      <div className="form-group text-center mt-4">
        <ButtonWithProgress
          onClick={onClickSubmit}
          disabled={emailFormatError || pendingApiCall || disableSubmit}
          text={t("resetPassword")}
          pendingApiCall={pendingApiCall}
        />
      </div>
      {status && (
        <div className="text-center text-success mt-2">{t("emailSent")}</div>
      )}
      {status === false && (
        <div className="text-center text-danger mt-2">{t("emailNotSent")}</div>
      )}
    </div>
  );
};

export default ForgotPassword;
