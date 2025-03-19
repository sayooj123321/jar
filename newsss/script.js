
const apiKey = '198e871393c9445495f8b8f7b68f19c6'; 
const newsContainer = document.getElementById('news-container');

// Default language is Malayalam
let speechLang = "ml-IN";

// Set language to Malayalam if not already set in localStorage
if (localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", speechLang);
}

// Initialize SpeechSynthesis
const synth = window.speechSynthesis;


/**
 * Fetch news from NewsAPI
 * @async
 */
async function fetchNews() {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=malayalam&language=ml&apiKey=${apiKey}`
        );
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
            speakNews(data.articles); // Speak news in Malayalam
        } else {
            newsContainer.innerHTML = '<p>No news found.</p>';
            speakTextmala('വാർത്തകൾ കണ്ടെത്താനായില്ല.'); // No news found.
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching news.</p>';
        speakTextmala('വാർത്തകൾ ഫെറ്റ്ച് ചെയ്യുന്നതിൽ പിഴവ് സംഭവിച്ചു.'); // Error fetching news.
    }
}

/**
 * Display news in the DOM
 * @param {Array} articles - News articles
 */
function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach((article) => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'വിവരണം ലഭ്യമല്ല.'}</p>
            <a href="${article.url}" target="_blank">കൂടുതൽ വായിക്കുക</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

/**
 * Speak out the news articles in Malayalam
 * @param {Array} articles - News articles
 */
function speakNews(articles) {
    let speechText = 'കേരളത്തിലെ ഇന്നത്തെ വാർത്തകളാണ് താഴെ ഉള്ളത് : '; // Here is the latest news:
    articles.forEach((article, index) => {
        speechText += `വാർത്ത ${index + 1}: ${article.title}. ${
            article.description || 'വിവരണം ലഭ്യമല്ല.' // No description available.
        } `;
    });
    speakTextmala(speechText);
}

/**
 * Helper function to speak text in Malayalam
 * @param {String} text - Text to be spoken
 */
function speakTextmala(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLang; // Set language to Malayalam (ml-IN)
    utterance.rate = 0.8; // Adjust speech rate (optional)

    // Load voices and set the appropriate one
    const setVoice = () => {
        const allVoices = synth.getVoices();
        const malayalamVoice = allVoices.find((voice) => voice.lang === speechLang);
        if (malayalamVoice) {
            utterance.voice = malayalamVoice;
        }
        synth.speak(utterance);
    };

    if (!synth.getVoices().length) {
        synth.addEventListener('voiceschanged', setVoice);
    } else {
        setVoice();
    }
}

// Load news on page load
window.onload = () => {
    fetchNews();
    speakTextmala("ചൂടുള്ള വാർത്താ ചൂടുള്ള വാർത്താ .");// Page loading in Malayalam.
};
