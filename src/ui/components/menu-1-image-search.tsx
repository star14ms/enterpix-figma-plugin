import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, FlexEnd, ImgCol } from './styled'
import SelectPlatform from './platform-select';
import DragDropForm from './drag-drop-from'
import ImageDetail from './image-detail';
import useScroll from '../hooks/useScroll';
import ButtonScrollTop from './btn-scroll-top';

import { ImageData, ResponseJson } from '../../shared/api'
import useImg2Img from '../hooks/useImg2Img';
import useGetImg from '../hooks/useGetImg';
import { searchSimilar, createImgItem } from '../lib/utils';


function MenuImageSearch({ file, setFile, menu, setMenu }){
  const getImg = useGetImg();
  const getImg2Img = useImg2Img();
  const { isScrollTop, isScrollBottom } = useScroll();
  
  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);

  const [platform, setPlatform] = useState({  midjourney: true, stableDiffusion: true })
  const [isLoading, setIsLoading] = useState(false);
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);
  const [canClear, setCanClear] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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
      const imageItem = createImgItem(image, getImg, searchSimilar, setSelectedImage, setFile, setMenu)

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
    setCanClear(true)
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

  const clearResult = () => {
    imgCol1.current!.replaceChildren()
    imgCol2.current!.replaceChildren()
    setCanClear(false)
  }

  useEffect(() => {
    if (menu === 1 && isScrollBottom) {
      generateImg2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <>
    <Container>
      <Container className={selectedImage ? 'hidden' : ''}>
        <DragDropForm file={file} setFile={setFile} generateImg2Img={generateImg2Img} platform={platform}></DragDropForm>

        {file && 
          <>
          <FlexEnd>
            <span onClick={e => canClear ? clearResult() : {}} className={'btn-clear' + (canClear ? '' : ' disabled')}>
              Clear
            </span>
            <span className="select-platform">
              <span>Filter by</span>
              <SelectPlatform setPlatform={setPlatform}></SelectPlatform>
            </span>
          </FlexEnd>
          </>
        }
      </Container>

      {file && 
        <>
        <ImageDetail selectedImage={selectedImage} setSelectedImage={setSelectedImage} setFile={setFile} setMenu={setMenu}/>

        <Row>
          <ImgCol ref={imgCol1}></ImgCol>
          <ImgCol ref={imgCol2}></ImgCol>
        </Row>
        </>
      }

      {isLoading ? 'Loading...' : ''}

      <ButtonScrollTop isScrollTop={isScrollTop}></ButtonScrollTop>
    </Container>
    </>
    );
}

export default MenuImageSearch;
