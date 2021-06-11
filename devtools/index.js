const panels = browser && browser.devtools && browser.devtools.panels;
const elementsPanel = panels && panels.elements;

if (elementsPanel) {
  elementsPanel.createSidebarPane('State', sidebar => {
    elementsPanel.onSelectionChanged.addListener(() => {
      browser.devtools.inspectedWindow.eval(`(${getPanelContents})()`)
        .then(result => {
          if (!result[0] && result[1]) {
            throw result[1]
          }
          console.log(result[0])
          sidebar.setObject(result[0]);
        })
        .catch(err => {
          sidebar.setExpression(`(${getPanelContents})()`)
          console.error(err);
        })
    });
  });
}

// The function below is executed in the context of the inspected page.
// TODO: Check and add support for newer Angular versions if needed
function getPanelContents() {
  const ng = window.ng;
  const angular = window.angular;

  let panelContent = Object.create(null);

  try {
    if ($0) {
      if (ng && ng.getComponent && ng.getComponent($0)) {
        // Angular >= 9
        panelContent = {
          name: ng.getComponent($0).constructor.name,
          state: ng.getComponent($0),
        }
      } else if (ng && ng.probe && ng.probe($0)) {
        // Angular >= 2
        panelContent = {
          name: ng.probe($0).componentInstance.constructor.name,
          state: ng.probe($0).componentInstance,
        };
      } else if (angular) {
        // Angular.js >= 1
        panelContent = angular.element($0).scope();
      }
    }
  } catch(error) {
    panelContent = Object.create(null)
  }

  if (panelContent.state && panelContent.state.__ngContext__) {
    delete panelContent.state.__ngContext__;
  }

  return panelContent;
}