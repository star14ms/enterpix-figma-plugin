import React, { useRef } from 'react';
import styled from 'styled-components';
import { HoverBackgroundCSS } from './styled';
import { SvgSortUp, SvgCheck } from './svg';


function SelectPlatform({ filter, setFilter }) {
  const detailRef = useRef(null);

  const handleClick = (choice: string) => {
    setFilter(choice)
    detailRef.current!.removeAttribute("open");
  }

  return (
    <Details ref={detailRef}>
      <summary>
        <span>{filter}</span>
        <SvgSortUp />
      </summary>

      <Ul>
        <Li 
          className={filter === 'All' ? 'is-active' : ''} 
          onClick={e => { handleClick('All') }}
        >
          <SvgCheck />
          <span>All</span>
        </Li>
        <Li 
          className={filter === 'Midjourney' ? 'is-active' : ''} 
          onClick={e => { handleClick('Midjourney') }}
        >
          <SvgCheck />
          <span>Midjourney</span>
        </Li>
        <Li 
          className={filter === 'Stable Diffusion' ? 'is-active' : ''} 
          onClick={e => { handleClick('Stable Diffusion') }}
        >
          <SvgCheck />
          <span>Stable Diffusion</span>
        </Li>
      </Ul>
    </Details>
  )
}


const Details = styled.details`
  position: relative;

  summary {
    display: flex;
    align-items: center;

    font-weight: 600;
    color: #000000;

    span {
      padding: 0 6px;
      border-radius: 0.5rem;
      ${HoverBackgroundCSS}
    }
  }

  summary svg {
    margin-left: 1ch;
    display: inline-block;
    transition: 0.2s;
  }
  
  &:not([open]) summary svg {
    transform: rotate(180deg);
  }

  &[open] summary ~ * {
    animation: sweep .3s ease-in-out;
  }
  
  @keyframes sweep {
    0%    {height: 0px; margin-left: -10px}
    100%  {height: 80px; margin-left: 0px}
  }
`


const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 0;
  z-index: 1;

  width: 132px;
  height: 80px;
  overflow: hidden;

  list-style: none;
  padding: 4px;

  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  transition: 0.3s ease-in;
`


const Li = styled.li`
  display: flex;
  align-items: center;
  height: 20px;

  padding: 2px;
  gap: 4px;

  color: #6B7280;

  transition: 0.15s;
  border-radius: 1rem;
  ${HoverBackgroundCSS}

  &:not(.is-active) svg {
    visibility: hidden;
  }

  &.is-active {
    font-weight: 600;
    color: #6D7DFD;
  }
`


export default SelectPlatform;