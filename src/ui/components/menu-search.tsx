import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Row_Center, ImgCol, HoverCSS } from './styled'
import { SvgInfo } from './svg'
import CheckboxPlatform from './checkbox-platform'

import { ImageData, ResponseJson } from '../../shared/api'
import useText2Img from '../hooks/useText2Img';
import useGetImg from '../hooks/useGetImg';
import useScroll from '../hooks/useScroll';
import { requestgenerateImageToPlugin } from '../lib/figma';


function MenuSearch({ setMenu, prompt, setPrompt }) {
  const getImg = useGetImg();
  const getText2Img = useText2Img();
  const { isScrollBottom } = useScroll();
  
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

  const showImages = (images: ImageData[], add: boolean = false) => {
    if (!add) {
      setCol1Height(0)
      setCol2Height(0)
      imgCol2.current!.replaceChildren();
      imgCol1.current!.replaceChildren();
    }

    // console.log(col1Height, col2Height)

    let col1H = col1Height, col2H = col2Height

    for (const image of images) {
      const el = document.createElement('img');
      el.id = image.id
      el.src = image.compressedUrl

      el.addEventListener('click', async () => {
        const array = await getImg(image.compressedUrl);
        requestgenerateImageToPlugin(array, image.width, image.height)
      });

      if (col1H > col2H) {
        col2H = col2H + image.height / image.width;
        imgCol2.current!.appendChild(el);
      } else {
        col1H = col1H + image.height / image.width;
        imgCol1.current!.appendChild(el);
      }
    }
    setCol1Height(col1H)
    setCol2Height(col2H)
  }

  const generateText2Img = async (prompt: string) => {
    if (isLoading || prompt.trim().length === 0) return
    setIsLoading(true)
    setPrompt(inputTextRef.current!.value)
    const json = await getText2Img(prompt, platform);
    postRequest(json, false)
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

  useEffect(() => {
    if (prompt) {
      gradientRef.current!.classList.add('is-active')
      generateText2Img(prompt)
    }
  }, [])

  useEffect(() => {
    if (isScrollBottom) {
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

      <CheckboxPlatform state={platform} setState={setPlatform}></CheckboxPlatform>

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
  ${HoverCSS}
`

const Input = styled.input`
  width: 336px;
  height: 32px;
  background: #F3F4F6;
  border-radius: 1.5rem;
  padding: 0 15px;
  outline: none;
  border: 0;
`


export default MenuSearch;
