import _ from 'lodash';
import fp from 'lodash/fp';

// var urls = document.querySelectorAll('span.content_bt_url');
// for (elt of urls){
//   elt.style.border="5px solid red";
// }
// urls.forEach(ele => { ele.style.border = "5px solid red"; });
// document.body.style.border = "5px solid red";

function text2size(text) {
    let re = /([0-9\.]+)([GMTK]B)/i;
    let found = text.match(re);
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
}

function getMagnets(selector) {
    let nodeList = document.querySelectorAll(selector);
    return fp.map(ele=>ele['href'])(nodeList);
}


function getSizes(selector) {
    let sizeNodes = getNodeList(selector);
    let sizeTexts = fp.map(ele=>ele['textContent'])(sizeNodes);
    return fp.map(text2size)(sizeTexts);
}

browser.runtime.onMessage.addListener(request => {
    if (request.command === "magnit") {
        let magnetData = _.zip(getMagnets(magnetSelector), getSizes(sizeSelector));
        let sortedData = _.orderBy(magnetData, 1, 'desc');
        // console.log(sortedData);
        // console.log("ROGAR THAT!!!!!");
        window.location.href = sortedData[0][0];
    }
})

