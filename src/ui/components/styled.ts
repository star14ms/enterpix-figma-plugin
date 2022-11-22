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
  gap: 8px;

  div {
    position: relative;

    img {
      width: 100%;
      transition: 0.15s;

      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
    
    button {
      position: absolute;
      bottom: 6px;
      right: 6px;
      visibility: hidden;
      
      width: 121px;
      height: 24px;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      transition: 0.15s;

      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 10px;
      color: #6B7280;

      &:hover {
        transition: 0.15s;
        background-color: rgb(220, 220, 220);
        cursor: pointer;
      }
    }
    
    &:hover button {
      visibility: visible;
    }
  }
`;

export const HoverCSS = css`
&:hover {
  opacity: 0.7;
  cursor: pointer;
}
`

export const Relative = styled.div`
  position: relative;
`