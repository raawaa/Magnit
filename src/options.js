import _ from 'lodash';
import { defaultSelectors } from './defaults';

function saveOptions(e) {
    let selectors = JSON.parse(document.querySelector("#selectors").value);
    browser.storage.sync.set({ selectors })
    .then(() => console.log(selectors));
    e.preventDefault();
}

function restoreOptions() {
    let gettingItem = browser.storage.sync.get('selectors');
    gettingItem.then(res => {
        // console.debug(res);
        document.querySelector("#selectors").value = JSON.stringify(res.selectors || defaultSelectors, null, 4)
    });
}

function resetOptions(e) {
    browser.storage.sync.set({
        selectors: defaultSelectors
    }).then(() => {
        // console.debug('reseting');
        document.querySelector('#selectors').value = JSON.stringify(defaultSelectors, null, 4);
        // browser.runtime.sendMessage({ command: "regist", data: defaultSelectors });
    });
    e.preventDefault();
}


document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("reset", resetOptions);