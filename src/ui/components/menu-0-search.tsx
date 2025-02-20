import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ContainerCanHide, Row_CenterCSS, FlexEnd, HoverOpacityCSS, DivPadding } from './styled';
import { SvgInfo, SvgTimes } from './svg';
import SelectPlatform from './platform-select';
import SearchResult from './search-result';
import ImageDetail from './image-detail';
import ButtonScrollTop from './btn-scroll-top';

import { PlatformFilter, ImageData } from '../../shared/api';
import useText2Img from '../hooks/useText2Img';
import useScroll from '../hooks/useScroll';
import useRequestManager from '../hooks/useRequestManager';


function MenuSearch({ prompt, setPrompt, menu, setMenu, setFile }) {
  const { getText2Img, maxIter } = useText2Img()
  const { scrollY, isScrollTop, isScrollBottom } = useScroll()
  const { isLoading, searchResult, preRequest, postRequest } = useRequestManager()
  
  const gradientRef = useRef(null)
  const inputTextRef = useRef(null)
  const imgCol1 = useRef(null)
  const imgCol2 = useRef(null)

  const [iter, setIter] = useState(0)
  const [filter, setFilter] = useState<PlatformFilter>('All')
  const [canClear, setCanClear] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData>(null)

  const generateText2Img = async (prompt: string) => {
    preRequest()
    if (prompt !== '') gradientRef.current!.classList.add('is-finish')
    setSelectedImage(null)
    clearResult()
    setIter(1)
    setPrompt(inputTextRef.current!.value)
    const json = await getText2Img(prompt, filter)
    postRequest(json, false)
    if (filter !== 'All') setCanClear(true)
  }

  const generateText2ImgAdd = async () => {
    preRequest()
    setIter(iter => iter + 1)
    const json = await getText2Img(prompt, filter)
    postRequest(json, true)
  }

  const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await generateText2Img(inputTextRef.current!.value) // Enter 입력이 되면 클릭 이벤트 실행
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    gradientRef.current!.classList.remove('is-finish')
    if (e.currentTarget.value === '') {
      gradientRef.current!.classList.remove('is-active')
    } else {
      gradientRef.current!.classList.add('is-active')
    }
  }

  const clearInput = () => {
    inputTextRef.current!.value = ''
    gradientRef.current!.classList.remove('is-active')
    gradientRef.current!.classList.remove('is-finish')
  }

  const clearResult = () => {
    imgCol1.current!.replaceChildren()
    imgCol2.current!.replaceChildren()
    setCanClear(false)
  }

  useEffect(() => {
    if (prompt) {
      inputTextRef.current!.value = prompt
      generateText2Img(prompt)
    }
  }, [prompt])

  useEffect(() => {
    generateText2Img(prompt)
  }, [filter])

  useEffect(() => {
    if (menu === 0 && !isScrollTop && isScrollBottom && !selectedImage && !isLoading && iter < maxIter) {
      generateText2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <>
    <ContainerCanHide className={selectedImage ? 'hidden' : ''}>
      <Row_Center_CanFixed className={!selectedImage && scrollY >= 40 ? 'fixed' : ''}>
        <SpanGradient ref={gradientRef}>
          <Input 
            ref={inputTextRef} type='text' placeholder='Search images...'
            onKeyPress={e => handleOnKeyPress(e)}
            onChange={e => handleOnChange(e)}
            defaultValue={prompt}
          >
          </Input>

          <SpanClear 
            className='clear' 
            onClick={clearInput}
          >
            <SvgTimes />
          </SpanClear>
        </SpanGradient>
  
        <SpanHover onClick={e => setMenu(3)}>
          <SvgInfo />
        </SpanHover>
      </Row_Center_CanFixed>
  
      <FlexEnd className={!selectedImage && scrollY >= 40 ? 'margin-top' : ''}>
        <span onClick={e => setFilter('All')} className={'btn-clear' + (canClear ? '' : ' disabled')}>
          Clear
        </span>
        <span className="select-platform">
          <span>Filter by</span>
          <SelectPlatform filter={filter} setFilter={setFilter}></SelectPlatform>
        </span>
      </FlexEnd>

      <SearchResult 
        searchResult={searchResult} 
        imgCol1={imgCol1}
        imgCol2={imgCol2}
        setMenu={setMenu} 
        setFile={setFile} 
        setSelectedImage={setSelectedImage}
      />

      {isLoading &&
        <DivPadding>Loading...</DivPadding> 
      }
 
      <ButtonScrollTop isScrollTop={isScrollTop}></ButtonScrollTop>
    </ContainerCanHide>

    {selectedImage && 
      <ImageDetail 
        selectedImage={selectedImage} 
        setSelectedImage={setSelectedImage} 
        filter={filter} 
        setFile={setFile} 
        menu={menu} 
        setMenu={setMenu}
      />
    }
    </>
  )
}


const Row_Center_CanFixed = styled.div`
  ${Row_CenterCSS}

  &.fixed {
    position: fixed;
    top: 0;
    padding: 16px 0;
    z-index: 1;
    background-color: #FFFFFF;
  }
`


const SpanGradient = styled.span`
  position: relative;
  width: 330px;
  height: 32px;
  border-radius: 1.5rem;
  border: 3px solid transparent;

  input {
    background: #F3F4F6;
  }

  &.is-active:not(.is-finish) {
    background-image: linear-gradient(#fff, #fff), linear-gradient(to bottom, #408FFF 0%, #FF007A 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-image-slice: 1;
  }

  &.is-finish {
    border: 2px solid #E5E7EB;
    margin: 1px;

    input {
      background: #FFFFFF;
    }
  }

  &:not(.is-active, .is-finish) {
    .clear {
      display: none;
    }
  }
`


const SpanClear = styled.span`
  position: absolute;
  top: 6px;
  right: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 8px;

  &:hover {
    background-color: rgb(220, 220, 220);
    cursor: pointer;
  }

  &:active {
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`


const SpanHover = styled.span`
  ${HoverOpacityCSS}
`


const Input = styled.input`
  width: 330px;
  height: 32px;
  border-radius: 1.5rem;
  font-size: 12px;
  padding: 0 15px;
  outline: none;
  border: 0;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #9CA3AF;
    opacity: 1; /* Firefox */
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #9CA3AF;
  }
  
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: #9CA3AF;
  }
`


export default MenuSearch
