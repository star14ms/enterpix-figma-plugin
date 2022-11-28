import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, HoverBackgroundCSS } from './styled';

import { ImageData } from '../../shared/api';
import useGetImg from '../hooks/useGetImg';
import { createImgItem } from '../lib/utils';


type MenuSearchProps = {
    searchResult: {
        images: ImageData[], 
        add: boolean, 
    }
    imgCol1: React.RefObject<HTMLDivElement>,
    imgCol2: React.RefObject<HTMLDivElement>,
    setMenu: React.Dispatch<React.SetStateAction<number>>, 
    setFile: React.Dispatch<React.SetStateAction<File>>, 
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageData>>, 
}


function SearchResult({ searchResult, imgCol1, imgCol2, setMenu, setFile, setSelectedImage }: MenuSearchProps) {
  const getImg = useGetImg();
  
  const [col1Height, setCol1Height] = useState(0);
  const [col2Height, setCol2Height] = useState(0);

  const showImages = () => {
    let col1H: number, col2H: number

    if (!searchResult.add) {
      setCol1Height(0)
      setCol2Height(0)
      col1H = 0, col2H = 0
    } else {
      col1H = col1Height, col2H = col2Height
    }

    for (const image of searchResult.images) {
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

  useEffect(() => {
    if (searchResult.images) showImages()
  }, [searchResult])

  return (
    <Row>
      <ImgCol ref={imgCol1}></ImgCol>
      <ImgCol ref={imgCol2}></ImgCol>
    </Row>
  );
}


const ImgCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  gap: 8px;
  margin-bottom: 8px;

  div {
    position: relative;

    img {
      width: 100%;
      transition: 0.15s;

      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
    
    button {
      position: absolute;
      bottom: 6px;
      right: 6px;
      display: flex;
      align-items: center;
      visibility: hidden;

      width: 125px;
      height: 24px;
      padding: 6px 6px 6px 10px;
      gap: 2px;

      border: 1px solid #E5E7EB;
      border-radius: 8px;
      transition: 0.15s;

      font-weight: 500;
      font-size: 10px;
      line-height: 10px;
      color: #6B7280;

      ${HoverBackgroundCSS}
    }
    
    &:hover button {
      visibility: visible;
    }
  }
`;


export default SearchResult;
