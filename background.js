/**
 * @typedef {object} Action
 * 
 * @property {'GOT_ANGULAR_VERSION'} type
 * @property {any} payload
 */


 /**
  * General handler of the all runtime messages
  * @param {Action} request Incoming message
  * @param {*} sender 
  * @param {*} sendResponse 
  */
function runtimeMessagesHandler(request, sender, sendResponse) {
  switch (request.type) {
    case 'GOT_ANGULAR_VERSION':
      return postAngularVersionToContent(request.payload);
    default:
      return;
  }
}

/**
 * Send Angular version to the content script
 * @param {number} version Angular version
 */
function postAngularVersionToContent(version) {
  throw new Error('Not implemented');
}

browser.runtime.onMessage.addListener(runtimeMessagesHandler);