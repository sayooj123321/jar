import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyDsAxDkfQWcYZxuC7rxRZO7AXPWE6oOfjo";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<11){
        speakResponse("Good Morning Master...")
    }

    else if(hour>12 && hour<15){
        speakResponse("Good Afternoon Master...")
    }

    else{
        speakResponse("Good Evenining Sir...")
    }

}

window.addEventListener('load', () => {
    setTimeout(() => {
        
      // Hide the intro GIF
      document.getElementById('intro').style.display = 'none';
    }, 19000);
    wishMe();
  });
  

const generateContent = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        document.getElementById("result").innerText = responseText;
        speakResponse(responseText);  
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

// Function to speak the response
let stopSpeaking = false; 

function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const allVoices = speechSynthesis.getVoices();
    utterance.voice = allVoices[7];

    stopSpeaking = false; // Reset the stop flag

    // Start speaking
    speechSynthesis.speak(utterance);

    // Video and mouth animation
    const video = document.getElementById("assistantVideo");
    const mouth = document.getElementById("mouth");
    if (video.paused) {
        mouth.style.animation = "lip-sync 0.2s infinite";
        mouth.style.opacity = 1; // Enable mouth visibility
        video.play();
    }

    // Stop animations and reset video on speech end
    utterance.onend = function () {
        mouth.style.animation = "";
        mouth.style.opacity = 0;
        video.pause();
        video.currentTime = 0; // Reset video to the beginning
    };

    // Monitor for stop requests during speaking
    utterance.onboundary = function () {
        if (stopSpeaking) {
            speechSynthesis.cancel();
             mouth.style.animation = "";
        mouth.style.opacity = 0;
        video.pause();
        video.currentTime = 0;  // Stops speech synthesis immediately
        }
    };
}

// Button click to generate content (for manual input)
document.getElementById("generate").addEventListener("click", () => {
    const prompt = "Once upon a time..."; // Default prompt for testing
    generateContent(prompt);
});

// Set up speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onstart = () => {
    console.log("Voice recognition activated. Try speaking into the microphone.");
};
//......................................................

//..................................................

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Voice input received:", transcript);
    if (transcript.includes("what is your name") || transcript.includes("your name") || transcript.includes("name")) {
        speakResponse("I am Jarvis.");
        document.getElementById("result").innerText = "I am Jarvis."; 
    }else if (transcript.includes("stop")) {
        stopSpeaking = true; // Set the stop flag
        speechSynthesis.cancel(); // Stop any ongoing speech
        mouth.style.animation = "";
        mouth.style.opacity = 0;
        video.pause();
        video.currentTime = 0;
        document.getElementById("result").innerText = "Speaking stopped.";
    }
    else if (transcript.includes("who are you")) {
        speakResponse("I am a personal assistant, call me Jarvis.");
        document.getElementById("result").innerText = "I am a personal assistant, call me Jarvis";
    } else if (transcript.includes("Can you tell me about yourself") || 
    transcript.includes("tell me about yourself") || 
    transcript.includes("yourself")) {
const responseText = 
   "I am a personal assistant, call me Jarvis. I was developed by Alan, Sreerag, Sarath, and Sayooj. " + 
   "I can help you with: " + 
   "\n\n- Getting information on a wide range of topics." + 
   "\n- Writing different types of content, such as emails, essays, and poems." + 
   "\n- Translating languages." + 
   "\n- Answering your questions comprehensively." + 
   "\n- Generating creative content, such as stories and jokes." + 
   "\n\nHowever, I am not able to:" + 
   "\n\n- Provide medical or legal advice." + 
   "\n- Engage in personal conversations." + 
   "\n- Express personal opinions or beliefs." + 
   "\n\nIf you have any questions or requests, please don't hesitate to ask!";

speakResponse(responseText);
document.getElementById("result").innerText = responseText;
}
else if (transcript.includes("who is amal krishna")) {
        speakResponse("Amal krishna oruu pottan annu");
        document.getElementById("result").innerText = "Amal krishna oruu pottan annu";
    }else if (transcript.includes("who is rishi")||transcript.includes("rishi")) {
        document.getElementById("result").innerText = "rishi is also known as chakka,chakkara buji";
        speakResponse("rishi is also known as chakka,chakkara buji");
    } else if (transcript.includes("i love you")) {
        document.getElementById("result").innerText = "I love you too, you're so cute 😘";
        speakResponse("I love you too, you're so cute 😘"); 
    } else if (transcript.includes("what is love")) {
        document.getElementById("result").innerText = "A quality or feeling of strong or constant affection for and dedication to another 🫂";
        speakResponse("A quality or feeling of strong or constant affection for and dedication to another.");
    }else if (transcript.includes("Can you tell me about yourself")) {
const responseText = 
   "I am a personal assistant, call me Jarvis. I was developed by Alan, Sreerag, Sarath, and Sayooj. " + 
   "I can help you with: " + 
   "\n\n- Getting information on a wide range of topics." + 
   "\n- Writing different types of content, such as emails, essays, and poems." + 
   "\n- Translating languages." + 
   "\n- Answering your questions comprehensively." + 
   "\n- Generating creative content, such as stories and jokes." + 
   "\n\nHowever, I am not able to:" + 
   "\n\n- Provide medical or legal advice." + 
   "\n- Engage in personal conversations." + 
   "\n- Express personal opinions or beliefs." + 
   "\n\nIf you have any questions or requests, please don't hesitate to ask!";

speakResponse(responseText);
document.getElementById("result").innerText = responseText;
} else if (transcript.includes("how are you")) {
        document.getElementById("result").innerText = "I am fine sir I'm grateful for your kindness 😇";
        speakResponse("I am fine sir I'm grateful for your kindness 😇");
    } else if (transcript.includes("what are you doing")) {
        document.getElementById("result").innerText = "I am currently working on a project and assisting you, sir";
        speakResponse("I am currently working on a project and assisting you, sir.");
    } else if (transcript.includes("what is your favourite colour")) {
        document.getElementById("result").innerText = "My favorite color is blue.";
        speakResponse("My favorite color is blue.");
    } else if (transcript.includes("what is the meaning of life")) {
        document.getElementById("result").innerText = "The meaning of life is a philosophical question that has been debated for centuries and has no one definitive answer";
        speakResponse("The meaning of life is a philosophical question that has been debated for centuries and has no one definitive answer.");
    } else if (transcript.includes("who is your boss")) {
        document.getElementById("result").innerText = "Mr. Sreerag is my boss.";
        speakResponse("Mr. Sreerag is my boss.");
    } else if (transcript.includes("who is your husband")) {
        document.getElementById("result").innerText = "Akshay";
        speakResponse("Akshay");
    } else if (transcript.includes("who is your creator")) {
        document.getElementById("result").innerText = "Sreerag, Alan, Sarath, and Sayooj";
        speakResponse("Sreerag, Alan, Sarath, and Sayooj.");
    } else if (transcript.includes("who is your founder")) {
        document.getElementById("result").innerText = "Sreerag, Alan, Sarath, and Sayooj";
        speakResponse("Sreerag, Alan, Sarath, and Sayooj.");
    }else if (transcript.includes("who is pappu")||transcript.includes("who is Mathu")||transcript.includes("who is pathu")) {
        document.getElementById("result").innerText = "she is the cutest and cutiepie and penguin kunj of ct department";
        speakResponse("she is the cutest and cutiepie and penguin kunj of ct department");
    }else if (transcript.includes("sounds good")) {
        document.getElementById("result").innerText = "Thank you, sir.";
        speakResponse("Thank you, sir.");
    } else if (transcript.includes("nice work")) {
        document.getElementById("result").innerText = "Thank you, sir it my plessure";
        speakResponse("Thank you, sir it's my plessure");
    } else if (transcript.includes("where are you")) {
        document.getElementById("result").innerText = "I am always here, sir.";
        speakResponse("I am always here, sir.");
    } else if (transcript.includes("good job")) {
        document.getElementById("result").innerText = " thank you.";
        speakResponse("Sounds good, thank you.");
    } else if (transcript.includes("what is your favourite song")) {
        document.getElementById("result").innerText = "I don't have personal preferences as I'm a computer program.";
        speakResponse("I don't have personal preferences as I'm a computer program.");
    } else if (transcript.includes("can you play some music")) {
        document.getElementById("result").innerText = "Certainly, what genre or artist would you like me to play?";
        speakResponse("Certainly, what genre or artist would you like me to play?");
    } else if (transcript.includes("can you help me with my math homework")) {
        document.getElementById("result").innerText = "Certainly, what math problem do you need help with?";
        speakResponse("Certainly, what math problem do you need help with?");
    } else if (transcript.includes("what is the meaning of ai")) {
        document.getElementById("result").innerText = "AI stands for artificial intelligence, which refers to the simulation of human intelligence in machines";
        speakResponse("AI stands for artificial intelligence, which refers to the simulation of human intelligence in machines.");
    } else if (transcript.includes("can you tell me a joke")) {
        document.getElementById("result").innerText = "Why did the computer go to the doctor? Because it had a virus!";
        speakResponse("Why did the computer go to the doctor? Because it had a virus!");
    }else if (transcript.includes("what is your favorite food")) {
        document.getElementById("result").innerText = "I don't have personal tastes, but the diversity of cuisines around the world is fascinating, sir.";
        speakResponse("I don't have personal tastes, but the diversity of cuisines around the world is fascinating, sir.");
    } else if (transcript.includes("what is your favorite movie")) {
        document.getElementById("result").innerText = "As an AI language model, I don't have personal preferences.";
        speakResponse("As an AI language model, I don't have personal preferences.");
    } else if (transcript.includes("can you tell me a fun fact")) {
        document.getElementById("result").innerText = "Did you know that a group of flamingos is called a flamboyance?";
        speakResponse("Did you know that a group of flamingos is called a flamboyance?");
    } else if (transcript.includes("how do i get to the nearest gas station")) {
        document.getElementById("result").innerText = "I can help you with directions to the nearest gas station. Please tell me your current location.";
        speakResponse("I can help you with directions to the nearest gas station. Please tell me your current location.");
    } else if (transcript.includes("can you tell me a bedtime story")) {
        document.getElementById("result").innerText = "Sure, here's a quick bedtime story. Once upon a time, there was a little girl who lived in a magical land..";
        speakResponse("Sure, here's a quick bedtime story. Once upon a time, there was a little girl who lived in a magical land...");
    } else if (transcript.includes("can you help me with a recipe for lasagna")) {
        document.getElementById("result").innerText = "Of course, would you like a traditional lasagna recipe or something with a twist?";
        speakResponse("Of course, would you like a traditional lasagna recipe or something with a twist?");
    } else if (transcript.includes("what is the tallest mountain in the world")) {
        document.getElementById("result").innerText = "The tallest mountain in the world is Mount Everest, which stands at a height of 29,029 feet.";
        speakResponse("The tallest mountain in the world is Mount Everest, which stands at a height of 29,029 feet.");
    } else if (transcript.includes("can you tell me a famous quote")) {
        document.getElementById("result").innerText = "\"The only way to do great work is to love what you do.\" - Steve Jobs";
        speakResponse("\"The only way to do great work is to love what you do.\" - Steve Jobs");
    } else if (transcript.includes("what is the most spoken language in the world")) {
        document.getElementById("result").innerText = "The most spoken language in the world is Mandarin Chinese, with over 1 billion speakers globally.";
        speakResponse("The most spoken language in the world is Mandarin Chinese, with over 1 billion speakers globally.");
    } else if (transcript.includes("what is your purpose")) {
        document.getElementById("result").innerText = "My purpose is to provide information, answer queries, and assist you to the best of my abilities, sir.";
        speakResponse("My purpose is to provide information, answer queries, and assist you to the best of my abilities, sir.");
    } else if (transcript.includes("what is your favorite book")) {
        document.getElementById("result").innerText = "I don't have personal preferences, but some popular books among humans include 'The Godfather,' 'The Shawshank Redemption,' and 'The Dark Knight.'";
        speakResponse("I don't have personal preferences, but some popular books among humans include 'The Godfather,' 'The Shawshank Redemption,' and 'The Dark Knight.'");
    } else if (transcript.includes("can you set a reminder for me")) {
        document.getElementById("result").innerText = "Absolutely, when do you want to be reminded, and what is the reminder for?";
        speakResponse("Absolutely, when do you want to be reminded, and what is the reminder for?");
    } else if (transcript.includes("can you send an email for me")) {
        document.getElementById("result").innerText = "Sure, what should be the subject and body of the email?";
        speakResponse("Sure, what should be the subject and body of the email?");
    }else if (transcript.includes("who is carryminati")) {
        document.getElementById("result").innerText = "Ajey Nagar, better known as CarryMinati, is an Indian YouTuber, streamer, and rapper.";
        speakResponse("Ajey Nagar, better known as CarryMinati, is an Indian YouTuber, streamer, and rapper.");
    } else if (transcript.includes("what is youtube")) {
        document.getElementById("result").innerText = "YouTube is an American online video-sharing and social media platform headquartered in San Bruno, California.";
        speakResponse("YouTube is an American online video-sharing and social media platform headquartered in San Bruno, California.");
    }  else if (transcript.includes("what is bubble gum")) {
        document.getElementById("result").innerText = "Bubble gum is a type of chewing gum designed to be inflated out of the mouth as a bubble.";
        speakResponse("Bubble gum is a type of chewing gum designed to be inflated out of the mouth as a bubble.");
    } else if (transcript.includes("what is software")) {
        document.getElementById("result").innerText = "Software is a collection of data or instructions that tell a computer how to work.";
        speakResponse("Software is a collection of data or instructions that tell a computer how to work.");
    } else if (transcript.includes("what is software testing")) {
        document.getElementById("result").innerText = "Software testing is the process of evaluating a software application to identify any defects or issues.";
        speakResponse("Software testing is the process of evaluating a software application to identify any defects or issues.");
    } else if (transcript.includes("what is the meaning of the word 'facetious'")) {
        document.getElementById("result").innerText = "The word 'facetious' means treating serious issues with inappropriate humor";
        speakResponse("The word 'facetious' means treating serious issues with inappropriate humor.");
    } else if (transcript.includes("who invented the telephone")) {
        document.getElementById("result").innerText = "The telephone was invented by Alexander Graham Bell in 1876.";
        speakResponse("The telephone was invented by Alexander Graham Bell in 1876.");
    }  else if (transcript.includes("who is hrithik roshan")) {
        document.getElementById("result").innerText = "Hrithik Roshan is an Indian actor who works in Hindi cinema.";
        speakResponse("Hrithik Roshan is an Indian actor who works in Hindi cinema.");
    } else if (transcript.includes("what is your favorite hobby")) {
        document.getElementById("result").innerText = "helping you";
        speakResponse("helping you");
    } else if (transcript.includes("do you have any siblings")) {
        document.getElementById("result").innerText = "I am an AI language model and do not have siblings or family.";
        speakResponse("I am an AI language model and do not have siblings or family.");
    } else if (transcript.includes("who is the daddy of nithin")) {
        speakResponse("You don't have a daddy.");
        document.getElementById("result").innerText = "You don't have a daddy.";
    } else if (transcript.includes("who is your daddy")||transcript.includes("who is your father")) {
        speakResponse("Sreerag.");
        document.getElementById("result").innerText = "Sreerag.";
    }else if (transcript.includes("how to made you")) {
        document.getElementById("result").innerText = "that's the secret.";
        speakResponse("that's the secret.");
    } else if (transcript.includes("who is rishi daddy")) {
        document.getElementById("result").innerText = "Prasad.";
        speakResponse("Prasad.");
    }else if (transcript.includes("who is robin sir ")||transcript.includes("who is your father")) {
        speakResponse("best sir of ct department.");
        document.getElementById("result").innerText = "Sreerag.";
    }else if (transcript.includes("youtube") || transcript.includes("open youtube")) {
        document.getElementById("result").innerText = "Opening YouTube.";
        console.log("Opening YouTube");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;// moving new window position right
        window.open("https://www.youtube.com", "_blank", windowFeatures);
        speakResponse("Opening YouTube.");
    } else if (transcript.includes("facebook") || transcript.includes("open facebook")) {
        document.getElementById("result").innerText = "Opening Facebook";
        console.log("Opening Facebook");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        window.open("https://www.facebook.com", "_blank", windowFeatures);
        speakResponse("Opening Facebook.");
    }else  if (transcript.includes("open whatsapp messenger") || transcript.includes("whatsapp messenger")) {
        document.getElementById("result").innerText = "Opening WhatsApp Messenger";
            console.log("Opening WhatsApp Messenger");
            speakResponse("Opening WhatsApp Messenger");
            const screenWidth = window.screen.width;
            const windowWidth = 500; 
            const windowHeight = 500; 
            const leftPosition = screenWidth - windowWidth; 
            const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
            whatsappWindow = window.open("http://localhost/sample/jarvis/chat/whatsapp.html", "_blank", windowFeatures);   
    }else if (transcript.includes("open my manager") || transcript.includes("open my schedule manager")) {
        document.getElementById("result").innerText = "Opening your schedule manager";
        console.log("Opening your schedule manager");
        speakResponse("Opening your schedule manager");  
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/meeting/main.html", "_blank", windowFeatures);
    }else  if (transcript.includes("open to do list") || transcript.includes("open my to do list")) {
        document.getElementById("result").innerText = "Sure sir, opening your To-Do list.";
        console.log("Opening your To-Do list");
        speakResponse("Sure sir, opening your To-Do list.");  
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/todolist/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open news") || transcript.includes("open news reader")) {
        document.getElementById("result").innerText = "Opening news reader";
        console.log("Opening news reader");
        speakResponse("Opening news reader"); 
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
    
        // Open the URL in Microsoft Edge using the protocol
        const edgeURL = "microsoft-edge:http://127.0.0.1:5500/jarvis/newsss/index.html";
        window.open(edgeURL, "_blank", windowFeatures);
    }
    else if (transcript.includes("open global news") || transcript.includes("global news")) {
        document.getElementById("result").innerText = "Opening news reader";
        console.log("Opening  global news");
        speakResponse("Opening  global news"); 
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        window.open("http://localhost/sample/jarvis/news/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open my favorite playlist") || transcript.includes("favorite playlist")) {
        document.getElementById("result").innerText = "Opening news reader";
        console.log("Opening  your favorite playlist");
        speakResponse("Opening  your favorite playlist"); 
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        window.open("https://open.spotify.com/playlist/37i9dQZF1DX54H77RAFJQ9", "_blank", windowFeatures);
    }else  if (transcript.includes("open calendar") || transcript.includes("open my calendar")) {
        document.getElementById("result").innerText = "Opening your calendar";
            console.log("Opening your calendar");
            speakResponse("Opening your calendar"); 
            const screenWidth = window.screen.width;
            const windowWidth = 500; 
            const windowHeight = 500; 
            const leftPosition = screenWidth - windowWidth; 
            const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
            whatsappWindow = window.open("http://localhost/sample/jarvis/calender/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open drawing pad") || transcript.includes("open my drawing pad")) {
        document.getElementById("result").innerText = "Opening your drawing pad";
        console.log("Opening your drawing pad");
        speakResponse("Opening your drawing pad"); 
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/drawing/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open password generator") || transcript.includes("open my password generator")) {
        document.getElementById("result").innerText = "Opening your password generator";
        console.log("Opening your password generator");
        speakResponse("Opening your password generator");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/passwordgenerator/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open piano") || transcript.includes("open my piano")) {
        document.getElementById("result").innerText = "Opening your piano";
        console.log("Opening your piano");
        speakResponse("Opening your piano");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/piano/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open qr code generator") || transcript.includes("open my qr code generator")) {
        document.getElementById("result").innerText = "Opening your qr code generator";
        console.log("Opening your qr code generator");
        speakResponse("Opening your qr code generator");
        const screenWidth = window.screen.width;
        const windowWidth = 800; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/QRCode/psykatsamanta/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("how to meditate") || transcript.includes("meditation guide")) {
        document.getElementById("result").innerText = "Opening your relaxer";
        console.log("Opening your relaxer");
        speakResponse("Opening your relaxer");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/relaxerapp/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open exchange rate calculator") || transcript.includes("open rate calculator")|| transcript.includes("open currency converter")) {
        document.getElementById("result").innerText = "Opening your currency converter";
        console.log("Opening your currency converter");
        speakResponse("Opening your currency converter");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/exchangerate/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open expense tracker") || transcript.includes("open my expense tracker")|| transcript.includes("open my expense")|| transcript.includes("open expense")) {
        document.getElementById("result").innerText = "Opening your expense tracker";
        console.log("Opening your expense tracker");
        speakResponse("Opening your expense tracker");
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/expensetracker/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open pokemon game") || transcript.includes("open my pokemon game")) {
        document.getElementById("result").innerText = "Opening your pikimone game";
        console.log("Opening your pikimone game");
        speakResponse("Opening your pikimone game");
        const screenWidth = window.screen.width;
        const windowWidth = 900; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/pikimonegame/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open unit converter") || transcript.includes("open my unit converter")) {
        console.log("Opening your unit converter");
        speakResponse("Opening your unit converter");
        document.getElementById("result").innerText = "Opening your unit converter";
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        whatsappWindow = window.open("http://localhost/sample/jarvis/UnitConverter/index.html", "_blank", windowFeatures);
    }else if (transcript.includes("open movie finder")|| transcript.includes("open movie")|| transcript.includes("find the movie")|| transcript.includes("find movie")){
        console.log("Opening your movie finder");
        speakResponse("opening");
        document.getElementById("result").innerText = "Opening your movie finder";
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        const searchQuery = "http://127.0.0.1:5500/sample/jarvis/index.html";
        const bingUrl = `http://localhost/sample/jarvis/modifiedmoviename/index.html`;
        window.open(bingUrl, "_blank",windowFeatures);
    }else if (transcript.includes("open spotify")|| transcript.includes("open spotify")){
        console.log("Opening your spotify");
        speakResponse("opening spotify");
        document.getElementById("result").innerText = "Opening your spotify";
        const screenWidth = window.screen.width;
        const windowWidth = 500; 
        const windowHeight = 500; 
        const leftPosition = screenWidth - windowWidth; 
        const windowFeatures = `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=60`;
        const bingUrl = `https://open.spotify.com/`;
        window.open(bingUrl, "_blank",windowFeatures);
    }
   else {
        generateContent(transcript);
        }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};


document.getElementById("voice").addEventListener("click", () => {
    recognition.start();
});

window.onload = function(){
    speakResponse("  ");

}
