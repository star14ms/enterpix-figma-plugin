
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

export type PlatformFilter = 'All' | 'Midjourney' | 'Stable Diffusion'

export type ImageData = {
    id: string,
    compressedUrl: string,
    bigThumbnailUrl: string,
    thumbnailUrl: string,
    width: number,
    height: number,
};

export type ResponseJson = {
    images?: ImageData[],
    name?: string,
    statusCode?: number,
    code?: string,
    message?: string,
}
