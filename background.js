// chrome.runtime.onInstalled.addListener(() => {
//     chrome.tabs.query({}, (tabs) => {
//         for (let tab of tabs) {

//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 files: ['content.js']
//             }, () => {
//                 console.log('Content script inyectado en la pestaña', tab.id);
//             });

//         }
//     });
// })

// chrome.scripting
//     .registerContentScripts([{
//         id: "session-script",
//         js: ["content.js"],
//         persistAcrossSessions: false,
//         matches: ["<all_urls>"],
//         runAt: "document_idle",
//         allFrames: true,
//     }])
//     .then(() => console.log("registration complete"))
//     .catch((err) => console.warn("unexpected error", err))


// chrome.tabs.query({}, (tabs) => {

//     for (let tab of tabs) {
//         if (tab.url.match(/(chrome|chrome-extension):\/\//gi)) {
//             continue;
//         }
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ["content.js"],
//         }).then(() => console.log("script injected in all jaus"));
//     }
// })

// chrome.tabs.query({ url: ['https://ahiseve.vercel.app/*', 'http://localhost:4321/*'] }, (tabs) => {
//     console.log(tabs)
// })

let dataG = {}

function comprobarData() {
    return new Promise((resolve) => {
        if (Object.keys(dataG).length == 0) {
            chrome.storage.local.get(['dataG'], function (result) {
                if (result.dataG) {
                    dataG = JSON.parse(result.dataG)
                }

                resolve('')
            })

        } else {
            resolve('')
        }
    })

}



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        comprobarData().then(() => {
            console.log(request);
            // console.log(sender);
            if (request.cmd == 'updateDataG') {
                console.log('si se pudo chavito')
                dataG = request.data

                chrome.storage.local.set({ dataG: JSON.stringify(request.data) }, function () {
                    console.log('Datos almacenados en el localStorage del background:');
                });

            }
            else if (request.cmd == 'element-action') {
                console.log('element-action', request)
                if (request.data.status == 'sending') {
                    // enviar al pagina principal
                    chrome.tabs.query({ url: ['https://ahiseve.vercel.app/*', 'http://localhost:4321/*'] }, (tabs) => {
                        tabs.forEach(tab => {
                            chrome.tabs.sendMessage(tab.id, {
                                cmd: request.cmd,
                                data: request.data
                            });
                        });
                    })
                } else {
                    console.log(dataG)
                    // enviar a la pagina y videoElement Selecionado
                    chrome.tabs.sendMessage(parseInt(dataG.tabId), {
                        cmd: request.cmd,
                        data: {
                            ...request.data,
                            idNumber: dataG.imgNumber
                        }
                    });

                }

            } else if (request.cmd == 'checkElementVideoSelected') {

                let sendData = {
                    selected: false
                }

                if (Object.keys(dataG).length != 0) {
                    sendData = {
                        selected: true,
                    }
                    console.log('dataG', dataG)
                }
                console.log('dataG vacio', dataG)
                chrome.tabs.sendMessage(sender.tab.id, {
                    cmd: 'resultCheckElementVideoSelected',
                    data: sendData
                });
            }
            sendResponse({ data: "Respuesta desde el fondo" });
        })
        return true
    }
);