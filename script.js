

const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navBar = document.getElementById('nav-bar');

btnHam.addEventListener('click', function(){
    if(btnHam.className !== ""){
        btnHam.style.display = "none";
        btnTimes.style.display = "block";
        navBar.classList.add("show-nav");
    }
})

btnTimes.addEventListener('click', function(){
    if(btnHam.className !== ""){
        this.style.display = "none";
        btnHam.style.display = "block";
        navBar.classList.remove("show-nav");
    }
})


// Dynamic year script
document.getElementById('current-year').textContent = new Date().getFullYear();


const API_KEY = "0ea2bdb2e0714ed0a010339f866ae4b0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})


// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = createDarkModeToggle();
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Read time estimation
    estimateReadTime();
});

function createDarkModeToggle() {
    // Create dark mode toggle button
    const toggle = document.createElement('button');
    toggle.textContent = '🌓 Toggle Dark Mode';
    toggle.classList.add('dark-mode-toggle');
    
    // Style the toggle button
    toggle.style.position = 'fixed';
    toggle.style.top = '20px';
    toggle.style.right = '20px';
    toggle.style.zIndex = '1000';
    toggle.style.padding = '10px';
    toggle.style.backgroundColor = '#2c3e50';
    toggle.style.color = 'white';
    toggle.style.border = 'none';
    toggle.style.borderRadius = '5px';
    toggle.style.cursor = 'pointer';
    
    // Add to document
    document.body.appendChild(toggle);
    
    // Dark mode functionality
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    
    return toggle;
}

function estimateReadTime() {
    const article = document.querySelector('.article-content');
    if (!article) return;
    
    const text = article.innerText;
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    
    // Create read time indicator
    const readTimeEl = document.createElement('div');
    readTimeEl.classList.add('read-time');
    readTimeEl.textContent = `📖 Estimated read time: ${readTimeMinutes} minute${readTimeMinutes !== 1 ? 's' : ''}`;
    
    // Insert read time after article meta
    const metaSection = document.querySelector('.article-meta');
    if (metaSection) {
        metaSection.appendChild(readTimeEl);
    }
}

// Video Interaction Enhancements
function enhanceVideoSection() {
    const videoSection = document.querySelector('.video-section');
    if (!videoSection) return;

    // Add video interaction overlay
    const videoContainer = videoSection.querySelector('.video-container');
    const overlay = document.createElement('div');
    overlay.classList.add('video-overlay');
    overlay.innerHTML = `
        <div class="video-play-btn">▶</div>
        <div class="video-info">
            <h4>Tech Summit 2024 Highlights</h4>
            <p>Click to watch exclusive coverage</p>
        </div>
    `;

    // Style the overlay
    Object.assign(overlay.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        cursor: 'pointer',
        zIndex: '10'
    });

    const playBtn = overlay.querySelector('.video-play-btn');
    Object.assign(playBtn.style, {
        fontSize: '4rem',
        color: 'white',
        opacity: '0.8'
    });

    videoContainer.appendChild(overlay);

    // Add click interaction
    overlay.addEventListener('click', () => {
        const iframe = videoContainer.querySelector('iframe');
        // Add autoplay parameter to the iframe src
        const src = iframe.src.includes('?') 
            ? `${iframe.src}&autoplay=1` 
            : `${iframe.src}?autoplay=1`;
        iframe.src = src;
        overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    enhanceVideoSection();
});

// Optional: Add CSS for dark mode
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        background-color: #121212;
        color: #e0e0e0;
    }
    
    body.dark-mode .container {
        background-color: #1e1e1e;
    }
    
    body.dark-mode .article-title,
    body.dark-mode .related-article h4 {
        color: #4db8ff;
    }
    
    body.dark-mode blockquote {
        color: #b3d9ff;
        border-left-color: #4db8ff;
    }
    
    body.dark-mode .article-meta {
        color: #a0a0a0;
    }
`;
document.head.appendChild(darkModeStyles);
