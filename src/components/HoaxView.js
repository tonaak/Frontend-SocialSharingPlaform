import React, { useEffect } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const HoaxView = (props) => {
  const locale = function (number, index, totalSec) {
    return [
      ["vừa xong", "một lúc"],
      ["%s giây trước", "trong %s giây"],
      ["1 phút trước", "trong 1 phút"],
      ["%s phút trước", "trong %s phút"],
      ["1 giờ trước", "trong 1 giờ"],
      ["%s giờ trước", "trong %s giờ"],
      ["1 ngày trước", "trong 1 ngày"],
      ["%s ngày trước", "trong %s ngày"],
      ["1 tuần trước", "trong 1 tuần"],
      ["%s tuần trước", "trong %s tuần"],
      ["1 tháng trước", "trong 1 tháng"],
      ["%s tháng trước", "trong %s tháng"],
      ["1 năm trước", "trong 1 năm"],
      ["%s năm trước", "trong %s năm"],
    ][index];
  };
  register("vi", locale);

  const { i18n } = useTranslation();
  const { hoax, onClickDelete } = props;
  const { user, date } = hoax;
  const { username, displayName, image } = user;
  let relativeDate = i18n.language === "vi" ? format(date, "vi") : format(date);
  const attachmentImageVisible =
    hoax.attachment && hoax.attachment.fileType.startsWith("image");

  const ownedByLoggedInUser = user.id === props.loggedInUser.id;

  useEffect(() => {
    //eslint-disable-next-line
    relativeDate = i18n.language === "vi" ? format(date, "vi") : format(date);
  }, [i18n.language]);

  return (
    <div className="card p-1 py-2 mb-4">
      <div className="d-flex">
        <ProfileImageWithDefault
          className="rounded-circle m-1 mb-0"
          width="32"
          height="32"
          image={image}
        />
        <div className="flex-fill m-auto my-0 ps-2">
          <Link
            to={`/${username}`}
            className="list-group-item-action text-decoration-none"
          >
            <h6 className="d-inline">{displayName}</h6>
          </Link>
          <span className="text-black-50"> - </span>
          <span className="text-black-50">{relativeDate}</span>
        </div>
        {ownedByLoggedInUser && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onClickDelete}
          >
            <i className="far fa-trash-alt" />
          </button>
        )}
      </div>
      <div className="ps-5 mb-2">{hoax.content}</div>
      {attachmentImageVisible && (
        <div className="ps-5">
          <img
            alt="attachment"
            src={`/images/attachments/${hoax.attachment.name}`}
            className="img-fluid"
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HoaxView);
