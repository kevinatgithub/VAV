import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Flex, Title, Div, Button, CenterBody } from '../../ui';

const AuthSplash = ({ onLogin, onResetPassword, onRegister, t }) =>
  <CenterBody>
    <Flex flexGrow={1} jcc fdc marginBottom={96}>
      <Row gutter={25}>
        <Col md={{ span: 8, offset: 4 }} sm={{ spane: 20, offset: 2 }}>
          <Div marginBottom={32}>
            <Title fontWeight={600}>Connect</Title>
          </Div>
        </Col>
      </Row>
      <Row gutter={25} type='flex' align='middle' justify='center'>
        <Col md={8} sm={20}>
          <Div fontSize={18}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Div>
        </Col>
        <Col md={8} sm={20}>
          <Flex fdc>
            <Flex fdc jcsb>
              <Button type='primary' marginBottom={24} onClick={onLogin}>
                {t('auth.login')}
              </Button>
              <Button type='primary' ghost marginBottom={24} onClick={onRegister}>
                {t('auth.register')}
              </Button>

              <Button type='primary' ghost marginBottom={24} onClick={onResetPassword}>
                {t('auth.passwordReset')}
              </Button>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Flex>
    <Row gutter={25} type='flex' align='bottom' justify='center'>
      <Div tac>
        By Using our services you aggree to our Cookie Policy. Cookies are used for technical resources, including
        analytics and personalisation
      </Div>
    </Row>
  </CenterBody>;
AuthSplash.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default AuthSplash;
