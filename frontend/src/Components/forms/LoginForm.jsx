import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import useAuth from '../../hooks';

const LoginForm = () => {
  const { t } = useTranslation();
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
      <h1 className="text-center mb-4">{t('services.logIn')}</h1>
      <FloatingLabel
        controlId="username"
        label={t('services.username')}
        className="mb-3"
      >
        <Form.Control
          placeholder={t('services.username')}
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
        label={t('services.password')}
        className="mb-4"
      >
        <Form.Control
          placeholder={t('services.password')}
          type="password"
          autoComplete="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid">{t('errors.invalidUserData')}</Form.Control.Feedback>
      </FloatingLabel>
      <Button disabled={btnDisabled} variant="success" type="submit">
        {t('services.logIn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
