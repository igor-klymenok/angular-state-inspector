/**
 * Broadcasts an event to any part of the app
 * @param {'BACKGROUND' | 'CONTENT' | 'DEVTOOLS'} direction To which side of the app should be sent
 * @param {Action<any>} message Browser runtime predefined message
 */
function broadcastMessageTo(direction, message) {
  if (direction === 'CONTENT') {
    return browser.tabs.getCurrent()
      .then(tab => browser.tabs.sendMessage(tab.id, message))
      .catch(console.error);
  }

  if (direction === 'BACKGROUND') {
    throw new Error('Not implemented');
  }

  if (direction === 'DEVTOOLS') {
    throw new Error('Not implemented');
  }
}

browser.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'GOT_ANGULAR_VERSION':
      return broadcastMessageTo('DEVTOOLS', message);

    default:
      return undefined;
  }
});