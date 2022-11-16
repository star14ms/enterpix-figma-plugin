import { useState } from 'react';
import { Quote } from '../../shared';
import { requestImg2Img } from '../api';

function useImg2Img() {
  const [quotesData, setQuotesData] = useState<Quote[] | null>(null);

  const getImg2Img = async (img: null) => {
    if (quotesData) {
      return quotesData;
    }
    const apiQuotes = await requestImg2Img(img);
    setQuotesData(apiQuotes);
    return apiQuotes;
  };

  const getRandomQuote = async (img: null) => {
    const response = await getImg2Img(img);
    return response;
  };

  return getRandomQuote;
}

export default useImg2Img;
