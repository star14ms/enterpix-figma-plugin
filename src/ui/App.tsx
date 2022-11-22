import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Header from './components/header'
import Search from './components/search';
import ImageSearch from './components/image-search';
import Info from './components/info';


function App() {
  const [menu, setMenu] = useState(0);

  return (
    <Container>
      <Header menu={menu} setMenu={setMenu}></Header>
      
      <Main>
        {menu === 0 &&
          <Search setMenu={setMenu}></Search>
        }
        {menu === 1 && 
          <ImageSearch></ImageSearch>
        }
        {menu === 3 &&
          <Info></Info>
        }
      </Main>
    </Container>
  );
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;


const Main = styled.div`
  margin: 16px;
  height: 100%;
`


export default App;
