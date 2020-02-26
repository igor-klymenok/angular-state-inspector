const connectionPool = new Map();

browser.runtime.onConnect.addListener(registerConnection);

/**
 * Registers runtime connection and all appropriative event handlers
 * @param {any} connection Runtime connection
 */
function registerConnection(connection) {
  connectionPool.set(connection.name, connection)
  connection.onMessage.addListener(handleIncomingMessage)
}

/**
 * Handles incoming messages
 * @param {Action<any>} message 
 */
function handleIncomingMessage(message) {
  switch (message.type) {
    case 'GOT_ANGULAR_VERSION':
      return broadcastMessageTo('DEVTOOLS', message);

    default:
      return undefined;
  }
}

/**
 * Broadcasts an event to any part of the app
 * @param {'BACKGROUND' | 'CONTENT' | 'DEVTOOLS'} direction To which side of the app should be sent
 * @param {Action<any>} message Browser runtime predefined message
 */
function broadcastMessageTo(direction, message) {
  if (direction === 'CONTENT') {
    throw new Error('Not implemented');
  }

  if (direction === 'BACKGROUND') {
    throw new Error('Not implemented');
  }

  if (direction === 'DEVTOOLS') {
    connectionPool
      .get('devtools')
      .postMessage(message)
  }
}
