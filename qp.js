// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('myParam');

// document.querySelector("#query-param-div").textContent = "The value of the parameter myParam is " + myParam;

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cityInput = urlParams.get('q');
    if (cityInput) {
      document.querySelector("#query-param-div").textContent = "The value of the parameter is " + cityInput;
      searchPlaces(cityInput)
    }
  });


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
  
  function displayAutocompleteResults(results) {
    fetch(
      "https://api.geoapify.com/v1/geocode/autocomplete?text=YOUR_TEXT&format=json&apiKey=ecc25b5fd6b74c3784e00bd9905ca698"
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  
  async function geocodeAutocomplete(city) {
    try {
      const apiKey = "ecc25b5fd6b74c3784e00bd9905ca698";
      const geocodingApiUrl = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        city
      )}&format=json&apiKey=${apiKey}`;
  
      console.log("Geocoding Autocomplete API URL:", geocodingApiUrl);
  
      const response = await fetch(geocodingApiUrl);
  
      if (response.ok) {
        const result = await response.json();
        console.log("Geocoding Autocomplete API Result:", result);
  
        if (result.results && result.results.length > 0) {
          displayAutocompleteResults(result.results);
        } else {
          console.log("No suggestions found for the entered city.");
        }
      } else {
        console.error(
          "Geocoding Autocomplete API error. Status:",
          response.status
        );
        throw new Error(
          `Geocoding Autocomplete API error. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Geocoding Autocomplete error:", error);
    }
  }
  function copyToClipboard(name, country, region, address) {
    const textToCopy = `Restaurant: ${name}, Address: ${address}, ${country}, ${region}`;
  
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
  
    document.execCommand('copy');
  
    document.body.removeChild(textarea);
  
    showModal('Restaurant information copied to clipboard!');
  }
  
 