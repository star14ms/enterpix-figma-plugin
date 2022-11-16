import { PlatformParams } from '../../shared/api'


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


export function img2Uint8Array(id: string, width: number, height: number) {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = width
  canvas.height = height
  document.body.insertBefore(canvas, document.body.children[0])
  const ctx = canvas.getContext("2d");
  const image = document.getElementById(id) as HTMLImageElement;
  ctx.drawImage(image, 0, 0, width, height);
  const ctxImageData = ctx.getImageData(0, 0, width, height);
  const buffer = ctxImageData.data.buffer;
  canvas.remove()

  // return new Uint8Array(ctx.getImageData(0, 0, image.width, image.height).data.buffer);

  // let array: Uint8Array
  // canvas.toBlob(
  //   async (blob) => {
  //     array = new Uint8Array(await blob.arrayBuffer());
  //   },
  //   "image/jpeg", // the MIME type of the image format
  //   1 // quality (in the range 0..1)
  // );
  // return array
  const array = new Uint8Array(buffer)
  console.log(ctxImageData)
  console.log(array)
  return array;
}