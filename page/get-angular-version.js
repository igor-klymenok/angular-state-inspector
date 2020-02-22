/**
 * Message action types
 * @typedef {'GOT_ANGULAR_VERSION'} ActionTypes
 */


class Action {

  /**
   * @param {ActionTypes} type Message type
   * @param {any} payload Payload of the action
   */
  constructor(type, payload) {
    this.type = type
    this.payload = payload
  }
}

function getAngularVersion() {
  const appRoot = document.getElementsByTagName('app-root').item(0);
  const angularVersion = appRoot.getAttribute('ng-version');

  return parseFloat(angularVersion);
}

browser.runtime.sendMessage(new Action('GOT_ANGULAR_VERSION', getAngularVersion()));
