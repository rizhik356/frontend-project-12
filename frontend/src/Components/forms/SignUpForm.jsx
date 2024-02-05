import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import useAuth from '../../hooks';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [isDisable, setDisable] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.length'))
      .max(20, t('errors.length')),
    password: Yup.string()
      .min(6, t('errors.passwordLength')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.passwordMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    validateOnBlur: true,
    onSubmit: async ({ username, password }) => {
      setDisable(true);
      try {
        const responce = await axios.post(routes.signUp(), { username, password });
        localStorage.setItem('userId', JSON.stringify(responce.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        setDisable(false);
        if (err.isAxiosError && err.response.status === 409) {
          formik.errors.username = t('errors.userUnique');
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('services.registration')}</h1>
      <FloatingLabel
        controlId="username"
        label={t('services.username')}
        className="mb-3 "
      >
        <Form.Control
          placeholder={t('errors.length')}
          type="username"
          autoComplete="username"
          name="username"
          required
          value={formik.values.username}
          isInvalid={formik.touched.username && formik.errors.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isDisable}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label={t('services.password')}
        className="mb-3 "
      >
        <Form.Control
          placeholder={t('errors.passwordLength')}
          type="password"
          autoComplete="new-password"
          name="password"
          aria-describedby="passwordHelpBlock"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          disabled={isDisable}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="confirmPassword"
        label={t('services.handlePasswordConfirm')}
        className="mb-4"
      >
        <Form.Control
          placeholder={t('errors.passwordMatch')}
          type="password"
          autoComplete="new-password"
          name="confirmPassword"
          required
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
          disabled={isDisable}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button
        type="submit"
        disabled={isDisable}
        className="w-75 mx-auto d-block"
        variant="outline-success"
      >
        {t('services.toRegistrate')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
