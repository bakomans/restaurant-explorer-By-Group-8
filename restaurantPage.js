// -----------------This parses the data into restaurantPage.html--------------------

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the restaurant data from local storage
    const storedData = localStorage.getItem('selectedRestaurant');
    
    if (storedData) {
        // Parse the data back into an object
        const restaurantData = JSON.parse(storedData);
        console.log("Parsed data:", restaurantData);

        // Update your HTML elements with the data
        document.getElementById('restaurantName').textContent = restaurantData.name || 'Name not available';
        document.getElementById('restaurantAddress').textContent = restaurantData.address || 'Address not available';
        // Uncomment and complete for other data fields like cuisine, website, phone number, etc.
        // document.getElementById('restaurantCuisine').textContent = restaurantData.cuisine || 'Cuisine not available';
        let latitude = restaurantData.latitude
        let longitude = restaurantData.longitude
         // document.getElementById('restaurantAddress').textContent = restaurantData.address || 'Address not available';
         var mymap = L.map('map').setView([latitude, longitude], 13); // Replace with actual restaurant coordinates
 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '© OpenStreetMap contributors'
        }).addTo(mymap);
 
     // Add a marker for the restaurant
        L.marker([latitude, longitude]).addTo(mymap); // Replace with actual restaurant coordinates
    
    } else {
        // Handle the case where no data is found (e.g., display a message)
        console.log("No restaurant data found in local storage.");
    }

});

