import React from "react";
import { message,Empty } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import "./ListVideos.css";
const ListVideos = ({
  videos,
  likeVideo,
  getAllSharedVideo,
  getShareVideoByUser,
}) => {
  const listVideos =
    videos && videos.length > 0
      ? videos.filter((item) => item.videoDetail)
      : [];
  const handleLike = async (data, id) => {
    likeVideo({ status: 1 }, id);
    await getShareVideoByUser();
  };
  const handleDisLike = async (data, id) => {
    likeVideo({ status: -1 }, id);
    await getShareVideoByUser();
  };
  return (
    <div>
      {listVideos.length > 0 ? listVideos.map((item, index) => {
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
              ></iframe>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "30px",
                width: "30%",
              }}
            >
              <h2>{videoDetail.title}</h2>
              <p>
                Shared by
                {JSON.parse(localStorage.getItem("auth"))?.email ===
                item?.created?.email
                  ? " Me"
                  : item?.created?.email}
              </p>
              <div style={{ fontSize: 18 }}>
                {JSON.parse(localStorage.getItem("auth"))?.token ? (
                  <>
                    <LikeFilled
                      style={{
                        fontSize: 22,
                        cursor: "pointer",
                        margin: "0 5px 0 5px",
                        color: videoDetail.liked == 1 ? "blue" : "inherit",
                      }}
                      onClick={() =>
                        handleLike(videoDetail.like, videoDetail._id)
                      }
                    />
                    <span className={videoDetail.liked == 1 ? "liked" : ""}>
                      {videoDetail.likes}
                    </span>
                    <DislikeFilled
                      style={{
                        fontSize: 22,
                        cursor: "pointer",
                        margin: "0 5px 0 15px",
                        color: videoDetail.liked == -1 ? "blue" : "inherit",
                      }}
                      onClick={() =>
                        handleDisLike(videoDetail.disLike, videoDetail._id)
                      }
                    />
                    <span className={videoDetail.liked == -1 ? "liked" : ""}>
                      {videoDetail.disLikes}
                    </span>
                  </>
                ) : null}
              </div>
              <p style={{ marginTop: 20,fontWeight:900 }}>Description</p>
              <p>{videoDetail.description.slice(0, 300)}</p>
            </div>
          </div>
        );
      })
    : <Empty description={<span>You have not received or shared any video yet.</span>}/>
    }
      
    </div>
  );
};

export default ListVideos;
