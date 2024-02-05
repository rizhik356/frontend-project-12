import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import socket from '../../../services';
import Toastify from '../../../services/Toastify';

const ModalRenameChannel = (props) => {
  const { t } = useTranslation();
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
      .min(3, t('errors.length'))
      .max(20, t('errors.length'))
      .required(t('errors.required'))
      .test('unique', t('errors.unique'), (value) => !channels.some((channel) => channel.name === value)),
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
            toast.update('error', t('errors.rename'));
          } else {
            onHide();
            toast.update('success', t('modals.renameSuccess'));
          }
        },
      );
    },
  });

  return (
    <Modal show onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
          {t('services.cancel')}
        </Button>
        <Button variant="success" disabled={isDisable} onClick={formik.handleSubmit}>
          {isDisable ? t('services.sending') : t('services.send')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRenameChannel;
