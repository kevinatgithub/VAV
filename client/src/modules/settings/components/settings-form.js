import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Div } from '../../ui';

/* eslint-disable react/prop-types */
const SettingsForm = ({ initialValues, onSubmit }) =>
  <Formik
    initialValues={initialValues}
    onSubmit={(values) => {
      onSubmit(values);
    }}
    render={({ errors, touched, isSubmitting, values }) =>
      <Form>
        <Field type='email' name='email' />
        {errors.email && touched.email && <div>{errors.email}</div>}
        <Field type='text' name='facebook' />
        {errors.facebook &&
              touched.facebook && <div>{errors.facebook}</div>}
        <Field type='text' name='twitter' />
        {errors.twitter &&
              touched.twitter && <div>{errors.twitter}</div>}
        <button type='submit' disabled={isSubmitting}>
              Submit
        </button>
        <Div>{JSON.stringify(values)}</Div>
      </Form>
    }
  />;

export default SettingsForm;
