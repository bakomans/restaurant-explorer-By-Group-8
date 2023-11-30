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
