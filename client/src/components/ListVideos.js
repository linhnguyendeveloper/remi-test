import React from "react";
import { Empty } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import "./ListVideos.scss";
const ListVideos = ({
  videos,
  likeVideo,
  getShareVideoByUser,
}) => {
  const listVideos =
    videos && videos.length > 0
      ? videos.filter((item) => item.videoDetail)
      : [];
  const handleLike = async (data, id) => {
    await likeVideo({ status: 1 }, id);
    // await getShareVideoByUser();
  };
  const handleDisLike = async (data, id) => {
    await likeVideo({ status: -1 }, id);
    // await getShareVideoByUser();
  };
  return (
    <div>
      {listVideos.length > 0 ? (
        listVideos.map((item, index) => {
          const videoDetail = item.videoDetail;
          return (
            <div
              style={{
                display: " flex",
                justifyContent: "center",
                marginBottom: 30,
              }}
              key={index}
            >
              <div>
                <iframe
                  width="500"
                  height="300"
                  src={videoDetail.url.replace("watch?v=", "embed/")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={videoDetail.url}
                ></iframe>
              </div>
              <div className="video-container">
                <h2>{videoDetail.title}</h2>
                <p>
                  Shared by {" "}
                  {JSON.parse(localStorage.getItem("auth"))?.email ===
                    item?.created?.email
                    ? " Me"
                    : item?.created?.email}
                </p>
                <div className="like-group">
                  {JSON.parse(localStorage.getItem("auth"))?.token ? (
                    <>
                      <LikeFilled
                        className="like-icon"
                        style={{
                          color: videoDetail.liked === 1 ? "blue" : "inherit",
                        }}
                        onClick={() =>
                          handleLike(videoDetail.like, videoDetail._id)
                        }
                      />
                      <span className={videoDetail.liked === 1 ? "liked" : ""}>
                        {videoDetail.likes}
                      </span>
                      <DislikeFilled
                        className="dislike-icon"
                        style={{
                          color: videoDetail.liked === -1 ? "blue" : "inherit",
                        }}
                        onClick={() =>
                          handleDisLike(videoDetail.disLike, videoDetail._id)
                        }
                      />
                      <span className={videoDetail.liked === -1 ? "liked" : ""}>
                        {videoDetail.disLikes}
                      </span>
                    </>
                  ) : null}
                </div>
                <p className="description">Description</p>
                <p>{videoDetail.description.slice(0, 300)}</p>
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          description={<span>There is no video on your list yet .</span>}
        />
      )}
    </div>
  );
};

export default ListVideos;
