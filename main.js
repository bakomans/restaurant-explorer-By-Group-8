async function searchRestaurants() {
    const cityInput = document.getElementById('cityInput').value;

    if (cityInput.trim() === '') {
        alert('Please enter a city.');
        return;
    }

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
        console.log(result); // Dodaj ten log, aby sprawdzić dane z API
        displayResult(result.data);
    } catch (error) {
        console.error(error);
    }
}

function displayResult(data) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';

    data.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.textContent = restaurant.localizedName; // Dostosowujemy do struktury danych
        restaurantList.appendChild(listItem);
    });
}


searchRestaurants();