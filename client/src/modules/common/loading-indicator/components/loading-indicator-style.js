import { Div } from 'core/styled';
import styled from 'styled-components';

const Wrapper = styled(Div)`
  margin: 100px auto 0;
  width: 100px;
  text-align: center;

  > div {
    width: 18px;
    height: 18px;
    background-color: ${p => p.theme.color.primaryDark};
    margin: 0 2px;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  > div:nth-child(1) {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  > div:nth-child(2) {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`;

export default {
  Wrapper,
};
