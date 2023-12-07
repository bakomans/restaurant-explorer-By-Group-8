
// --------- Takes parsed data from main-js
document.addEventListener("DOMContentLoaded", function () {

    

  const urlParams = new URLSearchParams(window.location.search);
  const cityInput = urlParams.get("q");
  if (cityInput) {
    document.querySelector("#query-param-div").textContent =  " "
    searchPlaces(cityInput);
  }
});

// ----------------- Geocode for map--------------

async function geocodeCity(city) {
  const apiKey = "ed0c087649204f6db62717517ed42adc";
  const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    city
  )}&apiKey=${apiKey}`;

  console.log("Geocoding API URL:", geocodingApiUrl);

  try {
    const response = await fetch(geocodingApiUrl);

    if (response.ok) {
      const result = await response.json();
      console.log("Geocoding API Response:", result);

      if (result.features && result.features.length > 0) {
        const location = result.features[0].geometry.coordinates;
        return { lat: location[1], lng: location[0] };
      } else {
        console.error("No results in geocoding response:", result);
        throw new Error("City not found");
      }
    } else {
      console.error("Geocoding API error. Status:", response.status);
      throw new Error(`Geocoding API error. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw new Error("Error geocoding the city");
  }
}
// ----------------------Map------------------------------
if (document.getElementById('map')) {
    var mymap = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
}


document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    cityInput = urlParams.get("q"); 
    
    if (cityInput) {
        searchPlaces(cityInput);
    }
});

// filter buttons selection-----------------------------


if (document.getElementById('italian-button')) {
    document.getElementById('italian-button').addEventListener('click', function() {
        console.log("City Input:", cityInput); // Check what value cityInput holds
        if (cityInput) {
            searchPlaces(cityInput, "italian");
        } else {
            console.log("City not specified or no Italian cuisines");
        }
    });
}



if (document.getElementById('chinese-button')) {
    document.getElementById('chinese-button').addEventListener('click', function() {
        console.log("City Input:", cityInput); 
        if (cityInput) {
            searchPlaces(cityInput, "chinese");
        } else {
            console.log("City not specified or no Chinese cuisines");
        }
    });
}

if (document.getElementById('indian-button')) {
    document.getElementById('indian-button').addEventListener('click', function() {
        console.log("City Input:", cityInput);
        if (cityInput) {
            searchPlaces(cityInput, "indian");
        } else {
            console.log("City not specified or no Indian cuisines");
        }
    });
}

if (document.getElementById('thai-button')) {
    document.getElementById('thai-button').addEventListener('click', function() {
        console.log("City Input:", cityInput);
        if (cityInput) {
            searchPlaces(cityInput, "thai");
        } else {
            console.log("City not specified or no Thai cuisines");
        }
    });
}

if (document.getElementById('pizza-button')) {
    document.getElementById('pizza-button').addEventListener('click', function() {
        console.log("City Input:", cityInput);
        if (cityInput) {
            searchPlaces(cityInput, "pizza");
        } else {
            console.log("City not specified or no Pizza cuisines");
        }
    });
}

if (document.getElementById('mexican-button')) {
    document.getElementById('mexican-button').addEventListener('click', function() {
        console.log("City Input:", cityInput);
        if (cityInput) {
            searchPlaces(cityInput, "mexican");
        } else {
            console.log("City not specified or no Mexican cuisines");
        }
    });
}

// ---------------- Search for places-------------- 
async function searchPlaces(city, cuisineType = "") {
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
        let cuisineQuery = cuisineType ? `.${cuisineType}` : '';
        const apiKey = "ecc25b5fd6b74c3784e00bd9905ca698";
        const placesApiUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant${cuisineQuery}&filter=rect:${boundingBox.left},${boundingBox.bottom},${boundingBox.right},${boundingBox.top}&limit=10&apiKey=${apiKey}`;

        console.log("Places API URL:", placesApiUrl);

        const response = await fetch(placesApiUrl);
        console.log("Places API Response:", response);

        if (response.ok) {
            const result = await response.json();
            console.log("Places API Result:", result);

            if (result.features && result.features.length > 0) {
                
                clearMapMarkers();

                const bounds = L.geoJSON(result).getBounds();
                mymap.fitBounds(bounds);

                
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
