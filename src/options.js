import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);


///////////////////////////////////////

const SelectorRow = ({domain, magnetSelector, sizeSelector}) => {
   return (
       
   )
}




///////////////////////////////////////


const SelectorTableHead = () => {
    return (
        <thead>
            <tr>
                <td>domain</td>
                <td>magnet-selector</td>
                <td>size-selector</td>
            </tr>
        </thead>
    )
}

const SelectorTable = ({ selectors }) => {
    return (<table>
        <SelectorTableHead />
        <SelectorTableBody selectors={selectors} />
    </table>)
}

const SelectorTableBody = ({ selectors }) => {
    if (_.size(selectors) > 0) {
        console.debug("map");
        console.debug("selectors: ", selectors);
        return (
            <tbody>
                {
                    // _.map(selectors, selector => (<tr key={selector.domain}>
                    selectors.map((selector, i) => (
                        <tr key={i}>
                            <td><input type="text" className="domain-name" placeholder={selector.domain} /></td>
                            <td><input type="text" className="magnet-selector" placeholder={selector.magnetSelector} /></td>
                            <td><input type="text" className="size-selector" placeholder={selector.sizeSelector} /></td>
                            <td>
                                <button className="remove-record">remove</button>
                            </td>
                        </tr>))
                }
                <tr>
                    <td><input type="text" className="domain-name" /></td>
                    <td><input type="text" className="magnet-selector" /></td>
                    <td><input type="text" className="size-selector" /></td>
                </tr>
            </tbody>
        );
    } else {
        console.debug("hardcode");
        console.debug("selectors: ", selectors);
        return (
            <tbody>
                <td><input type="text" className="domain-name" /></td>
                <td><input type="text" className="magnet-selector" /></td>
                <td><input type="text" className="size-selector" /></td>
            </tbody>
        );
    }
};
function saveOptions(e) {
    let domainNames = getValues(".domain-name");
    let magnetSelectors = getValues(".magnet-selector");
    let sizeSelectors = getValues(".size-selector");
    let selectors = _.zipWith(domainNames, magnetSelectors, sizeSelectors, (a, b, c) => {
        return { domain: a, magnetSelector: b, sizeSelector: c };
    });
    console.log(selectors);
    let optionData = {
        selectors
    };

    browser.storage.sync.set(optionData);
    e.preventDefault();
}

function restoreOptions() {
    let storedOptions = browser.storage.sync.get('selectors').then(updatePage);

    function updatePage(storedOptions) {
        // let numOfSelectors = _.size(selectors);
        // let tbodyNode = document.querySelector("#selector-table>tbody");
        // tbodyNode.remove();
        ReactDOM.render(<SelectorTable selectors={storedOptions.selectors} />, document.querySelector('#selector-table'));
    }
}

function getValues(cssSelector) {
    return _.map(document.querySelectorAll(cssSelector), x => x.value);
}
