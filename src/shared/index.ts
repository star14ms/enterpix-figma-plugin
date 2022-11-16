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

export type PluginAction =  'generateImage' | 'generateRandomQuote' | 'generateTypedQuote';

export type generateImagePayload = {
  type: PluginAction;
  array: Uint8Array;
  width?: number,
  height?: number,
}

export type generateRandomQuotePayload = {
  type: PluginAction;
  randomQuote: Quote;
}

export type generateTypedQuotePayload = {
  type: PluginAction;
  text: String;
}

export type PluginMessagePayload = 
  generateImagePayload | generateRandomQuotePayload | generateTypedQuotePayload

export type PluginCallbackFunction<T = void> = (
  payload: PluginMessagePayload,
) => T;
