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
import { signUp } from "../../redux/auth/actions";

const ShareVideo = ({ signUp, auth }) => {
  const [visible, setVisible] = useState(false);
  const [visibleAuth, setVisibleAuth] = useState(false);
  const [inputValue, setInputValue] = useState(
    {
      receiverId: "a",
      url: "",
    },
  );
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...inputValue });
  }, [form, inputValue]);
  const handleOkSignUp = ()=> {
    setVisibleAuth(false)
    console.log(inputValue,'>>>');
  }
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
          <Button onClick={() => setVisible(true)}>Share a movie</Button>
          <Button onClick={() => setVisibleAuth(true)}>Sign in</Button>
          <Button onClick={() => setVisibleAuth(true)}>Sign up</Button>
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
      <ListVideos />
      <hr />
      <Modal
        title={"Share a movie to your friends"}
        visible={visible}
        onOk={() => setVisible(false)}
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
              message: "Vui lòng cnhập NSD",
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
          <Button type="danger" href="https://www.youtube.com/" target="blank">
            Browse Youtube
          </Button>
        </div>
      </Modal>
      <Modal
        title={"Sign up"}
        visible={visibleAuth}
        onOk={handleOkSignUp}
        onCancel={() => setVisibleAuth(false)}
        className="modal-add-edit"
      >
        <Form.Item
          className="form-custom-input"
          label="Username"
          name="Username"
          rules={[
            {
              required: true,
              message: "Vui lòng cnhập NSD",
            },
          ]}
        >
          <Input
            initialvalues={inputValue.username}
            placeholder="username"
            className="input-custom"
            onChange={(e) => {
              setInputValue({
                ...inputValue,
                username: e.target.value,
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
          />{" "}
        </Form.Item>
      </Modal>
    </Layout>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});

const mapDispatch = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
});

export default connect(mapState, mapDispatch)(ShareVideo);
