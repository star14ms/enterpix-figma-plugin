import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ContainerCSS, ColCSS, Row_CenterCSS, HoverBackgroundCSS, DivPadding } from './styled'
import { SvgSortRight, SvgArrow } from './svg'
import SearchResult from './search-result';
import ButtonScrollTop from './btn-scroll-top';

import useImg2Img from '../hooks/useImg2Img';
import useScroll from '../hooks/useScroll';
import useRequestManager from '../hooks/useRequestManager';
import { img2File } from '../lib/utils';


function ImageDetail({ selectedImage, setSelectedImage, filter, setFile, menu, setMenu }) {
  const getImg2Img = useImg2Img()
  const { isScrollTop, isScrollBottom } = useScroll()
  const { isLoading, searchResult, preRequest, postRequest } = useRequestManager()

  const imgCol1 = useRef(null)
  const imgCol2 = useRef(null)

  const [file, setImageDetailFile] = useState<File>(null)
  const [imageDetailMenu, setImageDetailMenu] = useState<File>(null)

  const generateImg2Img = async () => {
    preRequest()
    await img2File('_' + selectedImage.id, async (newfile: File) => {
      setImageDetailFile(newfile)
      const json = await getImg2Img(newfile, filter)
      postRequest(json, true)
    })
  }

  const generateImg2ImgAdd = async () => {
    preRequest()
    const json = await getImg2Img(file, filter)
    postRequest(json, true)
  }

  const searchSimilar = async () => {
    if (menu === 1) {
      setImageDetailFile(null)
    }
    setFile(file)
    setMenu(1)
  }

  useEffect(() => {
    generateImg2Img()
    setImageDetailMenu(menu)
  }, [])

  useEffect(() => {
    if (!isScrollTop && isScrollBottom && !isLoading && menu === imageDetailMenu) {
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
    </Container>
  )
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
