import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #555;
`;

export {
    FooterWrapper,
    FooterText
};
