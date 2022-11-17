import { Text2ImgParams, Img2ImgParams } from '../../shared/api'
import { requestErrorToPlugin } from '../lib/figma';


const apiUrlText2Img = 'https://api.enterpix.app/v1/image/prompt-search';
const apiUrlImg2Img = 'https://api.enterpix.app/v1/image/image-search';


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

  if (response.status !== 200) requestErrorToPlugin(json)
  return json
}


export async function requestImg2Img({ image, start, length, platform }: Img2ImgParams ) {
  const body = {
    image: image instanceof Blob,
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

  if (response.status !== 200) requestErrorToPlugin(json)
  return json
}
