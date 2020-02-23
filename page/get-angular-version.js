function getAngularVersion() {
  const appRoot = document.getElementsByTagName('app-root').item(0);
  if (appRoot == null) {
    return undefined;
  }

  const angularVersion = appRoot.getAttribute('ng-version');
  if (typeof angularVersion === 'string') {
    return parseFloat(angularVersion);
  }

  return undefined;
}

browser.runtime.sendMessage({
  type: 'GOT_ANGULAR_VERSION',
  payload: getAngularVersion(),
});
