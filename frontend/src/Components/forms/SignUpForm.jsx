import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useAuth from '../../hooks';

const SignUpForm = () => {
  const [isDisable, setDisable] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
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
          formik.errors.username = 'Данное существо уже есть';
        }
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <FloatingLabel
        controlId="username"
        label="Имя пользователя"
        className="mb-3 "
      >
        <Form.Control
          placeholder="От 3 до 20 символов"
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
        label="Пароль"
        className="mb-3 "
      >
        <Form.Control
          placeholder="Не менее 6 символов"
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
        label="Подтвердите пароль"
        className="mb-4"
      >
        <Form.Control
          placeholder="Пароли должны совпадать"
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
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignUpForm;
