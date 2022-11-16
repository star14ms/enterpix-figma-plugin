import { PluginMessagePayload, Quote } from '../../shared';

export function requestToPlugin<T>(payload: T) {
  parent.postMessage({ pluginMessage: payload }, '*');
}

export function requestgenerateImageToPlugin(array: Uint8Array, width?: number, height?: number) {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateImage',
    array,
    width,
    height,
  });
}