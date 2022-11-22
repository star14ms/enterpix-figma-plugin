import React, { useState, useRef, useEffect } from 'react';
import { ImageData, ResponseJson } from '../../shared/api'
import { Container, Row, ImgCol } from './styled'
import DragDropForm from './drag-drop-from'
import useImg2Img from '../hooks/useImg2Img';
import useGetImg from '../hooks/useGetImg';
import useScroll from '../hooks/useScroll';

import { img2File, createImgItem } from '../lib/utils';


function MenuImageSearch({ file, setFile, setMenu }){
  const getImg = useGetImg();
  const getImg2Img = useImg2Img();
  const { isScrollBottom } = useScroll();
  
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
      const imageItem = createImgItem(image, getImg, img2File, setFile, setMenu)

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

  const generateImg2Img = async (file: File) => {
    if (isLoading) return
    setIsLoading(true)
    setFile(file)
    const json = await getImg2Img(file, platform);
    postRequest(json, false)
  }

  const generateImg2ImgAdd = async () => {
    if (isLoading) return
    setIsLoading(true)
    const json = await getImg2Img(file, platform);
    postRequest(json, true)
  }

  const postRequest = (json: ResponseJson, add: boolean) => {
    if (json.images) {
      showImages(json.images, add);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isScrollBottom) {
      generateImg2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <Container>
      <DragDropForm generateImg2Img={generateImg2Img} file={file}></DragDropForm>

      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading ? 'Loading...' : ''}
    </Container>
  );
}

export default MenuImageSearch;
