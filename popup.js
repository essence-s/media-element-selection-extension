const MESSAGE_TYPES = {
    ELEMENT_ACTION: 'ELEMENT_ACTION',
    GET_VIDEOS_DATA: 'GET_VIDEOS_DATA',
    CHECK_ELEMENT_VIDEO_SELECTED: "CHECK_ELEMENT_VIDEO_SELECTED",
    RESULT_CHECK_ELEMENT_VIDEO_SELECTED: 'RESULT_CHECK_ELEMENT_VIDEO_SELECTED',
    ADD_EVENTS_ELEMENT: 'ADD_EVENTS_ELEMENT',
    REMOVE_EVENTS_ELEMENTS: 'REMOVE_EVENTS_ELEMENTS',
    CHECK_CONNECTION: 'CHECK_CONNECTION'
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
    chrome.tabs.sendMessage(parseInt(dataG.tabId), { cmd: MESSAGE_TYPES.CHECK_CONNECTION }, (response) => {
        if (chrome.runtime.lastError) {
            console.log('Error al enviar mensaje:', chrome.runtime.lastError.message);
            renderSelectedVideoElement(dataSaveVideo, 'no-connect')
        } else if (response.message == 'connected') {
            renderSelectedVideoElement(dataSaveVideo)
        }
    })


}

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
        chrome.tabs.sendMessage(parseInt(tabId), { cmd: MESSAGE_TYPES.GET_VIDEOS_DATA }, (response) => {
            if (chrome.runtime.lastError) {
                // console.log(chrome.runtime.lastError)
                console.log('Error al enviar mensaje:', chrome.runtime.lastError.message);
                chrome.scripting.executeScript({
                    target: {
                        tabId: parseInt(tabId),
                        allFrames: true
                    },
                    files: ["content.js"],
                }).then(() => {
                    console.log("script injected in all jaus")
                    chrome.tabs.sendMessage(parseInt(tabId), { cmd: MESSAGE_TYPES.GET_VIDEOS_DATA }, (response) => {
                        if (chrome.runtime.lastError) {
                            console.log('Error al enviar mensaje 2:', chrome.runtime.lastError.message);
                        } else {
                            console.log('Mensaje enviado:', response);
                        }
                    })

                });


            } else {
                console.log('Mensaje enviado:', response);
            }
        });
    }
})


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
            chrome.tabs.sendMessage(tab.id, {
                cmd: MESSAGE_TYPES.RESULT_CHECK_ELEMENT_VIDEO_SELECTED,
                data: sendData
            });
        })
    })
}

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
                chrome.runtime.sendMessage({ cmd: 'updateDataG', data: dataG });
                renderSelectedVideoElement(dataSaveVideo)

                // mandar señal para agregar eventos al element
                chrome.tabs.sendMessage(parseInt(dataG.tabId), {
                    cmd: MESSAGE_TYPES.ADD_EVENTS_ELEMENT,
                    data: { idNumber: dataG.imgNumber }
                })

                resultCheckElementVideoSelected()
            })
        }

        if (dataG.tabId == '') {
            funExec()
        } else {
            chrome.tabs.sendMessage(parseInt(dataG.tabId), {
                cmd: MESSAGE_TYPES.REMOVE_EVENTS_ELEMENTS,
                data: { idNumber: dataG.imgNumber }
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('error remove', chrome.runtime.lastError.message)
                    funExec()
                } else {
                    if (response.status == 'ok') {
                        funExec()
                    }
                }
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

    }
);

