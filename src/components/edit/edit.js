import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useParams } from "react-router-dom";

function Create(props) {
    let history = useHistory();
    const user = history.location.state.item;

    let { id } = useParams();

    function send(id, data) {

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("http://192.168.6.95:8000/emp/" + id, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            history.push("/");
        });

    }

    return (
        <div>
            <h1>{id}</h1>
            <Formik
                initialValues={{ 
                    empName: user.empName, 
                    empEmail: user.empEmail, 
                    empMobile: user.empMobile }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        send(user._id, values)
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