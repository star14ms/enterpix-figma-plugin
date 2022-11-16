import { Quote } from '../../shared';
import { Text2ImgParams, Img2ImgParams } from '../../shared/api'


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


export async function requestText2Img({ prompt, start, length, platform }: Text2ImgParams ) {
  const options = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      prompt: prompt,
      start: start,
      length: length,
      platform: platform,
    })
  }
  console.log(options.body)
  const response = await fetch(apiUrlText2Img, options)
  const json = await response.json()
  console.log(json)
  return json.images
}


export async function requestImg2Img({ image, start, length, platform }: Img2ImgParams ) {
  const body = {
    image: image,
    start: String(start),
    length: String(length),
    platform: platform,
  }
  
  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }

  const options = {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: new Headers({
      'Content-Type': 'multipart/form-data',
    }),
    body: formData,
  }
  console.log(body)
  const response = await fetch(apiUrlImg2Img, options);
  const json = await response.json()
  console.log(json)
  return json.images
}
