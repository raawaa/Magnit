import _ from 'lodash';
import fp from 'lodash/fp';
import helpers from './helpers';
// var urls = document.querySelectorAll('span.content_bt_url');
// for (elt of urls){
//   elt.style.border="5px solid red";
// }
// urls.forEach(ele => { ele.style.border = "5px solid red"; });
// document.body.style.border = "5px solid red";

function text2size(text) {
    let re = /([0-9\.]+)([GMTK]B)/i;
    let found = text.match(re);
    if (found) {
        let num = found[1];
        let unit;
        switch (found[2]) {
            case 'GB':
                unit = 1000;
                break;
            case 'MB':
                unit = 1;
            default:
                unit = 0;
                break;
        }
        return num * unit;
    } else {
        return 0;
    }
}

function getMagnets(selector) {
    let nodeList = document.querySelectorAll(selector);
    return fp.map(ele => ele['href'] || ele['textContent'])(nodeList);
}


function getSizes(selector) {
    if(_.isEmpty(selector)) return [];
    let sizeNodes = document.querySelectorAll(selector);
    let sizeTexts = fp.map(ele => ele['textContent'])(sizeNodes);
    return fp.map(text2size)(sizeTexts);
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

browser.storage.sync.get('selectors')
    .then(options => {
        const currentUrl = window.location.href;
        const selector = _.find(options.selectors, entry => {
            return currentUrl.match(helpers.matchPatternToRegExp(entry.url_pattern));
        });
        if (selector) {
            const magnetData = _.zip(getMagnets(selector.magnet_selector), getSizes(selector.size_selector));
            const sortedData = _.orderBy(magnetData, 1, 'desc');
            window.location.href = sortedData[0][0];
        }
    });