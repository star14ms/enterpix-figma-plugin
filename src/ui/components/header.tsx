import React from 'react';
import styled from 'styled-components';
import { HoverBackgroundCSS } from './styled'


function Header({ menu, setMenu }) {

  const SvgSearch = () => {
    return (
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 13L9 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z" 
          stroke={strokeColor(0)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </Svg>
    )
  }

  const SvgImageSearch = () => {
    return (
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66669 9.66669L4.72388 6.6095C5.24458 6.0888 6.0888 6.0888 6.6095 6.6095L9.66669 9.66669M8.33335 8.33335L9.39054 7.27616C9.91124 6.75546 10.7555 6.75546 11.2762 7.27616L12.3334 8.33335M8.33335 4.33335H8.34002M3.00002 12.3334H11C11.7364 12.3334 12.3334 11.7364 12.3334 11V3.00002C12.3334 2.26364 11.7364 1.66669 11 1.66669H3.00002C2.26364 1.66669 1.66669 2.26364 1.66669 3.00002V11C1.66669 11.7364 2.26364 12.3334 3.00002 12.3334Z" 
          stroke={strokeColor(1)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </Svg>
    )
  }

  const SvgKeywords = () => {
    return (
      <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.66667 3.66667H3.67333M3.66667 1H7C7.34124 0.99999 7.68245 1.13016 7.94281 1.39052L12.6095 6.05719C13.1302 6.57789 13.1302 7.42211 12.6095 7.94281L7.94281 12.6095C7.42211 13.1302 6.57789 13.1302 6.05719 12.6095L1.39052 7.94281C1.13018 7.68246 1 7.34123 1 7V3.66667C1 2.19391 2.19391 1 3.66667 1Z" 
          stroke={strokeColor(2)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </Svg>
    )
  }

  const strokeColor = (menuNum: Number) => {
    return menuNum === menu ? '#6D7DFD' : '#9CA3AF'
  }

  return (
    <Container>
      <Div onClick={e => { setMenu(0) }} className={menu === 0 ? 'is-active' : ''}>
        <SvgSearch />
        <Span>Search</Span>
      </Div>

      <Div onClick={e => { setMenu(1) }} className={menu === 1 ? 'is-active' : ''}>
        <SvgImageSearch />
        <Span>Image Search</Span>
      </Div>

      <Div onClick={e => setMenu(2)} className={menu === 2 ? 'is-active' : ''}>
        <SvgKeywords />
        <Span>KeyWords</Span>
      </Div>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  gap: 4px;
  border-bottom: 2px solid #F3F4F6;
  
  height: 28px;
  
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`


const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  gap: 4px;
  
  border-radius: 1rem;
  color: #9CA3AF;
  transition: 0.15s;
  
  &.is-active {
    transition: 0.15s;
    color: #6D7DFD;
  }
  
  ${HoverBackgroundCSS}
`


const Span = styled.span`
  height: 11px;
  
  font-weight: 600;
  font-size: 11px;
  line-height: 11px;
`


const Svg = styled.svg`
  width: 16px;
  height: 16px;
`


export default Header
