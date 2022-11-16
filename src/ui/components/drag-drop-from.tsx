import React, { useState, useRef } from 'react';
import styled from 'styled-components';
// import { Container, Button, Text, Input, Row, ImgCol } from './styled'

  

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

border: 2px dashed #ccc;
border-radius: 20px;
width: 400px;
height: calc(400px / 1.618);
margin: 16px auto 0;
padding: 20px;

&.highlight, &:hover {
  border-color: purple;
  cursor: pointer;
}

a {
  color: #369;
}

p {
  font-size: 24px;
  margin: 0;
}

.my-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;
}

#gallery {
  margin-top: 10px;
}

#gallery img {
  width: 150px;
  margin-bottom: 10px;
  margin-right: 10px;
  vertical-align: middle;
}

.button {
  width: 0;
  height: 0;
}

.button:hover {
  background: #5969E9;
}

#fileElem {
  display: none;
}
`


function DragDropForm({ generateImg2Img }) {
  const dropArea = useRef(null);
  const inputArea = useRef(null);
  const labelArea = useRef(null);

  const [fileUploaded, setFileUploaded] = useState(false)

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  function highlight(e) {
    preventDefaults(e)
    dropArea.current!.classList.add('highlight')
  }
  
  function unhighlight(e) {
    preventDefaults(e)
    dropArea.current!.classList.remove('highlight')
  }
  
  function handleDrop(e) {
    preventDefaults(e)
    var dt = e.dataTransfer
    var files = dt.files
  
    handleGenerateImg2Img(files)
  }

  function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = String(reader.result)
      document.getElementById('gallery').replaceChildren(img)
    }
  }

  function handleGenerateImg2Img(files: FileList) {
    setFileUploaded(true)
    previewFile(files[0])
    generateImg2Img(files)
  }

  return (
    <Container 
      ref={dropArea}
      onDragOver={(e) => highlight(e)}
      onDrop={(e) => handleDrop(e)}
      onDragEnter={(e) => highlight(e)}
      onDragLeave={(e) => unhighlight(e)}
      onClick={(e) => labelArea.current!.click()}
    >
      <form className="my-form">
        {!fileUploaded && <>
          <p>Upload an image</p>
        </>}
        <input ref={inputArea} type="file" id="fileElem" accept="image/*" onChange={(e) => handleGenerateImg2Img(e.target.files)} />
        <label ref={labelArea} className="button" htmlFor="fileElem"></label>
      </form>
      <div id="gallery"></div>
    </Container>
  );
}


export default DragDropForm