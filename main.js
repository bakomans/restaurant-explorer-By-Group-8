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

        if (result.status === true) {
            displayResult(result.data);
        } else {
            showModal('Error', result.message);
        }
    } catch (error) {
        console.error(error);
        showModal('Error', 'An error occurred while fetching data.');
    }
}

function displayResult(data) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = ''; 

    data.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = restaurant.localizedName;

        restaurantList.appendChild(listItem);
    });
}

function showModal(title, message) {
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    $('#myModal').modal('show');
}


searchRestaurants();
