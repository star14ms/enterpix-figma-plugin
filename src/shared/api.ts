
export type Text2ImgParams = {
    prompt: string,
    start?: number,
    length?: number,
    platform?: string,
}

export type Img2ImgParams = {
    image: File,
    start?: string | number,
    length?: string | number,
    platform?: string,
}

export type PlatformParams = {
    midjourney: boolean,
    stableDiffusion: boolean,
}
