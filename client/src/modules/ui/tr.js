import styled from 'styled-components';
import { extraProps, fontProps } from './styling/styling';

const Tr = styled.tr`
    &:first-of-type: cursor: initial;
    ${extraProps};
    ${fontProps};
`;

export default Tr;
