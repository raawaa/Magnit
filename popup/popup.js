// get related tabs ids

function gettingActiveTabUrl() {
    return browser.tabs.query({ active: true, currentWindow: true })
        .then(t => t[0].url);
}

// gettingActiveTabUrl().then(
//     async url => {
//         console.log(url);
//         const re = /.*:\/\/(.*?)\/.*/i;
//         const domainMatch = url.match(re)[1];
//         const hostUrlPattern = "*://" + domainMatch + "/*";
//         const relatedTabs = await browser.tabs.query({ url: hostUrlPattern })
//         Promise.all(relatedTabs.map(t => executingContentScript(t.id).then(res => res))).then(magnets => magnets);
//     });




function executingContentScript(tabId) {
    return browser.tabs.executeScript(tabId, { file: '/lodash.min.js' })
        .then(() => browser.tabs.executeScript(tabId, { file: '/default_selectors.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/helpers.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/content.js' }))
        .catch(e => console.error(e));
}

async function gettingMagnets() {
    let activeUrl = await gettingActiveTabUrl();
    const re = /.*:\/\/(.*?)\/.*/i;
    const domainMatch = activeUrl.match(re)[1];
    const hostUrlPattern = "*://" + domainMatch + "/*";
    const relatedTabs = await browser.tabs.query({ url: hostUrlPattern })
    return await Promise.all(relatedTabs.map(t => executingContentScript(t.id).then(res => res))).then(magnets => magnets);
}

const downloadButton = document.getElementById('download_button');
const copyButton = document.getElementById('copy_button');

copyButton.addEventListener('click', async (event) => {
    const magnets = await gettingMagnets();
    windowData = {
        type: "detached_panel",
        url: "magnets_panel.html",
        width: 550,
        height: 400
    }
    let creatingWindow = browser.windows.create(windowData);
    let currentwindowid = await browser.windows.getCurrent();
    console.log(`currentWindow:${currentwindowid.id}`);
    creatingWindow.then(async window => {
        console.log(`windowID:${window.id}`)
        let tabs = await browser.tabs.query({windowId:window.id});
        console.log(`tabid:${tabs[0].id}`);
        browser.tabs.sendMessage(tabs[0].id, magnets);
        // console.log(window.tabs[0].id);
        // browser.tabs.executeScript({ code: `console.log('testststst');document.getElementById('magnets').value='aaahha'` }).then(console.log('exeddddddd'))
    });
});