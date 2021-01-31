import React, { useEffect, useState } from "react";
import {
  message,
  Modal,
  Select,
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Menu,
  Breadcrumb,
} from "antd";
import { HomeFilled } from "@ant-design/icons";
import ListVideos from "../../components/ListVideos";
import { connect } from "react-redux";
import { signUp, signIn } from "../../redux/auth/actions";
import {
  getAllSharedVideo,
  shareVideo,
  getShareVideoByUser,
} from "../../redux/notifications/actions";
import getYouTubeID from "get-youtube-id";
import { likeVideo } from "../../redux/videoDetails/actions";
import axios from "axios";
const ShareVideo = ({
  signUp,
  auth,
  getAllSharedVideo,
  videos,
  signIn,
  status,
  shareVideo,
  shareStatus,
  likeVideo,
  likeStatus,
  getShareVideoByUser,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleAuth, setVisibleAuth] = useState(false);
  const [inputValue, setInputValue] = useState({
    receiverId: "a",
    url: "",
  });
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...inputValue });
  }, [form, inputValue]);
  useEffect(() => {
    JSON.parse(localStorage.getItem("auth"))?.token
      ? getShareVideoByUser()
      : getAllSharedVideo();
  }, []);
  useEffect(() => {
    if (status) {
      message.info("Sign in success !");
    }
    if (shareStatus) {
      message.info("Share movie success !");
      getShareVideoByUser();
    }
  }, [status, shareStatus]);

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };
  const handleOkShareMovie = () => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${getYouTubeID(
          inputValue.url,
        )}&key=AIzaSyCWJgUOlM3rPhdEn6TVut_5wtNdyPqXIh4&part=snippet,contentDetails,statistics,status`,
      )
      .then(function (response) {
        const data = response.data?.items[0]?.snippet;
        shareVideo({
          url: inputValue.url,
          receiver_by: inputValue.receiverId,
          created_by: "601396222399b1bc44cf236a",
          description: data.description,
          title: data.title,
        });
      })
      .catch(function (error) {});
    setVisible(false);
  };
  const handleOkSignIn = () => {
    setVisibleAuth(false);
    signIn({
      email: inputValue.email,
      password: inputValue.password,
    });
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "20px",
        }}
      >
        <h1 style={{ fontSize: "30px" }}>
          <HomeFilled /> FUNNY MOVIES
        </h1>
        <div>
          {status || JSON.parse(localStorage.getItem("auth"))?.token ? (
            <>
              <span style={{ margin: "0 6px" }}>
                Welcome{" "}
                {JSON.parse(localStorage.getItem("auth"))?.email ||
                  inputValue.email}
              </span>
              <Button
                onClick={() => setVisible(true)}
                style={{ margin: "0 2px" }}
              >
                Share a movie
              </Button>
              <Button
                onClick={() => handleSignOut()}
                style={{ margin: "0 2px" }}
                type=""
                danger
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setVisibleAuth(true)}
                style={{ margin: "0 2px" }}
              >
                Login / Register
              </Button>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          width: "55%",
          height: "3px",
          backgroundColor: "black",
          margin: "0px auto 30px",
        }}
      ></div>
      <ListVideos
        videos={videos}
        likeVideo={likeVideo}
        getAllSharedVideo={getAllSharedVideo}
        getShareVideoByUser={getShareVideoByUser}
        status={status}
      />
      <hr />
      {visible && (
        <Modal
          title={"Share a movie to your friends"}
          visible={visible}
          onOk={handleOkShareMovie}
          onCancel={() => setVisible(false)}
          className="modal-add-edit"
        >
          <Form.Item
            className="form-custom-input"
            label="Receiver Name"
            name="receiverId"
            rules={[
              {
                required: true,
                message: "Vui lòng cocnhập NSD",
              },
            ]}
          >
            <Input
              initialvalues={inputValue.receiverId}
              className="input-custom"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  receiverId: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            className="form-custom-input"
            label="Video URL"
            name="url"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập NSD",
              },
            ]}
          >
            <Input
              placeholder="Paste video URL from Youtube here"
              className="input-custom"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  url: e.target.value,
                });
              }}
            />
          </Form.Item>
          <div>
            <Button
              type="danger"
              href="https://www.youtube.com/"
              target="blank"
            >
              Browse Youtube
            </Button>
          </div>
        </Modal>
      )}
      {visibleAuth && (
        <Modal
          title={"Login / Register"}
          visible={visibleAuth}
          onOk={handleOkSignIn}
          onCancel={() => setVisibleAuth(false)}
          className="modal-add-edit"
        >
          <Form.Item
            className="form-custom-input"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng cnhập NSD",
              },
            ]}
          >
            <Input
              initialvalues={inputValue.email}
              placeholder="email"
              className="input-custom"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  email: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            className="form-custom-input"
            label="Password"
            name="url"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập NSD",
              },
            ]}
          >
            <Input
              initialvalues={inputValue.password}
              placeholder="password"
              className="input-custom"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  password: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Modal>
      )}
    </Layout>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
  videos: state.notifications.videos,
  status: state.auth.status,
  shareStatus: state.notifications.shareStatus,
});

const mapDispatch = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
  getAllSharedVideo: (data) => dispatch(getAllSharedVideo(data)),
  signIn: (data) => dispatch(signIn(data)),
  shareVideo: (data) => dispatch(shareVideo(data)),
  likeVideo: (data, id) => dispatch(likeVideo(data, id)),
  getShareVideoByUser: (data) => dispatch(getShareVideoByUser(data)),
});

export default connect(mapState, mapDispatch)(ShareVideo);
