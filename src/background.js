browser.browserAction.onClicked.addListener(() => {
    // let currentTab = getCurrentTab();
    getCurrentTab().then(getHostUrlPattern).then(findRelatedTabs).then(sendCommand).catch(onError);



    function getCurrentTab() {
        return browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(t => t[0].url);
    }

    function getHostUrlPattern(url) {
        let re = /.*:\/\/(.*?)\/.*/i;
        let domainMatch = url.match(re)[1];
        return "*://" + domainMatch + "/*";
    }

    function findRelatedTabs(hostUrlPattern) {
        return browser.tabs.query({
            url: hostUrlPattern
        });
    }


    function sendCommand(tabs) {
        for (let tab of tabs) {
            browser.tabs.sendMessage(tab.id, {
                command: "magnit"
            });
        }
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }
});
