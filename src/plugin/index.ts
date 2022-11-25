import {
  PluginAction,
  PluginCallbackFunction,
  PluginMessagePayload,
  generateImagePayload,
  ErrorPayload
} from '../shared';


figma.showUI(__html__, { title: 'Enterpix', width: 400, height: 600 });


async function loadFonts() {
  await figma.loadFontAsync({
    family: 'Roboto',
    style: 'Regular',
  });
}


function isPayload(payload: unknown): payload is PluginMessagePayload {
  return (
    typeof payload === 'object' &&
    Object.prototype.hasOwnProperty.call(payload, 'type') &&
    (
      Object.prototype.hasOwnProperty.call(payload, 'json') ||
      Object.prototype.hasOwnProperty.call(payload, 'array')
    )
  );
}


async function generateImage({ array, width, height }: generateImagePayload) {
  const imageHash = figma.createImage(array).hash;
  const currentSelectionNode = figma.currentPage.selection[0];

  if (currentSelectionNode?.type === 'RECTANGLE') {
    currentSelectionNode.resize(width, height);
    currentSelectionNode.fills = [
      { type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash },
    ];
  } else {
    const newNode = figma.createRectangle();
    if (!width || !height) {
      width = 500
      height = 500
    }
    newNode.resize(width, height);
    newNode.x = figma.viewport.center.x
    newNode.y = figma.viewport.center.y
    newNode.fills = [
      { type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash },
    ];
    figma.currentPage.appendChild(newNode);
    figma.currentPage.selection = [newNode]
  }
}


function error({ json }: ErrorPayload) {
  throw `${json.message} (${json.statusCode})`
}


loadFonts().then(() => {
  figma.ui.onmessage = (payload: unknown) => {
    const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
      generateImage,
      error,
    };

    if (isPayload(payload) && callbackMap[payload.type]) {
      callbackMap[payload.type](payload);
    }
  };
});
