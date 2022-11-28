import { useState } from 'react';
import { PlatformFilter } from '../../shared/api';
import { requestText2Img } from '../api';
import { makePlatformAPIArg } from '../lib/utils';


function useText2Img(length: number = 50) {
  const startMax = 1000
  const maxIter = Math.ceil(startMax / length)
  const startInit = Math.floor(Math.random() * startMax)
  const [start, setStart] = useState(startInit)

  const getText2Img = async (prompt: string, filter: PlatformFilter) => {
    const platform = makePlatformAPIArg(filter)
    const json = await requestText2Img({ prompt, start, length, platform })

    setStart(start => (start + length) % startMax)
    return json
  }

  return {
    getText2Img,
    maxIter,
  }
}

export default useText2Img
