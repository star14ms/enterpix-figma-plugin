import React from 'react';
import styled from 'styled-components';
import { Container, HoverOpacityCSS, DivRelative } from './styled';

import banner from '../../images/banner.png';
import * as image from '../../images/keywords';


function MenuKeywords({ setMenu, setPrompt }) {
  const keywords = [
    [image.fantasy, 'Fantasy'],
    [image.anime, 'Anime'],
    [image.horror, 'Horror'],
    [image.product, 'Product'],
    [image.monochrome, 'Monochrome'],
    [image.abstract, 'Abstract'],
    [image.nature, 'Nature'],
    [image.animal, 'Animal'],
    [image.plant, 'Plant'],
    [image.architecture, 'Architecture'],
    [image.portrait, 'Portrait'],
    [image.art, 'Art'],
    [image.colorful, 'Colorful'],
    [image.space, 'Space'],
    [image.food, 'Food'],
    [image.technology, 'Technology'],
    [image.interior, 'Interior'],
    [image.texture, 'Texture'],
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
            <DivRelative>
              <Img src={ value[0] } width="100" height="48" />
              <Gradient></Gradient>
            </DivRelative>
            <Span>{ value[1] }</Span>
          </Li>
       	))}
      </Ul>
    </Container>
  )
}


const A = styled.a`
  ${HoverOpacityCSS}
`


const Ul = styled.ul`
  list-style: none;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
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

  ${HoverOpacityCSS}
  transition: 0.15s;
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
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  
  color: #374151;
`


const Img = styled.img`
  border-radius: 8px;
`


export default MenuKeywords