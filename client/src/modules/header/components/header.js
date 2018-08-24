import PropTypes from 'prop-types';
import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { translate } from 'react-i18next';
import authentication from 'utils/auth.manager';
import { Logo, Flex, Div, Image, Span, Icon } from 'ui';
import images from 'utils/images';
import LanguageSelect from '../../language-select/components/language-select';
import { Wrapper, Right, HeaderButton, RotatingImage } from './header-style';

const Header = ({ t, history, user }) => {
  const { response } = authentication().getCachedToken();

  const handleClick = ({ key }) => {
    if (key === 'logout') {
      authentication().logout();
      message.loading(`${t('header.loggingOut')}...`, 0);
    }
  };

  const menu = <Menu onClick={handleClick}>
    <Menu.Item key='logout'>
      <Icon name='logout' />
      {t('header.logout')}
    </Menu.Item>
  </Menu>;

  return (
    <Wrapper>
      <Flex fdr>
        <Div flex={0} minWidth={180} jcc aic>
          <Logo />
        </Div>
        {response && <Right fdr flex={1}>
          <HeaderButton type='primary' borderRight>
            <Image src={images.homeIcon} onClick={() => history.push('/')} width={50} height={50} />
          </HeaderButton>
          <Flex flex={1} />
          <HeaderButton type='primary' borderRight borderLeft>
            <RotatingImage src={images.settingIcon} width={50} height={50} />
          </HeaderButton>
          <HeaderButton type='primary' borderRight>
            <LanguageSelect />
          </HeaderButton>
          {user && <Dropdown overlay={menu}>
            <HeaderButton type='primary'>
              <Image src={images.userIcon} width={50} height={50} />
              <Span invert fontSize={17} paddingRight={10}>
                {user.username}
              </Span>
            </HeaderButton>
          </Dropdown>
          }
        </Right>
        }
        {!response && <Right fdr flex={1} jcfe>
          <HeaderButton type='primary' borderRight>
            <Image src={images.homeIcon} onClick={() => history.push('/')} width={50} height={50} />
          </HeaderButton>
          <Flex flex={1} />
          <HeaderButton type='primary' borderLeft>
            <LanguageSelect />
          </HeaderButton>
        </Right>
        }
      </Flex>
    </Wrapper>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default translate('translations')(Header);
