import { MESSAGE_TYPES } from "./types"
import { sendMessage, sendMessageTab } from './util'

function renderSelectedVideoElement(element, nc) {
    if (nc == 'no-connect') {
        element.classList.add('no-conect')
    } else {
        element.classList.remove('no-conect')
    }
    // Video Seleccionado
    // ID Page: ${dataG.tabId}
    element.innerHTML = `
        <p>
            Video Seleccionado
            <img src='${dataG.favIconUrl}' crossorigin="anonymous" class="data-save-img-icon" />
        </p>
        <img src=${dataG.imgCover} class='img-option'> 
    `
}

function renderResponseImgs(request) {
    dataVideos.innerHTML = request.map(element => {
        return `<img class='img-option' tabId='${element.tabId}' imgNumber="${element.number}" src="${element.img}" > `
    }).join('')
}

function resultCheckElementVideoSelected() {
    let sendData = {
        selected: false
    }

    if (Object.keys(dataG).length != 0) {
        sendData = {
            selected: true,
        }
    }

    chrome.tabs.query({ url: ['https://ahiseve.vercel.app/*', 'http://localhost:4321/*'] }, (tabs) => {
        tabs.forEach(tab => {
            sendMessageTab(tab.id, {
                cmd: MESSAGE_TYPES.RESULT_CHECK_ELEMENT_VIDEO_SELECTED,
                data: sendData
            });
        })
    })
}

let dataG = {
    tabId: '',
    imgNumber: '',
    imgCover: '',
    favIconUrl: ''
}

let dataLS = localStorage.getItem('dataG')
if (dataLS) {
    dataG = JSON.parse(dataLS)

    sendMessageTab(parseInt(dataG.tabId), { cmd: MESSAGE_TYPES.CHECK_CONNECTION })
        .then((response) => {
            if (response.message == 'connected') {
                renderSelectedVideoElement(dataSaveVideo)
            }
        }).catch(err => {
            console.log('Error al enviar mensaje:', err);
            renderSelectedVideoElement(dataSaveVideo, 'no-connect')
        })


}

// getdata.addEventListener('click', () => {
setTimeout(() => {
    chrome.tabs.query({}, function (tabs) {
        try {
            // console.log(tabs)
            dataTabs.innerHTML = tabs.map(tab => {
                return `<div class="tab-title" dataID='${tab.id}'>
                    <img src='${tab.favIconUrl}' crossorigin="anonymous" /> ${tab.title}
                </div >`
            }).join('')
        } catch (e) {
            console.log(e)
        }
    })
}, 100)

// })

dataTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-title')) {
        let tabId = e.target.getAttribute('dataID')
        // console.log('dddp')
        window.location.href = '#dataVideos'


        sendMessageTab(parseInt(tabId), { cmd: MESSAGE_TYPES.GET_VIDEOS_DATA })
            .then((response) => {
                console.log('Mensaje enviado:', response)
            }).catch((error) => {
                console.log('Error al enviar mensaje:', error)
                chrome.scripting.executeScript({
                    target: {
                        tabId: parseInt(tabId),
                        allFrames: true
                    },
                    files: ["content.bundle.js"],
                }).then(() => {
                    console.log("script injected in all jaus")

                    sendMessageTab(parseInt(tabId), { cmd: MESSAGE_TYPES.GET_VIDEOS_DATA })
                        .then((response) => {
                            console.log('Mensaje enviado:', response)
                        }).catch((err) => {
                            console.log('Error al enviar mensaje 2:', err)
                        })
                });
            })
    }
})

dataVideos.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-option')) {

        const funExec = () => {
            dataG.imgNumber = e.target.getAttribute('imgNumber')
            dataG.imgCover = e.target.src
            dataG.tabId = e.target.getAttribute('tabId')


            chrome.tabs.get(parseInt(e.target.getAttribute('tabId')), function (tab) {
                // console.log(tab.favIconUrl)
                dataG.favIconUrl = tab.favIconUrl
                // console.log('dino', e.target)

                localStorage.setItem('dataG', JSON.stringify(dataG))
                sendMessage({ cmd: 'updateDataG', data: dataG });
                renderSelectedVideoElement(dataSaveVideo)

                // mandar señal para agregar eventos al element
                sendMessageTab(parseInt(dataG.tabId), {
                    cmd: MESSAGE_TYPES.ADD_EVENTS_ELEMENT,
                    data: { idNumber: dataG.imgNumber }
                })

                resultCheckElementVideoSelected()
            })
        }

        if (dataG.tabId == '') {
            funExec()
        } else {
            sendMessageTab(parseInt(dataG.tabId), {
                cmd: MESSAGE_TYPES.REMOVE_EVENTS_ELEMENTS,
                data: { idNumber: dataG.imgNumber }
            }).then((response) => {
                if (response.status == 'ok') {
                    funExec()
                }
            }).catch(error => {
                console.log('error remove', error)
                funExec()
            })
        }



    }

})

let arrayPruebin = []
let dataImgGlobal = []

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(request)
        if (request.cmd == 'responseIMGS') {
            // console.log(sender)
            dataImgGlobal.push(request.data.map(element => {
                return {
                    ...element,
                    tabId: sender.tab.id
                }
            }))
            renderResponseImgs(dataImgGlobal.flat())
        } else if (request.cmd == 'ElementVideo') {
            arrayPruebin.push(request.data.id)

        }
        sendResponse("no se encontro coincidencia")
    }
);

