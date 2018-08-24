import styled from 'styled-components';
// import searchIcon from '../../assets/images/searchIcon.png';
import {
  widthProps,
  heightProps,
  borderProps,
  backgroundProps,
  paddingProps,
} from './styling/styling';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #d4d4d4;
  font-size: 17px;
  background-repeat: no-repeat;
  background-position: left center;
  ${borderProps};
  ${paddingProps};
  ${backgroundProps};
  ${widthProps};
  outline: 0;
`;

const ValueInput = styled.input`
  padding: 7px 10px;
  font-size: 16px;
  outline: 0;
  ${widthProps};
  ${borderProps};
  ${heightProps};
`;

export { Input, ValueInput };
