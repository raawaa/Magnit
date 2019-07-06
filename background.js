// import fp from "lodash/fp";
// const _ = require("lodash");
// import _ from "lodash";
// import defaultSelectors from "./default_selectors.js";
// import * as Helpers from './helpers.js';
// import _find from './lodash/find.js';


browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const currentTabUrl = tab.url;
    const selectors = await getSelectors();
    const matchedSelector = _.find(selectors, entry => {
        return currentTabUrl.match(matchPatternToRegExp(entry.url_pattern));
    });
    if (matchedSelector) {
        browser.pageAction.show(tab.id);
    }
})


// async function findRelatedTabs(hostUrlPattern) {
//     return await browser.tabs.query({ url: hostUrlPattern });
// }

// const Promise = require('bluebird')


// browser.storage.sync.get('selectors')
//     .then(options => {
//         if (_.isEmpty(options)) {
//             return browser.storage.sync.set({ selectors: defaultSelectors })
//         }
//     }).then();

// browser.browserAction.onClicked.addListener(() => {
//     getActiveTab()
//         .then(getHostUrlPattern)
//         .then(findRelatedTabs)
//         .then(sendCommand)
//         .catch(onError);




//     function getHostUrlPattern(url) {
//         let re = /.*:\/\/(.*?)\/.*/i;
//         let domainMatch = url.match(re)[1];
//         return "*://" + domainMatch + "/*";
//     }




//     function sendCommand(tabs) {
//         return Promise.map(tabs, tab => { return browser.tabs.executeScript(tab.id, { file: '/content.bundle.js' }) })
//     }

//     function onError(error) {
//         console.error(`Error: ${error}`);
//     }
// });
