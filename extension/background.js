chrome.action.onClicked.addListener((tab) => {
    // Inject content script if not already present (failsafe)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        // Ask content script for text
        chrome.tabs.sendMessage(tab.id, { text: 'get_content' }, (response) => {
            if (response) {
                // Encode content and open our app
                // Limit to 2000 chars for URL safety (Next.js/Browsers handle more but let's be safe)
                const maxLength = 2000;
                let textToPass = response;
                if (textToPass.length > maxLength) {
                    textToPass = textToPass.substring(0, maxLength);
                }

                const encodedText = encodeURIComponent(textToPass);
                chrome.tabs.create({ url: `http://localhost:3000/repurpose?text=${encodedText}` });
            }
        });
    });
});
