const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieTitle = document.getElementById('movie-title');
const movieGenre = document.getElementById('movie-genre');
const movieCast = document.getElementById('movie-cast');
const movieRating = document.getElementById('movie-rating');
const movieReleased = document.getElementById('movie-released');
const movieDirector = document.getElementById('movie-director');
const moviePoster = document.getElementById('movie-poster');

// Check for browser support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
} else {
    var recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Automatically start recognition when the page loads
    window.onload = function() {
        startRecognition();
    };

    // Function to start recognition
    function startRecognition() {
        recognition.start();
        console.log("Listening for movie title...");
    }

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.trim();
        console.log('Recognized: ' + spokenText);
        searchInput.value = spokenText; // Set the input value to the recognized text
        searchMovie(spokenText); // Trigger the search
    };

    recognition.onerror = function(event) {
        console.error("Error occurred in recognition: " + event.error);
        alert("Error occurred in recognition: " + event.error);
        setTimeout(startRecognition, 30000); // Restart recognition after 30 seconds on error
    };

    recognition.onend = function() {
        setTimeout(startRecognition, 25000); // Restart recognition after 30 seconds when it ends
    };
}

// Function to search for the movie
function searchMovie(query) {
    const apiKey = 'adff2bf8'; // Your API key
    fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                movieTitle.textContent = data.Title;
                movieGenre.textContent = data.Genre;
                movieCast.textContent = data.Actors;
                movieRating.textContent = data.imdbRating;
                movieReleased.textContent = data.Released;
                movieDirector.textContent = data.Director;
                moviePoster.src = data.Poster;

                // Automatically speak out the movie details
                speakMovieDetails(data);
            } else {
                alert("Movie not found. Please try again.");
                speak("Movie not found. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
}

// Function to speak out the text
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
    const allVoices= speechSynthesis.getVoices();
    speech.voice = allVoices[4];
}


// Function to speak movie details individually
function speakMovieDetails(data) {
    // Array of movie details to be spoken one by one
    const details = [
        `Now displaying information for ${data.Title}.`,
        `It is a ${data.Genre} film.`,
        `Featuring actors: ${data.Actors}.`,
        `It has an IMDb rating of ${data.imdbRating}.`,
        `Released on ${data.Released}.`,
        `Directed by ${data.Director}.`
    ];

    // Function to speak out each sentence individually
    function speakNextDetail(index) {
        if (index < details.length) {
            const speech = new SpeechSynthesisUtterance(details[index]);
            speech.lang = 'en-US';
            const allVoices= speechSynthesis.getVoices();
            speech.voice = allVoices[4];

            // When the current speech has ended, speak the next detail
            speech.onend = function() {
                speakNextDetail(index + 1);
            };
            
            window.speechSynthesis.speak(speech);
        }
    }
    window.onload = function(){
        speakNextDetail("  ");
}
window.onload = function(){
    speak("  ");
}
    // Start speaking the first detail
    speakNextDetail(0);
}
