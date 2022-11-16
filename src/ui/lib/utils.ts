
export function img2Uint8Array(id: string, width: number, height: number) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  const image = document.getElementById(id) as HTMLCanvasElement;

  ctx.drawImage(image, width, height);
  const ctxImageData = ctx.getImageData(0, 0, width, height);
  const buffer = ctxImageData.data.buffer;

  return {
    array: new Uint8Array(buffer),
    width: width,
    height: height,
  };
}
