import { useEffect, useState } from "react";
import axios from "axios";

import { Form, Input, Button, notification } from "antd";
import logo from "../../user-logo.png";

import "antd/dist/antd.css";
import "./index.css";

interface ResponseData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Login = (props: { history: string[] }) => {
  const [respData, setRespData] = useState<ResponseData>();
  const [login, setLogin] = useState(true);

  useEffect(() => {
    axios.get("https://reqres.in/api/users/2").then((resp) => {
      setRespData(resp.data.data);
    });
  }, []);

  const openNotificationWithIcon = (errorInfo: string) => {
    notification["error"]({
      message: "Login Failed",
      description: { errorInfo },
    });
  };

  const onLogin = (values: { username: string; password: string }) => {
    if (
      values.username === respData?.first_name &&
      values.password === respData?.last_name
    ) {
      setLogin(true);
      props.history.push("/home");
    } else {
      setLogin(false);
    }
  };

  const onLoginFailed = (errorInfo: string) => {
    openNotificationWithIcon(errorInfo);
  };

  return (
    <div>
      <header>
        <span className="logo_content">
          <img src={logo} alt="User" className="login_logo" />
        </span>
      </header>
      <div className="loginForm">
        {!login && (
          <span className="invalid_info">
            **Please enter correct credentials
          </span>
        )}
        <Form
          onFinish={onLogin}
          onFinishFailed={() => onLoginFailed("Error occured while Login")}
          autoComplete="off"
        >
          <Form.Item
            // label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="User name" />
          </Form.Item>

          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
