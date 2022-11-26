import { requestgenerateImageToPlugin } from './figma';
import { PlatformFilter } from '../../shared/api';
import { ImageData } from '../../shared/api';


export function makePlatformAPIArg(filter: PlatformFilter) {
  let platform = ''

  switch (filter) {
    case 'All':
      platform = platform + 'midjourney,stable-diffusion'
      break
    case 'Midjourney':
      platform = platform + 'midjourney'
      break
    case 'Stable Diffusion':
      platform = platform + 'stable-diffusion'
  }

  return platform
}


export function isFileImage(file: File) {
  return file && file['type'].split('/')[0] === 'image'
}


export async function img2File(id: string, callback?: Function) {
  const canvas = document.createElement('canvas') as HTMLCanvasElement
  const image = document.getElementById(id) as HTMLImageElement
  const ctx = canvas.getContext("2d")
  document.body.insertBefore(canvas, document.body.children[0])
  
  image.crossOrigin = 'Anonymous'
  let file: File

  image.onload = async () => {
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0, image.width, image.height)
    
    const dataURL = canvas.toDataURL('image/png')
    canvas.remove()
    
    await fetch(dataURL)
    .then(res => res.blob())
    .then(async blob => {
      file = new File([blob], "capture.png", {
        type: 'image/png'
      })
    })

    if (callback) await callback(file)
  }
}


export function createImgItem(
  image: ImageData, getImg: Function, setSelectedImage: Function,
  setFile: React.Dispatch<React.SetStateAction<File>>,
  setMenu?: React.Dispatch<React.SetStateAction<number>>,
) {
  const div = document.createElement('div')

  const img = document.createElement('img')
  img.id = image.id
  img.src = image.compressedUrl
  img.title = image.prompt
  img.addEventListener('click', async () => {
    const array = await getImg(image.compressedUrl)
    requestgenerateImageToPlugin(array, image.width, image.height)
    setSelectedImage((selectedImage: ImageData | null) => {
      if (selectedImage === null) {
        window.scrollTo({ top: 0 })
        return image
      }
      return selectedImage
    })
  })

  const button = document.createElement('button')
  button.innerHTML = 'Search Similar Style'
  button.addEventListener('click', async () => {
    await img2File(image.id, (file: File) => {
      setFile(file)
      setMenu(1)
    })
  })
  
  button.innerHTML = button.innerHTML + 
  `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37575 8.82426C4.14143 8.58995 4.14143 8.21005 4.37575 7.97574L6.35148 6L4.37575 4.02426C4.14143 3.78995 4.14143 3.41005 4.37575 3.17574C4.61006 2.94142 4.98996 2.94142 5.22428 3.17574L7.62428 5.57574C7.85859 5.81005 7.85859 6.18995 7.62428 6.42426L5.22428 8.82426C4.98996 9.05858 4.61006 9.05858 4.37575 8.82426Z" fill="#9CA3AF"/>
  </svg>`

  div.appendChild(img)
  div.appendChild(button)

  return div
}