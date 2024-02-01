import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useAuth from '../../hooks';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      setBtnDisabled(true);
      try {
        const responce = await axios.post(routes.loginPath(), {
          username: values.username.trim().toLocaleLowerCase(),
          password: values.password.trim(),
        });
        localStorage.setItem('userId', JSON.stringify(responce.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          setBtnDisabled(false);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <FloatingLabel
        controlId="username"
        label="Ваш ник"
        className="mb-3"
      >
        <Form.Control
          placeholder="Ваш ник"
          autoComplete="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={authFailed}
          ref={inputRef}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="password"
        label="Пароль"
        className="mb-4"
      >
        <Form.Control
          placeholder="Пароль"
          type="password"
          autoComplete="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
      </FloatingLabel>
      <Button disabled={btnDisabled} variant="success" type="submit">
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
