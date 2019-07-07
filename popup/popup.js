const downloadButton = document.getElementById('download_button');
const copyButton = document.getElementById('copy_button');
const configButton =document.getElementById('config_button');

copyButton.addEventListener('click', async (event) => {
    let currTab = await browser.tabs.query({ active: true, currentWindow: true });
    // console.log('from popup:', currTab[0].url);
    browser.runtime.sendMessage({ command: 'copyMagnets', url: currTab[0].url });
    // console.log(`from backgroupd: ${createdWindow.tabs[0].id}`)
});

configButton.addEventListener('click',e=>browser.runtime.openOptionsPage());
