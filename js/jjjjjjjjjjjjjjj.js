const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = true; // Enable continuous recognition
recognition.interimResults = true; // Get interim results while speaking

recognition.onstart = () => {
    console.log("Voice recognition activated. Try speaking into the microphone.");
};

recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    console.log("Transcript: ", transcript);
};

recognition.onerror = (event) => {
    console.error("Speech recognition error: ", event.error);
};

recognition.onend = () => {
    console.log("Speech recognition ended. Restarting...");
    recognition.start(); // Restart recognition
};

// Start recognition
recognition.start();
