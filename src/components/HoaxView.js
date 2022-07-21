import React, { useEffect } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import timeagoVNLocale from "../timeagoVN";

const HoaxView = (props) => {
  register("vi", timeagoVNLocale);

  const { i18n } = useTranslation();
  const { hoax, onClickDelete } = props;
  const { user, date } = hoax;
  const { username, displayName, image } = user;
  let relativeDate = i18n.language === "vi" ? format(date, "vi") : format(date);
  const attachmentImageVisible =
    hoax.attachment && hoax.attachment.fileType.startsWith("image");
  const attachmentVideoVisible =
    hoax.attachment && hoax.attachment.fileType.startsWith("video");
  const attachmentAudioVisible =
    hoax.attachment && hoax.attachment.fileType.startsWith("audio");

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
      {attachmentVideoVisible && (
        <div className="ps-5">
          <video className="img-fluid" controls>
            <source
              src={`/images/attachments/${hoax.attachment.name}`}
              type="video/mp4"
            />
          </video>
        </div>
      )}
      {attachmentAudioVisible && (
        <div className="ps-5">
          <audio className="w-100" controls>
            <source
              src={`/images/attachments/${hoax.attachment.name}`}
              type="audio/mpeg"
            />
          </audio>
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
