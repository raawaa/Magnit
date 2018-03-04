import fp from "lodash/fp";
import _ from "lodash";
import { defaultSelectors } from "./defaults";
const Promise = require('bluebird')

browser.storage.sync.get('selectors')
    .then(options => {
        if (_.isEmpty(options)) {
            return browser.storage.sync.set({ selectors: defaultSelectors })
        }
    }).then();

browser.browserAction.onClicked.addListener(() => {
    getCurrentTab()
        .then(getHostUrlPattern)
        .then(findRelatedTabs)
        .then(sendCommand)
        .catch(onError);



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
        return Promise.map(tabs, tab => { return browser.tabs.executeScript(tab.id, { file: '/content.bundle.js' }) })
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }
});