defaultSelectors = {
    javbook: {
        url_pattern: "*://*.jmvbt.com/*",
        magnet_selector: ".content_bt_url>a",
        size_selector: ".dht_dl_size_content"
    },
    javbus: {
        url_pattern: "*://*.dmmbus.men/*",
        magnet_selector: "#magnet-table>tr>td:nth-child(1)>a:first-child",
        size_selector: "#magnet-table>tr>td:nth-child(2)>a:first-child"
    },
    zhuixinfan: {
        url_pattern: "*://*.zhuixinfan.com/*",
        magnet_selector: "#torrent_url",
        size_selector: ""
    }
}

// export default defaultSelectors;