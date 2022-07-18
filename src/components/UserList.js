import { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";
import UserListItem from "./UserListItem";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 3,
  });

  const [loadError, setLoadError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
    //eslint-disable-next-line
  }, []);

  const loadData = (requestedPage = 0) => {
    apiCalls
      .listUsers({ page: requestedPage, size: 4 })
      .then((response) => {
        setPage(response.data);
        setLoadError();
      })
      .catch((error) => {
        setLoadError(`${t("userLoadError")}`);
      });
  };

  const onClickNext = () => {
    loadData(page.number + 1);
  };

  const onClickPrevious = () => {
    loadData(page.number - 1);
  };

  const { content, first, last } = page;

  return (
    <div className="card user-select-none">
      <h3 className="card-title m-auto my-1">{t("people")}</h3>
      <div className="list-group list-group-flush">
        {content.map((user) => {
          return <UserListItem key={user.username} user={user} />;
        })}
      </div>
      <div className="clearfix">
        {!first && (
          <span
            className="badge bg-secondary float-start"
            style={{ cursor: "pointer" }}
            onClick={onClickPrevious}
          >
            {t("previous")}
          </span>
        )}
        {!last && (
          <span
            className="badge bg-secondary float-end"
            style={{ cursor: "pointer" }}
            onClick={onClickNext}
          >
            {t("next")}
          </span>
        )}
      </div>
      {loadError && (
        <span className="text-center text-danger">{loadError}</span>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default connect(mapStateToProps)(UserList);
