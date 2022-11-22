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
} from '../../images/keywords';


function MenuKeywords() {
  const keywords = [
    [fantasy, 'fantasy'],
    [anime, 'anime'],
    [horror, 'horror'],
    [product, 'product'],
    [monochrome, 'monochrome'],
    [abstract, 'abstract'],
    [nature, 'nature'],
    [animal, 'animal'],
    [plant, 'plant'],
    [architecture, 'architecture'],
    [portrait, 'portrait'],
    [art, 'art'],
    [colorful, 'colorful'],
    [space, 'space'],
    [food, 'food'],
    [technology, 'technology'],
  ]

  return (
    <Container>
      <img src={ banner } width="371" height="80" />
      
      <Ul>
      	{keywords.map((value, key) => (
          <Li key={key}> 
            <Img src={ value[0] } width="100" height="48" />
            <Gradient></Gradient>
            <Span>{ value[1] }</Span>
          </Li>
       	))}
      </Ul>
    </Container>
  )
}


const Ul = styled.li`
  list-style: none;
  padding-left: 0px;
  flex-wrap: wrap;
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