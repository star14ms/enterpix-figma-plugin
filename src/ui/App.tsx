import React, { useState, useRef, useEffect } from 'react';
import { ImageData } from '../shared'
import { Container, Button, Text, Input, Row, ImgCol } from './components/styled'
import DragDropForm from './components/drag-drop-from'
import Header from './components/header'
import useText2Img from './hooks/useText2Img';
import useImg2Img from './hooks/useImg2Img';
import useGetImg from './hooks/useGetImg';
import useScroll from './hooks/useScroll';

import { 
  requestgenerateImageToPlugin
} from './lib/figma';


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const getImg = useGetImg();
  const getText2Img = useText2Img();
  const { isScrollBottom } = useScroll();
  const [prompt, setPrompt] = useState("");

  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);

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
        const array = img2Uint8Array(el.id, image.width, image.height);
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


  const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await generateText2Img(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  }

  useEffect(() => {
    if (isScrollBottom) {
      generateText2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <Container>
      <Header></Header>

      <Input 
        value={prompt} type='text' placeholder='What do you want?'
        onKeyPress={e => handleOnKeyPress(e)} 
        onChange={e => setPrompt(e.target.value)}>
      </Input>

      <DragDropForm></DragDropForm>

      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading ? 'Loading...' : ''}
    </Container>
  );
}

export default App;
