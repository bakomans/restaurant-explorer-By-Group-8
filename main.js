async function searchRestaurants() {
    const cityInput = document.getElementById('cityInput').value;
    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${cityInput}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '71fb4375b1mshcfa5811258a5ca9p127793jsne31a5fa0da3c',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status) {
            displayRestaurants(result.data);
            playBackgroundMusic();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error(error);
        showModal('Error occurred while fetching restaurant data. Please try again later.');
    }
}

function displayRestaurants(data) {
    const restaurantListElement = document.getElementById('restaurantList');
    restaurantListElement.innerHTML = '';

    data.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.textContent = restaurant.localizedName;
        restaurantListElement.appendChild(listItem);
    });
}


function showModal(message) {
    const modalMessageElement = document.getElementById('modalMessage');

    
    if (modalMessageElement) {
        modalMessageElement.textContent = message;
    }

    $('#myModal').modal('show');
}


document.addEventListener('DOMContentLoaded', function () {
    searchRestaurants(); 
});
async function fetchNews() {
    const newsUrl = 'https://newsapi.org/v2/top-headlines';
    const apiKey = '87611144aed846cb8cda5579a2759866';

    const country = 'us';
    const url = `${newsUrl}?country=${country}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        // Sprawdź, czy 'articles' istnieje przed próbą iteracji
        if (result.articles && result.articles.length > 0) {
            displayNews(result.articles);
        } else {
            console.error('No articles found in the response:', result);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Funkcja do wyświetlania aktualnych wiadomości na stronie
function displayNews(newsArray) {
    const newsListContainer = document.getElementById('newsList');

    // Wyczyść zawartość kontenera przed dodaniem nowych wiadomości
    newsListContainer.innerHTML = '';

    newsArray.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = news.urlToImage || 'https://via.placeholder.com/150';
        img.alt = 'News Image';
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = news.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = news.description;

        const readMoreLink = document.createElement('a');
        readMoreLink.href = news.url;
        readMoreLink.target = '_blank';
        readMoreLink.classList.add('btn', 'btn-primary');
        readMoreLink.textContent = 'Read More';

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(readMoreLink);

        card.appendChild(img);
        card.appendChild(cardBody);

        newsItem.appendChild(card);
        newsListContainer.appendChild(newsItem);
    });
}

// Wywołaj funkcję pobierającą i wyświetlającą aktualne wiadomości
fetchNews();