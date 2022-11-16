import React, { useState, useRef, useEffect } from 'react';
import { ImageData } from '../shared'
import { Container, Input, Row, ImgCol } from './components/styled'
import CheckboxPlatform from './components/checkbox-platform'
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
  const getImg = useGetImg();
  const getText2Img = useText2Img();
  const getImg2Img = useImg2Img();
  const { isScrollBottom } = useScroll();
  
  const InputRef = useRef(null);
  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState({  
    midjourney: true,
    stableDiffusion: true,
  })
  const [isLoading, setIsLoading] = useState(false);
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

  const generateText2Img = async (prompt: string) => {
    if (isLoading || prompt.trim().length === 0) return
    setIsLoading(true)
    const images = await getText2Img(prompt, platform);
    showImages(images, false);
    setIsLoading(false)
  };

  const generateText2ImgAdd = async () => {
    if (isLoading || prompt.trim().length === 0) return
    setIsLoading(true)
    const images = await getText2Img(prompt, platform);
    showImages(images, true);
    setIsLoading(false)
  };

  const generateImg2Img = async (files: FileList) => {
    if (isLoading) return
    setIsLoading(true)
    const images = await getImg2Img(files[0], platform);
    showImages(images, false);
    setIsLoading(false)
  }

  const handleOnKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPrompt(InputRef.current!.value)
      await generateText2Img(InputRef.current!.value); // Enter 입력이 되면 클릭 이벤트 실행
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
        ref={InputRef} type='text' placeholder='What do you want?'
        onKeyPress={e => handleOnKeyPress(e)}
      >
      </Input>
      <CheckboxPlatform state={platform} setState={setPlatform}></CheckboxPlatform>

      <DragDropForm generateImg2Img={generateImg2Img}></DragDropForm>

      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading ? 'Loading...' : ''}
    </Container>
  );
}

export default App;
