import _ from 'lodash';

var urls = document.querySelectorAll('span.content_bt_url');
// for (elt of urls){
//   elt.style.border="5px solid red";
// }
// urls.forEach(ele => { ele.style.border = "5px solid red"; });
// document.body.style.border = "5px solid red";

function getNodeList(selector) {
    return document.querySelectorAll(selector);
}



function getNodesAttr(nodeList, attrName) {
    return Array.map(nodeList, x => x[attrName]);
}

function getMagnet() {
    let nodeList = getNodeList('.content_bt_url>a');
    return getNodesAttr(nodeList, 'href');
}

function getSizes() {
    let sizeNodes = getNodeList('.dht_dl_size_content');
    let sizeTexts = getNodesAttr(sizeNodes, 'textContent');
    let re = /([0-9\.]+)([GMTK]B)/i;
    let sizes = _.map(sizeTexts, function (e) {
        let found = e.match(re);
        let num = found[1];
        let unit
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
    });

    return sizes;
}

browser.runtime.onMessage.addListener(request => {
    if (request.command === "magnit") {
        let magnetData = _.zip(getMagnet(), getSizes());
        let sortedData = _.orderBy(magnetData, 1, 'desc');
        console.log(sortedData);
    }
})

