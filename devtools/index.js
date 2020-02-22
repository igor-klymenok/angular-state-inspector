const panels = browser && browser.devtools && browser.devtools.panels;
const elementsPanel = panels && panels.elements;

if (elementsPanel) {
  elementsPanel.createSidebarPane('State', sidebar => {
    elementsPanel.onSelectionChanged.addListener(() => sidebar.setExpression(`(${getPanelContentsBasedOnNgVersion})(${getAngularVersion()})`));
  });
}

function getAngularVersion() {
  const appRoot = document.getElementsByTagName('app-root').item(0);
  const angularVersion = appRoot.getAttribute('ng-version');

  return Number(angularVersion);
}

// The function below is executed in the context of the inspected page.
function getPanelContents() {
  const ng = window.ng;
  const angular = window.angular;
  let panelContent = Object.create(null);
  if ($0) {
    if (ng && ng.probe($0)) {
      panelContent = ng.probe($0).componentInstance;
    } else if (angular) {
      panelContent = angular.element($0).scope();
    }
  }
  return panelContent;
}

function getPanelContentsBasedOnNgVersion(version) {
  console.log('Angular Version', version, typeof version);

  let panelContent = Object.create(null);

  if (version >= 9) {
    panelContent = window.ng.getComponent($0);
  }

  if (version >= 2) {
    panelContent = window.ng.probe($0).componentInstance;
  }

  if (version >= 1) {
    panelContent = window.angular.element($0).scope();
  }

  return panelContent;
}
