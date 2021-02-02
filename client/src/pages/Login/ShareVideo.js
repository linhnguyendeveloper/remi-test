import React, { useEffect, useState } from "react";
import { message, Modal, Input, Button, Layout, Typography,Select } from "antd";
import { HomeFilled } from "@ant-design/icons";
import ListVideos from "../../components/ListVideos";
import { connect } from "react-redux";
import { signIn, getUsers } from "../../redux/auth/actions";
import {
  getAllSharedVideo,
  shareVideo,
  getShareVideoByUser,
} from "../../redux/notifications/actions";
import getYouTubeID from "get-youtube-id";
import { likeVideo } from "../../redux/videoDetails/actions";
import axios from "axios";
import "./ShareVideo.scss";
const { Title } = Typography;
const { Option } = Select;

const ShareVideo = ({
  getAllSharedVideo,
  videos,
  signIn,
  status,
  shareVideo,
  shareStatus,
  likeVideo,
  getShareVideoByUser,
  getUsers,
  users,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleAuth, setVisibleAuth] = useState(false);
  const [inputValue, setInputValue] = useState({
    receiver: "a",
    url: "",
  });
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth"))?.token) {
      getShareVideoByUser();
      getUsers();
    } else getAllSharedVideo();
  }, []);
  useEffect(() => {
    if (shareStatus) {
      message.info("Share movie success !");
      getShareVideoByUser();
    }
  }, [shareStatus]);
  useEffect(() => {
    if (status && status.token) {
      message.info("Sign in success !");
    }
    if (status && status.errors) {
      message.error(status.errors);
    }
  }, [status]);

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
          receiver_by: inputValue.receiver,
          created_by: "",
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
  const handleOpenShareModal = () => {
    setVisible(true);
  };
  const usersSelect =
    users.length > 0
      ? users.map((item) => {
          return {
            dataIndex: item._id,
            title: item.email,
          };
        })
      : [];
  return (
    <Layout>
      <div className="container">
        <Title>
          <HomeFilled /> Funny Movie
        </Title>
        <div className="btn-group">
          {status.token || JSON.parse(localStorage.getItem("auth"))?.token ? (
            <>
              <span>
                Welcome{" "}
                {JSON.parse(localStorage.getItem("auth"))?.email ||
                  inputValue.email}
              </span>
              <Button onClick={() => handleOpenShareModal()}>
                Share a movie
              </Button>
              <Button onClick={() => handleSignOut()} type="" danger>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setVisibleAuth(true)}>
                Login / Register
              </Button>
            </>
          )}
        </div>
      </div>

      <ListVideos
        videos={videos}
        likeVideo={likeVideo}
        getShareVideoByUser={getShareVideoByUser}
      />
      {visible && (
        <Modal
          title={"Share a movie to your friends"}
          visible={visible}
          onOk={handleOkShareMovie}
          onCancel={() => setVisible(false)}
          className="modal"
        >
          <div className="input-wrapper">
            <label>Username</label>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={(value)=>setInputValue({...inputValue,receiver:value})}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                usersSelect.length>0 && usersSelect.map(item=> (
                  <Option value={item.title}>{item.title}</Option>
                ))
              }
            </Select>
          </div>
          <div className="input-wrapper">
            <label>Video URL</label>
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
          </div>

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
          <div className="input-wrapper">
            <label>Username</label>
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
          </div>{" "}
          <div className="input-wrapper">
            <label>Username</label>
            <Input
              initialvalues={inputValue.password}
              placeholder="password"
              type="password"
              className="input-custom"
              onChange={(e) => {
                setInputValue({
                  ...inputValue,
                  password: e.target.value,
                });
              }}
            />
          </div>
        </Modal>
      )}
    </Layout>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
  users: state.auth.users,
  videos: state.notifications.videos,
  status: state.auth.status,
  shareStatus: state.notifications.shareStatus,
});

const mapDispatch = (dispatch) => ({
  getAllSharedVideo: (data) => dispatch(getAllSharedVideo(data)),
  signIn: (data) => dispatch(signIn(data)),
  shareVideo: (data) => dispatch(shareVideo(data)),
  likeVideo: (data, id) => dispatch(likeVideo(data, id)),
  getShareVideoByUser: (data) => dispatch(getShareVideoByUser(data)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapState, mapDispatch)(ShareVideo);
