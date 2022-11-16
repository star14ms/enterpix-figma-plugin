import {
  PluginAction,
  PluginCallbackFunction,
  PluginMessagePayload,
  generateImagePayload,
  generateRandomQuotePayload,
  generateTypedQuotePayload,
} from '../shared';


figma.showUI(__html__, { title: 'Enterpix', width: 484, height: 664 });


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
      Object.prototype.hasOwnProperty.call(payload, 'randomQuote') ||
      Object.prototype.hasOwnProperty.call(payload, 'text') ||
      Object.prototype.hasOwnProperty.call(payload, 'array')
    )
  );
}


function generateRandomQuote({ randomQuote }: generateRandomQuotePayload) {
  const currentSelectionNode = figma.currentPage.selection[0];
  if (currentSelectionNode?.type === 'TEXT') {
    currentSelectionNode.fontName = {
      family: 'Roboto',
      style: 'Regular',
    };
    currentSelectionNode.characters = `${randomQuote.text} - ${
      randomQuote.author || 'Unknown'
    }`;
  } else {
    throw new Error('No text node is selected');
  }
}


function generateTypedQuote({ text }: generateTypedQuotePayload) {
  const textNode = figma.createText();
  textNode.fontName = {
    family: 'Roboto',
    style: 'Regular',
  };
  textNode.fontSize = 32;
  textNode.characters = `${text}`;
  textNode.fills = [
    { type: 'SOLID', color: { r:1, g:1, b:1 }}
  ];
  figma.currentPage.appendChild(textNode);
}


async function generateImage({ array, width, height }: generateImagePayload) {
  const rectanglenode = figma.createRectangle();
  if (!width || !height) {
    width = 500
    height = 500
  }
  rectanglenode.resize(width, height);
  const imageHash = figma.createImage(array).hash;
  rectanglenode.fills = [
    { type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash },
  ];
  figma.currentPage.appendChild(rectanglenode);
}


loadFonts().then(() => {
  figma.ui.onmessage = (payload: unknown) => {
    const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
      generateRandomQuote,
      generateTypedQuote,
      generateImage,
    };

    if (isPayload(payload) && callbackMap[payload.type]) {
      callbackMap[payload.type](payload);
    }
  };
});
