function saveOptions(event) {
    let selectors = JSON.parse(document.querySelector("#selectors").value);
    browser.storage.sync.set({ selectors });
    event.preventDefault();
}

async function restoreOptions() {
    let selectors = await getSelectors();
    document.querySelector("#selectors").value = JSON.stringify(selectors, null, 4)
}

async function resetOptions(event) {
    try {
        await browser.storage.sync.set({ selectors: defaultSelectors });

    } catch (error) {
        window.alert('error');
    }
    document.getElementById('selectors').value = JSON.stringify(defaultSelectors, null, 4);
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('selectors_config').addEventListener("submit", saveOptions);
document.getElementById('selectors_config').addEventListener("reset", resetOptions);