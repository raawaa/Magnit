// import _ from 'lodash';
// import fp from 'lodash/fp';
// import helpers from './helpers';

console.log('=====================conent script ====================');

function getMagnets(selector) {
    let nodeList = document.querySelectorAll(selector);
    return _.map(nodeList, ele => ele['href'] || ele['textContent']);
}


function getSizes(sizeSelector) {
    if (_.isEmpty(sizeSelector)) return [];
    let sizeNodes = document.querySelectorAll(sizeSelector);
    let sizeTexts = _.map(sizeNodes, ele => ele['textContent']);
    return _.map(sizeTexts, text2size);
}

// browser.runtime.onMessage.addListener(request => {
//     console.debug('magnit');
//     if (request.command === "magnit") {
//         browser.storage.sync.get('selectors').then(selectors => {
//             const currentUrl = window.location.href;
//             const selector = fp.find(entry => helpers.matchPatternToRegExp(entry.url_pattern).match(currentUrl))(selectors)
//             const magnetData = _.zip(getMagnets(selector.magnet_selector), getSizes(selector.size_selector));
//             const sortedData = _.orderBy(magnetData, 1, 'desc');
//             console.debug(sortedData)
//             // window.location.href = sortedData[0][0];
//         });
//     }
// })

// browser.storage.sync.get('selectors')
//     .then(options => {
//         const currentUrl = window.location.href;
//         const selector = _.find(options.selectors, entry => {
//             return currentUrl.match(helpers.matchPatternToRegExp(entry.url_pattern));
//         });
//         if (selector) {
//             const magnetData = _.zip(getMagnets(selector.magnet_selector), getSizes(selector.size_selector));
//             const sortedData = _.orderBy(magnetData, 1, 'desc');
//             // window.location.href = sortedData[0][0];
//             console.log(sortedData[0][0]);
//             sortedData[0][0];
//         }
//     });

getSelectors()
    .then(options => {
        const currentUrl = window.location.href;
        console.log(`Current Url:${currentUrl}`);
        const selector = _.find(options, entry => {
            return currentUrl.match(matchPatternToRegExp(entry.url_pattern));
        });
        console.log(`selector:${selector.url_pattern}`);
        if (selector) {
            const magnetData = _.zip(getMagnets(selector.magnet_selector), getSizes(selector.size_selector));
            console.log(magnetData)
            const sortedData = _.orderBy(magnetData, 1, 'desc');
            // window.location.href = sortedData[0][0];
            console.log('sortedData: ', sortedData[0][0]);
            return sortedData[0][0];
        }
    });

