import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.jpg";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await axios.post("http://localhost:8080/user", values);
      console.log(res, "111111");
      // await dispatch(fetchLogin(values));
      // navigate("/");
      // message.success("登录成功！");
      if (values.mobile == res.data.mobile && values.code == res.data.code) {
        navigate("/");
        message.success("登录成功！");
      }
    } catch (error) {
      message.error("登录失败！");
      console.log(error);
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "请输入手机号!",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码!", //246810
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
