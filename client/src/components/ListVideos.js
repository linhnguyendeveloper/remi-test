import React from "react";
import { message } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

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
      {listVideos.map((item, index) => {
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
                width="400"
                height="270"
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
                Shared by{" "}
                {JSON.parse(localStorage.getItem("auth"))?.email ===
                item?.created?.email
                  ? " Me"
                  : item?.created?.email}
              </p>
              <div style={{ fontSize: 18 }}>
                {JSON.parse(localStorage.getItem("auth"))?.token ? (
                  <>
                    {videoDetail.likes}

                    <LikeOutlined
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                        margin: "0 10px 0 3px",
                      }}
                        
                      onClick={() =>
                        handleLike(videoDetail.like, videoDetail._id)
                      }
                    />
                    {videoDetail.disLikes}
                    <DislikeOutlined
                      style={{
                        fontSize: 20,
                        cursor: "pointer",
                        margin: "0 10px 0 3px",
                      }}
                      onClick={() =>
                        handleDisLike(videoDetail.disLike, videoDetail._id)
                      }
                    />
                  </>
                ) : null}
              </div>
              <p style={{ marginTop: 20 }}>Description</p>
              <p>{videoDetail.description.slice(0, 250)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListVideos;
