
console.log("start audio")

const audioCtx = new AudioContext()
//const audioCtx2 = new AudioContext()

let buffer = null;
let buffer2 = null;
const load = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "fx/hoverclick.wav");
    request.responseType = "arraybuffer";
    request.onload = function () {
        let undecodedAudio = request.response;
        audioCtx.decodeAudioData(undecodedAudio, (data) => buffer = data);
    };
    request.send();
}
const load2 = () => {
    const request2 = new XMLHttpRequest();
    request2.open("GET", "fx/placedowndrum.wav");
    request2.responseType = "arraybuffer";
    request2.onload = function () {
        let undecodedAudio2 = request2.response;
        audioCtx.decodeAudioData(undecodedAudio2, (data2) => buffer2 = data2);
    };
    request2.send();
}


const play = () => {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start()
}

const play2 = () => {
    const source = audioCtx.createBufferSource();
    source.buffer2 = buffer2;
    source.connect(audioCtx.destination);
    source.start()
}

   // button.addEventListener("click", play)
   // document.body.append(button)
