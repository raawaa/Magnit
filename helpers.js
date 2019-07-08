/**
* Transforms a valid match pattern into a regular expression
* which matches all URLs included by that pattern.
*
* @param  { string } pattern  The pattern to transform.
* @return { RegExp }           The pattern's equivalent as a RegExp.
* @throws { TypeError } If the pattern is not a valid MatchPattern
*/

function matchPatternToRegExp(pattern) {
    if (pattern === '') {
        return (/^(?:http|https|file|ftp|app):\/\//);
    }

    const schemeSegment = '(\\*|http|https|file|ftp)';
    const hostSegment = '(\\*|(?:\\*\\.)?(?:[^/*]+))?';
    const pathSegment = '(.*)';
    const matchPatternRegExp = new RegExp(
        `^${schemeSegment}://${hostSegment}/${pathSegment}$`
    );

    let match = matchPatternRegExp.exec(pattern);
    if (!match) {
        throw new TypeError(`"${pattern}" is not a valid MatchPattern`);
    }

    let [, scheme, host, path] = match;
    if (!host) {
        throw new TypeError(`"${pattern}" does not have a valid host`);
    }

    let regex = '^';

    if (scheme === '*') {
        regex += '(http|https)';
    } else {
        regex += scheme;
    }

    regex += '://';

    if (host && host === '*') {
        regex += '[^/]+?';
    } else if (host) {
        if (host.match(/^\*\./)) {
            regex += '[^/]*?';
            host = host.substring(2);
        }
        regex += host.replace(/\./g, '\\.');
    }

    if (path) {
        if (path === '*') {
            regex += '(/.*)?';
        } else if (path.charAt(0) !== '/') {
            regex += '/';
            regex += path.replace(/\./g, '\\.').replace(/\*/g, '.*?');
            regex += '/?';
        }
    }

    regex += '$';
    return new RegExp(regex);
}

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

async function getSelectors() {
    let selectors = await browser.storage.sync.get('selectors').catch(e => undefined);
    return _.isEmpty(selectors)? defaultSelectors:selectors;
    // try {
    //     return await browser.storage.sync.get('selectors') ;
    // } catch (error) {
    //     console.error(error)
    //     window.alert('error when getting sync selectors')
    //     return defaultSelectors;
    // }
}
// export {
//     matchPatternToRegExp, text2size
// }