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


