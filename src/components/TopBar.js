import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/troke-logo.png";
import { connect } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import enFlag from "../assets/us_flag.jpg";
import viFlag from "../assets/vn_flag.png";

const lngs = {
  en: { nativeName: "English", imgSrc: enFlag },
  vi: { nativeName: "Vietnamese", imgSrc: viFlag },
};

const TopBar = (props) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const actionArea = useRef();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onClickTracker = (event) => {
      if (!actionArea.current) {
        setDropDownVisible(false);
        return;
      }
      if (dropDownVisible) {
        setDropDownVisible(false);
      } else if (actionArea.current.contains(event.target)) {
        setDropDownVisible(true);
      }
    };
    document.addEventListener("click", onClickTracker);
    return function cleanup() {
      document.removeEventListener("click", onClickTracker);
    };
  }, [actionArea, dropDownVisible]);

  const onClickLogout = () => {
    const action = {
      type: "logout-success",
    };
    props.dispatch(action);
  };

  let links = (
    <ul className="nav navbar-nav ms-auto">
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          {t("signup")}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          {t("login")}
        </Link>
      </li>
    </ul>
  );
  if (props.user.isLoggedIn) {
    let dropDownClass = "p-0 shadow dropdown-menu";
    if (dropDownVisible) {
      dropDownClass += " show";
    }
    links = (
      <ul className="nav navbar-nav ms-auto" ref={actionArea}>
        <li className="nav-item dropdown">
          <div className="d-flex" style={{ cursor: "pointer" }}>
            <ProfileImageWithDefault
              className="rounded-circle m-auto"
              width="32"
              height="32"
              image={props.user.image}
            />
            <span className="nav-link dropdown-toggle">
              {props.user.displayName}
            </span>
          </div>
          <div className={dropDownClass}>
            <Link to={`/${props.user.username}`} className="dropdown-item">
              <i className="fas fa-user text-info" /> {t("myProfile")}
            </Link>

            <span
              className="dropdown-item"
              onClick={onClickLogout}
              style={{
                cursor: "pointer",
              }}
            >
              <i className="fas fa-sign-out-alt text-danger" /> {t("logout")}
            </span>
          </div>
        </li>
      </ul>
    );
  }
  return (
    <div className="bg-white shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand">
          <Link to="/">
            <img src={logo} width="150" alt="troke" />
          </Link>
          <div className="ms-3">
            {Object.keys(lngs).map((lng) => (
              <button
                className="rounded-circle bg-transparent border-0 p-0"
                key={lng}
                type="submit"
                onClick={() => i18n.changeLanguage(lng)}
              >
                <img
                  src={lngs[lng].imgSrc}
                  alt="lang"
                  className="rounded-circle"
                  width="32"
                  height="32"
                  style={{
                    border:
                      i18n.resolvedLanguage === lng
                        ? "#21bbff 3px solid"
                        : "white 3px solid",
                  }}
                ></img>
              </button>
            ))}
          </div>
          {links}
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(TopBar);
