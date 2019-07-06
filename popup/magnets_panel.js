browser.runtime.onMessage.addListener(m => {
    document.getElementById('magnets').value = m;
})