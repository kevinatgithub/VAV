import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Row, Col, Button, Spin, Modal, Select } from 'antd';
import { translate } from 'react-i18next';
import { Title, PageBody, Div } from '../../ui';
import MachineForm from './machine-form';
import { validateSpaces } from '../../utils/functions';

const { Option } = Select;

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
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 16,
      offset: 6,
    },
  },
};

class Register extends Component {
  state = {
    machines: [],
    languages: [
      { name: 'English', key: 'en' },
      { name: 'Nederlands', key: 'nl' },
      { name: 'Français', key: 'fr' },
      { name: 'Deutsch', key: 'du' },
    ],
    selectedLanguage: 'English',
  };

  componentWillUpdate(nextProps) { // eslint-disable-line
    if (nextProps.registered && nextProps.registered !== this.props.registered) {
      this.showRegistrationSuccessDialog();
    }
  }

  getValidator = (type, component) => {
    const { t, form } = this.props;
    const { getFieldDecorator } = form;
    const initialRules = type === 'email' ? [{ type: 'email', message: t('register.invalidEmail') }] : [];
    if (type === 'language') {
      return getFieldDecorator(type, {
        initialValue: this.state.selectedLanguage,
        rules: [],
      })(component);
    }
    return getFieldDecorator(type, {
      initialValue: '',
      rules: [...initialRules, { required: true, message: t(`register.${type}Required`, { field: type }) }],
    })(component);
  };

  /**
   * Method will check wheter form has only spaces
   * remove spaces and display error message
   */
  validateEmptyInput = () => {
    const { form: { getFieldsValue, setFields } } = this.props;
    validateSpaces(getFieldsValue, setFields);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, registerUser } = this.props;
    const { validateFields } = form;
    this.validateEmptyInput();
    validateFields((err, values) => {
      if (!err) {
        registerUser(values);
      }
    });
  };

  removeMachine = (serial) => {
    let { machines } = this.state;
    const { form: { setFieldsValue } } = this.props;
    const index = machines.findIndex(machine => machine.serial === serial);
    machines = [...machines.slice(0, index), ...machines.slice(index + 1)];
    setFieldsValue({ machines }, () => ({}));
    this.setState({ machines });
  };

  addMachine = (machine) => {
    const { form: { setFieldsValue } } = this.props;
    const machines = [...this.state.machines, machine];
    setFieldsValue({ machines }, () => ({}));
    this.setState({ machines });
  };

  showRegistrationSuccessDialog = () => {
    const { t, history } = this.props;
    Modal.info({
      title: t('register.complete'),
      content: "After you've registered a new machine AVR wil verify this and adjust your adjust",
      onOk() {
        history.push('/');
      },
    });
  };

  render() {
    const { t, loading } = this.props;
    const { languages } = this.state;
    return (
      <PageBody>
        <Spin spinning={loading}>
          <Row gutter={25} type='flex' align='middle' justify='center'>
            <Col xl={12} lg={14} md={18} sm={24}>
              <Card
                title={
                  <Title primary marginRight={20} marginTop={-1} marginLeft={20} fontWeight={200}>
                    {t('auth.register')}
                  </Title>
                }
              >
                <Div maxHeight='calc(100vh - 245px)' overflowY='auto'>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={t('register.firstName')}>
                      {this.getValidator('firstName', <Input placeholder={t('register.firstName')} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t('register.lastName')}>
                      {this.getValidator('lastName', <Input placeholder={t('register.lastName')} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t('register.customerName')}>
                      {this.getValidator('customerName', <Input placeholder={t('register.customerName')} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t('register.email')}>
                      {this.getValidator('email', <Input placeholder={t('register.email')} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t('register.language')}>
                      {this.getValidator(
                        'language',
                        <Select style={{ width: '100%' }}>
                          {languages &&
                            languages.map(l =>
                              <Option key={l.key} value={l.name}>
                                {l.name}
                              </Option>,
                            )}
                        </Select>,
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t('register.machines')}>
                      {this.getValidator(
                        'machines',
                        <MachineForm
                          machines={this.state.machines}
                          onRemoveMachine={this.removeMachine}
                          onAddMachine={this.addMachine}
                          t={t}
                        />,
                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                      <Button type='primary' htmlType='submit'>
                        {t('auth.register')}
                      </Button>
                    </FormItem>
                  </Form>
                </Div>
              </Card>
            </Col>
          </Row>
        </Spin>
      </PageBody>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default translate('translations')(Form.create()(Register));
