async function searchRestaurants() {
    const cityInput = document.getElementById('cityInput').value;

    if (cityInput.trim() === '') {
        displayErrorModal('Please enter a city.');
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
        displayResult(result.data);
    } catch (error) {
        console.error(error);
        displayErrorModal('An error occurred while fetching data.');
    }
}

function displayResult(data) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';

    data.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.textContent = restaurant.name;
        restaurantList.appendChild(listItem);
    });
}

function displayErrorModal(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;

    $('#myModal').modal('show'); // Wywołaj modal Bootstrap
}

searchRestaurants();