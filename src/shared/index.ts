export type Quote = {
  author: string | null;
  text: string;
};

export type ImageData = {
  id: string,
  compressedUrl: string,
  bigThumbnailUrl: string,
  thumbnailUrl: string,
  width: number,
  height: number,
};

export type PluginAction =  'generateImage';

export type generateImagePayload = {
  type: PluginAction;
  array: Uint8Array;
  width?: number,
  height?: number,
}

export type PluginMessagePayload = generateImagePayload

export type PluginCallbackFunction<T = void> = (
  payload: PluginMessagePayload,
) => T;
