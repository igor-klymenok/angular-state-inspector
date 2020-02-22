function getAngularVersion() {
  const appRoot = document.getElementsByTagName('app-root').item(0);
  const angularVersion = appRoot.getAttribute('ng-version');

  return parseFloat(angularVersion);
}
