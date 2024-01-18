import React from "react";
import { useFormik } from "formik";
import { Button, Form, InputGroup } from "react-bootstrap";

const MainForm = () => {
    const formik = useFormik({
        initialValues: {
            body: '',
        }, 
        onSubmit: (value) => {
            console.log(value);
        }
    })
    return (
        <Form noValidate={true} className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup className="has-validation">
            <Form.Control
                placeholder="Введите сообщение..."
                aria-label="Новое сообщение"
                className="border-0 p-1 ps-2"
                name="body"
            />
            <Button className="text-success" variant="group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            </Button>
            </InputGroup>
        </Form>
    )
};

export default MainForm