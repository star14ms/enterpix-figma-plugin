import styled, { css } from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 16px;
`;

export const RowCSS = css`
  display: flex;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

export const Col = styled.div`
  ${RowCSS}
  flex-direction: column;
`;

export const Row = styled.div`
  ${RowCSS}
`;

export const Col_CenterCSS = css`
  ${RowCSS}
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Col_Center = styled.div`
  ${Col_CenterCSS}
`;

export const Row_CenterCSS = css`
  ${RowCSS}
  justify-content: center;
  align-items: center;
`;

export const Row_Center = styled.div`
  ${Row_CenterCSS}
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

export const HoverCSS = css`
&:hover {
  opacity: 0.7;
  cursor: pointer;
}
`
