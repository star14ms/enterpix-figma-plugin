import { useState } from 'react';
import { requestImg } from '../api';

function useGetImg() {
  const [arrayData, setArrayData] = useState<Uint8Array | null>(null);
  const [beforeUrl, setBeforeUrl] = useState<RequestInfo | null>(null);

  const getImg = async (url: RequestInfo) => {
    if (url === beforeUrl && arrayData) {
      return arrayData;
    }
    const apiArray = await requestImg(url);
    setBeforeUrl(url);
    setArrayData(apiArray);
    return apiArray;
  };

  return getImg;
}

export default useGetImg;
