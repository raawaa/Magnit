import fp from "lodash/fp";
import _ from "lodash";
import { defaultSelectors } from "./defaults";

browser.storage.sync.get('selectors')
    .then(options => {
        console.log(options);
        if (_.isEmpty(options)) {
            return browser.storage.sync.set({ selectors: defaultSelectors })
        }
    }).then();

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
        // for (let tab of tabs) {
        //     browser.tabs.sendMessage(tab.id, {
        //         command: "magnit"
        //     });
        // }
        console.debug(tabs);
        return fp.map(tab => {
            return browser.tabs.executeScript(tab.id, { file: '/content.bundle.js' }).then((a) => console.debug('execute:', a)).catch(e => console.error(e));
        })(tabs);
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }
});


// browser.runtime.onMessage.addListener(message => {
//     console.debug(message);
//     if (message.command == "regist") {
//         console.debug(message.data);
//         browser.contentScripts.register({
//             matches: fp.map(entry => entry.url_pattern)(message.data),
//             js: [
//                 {
//                     file: 'content.bundle.js'
//                 }
//             ]
//         }).then();
//     }
// })
