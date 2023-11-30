// Function to display a modal with a given message
function showModal(message) {
    const modalMessageElement = document.getElementById('modalMessage');
    modalMessageElement.textContent = message;
    $('#myModal').modal('show');
}

// Function to display restaurant results
function displayResults(restaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = ''; // Clear previous results

    restaurants.forEach((restaurant, index) => {
        const name = restaurant.properties.name;
        const country = restaurant.properties.country;
        const region = restaurant.properties.district;

        // Create a list item for each restaurant
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `<strong>${name}</strong> - ${country}, ${region}`;

        // Append the list item to the restaurant list
        restaurantList.appendChild(listItem);
    });
}

// Function to geocode the city and get lat/lng
async function geocodeCity(city) {
    const apiKey = 'ed0c087649204f6db62717517ed42adc'; // Replace with your actual Geoapify API key
    const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${apiKey}`;

    console.log('Geocoding API URL:', geocodingApiUrl);

    try {
        const response = await fetch(geocodingApiUrl);

        if (response.ok) {
            const result = await response.json();
            console.log('Geocoding API Response:', result);

            if (result.features && result.features.length > 0) {
                const location = result.features[0].geometry.coordinates;
                return { lat: location[1], lng: location[0] }; // Geoapify returns coordinates in [lng, lat] format
            } else {
                console.error('No results in geocoding response:', result);
                throw new Error('City not found');
            }
        } else {
            console.error('Geocoding API error. Status:', response.status);
            throw new Error(`Geocoding API error. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw new Error('Error geocoding the city');
    }
}

// Function to search for places/restaurants using Geoapify API
async function searchPlaces(city) {
    try {
        // Geocode the city to get lat/lng
        const location = await geocodeCity(city);
        console.log(location);
        // Calculate bounding box coordinates
        const delta = 0.01; // Adjust as needed
        const boundingBox = {
            left: (location.lng - delta).toFixed(8),
            bottom: (location.lat - delta).toFixed(8),
            right: (location.lng + delta).toFixed(8),
            top: (location.lat + delta).toFixed(8)
        };

        console.log('Bounding Box:', boundingBox);

        // Make API call with bounding box
        const apiKey = 'ecc25b5fd6b74c3784e00bd9905ca698'; // Replace with your actual Geoapify API key
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=rect:${boundingBox.left},${boundingBox.bottom},${boundingBox.right},${boundingBox.top}&limit=10&apiKey=${apiKey}`;

        console.log('Places API URL:', placesApiUrl);

        const response = await fetch(placesApiUrl);
        console.log('Places API Response:', response);

        if (response.ok) {
            const result = await response.json();
            console.log('Places API Result:', result);

            if (result.features && result.features.length > 0) {
                displayResults(result.features);
            } else {
                showModal(`No food and drink establishments found in ${city}.`);
            }
        } else {
            showModal(`Error fetching data. Status: ${response.status}`);
        }
    } catch (error) {
        showModal(`Error: ${error.message}`);
    }
}

// Function to display autocomplete suggestions
function displayAutocompleteResults(results) {
    fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&format=json&apiKey=ecc25b5fd6b74c3784e00bd9905ca698")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

// Function to geocode using autocomplete
async function geocodeAutocomplete(city) {
    try {
        const apiKey = 'ecc25b5fd6b74c3784e00bd9905ca698';
        const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(city)}&format=json&apiKey=${apiKey}`;

        console.log('Geocoding Autocomplete API URL:', geocodingApiUrl);

        const response = await fetch(geocodingApiUrl);

        if (response.ok) {
            const result = await response.json();
            console.log('Geocoding Autocomplete API Result:', result);

            if (result.results && result.results.length > 0) {
                displayAutocompleteResults(result.results);
            } else {
                // Handle case when no suggestions are found
                console.log('No suggestions found for the entered city.');
            }
        } else {
            console.error('Geocoding Autocomplete API error. Status:', response.status);
            throw new Error(`Geocoding Autocomplete API error. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Geocoding Autocomplete error:', error);
        // Handle the error, e.g., display an error message to the user
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchBtn').addEventListener('click', function () {
        const cityInput = document.getElementById('cityInput').value;
        searchPlaces(cityInput);
    });

    // Add input event listener to trigger autocomplete on input change
    document.getElementById('cityInput').addEventListener('input', function () {
        const cityInput = this.value;
        geocodeAutocomplete(cityInput);
    });
});
