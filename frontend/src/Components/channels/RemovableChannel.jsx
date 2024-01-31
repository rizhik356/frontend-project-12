import React, { useState } from "react";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions as channelsAction } from "../../slices/channelsSlice";
import getModal from "./modals";

const RemovableChannel = ({ props }) => {
    const { item, currentChannelId } = props;
    const dispatch = useDispatch();

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

    const setVariant = (variant) => {
        return item.id === currentChannelId ? variant : false;
    };

    const handleClick = (id) => () => {
        dispatch(channelsAction.changeCurrentId({ currentChannelId: id }));
    };

    return (
        <Dropdown className="d-flex" as={ButtonGroup}>
          <Button 
          variant={setVariant('success')}
          className="w-100 text-start text-truncate"
          onClick={handleClick(item.id)}
          >{item.name}
          </Button>
          <Dropdown.Toggle split variant={setVariant('secondary')} id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => showModal('removing', item)}>Удалить</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => showModal('renaming', item)}>Переименовать</Dropdown.Item>
            {renderModal({ modalInfo, hideModal })}
          </Dropdown.Menu>
        </Dropdown>
      );
};

export default RemovableChannel;