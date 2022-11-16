import { Quote } from '../../shared';


const apiUrl = 'https://type.fit/api/quotes';
const apiUrlText2Img = '...';
const apiUrlImg2Img = '...';


export async function requestQuotes() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data as Quote[];
}


export async function requestImg(url: RequestInfo) {
  const options = {
    method: 'GET',
    mode: 'cors' as RequestMode
  }
  const response = await fetch(url, options)
  const data = await response.arrayBuffer();
  console.log(response)
  return new Uint8Array(data);
}


export async function requestText2Img(prompt: string) {
  const options = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      prompt: prompt,
      // start: 0,
      length: 10,
      // platform: 'stable-diffusion',
    })
  }

  const response = await fetch(apiUrlText2Img, options)
  const json = await response.json()
  return json.images
}


export async function requestImg2Img(image: null) {
  const options = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: new Headers({
      'Content-Type': 'multipart/form-data',
    }),
    body: JSON.stringify({
      image: image,
    })
  }
  const response = await fetch(apiUrlImg2Img, options);
  console.log(response)
  return null
}
