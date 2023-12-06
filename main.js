function showModal(message) {
  const modalMessageElement = document.getElementById("modalMessage");
  modalMessageElement.textContent = message;
  $("#myModal").modal("show");
}

function displayResults(restaurants) {
  const restaurantList = document.getElementById("restaurantList");
  restaurantList.innerHTML = "";

  restaurants.forEach((restaurant, index) => {
    const name = restaurant.properties.name || "Unknown Name";
    const image = restaurant.properties.datasource.raw.image || "Unknown Image"
    const details = restaurant.properties.details[4]
    const facilities = restaurant.properties.details[3]
    const country = restaurant.properties.country || "Unknown Country";
    const region = restaurant.properties.district || "Unknown Region";
    const amenity =restaurant.properties.datasource.raw.amenity || "Unknown Amenity";
    const cuisine =restaurant.properties.datasource.raw.cuisine || "Unknown Cuisine";
    const openingHours = restaurant.properties.datasource.raw.opening_hours ||"Unknown Opening Hours";
    const website = restaurant.properties.datasource.raw.website || "#";
    const phoneNum = restaurant.properties.datasource.raw.phone || "Unknown Phone Number";
    const wheelchair = restaurant.properties.datasource.raw.wheelchair || "Wheelchair information not available";
    const latitude = restaurant.properties.lat
    const longitude = restaurant.properties.lon
    const addressLine1 = restaurant.properties.address_line1 || "";
    const addressLine2 = restaurant.properties.address_line2 || "";
    const address = `${addressLine1}, ${addressLine2}`.trim();
    const suburb = restaurant.properties.suburb;
    const id = restaurant.properties.place_id;
    const listItem = document.createElement("li");

    listItem.className = "list-group-item card d-flex justify-content-between align-items-center";
    listItem.innerHTML = 
    `<div class="restaurant-info">
      <h5 class="card-title text-center">${name}</h5>
      <div class="info-line">${image}</div>
      <div class="info-line"><strong>Address:</strong> ${address}</div>
      <div class="info-line"><strong>Cuisine:</strong> ${cuisine}</div>
      <div class="info-line"><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></div>
      <div class="info-line"><strong>Phone:</strong> ${phoneNum}</div>
    </div>`;

    const copyButton = document.createElement("button");
    copyButton.className = "btn btn-outline-secondary copy-btn";
    copyButton.innerHTML = "View restaurant";
    copyButton.addEventListener("click", function () {

      // ---Save restaurant data to parse into restaurantPage.html
      const restaurantData = {
        name: name,
        address: address,
        cuisine: cuisine,
        website: website,
        phoneNum: phoneNum,
        wheelchair: wheelchair,
        amenity: amenity,
        openingHours: openingHours,
        latitude: latitude, 
        longitude: longitude,
        suburb: suburb,
        id: id
      }

      localStorage.setItem('selectedRestaurant', JSON.stringify(restaurantData));
      window.location.href = "restaurantPage.html";

    // -------------------------------------------------------
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "mt-3";
    buttonContainer.appendChild(copyButton);

    listItem.appendChild(buttonContainer);
    restaurantList.appendChild(listItem);

    
    setTimeout(() => {
      listItem.classList.add("active");
    }, index * 100);
  });


  
}
// -------- click event on search button to save search and redirect to index2
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchBtn");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const cityInput = document.getElementById("cityInput").value;
      console.log(cityInput);
      searchPlaces(cityInput);
      window.location.href = "index2.html?q=" + encodeURIComponent(cityInput);
    });
  }
});
// ------------------------------------------------

// async function geocodeCity(city) {
//   const apiKey = "ed0c087649204f6db62717517ed42adc";
//   const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//     city
//   )}&apiKey=${apiKey}`;

//   console.log("Geocoding API URL:", geocodingApiUrl);

//   try {
//     const response = await fetch(geocodingApiUrl);

//     if (response.ok) {
//       const result = await response.json();
//       console.log("Geocoding API Response:", result);

//       if (result.features && result.features.length > 0) {
//         const location = result.features[0].geometry.coordinates;
//         return { lat: location[1], lng: location[0] };
//       } else {
//         console.error("No results in geocoding response:", result);
//         throw new Error("City not found");
//       }
//     } else {
//       console.error("Geocoding API error. Status:", response.status);
//       throw new Error(`Geocoding API error. Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Geocoding error:", error);
//     throw new Error("Error geocoding the city");
//   }
// }

// async function searchPlaces(city) {
//   try {
//     const location = await geocodeCity(city);
//     console.log(location);

//     const delta = 0.01;
//     const boundingBox = {
//       left: (location.lng - delta).toFixed(8),
//       bottom: (location.lat - delta).toFixed(8),
//       right: (location.lng + delta).toFixed(8),
//       top: (location.lat + delta).toFixed(8),
//     };

//     console.log("Bounding Box:", boundingBox);

//     const apiKey = "ecc25b5fd6b74c3784e00bd9905ca698";
//     const placesApiUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=rect:${boundingBox.left},${boundingBox.bottom},${boundingBox.right},${boundingBox.top}&limit=20&apiKey=${apiKey}`;

//     console.log("Places API URL:", placesApiUrl);

//     const response = await fetch(placesApiUrl);
//     console.log("Places API Response:", response);

//     if (response.ok) {
//       const result = await response.json();
//       console.log("Places API Result:", result);

//       if (result.features && result.features.length > 0) {
//         displayResults(result.features);
//       } else {
//         showModal(`No food and drink establishments found in ${city}.`);
//       }
//     } else {
//       showModal(`Error fetching data. Status: ${response.status}`);
//     }
//   } catch (error) {
//     showModal(`Error: ${error.message}`);
//   }
// }

// function displayAutocompleteResults(results) {
//   fetch(
//     "https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&format=json&apiKey=ecc25b5fd6b74c3784e00bd9905ca698"
//   )
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// async function geocodeAutocomplete(city) {
//   try {
//     const apiKey = "ecc25b5fd6b74c3784e00bd9905ca698";
//     const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
//       city
//     )}&format=json&apiKey=${apiKey}`;

//     console.log("Geocoding Autocomplete API URL:", geocodingApiUrl);

//     const response = await fetch(geocodingApiUrl);

//     if (response.ok) {
//       const result = await response.json();
//       console.log("Geocoding Autocomplete API Result:", result);

//       if (result.results && result.results.length > 0) {
//         displayAutocompleteResults(result.results);
//       } else {
//         console.log("No suggestions found for the entered city.");
//       }
//     } else {
//       console.error(
//         "Geocoding Autocomplete API error. Status:",
//         response.status
//       );
//       throw new Error(
//         `Geocoding Autocomplete API error. Status: ${response.status}`
//       );
//     }
//   } catch (error) {
//     console.error("Geocoding Autocomplete error:", error);
//   }
// }
// function copyToClipboard(name, country, region, address) {
//   const textToCopy = `Restaurant: ${name}, Address: ${address}, ${country}, ${region}`;

//   const textarea = document.createElement("textarea");
//   textarea.value = textToCopy;
//   document.body.appendChild(textarea);
//   textarea.select();

//   document.execCommand("copy");

//   document.body.removeChild(textarea);

//   showModal("Restaurant information copied to clipboard!");
// }

