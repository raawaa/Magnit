import _ from 'lodash';

function saveOptions(e) {
    browser.storage.sync.set({
        selectors:JSON.parse(document.querySelector("#selectors").value)
    });
    e.preventDefault();
}

function restoreOptions() {
    let gettingItem = browser.storage.managed.get('selectors');
    gettingItem.then(res=>{
        document.querySelector("#selectors").value=res.selectors ||
    })
}


document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);