// let isApply = false

function handlePlay(event) {
    console.log(event)
    setTimeout(() => {
        chrome.runtime.sendMessage({
            cmd: 'element-action',
            data: {
                action: 'play',
                status: 'sending'
            }
        })
    }, 1000)
}
function handlePause(event) {
    console.log(event)
    setTimeout(() => {
        chrome.runtime.sendMessage({
            cmd: 'element-action',
            data: {
                action: 'pause',
                status: 'sending'
            }
        });
    }, 1000)
}

function handleSeeking(event) {
    console.log(event)
    // if (isApply) return isApply = false
    setTimeout(() => {
        chrome.runtime.sendMessage({
            cmd: 'element-action',
            data: {
                action: 'seeked',
                status: 'sending',
                mediaCurrentTime: event.target.currentTime
            }
        });
    }, 1000)

}

function addEventsElement(element) {
    // console.log('in addEven')
    element.addEventListener("play", handlePlay);
    element.addEventListener("pause", handlePause)
    element.addEventListener("seeking", handleSeeking)
}


function removeEventsElement(element) {
    element.removeEventListener("seeking", handleSeeking)
    element.removeEventListener("play", handlePlay)
    element.removeEventListener("pause", handlePause)
}

function notGenerateEvent(targetElement, eventElement, functionElement, callback) {
    if (eventElement == 'pause' && targetElement.paused == true) return
    if (eventElement == 'play' && targetElement.paused == false) return

    targetElement.removeEventListener(eventElement, functionElement)
    const eventG = () => {
        targetElement.addEventListener(eventElement, functionElement)
        targetElement.removeEventListener(eventElement, eventG)
        console.log(8)
    }
    // console.log('no generate event')
    targetElement.addEventListener(eventElement, eventG)
    callback()
}


window.addEventListener("message", function (event) {
    if (event.source != window) return;
    let { cmd, data } = event.data

    if (cmd == 'element-action') {
        if (data.status == 'received') {
            console.log('llego desdepagina recived')
            if (data.action == 'play') {
                chrome.runtime.sendMessage({ cmd: cmd, data: data });
            } else if (data.action == 'pause') {
                chrome.runtime.sendMessage({ cmd: cmd, data: data });
            } else if (data.action == 'seeked') {
                chrome.runtime.sendMessage({ cmd: cmd, data: data });
            }
        }
    } else if (cmd && (cmd == "checkElementVideoSelected")) {
        chrome.runtime.sendMessage({ cmd: 'checkElementVideoSelected', data });
    }

}, false);



function generarID() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitudID = 8;

    let idGenerado = '';
    for (let i = 0; i < longitudID; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        idGenerado += caracteres.charAt(indiceAleatorio);
    }

    return idGenerado;
}

function obtenerImagenPrevia(videoun) {
    try {
        videoun.crossOrigin = 'anonymous';
        let canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 56;
        canvas.getContext('2d').drawImage(videoun, 0, 0, canvas.width, canvas.height);
        let previewImage = canvas.toDataURL('image/png');
        return previewImage
    } catch (e) {
        console.log(e)
    }
}


let foundVideos = []
function getVideosPage() {

    let videos = document.querySelectorAll('video');
    const arrayvideos = Array.from(videos).map((videoun, i) => {
        let previewImage = obtenerImagenPrevia(videoun);

        return {
            number: generarID(),
            img: previewImage,
            element: videoun
        }
    });

    foundVideos = arrayvideos
    console.log(arrayvideos)

    return arrayvideos.map(v => ({ number: v.number, img: v.img }))
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.cmd == 'element-action') {

        if (request.data.status == 'received') {
            console.log('recived ult 567', request)
            let foundElementVideo = foundVideos.find(d => d.number == request.data.idNumber)
            if (foundElementVideo) {
                let mediaElement = foundElementVideo.element
                if (request.data.action == 'play') {
                    notGenerateEvent(mediaElement, 'play', handlePlay, () => {
                        foundElementVideo.element.play()
                    })
                } else if (request.data.action == 'pause') {
                    notGenerateEvent(mediaElement, 'pause', handlePause, () => {
                        foundElementVideo.element.pause()
                    })
                } else if (request.data.action == 'seeked') {
                    notGenerateEvent(mediaElement, 'seeking', handleSeeking, () => {
                        mediaElement.currentTime = Math.max(0, request.data.mediaCurrentTime)
                    })
                }

            }
        } else if (request.data.status == 'sending') {
            window.postMessage(
                {
                    cmd: request.cmd,
                    data: request.data
                },
                "*",
            );
        }

        sendResponse('ok')

    }
    else if (request.data == 'getVideosData') {
        // getdataPrueba()
        let dataImageVideos = getVideosPage()
        // console.log(dataImageVideos)
        chrome.runtime.sendMessage({ cmd: 'responseIMGS', data: dataImageVideos }, function (response) {
            console.log(response);
        });
        // console.log(foundVideos)
        sendResponse('ok')
    } else if (request.cmd == 'resultCheckElementVideoSelected') {
        // console.log('ok:request', request)
        window.postMessage(
            {
                cmd: "resultCheckElementVideoSelected",
                data: request.data
            },
            "*",
        );
        sendResponse('ok')
    } else if (request.cmd == 'addEventsElement') {
        console.log('addEvents', request)
        // console.log('founVi', foundVideos)
        let foundElementVideo = foundVideos.find(d => d.number == request.data.idNumber)
        if (foundElementVideo) {
            addEventsElement(foundElementVideo.element)
        }
        sendResponse('ok')
    } else if (request.cmd == 'removeEventsElement') {
        console.log('Remove Events', request)
        let foundElementVideo = foundVideos.find(d => d.number == request.data.idNumber)

        if (foundElementVideo) {
            removeEventsElement(foundElementVideo.element)
        }
        sendResponse('ok')
    }
    // sendResponse('ok')
    return true
});


chrome.runtime.sendMessage({ data: "Mensaje desde la página" }, (response) => {
    console.log(response);
});

console.log('limon')