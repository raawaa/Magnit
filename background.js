browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const currentTabUrl = tab.url;
    console.log('currentUrl: ', currentTabUrl);
    const selectors = await getSelectors();
    console.log('selectors: ', selectors.zhuixinfan.url_pattern);
    const matchedSelector = _.find(selectors, entry => {
        return currentTabUrl.match(matchPatternToRegExp(entry.url_pattern));
    });
    console.log(`matchSelector:${matchedSelector}`)
    if (matchedSelector) {
        browser.pageAction.show(tab.id);
    }
})

browser.runtime.onMessage.addListener(async (m, s, r) => {
    let magnets;
    switch (m.command) {
        case 'copyMagnets':
            magnets = await gettingMagnets(m.url);
            windowData = {
                // type: "detached_panel",
                url: "/popup/magnets_panel.html",
                // width: 550,
                // height: 400
            }
            let createdWindow = await browser.tabs.create(windowData);
            let magnetsText = magnets.reduce((acc, curr) => curr ? acc + curr + '\\n' : '', '');
            let updateTextarea = `document.getElementById('magnets').value='${magnetsText}'`;
            browser.tabs.executeScript({ code: updateTextarea }).catch(e => console.error('from bg', e));
            break;
        case 'downloadMagnets':
            magnets = await gettingMagnets(m.url);
            console.log('magnets: ', magnets)
            magnets.forEach(magnetLink => {
                console.log('download mag: ', magnetLink);
                browser.tabs.update({ url: magnetLink })
            });
            break;
        default:
            break;
    }
});

function executingContentScript(tabId) {
    return browser.tabs.executeScript(tabId, { file: '/lodash.min.js' })
        .then(() => browser.tabs.executeScript(tabId, { file: '/default_selectors.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/helpers.js' }))
        .then(() => browser.tabs.executeScript(tabId, { file: '/content.js' }))
        .catch(e => {
            console.error(`error from ${tabId}, ${e}`);
            return null;
        });
}

async function gettingMagnets(url) {
    const re = /.*:\/\/(.*?)\/.*/i;
    const domainMatch = url.match(re)[1];
    const hostUrlPattern = "*://" + domainMatch + "/*";
    const relatedTabs = await browser.tabs.query({ url: hostUrlPattern });
    // const gettingMagnets = relatedTabs.map(tab => executingContentScript(tab.id));
    // return Promise.allSettled(gettingMagnets).then(results => results.map(result.value));
    console.log('relatedTabs: ', relatedTabs);
    return Promise.all(relatedTabs.map(t => executingContentScript(t.id)))
        .then(function (magnetLinks) {
            return magnetLinks.filter(magnetLink => !_.isEmpty(magnetLink)).flat();
        });
}


function gettingActiveTabUrl() {
    return browser.tabs.query({ active: true, currentWindow: true })
        .then(t => t[0].url);
}
