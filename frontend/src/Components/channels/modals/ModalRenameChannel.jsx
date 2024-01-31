import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import socket from "../../../services";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
        .test('unique', 'Должно быть уникальным', (value) => {
            return !channels.some((channel) => channel.name === value);
        }),
      });

      const formik = useFormik({
        initialValues: {
          name: "",
        },
        validationSchema: AddChannelSchema,
        validateOnChange: false,
        validateOnBlur:false,
        onSubmit: async ({ name }) => {
            setDisable(true);
            const id = toast.loading("Загрузка...");
            await socket.timeout(3000).emit('renameChannel', 
            { ...item, name },
            (err) => {
                if (err) {
                    setDisable(false);
                    toast.update(id, 
                      {
                        render: "Не удалось переименовать канал", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000, 
                      }
                    );
                } else {
                    handleClose();
                    toast.update(id, 
                      {
                        render: "Канал переименован", 
                        type: "success", 
                        isLoading: false, 
                        autoClose: 5000, 
                      }
                    ); 
                }
            }
            );
        },
      });

      const handleClose = () => {
        formik.resetForm();
        setDisable(false);
       return onHide();
      } 
    
      return (                          
          <Modal show onHide={handleClose} animation={false}>
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
              <Button variant="secondary" onClick={handleClose}>
                Отменить
              </Button>
              <Button variant="success" disabled={isDisable} onClick={formik.handleSubmit}>
                {isDisable? 'Отправка...': 'Отправить'}
              </Button>
            </Modal.Footer>
          </Modal>
      );
};

export default ModalRenameChannel;