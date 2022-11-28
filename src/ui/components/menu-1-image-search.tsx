import React, { useState, useRef, useEffect } from 'react';
import { ContainerCanHide, FlexEnd, DivPadding } from './styled';
import SelectPlatform from './platform-select';
import DragDropForm from './drag-drop-from';
import SearchResult from './search-result';
import ImageDetail from './image-detail';
import ButtonScrollTop from './btn-scroll-top';

import { PlatformFilter, ImageData } from '../../shared/api';
import useImg2Img from '../hooks/useImg2Img';
import useScroll from '../hooks/useScroll';
import useRequestManager from '../hooks/useRequestManager';
import { img2File } from '../lib/utils';


function MenuImageSearch({ file, setFile, menu, setMenu }){
  const { getImg2Img, maxIter } = useImg2Img()
  const { isScrollTop, isScrollBottom } = useScroll()
  const { isLoading, searchResult, preRequest, postRequest } = useRequestManager()
  
  const imgCol1 = useRef(null)
  const imgCol2 = useRef(null)

  const [iter, setIter] = useState(0)
  const [filter, setFilter] = useState<PlatformFilter>('All')
  const [canClear, setCanClear] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData>(null)

  const generateImg2Img = async () => {
    preRequest()
    setSelectedImage(null)
    clearResult()
    setIter(1)
    await img2File('image-uploaded', async (newfile: File) => {
      setFile(newfile)
      const json = await getImg2Img(newfile, filter)
      postRequest(json, true)
    })
    if (filter !== 'All') setCanClear(true)
  }

  const generateImg2ImgAdd = async () => {
    preRequest()
    setIter(iter => iter + 1)
    const json = await getImg2Img(file, filter)
    postRequest(json, true)
  }

  const clearResult = () => {
    imgCol1.current!?.replaceChildren()
    imgCol2.current!?.replaceChildren()
    setCanClear(false)
  }

  useEffect(() => {
    if (menu === 1 && !isScrollTop && isScrollBottom && !selectedImage && !isLoading && iter < maxIter) {
      generateImg2ImgAdd()
    }
  }, [isScrollBottom])

  return (
    <>
    <ContainerCanHide className={selectedImage ? 'hidden' : ''}>
      <DragDropForm file={file} setFile={setFile} generateImg2Img={generateImg2Img} filter={filter} isLoading={isLoading}></DragDropForm>

      {file && 
        <>
        <FlexEnd>
          <span onClick={e => setFilter('All')} className={'btn-clear' + (canClear ? '' : ' disabled')}>
            Clear
          </span>
          <span className="select-platform">
            <span>Filter by</span>
            <SelectPlatform filter={filter} setFilter={setFilter}></SelectPlatform>
          </span>
        </FlexEnd>

        <SearchResult 
          searchResult={searchResult} 
          imgCol1={imgCol1}
          imgCol2={imgCol2}
          setMenu={setMenu} 
          setFile={setFile} 
          setSelectedImage={setSelectedImage}
        />
        </>
      }

      {isLoading &&
        <DivPadding>Loading...</DivPadding> 
      }

      <ButtonScrollTop isScrollTop={isScrollTop}></ButtonScrollTop>
    </ContainerCanHide>

    {selectedImage && 
      <ImageDetail 
        selectedImage={selectedImage} 
        setSelectedImage={setSelectedImage} 
        filter={filter} 
        setFile={setFile} 
        menu={menu} 
        setMenu={setMenu}
      />
    }
    </>
    )
}

export default MenuImageSearch
