import { PluginMessagePayload } from '../../shared';
import { ResponseJson } from '../../shared/api';

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

export function requestErrorToPlugin(json: ResponseJson) {
  requestToPlugin<PluginMessagePayload>({
    type: 'error',
    json: json,
  });
}