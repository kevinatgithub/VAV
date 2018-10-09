import { H3, H4 } from '@blueprintjs/core';
import styled from 'styled-components';
import { Card, CardHeader } from '../../ui/card';
import { Flex } from '../../ui';

const Wrapper = styled(Card)`
  border-radius: 0;
  height: 100%;

  button {
    flex-shrink: 0;
  }

  .bp3-tag {
    font-size: 12px;
    font-weight: normal;
  }
`;

const Title = styled(H3)`
  &.bp3-heading {
    margin-bottom: 0;
    margin-right: 15px;
    line-height: 1.5;
  }
`;

const Header = styled(CardHeader)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Details = Flex.extend`
  box-shadow: 0 1px 0 ${p => p.theme.color.border};
  padding: 10px 20px;
  background-color: ${p => p.theme.color.background};
  margin-top: 1px;
`;

const SectionTitle = styled(H4)`
  box-shadow: 0 1px 0 ${p => p.theme.color.border};
  padding-bottom: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export default {
  Wrapper,
  Header,
  Title,
  Details,
  SectionTitle,
};
