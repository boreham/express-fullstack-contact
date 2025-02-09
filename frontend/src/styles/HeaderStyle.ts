import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 100;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
`;

export {
    HeaderWrapper,
    Title
};
