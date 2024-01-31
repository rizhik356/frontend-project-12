import React from "react";
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import socket from "../../../services";
import { toast } from "react-toastify";

const ModalRemoveChannel = (props) => {
    const { onHide, modalInfo } = props;
    const { item } = modalInfo;
    const { id } = item;
    const [disable, setDisable] = useState(false);

    const handleRemove = async () => {
        setDisable(true);
        const status = toast.loading("Загрузка...");
        await socket.timeout(3000).emit('removeChannel', 
        { id },
        (err) => {
            if (err) {
                setDisable(false);
                toast.update(status, 
                    {
                      render: "Не удалось удалить канал", 
                      type: "error", 
                      isLoading: false, 
                      autoClose: 3000, 
                    }
                  );
            } else {
                setDisable(false);
                onHide();
                toast.update(status, 
                    {
                      render: "Канал удален", 
                      type: "success", 
                      isLoading: false, 
                      autoClose: 5000, 
                    }
                  ); 
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