import React, { Component } from "react";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { connect } from "react-redux";
import * as apiCalls from "../api/apiCalls";
import ButtonWithProgress from "./ButtonWithProgress";
import Input from "./Input";
import { Trans } from "react-i18next";
import i18n from "../i18n";

class HoaxSubmit extends Component {
  state = {
    focused: false,
    content: undefined,
    pendingApiCall: false,
    errors: {},
    file: undefined,
    image: undefined,
    video: undefined,
    audio: undefined,
    attachment: undefined,
  };

  onChangeContent = (event) => {
    const value = event.target.value;
    this.setState({ content: value, errors: {} });
  };

  onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let image = undefined;
      let video = undefined;
      let audio = undefined;
      if (file.type.startsWith("image")) {
        image = reader.result;
      }
      if (file.type.startsWith("video")) {
        video = reader.result;
      }
      if (file.type.startsWith("audio")) {
        audio = reader.result;
      }
      this.setState(
        {
          image,
          video,
          audio,
          file,
          errors: {},
        },
        () => {
          this.uploadFile();
        }
      );
    };
    reader.readAsDataURL(file);
  };

  uploadFile = () => {
    const body = new FormData();
    body.append("file", this.state.file);
    apiCalls.postHoaxFile(body).then((response) => {
      this.setState({ attachment: response.data });
    });
  };

  resetState = () => {
    this.setState({
      pendingApiCall: false,
      focused: false,
      content: "",
      errors: {},
      image: undefined,
      video: undefined,
      audio: undefined,
      file: undefined,
      attachment: undefined,
    });
  };

  onClickPost = () => {
    const body = {
      content: this.state.content,
      attachment: this.state.attachment,
      language: i18n.language,
    };
    this.setState({ pendingApiCall: true });
    apiCalls
      .postHoax(body)
      .then((response) => {
        this.resetState();
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data && error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        this.setState({ pendingApiCall: false, errors });
      });
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  render() {
    let textAreaClassName = "form-control w-100";
    if (this.state.errors.content) {
      textAreaClassName += " is-invalid";
    }

    return (
      <div className="card d-flex flex-row p-1">
        <ProfileImageWithDefault
          className="rounded-circle m-1 me-2"
          width="32"
          height="32"
          image={this.props.loggedInUser.image}
        />
        <div className="flex-fill">
          <textarea
            className={textAreaClassName}
            rows={this.state.focused ? 3 : 1}
            onFocus={this.onFocus}
            value={this.state.content}
            onChange={this.onChangeContent}
          />
          {this.state.errors.content && (
            <span className="invalid-feedback">
              {this.state.errors.content}
            </span>
          )}
          {this.state.focused && (
            <div>
              <div className="pt-1 mt-2">
                <Input type="file" onChange={this.onFileSelect} />
                {this.state.errors.attachment && (
                  <span className="invalid-feedback d-block fw-bold mb-2">
                    {this.state.errors.attachment}
                  </span>
                )}
                {this.state.image && (
                  <img
                    className="mt-1 img-thumbnail"
                    src={this.state.image}
                    alt="upload"
                    width="128"
                    height="64"
                  />
                )}
                {this.state.video && (
                  <div className="mt-2">
                    <video width={400} controls poster="placeholder.png">
                      <source
                        src={`${this.state.video}#t=2`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
                {this.state.audio && (
                  <div className="mt-2">
                    <audio controls>
                      <source src={this.state.audio} type="audio/mpeg" />
                    </audio>
                  </div>
                )}
              </div>
              <div className="text-end mt-2">
                <ButtonWithProgress
                  disabled={this.state.pendingApiCall}
                  className="btn btn-success"
                  onClick={this.onClickPost}
                  pendingApiCall={this.state.pendingApiCall}
                  text={<Trans i18nKey={"post"} />}
                />
                <button
                  className="btn btn-light ms-1"
                  onClick={this.resetState}
                  disabled={this.state.pendingApiCall}
                >
                  <i className="fas fa-times" /> {<Trans i18nKey={"cancel"} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state,
  };
};

export default connect(mapStateToProps)(HoaxSubmit);
