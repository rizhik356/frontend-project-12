import React, { useState } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsAction } from '../../slices/channelsSlice';
import getModal from './modals';

const RemovableChannel = ({ props }) => {
  const { item, currentChannelId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Modal = getModal(modalInfo.type);
    return <Modal modalInfo={modalInfo} onHide={hideModal} />;
  };

  const setVariant = (variant) => (item.id === currentChannelId ? variant : false);

  const handleClick = (id) => () => {
    dispatch(channelsAction.changeCurrentId({ currentChannelId: id }));
  };

  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Button
        variant={setVariant('success')}
        className="w-100 text-start text-truncate"
        onClick={handleClick(item.id)}
      >
        <span className="me-1">#</span>
        {item.name}
      </Button>
      <Dropdown.Toggle split variant={setVariant('secondary')} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => showModal('removing', item)}>{t('services.remove')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => showModal('renaming', item)}>{t('services.rename')}</Dropdown.Item>
        {renderModal({ modalInfo, hideModal })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
