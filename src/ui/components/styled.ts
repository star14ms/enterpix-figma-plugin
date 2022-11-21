import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const RowCSS = css`
  display: flex;
  justify-content: space-evenly;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

export const Row = styled.div`
  ${RowCSS}
`;

export const RowAlignCenter = styled.div`
  ${RowCSS}
  align-items: center;
`;

export const ImgCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  margin: 16px 0;
  gap: 8px;
  
  & img {
    width: 100%;
    transition: 0.15s;
  
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;
