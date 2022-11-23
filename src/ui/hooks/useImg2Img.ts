import { useState } from 'react';
import { PlatformParams } from '../../shared/api';
import { requestImg2Img } from '../api';
import { makePlatformAPIArg } from '../lib/utils';


function useImg2Img() {
  const startInit = Math.floor(Math.random() * 1000)
  const [start, setStart] = useState(startInit);
  const length = 20

  const getImg2Img = async (image: File, platformParmas: PlatformParams) => {
    const platform = makePlatformAPIArg(platformParmas)
    const json = await requestImg2Img({ image, start, length, platform });

    setStart(start => (start + length) % 1000)
    return json;
  };

  return getImg2Img;
}

export default useImg2Img;
