import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Header from './components/header'
import MenuSearch from './components/menu-search';
import MenuImageSearch from './components/menu-image-search';
import MenuKeywords from './components/menu-keywords';
import MenuInfo from './components/menu-info';


function App() {
  const [menu, setMenu] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File>(null);

  return (
    <Container>
      <Header menu={menu} setMenu={setMenu} setPrompt={setPrompt} setFile={setFile}></Header>
      
      <Main>
        {menu === 0 && 
          <MenuSearch setMenu={setMenu} prompt={prompt} setPrompt={setPrompt} setFile={setFile}></MenuSearch>
        }
        {menu === 1 && 
          <MenuImageSearch setMenu={setMenu} file={file} setFile={setFile}></MenuImageSearch>
        }
        {menu === 2 && 
          <MenuKeywords setMenu={setMenu} setPrompt={setPrompt}></MenuKeywords>
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

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: never;
  }
`;


const Main = styled.div`
  margin: 16px;
  height: 100%;
`


export default App;
