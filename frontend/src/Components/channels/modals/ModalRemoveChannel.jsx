import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import socket from '../../../services';
import Toastify from '../../../services/Toastify';

const ModalRemoveChannel = (props) => {
  const { t } = useTranslation();
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  const { id } = item;
  const [disable, setDisable] = useState(false);

  const handleRemove = async () => {
    setDisable(true);
    const toast = new Toastify(t('services.loading'));
    await socket.timeout(3000).emit(
      'removeChannel',
      { id },
      (err) => {
        if (err) {
          setDisable(false);
          toast.update('error', t('errors.remove'));
        } else {
          setDisable(false);
          onHide();
          toast.update('success', t('modals.removeSuccess'));
        }
      },
    );
  };

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('services.confirm')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('services.cancel')}
        </Button>
        <Button
          disabled={disable}
          variant="danger"
          onClick={handleRemove}
        >
          {t('services.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
