import React from "react";
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import socket from "../../../services";
import Toastify from "../../../services/Toastify";

const ModalRemoveChannel = (props) => {
    const { onHide, modalInfo } = props;
    const { item } = modalInfo;
    const { id } = item;
    const [disable, setDisable] = useState(false);

    const handleRemove = async () => {
        setDisable(true);
        const toast = new Toastify();
        await socket.timeout(3000).emit('removeChannel', 
        { id },
        (err) => {
            if (err) {
                setDisable(false);
                  toast.update('error', 'Не удалось удалить канал');
            } else {
                setDisable(false);
                onHide();
                  toast.update('success', 'Канал удален');
            }
        }
        );
    }

    return (
        <Modal 
            show 
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
            <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Отменить
            </Button>
            <Button disabled={disable} variant="danger" onClick={handleRemove}>
                Удалить
            </Button>
            </Modal.Footer>
        </Modal>
    );
    };

export default ModalRemoveChannel;