import { Select } from 'antd';
import styled from 'styled-components';

export const CustomSelect = styled(Select)`
  &.ant-select {
    color: ${p => p.theme.color.textInvert};
    min-width: 101px;
  }

  &.ant-select-focus .ant-select-selection,
  &.ant-select-open .ant-select-selection,
  .ant-select-selection:focus {
    border-color: transparent;
    box-shadow: none;
  }

  > .ant-select-selection {
    background-color: transparent;
    border: none;
  }

  .ant-select-arrow {
    color: ${p => p.theme.color.textInvert};
  }
`;
