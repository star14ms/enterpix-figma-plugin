import React from "react";
import styled from "styled-components";
import { HoverBackgroundCSS } from "./styled";
import { SvgChevronDoubleUp } from "./svg";


function ButtonScrollTop({ isScrollTop }) {
  return (
    <SpanScrollTop className={isScrollTop ? 'hidden': ''} onClick={e => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <SvgChevronDoubleUp />
    </SpanScrollTop>
  )
}


const SpanScrollTop = styled.span`
  position: fixed;
  bottom: 16px;
  right: 16px;

  width: 40px;
  height: 40px;
  
  border-radius: 1rem;
  transition: 0.5s;
  
  ${HoverBackgroundCSS}

  &.hidden {
    transition: 0.3s;
    visibility: hidden;
    opacity: 0;
    bottom: -60px;
  }
`


export default ButtonScrollTop