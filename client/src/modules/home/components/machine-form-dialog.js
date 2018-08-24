import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Form, Input } from 'antd';
import { validateSpaces } from '../../utils/functions';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    sm: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 16 },
  },
};

const MachineFormModal = ({ machine, visible, mode, t, onSubmit, onCancel, form }) => {
  const { getFieldDecorator, validateFields, isFieldsTouched, resetFields, getFieldsValue, setFields } = form;

  const handleCancel = () => {
    resetFields();
    onCancel();
  };

  /**
   * Method will check wheter form has only spaces
   * remove spaces and display error message
   */
  const validateEmptyInput = () => {
    validateSpaces(getFieldsValue, setFields);
  };

  const handleSubmit = () => {
    if (mode === 'edit' && !isFieldsTouched()) {
      onCancel();
      return;
    }
    validateEmptyInput();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
        handleCancel();
      }
    });
  };

  const serialNumberValidator = getFieldDecorator('serialNumber', {
    initialValue: mode === 'edit' ? machine.serialNumber : '',
    rules: [{ required: true, message: t('home.serialNumberRequiredMsg') }],
  });
  const nickNameValidator = getFieldDecorator('displayName', {
    initialValue: mode === 'edit' ? machine.displayName : '',
    rules: [{ required: true, message: t('home.nicknameRequiredMsg') }],
  });

  const okText = t(`home.${mode === 'edit' ? 'save' : 'add'}`);

  return (
    <Modal
      title={t(`home.${mode}Machine`)}
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={okText}
    >
      <Form>
        <FormItem {...formItemLayout} label={t('shared.serialNumber')}>
          {serialNumberValidator(<Input disabled={mode === 'edit'} />)}
        </FormItem>
        <FormItem {...formItemLayout} label={t('home.nickname')}>
          {nickNameValidator(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

MachineFormModal.propTypes = {
  machine: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['', 'add', 'edit']).isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(MachineFormModal);
