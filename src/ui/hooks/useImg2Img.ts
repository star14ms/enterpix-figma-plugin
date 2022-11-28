import { useState } from 'react';
import { PlatformFilter } from '../../shared/api';
import { requestImg2Img } from '../api';
import { makePlatformAPIArg } from '../lib/utils';


function useImg2Img(length: number = 50) {
  const startMax = 1000
  const maxIter = Math.ceil(startMax / length)
  const startInit = Math.floor(Math.random() * startMax)
  const [start, setStart] = useState(startInit)

  const getImg2Img = async (image: File, filter: PlatformFilter) => {
    const platform = makePlatformAPIArg(filter)
    const json = await requestImg2Img({ image, start, length, platform })

    setStart(start => (start + length) % startMax)
    return json
  }

  return {
    getImg2Img,
    maxIter,
  }
}

export default useImg2Img
