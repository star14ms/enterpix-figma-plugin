import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  padding: 10px auto;
  border-radius: 1rem;
  font-size: 24px;
  transition: 0.15s;
  width: 30%;
  cursor: pointer;
  
  &:hover {
    background-color: #191919;
  }
`;

export const Text = styled.p`
  font-size: 24px;
`;

export const Input = styled.input`
  font-size: 24px;
  margin-top: 16px;
`;

export const RowCSS = css`
  display: flex;
  justify-content: space-evenly;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
`;

export const ImgCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  margin: 8px 8px;
  
  & img {
    margin: 8px 0;
    width: 100%;
    transition: 0.15s;
  
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;