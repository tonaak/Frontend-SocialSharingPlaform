import React, { useEffect, useRef, useState } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import timeagoVNLocale from "../timeagoVN";
import axios from "axios";
import useClickTracker from "../shared/useClickTracker";
import HoaxSubmit from "./HoaxSubmit";

const HoaxView = (props) => {
  register("vi", timeagoVNLocale);
  const actionArea = useRef();
  const dropDownVisible = useClickTracker(actionArea);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);
  const [isEditMode, setEditMode] = useState(false);

  const { t, i18n } = useTranslation();
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

  const [content, setContent] = useState(hoax.content);
  const [attachment, setAttachment] = useState(hoax.attachment);

  const ownedByLoggedInUser = user.id === props.loggedInUser.id;

  let dropDownClass = "p-0 shadow-sm dropdown-menu";
  if (dropDownVisible) {
    dropDownClass += " show d-grid";
  }

  useEffect(() => {
    //eslint-disable-next-line
    relativeDate = i18n.language === "vi" ? format(date, "vi") : format(date);
  }, [i18n.language]);

  useEffect(() => {
    axios.get(`/api/1.0/hoaxes/${hoax.id}/likecount`).then((response) => {
      setCountLike(response.data);
    });
    axios.get(`/api/1.0/hoaxes/${hoax.id}/dislikecount`).then((response) => {
      setCountDislike(response.data);
    });
    axios.get(`/api/1.0/hoaxes/${hoax.id}/react`).then((response) => {
      if (response.data === "like") {
        setLike(true);
        setDislike(false);
      }
      if (response.data === "dislike") {
        setDislike(true);
        setLike(false);
      }
      if (response.data === "nothing") {
        setLike(false);
        setDislike(false);
      }
    });
  });

  const onClickLike = () => {
    if (!like) {
      axios.post(`/api/1.0/hoaxes/${hoax.id}/like`);
      setLike(true);
      setDislike(false);
    } else {
      axios.post(`/api/1.0/hoaxes/${hoax.id}/unlike`);
      setLike(false);
    }
  };

  const onClickDislike = () => {
    if (!dislike) {
      axios.post(`/api/1.0/hoaxes/${hoax.id}/dislike`);
      setDislike(true);
      setLike(false);
    } else {
      axios.post(`/api/1.0/hoaxes/${hoax.id}/undislike`);
      setDislike(false);
    }
  };

  return (
    <div className="card p-1 py-2 mb-4">
      {isEditMode && (
        <HoaxSubmit
          hoaxId={hoax.id}
          focused={true}
          content={content}
          attachment={attachment}
          setEditMode={setEditMode}
          isEditMode={isEditMode}
          setContent={setContent}
          setAttachment={setAttachment}
        />
      )}
      {!isEditMode && (
        <div>
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
              <div className="dropdown">
                <span
                  className="btn btn-sm btn-light dropdown-toggle"
                  ref={actionArea}
                />
                <div className={dropDownClass}>
                  <button
                    className="btn text-start dropdown-item rounded-0 py-2"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <i className="far fa-edit w-25" /> {t("edit")}
                  </button>
                  <button
                    className="btn text-start dropdown-item rounded-0 py-2"
                    onClick={onClickDelete}
                  >
                    <i className="far fa-trash-alt w-25" /> {t("delete")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="ps-5 mb-2">{content}</div>
          {attachmentImageVisible && (
            <div className="ps-5">
              <img
                alt="attachment"
                src={`/images/attachments/${attachment.name}`}
                className="img-fluid"
              />
            </div>
          )}
          {attachmentVideoVisible && (
            <div className="ps-5">
              <video className="img-fluid" controls>
                <source
                  src={`/images/attachments/${attachment.name}`}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
          {attachmentAudioVisible && (
            <div className="ps-5">
              <audio className="w-100" controls>
                <source
                  src={`/images/attachments/${attachment.name}`}
                  type="audio/mpeg"
                />
              </audio>
            </div>
          )}
          <div className="ps-5 mt-2 d-flex text-grey">
            <div className="col-6 text-center">
              <button
                className="p-2 rounded border-0 bg bg-transparent"
                onClick={onClickLike}
              >
                {!like && (
                  <i className="far fa-thumbs-up text-secondary">
                    <span className="ms-2">{countLike > 0 && countLike}</span>
                  </i>
                )}
                {like && (
                  <i className="fas fa-thumbs-up text-success">
                    <span className="ms-2">{countLike}</span>
                  </i>
                )}
              </button>
            </div>
            <div className="col-6 text-center">
              <button
                className="p-2 rounded border-0 bg bg-transparent"
                onClick={onClickDislike}
              >
                {!dislike && (
                  <i className="far fa-thumbs-down text-secondary">
                    <span className="ms-2">
                      {countDislike > 0 && countDislike}
                    </span>
                  </i>
                )}
                {dislike && (
                  <i className="fas fa-thumbs-down text-danger">
                    <span className="ms-2">{countDislike}</span>
                  </i>
                )}
              </button>
            </div>
          </div>
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
