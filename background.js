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

browser.runtime.onMessage.addListener(async (m, s, r) => {
    if (m.command == 'copyMagnets') {
        console.log('mess url:', m.url);
        let magnets = await gettingMagnets(m.url);
        console.log('from bg:', magnets.toString());
        windowData = {
            // type: "detached_panel",
            url: "/popup/magnets_panel.html",
            // width: 550,
            // height: 400
        }
        let createdWindow = await browser.tabs.create(windowData);
        let magnetsText = magnets.reduce((acc, curr) => curr ? acc + curr + '\\n' : '', '');
        console.log(magnetsText);
        let updateTextarea = `document.getElementById('magnets').value='${magnetsText}'`;
        browser.tabs.executeScript({ code: updateTextarea }).catch(e => console.error('from bg', e));
    }
});

function executingContentScript(tabId) {
    return browser.tabs.executeScript(tabId, { file: '/lodash.min.js' })
        .then(() => browser.tabs.executeScript(tabId, { file: '/default_selectors.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/helpers.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/content.js' }))
        .catch(e => console.error(e));
}

async function gettingMagnets(url) {
    const re = /.*:\/\/(.*?)\/.*/i;
    const domainMatch = url.match(re)[1];
    const hostUrlPattern = "*://" + domainMatch + "/*";
    const relatedTabs = await browser.tabs.query({ url: hostUrlPattern });
    console.log('relatedTabs:', relatedTabs);
    return Promise.all(relatedTabs.map(t => executingContentScript(t.id).then(res => res)));
}


function gettingActiveTabUrl() {
    return browser.tabs.query({ active: true, currentWindow: true })
        .then(t => t[0].url);
}
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
