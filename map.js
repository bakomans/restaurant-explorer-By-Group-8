var mymap = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", async function () {
        const urlParams = new URLSearchParams(window.location.search);
        const cityInput = urlParams.get("q");
        if (cityInput) {
            document.querySelector("#query-param-div").textContent =
                "The value of the parameter is " + cityInput;
            await searchPlaces(cityInput);
        }
    });
});

async function searchPlaces(city) {
    try {
        const location = await geocodeCity(city);
        console.log(location);

        const delta = 0.01;
        const boundingBox = {
            left: (location.lng - delta).toFixed(8),
            bottom: (location.lat - delta).toFixed(8),
            right: (location.lng + delta).toFixed(8),
            top: (location.lat + delta).toFixed(8),
        };

        console.log("Bounding Box:", boundingBox);

        const apiKey = "ecc25b5fd6b74c3784e00bd9905ca698";
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=rect:${boundingBox.left},${boundingBox.bottom},${boundingBox.right},${boundingBox.top}&limit=10&apiKey=${apiKey}`;

        console.log("Places API URL:", placesApiUrl);

        const response = await fetch(placesApiUrl);
        console.log("Places API Response:", response);

        if (response.ok) {
            const result = await response.json();
            console.log("Places API Result:", result);

            if (result.features && result.features.length > 0) {
                
                clearMapMarkers();

                
                addMarkers(result.features);

                
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


function clearMapMarkers() {
    mymap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            mymap.removeLayer(layer);
        }
    });
}


function addMarkers(restaurants) {
    restaurants.forEach((restaurant) => {
        const { lat, lon, name } = restaurant.properties;
        L.marker([lat, lon]).addTo(mymap).bindPopup(name);
    });
}
