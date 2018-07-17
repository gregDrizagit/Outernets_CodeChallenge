let dataArray, bufferLength, analyser, audioCtx, processorNode, volume;

if (navigator.mediaDevices) {
//     console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia ({audio: true, video: false})
    .then(function(stream) {
      
        audioCtx = new AudioContext();
        let source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser()
        analyser.fftSize = 1024; 
        analyser.smoothingTimeConstant = 0.3;
        bufferLength = analyser.frequencyBinCount
    
        // source.connect(audioCtx.destination);
        source.connect(analyser)

        audioProcessorInit()
        listen()
    })
    .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
} else {
    console.log('getUserMedia not supported on your browser!');
}
// // dump script to pre element
// document.body.appendChild()

function audioProcessorInit(){

    processorNode = audioCtx.createScriptProcessor(2048, 1, 1)
    processorNode.connect(audioCtx.destination)
  
}

function listen(){

    processorNode.onaudioprocess = function() {
        dataArray =  new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        var average = getAverageVolume(dataArray);
        volume = average
    }
    
}

function getAverageVolume(array) {
    var values = 0;
    var average;

    var length = array.length;

    // get all the frequency amplitudes
    for (var i = 0; i < length; i++) {
        values += array[i];
    }

    average = values / length;
    return average;
}