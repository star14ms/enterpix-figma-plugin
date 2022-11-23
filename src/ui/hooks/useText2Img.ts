import { useState } from 'react';
import { PlatformParams } from '../../shared/api';
import { requestText2Img } from '../api';
import { makePlatformAPIArg } from '../lib/utils';


function useText2Img() {
  const startInit = Math.floor(Math.random() * 1000)
  const [start, setStart] = useState(startInit);
  const length = 20

  const getText2Img = async (prompt: string, platformParmas: PlatformParams) => {
    const platform = makePlatformAPIArg(platformParmas)
    const json = await requestText2Img({ prompt, start, length, platform });

    setStart(start => (start + length) % 1000)
    return json;
  };

  return getText2Img;
}

export default useText2Img;
