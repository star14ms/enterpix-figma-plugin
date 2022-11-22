import React from 'react';
import styled, { css } from 'styled-components';
import { Container, Row_CenterCSS, Col_CenterCSS, HoverCSS } from './styled'

import banner from '../../images/banner.png';
import { 
  fantasy,
  anime,
  horror,
  product,
  monochrome,
  abstract,
  nature,
  animal,
  plant,
  architecture,
  portrait,
  art,
  colorful,
  space,
  food,
  technology,
  interior,
  texture,
} from '../../images/keywords';


function MenuKeywords({ setMenu, setPrompt }) {
  const keywords = [
    [fantasy, 'Fantasy'],
    [anime, 'Anime'],
    [horror, 'Horror'],
    [product, 'Product'],
    [monochrome, 'Monochrome'],
    [abstract, 'Abstract'],
    [nature, 'Nature'],
    [animal, 'Animal'],
    [plant, 'Plant'],
    [architecture, 'Architecture'],
    [portrait, 'Portrait'],
    [art, 'Art'],
    [colorful, 'Colorful'],
    [space, 'Space'],
    [food, 'Food'],
    [technology, 'Technology'],
    [interior, 'Interior'],
    [texture, 'Texture'],
  ]

  const searchKeyword = (keyword: String) => {
    setPrompt(keyword)
    setMenu(0)
  }

  return (
    <Container>
      <A target="_blank" href="https://enterpix.app/">
        <Img src={ banner } width="371" height="80" />
      </A>
      
      <Ul>
      	{keywords.map((value, key) => (
          <Li key={key} onClick={e => searchKeyword(value[1])}>
            <ImgBox>
              <Img src={ value[0] } width="100" height="48" />
              <Gradient></Gradient>
            </ImgBox>
            <Span>{ value[1] }</Span>
          </Li>
       	))}
      </Ul>
    </Container>
  )
}


const A = styled.a`
  ${HoverCSS}
`


const Ul = styled.li`
  list-style: none;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 16px;
`


const Li = styled.li`
  box-sizing: border-box;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px 0px 0px;
  
  width: 180px;
  height: 48px;
  
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  
  flex: none;
  order: 0;
  flex-grow: 0;

  ${HoverCSS}
  transition: 0.15s;
`


const ImgBox = styled.div`
  position: relative;
`


const Gradient = styled.div`
  position: absolute;
  width: 40px;
  height: 48px;
  right: 0px;
  top: calc(50% - 48px/2);
  
  background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
`


const Span = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  
  color: #374151;
`


const Img = styled.img`
  border-radius: 8px;
`


export default MenuKeywords