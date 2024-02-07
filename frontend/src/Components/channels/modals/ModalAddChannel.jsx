import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import socket from '../../../services';
import ButtonAddChanel from '../../ButtonAddChanel';
import Toastify from '../../../services/Toastify';
import { actions as channelsActions } from '../../../slices/channelsSlice';

const ModalAddChannel = () => {
  const channels = useSelector((state) => state.channelsReducer.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [isDisable, setDisable] = useState(false);

  const handleShow = () => setShow(true);

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
    onSubmit: async ({ name }) => {
      const toast = new Toastify(t('services.loading'));
      setDisable(true);
      await socket.timeout(3000).emit(
        'newChannel',
        { name },
        (err) => {
          if (err) {
            setDisable(false);
            toast.update('error', t('errors.add'));
          } else {
            // eslint-disable-next-line no-use-before-define
            handleClose();
            toast.update('success', t('modals.addSuccess'));
            dispatch(channelsActions.setLastAddChannelName({ name }));
          }
        },
      );
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setDisable(false);
    return setShow(false);
  };

  return (
    <>
      <ButtonAddChanel handleShow={handleShow} />
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={isDisable}
              autoFocus
            />
            <Form.Label
              visuallyHidden
              htmlFor="name"
            >
              {t('services.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('services.cancel')}
          </Button>
          <Button variant="success" disabled={isDisable} onClick={formik.handleSubmit}>
            {isDisable ? t('services.sending') : t('services.send')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddChannel;
