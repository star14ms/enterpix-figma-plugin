import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ContainerCSS, Row, ColCSS, Row_CenterCSS, HoverBackgroundCSS, ImgCol, DivPadding } from './styled'
import { SvgSortRight, SvgArrow } from './svg'
import ButtonScrollTop from './btn-scroll-top';

import { ImageData, ResponseJson } from '../../shared/api';
import useGetImg from '../hooks/useGetImg';
import useImg2Img from '../hooks/useImg2Img';
import useScroll from '../hooks/useScroll';
import { img2File, createImgItem } from '../lib/utils';


function ImageDetail({ selectedImage, setSelectedImage, filter, setFile, setMenu }) {
  const getImg = useGetImg();
  const getImg2Img = useImg2Img();
  const { isScrollTop, isScrollBottom } = useScroll();

  const imgCol1 = useRef(null);
  const imgCol2 = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);
  const [file, setImageDetailFile] = useState<File>(null);

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
      const imageItem = createImgItem(image, getImg, setSelectedImage, setFile, setMenu)

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

  const generateImg2Img = async () => {
    if (isLoading) return
    setIsLoading(true)
    await img2File('_' + selectedImage.id, async (newfile: File) => {
      setImageDetailFile(newfile)
      const json = await getImg2Img(newfile, filter);
      postRequest(json, true)
    })
  }

  const generateImg2ImgAdd = async () => {
    if (isLoading) return
    setIsLoading(true)
    const json = await getImg2Img(file, filter);
    postRequest(json, true)
  }

  const postRequest = (json: ResponseJson, add: boolean) => {
    if (json.images) {
      showImages(json.images, add);
    }
    setIsLoading(false)
  }

  const searchSimilar = async () => {
    setSelectedImage(null); 
    setFile(file)
    setMenu(1)
  }

  useEffect(() => {
    generateImg2Img()
  }, [])

  useEffect(() => {
    if (!isScrollTop && isScrollBottom) {
      generateImg2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <Container>
      <DivRelative>
        <SpanHover onClick={e => setSelectedImage(null)}>
          <SvgArrow />
        </SpanHover>
        <img id={'_' + selectedImage.id} src={selectedImage.compressedUrl} height="180px" />
      </DivRelative>

      <Row_Center onClick={searchSimilar}>
        <Span>Search similar style</Span>
        <SvgSortRight />
      </Row_Center>

      <ColFlexStart>
        <span className="title">Prompt</span>
        <span>{ selectedImage.prompt }</span>
      </ColFlexStart>

      <SpanBlack>Related Photo</SpanBlack>

      <Row>
        <ImgCol ref={imgCol1}></ImgCol>
        <ImgCol ref={imgCol2}></ImgCol>
      </Row>

      {isLoading &&
        <DivPadding>Loading...</DivPadding> 
      }
 
      <ButtonScrollTop isScrollTop={isScrollTop}></ButtonScrollTop>
    </Container>
  );
}


const Container = styled.div`
  ${ContainerCSS}
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 0;
  width: calc(400px - 16px*2);
  margin: 16px;
  background-color: #FFFFFF;
`


const DivRelative = styled.div`
  ${Row_CenterCSS}
  position: relative;
  width: clac(400px - 8px*2);
`


const SpanHover = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;

  border-radius: 0.5rem;
  ${HoverBackgroundCSS}
`


const Row_Center = styled.div`
  ${Row_CenterCSS}
  ${HoverBackgroundCSS}
  height: 28px;

  border: 1px solid #E5E7EB;
  border-radius: 8px;
`


const Span = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  
  color: #111827;
`


const ColFlexStart = styled.div`
  ${ColCSS}
  align-items: flex-start;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  color: #000000;

  .title {
    font-size: 10px;
    line-height: 10px;
    
    color: #6B7280;
  }
`


const SpanBlack = styled.span`
  display: flex;
  justify-content: flex-start;

  width: 100%;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  
  color: #000000;
`


export default ImageDetail;
