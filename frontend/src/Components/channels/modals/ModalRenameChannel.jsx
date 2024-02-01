import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import socket from '../../../services';
import Toastify from '../../../services/Toastify';

const ModalRenameChannel = (props) => {
  const channels = useSelector((state) => state.channelsReducer.channels);
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  const inputRef = useRef();
  const [isDisable, setDisable] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [inputRef]);

  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .test('unique', 'Должно быть уникальным', (value) => !channels.some((channel) => channel.name === value)),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddChannelSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ name }) => {
      setDisable(true);
      const toast = new Toastify();
      await socket.timeout(3000).emit(
        'renameChannel',
        { ...item, name },
        (err) => {
          if (err) {
            setDisable(false);
            toast.update('error', 'Не удалось переименовать канал');
          } else {
            onHide();
            toast.update('success', 'Канал переименован');
          }
        },
      );
    },
  });

  return (
    <Modal show onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            isInvalid={formik.touched.name && formik.errors.name}
            ref={inputRef}
            disabled={isDisable}
          />
          <Form.Label
            visuallyHidden
            htmlFor="name"
          />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="success" disabled={isDisable} onClick={formik.handleSubmit}>
          {isDisable ? 'Отправка...' : 'Отправить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRenameChannel;
