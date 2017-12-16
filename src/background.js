browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessage).catch(onError);
});

function sendMessage(tabs) {
    // for (let tab of tabs) {
    browser.tabs.sendMessage(tabs[0].id, { command: "magnit" });
    // }
}


function onError(error) {
    console.error(`Error: ${error}`);
}
