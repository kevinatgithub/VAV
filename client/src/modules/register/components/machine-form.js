import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { Flex, Button, Div, Label } from '../../ui';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
    md: { span: 0 },
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 22 },
  },
};

class MachineForm extends Component {
  getValidator = (type, component) => {
    const { t, form: { getFieldDecorator } } = this.props;
    return getFieldDecorator(type, {
      initialValue: '',
      rules: [{ required: true, message: t(`register.${type}Required`, { field: type }) }],
    })(component);
  };

  /**
   * Method will check wheter form has only spaces
   * remove spaces and display error message
   */
  validateSpaces = () => {
    const { form: { getFieldsValue, setFields } } = this.props;
    const values = getFieldsValue();
    return Object.keys(values).forEach((key) => {
      if (typeof values[key] === 'string' && !values[key].trim().length) {
        setFields({
          [key]: {
            value: '',
          },
        });
      } else if (values[key] instanceof Array && !values[key].length) {
        setFields({
          [key]: {
            value: [],
          },
        });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onAddMachine } = this.props;
    const { validateFields, resetFields } = form;
    this.validateSpaces();
    validateFields((err, values) => {
      if (!err) {
        onAddMachine(values);
        resetFields();
      }
    });
  };

  render() {
    const { machines, onRemoveMachine, t } = this.props;
    return (
      <Flex fdc>
        <Flex fdc>
          {machines &&
            machines.map((machine, index) =>
              <Flex
                fdr
                aic
                key={`${machine.serial}-${index}`}
                paddingBottom={10}
                paddingTop={machines.length > 1 && index > 0 ? 10 : 0}
                borderBottomWidth={machines.length > 1 && index < machines.length - 1 ? 1 : 0}
                borderColor='primary'
              >
                <Flex fdc flex={1}>
                  <Flex fdr aic>
                    <Label noPadding marginRight={10}>
                      Serial
                    </Label>
                    <Div>{machine.serial}</Div>
                  </Flex>
                  <Flex fdr aic>
                    <Label noPadding marginRight={10}>
                      Nickname
                    </Label>
                    <Div>{machine.nickName}</Div>
                  </Flex>
                </Flex>
                <Flex fdr flex={0.2} jcfe>
                  <Button type='primary' ghost icon='minus' onClick={() => onRemoveMachine(machine.serial)} />
                </Flex>
              </Flex>,
            )}
        </Flex>
        <Flex fdr jcsb aic>
          <Flex fdr aic flex={1}>
            <FormItem {...formItemLayout}>
              {this.getValidator('nickName', <Input placeholder={t('home.nickname')} />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {this.getValidator('serial', <Input placeholder={t('shared.serialNumber')} />)}
            </FormItem>
          </Flex>
          <Flex flex={0.2} jcfe marginBottom={24}>
            <Button type='primary' icon='plus' onClick={this.handleSubmit} />
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

MachineForm.propTypes = {
  onAddMachine: PropTypes.func.isRequired,
  machines: PropTypes.array.isRequired,
  onRemoveMachine: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
export default Form.create()(MachineForm);
