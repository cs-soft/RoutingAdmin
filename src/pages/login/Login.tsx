import React, { useState } from "react";
import { Form } from "antd";
import { Input, Button, Message, useToaster } from "rsuite";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
const index = () => {
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const toaster = useToaster();
  type FieldType = {
    userName?: string;
    passWord?: string;
  };

  const defaultUser = {
    userName: "admin",
    passWord: "123456",
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (
        values.userName === defaultUser.userName &&
        values.passWord === defaultUser.passWord
      ) {
        const next = toaster.push(
          <Message showIcon closable type="success">
            登录成功
          </Message>,
          {
            placement: "topCenter",
          }
        );
        next &&
          router({
            pathname: "/",
          });

        setLoading(false);
      } else {
        toaster.push(
          <Message showIcon closable type="error">
            请检查用户名或密码
          </Message>,
          {
            placement: "topCenter",
          }
        );
        setLoading(false);
      }
    }, 1000);
  };

  const onFinishFailed = () => {};
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "linear-gradient(135deg,#52E5E7 15%,#130CB7 100%)",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "300px",
            margin: "auto",
            padding: "10px",
          }}
        >
          <Form
            labelCol={{ span: 5 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="passWord"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button
                type="submit"
                appearance="primary"
                color="green"
                block
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default index;
