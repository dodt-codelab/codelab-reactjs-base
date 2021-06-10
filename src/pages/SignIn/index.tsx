import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { Card, Input, Button, Form, Row, Checkbox } from 'antd';

import styles from './style.module.scss';
import { signIn } from 'api/authentication';
import { handleErrorMessage } from 'helper';

export default function SignIn() {
  const history = useHistory();

  const navigateToSignUp = () => history.push('/sign-up');

  const handleSubmit = async (payload: any) => {
    const params = _.pick(payload, ['username', 'password']);
    try {
      const data = await signIn(params);
      const { accessToken } = data;
      Cookies.set('accessToken', accessToken, {
        expires: payload.rememberMe ? 999999 : undefined,
      });
      history.push('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const isAuthenticated = !!Cookies.get('token');
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>Sign In</h2>
          </Row>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'This field is required' }]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToSignUp}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
