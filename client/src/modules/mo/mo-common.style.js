import { H3 } from '@blueprintjs/core';
import styled from 'styled-components';
import { Card, CardHeader } from 'core/styled';

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

export default {
  Wrapper,
  Header,
  Title,
};
