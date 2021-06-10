import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Card, Input, Button, Form, Row } from 'antd';
import _ from 'lodash';

import styles from './style.module.scss';
import { signUp } from 'api/authentication';
import { handleErrorMessage } from 'helper';

export default function SignUp() {
  const history = useHistory();

  const navigateToSignIn = () => history.push('/sign-in');

  const handleSubmit = async (payload: any) => {
    const params = _.pick(payload, ['username', 'fullName', 'password']);
    try {
      const data = await signUp(params);
      const { accessToken } = data;
      Cookies.set('accessToken', accessToken, {
        expires: payload.rememberMe ? 999999 : undefined,
      });
      history.push('/');
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <Card bordered className={styles.signUpForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>Sign Up</h2>
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
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'This field is required' }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password Confirm"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
            dependencies={['password']}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToSignIn}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
