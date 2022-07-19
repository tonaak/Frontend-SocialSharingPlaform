import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as apiCalls from "../api/apiCalls";
import HoaxView from "./HoaxView";
import Modal from "./Modal";
import Spinner from "./Spinner";

const HoaxFeed = (props) => {
  const [page, setPage] = useState({ content: [] });
  const [isLoadingHoaxes, setLoadingHoaxes] = useState(false);
  const [isLoadingOldHoaxes, setLoadingOldHoaxes] = useState(false);
  const [isLoadingNewHoaxes, setLoadingNewHoaxes] = useState(false);
  const [isDeletingHoax, setDeletingHoax] = useState(false);
  const [newHoaxCount, setNewHoaxCount] = useState(0);
  const [hoaxToBeDeleted, setHoaxToBeDeleted] = useState();

  const { t } = useTranslation();

  useEffect(() => {
    const loadHoaxes = () => {
      setLoadingHoaxes(true);
      apiCalls.loadHoaxes(props.user).then((response) => {
        setLoadingHoaxes(false);
        setPage(response.data);
      });
    };
    loadHoaxes();
  }, [props.user]);

  useEffect(() => {
    const checkCount = () => {
      const hoaxes = page.content;
      let topHoaxId = 0;
      if (hoaxes.length > 0) {
        topHoaxId = hoaxes[0].id;
      }
      apiCalls.loadNewHoaxCount(topHoaxId, props.user).then((response) => {
        setNewHoaxCount(response.data.count);
      });
    };
    const counter = setInterval(checkCount, 3000);
    return function cleanup() {
      clearInterval(counter);
    };
  }, [props.user, page.content]);

  const onClickLoadMore = () => {
    const hoaxes = page.content;
    if (hoaxes.length === 0) {
      return;
    }
    const hoaxAtBottom = hoaxes[hoaxes.length - 1];
    setLoadingOldHoaxes(true);
    apiCalls
      .loadOldHoaxes(hoaxAtBottom.id, props.user)
      .then((response) => {
        setPage((previousPage) => ({
          ...previousPage,
          last: response.data.last,
          content: [...previousPage.content, ...response.data.content],
        }));
        setLoadingOldHoaxes(false);
      })
      .catch((error) => {
        setLoadingOldHoaxes(false);
      });
  };

  const onClickLoadNew = () => {
    const hoaxes = page.content;
    let topHoaxId = 0;
    if (hoaxes.length > 0) {
      topHoaxId = hoaxes[0].id;
    }
    setLoadingNewHoaxes(true);
    apiCalls
      .loadNewHoaxes(topHoaxId, props.user)
      .then((response) => {
        setPage((previousPage) => ({
          ...previousPage,
          content: [...response.data, ...previousPage.content],
        }));
        setLoadingNewHoaxes(false);
        setNewHoaxCount(0);
      })
      .catch((error) => {
        setLoadingNewHoaxes(false);
      });
  };

  const onClickModelOk = () => {
    setDeletingHoax(true);
    apiCalls.deleteHoax(hoaxToBeDeleted.id).then((response) => {
      setPage((previousPage) => ({
        ...previousPage,
        content: page.content.filter((hoax) => hoax.id !== hoaxToBeDeleted.id),
      }));
      setDeletingHoax(false);
      setHoaxToBeDeleted();
    });
  };
  if (isLoadingHoaxes) {
    return <Spinner />;
  }
  if (page.content.length === 0 && newHoaxCount === 0) {
    return <div className="card card-header text-center">{t("noPost")}</div>;
  }

  const newHoaxCountMessage =
    newHoaxCount === 1
      ? `${t("oneNew")}`
      : `${t("thereAre")} ${newHoaxCount} ${t("newPosts")}`;

  return (
    <div>
      {newHoaxCount > 0 && (
        <div
          className="card card-header text-center"
          onClick={!isLoadingNewHoaxes ? onClickLoadNew : undefined}
          style={{
            cursor: isLoadingNewHoaxes ? "not-allowed" : "pointer",
          }}
        >
          {isLoadingNewHoaxes ? <Spinner /> : newHoaxCountMessage}
        </div>
      )}
      {page.content.map((hoax) => {
        return (
          <HoaxView
            key={hoax.id}
            hoax={hoax}
            onClickDelete={() => setHoaxToBeDeleted(hoax)}
          />
        );
      })}
      {page.last === false && (
        <div
          className="card card-header text-center mb-4"
          onClick={!isLoadingOldHoaxes ? onClickLoadMore : undefined}
          style={{
            cursor: isLoadingOldHoaxes ? "not-allowed" : "pointer",
          }}
        >
          {isLoadingOldHoaxes ? <Spinner /> : `${t("loadMore")}`}
        </div>
      )}
      <Modal
        visible={hoaxToBeDeleted && true}
        onClickCancel={() => setHoaxToBeDeleted()}
        body={hoaxToBeDeleted && `${t("sure")} '${hoaxToBeDeleted.content}'?`}
        title={t("deleteTitle")}
        okButton={t("delete")}
        cancelButton={t("cancel")}
        onClickOk={onClickModelOk}
        pendingApiCall={isDeletingHoax}
      />
    </div>
  );
};

export default HoaxFeed;
