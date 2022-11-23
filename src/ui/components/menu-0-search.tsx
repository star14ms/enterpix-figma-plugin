import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Row_Center, FlexEnd, ImgCol, HoverOpacityCSS } from './styled'
import { SvgInfo } from './svg'
import SelectPlatform from './platform-select';

import { ImageData, ResponseJson } from '../../shared/api'
import useText2Img from '../hooks/useText2Img';
import useGetImg from '../hooks/useGetImg';
import { SearchSimilar, createImgItem } from '../lib/utils';


function MenuSearch({ prompt, setPrompt, isScrollBottom, menu, setMenu, setFile }) {
  const getImg = useGetImg();
  const getText2Img = useText2Img();
  
  const gradientRef = useRef(null);
  const inputTextRef = useRef(null);
  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);

  const [platform, setPlatform] = useState({  
    midjourney: true,
    stableDiffusion: true,
  })
  const [isLoading, setIsLoading] = useState(false);
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);
  const [canClear, setCanClear] = useState(false);

  const showImages = (images: ImageData[], add: boolean = false) => {
    let col1H: number, col2H: number

    if (!add) {
      setCol1Height(0)
      setCol2Height(0)
      col1H = 0, col2H = 0
    } else {
      col1H = col1Height, col2H = col2Height
    }

    for (const image of images) {
      const imageItem = createImgItem(image, getImg, SearchSimilar, setFile, setMenu)

      if (col1H > col2H) {
        col2H = col2H + image.height / image.width;
        imgCol2.current!.appendChild(imageItem);
      } else {
        col1H = col1H + image.height / image.width;
        imgCol1.current!.appendChild(imageItem);
      }
    }
    setCol1Height(col1H)
    setCol2Height(col2H)
  }

  const generateText2Img = async (prompt: string) => {
    if (isLoading || prompt.trim().length === 0) return
    setIsLoading(true)
    ClearResult()
    setPrompt(inputTextRef.current!.value)
    const json = await getText2Img(prompt, platform);
    postRequest(json, false)
    setCanClear(true)
  };

  const generateText2ImgAdd = async () => {
    if (isLoading || prompt.trim().length === 0) return
    setIsLoading(true)
    const json = await getText2Img(prompt, platform);
    postRequest(json, true)
  };

  const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await generateText2Img(inputTextRef.current!.value); // Enter 입력이 되면 클릭 이벤트 실행
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      gradientRef.current!.classList.remove('is-active')
    } else {
      gradientRef.current!.classList.add('is-active')
    }
  }

  const postRequest = (json: ResponseJson, add: boolean) => {
    if (json.images) {
      showImages(json.images, add);
    }
    setIsLoading(false)
  }

  const ClearResult = () => {
    imgCol1.current!.replaceChildren()
    imgCol2.current!.replaceChildren()
    setCanClear(false)
  }

  useEffect(() => {
    if (prompt) {
      inputTextRef.current!.value = prompt
      gradientRef.current!.classList.add('is-active')
      generateText2Img(prompt)
    }
  }, [prompt])

  useEffect(() => {
    if (inputTextRef.current!.value) {
      gradientRef.current!.classList.add('is-active')
      generateText2Img(prompt)
    }
  }, [platform])

  useEffect(() => {
    if (menu === 0 || isScrollBottom) {
      generateText2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <Container>
      <Row_Center>
        <SpanGradient ref={gradientRef}>
          <Input 
            ref={inputTextRef} type='text' placeholder='Search images...'
            onKeyPress={e => handleOnKeyPress(e)}
            onChange={e => handleOnChange(e)}
            defaultValue={prompt}
          >
          </Input>
        </SpanGradient>

        <SpanHover onClick={e => setMenu(3)}>
          <SvgInfo></SvgInfo>
        </SpanHover>
      </Row_Center>

      <FlexEnd>
        <span onClick={e => canClear ? ClearResult() : {}} className={'btn-clear' + (canClear ? '' : ' disabled')}>
          Clear
        </span>
        <span className="select-platform">
          <span>Filter by</span>
          <SelectPlatform setPlatform={setPlatform}></SelectPlatform>
        </span>
      </FlexEnd>

      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading ? 'Loading...' : ''}
    </Container>
  );
}


const SpanGradient = styled.span`
  width: 336px;
  height: 32px;
  border-radius: 1.5rem;
  border: 3px solid transparent;
  
  &.is-active {
    background-image: linear-gradient(#fff, #fff), linear-gradient(to bottom, #408FFF 0%, #FF007A 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-image-slice: 1;
  }
`


const SpanHover = styled.span`
  ${HoverOpacityCSS}
`


const Input = styled.input`
  width: 336px;
  height: 32px;
  background: #F3F4F6;
  border-radius: 1.5rem;
  font-size: 18px;
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


export default MenuSearch;
