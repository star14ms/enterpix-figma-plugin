import { requestgenerateImageToPlugin } from './figma'
import { PlatformParams } from '../../shared/api'
import { ImageData } from '../../shared/api'


export function makePlatformAPIArg(platformParmas: PlatformParams) {
  let platform = ''

  if (platformParmas.midjourney) {
    platform = platform + 'midjourney,'
  } 
  if (platformParmas.stableDiffusion)  {
    platform = platform + 'stable-diffusion,'
  }
  return platform
}


export function isFileImage(file: File) {
  return file && file['type'].split('/')[0] === 'image';
}


export async function img2File(id: string, setFile: Function, setMenu: Function) {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const image = document.getElementById(id) as HTMLImageElement;
  const ctx = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.children[0])
  
  image.crossOrigin = 'Anonymous';
  let file: File

  image.onload = async () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    
    const dataURL = canvas.toDataURL('image/png')
    canvas.remove()
    
    await fetch(dataURL)
    .then(res => res.blob())
    .then(async blob => {
      file = new File([blob], "capture.png", {
        type: 'image/png'
      });
    })

    setFile(file)

    if (setMenu) {
      setMenu(1)
    }
  }

  return file
}


export function createImgItem(
  image: ImageData, getImg: Function, img2File: Function, 
  setFile: React.Dispatch<React.SetStateAction<number>>,
  setMenu?: React.Dispatch<React.SetStateAction<number>>,
) {
  const div = document.createElement('div');

  const img = document.createElement('img');
  img.id = image.id
  img.src = image.compressedUrl
  img.addEventListener('click', async () => {
    const array = await getImg(image.compressedUrl);
    requestgenerateImageToPlugin(array, image.width, image.height)
  });

  const button = document.createElement('button');
  button.innerHTML = 'Search Similar Style'
  button.addEventListener('click', async () => {
    await img2File(image.id, setFile, setMenu)
  })

  div.appendChild(img)
  div.appendChild(button)

  return div
}