export function sendMessage(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(response)
            }
        })
    })
}

export function sendMessageTab(tabId, message) {
    return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(parseInt(tabId), message, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message)
            } else {
                resolve(response)
            }
        })
    })
}