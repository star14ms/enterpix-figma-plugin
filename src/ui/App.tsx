import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Container } from './components/styled'
import Header from './components/header'
import Search from './components/search';
import ImageSearch from './components/image-search';


function App() {
  const [headerMenu, setHeaderMenu] = useState(0);

  return (
    <Container>
      <Header headerMenu={headerMenu} setHeaderMenu={setHeaderMenu}></Header>
      
      <Main>
        {headerMenu === 0 && 
          <Search></Search>
        }
        {headerMenu === 1 && 
          <ImageSearch></ImageSearch>
        }
      </Main>
    </Container>
  );
}


const Main = styled.div`
  margin: 16px;
  height: 100%;
`


export default App;
