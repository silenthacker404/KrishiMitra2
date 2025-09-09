// In-memory user database
const users = new Map();
let isLoggedIn = false;

// DOM element references
const messageBox = document.getElementById('message-box');
const homeBtn = document.getElementById('home-btn');
const loginBtn = document.getElementById('login-btn');
const chatbotBtn = document.getElementById('chatbot-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');
const closeChatbotBtn = document.getElementById('close-chatbot-btn');
const authModal = document.getElementById('auth-modal');
const chatbotModal = document.getElementById('chatbot-modal');
const mainContent = document.getElementById('main-content');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const signupBtn = document.getElementById('signup-btn');
const loginAuthBtn = document.getElementById('login-auth-btn');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const voiceInputBtn = document.getElementById('voice-input-btn');

// Page content templates
const homePageContent = `
    <section class="text-center py-16 px-4 section-gradient rounded-3xl shadow-xl mb-12">
        <h2 class="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">Revolutionizing Agriculture</h2>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
            A smart crop advisory system designed to empower small and marginal farmers with personalized, real-time advice.
        </p>
        <div class="mt-8 flex justify-center space-x-4">
            <button onclick="document.getElementById('chatbot-modal').classList.remove('hidden')" class="bg-green-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-colors transform hover:scale-105">
                Ask the Chatbot
            </button>
        </div>
    </section>

    <section class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 class="text-2xl font-bold text-green-700 mb-3">Key Features</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
                <li>Multilingual mobile app with voice and image input.</li>
                <li>Hybrid Rule + Machine Learning for personalized advice.</li>
                <li>Real-time weather, pest, and satellite data integration.</li>
                <li>Marketplace access to connect with local buyers.</li>
                <li>Offline support and SMS/WhatsApp for low-tech users.</li>
            </ul>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 class="text-2xl font-bold text-green-700 mb-3">Challenges & Solutions</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
                <li><b>Digital Literacy:</b> Simple UI and voice/image input.</li>
                <li><b>Connectivity:</b> Offline mode with data sync.</li>
                <li><b>Data Quality:</b> Community-verified advice.</li>
                <li><b>Language Barriers:</b> Native language support.</li>
            </ul>
        </div>
    </section>

    <section class="bg-green-700 text-white p-10 rounded-2xl shadow-xl text-center">
        <h3 class="text-3xl font-bold mb-4">Our Impact</h3>
        <p class="text-lg max-w-2xl mx-auto">
            This system increases crop productivity, boosts farmer income, and bridges digital divides,
            promoting sustainable and efficient agriculture for a better future.
        </p>
    </section>
`;

// Utility function to show a temporary message
const showMessage = (message, isError = false) => {
    messageBox.textContent = message;
    messageBox.classList.remove('hidden', 'bg-red-500', 'bg-green-500');
    messageBox.classList.add(isError ? 'bg-red-500' : 'bg-green-500');
    messageBox.style.opacity = 1;
    setTimeout(() => {
        messageBox.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3300);
};

// Page Navigation Logic
const navigateToHome = () => {
    mainContent.innerHTML = homePageContent;
    chatbotModal.classList.add('hidden');
    authModal.classList.add('hidden');
};

// Initial content load
navigateToHome();

// Event listeners for navigation buttons
homeBtn.addEventListener('click', navigateToHome);
loginBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
chatbotBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        chatbotModal.classList.remove('hidden');
    } else {
        showMessage("Please log in to use the chatbot.", true);
        authModal.classList.remove('hidden');
    }
});
closeAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));
closeChatbotBtn.addEventListener('click', () => chatbotModal.classList.add('hidden'));

// Custom Sign Up Logic
signupBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showMessage("Username and password cannot be empty.", true);
        return;
    }

    if (users.has(username)) {
        showMessage("Username already exists.", true);
    } else {
        users.set(username, password);
        showMessage("Sign up successful! You can now log in.");
        usernameInput.value = '';
        passwordInput.value = '';
    }
});

// Custom Login Logic
loginAuthBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!users.has(username)) {
        showMessage("User not found. Please sign up first.", true);
    } else if (users.get(username) === password) {
        isLoggedIn = true;
        showMessage("Login successful!");
        authModal.classList.add('hidden');
        navigateToHome();
    } else {
        showMessage("Incorrect password.", true);
    }
});

// Chatbot data and logic
const chatbotData = [
    {
        keywords: ['problem', 'statement', 'topic'],
        answer: "The problem statement is 'Smart Crop Advisory System for Small and Marginal Farmers'. It focuses on revolutionizing agriculture."
    },
    {
        keywords: ['theme'],
        answer: "The theme is 'Agriculture, Food Tech & Rural Development'."
    },
    {
        keywords: ['idea', 'title', 'revolve'],
        answer: "The idea title is 'Revolutionizing Agriculture'. The system aims to provide personalized, instant crop and farming advice."
    },
    {
        keywords: ['how', 'works', 'technology', 'backend'],
        answer: "The backend uses a hybrid rule-based and machine learning approach with real-time data from weather, pests, and satellites. It's a multilingual mobile app that works offline."
    },
    {
        keywords: ['features', 'what can it do'],
        answer: "Key features include multilingual support, voice and image input, marketplace access to connect farmers to buyers, and a community layer for peer learning."
    },
    {
        keywords: ['solve', 'literacy', 'accessibility'],
        answer: "The system addresses literacy and accessibility by supporting native languages, voice/image input, and working offline. It also uses SMS/WhatsApp for non-smartphone users."
    },
    {
        keywords: ['unique', 'innovation'],
        answer: "Its unique features are the voice/image-based local-language input, hybrid rule+ML recommendations, real-time data integration, and community-verified advice."
    },
    {
        keywords: ['challenges', 'risks'],
        answer: "Potential challenges include low digital literacy, variable internet connectivity, and data quality issues."
    },
    {
        keywords: ['overcoming', 'strategies'],
        answer: "Strategies to overcome challenges include offline mode with auto-sync, voice/image input in local languages, and providing community support."
    },
    {
        keywords: ['impact', 'benefits'],
        answer: "The system empowers farmers, increases crop productivity, bridges digital divides, and promotes sustainable farming practices."
    },
    {
        keywords: ['hello', 'hi', 'hey'],
        answer: "Hello! I'm a chatbot designed to answer questions about the Smart Crop Advisory System. You can ask me anything about the project!"
    },
    {
        keywords: ['thank', 'bye'],
        answer: "You're welcome! Good luck with your hackathon!"
    },
    {
        keywords: ['profitable', 'winter', 'crops', 'rabi'],
        answer: `In winter (Rabi season in India, roughly November–March), farmers can grow crops that thrive in cool weather, need less water than Kharif crops, and have high market demand & profitability. Here are some of the best profitable winter crops:
        
        🌾 Cereals & Grains
        - **Wheat** – Staple food, high demand year-round, stable market.
        - **Barley** – Used in breweries, medicines, and animal feed, good export value.
        - **Oats** – Rising demand for health-conscious consumers.
        
        🥬 Vegetables (High Profit & Short Duration)
        - **Cauliflower** – Early season cauliflower fetches very high prices.
        - **Cabbage** – Popular in local and export markets.
        - **Carrot** – High demand in juice industry & retail markets.
        - **Spinach & Leafy Greens** – Quick harvest cycles, high market demand.
        - **Onion** (late Rabi crop) – Storage capacity allows off-season selling at high prices.
        - **Peas** – Short-duration crop, good domestic and export demand.
        
        🍊 Fruits
        - **Strawberries** – Extremely profitable but require careful management & cool climate.
        - **Oranges & Kinnow** (Mandarins) – High demand in North India during winter.
        - **Guava** – Winter season guavas are of superior quality and fetch good prices.
        
        🌿 Cash & Industrial Crops
        - **Mustard** (Oilseeds) – Very profitable, huge demand in edible oil market.
        - **Chickpea** (Gram) – High protein demand, also enriches soil with nitrogen.
        - **Fenugreek** (Methi) – Leaf and seed both profitable, quick-growing crop.
        - **Garlic** – High market price, good storage potential, used year-round.
        
        ✅ Most Profitable (Fast-Return + High Demand) Crops in Winter:
        
        - **Cauliflower**
        - **Peas**
        - **Carrot**
        - **Garlic**
        - **Mustard**
        - **Chickpea**
        - **Strawberry**
        `
    },
    {
        keywords: ['profitable', 'summer', 'crops', 'zaid'],
        answer: `In summer (Zaid season in India, roughly March–June, before monsoon), crops that tolerate heat, need less water, and have strong market demand are the most profitable. Here’s a breakdown:
        
        🌾 Cereals & Pulses
        - **Maize** (Sweet Corn & Baby Corn) – High demand for fresh markets, snacks, and processing industries.
        - **Pigeon Pea** (Tur/Arhar) – Long duration but profitable pulse crop.
        - **Green Gram** (Moong) – Short duration, nitrogen-fixing, and fetches high market price.
        - **Black Gram** (Urad) – High demand for dal and food industries.
        
        🥬 Vegetables (High Profit & Short Duration)
        - **Cucumber & Bottle Gourd** – Extremely profitable, fast-growing, and in demand for summer hydration.
        - **Bitter Gourd** (Karela) – High price in both domestic and export markets.
        - **Okra** (Ladyfinger) – Popular summer vegetable, high yield and demand.
        - **Pumpkin** – Good storage, profitable in urban markets.
        - **Watermelon & Muskmelon** – Summer essential fruits, very high demand, quick returns.
        
        🍉 Fruits
        - **Mango** (seasonal king of fruits) – If you have orchards, highly profitable.
        - **Papaya** – Fast growing, high demand in juice & processing industry.
        - **Banana** – Profitable if grown in large scale with irrigation.
        - **Guava** (Summer crop cycle) – Long-term profit with good returns.
        
        🌿 Cash Crops
        - **Sunflower** (Oilseed) – High profit due to edible oil demand.
        - **Groundnut** – Profitable in summer if irrigation available, oil + export demand.
        - **Sesame** (Til) – Summer oilseed with good market price.
        - **Cotton** (in irrigated regions) – Long duration but high profit cash crop.
        
        ✅ Most Profitable (Quick Returns + High Demand) Crops in Summer:
        
        - **Watermelon**
        - **Muskmelon**
        - **Cucumber**
        - **Bitter Gourd**
        - **Okra**
        - **Moong Dal**
        - **Sunflower**
        - **Groundnut**
        `
    },
    {
        keywords: ['precautions', 'winter', 'crops', 'rabi', 'risks'],
        answer: `Great question 👍 — precautions are very important for Rabi (winter) crops to protect yield and increase profit. Here’s a crop-wise precaution guide for the winter crops I suggested earlier:
        
        🌾 Cereals & Grains
        **Wheat**
        - Use certified, disease-resistant varieties.
        - Ensure timely sowing (Nov–Dec) to avoid terminal heat stress.
        - Avoid waterlogging; maintain proper irrigation at critical stages.
        - Protect against rust disease (yellow/brown rust) by spraying fungicides.
        
        **Barley**
        - Use high-yield, rust-resistant seeds.
        - Avoid excess nitrogen to prevent lodging.
        - Watch out for aphids; spray neem oil or recommended insecticide.
        
        🥬 Vegetables
        **Cauliflower / Cabbage**
        - Use early sowing for high profit but protect seedlings from frost.
        - Ensure proper spacing to avoid fungal attacks.
        - Watch out for diamondback moth & aphids; use neem oil/biopesticide control.
        
        **Carrot**
        - Use deep, well-drained sandy loam soil.
        - Regular irrigation but avoid waterlogging.
        - Protect against leaf spot & root fly with fungicide/insecticide sprays.
        
        **Spinach & Leafy Greens**
        - Frequent irrigation required (shallow roots).
        - Avoid excess nitrogen.
        
        **Onion** (Late Rabi)
        - Use well-cured, disease-free sets/seeds.
        - Avoid excess irrigation before harvest.
        - Protect against thrips & stemphylium blight.
        
        **Peas**
        - Early sowing (Oct–Nov) avoids powdery mildew.
        - Avoid water stagnation.
        - Watch for pod borer; use pheromone traps or neem-based sprays.
        
        🍊 Fruits
        **Strawberries**
        - Use healthy runners, avoid water stagnation.
        - Apply straw mulch to prevent fungal infection & conserve soil moisture.
        - Protect against powdery mildew with preventive sprays.
        
        **Oranges/Kinnow**
        - Regular irrigation but avoid flooding.
        - Watch for citrus psylla & fruit fly.
        - Apply micronutrients (zinc, iron, manganese) to prevent deficiencies.
        
        **Guava**
        - Needs light irrigation only in winter.
        - Protect against fruit fly using traps.
        - Prune trees before winter season for better fruiting.
        
        🌿 Cash & Industrial Crops
        **Mustard**
        - Timely sowing (Oct–Nov) to prevent frost damage.
        - Avoid waterlogging.
        - Watch out for aphids; spray neem oil/insecticide.
        
        **Chickpea** (Gram)
        - Needs minimum irrigation; avoid excess water.
        - Protect from gram pod borer using pheromone traps/biocontrol.
        - Rotate with cereals to avoid soil-borne diseases.
        
        **Fenugreek**
        - Needs frequent irrigation in early growth.
        - Avoid overcrowding to prevent fungal attacks.
        
        **Garlic**
        - Needs cool climate + well-drained soil.
        - Irrigate at 10–15 day intervals, avoid waterlogging.
        - Protect against thrips & bulb rot.
        
        ✅ **General Precautions for All Winter Crops:**
        
        - Use certified seeds and practice crop rotation.
        - Ensure frost protection (polythene sheets, light irrigation at night).
        - Apply balanced fertilizer (NPK + micronutrients).
        - Monitor for common pests (aphids, borers, fungal diseases).
        - Use organic mulching.
        `
    }
];

// Function to handle sending a message
const sendMessage = () => {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Display user message
    displayMessage(userMessage, 'user');
    chatInput.value = '';

    // Get bot response
    const botResponse = getBotResponse(userMessage.toLowerCase());

    // Display bot response after a short delay
    setTimeout(() => {
        displayMessage(botResponse, 'bot');
        scrollToBottom();
    }, 500);
};

// Find the correct bot response based on keywords
const getBotResponse = (userMessage) => {
    for (const data of chatbotData) {
        for (const keyword of data.keywords) {
            if (userMessage.includes(keyword)) {
                return data.answer;
            }
        }
    }
    return "I'm sorry, I don't have information on that topic. Please try rephrasing your question.";
};

// Display a message in the chat window
const displayMessage = (message, sender) => {
    const chatHistory = document.getElementById('chat-history');
    const messageElement = document.createElement('div');
    messageElement.classList.add('flex', 'mb-4', 'items-end');

    if (sender === 'user') {
        messageElement.classList.add('justify-end');
        messageElement.innerHTML = `
            <div class="bg-blue-500 text-white p-3 rounded-xl rounded-br-none shadow-md max-w-xs md:max-w-md">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageElement.classList.add('justify-start');
        const isTable = message.includes('| Crop | Major Risks |');
        if (isTable) {
            messageElement.innerHTML = `
                <div class="bg-gray-200 text-gray-800 p-3 rounded-xl rounded-bl-none shadow-md max-w-full overflow-x-auto">
                    ${marked.parse(message)}
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="bg-gray-200 text-gray-800 p-3 rounded-xl rounded-bl-none shadow-md max-w-xs md:max-w-md whitespace-pre-wrap">
                    <p>${message}</p>
                </div>
            `;
        }
    }
    chatHistory.appendChild(messageElement);
};

// Scroll to the bottom of the chat history
const scrollToBottom = () => {
    const chatHistory = document.getElementById('chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
};

// Handle input events
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
sendBtn.addEventListener('click', sendMessage);

// Voice Input Logic
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    voiceInputBtn.addEventListener('click', () => {
        recognition.start();
        voiceInputBtn.classList.add('bg-green-500', 'text-white');
        voiceInputBtn.classList.remove('bg-gray-300', 'text-gray-700');
        chatInput.placeholder = "Listening...";
        chatInput.value = '';
        chatInput.focus();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        sendMessage();
    };

    recognition.onend = () => {
        voiceInputBtn.classList.add('bg-gray-300', 'text-gray-700');
        voiceInputBtn.classList.remove('bg-green-500', 'text-white');
        chatInput.placeholder = "Type or speak your question...";
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        chatInput.placeholder = "Error. Try again.";
        voiceInputBtn.classList.add('bg-gray-300', 'text-gray-700');
        voiceInputBtn.classList.remove('bg-green-500', 'text-white');
    };
} else {
    // Hide the voice input button if not supported
    voiceInputBtn.style.display = 'none';
}
