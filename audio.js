let dataArray, bufferLength, analyser, audioCtx, processorNode, volume;

if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia ({audio: true, video: false}) //if the user permits microphone use
    .then(function(stream) {
      
        audioCtx = new AudioContext(); //create an audio context object
        let source = audioCtx.createMediaStreamSource(stream); // provide the stream that comes back from the process to audio context
        analyser = audioCtx.createAnalyser() //create an analyser node
        analyser.fftSize = 1024; // set the buffer size
        analyser.smoothingTimeConstant = 0.3; 
        bufferLength = analyser.frequencyBinCount
    
        // source.connect(audioCtx.destination);
        source.connect(analyser) //connect the analyser to the audio source

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
    //the onaudioprocess is similar to our animation loop in environment.js. In order to create a smooth moving picture, 
    //you need to play a bunch of frames really really fast. It works the same way with audio. We capture a bunch of 
    //"frames" of data from the microphone. Each "frame" is a collection of data that's 512 points long. 
    //To get something like volume, average the data of each frame. 
    
    processorNode.onaudioprocess = function() {
        dataArray =  new Uint8Array(bufferLength);
        console.log(bufferLength)
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