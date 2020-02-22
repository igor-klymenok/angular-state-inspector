
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " + request.type + request.payload);
  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);