import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: () => {
      console.log(formik.values);
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
          onChange={formik.handleChange}
          autoFocus
        />
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
        />
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
        />
      </FloatingLabel>
      <Button
        type="submit"
        className="w-75 mx-auto d-block"
        variant="outline-success"
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignUpForm;
