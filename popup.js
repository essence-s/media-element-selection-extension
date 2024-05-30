let dataG = {
    tabId: '',
    imgNumber: '',
    imgCover: ''
}

let dataLS = localStorage.getItem('dataG')
if (dataLS) {
    dataG = JSON.parse(dataLS)
    renderSelectedVideoElement(dataSaveVideo)
}

function renderSelectedVideoElement(element) {
    element.innerHTML = `
        Video Seleccinado :
        ID Page: ${dataG.tabId}
        Cover Video : ${dataG.imgNumber}
        <img src=${dataG.imgCover} class='img-option'> 
    `
}

getdata.addEventListener('click', () => {
    chrome.tabs.query({}, function (tabs) {
        dataTabs.innerHTML = tabs.map(tab => {
            return `<div class="tab-title" dataID='${tab.id}'>${tab.title}</div >`
        }).join('');
    })
})

dataTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-title')) {
        let tabId = e.target.getAttribute('dataID')
        chrome.tabs.sendMessage(parseInt(tabId), { data: 'getVideosData' }, (response) => {
            if (chrome.runtime.lastError) {
                // console.log(chrome.runtime.lastError)
                console.log('Error al enviar mensaje:', chrome.runtime.lastError.message);
                chrome.scripting.executeScript({
                    target: {
                        tabId: parseInt(tabId),
                        // allFrames: true
                    },
                    files: ["content.js"],
                }).then(() => {
                    console.log("script injected in all jaus")
                    chrome.tabs.sendMessage(parseInt(tabId), { data: 'getVideosData' }, (response) => {
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


dataVideos.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-option')) {

        const funExec = () => {
            dataG.imgNumber = e.target.getAttribute('imgNumber')
            dataG.imgCover = e.target.src
            dataG.tabId = e.target.getAttribute('tabId')
            console.log(e.target)

            localStorage.setItem('dataG', JSON.stringify(dataG))
            chrome.runtime.sendMessage({ cmd: 'updateDataG', data: dataG });
            renderSelectedVideoElement(dataSaveVideo)

            // mandar señal para agregar eventos al element
            chrome.tabs.sendMessage(parseInt(dataG.tabId), {
                cmd: 'addEventsElement',
                data: { idNumber: dataG.imgNumber }
            })
        }

        if (dataG.tabId == '') {
            funExec()
        } else {
            chrome.tabs.sendMessage(parseInt(dataG.tabId), {
                cmd: 'removeEventsElement',
                data: { idNumber: dataG.imgNumber }
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('error remove', chrome.runtime.lastError.message)
                    funExec()
                } else {
                    if (response == 'ok') {
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
        console.log(request)
        if (request.cmd == 'responseIMGS') {
            console.log(sender)
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

