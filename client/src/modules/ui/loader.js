import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 3px solid #f3f3f300;
  border-top: 3px solid #1c51a7;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  animation: ${rotate360} 1s linear infinite;
`;

export default Loader;
