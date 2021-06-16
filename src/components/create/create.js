import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from "react-router-dom";

function Create() {

    let history = useHistory();

    function send(data) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("http://192.168.6.95:8000/emp/create", requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            history.push("/");
        });

    }

    return (
        <div>
            <h1>Create new empl</h1>
            <Formik
                initialValues={{ empName: '', empEmail: '', empMobile: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        send(values)
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="empName" />
                        <Field type="email" name="empEmail" />
                        <Field type="text" name="empMobile" />
                        <ErrorMessage name="email" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Create;