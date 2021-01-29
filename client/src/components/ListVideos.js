import React from "react";
import {
  message,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
const ListVideos = () => {
  return (
    <div>
      {[1, 2, 3].map((item) => (
        <div style={{ display: " flex", justifyContent: "center" }}>
          <div>
            <iframe
              width="400"
              height="270"
              src="https://www.youtube.com/embed/vTJdVE_gjI0"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
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
            <h3>movie Title</h3>
            <p>Shared by someone@gmail.com</p>
            <div>
              10 <LikeOutlined /> 10 <DislikeOutlined />
            </div>
            <p>Description</p>
            <i>
              <b>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
              </b>
            </i>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default ListVideos;
