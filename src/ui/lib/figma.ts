import { PluginMessagePayload, Quote } from '../../shared';

export function requestToPlugin<T>(payload: T) {
  parent.postMessage({ pluginMessage: payload }, '*');
}

export function requestGenerateRandomQuoteToPlugin(randomQuote: Quote) {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateRandomQuote',
    randomQuote,
  });
}

export function requestgenerateTypedQuoteToPlugin(text: String) {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateTypedQuote',
    text,
  });
}

export function requestgenerateImageToPlugin(array: Uint8Array, width?: number, height?: number) {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateImage',
    array,
    width,
    height,
  });
}