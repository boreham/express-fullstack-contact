import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 100px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 30px;
    margin: 80px auto;
  }

  @media (max-width: 480px) {
    padding: 20px;
    margin: 60px auto;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5563DE;
    box-shadow: 0 0 10px rgba(85, 99, 222, 0.3);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5563DE;
    box-shadow: 0 0 10px rgba(85, 99, 222, 0.3);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Button = styled.button`
  padding: 15px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #5563DE;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #434db8;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
`;

export {
    Container,
    Title,
    Form,
    Input,
    TextArea,
    Button,
    ErrorMessage,
    SuccessMessage
};
