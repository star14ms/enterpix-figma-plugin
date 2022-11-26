import styled, { css } from 'styled-components';


export const ContainerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  gap: 16px;
  color: #9CA3AF;
`;

export const Container = styled.div`
  ${ContainerCSS}
`;

export const ContainerCanHide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  gap: 16px;
  color: #9CA3AF;

  &.hidden {
    display: none;
  }
`;

export const RowCSS = css`
  display: flex;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
`;

export const ColCSS = css`
  ${RowCSS}
  flex-direction: column;
`;

export const Row = styled.div`
  ${RowCSS}
`;

export const Col = styled.div`
  ${RowCSS}
  flex-direction: column;
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

export const HoverOpacityCSS = css`
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`

export const HoverBrightnessCSS = css`
  &:hover {
    cursor: pointer;
    filter: brightness(85%);
  }
`

export const HoverBackgroundCSS = css`
  background-color: rgb(255, 255, 255);

  &:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
  }
  
  &:active {
    background-color: rgb(220, 220, 220);
  }
`

export const DivRelative = styled.div`
  position: relative;
`

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  width: calc(400px - 16px*2);
  gap: 12px;

  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  span.btn-clear {
    border-radius: 0.5rem;
    padding: 0 6px;

    &:not(.disabled) {
      color: #9CA3AF;
      font-weight: 600;
      ${HoverBackgroundCSS}
    }

    &.disabled {
      color: #D1D5DB;
    }
  }

  &.margin-top {
    margin-top: 64px;
  }
  
  span.select-platform {
    display: flex;
    padding-right: 8px;
    color: #9CA3AF;
    gap: 8px;
  }
`

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
      display: flex;
      align-items: center;
      visibility: hidden;

      width: 125px;
      height: 24px;
      padding: 6px 6px 6px 10px;
      gap: 2px;

      border: 1px solid #E5E7EB;
      border-radius: 8px;
      transition: 0.15s;

      font-weight: 500;
      font-size: 10px;
      line-height: 10px;
      color: #6B7280;

      ${HoverBackgroundCSS}
    }
    
    &:hover button {
      visibility: visible;
    }
  }
`;

export const DivPadding = styled.div`
  padding: 32px 0;
`