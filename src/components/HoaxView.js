import React, { Component } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HoaxView extends Component {
  render() {
    const { hoax, onClickDelete } = this.props;
    const { user, date } = hoax;
    const { username, displayName, image } = user;
    const relativeDate = format(date);
    const attachmentImageVisible =
      hoax.attachment && hoax.attachment.fileType.startsWith("image");

    const ownedByLoggedInUser = user.id === this.props.loggedInUser.id;
    return (
      <div className="card p-1 py-2">
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
              <h6 className="d-inline">
                {displayName}@{username}
              </h6>
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
        <div className="ps-5">{hoax.content}</div>
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
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HoaxView);
