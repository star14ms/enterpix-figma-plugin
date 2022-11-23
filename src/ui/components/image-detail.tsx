import React from 'react';
import styled from 'styled-components';
import { Container, ColCSS, Row_CenterCSS, HoverBackgroundCSS } from './styled'
import { SvgSortRight, SvgArrow } from './svg'

import { searchSimilar } from '../lib/utils';


function ImageDetail({ selectedImage, setSelectedImage, setFile, setMenu }) {

  return (
    <Container className={selectedImage ? '' : 'hidden'}>
      <DivRelative>
        <SpanHover onClick={e => setSelectedImage('')}>
          <SvgArrow />
        </SpanHover>
        <img src={selectedImage.compressedUrl} height="180px" />
      </DivRelative>

      <Row_Center onClick={e => {setSelectedImage(''); searchSimilar(selectedImage.id, setFile, setMenu) }}>
        <Span>Search similar style</Span>
        <SvgSortRight />
      </Row_Center>

      <ColFlexStart>
        <SpanGray>Prompt</SpanGray>

      </ColFlexStart>

      <SpanBlack>Related Photo</SpanBlack>
    </Container>
  );
}


const DivRelative = styled.div`
  ${Row_CenterCSS}
  position: relative;
`


const SpanHover = styled.span`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 24px;
  height: 24px;

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
  align-items: flex-start
`


const SpanGray = styled.span`
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  
  color: #6B7280;
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
