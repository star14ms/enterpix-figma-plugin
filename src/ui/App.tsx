import React, { useState, useRef, useEffect } from 'react';
import { ImageData } from '../shared'
import styled from 'styled-components';

import useRandomQuotes from './hooks/useRandomQuotes';
import useText2Img from './hooks/useText2Img';
import useImg2Img from './hooks/useImg2Img';
import useGetImg from './hooks/useGetImg';
import useScroll from './hooks/useScroll';

import { 
  requestGenerateRandomQuoteToPlugin, 
  requestgenerateTypedQuoteToPlugin,
  requestgenerateImageToPlugin
} from './lib/figma';
import { img2Uint8Array } from './lib/utils'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  padding: 10px auto;
  border-radius: 1rem;
  font-size: 24px;
  transition: 0.15s;
  width: 30%;
  cursor: pointer;

  &:hover {
    background-color: #191919;
  }
`;

const Text = styled.p`
  font-size: 24px;
`;

const Input = styled.input`
  font-size: 24px;
  margin-top: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-basis: auto;
  width: 100%;
  box-sizing: border-box;
`;

const ImgCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  margin: 8px 8px;
  
  & img {
    margin: 8px 0;
    width: 100%;
    transition: 0.15s;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const getRandomQuote = useRandomQuotes();
  const getImg = useGetImg();
  const getText2Img = useText2Img();
  const getImg2Img = useImg2Img();
  const { isScrollBottom } = useScroll();
  const [prompt, setPrompt] = useState("");

  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    requestGenerateRandomQuoteToPlugin(randomQuote);
    setIsLoading(false);
  };

  const generateTypedQuote = async () => {
    requestgenerateTypedQuoteToPlugin(prompt);
  };

  const generateImg = async () => {
    const array = await getImg(prompt);
    requestgenerateImageToPlugin(array)
  }

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
      // el.crossOrigin = "Anonymous";

      el.addEventListener('click', async () => {
        const arrayData = img2Uint8Array(el.id, image.width, image.height);
        requestgenerateImageToPlugin(arrayData.array, arrayData.width, arrayData.height)
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

  const generateText2Img = async () => {
    setIsLoading(true)
    const images = await getText2Img(prompt);
    showImages(images, false);
    setIsLoading(false)
  };

  const generateText2ImgAdd = async () => {
    setIsLoading(true)
    const images = await getText2Img(prompt);
    showImages(images, true);
    setIsLoading(false)
  };

  const generateImg2Img = async () => {
    const data = await getImg2Img(null);
  };

  useEffect(() => {
    if (isScrollBottom) {
      generateText2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <Container>
      <Row>
        <Button onClick={generateImg}>
          {isLoading ? 'Loading...' : 'GetImg'}
        </Button>
  
        <Button onClick={generateText2Img}>
          {isLoading ? 'Loading...' : 'Text2Img'}
        </Button>
  
        <Button onClick={generateImg2Img}>
          {isLoading ? 'Loading...' : 'Img2Img'}
        </Button>
      </Row>

      <Input value={prompt} onChange={e => setPrompt(e.target.value)} type='text' placeholder='What do you want?'></Input>
      
      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading ? 'Loading...' : ''}

      {/* <Text>Type Text and Click</Text>
      <Button onClick={generateTypedQuote}>
        {isLoading ? 'Loading...' : 'Typed Quote'}
      </Button>

      <Text>Select Text Node and Click</Text>
      <Button onClick={generateRandomQuote}>
        {isLoading ? 'Loading...' : 'Random Quote'}
      </Button> */}
    </Container>
  );
}

export default App;
