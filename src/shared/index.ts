import { ResponseJson } from "./api";


export type Quote = {
  author: string | null;
  text: string;
};

export type PluginAction =  'generateImage' | 'error';

export type generateImagePayload = {
  type: PluginAction;
  array: Uint8Array;
  width?: number,
  height?: number,
}

export type ErrorPayload = {
  type: PluginAction;
  json: ResponseJson;
}

export type PluginMessagePayload = 
  generateImagePayload | ErrorPayload

export type PluginCallbackFunction<T = void> = (
  payload: PluginMessagePayload,
) => T;
