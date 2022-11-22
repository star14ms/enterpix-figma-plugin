import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Header from './components/header'
import MenuSearch from './components/menu-search';
import MenuImageSearch from './components/menu-image-search';
import MenuKeywords from './components/menu-keywords';
import MenuInfo from './components/menu-info';


function App() {
  const [menu, setMenu] = useState(0);

  return (
    <Container>
      <Header menu={menu} setMenu={setMenu}></Header>
      
      <Main>
        {menu === 0 && 
          <MenuSearch setMenu={setMenu}></MenuSearch>
        }
        {menu === 1 && 
          <MenuImageSearch></MenuImageSearch>
        }
        {menu === 2 && 
          <MenuKeywords></MenuKeywords>
        }
        {menu === 3 && 
          <MenuInfo></MenuInfo>
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
