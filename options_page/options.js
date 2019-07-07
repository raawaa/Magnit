// import _ from 'lodash';
// import { defaultSelectors } from './defaults';

function saveOptions(e) {
    let selectors = JSON.parse(document.querySelector("#selectors").value);
    browser.storage.sync.set({ selectors })
        .then(() => console.log(selectors));
    e.preventDefault();
}

async function restoreOptions() {
    let selectors = await getSelectors();
    // console.debug(res);
    document.querySelector("#selectors").value = JSON.stringify(selectors, null, 4)
}

async function resetOptions(e) {
    await browser.storage.sync.set({ selectors: defaultSelectors });
    // console.debug('reseting');
    document.querySelector('#selectors').value = JSON.stringify(defaultSelectors, null, 4);
    // browser.runtime.sendMessage({ command: "regist", data: defaultSelectors });
    e.preventDefault();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", resetOptions);